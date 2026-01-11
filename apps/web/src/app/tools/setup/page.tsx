"use client";

import { useState, useEffect, useMemo } from "react";
import { mcpServers, bundles, categories, type McpServer } from "@/data/mcp-catalog";

const DOWNLOAD_URL = "/downloads/sf-setup.exe";

type TabType = "download" | "build";

export default function SetupPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("download");
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("sf-setup-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setCheckingSession(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tools/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem("sf-setup-auth", "true");
        setIsAuthenticated(true);
      } else {
        setError("Invalid access code. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (moduleId: string) => {
    setSelectedBundle(null);
    const newSet = new Set(selectedModules);
    if (newSet.has(moduleId)) {
      newSet.delete(moduleId);
    } else {
      newSet.add(moduleId);
    }
    setSelectedModules(newSet);
  };

  const selectBundle = (bundleId: string) => {
    const bundle = bundles[bundleId];
    if (bundle) {
      setSelectedBundle(bundleId);
      setSelectedModules(new Set(bundle.modules));
    }
  };

  const clearSelection = () => {
    setSelectedBundle(null);
    setSelectedModules(new Set());
  };

  const generatedConfig = useMemo(() => {
    const config: Record<string, { command: string; args: string[]; env?: Record<string, string> }> = {};

    selectedModules.forEach(moduleId => {
      // Find the server by id field
      const server = Object.values(mcpServers).find(s => s.id === moduleId);
      if (server) {
        config[server.id] = { ...server.config };
      }
    });

    return {
      mcpServers: config
    };
  }, [selectedModules]);

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modulesByCategory = useMemo(() => {
    const grouped: Record<string, McpServer[]> = {};
    Object.values(mcpServers).forEach(server => {
      if (!grouped[server.category]) {
        grouped[server.category] = [];
      }
      grouped[server.category].push(server);
    });
    return grouped;
  }, []);

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text-muted">Loading...</div>
      </div>
    );
  }

  // Password gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-surface border border-border-subtle rounded-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 flex items-center justify-center">
                <span className="text-white font-black text-lg">SF</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  SF Setup Tools
                </h1>
                <p className="text-sm text-text-muted">Support Forge Academy</p>
              </div>
            </div>

            <p className="text-text-secondary text-sm text-center mb-6">
              Enter the access code provided by your instructor to access the Claude Code setup tools.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Access Code
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access code"
                  className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  required
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full py-3 px-4 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                {loading ? "Verifying..." : "Access Setup Tools"}
              </button>
            </form>

            <p className="text-xs text-text-muted text-center mt-6">
              Need access? Contact your Support Forge consultant.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border-subtle bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-black text-sm">SF</span>
            </div>
            <span className="text-lg font-bold text-accent" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Setup Tools
            </span>
          </div>
          <span className="text-xs text-text-muted bg-surface px-3 py-1.5 rounded-full border border-border-subtle">
            Academy Access
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-border-subtle">
          <button
            onClick={() => setActiveTab("download")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "download"
                ? "text-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Download Installer
            {activeTab === "download" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("build")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "build"
                ? "text-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Build Your Own Config
            {activeTab === "build" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        </div>

        {/* Download Tab */}
        {activeTab === "download" && (
          <div className="space-y-8">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Claude Code Setup Tools
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Download and run the SF Setup installer to configure Claude Code with MCP servers, skills, and integrations.
              </p>
            </div>

            {/* Download Card */}
            <div className="bg-surface border border-border-subtle rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    SF Setup for Windows
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Standalone installer with GUI wizard. No Node.js required.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Windows 10/11</span>
                    <span className="text-xs bg-surface-elevated text-text-muted px-2 py-1 rounded border border-border-subtle">~51 MB</span>
                    <span className="text-xs bg-surface-elevated text-text-muted px-2 py-1 rounded border border-border-subtle">v1.0.0</span>
                  </div>
                  <a
                    href={DOWNLOAD_URL}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download sf-setup.exe
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="bg-surface border border-border-subtle rounded-2xl p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Quick Start Guide
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium text-text-primary">Download and Run</p>
                    <p className="text-sm text-text-secondary">Download sf-setup.exe and double-click to run. Windows may show a security prompt - click &quot;More info&quot; then &quot;Run anyway&quot;.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium text-text-primary">Choose Your Setup</p>
                    <p className="text-sm text-text-secondary">Run <code className="bg-background px-2 py-0.5 rounded text-accent">sf-setup.exe --gui</code> for the visual wizard, or just run the exe for the CLI.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium text-text-primary">Select Your Tools</p>
                    <p className="text-sm text-text-secondary">Pick a bundle (Starter, Professional, DevOps, etc.) or select individual MCP servers and integrations.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="font-medium text-text-primary">Restart Claude Code</p>
                    <p className="text-sm text-text-secondary">After installation, restart Claude Code to load your new MCP servers and tools.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Build Your Own Tab */}
        {activeTab === "build" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Build Your Own Configuration
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Select a bundle or pick individual MCP servers to generate your custom Claude Code configuration.
              </p>
            </div>

            {/* Selection Summary */}
            <div className="bg-surface border border-border-subtle rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-accent">{selectedModules.size}</div>
                <div>
                  <p className="font-medium text-text-primary">Modules Selected</p>
                  <p className="text-sm text-text-muted">
                    {selectedBundle ? `Bundle: ${bundles[selectedBundle]?.name}` : "Custom selection"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {selectedModules.size > 0 && (
                  <>
                    <button
                      onClick={clearSelection}
                      className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowExportModal(true)}
                      className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-colors"
                    >
                      Export Config
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Start Bundles */}
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Quick Start Bundles
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.values(bundles).map((bundle) => (
                  <button
                    key={bundle.id}
                    onClick={() => selectBundle(bundle.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedBundle === bundle.id
                        ? "border-accent bg-accent/10"
                        : "border-border-subtle bg-surface hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{bundle.icon}</span>
                      <div>
                        <h3 className="font-semibold text-text-primary">{bundle.name}</h3>
                        {bundle.recommended && (
                          <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded">Recommended</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{bundle.description}</p>
                    <p className="text-xs text-text-muted">{bundle.modules.length} modules</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Modules by Category */}
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Individual Modules
              </h2>
              <div className="space-y-6">
                {Object.entries(modulesByCategory).map(([category, servers]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                      {categories[category] || category}
                    </h3>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {servers.map((server) => (
                        <button
                          key={server.id}
                          onClick={() => toggleModule(server.id)}
                          className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
                            selectedModules.has(server.id)
                              ? "border-accent bg-accent/10"
                              : "border-border-subtle bg-surface hover:border-accent/50"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            selectedModules.has(server.id)
                              ? "bg-accent text-white"
                              : "bg-background border border-border-subtle"
                          }`}>
                            {selectedModules.has(server.id) && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-text-primary">{server.name}</span>
                              {server.requiresAuth && (
                                <span className="text-xs text-amber-400">🔑</span>
                              )}
                            </div>
                            <p className="text-xs text-text-secondary truncate">{server.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1">
                <span className="text-amber-400">🔑</span> Requires API key
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-border-subtle rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Your MCP Configuration
              </h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-background rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-text-secondary mb-4">
              Copy this configuration and add it to your Claude Code settings file at:
              <code className="block mt-2 px-3 py-2 bg-background rounded text-accent text-xs">
                %APPDATA%\Claude\claude_desktop_config.json
              </code>
            </p>

            <div className="flex-1 overflow-auto bg-background rounded-lg p-4 font-mono text-sm">
              <pre className="text-text-primary whitespace-pre-wrap">
                {JSON.stringify(generatedConfig, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                Close
              </button>
              <button
                onClick={copyConfig}
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
