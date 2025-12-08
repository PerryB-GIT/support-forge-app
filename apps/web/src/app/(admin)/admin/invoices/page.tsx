import { prisma } from "@support-forge/database";
import Link from "next/link";
import Image from "next/image";
import { InvoiceActions } from "@/components/admin/InvoiceActions";

export default async function AdminInvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: {
        select: { id: true, name: true, email: true },
      },
      items: true,
    },
  });

  const formatCurrency = (amount: number | string | { toString(): string }) => {
    const num = typeof amount === "number" ? amount : parseFloat(amount.toString());
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "overdue":
        return "bg-red-500/10 text-red-500";
      case "cancelled":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const totalPaid = invoices
    .filter((inv) => inv.status.toLowerCase() === "paid")
    .reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);

  const totalPending = invoices
    .filter((inv) => inv.status.toLowerCase() === "pending")
    .reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);

  const totalOverdue = invoices
    .filter((inv) => inv.status.toLowerCase() === "overdue")
    .reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/sf-logo.png" alt="Support Forge" width={40} height={40} className="rounded-lg" />
          <div>
            <h1
              className="text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Invoices
            </h1>
            <p className="text-text-secondary mt-1">
              Create, send, and track invoices
            </p>
          </div>
        </div>
        <Link
          href="/admin/invoices/new"
          className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Invoice
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-text-muted text-sm">Total Paid</p>
          <p className="text-2xl font-bold mt-1 text-green-500">{formatCurrency(totalPaid)}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-text-muted text-sm">Pending</p>
          <p className="text-2xl font-bold mt-1 text-yellow-500">{formatCurrency(totalPending)}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-text-muted text-sm">Overdue</p>
          <p className="text-2xl font-bold mt-1 text-red-500">{formatCurrency(totalOverdue)}</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-elevated">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Invoice #</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Client</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Due Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-text-muted">
                    No invoices yet.{" "}
                    <Link href="/admin/invoices/new" className="text-accent hover:underline">
                      Create your first invoice
                    </Link>
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-elevated/50">
                    <td className="px-4 py-3 font-medium">{invoice.number}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{invoice.client.name}</p>
                        <p className="text-sm text-text-muted">{invoice.client.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(invoice.amount)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(invoice.status)}`}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <InvoiceActions invoiceId={invoice.id} invoiceNumber={invoice.number} currentStatus={invoice.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
