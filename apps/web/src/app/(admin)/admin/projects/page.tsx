import { prisma } from "@support-forge/database";
import Link from "next/link";
import Image from "next/image";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: {
        select: { id: true, name: true, email: true },
      },
      _count: {
        select: { tickets: true, documents: true },
      },
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/10 text-green-500";
      case "COMPLETED":
        return "bg-blue-500/10 text-blue-500";
      case "ON_HOLD":
        return "bg-yellow-500/10 text-yellow-500";
      case "CANCELLED":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const formatCurrency = (amount: number | null | { toString(): string }) => {
    if (!amount) return "-";
    const num = typeof amount === "number" ? amount : parseFloat(amount.toString());
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/sf-logo.png" alt="Support Forge" width={40} height={40} className="rounded-lg" />
          <div>
            <h1
              className="text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Projects
            </h1>
            <p className="text-text-secondary mt-1">
              Create and manage client projects
            </p>
          </div>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Total Projects</p>
          <p className="text-2xl font-bold mt-1">{projects.length}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Active</p>
          <p className="text-2xl font-bold mt-1 text-green-500">
            {projects.filter((p) => p.status === "ACTIVE").length}
          </p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">On Hold</p>
          <p className="text-2xl font-bold mt-1 text-yellow-500">
            {projects.filter((p) => p.status === "ON_HOLD").length}
          </p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Completed</p>
          <p className="text-2xl font-bold mt-1 text-blue-500">
            {projects.filter((p) => p.status === "COMPLETED").length}
          </p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-elevated">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Project</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Client</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Budget</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Tickets</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Created</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-text-muted">
                    No projects yet.{" "}
                    <Link href="/admin/projects/new" className="text-accent hover:underline">
                      Create your first project
                    </Link>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-elevated/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        {project.description && (
                          <p className="text-sm text-text-muted truncate max-w-xs">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-medium">
                          {project.client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{project.client.name}</p>
                          <p className="text-xs text-text-muted">{project.client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatCurrency(project.budget)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-medium">
                        {project._count.tickets}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors"
                          title="View"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
