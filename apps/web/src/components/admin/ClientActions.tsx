"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface ClientActionsProps {
  clientId: string;
  clientName: string;
  projectCount: number;
  ticketCount: number;
  invoiceCount: number;
}

export function ClientActions({
  clientId,
  clientName,
  projectCount,
  ticketCount,
  invoiceCount,
}: ClientActionsProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const hasRelatedData = projectCount > 0 || ticketCount > 0 || invoiceCount > 0;

  const warningMessage = hasRelatedData
    ? `This client has ${projectCount} project(s), ${ticketCount} ticket(s), and ${invoiceCount} invoice(s) that will also be deleted.`
    : undefined;

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/clients/${clientId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setShowDeleteModal(false);
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete client");
      }
    } catch (error) {
      console.error("Failed to delete client:", error);
      alert("Failed to delete client");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/admin/clients/${clientId}`}
          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors"
          title="View"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </Link>
        <Link
          href={`/admin/clients/${clientId}/edit`}
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
        title="Delete Client"
        itemName={clientName}
        entityType="Client"
        isDeleting={isDeleting}
        warningMessage={warningMessage}
      />
    </>
  );
}
