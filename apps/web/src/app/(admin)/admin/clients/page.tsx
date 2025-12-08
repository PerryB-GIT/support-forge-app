import { prisma } from "@support-forge/database";
import Link from "next/link";
import Image from "next/image";
import { ClientActions } from "@/components/admin/ClientActions";

export default async function AdminClientsPage() {
  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          projects: true,
          tickets: true,
          invoices: true,
        },
      },
    },
  });

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
              Clients
            </h1>
            <p className="text-text-secondary mt-1">
              Manage your client accounts
            </p>
          </div>
        </div>
        <Link
          href="/admin/clients/new"
          className="px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Client
        </Link>
      </div>

      {/* Clients Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-elevated">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Email</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Company</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Projects</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Invoices</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Joined</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-text-muted">
                    No clients yet.{" "}
                    <Link href="/admin/clients/new" className="text-accent hover:underline">
                      Add your first client
                    </Link>
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-elevated/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-medium">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{client.email}</td>
                    <td className="px-4 py-3 text-text-secondary">{client.company || "-"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-medium">
                        {client._count.projects}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-medium">
                        {client._count.invoices}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ClientActions
                        clientId={client.id}
                        clientName={client.name}
                        projectCount={client._count.projects}
                        ticketCount={client._count.tickets}
                        invoiceCount={client._count.invoices}
                      />
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
