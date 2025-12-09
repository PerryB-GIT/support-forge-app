import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

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

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* Profile Settings */}
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

        {/* Business Settings */}
        <div className="bg-surface border border-border-subtle rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Business Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Business Name</label>
              <input
                type="text"
                defaultValue="Support Forge"
                className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                placeholder="Your Business Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Business Email</label>
              <input
                type="email"
                defaultValue="contact@support-forge.com"
                className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                placeholder="contact@yourbusiness.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Business Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Business Address</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                placeholder="123 Business St, City, State, ZIP"
              />
            </div>
          </div>
        </div>

        {/* Invoice Settings */}
        <div className="bg-surface border border-border-subtle rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
            Invoice Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Invoice Prefix</label>
              <input
                type="text"
                defaultValue="INV-"
                className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                placeholder="INV-"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Default Payment Terms (Days)</label>
              <input
                type="number"
                defaultValue={30}
                className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Tax Rate (%)</label>
              <input
                type="number"
                step="0.01"
                defaultValue={0}
                className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Invoice Footer Notes</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                placeholder="Thank you for your business!"
                defaultValue="Thank you for your business! Payment is due within the terms specified above."
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-surface border border-border-subtle rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notification Settings
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-lg bg-elevated cursor-pointer hover:bg-elevated/80 transition-colors">
              <div>
                <p className="font-medium">New Client Notifications</p>
                <p className="text-sm text-text-muted">Get notified when a new client registers</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border-subtle text-accent focus:ring-accent" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg bg-elevated cursor-pointer hover:bg-elevated/80 transition-colors">
              <div>
                <p className="font-medium">New Ticket Notifications</p>
                <p className="text-sm text-text-muted">Get notified when a new support ticket is created</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border-subtle text-accent focus:ring-accent" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg bg-elevated cursor-pointer hover:bg-elevated/80 transition-colors">
              <div>
                <p className="font-medium">Appointment Reminders</p>
                <p className="text-sm text-text-muted">Get reminded before upcoming appointments</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border-subtle text-accent focus:ring-accent" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg bg-elevated cursor-pointer hover:bg-elevated/80 transition-colors">
              <div>
                <p className="font-medium">Invoice Payment Notifications</p>
                <p className="text-sm text-text-muted">Get notified when an invoice is paid</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border-subtle text-accent focus:ring-accent" />
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-surface border border-red-500/30 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <div>
                <p className="font-medium text-red-500">Export All Data</p>
                <p className="text-sm text-text-muted">Download a copy of all your data</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors font-medium text-sm">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button className="px-6 py-2.5 rounded-lg border border-border-subtle text-text-secondary hover:bg-elevated transition-colors font-medium">
            Cancel
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
