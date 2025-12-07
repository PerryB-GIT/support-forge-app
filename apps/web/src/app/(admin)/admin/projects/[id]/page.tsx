import { prisma } from "@support-forge/database";
import Link from "next/link";
import { notFound } from "next/navigation";

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

const PRIORITY_STYLES = {
  LOW: { text: "text-success" },
  MEDIUM: { text: "text-warning" },
  HIGH: { text: "text-orange-500" },
  URGENT: { text: "text-error" },
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
        },
      },
      tickets: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          createdAt: true,
        },
      },
      documents: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          type: true,
          size: true,
          url: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          tickets: true,
          documents: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const statusStyle = STATUS_STYLES[project.status as keyof typeof STATUS_STYLES];

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/projects"
            className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1 mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {project.title}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyle?.bg} ${statusStyle?.text}`}>
              {statusStyle?.label || project.status}
            </span>
          </div>
        </div>
        <Link
          href={`/admin/projects/${project.id}/edit`}
          className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Project
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Client</p>
          <Link href={`/admin/clients/${project.client.id}`} className="font-semibold text-accent hover:underline">
            {project.client.name}
          </Link>
          <p className="text-xs text-text-muted">{project.client.company || project.client.email}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Budget</p>
          <p className="font-semibold">
            {project.budget ? `$${Number(project.budget).toLocaleString()}` : "-"}
          </p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Start Date</p>
          <p className="font-semibold">
            {project.startDate ? new Date(project.startDate).toLocaleDateString() : "-"}
          </p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">End Date</p>
          <p className="font-semibold">
            {project.endDate ? new Date(project.endDate).toLocaleDateString() : "-"}
          </p>
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <div className="bg-surface border border-border-subtle rounded-xl p-6">
          <h2 className="font-semibold mb-4">Description</h2>
          <p className="text-text-secondary whitespace-pre-wrap">{project.description}</p>
        </div>
      )}

      {/* Tickets */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border-subtle flex items-center justify-between">
          <h2 className="font-semibold">Tickets ({project._count.tickets})</h2>
          <Link
            href={`/admin/tickets/new?project=${project.id}`}
            className="text-sm text-accent hover:underline"
          >
            Add Ticket
          </Link>
        </div>
        {project.tickets.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            No tickets yet
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {project.tickets.map((ticket) => {
              const ticketStatus = TICKET_STATUS_STYLES[ticket.status as keyof typeof TICKET_STATUS_STYLES];
              const priorityStyle = PRIORITY_STYLES[ticket.priority as keyof typeof PRIORITY_STYLES];
              return (
                <Link
                  key={ticket.id}
                  href={`/admin/tickets/${ticket.id}`}
                  className="p-4 hover:bg-elevated/50 flex items-center justify-between block"
                >
                  <div>
                    <p className="font-medium">{ticket.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium ${priorityStyle?.text}`}>
                        {ticket.priority}
                      </span>
                      <span className="text-xs text-text-muted">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${ticketStatus?.bg} ${ticketStatus?.text}`}>
                    {ticket.status.replace("_", " ")}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Documents */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border-subtle flex items-center justify-between">
          <h2 className="font-semibold">Documents ({project._count.documents})</h2>
        </div>
        {project.documents.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            No documents yet
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {project.documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 hover:bg-elevated/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-text-muted">
                      {doc.type.toUpperCase()} - {formatFileSize(doc.size)}
                    </p>
                  </div>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline text-sm"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
