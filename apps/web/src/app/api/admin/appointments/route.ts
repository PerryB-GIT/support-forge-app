import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
      orderBy: { date: "asc" },
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { clientId, date, duration, type, status, notes, meetingUrl } = data;

    if (!clientId || !date || !type) {
      return NextResponse.json({ error: "Client, date, and type are required" }, { status: 400 });
    }

    const appointmentDate = new Date(date);
    const appointmentDuration = duration || 60;
    const appointmentEnd = new Date(appointmentDate.getTime() + appointmentDuration * 60 * 1000);

    // Check for scheduling conflicts
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        status: { notIn: ["CANCELLED"] },
        date: {
          gte: new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000), // Same day buffer
          lte: new Date(appointmentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    const hasConflict = existingAppointments.some((existing) => {
      const existingStart = new Date(existing.date);
      const existingEnd = new Date(existingStart.getTime() + existing.duration * 60 * 1000);

      // Check if time ranges overlap
      return appointmentDate < existingEnd && appointmentEnd > existingStart;
    });

    if (hasConflict) {
      return NextResponse.json(
        { error: "This time slot conflicts with an existing appointment" },
        { status: 409 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientId,
        date: new Date(date),
        duration: duration || 60,
        type,
        status: status || "SCHEDULED",
        notes: notes || null,
        meetingUrl: meetingUrl || null,
      },
    });

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
