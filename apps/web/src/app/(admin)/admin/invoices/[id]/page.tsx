import { prisma } from "@support-forge/database";
import Link from "next/link";
import { notFound } from "next/navigation";

const STATUS_STYLES = {
  pending: { bg: "bg-warning/10", text: "text-warning", label: "Pending" },
  paid: { bg: "bg-success/10", text: "text-success", label: "Paid" },
  overdue: { bg: "bg-error/10", text: "text-error", label: "Overdue" },
  cancelled: { bg: "bg-text-muted/10", text: "text-text-muted", label: "Cancelled" },
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      client: {
        select: {
          id: true,
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
    notFound();
  }

  const statusStyle = STATUS_STYLES[invoice.status as keyof typeof STATUS_STYLES] || STATUS_STYLES.pending;
  const isOverdue = invoice.status === "pending" && new Date(invoice.dueDate) < new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/invoices"
            className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1 mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Invoices
          </Link>
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Invoice {invoice.number}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${isOverdue ? STATUS_STYLES.overdue.bg : statusStyle.bg} ${isOverdue ? STATUS_STYLES.overdue.text : statusStyle.text}`}>
              {isOverdue ? "Overdue" : statusStyle.label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/invoices/${invoice.id}/edit`}
            className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Details */}
          <div className="bg-surface border border-border-subtle rounded-xl p-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border-subtle">
              <div>
                <p className="text-sm text-text-muted">Invoice Number</p>
                <p className="text-xl font-bold">{invoice.number}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-muted">Amount Due</p>
                <p className="text-2xl font-bold text-accent">
                  ${Number(invoice.amount).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-text-muted mb-1">Issue Date</p>
                <p className="font-medium">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">Due Date</p>
                <p className={`font-medium ${isOverdue ? "text-error" : ""}`}>
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>
              {invoice.paidDate && (
                <div>
                  <p className="text-sm text-text-muted mb-1">Paid Date</p>
                  <p className="font-medium text-success">
                    {new Date(invoice.paidDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* Line Items */}
            <h3 className="font-semibold mb-4">Line Items</h3>
            <div className="border border-border-subtle rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-elevated">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Description</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary">Qty</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary">Price</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">{item.description}</td>
                      <td className="px-4 py-3 text-right">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">${Number(item.unitPrice).toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-medium">
                        ${(item.quantity * Number(item.unitPrice)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-elevated">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-semibold">Total</td>
                    <td className="px-4 py-3 text-right font-bold text-lg">
                      ${Number(invoice.amount).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <div className="bg-surface border border-border-subtle rounded-xl p-6">
            <h3 className="font-semibold mb-4">Bill To</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                {invoice.client.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <Link
                  href={`/admin/clients/${invoice.client.id}`}
                  className="font-semibold text-accent hover:underline"
                >
                  {invoice.client.name}
                </Link>
                {invoice.client.company && (
                  <p className="text-sm text-text-secondary">{invoice.client.company}</p>
                )}
                <p className="text-sm text-text-muted">{invoice.client.email}</p>
                {invoice.client.phone && (
                  <p className="text-sm text-text-muted">{invoice.client.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface border border-border-subtle rounded-xl p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {invoice.status !== "paid" && (
                <button className="w-full px-4 py-2.5 rounded-lg bg-success/10 text-success hover:bg-success/20 font-medium transition-colors text-sm">
                  Mark as Paid
                </button>
              )}
              <button className="w-full px-4 py-2.5 rounded-lg bg-elevated hover:bg-border-subtle font-medium transition-colors text-sm">
                Send Reminder
              </button>
              <button className="w-full px-4 py-2.5 rounded-lg bg-elevated hover:bg-border-subtle font-medium transition-colors text-sm">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
