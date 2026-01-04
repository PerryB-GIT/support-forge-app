import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";
import { sendEmail, generateInvoiceEmailHtml } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const { type = "invoice" } = body; // 'invoice' or 'reminder'

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            name: true,
            email: true,
            company: true,
          },
        },
        items: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (!invoice.client.email) {
      return NextResponse.json(
        { error: "Client has no email address" },
        { status: 400 }
      );
    }

    const subject =
      type === "reminder"
        ? `Payment Reminder: Invoice ${invoice.number} - $${Number(invoice.amount).toFixed(2)}`
        : `Invoice ${invoice.number} from Support Forge - $${Number(invoice.amount).toFixed(2)}`;

    const html = generateInvoiceEmailHtml({
      number: invoice.number,
      amount: Number(invoice.amount),
      dueDate: invoice.dueDate,
      status: invoice.status,
      items: invoice.items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
      })),
      client: {
        name: invoice.client.name,
        company: invoice.client.company,
      },
    });

    await sendEmail({
      to: invoice.client.email,
      subject,
      html,
    });

    return NextResponse.json({
      success: true,
      message: `Email sent to ${invoice.client.email}`,
    });
  } catch (error) {
    console.error("Error sending invoice email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to send email: ${errorMessage}` },
      { status: 500 }
    );
  }
}
