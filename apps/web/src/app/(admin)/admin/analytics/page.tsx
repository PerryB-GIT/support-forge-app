import { prisma } from "@support-forge/database";

export default async function AdminAnalyticsPage() {
  const now = new Date();

  // Use count/aggregate queries instead of fetching all records
  const [
    // Client counts
    clientCount,
    recentClients,
    // Project counts
    activeProjects,
    completedProjects,
    onHoldProjects,
    totalProjects,
    // Ticket counts
    openTickets,
    inProgressTickets,
    resolvedTickets,
    urgentTickets,
    totalTickets,
    // Appointment counts
    upcomingAppointments,
    completedAppointments,
    totalAppointments,
    // Invoice aggregates
    totalRevenue,
    paidRevenue,
    pendingRevenue,
    paidInvoiceCount,
    overdueInvoiceCount,
    totalInvoiceCount,
    // Document count
    documentCount,
  ] = await Promise.all([
    // Clients
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.user.findMany({
      where: { role: "CLIENT" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    // Projects
    prisma.project.count({ where: { status: "ACTIVE" } }),
    prisma.project.count({ where: { status: "COMPLETED" } }),
    prisma.project.count({ where: { status: "ON_HOLD" } }),
    prisma.project.count(),
    // Tickets
    prisma.ticket.count({ where: { status: "OPEN" } }),
    prisma.ticket.count({ where: { status: "IN_PROGRESS" } }),
    prisma.ticket.count({ where: { status: { in: ["RESOLVED", "CLOSED"] } } }),
    prisma.ticket.count({ where: { priority: "URGENT", status: { not: "CLOSED" } } }),
    prisma.ticket.count(),
    // Appointments
    prisma.appointment.count({
      where: { date: { gte: now }, status: { not: "CANCELLED" } },
    }),
    prisma.appointment.count({ where: { status: "COMPLETED" } }),
    prisma.appointment.count(),
    // Invoices - revenue aggregates
    prisma.invoice.aggregate({ _sum: { amount: true } }),
    prisma.invoice.aggregate({
      where: { status: { in: ["PAID", "paid"] } },
      _sum: { amount: true },
    }),
    prisma.invoice.aggregate({
      where: { status: { in: ["SENT", "pending", "PENDING", "OVERDUE", "overdue"] } },
      _sum: { amount: true },
    }),
    prisma.invoice.count({ where: { status: { in: ["PAID", "paid"] } } }),
    prisma.invoice.count({ where: { status: { in: ["OVERDUE", "overdue"] } } }),
    prisma.invoice.count(),
    // Documents
    prisma.document.count(),
  ]);

  // Get monthly data for charts using grouped queries
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [monthlyInvoices, monthlyTickets] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        createdAt: { gte: sixMonthsAgo },
        status: { in: ["PAID", "paid"] },
      },
      select: { createdAt: true, amount: true },
    }),
    prisma.ticket.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
  ]);

  // Build monthly data
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const monthName = monthStart.toLocaleString("default", { month: "short" });

    const monthRevenue = monthlyInvoices
      .filter((inv) => {
        const invDate = new Date(inv.createdAt);
        return invDate >= monthStart && invDate <= monthEnd;
      })
      .reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

    const monthTicketCount = monthlyTickets.filter((t) => {
      const tDate = new Date(t.createdAt);
      return tDate >= monthStart && tDate <= monthEnd;
    }).length;

    monthlyData.push({ month: monthName, revenue: monthRevenue, tickets: monthTicketCount });
  }

  const maxRevenue = Math.max(...monthlyData.map((m) => m.revenue), 1);
  const maxTickets = Math.max(...monthlyData.map((m) => m.tickets), 1);

  // Calculate rates
  const resolutionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;
  const paymentRate = totalInvoiceCount > 0 ? Math.round((paidInvoiceCount / totalInvoiceCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Analytics
        </h1>
        <p className="text-text-secondary mt-1">
          Business metrics and performance insights
        </p>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-text-muted text-sm">Total Revenue</p>
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mt-2 text-green-500">
            ${Number(totalRevenue._sum.amount || 0).toLocaleString()}
          </p>
          <p className="text-xs text-text-muted mt-1">All time</p>
        </div>

        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-text-muted text-sm">Paid</p>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mt-2 text-blue-500">
            ${Number(paidRevenue._sum.amount || 0).toLocaleString()}
          </p>
          <p className="text-xs text-text-muted mt-1">{paidInvoiceCount} invoices</p>
        </div>

        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-text-muted text-sm">Pending</p>
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mt-2 text-yellow-500">
            ${Number(pendingRevenue._sum.amount || 0).toLocaleString()}
          </p>
          <p className="text-xs text-text-muted mt-1">{overdueInvoiceCount} overdue</p>
        </div>

        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-text-muted text-sm">Total Clients</p>
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{clientCount}</p>
          <p className="text-xs text-text-muted mt-1">Registered</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <h3 className="font-semibold mb-4">Revenue (Last 6 Months)</h3>
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative" style={{ height: "120px" }}>
                  <div
                    className="absolute bottom-0 w-full bg-green-500/20 rounded-t transition-all"
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%`, minHeight: data.revenue > 0 ? "4px" : "0" }}
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-green-500 rounded-t" style={{ height: "100%" }} />
                  </div>
                </div>
                <span className="text-xs text-text-muted">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tickets Chart */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <h3 className="font-semibold mb-4">Tickets (Last 6 Months)</h3>
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative" style={{ height: "120px" }}>
                  <div
                    className="absolute bottom-0 w-full bg-blue-500/20 rounded-t transition-all"
                    style={{ height: `${(data.tickets / maxTickets) * 100}%`, minHeight: data.tickets > 0 ? "4px" : "0" }}
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-blue-500 rounded-t" style={{ height: "100%" }} />
                  </div>
                </div>
                <span className="text-xs text-text-muted">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Projects */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Projects
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Active</span>
              <span className="font-medium text-green-500">{activeProjects}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">On Hold</span>
              <span className="font-medium text-yellow-500">{onHoldProjects}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Completed</span>
              <span className="font-medium text-gray-500">{completedProjects}</span>
            </div>
            <div className="pt-3 border-t border-border-subtle flex justify-between items-center">
              <span className="text-text-secondary">Total</span>
              <span className="font-bold">{totalProjects}</span>
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            Support Tickets
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Open</span>
              <span className="font-medium text-blue-500">{openTickets}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">In Progress</span>
              <span className="font-medium text-yellow-500">{inProgressTickets}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Urgent</span>
              <span className="font-medium text-red-500">{urgentTickets}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Resolved</span>
              <span className="font-medium text-green-500">{resolvedTickets}</span>
            </div>
            <div className="pt-3 border-t border-border-subtle flex justify-between items-center">
              <span className="text-text-secondary">Total</span>
              <span className="font-bold">{totalTickets}</span>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Appointments
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Upcoming</span>
              <span className="font-medium text-accent">{upcomingAppointments}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Completed</span>
              <span className="font-medium text-green-500">{completedAppointments}</span>
            </div>
            <div className="pt-3 border-t border-border-subtle flex justify-between items-center">
              <span className="text-text-secondary">Total</span>
              <span className="font-bold">{totalAppointments}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Clients */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <h3 className="font-semibold mb-4">Recent Clients</h3>
          {recentClients.length === 0 ? (
            <p className="text-text-muted text-sm">No clients yet</p>
          ) : (
            <div className="space-y-3">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-medium">
                    {client.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{client.name}</p>
                    <p className="text-xs text-text-muted truncate">{client.email}</p>
                  </div>
                  <span className="text-xs text-text-muted">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <h3 className="font-semibold mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-elevated rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-accent">{documentCount}</p>
              <p className="text-xs text-text-muted mt-1">Documents</p>
            </div>
            <div className="bg-elevated rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{totalInvoiceCount}</p>
              <p className="text-xs text-text-muted mt-1">Invoices</p>
            </div>
            <div className="bg-elevated rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">{resolutionRate}%</p>
              <p className="text-xs text-text-muted mt-1">Resolution Rate</p>
            </div>
            <div className="bg-elevated rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-500">{paymentRate}%</p>
              <p className="text-xs text-text-muted mt-1">Payment Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
