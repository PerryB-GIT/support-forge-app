import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  const fromAddress = from || process.env.SMTP_FROM || "Support Forge <noreply@support-forge.com>";

  const info = await transporter.sendMail({
    from: fromAddress,
    to,
    subject,
    html,
  });

  return info;
}

export function generateInvoiceEmailHtml(invoice: {
  number: string;
  amount: number;
  dueDate: Date;
  status: string;
  items: Array<{ description: string; quantity: number; unitPrice: number }>;
  client: { name: string; company?: string | null };
}) {
  const itemsHtml = invoice.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.description}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${Number(item.unitPrice).toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${(item.quantity * Number(item.unitPrice)).toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #c9a227; margin: 0; font-size: 28px;">Support Forge</h1>
    <p style="color: #888; margin: 5px 0 0 0;">Invoice ${invoice.number}</p>
  </div>

  <div style="background: #fff; padding: 30px; border: 1px solid #eee; border-top: none;">
    <p>Dear ${invoice.client.name}${invoice.client.company ? ` (${invoice.client.company})` : ""},</p>

    <p>Please find your invoice details below:</p>

    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0;"><strong>Invoice Number:</strong></td>
          <td style="padding: 8px 0; text-align: right;">${invoice.number}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Due Date:</strong></td>
          <td style="padding: 8px 0; text-align: right;">${new Date(invoice.dueDate).toLocaleDateString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Status:</strong></td>
          <td style="padding: 8px 0; text-align: right; text-transform: capitalize;">${invoice.status}</td>
        </tr>
      </table>
    </div>

    <h3 style="margin-top: 30px; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">Line Items</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f8f9fa;">
          <th style="padding: 12px; text-align: left;">Description</th>
          <th style="padding: 12px; text-align: center;">Qty</th>
          <th style="padding: 12px; text-align: right;">Price</th>
          <th style="padding: 12px; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
      <tfoot>
        <tr style="background: #1a1a2e; color: #fff;">
          <td colspan="3" style="padding: 15px; text-align: right; font-weight: bold;">Total Amount:</td>
          <td style="padding: 15px; text-align: right; font-weight: bold; color: #c9a227; font-size: 18px;">$${Number(invoice.amount).toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>

    <div style="margin-top: 30px; padding: 20px; background: #fff8e1; border-radius: 8px; border-left: 4px solid #c9a227;">
      <p style="margin: 0;"><strong>Payment Instructions:</strong></p>
      <p style="margin: 10px 0 0 0;">Please contact us at <a href="mailto:billing@support-forge.com" style="color: #c9a227;">billing@support-forge.com</a> for payment details.</p>
    </div>
  </div>

  <div style="background: #1a1a2e; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="color: #888; margin: 0; font-size: 14px;">Support Forge - AI & IT Consulting Services</p>
    <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
      <a href="https://support-forge.com" style="color: #c9a227;">support-forge.com</a>
    </p>
  </div>
</body>
</html>
  `;
}
