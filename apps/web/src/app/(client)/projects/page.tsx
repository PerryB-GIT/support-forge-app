"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/projects/project-card";

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "ACTIVE" | "COMPLETED" | "ON_HOLD">("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.status === filter);

  const activeCount = projects.filter((p) => p.status === "ACTIVE").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Projects
        </h1>
        <p className="text-text-secondary mt-1">
          {activeCount} active project{activeCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            { value: "all", label: "All Projects" },
            { value: "ACTIVE", label: "Active" },
            { value: "COMPLETED", label: "Completed" },
            { value: "ON_HOLD", label: "On Hold" },
          ] as const
        ).map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-accent text-white"
                : "bg-surface border border-border-subtle hover:border-border-default"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Projects list */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-surface border border-border-subtle rounded-xl p-5 animate-pulse"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-elevated" />
                <div className="flex-1">
                  <div className="h-5 bg-elevated rounded w-40 mb-2" />
                  <div className="h-3 bg-elevated rounded w-24" />
                </div>
              </div>
              <div className="h-4 bg-elevated rounded w-full mb-2" />
              <div className="h-4 bg-elevated rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-surface border border-border-subtle flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-text-secondary">
            {filter === "all"
              ? "You don't have any projects yet"
              : `No ${filter.toLowerCase().replace("_", " ")} projects`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
