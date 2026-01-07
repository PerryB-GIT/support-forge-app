"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const configFiles = [
  {
    category: "MCP Configuration",
    items: [
      {
        id: "mcp-starter",
        title: "MCP Starter Config",
        description: "Basic MCP configuration for Claude Code with essential servers",
        module: "Module 3",
        filename: "claude_desktop_config.json",
        code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
    }
  }
}`,
      },
      {
        id: "mcp-full",
        title: "Full MCP Config",
        description: "Complete MCP configuration with Google, GitHub, and automation servers",
        module: "Module 3",
        filename: "claude_desktop_config_full.json",
        code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    },
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-gdrive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    },
    "zapier": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-zapier"],
      "env": {
        "ZAPIER_API_KEY": "your-api-key"
      }
    }
  }
}`,
      },
    ],
  },
  {
    category: "Claude Code Settings",
    items: [
      {
        id: "claude-settings",
        title: "Recommended Settings",
        description: "Optimized Claude Code settings for productivity",
        module: "Module 2",
        filename: "settings.json",
        code: `{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Bash(node:*)"
    ],
    "deny": []
  },
  "model": "claude-sonnet-4-20250514",
  "customInstructions": "Focus on clean, maintainable code. Use TypeScript when possible."
}`,
      },
      {
        id: "claude-md",
        title: "CLAUDE.md Template",
        description: "Project-level Claude Code configuration template",
        module: "Module 2",
        filename: "CLAUDE.md",
        code: `# Project Configuration

## About This Project
- **Name**: Your Project Name
- **Stack**: Next.js, TypeScript, Tailwind CSS
- **Database**: PostgreSQL

## Code Style
- Use TypeScript over JavaScript
- Prefer functional components in React
- Use Tailwind CSS for styling
- Always include proper error handling

## Common Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run test\` - Run tests

## Important Notes
- Never commit API keys or secrets
- Use environment variables for configuration
`,
      },
    ],
  },
  {
    category: "Automation Workflows",
    items: [
      {
        id: "n8n-starter",
        title: "n8n Starter Workflow",
        description: "Basic n8n workflow template for AI integrations",
        module: "Module 5",
        filename: "n8n-ai-workflow.json",
        code: `{
  "name": "AI Content Processor",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300],
      "webhookId": "unique-id",
      "parameters": {
        "httpMethod": "POST",
        "path": "ai-process"
      }
    },
    {
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "position": [450, 300],
      "parameters": {
        "model": "gpt-4",
        "systemMessage": "Process the incoming content."
      }
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "AI Agent", "type": "main", "index": 0}]]
    }
  }
}`,
      },
      {
        id: "zapier-mcp",
        title: "Zapier MCP Setup",
        description: "Configuration for Zapier MCP server integration",
        module: "Module 5",
        filename: "zapier-mcp-config.json",
        code: `{
  "zapier": {
    "command": "npx",
    "args": [
      "-y",
      "@anthropic/mcp-server-zapier"
    ],
    "env": {
      "ZAPIER_MCP_API_KEY": "your-zapier-mcp-key"
    }
  }
}`,
      },
    ],
  },
  {
    category: "Deployment",
    items: [
      {
        id: "amplify-config",
        title: "AWS Amplify Config",
        description: "Amplify deployment configuration for Next.js",
        module: "Module 6",
        filename: "amplify.yml",
        code: `version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*`,
      },
      {
        id: "docker-compose",
        title: "Docker Compose Template",
        description: "Docker setup for self-hosted AI tools",
        module: "Module 6",
        filename: "docker-compose.yml",
        code: `version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=\${N8N_PASSWORD}
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:`,
      },
    ],
  },
];

export default function ConfigPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    async function checkEnrollment() {
      try {
        const email = session?.user?.email || "";
        const res = await fetch(`/api/academy/enrollment?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        setEnrolled(data.enrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
        setEnrolled(false);
      }
    }

    if (status !== "loading") {
      checkEnrollment();
    }
  }, [session, status]);

  const copyToClipboard = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (status === "loading" || enrolled === null) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-surface rounded w-1/3"></div>
              <div className="h-64 bg-surface rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!enrolled) {
    router.push("/academy");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
            <Link href="/academy/dashboard" className="hover:text-accent">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-text-primary">Config Files</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Config Files & Code Samples
            </h1>
            <p className="text-text-secondary">
              Copy these configurations to quickly set up your AI development environment.
            </p>
          </div>

          {/* Config Categories */}
          <div className="space-y-12">
            {configFiles.map((category) => (
              <div key={category.category}>
                <h2 className="text-xl font-semibold mb-6">{category.category}</h2>
                <div className="space-y-6">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-surface border border-border-subtle rounded-xl overflow-hidden"
                    >
                      <div className="p-5 border-b border-border-subtle">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-text-secondary text-sm">{item.description}</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-background text-text-muted">
                            {item.module}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-text-muted text-sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {item.filename}
                        </div>
                      </div>
                      <div className="relative">
                        <pre className="p-4 overflow-x-auto text-sm bg-background/50">
                          <code className="text-text-secondary">{item.code}</code>
                        </pre>
                        <button
                          onClick={() => copyToClipboard(item.id, item.code)}
                          className="absolute top-3 right-3 p-2 rounded-lg bg-surface border border-border-subtle hover:border-accent transition-colors"
                          title="Copy to clipboard"
                        >
                          {copied === item.id ? (
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Back to Dashboard */}
          <div className="mt-12 pt-8 border-t border-border-subtle">
            <Link
              href="/academy/dashboard"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
