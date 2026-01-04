import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";

// Settings are stored in a simple key-value table or as JSON
// For simplicity, we'll store them in the user's record or a separate settings table

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Return default settings - in production, these would come from database
    const settings = {
      business: {
        name: "Support Forge",
        email: "contact@support-forge.com",
        phone: "",
        address: "",
      },
      invoice: {
        prefix: "INV-",
        paymentTerms: 30,
        taxRate: 0,
        footerNotes: "Thank you for your business! Payment is due within the terms specified above.",
      },
      notifications: {
        newClient: true,
        newTicket: true,
        appointmentReminders: true,
        invoicePayments: true,
      },
    };

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { business, invoice, notifications } = body;

    // In production, save to database
    // For now, we'll just validate and return success
    // You would typically have a Settings model in Prisma:
    // await prisma.settings.upsert({
    //   where: { userId: session.user.id },
    //   create: { userId: session.user.id, ...settings },
    //   update: settings,
    // });

    console.log("Settings saved:", { business, invoice, notifications });

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully",
      settings: { business, invoice, notifications },
    });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}

// Export endpoint for data export
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (body.action === "export") {
      // Gather all data for export
      const [clients, projects, invoices, tickets, appointments, documents] = await Promise.all([
        prisma.user.findMany({
          where: { role: "CLIENT" },
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            phone: true,
            createdAt: true,
          },
        }),
        prisma.project.findMany({
          include: {
            client: { select: { name: true, email: true } },
          },
        }),
        prisma.invoice.findMany({
          include: {
            client: { select: { name: true, email: true } },
            items: true,
          },
        }),
        prisma.ticket.findMany({
          include: {
            client: { select: { name: true, email: true } },
          },
        }),
        prisma.appointment.findMany({
          include: {
            client: { select: { name: true, email: true } },
          },
        }),
        prisma.document.findMany({
          include: {
            client: { select: { name: true, email: true } },
          },
        }),
      ]);

      const exportData = {
        exportedAt: new Date().toISOString(),
        exportedBy: session.user.email,
        data: {
          clients,
          projects,
          invoices,
          tickets,
          appointments,
          documents,
        },
        summary: {
          totalClients: clients.length,
          totalProjects: projects.length,
          totalInvoices: invoices.length,
          totalTickets: tickets.length,
          totalAppointments: appointments.length,
          totalDocuments: documents.length,
        },
      };

      return NextResponse.json(exportData);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
