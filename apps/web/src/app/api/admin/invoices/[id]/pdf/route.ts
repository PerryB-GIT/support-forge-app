import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            name: true,
            email: true,
            company: true,
            phone: true,
          },
        },
        items: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const itemsHtml = invoice.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${item.description}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">$${Number(item.unitPrice).toFixed(2)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.quantity * Number(item.unitPrice)).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Invoice ${invoice.number}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #c9a227; }
    .logo { font-size: 32px; font-weight: bold; color: #1a1a2e; }
    .logo span { color: #c9a227; }
    .invoice-info { text-align: right; }
    .invoice-number { font-size: 24px; font-weight: bold; color: #1a1a2e; }
    .invoice-date { color: #666; margin-top: 5px; }
    .addresses { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .address-block { width: 45%; }
    .address-block h3 { font-size: 12px; text-transform: uppercase; color: #888; margin-bottom: 10px; letter-spacing: 1px; }
    .address-block p { margin: 5px 0; }
    .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
    .status-pending { background: #fff3cd; color: #856404; }
    .status-paid { background: #d4edda; color: #155724; }
    .status-overdue { background: #f8d7da; color: #721c24; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    thead { background: #1a1a2e; color: white; }
    th { padding: 15px 12px; text-align: left; font-weight: 600; }
    th:nth-child(2), th:nth-child(3), th:nth-child(4) { text-align: right; }
    td:nth-child(2), td:nth-child(3), td:nth-child(4) { text-align: right; }
    .total-row { background: #f8f9fa; font-weight: bold; }
    .total-row td { padding: 15px 12px; font-size: 18px; }
    .total-amount { color: #c9a227; }
    .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #888; font-size: 14px; }
    .payment-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 30px; }
    .payment-info h3 { margin-bottom: 10px; color: #1a1a2e; }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Support<span>Forge</span></div>
    <div class="invoice-info">
      <div class="invoice-number">INVOICE</div>
      <div class="invoice-date">${invoice.number}</div>
    </div>
  </div>

  <div class="addresses">
    <div class="address-block">
      <h3>From</h3>
      <p><strong>Support Forge</strong></p>
      <p>AI & IT Consulting Services</p>
      <p>billing@support-forge.com</p>
      <p>support-forge.com</p>
    </div>
    <div class="address-block">
      <h3>Bill To</h3>
      <p><strong>${invoice.client.name}</strong></p>
      ${invoice.client.company ? `<p>${invoice.client.company}</p>` : ""}
      <p>${invoice.client.email}</p>
      ${invoice.client.phone ? `<p>${invoice.client.phone}</p>` : ""}
    </div>
  </div>

  <div style="display: flex; justify-content: space-between; margin-bottom: 30px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
    <div>
      <p style="color: #888; font-size: 12px; text-transform: uppercase;">Issue Date</p>
      <p style="font-weight: bold;">${new Date(invoice.createdAt).toLocaleDateString()}</p>
    </div>
    <div>
      <p style="color: #888; font-size: 12px; text-transform: uppercase;">Due Date</p>
      <p style="font-weight: bold;">${new Date(invoice.dueDate).toLocaleDateString()}</p>
    </div>
    <div>
      <p style="color: #888; font-size: 12px; text-transform: uppercase;">Status</p>
      <span class="status-badge status-${invoice.status}">${invoice.status}</span>
    </div>
    <div>
      <p style="color: #888; font-size: 12px; text-transform: uppercase;">Amount Due</p>
      <p style="font-weight: bold; font-size: 20px; color: #c9a227;">$${Number(invoice.amount).toFixed(2)}</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th style="text-align: center;">Qty</th>
        <th style="text-align: right;">Unit Price</th>
        <th style="text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${itemsHtml}
    </tbody>
  </table>

  <table>
    <tr class="total-row">
      <td colspan="3" style="text-align: right; padding-right: 20px;">Total:</td>
      <td class="total-amount" style="text-align: right;">$${Number(invoice.amount).toFixed(2)}</td>
    </tr>
  </table>

  <div class="payment-info">
    <h3>Payment Options</h3>
    <div style="display: flex; gap: 30px; align-items: flex-start; margin-top: 15px;">
      <div style="text-align: center;">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://venmo.com/u/John-Bailes-1" alt="Venmo QR Code" style="border: 1px solid #ddd; border-radius: 8px; padding: 8px; background: white;" />
        <p style="margin-top: 8px; font-size: 12px; color: #666;">Scan to pay with Venmo</p>
      </div>
      <div style="flex: 1;">
        <p style="margin-bottom: 10px;"><strong>Pay with Venmo:</strong></p>
        <p style="font-size: 18px; color: #008CFF; margin-bottom: 5px;">@John-Bailes-1</p>
        <p style="font-size: 13px; color: #666; margin-bottom: 15px;">
          <a href="https://venmo.com/u/John-Bailes-1" style="color: #008CFF; text-decoration: none;">venmo.com/u/John-Bailes-1</a>
        </p>
        <p style="font-size: 13px; color: #666; margin-top: 15px;">
          Questions? Contact us at billing@support-forge.com
        </p>
      </div>
    </div>
  </div>

  <div class="footer">
    <p>Thank you for your business!</p>
    <p style="margin-top: 10px;">Support Forge - AI & IT Consulting Services | support-forge.com</p>
  </div>
</body>
</html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `inline; filename="invoice-${invoice.number}.html"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
