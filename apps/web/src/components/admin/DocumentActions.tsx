"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useToast } from "@/components/ui/Toast";

interface DocumentActionsProps {
  documentId: string;
  documentName: string;
  documentUrl: string;
}

export function DocumentActions({
  documentId,
  documentName,
  documentUrl,
}: DocumentActionsProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/documents/${documentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setShowDeleteModal(false);
        addToast("Document deleted", "success");
        router.refresh();
      } else {
        const data = await res.json();
        addToast(data.error || "Failed to delete document", "error");
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
      addToast("Failed to delete document", "error");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <a
          href={documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors"
          title="Download"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
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
        title="Delete Document"
        itemName={documentName}
        entityType="Document"
        isDeleting={isDeleting}
        warningMessage="This will permanently delete the file from storage."
      />
    </>
  );
}
