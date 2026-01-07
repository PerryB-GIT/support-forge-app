import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@support-forge/database';

// GET - Check enrollment status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = request.nextUrl.searchParams.get('email');

    // Need either session or email
    const lookupEmail = session?.user?.email || email;

    if (!lookupEmail) {
      return NextResponse.json({ enrolled: false, message: 'No email provided' });
    }

    // Find active enrollment
    const enrollment = await prisma.courseEnrollment.findFirst({
      where: {
        email: lookupEmail,
        status: { in: ['ACTIVE', 'COMPLETED'] },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!enrollment) {
      return NextResponse.json({ enrolled: false });
    }

    return NextResponse.json({
      enrolled: true,
      enrollment: {
        id: enrollment.id,
        courseType: enrollment.courseType,
        courseName: enrollment.courseName,
        status: enrollment.status,
        enrolledAt: enrollment.enrolledAt,
        progress: enrollment.progress,
      },
    });
  } catch (error) {
    console.error('Enrollment check error:', error);
    return NextResponse.json(
      { error: 'Failed to check enrollment' },
      { status: 500 }
    );
  }
}

// POST - Update course progress
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { moduleId, lessonId, completed, email } = body;

    const lookupEmail = session?.user?.email || email;

    if (!lookupEmail) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Find enrollment
    const enrollment = await prisma.courseEnrollment.findFirst({
      where: {
        email: lookupEmail,
        status: 'ACTIVE',
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'No active enrollment found' },
        { status: 404 }
      );
    }

    // Update progress
    const currentProgress = (enrollment.progress as Record<string, any>) || {};

    if (!currentProgress[moduleId]) {
      currentProgress[moduleId] = { completed: [], percentage: 0 };
    }

    if (completed && !currentProgress[moduleId].completed.includes(lessonId)) {
      currentProgress[moduleId].completed.push(lessonId);
    }

    // Update enrollment
    await prisma.courseEnrollment.update({
      where: { id: enrollment.id },
      data: { progress: currentProgress },
    });

    return NextResponse.json({ success: true, progress: currentProgress });
  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
