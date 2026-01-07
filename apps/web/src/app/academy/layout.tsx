import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import StudentSidebar from "@/components/student/StudentSidebar";
import { prisma } from "@support-forge/database";

export default async function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If not authenticated, render without sidebar (for public pages like /academy)
  if (!session?.user?.email) {
    return <>{children}</>;
  }

  // Check enrollment
  const enrollment = await prisma.courseEnrollment.findFirst({
    where: {
      email: session.user.email,
      status: { in: ["ACTIVE", "COMPLETED"] },
    },
    select: {
      courseType: true,
      courseName: true,
      enrolledAt: true,
    },
  });

  // If not enrolled, render without sidebar
  if (!enrollment) {
    return <>{children}</>;
  }

  // Render with sidebar for enrolled students
  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar
        user={{
          id: session.user.id,
          name: session.user.name || "",
          email: session.user.email,
          image: session.user.image || undefined,
        }}
        enrollment={{
          courseType: enrollment.courseType,
          courseName: enrollment.courseName,
          enrolledAt: enrollment.enrolledAt.toISOString(),
        }}
      />
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
