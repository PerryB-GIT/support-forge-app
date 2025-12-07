import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";

export default async function BillingPage() {
  const session = await getServerSession(authOptions);

  const invoices = session?.user?.id
    ? await prisma.invoice.findMany({
        where: { clientId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: {
          items: true,
        },
      })
    : [];

  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Billing
        </h1>
        <p className="text-text-secondary mt-1">
          View and manage your invoices and payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold mt-3 text-green-500">{formatCurrency(totalPaid)}</p>
          <p className="text-text-secondary text-sm mt-1">Total Paid</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold mt-3 text-yellow-500">{formatCurrency(totalPending)}</p>
          <p className="text-text-secondary text-sm mt-1">Pending</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold mt-3 text-red-500">{formatCurrency(totalOverdue)}</p>
          <p className="text-text-secondary text-sm mt-1">Overdue</p>
        </div>
      </div>

      {/* Invoices List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Invoices</h2>
        {invoices.length === 0 ? (
          <div className="bg-surface border border-border-subtle rounded-xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">No invoices yet</h3>
            <p className="text-text-muted">
              Your invoices will appear here once you have active projects
            </p>
          </div>
        ) : (
          <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-elevated">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Invoice #</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Date</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Due Date</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Amount</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Status</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-elevated/50">
                      <td className="px-4 py-3 font-medium">{invoice.number}</td>
                      <td className="px-4 py-3 text-text-secondary">
                        {new Date(invoice.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-accent hover:text-accent-hover text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Payment Info */}
      <div className="bg-surface border border-border-subtle rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
        <p className="text-text-secondary mb-4">
          For questions about billing or to make a payment, please contact our team.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-text-muted">Email</p>
              <a href="mailto:perry.bailes@gmail.com" className="text-accent hover:underline">
                perry.bailes@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-text-muted">Phone</p>
              <a href="tel:+14782991604" className="text-accent hover:underline">
                (478) 299-1604
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
