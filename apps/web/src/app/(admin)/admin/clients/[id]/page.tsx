import { prisma } from "@support-forge/database";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

const STATUS_STYLES = {
  ACTIVE: { bg: "bg-success/10", text: "text-success", label: "Active" },
  COMPLETED: { bg: "bg-blue-500/10", text: "text-blue-500", label: "Completed" },
  ON_HOLD: { bg: "bg-warning/10", text: "text-warning", label: "On Hold" },
  CANCELLED: { bg: "bg-text-muted/10", text: "text-text-muted", label: "Cancelled" },
};

const TICKET_STATUS_STYLES = {
  OPEN: { bg: "bg-blue-500/10", text: "text-blue-500" },
  IN_PROGRESS: { bg: "bg-warning/10", text: "text-warning" },
  WAITING: { bg: "bg-purple-500/10", text: "text-purple-500" },
  RESOLVED: { bg: "bg-success/10", text: "text-success" },
  CLOSED: { bg: "bg-text-muted/10", text: "text-text-muted" },
};

const INVOICE_STATUS_STYLES = {
  DRAFT: { bg: "bg-gray-500/10", text: "text-gray-500" },
  SENT: { bg: "bg-blue-500/10", text: "text-blue-500" },
  PAID: { bg: "bg-success/10", text: "text-success" },
  OVERDUE: { bg: "bg-error/10", text: "text-error" },
  CANCELLED: { bg: "bg-text-muted/10", text: "text-text-muted" },
};

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await prisma.user.findUnique({
    where: { id, role: "CLIENT" },
    include: {
      projects: {
        orderBy: { createdAt: "desc" },
      },
      tickets: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      invoices: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      _count: {
        select: {
          projects: true,
          tickets: true,
          invoices: true,
        },
      },
    },
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/clients"
            className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1 mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Clients
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-bold">
              {client.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {client.name}
              </h1>
              <p className="text-text-secondary">{client.email}</p>
            </div>
          </div>
        </div>
        <Link
          href={`/admin/clients/${client.id}/edit`}
          className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Client
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Company</p>
          <p className="font-semibold">{client.company || "-"}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Phone</p>
          <p className="font-semibold">{client.phone || "-"}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Joined</p>
          <p className="font-semibold">
            {new Date(client.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Total Projects</p>
          <p className="font-semibold">{client._count.projects}</p>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border-subtle flex items-center justify-between">
          <h2 className="font-semibold">Projects ({client._count.projects})</h2>
          <Link
            href={`/admin/projects/new?client=${client.id}`}
            className="text-sm text-accent hover:underline"
          >
            Add Project
          </Link>
        </div>
        {client.projects.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            No projects yet
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {client.projects.map((project) => {
              const statusStyle = STATUS_STYLES[project.status as keyof typeof STATUS_STYLES];
              return (
                <div
                  key={project.id}
                  className="p-4 hover:bg-elevated/50 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-text-muted">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyle?.bg} ${statusStyle?.text}`}>
                    {statusStyle?.label || project.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Tickets */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border-subtle flex items-center justify-between">
          <h2 className="font-semibold">Recent Tickets ({client._count.tickets})</h2>
        </div>
        {client.tickets.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            No tickets yet
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {client.tickets.map((ticket) => {
              const statusStyle = TICKET_STATUS_STYLES[ticket.status as keyof typeof TICKET_STATUS_STYLES];
              return (
                <div
                  key={ticket.id}
                  className="p-4 hover:bg-elevated/50 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{ticket.title}</p>
                    <p className="text-sm text-text-muted">
                      {ticket.priority} priority - Created {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyle?.bg} ${statusStyle?.text}`}>
                    {ticket.status.replace("_", " ")}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Invoices */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border-subtle flex items-center justify-between">
          <h2 className="font-semibold">Recent Invoices ({client._count.invoices})</h2>
          <Link
            href={`/admin/invoices/new?client=${client.id}`}
            className="text-sm text-accent hover:underline"
          >
            Create Invoice
          </Link>
        </div>
        {client.invoices.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            No invoices yet
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {client.invoices.map((invoice) => {
              const statusStyle = INVOICE_STATUS_STYLES[invoice.status as keyof typeof INVOICE_STATUS_STYLES];
              return (
                <div
                  key={invoice.id}
                  className="p-4 hover:bg-elevated/50 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{invoice.number}</p>
                    <p className="text-sm text-text-muted">
                      ${Number(invoice.amount).toFixed(2)} - {new Date(invoice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyle?.bg} ${statusStyle?.text}`}>
                    {invoice.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
