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
  description: string | null;
  status: string;
  budget: string | null;
  startDate: string | null;
  endDate: string | null;
  client: Client;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "ACTIVE",
    budget: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/admin/projects/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data.project);
          setFormData({
            title: data.project.title,
            description: data.project.description || "",
            status: data.project.status,
            budget: data.project.budget ? String(data.project.budget) : "",
            startDate: data.project.startDate
              ? new Date(data.project.startDate).toISOString().split("T")[0]
              : "",
            endDate: data.project.endDate
              ? new Date(data.project.endDate).toISOString().split("T")[0]
              : "",
          });
        } else {
          setError("Failed to load project");
        }
      } catch {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to update project");
      } else {
        router.push(`/admin/projects/${projectId}`);
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

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Project not found</h2>
        <Link href="/admin/projects" className="text-accent hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/admin/projects/${projectId}`}
          className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Project
        </Link>
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Edit Project
        </h1>
        <p className="text-text-secondary mt-1">Update project information</p>
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
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Budget
          </label>
          <input
            id="budget"
            name="budget"
            type="number"
            step="0.01"
            min="0"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            placeholder="0.00"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Start Date
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              End Date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Link
            href={`/admin/projects/${projectId}`}
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
