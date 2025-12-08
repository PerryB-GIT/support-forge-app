"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface AppointmentActionsProps {
  appointmentId: string;
  clientName: string;
  appointmentDate: string;
}

export function AppointmentActions({
  appointmentId,
  clientName,
  appointmentDate,
}: AppointmentActionsProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setShowDeleteModal(false);
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete appointment");
      }
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      alert("Failed to delete appointment");
    } finally {
      setIsDeleting(false);
    }
  }

  const formattedDate = new Date(appointmentDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/admin/appointments/${appointmentId}/edit`}
          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors"
          title="Edit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </Link>
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
        title="Delete Appointment"
        itemName={`${clientName}'s appointment on ${formattedDate}`}
        entityType="Appointment"
        isDeleting={isDeleting}
      />
    </>
  );
}
