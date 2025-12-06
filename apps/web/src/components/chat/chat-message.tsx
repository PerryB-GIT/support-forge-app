"use client";

import { memo } from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

function ChatMessageComponent({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? "bg-accent text-white"
            : "bg-gradient-to-br from-forge-copper to-forge-copper-light text-white"
        }`}
      >
        {isUser ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L19 8l-7 3.5L5 8l7-3.5zM4 9.5l7 3.5v6.5l-7-3.5V9.5zm9 10v-6.5l7-3.5v6.5l-7 3.5z" />
          </svg>
        )}
      </div>

      {/* Message content */}
      <div
        className={`flex-1 max-w-[80%] ${isUser ? "text-right" : ""}`}
      >
        <div
          className={`inline-block p-4 rounded-2xl ${
            isUser
              ? "bg-accent text-white rounded-tr-md"
              : "bg-surface border border-border-subtle rounded-tl-md"
          }`}
        >
          <div className="prose prose-sm prose-invert max-w-none">
            {content.split("\n").map((line, i) => (
              <p key={i} className={`${i > 0 ? "mt-2" : ""} ${isUser ? "" : "text-text-primary"}`}>
                {line || "\u00A0"}
              </p>
            ))}
            {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
            )}
          </div>
        </div>
        <p className={`text-xs text-text-muted mt-1 ${isUser ? "mr-1" : "ml-1"}`}>
          {isUser ? "You" : "Support Forge AI"}
        </p>
      </div>
    </div>
  );
}

export const ChatMessage = memo(ChatMessageComponent);
