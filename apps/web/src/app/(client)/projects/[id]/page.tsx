"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "OPEN" | "IN_PROGRESS" | "WAITING" | "RESOLVED" | "CLOSED";
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  description?: string;
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD" | "CANCELLED";
  startDate?: string;
  endDate?: string;
  budget?: string;
  tickets: Ticket[];
}

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

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      }
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-elevated rounded w-64 mb-4" />
        <div className="h-4 bg-elevated rounded w-48 mb-8" />
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface border border-border-subtle rounded-xl p-5">
              <div className="h-4 bg-elevated rounded w-20 mb-2" />
              <div className="h-6 bg-elevated rounded w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Project not found</h2>
        <p className="text-text-secondary mb-4">
          This project doesn&apos;t exist or you don&apos;t have access to it.
        </p>
        <Link href="/projects" className="text-accent hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  const statusStyle = STATUS_STYLES[project.status];
  const openTickets = project.tickets.filter(
    (t) => !["RESOLVED", "CLOSED"].includes(t.status)
  ).length;

  return (
    <div>
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1
              className="text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {project.title}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
            >
              {statusStyle.label}
            </span>
          </div>
          {project.description && (
            <p className="text-text-secondary max-w-2xl">{project.description}</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Status</p>
          <p className={`text-lg font-semibold ${statusStyle.text}`}>
            {statusStyle.label}
          </p>
        </div>
        {project.startDate && (
          <div className="bg-surface border border-border-subtle rounded-xl p-5">
            <p className="text-sm text-text-muted mb-1">Started</p>
            <p className="text-lg font-semibold">{formatDate(project.startDate)}</p>
          </div>
        )}
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Open Tickets</p>
          <p className="text-lg font-semibold">{openTickets}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-5">
          <p className="text-sm text-text-muted mb-1">Total Tickets</p>
          <p className="text-lg font-semibold">{project.tickets.length}</p>
        </div>
      </div>

      {/* Tickets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Tickets</h2>
          <Link
            href={`/support/new?project=${project.id}`}
            className="text-sm text-accent hover:underline"
          >
            Create Ticket
          </Link>
        </div>

        {project.tickets.length === 0 ? (
          <div className="bg-surface border border-border-subtle rounded-xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-elevated flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-text-secondary">No tickets yet for this project</p>
          </div>
        ) : (
          <div className="bg-surface border border-border-subtle rounded-xl divide-y divide-border-subtle">
            {project.tickets.map((ticket) => {
              const ticketStatus = TICKET_STATUS_STYLES[ticket.status];
              const priorityStyle = PRIORITY_STYLES[ticket.priority];

              return (
                <Link
                  key={ticket.id}
                  href={`/support/${ticket.id}`}
                  className="block p-4 hover:bg-elevated/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${priorityStyle.text}`}>
                          {ticket.priority}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${ticketStatus.bg} ${ticketStatus.text}`}
                        >
                          {ticket.status.replace("_", " ")}
                        </span>
                      </div>
                      <h3 className="font-medium truncate">{ticket.title}</h3>
                      <p className="text-sm text-text-secondary line-clamp-1">
                        {ticket.description}
                      </p>
                    </div>
                    <span className="text-xs text-text-muted whitespace-nowrap">
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
