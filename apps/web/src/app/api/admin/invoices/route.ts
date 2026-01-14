import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";
import { sendEmail, generateInvoiceEmailHtml } from "@/lib/email";
import { getPaginationFromQuery, createPaginatedResponse } from "@/lib/pagination";
import { createLogger } from "@/lib/logger";

const logger = createLogger("invoices-api");

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

// GET - List all invoices with pagination
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { skip, take } = getPaginationFromQuery(req.nextUrl.searchParams);
    const { page, pageSize } = { page: Math.max(1, (skip / take) + 1), pageSize: take };

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          client: {
            select: { id: true, name: true, email: true },
          },
          items: true,
        },
        skip,
        take,
      }),
      prisma.invoice.count(),
    ]);

    logger.info("Fetched invoices", { total, page, pageSize });
    return NextResponse.json(createPaginatedResponse(invoices, total, page, pageSize));
  } catch (error) {
    logger.error("Error fetching invoices", { error });
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
    const { clientId, dueDate, items, sendEmailToClient } = body;

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

    // Send email notification to client if requested
    if (sendEmailToClient && client.email) {
      try {
        const emailHtml = generateInvoiceEmailHtml({
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
            name: client.name,
            company: client.company,
          },
        });

        await sendEmail({
          to: client.email,
          subject: `Invoice ${invoice.number} from Support Forge`,
          html: emailHtml,
        });
      } catch (emailError) {
        logger.error("Failed to send invoice email", { error: emailError });
      }
    }

    logger.info("Created new invoice", { invoiceId: invoice.id, number: invoice.number });
    return NextResponse.json({ invoice, emailSent: sendEmailToClient && !!client.email }, { status: 201 });
  } catch (error) {
    logger.error("Error creating invoice", { error });
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
