"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Password is checked against env var via API
const DOWNLOAD_URL = "/downloads/sf-setup.exe";

export default function SetupPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Check if already authenticated in this session
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
              Enter the access code provided by your instructor to download the Claude Code setup tools.
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
                {loading ? "Verifying..." : "Access Downloads"}
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

  // Authenticated - show downloads
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border-subtle bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
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

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Claude Code Setup Tools
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Download and run the SF Setup installer to configure Claude Code with <span className="text-accent font-medium">Anthropic Official MCP servers</span>, pre-configured skills, and integrations.
          </p>
        </div>

        {/* Download Card */}
        <div className="bg-surface border border-border-subtle rounded-2xl p-8 mb-8">
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
                <span className="text-xs bg-surface-elevated text-text-muted px-2 py-1 rounded border border-border-subtle">v1.1.0</span>
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

        {/* Anthropic Official MCP Servers */}
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Anthropic Official MCP Servers
              </h3>
              <p className="text-sm text-text-secondary">Now included in the Anthropic Essentials bundle</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-background/50 rounded-lg p-3 border border-border-subtle">
              <p className="font-medium text-text-primary text-sm">Memory</p>
              <p className="text-xs text-text-muted">Long-term context</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border-subtle">
              <p className="font-medium text-text-primary text-sm">Sequential Thinking</p>
              <p className="text-xs text-text-muted">Problem solving</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border-subtle">
              <p className="font-medium text-text-primary text-sm">Brave Search</p>
              <p className="text-xs text-text-muted">Web search API</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border-subtle">
              <p className="font-medium text-text-primary text-sm">Puppeteer</p>
              <p className="text-xs text-text-muted">Browser automation</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border-subtle">
              <p className="font-medium text-text-primary text-sm">Fetch</p>
              <p className="text-xs text-text-muted">Web content</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border-subtle">
              <p className="font-medium text-text-primary text-sm">Git</p>
              <p className="text-xs text-text-muted">Repository ops</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border-subtle">
              <p className="font-medium text-text-primary text-sm">Time</p>
              <p className="text-xs text-text-muted">Timezone tools</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border-subtle">
              <p className="font-medium text-text-primary text-sm">+ 34 more</p>
              <p className="text-xs text-text-muted">MCP servers</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-surface border border-border-subtle rounded-2xl p-8 mb-8">
          <h3 className="text-lg font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Quick Start Guide
          </h3>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">Download and Run</p>
                <p className="text-sm text-text-secondary">Download sf-setup.exe and double-click to run. Windows may show a security prompt - click "More info" then "Run anyway".</p>
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
                <p className="font-medium text-text-primary">Enter Credentials</p>
                <p className="text-sm text-text-secondary">Add API keys for services like Zapier, GitHub, OpenAI, etc. The wizard will guide you through each one.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold flex-shrink-0">5</span>
              <div>
                <p className="font-medium text-text-primary">Restart Claude Code</p>
                <p className="text-sm text-text-secondary">After installation, restart Claude Code to load your new MCP servers and tools.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Commands Reference */}
        <div className="bg-surface border border-border-subtle rounded-2xl p-8">
          <h3 className="text-lg font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            CLI Commands
          </h3>
          <div className="bg-background rounded-lg p-4 font-mono text-sm space-y-2">
            <div><span className="text-text-muted"># Launch GUI wizard</span></div>
            <div className="text-accent">sf-setup.exe --gui</div>
            <div className="mt-4"><span className="text-text-muted"># Interactive CLI wizard</span></div>
            <div className="text-accent">sf-setup.exe</div>
            <div className="mt-4"><span className="text-text-muted"># List available modules</span></div>
            <div className="text-accent">sf-setup.exe list</div>
            <div className="mt-4"><span className="text-text-muted"># Check system health</span></div>
            <div className="text-accent">sf-setup.exe doctor</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-text-muted text-sm">
          <p>Need help? Contact your Support Forge consultant or visit the Academy dashboard.</p>
        </div>
      </main>
    </div>
  );
}
