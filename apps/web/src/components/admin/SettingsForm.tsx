"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

interface SettingsFormProps {
  initialSettings: {
    business: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    invoice: {
      prefix: string;
      paymentTerms: number;
      taxRate: number;
      footerNotes: string;
    };
    notifications: {
      newClient: boolean;
      newTicket: boolean;
      appointmentReminders: boolean;
      invoicePayments: boolean;
    };
  };
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [business, setBusiness] = useState(initialSettings.business);
  const [invoice, setInvoice] = useState(initialSettings.invoice);
  const [notifications, setNotifications] = useState(initialSettings.notifications);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business, invoice, notifications }),
      });

      const data = await res.json();
      if (res.ok) {
        addToast("Settings saved successfully", "success");
      } else {
        addToast(data.error || "Failed to save settings", "error");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      addToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setBusiness(initialSettings.business);
    setInvoice(initialSettings.invoice);
    setNotifications(initialSettings.notifications);
    addToast("Changes discarded", "success");
  }

  async function handleExport() {
    setExporting(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "export" }),
      });

      if (res.ok) {
        const data = await res.json();
        // Download as JSON file
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `support-forge-export-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        addToast("Data exported successfully", "success");
      } else {
        const data = await res.json();
        addToast(data.error || "Failed to export data", "error");
      }
    } catch (error) {
      console.error("Failed to export data:", error);
      addToast("Failed to export data", "error");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="grid gap-6">
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
              value={business.name}
              onChange={(e) => setBusiness({ ...business, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              placeholder="Your Business Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Business Email</label>
            <input
              type="email"
              value={business.email}
              onChange={(e) => setBusiness({ ...business, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              placeholder="contact@yourbusiness.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Business Phone</label>
            <input
              type="tel"
              value={business.phone}
              onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Business Address</label>
            <textarea
              rows={3}
              value={business.address}
              onChange={(e) => setBusiness({ ...business, address: e.target.value })}
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
              value={invoice.prefix}
              onChange={(e) => setInvoice({ ...invoice, prefix: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              placeholder="INV-"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Default Payment Terms (Days)</label>
            <input
              type="number"
              value={invoice.paymentTerms}
              onChange={(e) => setInvoice({ ...invoice, paymentTerms: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Tax Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={invoice.taxRate}
              onChange={(e) => setInvoice({ ...invoice, taxRate: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Invoice Footer Notes</label>
            <textarea
              rows={3}
              value={invoice.footerNotes}
              onChange={(e) => setInvoice({ ...invoice, footerNotes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
              placeholder="Thank you for your business!"
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
            <input
              type="checkbox"
              checked={notifications.newClient}
              onChange={(e) => setNotifications({ ...notifications, newClient: e.target.checked })}
              className="w-5 h-5 rounded border-border-subtle text-accent focus:ring-accent"
            />
          </label>
          <label className="flex items-center justify-between p-3 rounded-lg bg-elevated cursor-pointer hover:bg-elevated/80 transition-colors">
            <div>
              <p className="font-medium">New Ticket Notifications</p>
              <p className="text-sm text-text-muted">Get notified when a new support ticket is created</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.newTicket}
              onChange={(e) => setNotifications({ ...notifications, newTicket: e.target.checked })}
              className="w-5 h-5 rounded border-border-subtle text-accent focus:ring-accent"
            />
          </label>
          <label className="flex items-center justify-between p-3 rounded-lg bg-elevated cursor-pointer hover:bg-elevated/80 transition-colors">
            <div>
              <p className="font-medium">Appointment Reminders</p>
              <p className="text-sm text-text-muted">Get reminded before upcoming appointments</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.appointmentReminders}
              onChange={(e) => setNotifications({ ...notifications, appointmentReminders: e.target.checked })}
              className="w-5 h-5 rounded border-border-subtle text-accent focus:ring-accent"
            />
          </label>
          <label className="flex items-center justify-between p-3 rounded-lg bg-elevated cursor-pointer hover:bg-elevated/80 transition-colors">
            <div>
              <p className="font-medium">Invoice Payment Notifications</p>
              <p className="text-sm text-text-muted">Get notified when an invoice is paid</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.invoicePayments}
              onChange={(e) => setNotifications({ ...notifications, invoicePayments: e.target.checked })}
              className="w-5 h-5 rounded border-border-subtle text-accent focus:ring-accent"
            />
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
            <button
              onClick={handleExport}
              disabled={exporting}
              className="px-4 py-2 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors font-medium text-sm disabled:opacity-50 flex items-center gap-2"
            >
              {exporting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                "Export"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancel}
          className="px-6 py-2.5 rounded-lg border border-border-subtle text-text-secondary hover:bg-elevated transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}
