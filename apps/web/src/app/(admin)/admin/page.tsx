import { prisma } from "@support-forge/database";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [
    totalClients,
    activeProjects,
    openTickets,
    pendingInvoices,
    recentClients,
    recentInvoices,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.project.count({ where: { status: "ACTIVE" } }),
    prisma.ticket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS", "WAITING"] } } }),
    prisma.invoice.count({ where: { status: "pending" } }),
    prisma.user.findMany({
      where: { role: "CLIENT" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, company: true, createdAt: true },
    }),
    prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { client: { select: { name: true, email: true } } },
    }),
  ]);

  const totalRevenue = await prisma.invoice.aggregate({
    where: { status: "paid" },
    _sum: { amount: true },
  });

  const pendingRevenue = await prisma.invoice.aggregate({
    where: { status: "pending" },
    _sum: { amount: true },
  });

  const formatCurrency = (amount: number | null) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Admin Dashboard
          </h1>
          <p className="text-text-secondary mt-1">Overview of your business</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={totalClients.toString()}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          href="/admin/clients"
        />
        <StatCard
          title="Active Projects"
          value={activeProjects.toString()}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          }
          href="/admin/projects"
        />
        <StatCard
          title="Open Tickets"
          value={openTickets.toString()}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          href="/admin/tickets"
        />
        <StatCard
          title="Pending Invoices"
          value={pendingInvoices.toString()}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
          }
          href="/admin/invoices"
        />
      </div>

      {/* Revenue Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-surface border border-border-subtle rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Revenue Overview</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-text-muted text-sm">Total Revenue (Paid)</p>
              <p className="text-2xl font-bold text-green-500">
                {formatCurrency(totalRevenue._sum.amount ? Number(totalRevenue._sum.amount) : 0)}
              </p>
            </div>
            <div>
              <p className="text-text-muted text-sm">Pending Revenue</p>
              <p className="text-2xl font-bold text-yellow-500">
                {formatCurrency(pendingRevenue._sum.amount ? Number(pendingRevenue._sum.amount) : 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface border border-border-subtle rounded-xl p-6">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-3">
            <Link
              href="/admin/clients/new"
              className="flex items-center gap-3 p-3 rounded-lg bg-elevated hover:bg-accent/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Add New Client</p>
                <p className="text-sm text-text-muted">Create a new user account</p>
              </div>
            </Link>
            <Link
              href="/admin/invoices/new"
              className="flex items-center gap-3 p-3 rounded-lg bg-elevated hover:bg-accent/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Create Invoice</p>
                <p className="text-sm text-text-muted">Generate a new invoice</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Clients */}
        <div className="bg-surface border border-border-subtle rounded-xl">
          <div className="flex items-center justify-between p-4 border-b border-border-subtle">
            <h2 className="font-semibold">Recent Clients</h2>
            <Link href="/admin/clients" className="text-accent text-sm hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border-subtle">
            {recentClients.length === 0 ? (
              <p className="p-4 text-text-muted text-center">No clients yet</p>
            ) : (
              recentClients.map((client) => (
                <div key={client.id} className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{client.name}</p>
                    <p className="text-sm text-text-muted truncate">{client.email}</p>
                  </div>
                  <span className="text-xs text-text-muted">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-surface border border-border-subtle rounded-xl">
          <div className="flex items-center justify-between p-4 border-b border-border-subtle">
            <h2 className="font-semibold">Recent Invoices</h2>
            <Link href="/admin/invoices" className="text-accent text-sm hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border-subtle">
            {recentInvoices.length === 0 ? (
              <p className="p-4 text-text-muted text-center">No invoices yet</p>
            ) : (
              recentInvoices.map((invoice) => (
                <div key={invoice.id} className="p-4 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{invoice.number}</p>
                    <p className="text-sm text-text-muted truncate">{invoice.client.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(Number(invoice.amount))}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        invoice.status === "paid"
                          ? "bg-green-500/10 text-green-500"
                          : invoice.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  href,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-surface border border-border-subtle rounded-xl p-5 hover:border-accent/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-text-muted">{icon}</span>
        <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <p className="text-3xl font-bold mt-3">{value}</p>
      <p className="text-text-secondary text-sm mt-1">{title}</p>
    </Link>
  );
}
