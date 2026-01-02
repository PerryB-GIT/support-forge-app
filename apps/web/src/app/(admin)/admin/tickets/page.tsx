import { prisma } from "@support-forge/database";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";

const ITEMS_PER_PAGE = 10;

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function AdminTicketsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1"));
  const search = params.search || "";

  // Build where clause for search
  const whereClause = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
          { client: { name: { contains: search, mode: "insensitive" as const } } },
          { client: { email: { contains: search, mode: "insensitive" as const } } },
        ],
      }
    : {};

  // Get total count and paginated data
  const [totalCount, tickets, openCount, urgentCount, resolvedCount] = await Promise.all([
    prisma.ticket.count({ where: whereClause }),
    prisma.ticket.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
        project: {
          select: { id: true, title: true },
        },
        _count: {
          select: { comments: true },
        },
      },
    }),
    prisma.ticket.count({
      where: { status: { in: ["OPEN", "IN_PROGRESS", "WAITING"] } },
    }),
    prisma.ticket.count({
      where: { priority: "URGENT", status: { not: "CLOSED" } },
    }),
    prisma.ticket.count({
      where: { status: "RESOLVED" },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-500/10 text-red-500";
      case "HIGH":
        return "bg-orange-500/10 text-orange-500";
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-500";
      case "LOW":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-500/10 text-blue-500";
      case "IN_PROGRESS":
        return "bg-yellow-500/10 text-yellow-500";
      case "WAITING":
        return "bg-purple-500/10 text-purple-500";
      case "RESOLVED":
        return "bg-green-500/10 text-green-500";
      case "CLOSED":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
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
              Support Tickets
            </h1>
            <p className="text-text-secondary mt-1">
              Manage and respond to support requests
            </p>
          </div>
        </div>
        <Link
          href="/admin/tickets/new"
          className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Ticket
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Open Tickets</p>
          <p className="text-2xl font-bold mt-1 text-blue-500">{openCount}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Urgent</p>
          <p className="text-2xl font-bold mt-1 text-red-500">{urgentCount}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Resolved</p>
          <p className="text-2xl font-bold mt-1 text-green-500">{resolvedCount}</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <p className="text-text-muted text-sm">Total</p>
          <p className="text-2xl font-bold mt-1">{totalCount}</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <SearchInput placeholder="Search tickets..." className="max-w-sm" />
        {search && (
          <p className="text-sm text-text-muted">
            Found {totalCount} result{totalCount !== 1 ? "s" : ""} for &quot;{search}&quot;
          </p>
        )}
      </div>

      {/* Tickets Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-elevated">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Ticket</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Client</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Project</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Priority</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Comments</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Created</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-text-muted">
                    {search ? (
                      <>No tickets found matching &quot;{search}&quot;</>
                    ) : (
                      <>
                        No tickets yet.{" "}
                        <Link href="/admin/tickets/new" className="text-accent hover:underline">
                          Create your first ticket
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-elevated/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{ticket.title}</p>
                        <p className="text-xs text-text-muted truncate max-w-xs">
                          {ticket.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-medium">
                          {ticket.client.name.charAt(0)}
                        </div>
                        <span className="text-sm">{ticket.client.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {ticket.project?.title || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded bg-gray-500/10 text-gray-500 text-xs">
                        {ticket._count.comments}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-sm">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/tickets/${ticket.id}`}
                          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors"
                          title="View & Respond"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/tickets/${ticket.id}/edit`}
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}
