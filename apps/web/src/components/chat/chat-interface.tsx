"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ModelSelector } from "./model-selector";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type Provider = "claude" | "openai";

interface ChatInterfaceProps {
  conversationId?: string;
  onConversationChange?: (id: string | undefined) => void;
}

export function ChatInterface({ conversationId: initialConversationId, onConversationChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [provider, setProvider] = useState<Provider>("claude");
  const [model, setModel] = useState("claude-3-sonnet-20240229");
  const [conversationId, setConversationId] = useState<string | undefined>(initialConversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  // Load conversation when conversationId changes
  useEffect(() => {
    if (initialConversationId && initialConversationId !== conversationId) {
      setConversationId(initialConversationId);
      loadConversation(initialConversationId);
    }
  }, [initialConversationId]);

  const loadConversation = async (id: string) => {
    try {
      setIsLoadingConversation(true);
      const response = await fetch(`/api/conversations/${id}`);
      if (!response.ok) {
        throw new Error("Failed to load conversation");
      }
      const data = await response.json();

      // Set the model from the conversation
      if (data.model) {
        setModel(data.model);
        setProvider(data.model.includes("claude") ? "claude" : "openai");
      }

      // Load messages
      const loadedMessages: Message[] = data.messages.map((m: { id: string; role: string; content: string }) => ({
        id: m.id,
        role: m.role.toLowerCase() as "user" | "assistant",
        content: m.content,
      }));
      setMessages(loadedMessages);
    } catch (error) {
      console.error("Error loading conversation:", error);
    } finally {
      setIsLoadingConversation(false);
    }
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setStreamingContent("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          provider,
          model,
          conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);

                // Handle metadata (conversation ID)
                if (parsed.type === "metadata") {
                  if (parsed.conversationId && parsed.conversationId !== conversationId) {
                    setConversationId(parsed.conversationId);
                    onConversationChange?.(parsed.conversationId);
                  }
                }

                // Handle content
                if (parsed.type === "content" && parsed.content) {
                  fullContent += parsed.content;
                  setStreamingContent(fullContent);
                }

                // Legacy format support
                if (parsed.content && !parsed.type) {
                  fullContent += parsed.content;
                  setStreamingContent(fullContent);
                }
              } catch {
                // Ignore parse errors
              }
            }
          }
        }
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: fullContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent("");
    } catch (error) {
      console.error("Chat error:", error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingContent("");
    setConversationId(undefined);
    onConversationChange?.(undefined);
  };

  if (isLoadingConversation) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex items-center gap-2 text-text-muted">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading conversation...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forge-copper to-forge-copper-light flex items-center justify-center text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L19 8l-7 3.5L5 8l7-3.5zM4 9.5l7 3.5v6.5l-7-3.5V9.5zm9 10v-6.5l7-3.5v6.5l-7 3.5z" />
            </svg>
          </div>
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              AI Assistant
            </h2>
            <p className="text-sm text-text-muted">
              Powered by {provider === "claude" ? "Anthropic Claude" : "OpenAI GPT"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModelSelector
            provider={provider}
            model={model}
            onProviderChange={setProvider}
            onModelChange={setModel}
          />
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
              title="New chat"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forge-copper to-forge-copper-light flex items-center justify-center text-white mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L19 8l-7 3.5L5 8l7-3.5zM4 9.5l7 3.5v6.5l-7-3.5V9.5zm9 10v-6.5l7-3.5v6.5l-7 3.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">How can I help you today?</h3>
            <p className="text-text-secondary max-w-md">
              I&apos;m your Support Forge AI assistant. Ask me anything about IT,
              software development, or our services.
            </p>
            <div className="mt-6 grid gap-3 w-full max-w-md">
              {[
                "How do I set up a cloud backup solution?",
                "What's the best practice for API security?",
                "Help me troubleshoot network connectivity issues",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="p-3 text-left text-sm bg-surface border border-border-subtle rounded-lg hover:border-accent/50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} role={message.role} content={message.content} />
        ))}

        {isLoading && streamingContent && (
          <ChatMessage role="assistant" content={streamingContent} isStreaming />
        )}

        {isLoading && !streamingContent && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-forge-copper to-forge-copper-light flex items-center justify-center text-white">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
              <span
                className="w-2 h-2 bg-text-muted rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <span
                className="w-2 h-2 bg-text-muted rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="pt-4 mt-4 border-t border-border-subtle">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
