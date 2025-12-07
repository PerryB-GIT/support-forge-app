import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";

// Generate invoice number
function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `INV-${year}${month}-${random}`;
}

// GET - List all invoices
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
        items: true,
      },
    });

    return NextResponse.json({ invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

// POST - Create new invoice
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { clientId, dueDate, items } = body;

    if (!clientId || !dueDate || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Client, due date, and at least one item are required" },
        { status: 400 }
      );
    }

    // Verify client exists
    const client = await prisma.user.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum: number, item: { quantity: number; unitPrice: number }) =>
        sum + item.quantity * item.unitPrice,
      0
    );

    // Generate unique invoice number
    let invoiceNumber = generateInvoiceNumber();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.invoice.findUnique({
        where: { number: invoiceNumber },
      });
      if (!existing) break;
      invoiceNumber = generateInvoiceNumber();
      attempts++;
    }

    // Create invoice with items
    const invoice = await prisma.invoice.create({
      data: {
        number: invoiceNumber,
        amount: totalAmount,
        status: "pending",
        dueDate: new Date(dueDate),
        clientId,
        items: {
          create: items.map(
            (item: { description: string; quantity: number; unitPrice: number }) => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })
          ),
        },
      },
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
        items: true,
      },
    });

    // TODO: If sendEmail is true, send email notification to client
    // This would integrate with an email service like SendGrid, SES, etc.

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
