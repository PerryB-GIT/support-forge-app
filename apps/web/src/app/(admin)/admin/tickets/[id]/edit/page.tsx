"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  email: string;
}

interface Project {
  id: string;
  title: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  client: Client;
  project: Project | null;
}

export default function EditTicketPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params.id as string;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "OPEN",
    priority: "MEDIUM",
    projectId: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [ticketRes, projectsRes] = await Promise.all([
          fetch(`/api/admin/tickets/${ticketId}`),
          fetch("/api/admin/projects"),
        ]);

        if (ticketRes.ok) {
          const data = await ticketRes.json();
          setTicket(data.ticket);
          setFormData({
            title: data.ticket.title,
            description: data.ticket.description,
            status: data.ticket.status,
            priority: data.ticket.priority,
            projectId: data.ticket.project?.id || "",
          });
        } else {
          setError("Failed to load ticket");
        }

        if (projectsRes.ok) {
          const data = await projectsRes.json();
          setProjects(data.projects || []);
        }
      } catch {
        setError("Failed to load ticket");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [ticketId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to update ticket");
      } else {
        router.push(`/admin/tickets/${ticketId}`);
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl animate-pulse">
        <div className="h-8 bg-elevated rounded w-48 mb-8" />
        <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-5">
          <div className="h-10 bg-elevated rounded" />
          <div className="h-10 bg-elevated rounded" />
          <div className="h-32 bg-elevated rounded" />
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Ticket not found</h2>
        <Link href="/admin/tickets" className="text-accent hover:underline">
          Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/admin/tickets/${ticketId}`}
          className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Ticket
        </Link>
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Edit Ticket
        </h1>
        <p className="text-text-secondary mt-1">Update ticket information</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border-subtle rounded-xl p-6 space-y-5"
      >
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="WAITING">Waiting</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="projectId"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Project
          </label>
          <select
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          >
            <option value="">No Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Link
            href={`/admin/tickets/${ticketId}`}
            className="px-4 py-2.5 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
