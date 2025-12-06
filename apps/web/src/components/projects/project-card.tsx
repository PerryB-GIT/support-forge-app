"use client";

import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description?: string;
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD" | "CANCELLED";
  startDate?: string;
  endDate?: string;
  _count?: {
    tickets: number;
  };
}

const STATUS_STYLES = {
  ACTIVE: { bg: "bg-success/10", text: "text-success", label: "Active" },
  COMPLETED: { bg: "bg-blue-500/10", text: "text-blue-500", label: "Completed" },
  ON_HOLD: { bg: "bg-warning/10", text: "text-warning", label: "On Hold" },
  CANCELLED: { bg: "bg-text-muted/10", text: "text-text-muted", label: "Cancelled" },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusStyle = STATUS_STYLES[project.status];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link
      href={`/projects/${project.id}`}
      className="block bg-surface border border-border-subtle rounded-xl p-5 hover:border-accent/50 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            {project.startDate && (
              <p className="text-xs text-text-muted">
                Started {formatDate(project.startDate)}
              </p>
            )}
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusStyle.label}
        </span>
      </div>

      {project.description && (
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {project.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
        <div className="flex items-center gap-4 text-sm text-text-muted">
          {project._count && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {project._count.tickets} ticket{project._count.tickets !== 1 ? "s" : ""}
            </span>
          )}
          {project.endDate && project.status === "COMPLETED" && (
            <span>Completed {formatDate(project.endDate)}</span>
          )}
        </div>
        <svg
          className="w-5 h-5 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
