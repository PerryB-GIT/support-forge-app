import { prisma } from "@support-forge/database";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TicketCommentForm } from "@/components/admin/TicketCommentForm";

const STATUS_STYLES = {
  OPEN: { bg: "bg-blue-500/10", text: "text-blue-500", label: "Open" },
  IN_PROGRESS: { bg: "bg-warning/10", text: "text-warning", label: "In Progress" },
  WAITING: { bg: "bg-purple-500/10", text: "text-purple-500", label: "Waiting" },
  RESOLVED: { bg: "bg-success/10", text: "text-success", label: "Resolved" },
  CLOSED: { bg: "bg-text-muted/10", text: "text-text-muted", label: "Closed" },
};

const PRIORITY_STYLES = {
  LOW: { bg: "bg-success/10", text: "text-success", label: "Low" },
  MEDIUM: { bg: "bg-warning/10", text: "text-warning", label: "Medium" },
  HIGH: { bg: "bg-orange-500/10", text: "text-orange-500", label: "High" },
  URGENT: { bg: "bg-error/10", text: "text-error", label: "Urgent" },
};

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
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
      project: {
        select: {
          id: true,
          title: true,
        },
      },
      comments: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!ticket) {
    notFound();
  }

  const statusStyle = STATUS_STYLES[ticket.status as keyof typeof STATUS_STYLES];
  const priorityStyle = PRIORITY_STYLES[ticket.priority as keyof typeof PRIORITY_STYLES];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/tickets"
            className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1 mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tickets
          </Link>
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {ticket.title}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyle?.bg} ${statusStyle?.text}`}>
              {statusStyle?.label || ticket.status}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityStyle?.bg} ${priorityStyle?.text}`}>
              {priorityStyle?.label || ticket.priority} Priority
            </span>
          </div>
        </div>
        <Link
          href={`/admin/tickets/${ticket.id}/edit`}
          className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Ticket
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Client</p>
          <Link href={`/admin/clients/${ticket.client.id}`} className="font-semibold text-accent hover:underline">
            {ticket.client.name}
          </Link>
          <p className="text-xs text-text-muted">{ticket.client.email}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Project</p>
          {ticket.project ? (
            <Link href={`/admin/projects/${ticket.project.id}`} className="font-semibold text-accent hover:underline">
              {ticket.project.title}
            </Link>
          ) : (
            <p className="font-semibold">-</p>
          )}
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Created</p>
          <p className="font-semibold">
            {new Date(ticket.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Last Updated</p>
          <p className="font-semibold">
            {new Date(ticket.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-surface border border-border-subtle rounded-xl p-6">
        <h2 className="font-semibold mb-4">Description</h2>
        <p className="text-text-secondary whitespace-pre-wrap">{ticket.description}</p>
      </div>

      {/* Comments */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border-subtle">
          <h2 className="font-semibold">Comments ({ticket.comments.length})</h2>
        </div>
        {ticket.comments.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            No comments yet
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {ticket.comments.map((comment) => (
              <div key={comment.id} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{comment.authorName}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    comment.authorRole === "ADMIN"
                      ? "bg-accent/10 text-accent"
                      : "bg-text-muted/10 text-text-muted"
                  }`}>
                    {comment.authorRole}
                  </span>
                  <span className="text-xs text-text-muted">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-text-secondary whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
        <TicketCommentForm ticketId={ticket.id} />
      </div>
    </div>
  );
}
