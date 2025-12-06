"use client";

import { useState, useRef, useEffect } from "react";

type Provider = "claude" | "openai";

interface Model {
  id: string;
  name: string;
  description: string;
}

const MODELS: Record<Provider, Model[]> = {
  claude: [
    { id: "claude-3-opus-20240229", name: "Claude 3 Opus", description: "Most capable" },
    { id: "claude-3-sonnet-20240229", name: "Claude 3 Sonnet", description: "Balanced" },
    { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku", description: "Fastest" },
  ],
  openai: [
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Most capable" },
    { id: "gpt-4", name: "GPT-4", description: "Reliable" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fastest" },
  ],
};

interface ModelSelectorProps {
  provider: Provider;
  model: string;
  onProviderChange: (provider: Provider) => void;
  onModelChange: (model: string) => void;
}

export function ModelSelector({
  provider,
  model,
  onProviderChange,
  onModelChange,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentModel = MODELS[provider].find((m) => m.id === model) || MODELS[provider][0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border-subtle hover:border-border-default transition-colors"
      >
        <div
          className={`w-2 h-2 rounded-full ${
            provider === "claude" ? "bg-orange-500" : "bg-green-500"
          }`}
        />
        <span className="text-sm font-medium">{currentModel.name}</span>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-surface border border-border-subtle rounded-xl shadow-xl z-50 overflow-hidden">
          {/* Provider tabs */}
          <div className="flex border-b border-border-subtle">
            <button
              onClick={() => {
                onProviderChange("claude");
                onModelChange(MODELS.claude[0].id);
              }}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                provider === "claude"
                  ? "bg-accent/10 text-accent border-b-2 border-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                Claude
              </div>
            </button>
            <button
              onClick={() => {
                onProviderChange("openai");
                onModelChange(MODELS.openai[0].id);
              }}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                provider === "openai"
                  ? "bg-accent/10 text-accent border-b-2 border-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                OpenAI
              </div>
            </button>
          </div>

          {/* Model list */}
          <div className="p-2">
            {MODELS[provider].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  onModelChange(m.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-lg text-left transition-colors ${
                  model === m.id
                    ? "bg-accent/10 text-accent"
                    : "hover:bg-elevated text-text-primary"
                }`}
              >
                <div className="font-medium text-sm">{m.name}</div>
                <div className="text-xs text-text-muted">{m.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
