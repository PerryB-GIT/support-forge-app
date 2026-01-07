"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const templates = [
  {
    category: "Assessment & Planning",
    items: [
      {
        id: "ai-readiness-audit",
        title: "AI Readiness Audit",
        description: "Comprehensive assessment to evaluate your organization's AI readiness",
        module: "Module 1",
        fileType: "PDF",
      },
      {
        id: "account-setup-checklist",
        title: "Account Setup Checklist",
        description: "Complete checklist for setting up all required accounts and tools",
        module: "Module 1",
        fileType: "PDF",
      },
      {
        id: "automation-roi-calculator",
        title: "Automation ROI Calculator",
        description: "Calculate the return on investment for your automation projects",
        module: "Module 5",
        fileType: "Excel",
      },
    ],
  },
  {
    category: "Project Management",
    items: [
      {
        id: "project-tracker",
        title: "Project Tracker",
        description: "Track your AI implementation projects from start to finish",
        module: "All Modules",
        fileType: "Excel",
      },
      {
        id: "monthly-cost-tracker",
        title: "Monthly Cost Tracker",
        description: "Monitor and manage your AI tool subscription costs",
        module: "Module 6",
        fileType: "Excel",
      },
      {
        id: "weekly-report-template",
        title: "Weekly Report Template",
        description: "Standard template for weekly AI implementation reports",
        module: "Module 8",
        fileType: "Word",
      },
    ],
  },
  {
    category: "Technical Documentation",
    items: [
      {
        id: "system-runbook-template",
        title: "System Runbook Template",
        description: "Document your AI systems for maintenance and handoff",
        module: "Module 7",
        fileType: "Word",
      },
      {
        id: "automation-spec-template",
        title: "Automation Spec Template",
        description: "Specify automation requirements before building",
        module: "Module 5",
        fileType: "Word",
      },
      {
        id: "client-onboarding-template",
        title: "Client Onboarding Template",
        description: "Capstone project template for client onboarding workflow",
        module: "Module 8",
        fileType: "Word",
      },
    ],
  },
  {
    category: "Security & Compliance",
    items: [
      {
        id: "credential-vault",
        title: "Credential Vault Template",
        description: "Secure template for managing API keys and credentials",
        module: "Module 7",
        fileType: "PDF",
      },
      {
        id: "security-audit-checklist",
        title: "Security Audit Checklist",
        description: "Comprehensive security review checklist for AI implementations",
        module: "Module 7",
        fileType: "PDF",
      },
      {
        id: "responsible-ai-checklist",
        title: "Responsible AI Checklist",
        description: "Ensure your AI implementations follow ethical guidelines",
        module: "Module 7",
        fileType: "PDF",
      },
    ],
  },
  {
    category: "Troubleshooting",
    items: [
      {
        id: "mcp-troubleshooting-checklist",
        title: "MCP Troubleshooting Checklist",
        description: "Step-by-step guide for diagnosing MCP connection issues",
        module: "Module 3",
        fileType: "PDF",
      },
      {
        id: "launch-readiness-checklist",
        title: "Launch Readiness Checklist",
        description: "Final checklist before going live with your AI systems",
        module: "Module 8",
        fileType: "PDF",
      },
    ],
  },
];

const fileTypeIcons: Record<string, React.ReactNode> = {
  PDF: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Excel: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  Word: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

export default function TemplatesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrolled, setEnrolled] = useState<boolean | null>(null);

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
            <span className="text-text-primary">Templates</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Templates & Worksheets
            </h1>
            <p className="text-text-secondary">
              Download these templates to support your AI implementation journey.
            </p>
          </div>

          {/* Template Categories */}
          <div className="space-y-8">
            {templates.map((category) => (
              <div key={category.category}>
                <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-surface border border-border-subtle rounded-xl p-5 hover:border-accent transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                          {fileTypeIcons[item.fileType]}
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-background text-text-muted">
                          {item.module}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4">{item.description}</p>
                      <button
                        onClick={() => {
                          // In production, this would trigger a download
                          alert(`Downloading ${item.title}...`);
                        }}
                        className="flex items-center gap-2 text-accent text-sm hover:underline"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download {item.fileType}
                      </button>
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
