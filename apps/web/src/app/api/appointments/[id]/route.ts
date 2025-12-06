import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";

type AppointmentStatus = "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

// GET /api/appointments/[id] - Get single appointment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const appointment = await prisma.appointment.findFirst({
      where: {
        id,
        clientId: session.user.id,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Failed to fetch appointment:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}

// PATCH /api/appointments/[id] - Update appointment (e.g., cancel)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Verify ownership
    const existing = await prisma.appointment.findFirst({
      where: {
        id,
        clientId: session.user.id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Only allow updating certain fields
    const { status, notes } = body;
    const updateData: { status?: AppointmentStatus; notes?: string } = {};

    if (status) {
      // Clients can only cancel their appointments
      if (status === "CANCELLED" && ["SCHEDULED", "CONFIRMED"].includes(existing.status)) {
        updateData.status = status as AppointmentStatus;
      }
    }

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Failed to update appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}
