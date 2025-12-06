"use client";

import { useState, useCallback } from "react";
import { ChatInterface } from "./chat-interface";
import { ConversationList } from "./conversation-list";

export function ChatPageWrapper() {
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNewConversation = useCallback(() => {
    setConversationId(undefined);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setConversationId(id);
  }, []);

  const handleConversationChange = useCallback((id: string | undefined) => {
    setConversationId(id);
  }, []);

  return (
    <div className="flex h-[calc(100vh-8rem)] -mx-6 -mt-6">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } flex-shrink-0 border-r border-border-subtle bg-surface/50 transition-all duration-300 overflow-hidden`}
      >
        <div className="w-72">
          <ConversationList
            currentConversationId={conversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toggle sidebar button */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border-subtle">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-elevated transition-colors"
            title={sidebarOpen ? "Hide conversations" : "Show conversations"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-sm text-text-muted">
            {conversationId ? "Conversation" : "New Chat"}
          </span>
        </div>

        {/* Chat interface */}
        <div className="flex-1 px-6 py-4 overflow-hidden">
          <ChatInterface
            conversationId={conversationId}
            onConversationChange={handleConversationChange}
          />
        </div>
      </div>
    </div>
  );
}
