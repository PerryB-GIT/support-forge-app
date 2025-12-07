"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function InvoiceStatusDropdown({
  invoiceId,
  currentStatus,
}: {
  invoiceId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

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
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdating(false);
    }
  }

  return (
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
  );
}
