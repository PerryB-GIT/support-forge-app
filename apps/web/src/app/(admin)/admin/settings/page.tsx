import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/admin/SettingsForm";

async function getSettings() {
  // Default settings - in production these would come from database
  return {
    business: {
      name: "Support Forge",
      email: "contact@support-forge.com",
      phone: "",
      address: "",
    },
    invoice: {
      prefix: "INV-",
      paymentTerms: 30,
      taxRate: 0,
      footerNotes: "Thank you for your business! Payment is due within the terms specified above.",
    },
    notifications: {
      newClient: true,
      newTicket: true,
      appointmentReminders: true,
      invoicePayments: true,
    },
  };
}

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const settings = await getSettings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image src="/sf-logo.png" alt="Support Forge" width={40} height={40} className="rounded-lg" />
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Settings
          </h1>
          <p className="text-text-secondary mt-1">
            Manage your application settings
          </p>
        </div>
      </div>

      {/* Profile Settings (read-only) */}
      <div className="bg-surface border border-border-subtle rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
            <input
              type="text"
              defaultValue={session.user.name || ""}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              disabled
            />
            <p className="text-xs text-text-muted mt-1">Contact support to change your name</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
            <input
              type="email"
              defaultValue={session.user.email || ""}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              disabled
            />
            <p className="text-xs text-text-muted mt-1">Contact support to change your email</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Role</label>
            <input
              type="text"
              defaultValue="Administrator"
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle text-accent"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Interactive Settings Form */}
      <SettingsForm initialSettings={settings} />
    </div>
  );
}
