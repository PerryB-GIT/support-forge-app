"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface TicketCommentFormProps {
  ticketId: string;
}

export function TicketCommentForm({ ticketId }: TicketCommentFormProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) {
      setError("Please enter a comment");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (res.ok) {
        setContent("");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add comment");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border-subtle">
      <div className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none transition-colors placeholder:text-text-muted"
          disabled={isSubmitting}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Posting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Add Comment
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
