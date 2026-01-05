import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CONTACT_INFO } from "@support-forge/shared";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI Launchpad - Learn to Build AI That Works | Support Forge",
  description: "Master AI implementation with our comprehensive training program. Learn the LAUNCH Method and build AI systems that actually work for your business.",
  keywords: "AI training, AI implementation, business AI, AI consulting, LAUNCH Method, AI automation",
  openGraph: {
    title: "AI Launchpad - Learn to Build AI That Works | Support Forge",
    description: "Master AI implementation with our comprehensive training program.",
    type: "website",
  },
};

// LAUNCH letter components - styled to match site aesthetic
const LaunchLetter = ({ letter }: { letter: string }) => (
  <span
    className="text-3xl font-bold"
    style={{ fontFamily: "var(--font-space-grotesk)" }}
  >
    {letter}
  </span>
);

// Category icons
const CategoryIcons = {
  AIDevelopment: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      <path strokeLinecap="round" strokeWidth={1.5} d="M9 9l2 2-2 2M15 9l-2 2 2 2" />
    </svg>
  ),
  Automation: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  CloudData: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  Development: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Productivity: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
};

// Tool icons (small, for individual tools)
const ToolIcon = ({ type }: { type: string }) => {
  const icons: Record<string, ReactNode> = {
    ai: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    code: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    api: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    plugin: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    automation: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    workflow: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
    cloud: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    brain: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    data: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    git: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
    container: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    ide: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    calendar: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    chat: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    design: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };
  return icons[type] || icons.ai;
};

// LAUNCH Method steps
const launchSteps = [
  { letter: "L", name: "Landscape", desc: "Map your current processes and identify high-impact AI opportunities" },
  { letter: "A", name: "Architect", desc: "Design your AI ecosystem with the right tools and integrations" },
  { letter: "U", name: "Unlock", desc: "Master prompt engineering and AI interaction patterns" },
  { letter: "N", name: "Network", desc: "Connect your AI tools into automated workflows" },
  { letter: "C", name: "Configure", desc: "Fine-tune and customize for your specific use cases" },
  { letter: "H", name: "Harden", desc: "Secure, document, and prepare for scale" },
];

// Launchpad Stack - organized by category
const stackCategories = [
  {
    name: "AI Development",
    Icon: CategoryIcons.AIDevelopment,
    items: [
      { iconType: "code", name: "Claude Code", desc: "AI coding assistant" },
      { iconType: "plugin", name: "MCP Servers", desc: "Model context protocol" },
      { iconType: "api", name: "Claude API", desc: "Anthropic's API" },
      { iconType: "ai", name: "Gemini", desc: "Google's AI model" },
    ],
  },
  {
    name: "Automation",
    Icon: CategoryIcons.Automation,
    items: [
      { iconType: "workflow", name: "n8n", desc: "Open-source automation" },
      { iconType: "automation", name: "Zapier", desc: "No-code automation" },
      { iconType: "workflow", name: "Make", desc: "Visual automation" },
    ],
  },
  {
    name: "Cloud & Data",
    Icon: CategoryIcons.CloudData,
    items: [
      { iconType: "cloud", name: "AWS", desc: "Amazon Web Services" },
      { iconType: "cloud", name: "Google Cloud", desc: "GCP services" },
      { iconType: "brain", name: "Vertex AI", desc: "Google ML platform" },
      { iconType: "data", name: "BigQuery", desc: "Data analytics" },
    ],
  },
  {
    name: "Development",
    Icon: CategoryIcons.Development,
    items: [
      { iconType: "git", name: "GitHub", desc: "Code & collaboration" },
      { iconType: "container", name: "Docker", desc: "Containerization" },
      { iconType: "ide", name: "VS Code", desc: "Development IDE" },
    ],
  },
  {
    name: "Productivity",
    Icon: CategoryIcons.Productivity,
    items: [
      { iconType: "email", name: "Google Workspace", desc: "Gmail, Drive, Docs" },
      { iconType: "calendar", name: "Calendar", desc: "Scheduling APIs" },
      { iconType: "chat", name: "Slack", desc: "Team communication" },
      { iconType: "design", name: "Canva", desc: "Design automation" },
    ],
  },
];

// ROI stats with icons
const roiStats = [
  {
    number: "10+",
    label: "Hours saved per week on average",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    number: "3x",
    label: "Faster response times to clients",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    number: "80%",
    label: "Reduction in manual data entry",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
];

// Credential icons
const CredentialIcons = {
  certification: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  trackRecord: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
};

export default function LaunchpadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                Transform Your Business with AI
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Learn to Build AI That
                <span className="text-accent"> Actually Works</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8">
                Stop wasting money on AI subscriptions you don&apos;t use. Master the LAUNCH Method and
                build AI systems that transform how you work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#tiers"
                  className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105 text-center"
                >
                  View Programs
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all text-center"
                >
                  Book a Call
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Animated rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border border-accent/20 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-accent/30"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg className="w-16 h-16 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                {/* Floating nodes */}
                <div className="absolute top-8 left-8 w-12 h-12 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="absolute bottom-8 left-8 w-12 h-12 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section id="tiers" className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Choose Your <span className="text-accent">Path</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Whether you want to learn DIY or have us build it for you, we have the right option.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Academy Tier */}
            <div className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                AI Academy
              </h3>
              <p className="text-text-secondary mb-6">Learn to build AI systems yourself</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-accent" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  $997
                </span>
                <span className="text-text-secondary ml-2">one-time</span>
                <p className="text-text-muted text-sm mt-1">or 3 payments of $397</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Complete LAUNCH Method curriculum",
                  "12+ hours of video training",
                  "Private community access",
                  "Monthly group coaching calls",
                  "Templates & prompt libraries",
                  "Lifetime updates",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact?subject=AI%20Academy"
                className="block w-full text-center px-6 py-3 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-colors"
              >
                Enroll Now
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="relative group p-8 rounded-2xl bg-gradient-to-br from-background to-accent/5 border-2 border-accent transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                AI Launchpad Pro
              </h3>
              <p className="text-text-secondary mb-6">We build your AI systems with you</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-accent" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  $5,000
                </span>
                <span className="text-text-secondary ml-2">starting</span>
                <p className="text-text-muted text-sm mt-1">Typically 3-5x ROI within 90 days</p>
                <p className="text-accent/80 text-xs mt-2 font-medium">Save 10+ hrs/week = $26k+ annual value</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Academy, plus:",
                  "1-on-1 implementation sessions",
                  "Custom AI workflow builds",
                  "Your processes, automated",
                  "90 days of priority support",
                  "Done-with-you approach",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact?subject=AI%20Launchpad%20Pro"
                className="block w-full text-center px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
              >
                Book Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCH Method Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              The <span className="text-accent">LAUNCH</span> Method
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our proven 6-phase framework for implementing AI that actually works
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {launchSteps.map((step) => (
              <div
                key={step.letter}
                className="group p-6 rounded-2xl bg-surface border border-border-subtle hover:border-accent transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform">
                    <LaunchLetter letter={step.letter} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.name}</h3>
                    <p className="text-text-secondary text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launchpad Stack Section */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              The Launchpad <span className="text-accent">Stack</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Master the complete toolkit for building AI-powered business systems
            </p>
          </div>

          <div className="space-y-8">
            {stackCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <category.Icon />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">{category.name}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="group p-4 rounded-xl bg-background border border-border-subtle hover:border-accent transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                          <ToolIcon type={item.iconType} />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-text-muted text-xs">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Real <span className="text-accent">Results</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              What our clients typically achieve after implementing AI
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {roiStats.map((stat) => (
              <div
                key={stat.label}
                className="p-8 rounded-2xl bg-surface border border-border-subtle text-center group hover:border-accent transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div
                  className="text-5xl font-bold text-accent mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.number}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Why <span className="text-accent">Trust Us</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Backed by real certifications and proven experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Certifications */}
            <div className="p-8 rounded-2xl bg-background border border-border-subtle">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  {CredentialIcons.certification}
                </div>
                Certifications
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-accent font-medium mb-2">Google Cloud</p>
                  <ul className="space-y-2">
                    {[
                      "Introduction to Generative AI",
                      "Introduction to Large Language Models",
                      "Introduction to Responsible AI",
                      "Generative AI Fundamentals",
                    ].map((cert, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-secondary text-sm">
                        <span className="text-accent">{CredentialIcons.check}</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-accent font-medium mb-2">Cloud & DevOps</p>
                  <ul className="space-y-2">
                    {[
                      "AWS Certified Solutions Architect",
                      "Microsoft Azure Administrator",
                      "ITIL Foundation Certified",
                    ].map((cert, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-secondary text-sm">
                        <span className="text-accent">{CredentialIcons.check}</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Track Record */}
            <div className="p-8 rounded-2xl bg-background border border-border-subtle">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  {CredentialIcons.trackRecord}
                </div>
                Track Record
              </h3>
              <ul className="space-y-3">
                {[
                  "10+ years in IT consulting",
                  "150+ successful projects delivered",
                  "50+ AI implementations completed",
                  "98% client satisfaction rate",
                  "Featured in industry publications",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-secondary">
                    <span className="text-accent">{CredentialIcons.check}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready to Launch Your AI Journey?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Book a free strategy call to discuss your goals and find the right path for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?subject=AI%20Launchpad%20Inquiry"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              Book Free Strategy Call
            </Link>
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              Call {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
