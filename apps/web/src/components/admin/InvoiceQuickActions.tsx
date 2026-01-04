"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

interface InvoiceQuickActionsProps {
  invoiceId: string;
  invoiceNumber: string;
  currentStatus: string;
}

export function InvoiceQuickActions({
  invoiceId,
  invoiceNumber,
  currentStatus,
}: InvoiceQuickActionsProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [markingPaid, setMarkingPaid] = useState(false);
  const [sendingReminder, setSendingReminder] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  async function handleMarkAsPaid() {
    setMarkingPaid(true);
    try {
      const res = await fetch(`/api/admin/invoices/${invoiceId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });

      if (res.ok) {
        addToast("Invoice marked as paid", "success");
        router.refresh();
      } else {
        addToast("Failed to update status", "error");
      }
    } catch (error) {
      console.error("Failed to mark as paid:", error);
      addToast("Failed to update status", "error");
    } finally {
      setMarkingPaid(false);
    }
  }

  async function handleSendReminder() {
    setSendingReminder(true);
    try {
      const res = await fetch(`/api/admin/invoices/${invoiceId}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "reminder" }),
      });

      const data = await res.json();
      if (res.ok) {
        addToast(data.message || "Reminder sent", "success");
      } else {
        addToast(data.error || "Failed to send reminder", "error");
      }
    } catch (error) {
      console.error("Failed to send reminder:", error);
      addToast("Failed to send reminder", "error");
    } finally {
      setSendingReminder(false);
    }
  }

  function handleDownloadPdf() {
    setDownloadingPdf(true);
    // Open the PDF endpoint in a new tab for printing/saving
    const pdfUrl = `/api/admin/invoices/${invoiceId}/pdf`;
    const newWindow = window.open(pdfUrl, "_blank");

    if (newWindow) {
      // Wait a moment then trigger print dialog
      newWindow.onload = () => {
        setTimeout(() => {
          newWindow.print();
        }, 500);
      };
    }

    addToast("PDF opened in new tab - use Print to save as PDF", "success");
    setDownloadingPdf(false);
  }

  const isPaid = currentStatus.toLowerCase() === "paid";

  return (
    <div className="space-y-2">
      {!isPaid && (
        <button
          onClick={handleMarkAsPaid}
          disabled={markingPaid}
          className="w-full px-4 py-2.5 rounded-lg bg-success/10 text-success hover:bg-success/20 font-medium transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {markingPaid ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Mark as Paid"
          )}
        </button>
      )}
      <button
        onClick={handleSendReminder}
        disabled={sendingReminder}
        className="w-full px-4 py-2.5 rounded-lg bg-elevated hover:bg-border-subtle font-medium transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {sendingReminder ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Reminder
          </>
        )}
      </button>
      <button
        onClick={handleDownloadPdf}
        disabled={downloadingPdf}
        className="w-full px-4 py-2.5 rounded-lg bg-elevated hover:bg-border-subtle font-medium transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {downloadingPdf ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Opening...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </>
        )}
      </button>
    </div>
  );
}
