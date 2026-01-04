"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useToast } from "@/components/ui/Toast";

interface InvoiceActionsProps {
  invoiceId: string;
  invoiceNumber: string;
  currentStatus: string;
}

export function InvoiceActions({
  invoiceId,
  invoiceNumber,
  currentStatus,
}: InvoiceActionsProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  async function handleSendEmail() {
    setSendingEmail(true);
    try {
      const res = await fetch(`/api/admin/invoices/${invoiceId}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "invoice" }),
      });

      const data = await res.json();
      if (res.ok) {
        addToast(data.message || "Invoice email sent", "success");
      } else {
        addToast(data.error || "Failed to send email", "error");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      addToast("Failed to send email", "error");
    } finally {
      setSendingEmail(false);
    }
  }

  async function handleStatusChange(newStatus: string) {
    if (newStatus === currentStatus) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/invoices/${invoiceId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        addToast("Invoice status updated", "success");
        router.refresh();
      } else {
        addToast("Failed to update status", "error");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      addToast("Failed to update status", "error");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/invoices/${invoiceId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setShowDeleteModal(false);
        addToast("Invoice deleted", "success");
        router.refresh();
      } else {
        const data = await res.json();
        addToast(data.error || "Failed to delete invoice", "error");
      }
    } catch (error) {
      console.error("Failed to delete invoice:", error);
      addToast("Failed to delete invoice", "error");
    } finally {
      setIsDeleting(false);
    }
  }

  const isPaid = currentStatus.toLowerCase() === "paid";

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        {!isPaid && (
          <button
            onClick={() => handleStatusChange("paid")}
            disabled={updating}
            className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1"
            title="Mark as Paid"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {updating ? "..." : "Paid"}
          </button>
        )}
        <Link
          href={`/admin/invoices/${invoiceId}`}
          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors"
          title="View"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </Link>
        <Link
          href={`/admin/invoices/${invoiceId}/edit`}
          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors"
          title="Edit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </Link>
        <button
          onClick={handleSendEmail}
          disabled={sendingEmail}
          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-accent transition-colors disabled:opacity-50"
          title="Send Email"
        >
          {sendingEmail ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </button>
        <select
          name="status"
          defaultValue={currentStatus}
          disabled={updating}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="text-xs px-2 py-1 rounded bg-elevated border border-border-subtle cursor-pointer disabled:opacity-50"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="p-2 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-500 transition-colors"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Invoice"
        itemName={`Invoice #${invoiceNumber}`}
        entityType="Invoice"
        isDeleting={isDeleting}
        warningMessage="All invoice line items will also be deleted."
      />
    </>
  );
}
