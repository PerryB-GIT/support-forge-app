"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CONTACT_INFO } from "@support-forge/shared";
import { ReactNode } from "react";

// LAUNCH letter components
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

// Tool icons
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

// Check icon
const CheckIcon = () => (
  <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Tier icons
const BookIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// LAUNCH Method steps
const launchSteps = [
  { letter: "L", name: "Landscape", desc: "Map your current processes and identify high-impact AI opportunities" },
  { letter: "A", name: "Architect", desc: "Design your AI ecosystem with the right tools and integrations" },
  { letter: "U", name: "Unlock", desc: "Master prompt engineering and AI interaction patterns" },
  { letter: "N", name: "Network", desc: "Connect your AI tools into automated workflows" },
  { letter: "C", name: "Configure", desc: "Fine-tune and customize for your specific use cases" },
  { letter: "H", name: "Harden", desc: "Secure, document, and prepare for scale" },
];

// Launchpad Stack
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

// ROI stats
const roiStats = [
  {
    number: "30-40",
    label: "Hours saved per week permanently",
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

// Course tiers with Stripe integration - AI Launchpad pricing
const courseTiers = [
  {
    key: "starter",
    name: "Launchpad Starter",
    subtitle: "Start Your AI Journey",
    Icon: BookIcon,
    price: 97,
    priceLabel: "/month",
    altPrice: null,
    description: "Self-paced learning with community support to begin your AI transformation",
    features: [
      "Self-paced video course",
      "Golden config templates",
      "Community access (Discord)",
      "Monthly group Q&A",
      "Setup guides for GitHub, AWS, Zapier, N8N",
      "Cancel anytime",
    ],
    popular: false,
    ctaText: "Start for $97/mo",
  },
  {
    key: "pro",
    name: "Launchpad Pro",
    subtitle: "Go From Zero to Shipping in 2 Weeks",
    Icon: VideoIcon,
    price: 3000,
    priceLabel: "one-time",
    altPrice: null,
    description: "Live cohort program with hands-on setup and direct support",
    features: [
      "Everything in Starter, plus:",
      "2-week live cohort program (4-6 people)",
      "Hands-on Claude Code setup during sessions",
      "Direct Slack access during program",
      "Graduation = fully set up and trained",
      "30-40 hours/week saved permanently",
    ],
    popular: true,
    ctaText: "Join Next Cohort",
  },
  {
    key: "enterprise",
    name: "Launchpad Enterprise",
    subtitle: "Full Custom AI Transformation",
    Icon: UserIcon,
    price: 10000,
    priceLabel: "starting at",
    altPrice: "Custom quote based on scope",
    description: "White-glove implementation for your entire organization",
    features: [
      "Full custom implementation",
      "1-on-1 engagement",
      "Ongoing support retainer",
      "Integration with existing tools/workflows",
      "White-glove deployment",
      "Dedicated project manager",
    ],
    popular: false,
    ctaText: "Book Strategy Call",
    isContact: true,
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

function LaunchpadContent() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Check if user is already enrolled
  useEffect(() => {
    async function checkEnrollment() {
      const userEmail = session?.user?.email;
      if (!userEmail) return;

      try {
        const res = await fetch(`/api/academy/enrollment?email=${encodeURIComponent(userEmail)}`);
        const data = await res.json();
        setIsEnrolled(data.enrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    }
    checkEnrollment();
  }, [session]);

  const handleCheckout = async (productKey: string) => {
    if (!email && !session?.user?.email && showEmailInput !== productKey) {
      setShowEmailInput(productKey);
      return;
    }

    setLoading(productKey);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey, email: email || session?.user?.email }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                AI Launchpad Academy
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                The Fastest Path From AI-Curious
                <span className="text-accent"> to AI-Powered</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8">
                Transform your team from &quot;I should use AI&quot; to &quot;I ship with AI daily&quot; in 2 weeks.
                Reclaim 30-40 hours every week with our proven LAUNCH Method.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isEnrolled ? (
                  <Link
                    href="/academy/dashboard"
                    className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105 text-center"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link
                    href="#pricing"
                    className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105 text-center"
                  >
                    View Programs
                  </Link>
                )}
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

      {/* Canceled Notice */}
      {canceled && (
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-center">
            Your checkout was canceled. Feel free to try again when you&apos;re ready.
          </div>
        </div>
      )}

      {/* Pricing Tiers */}
      <section id="pricing" className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Choose Your <span className="text-accent">Path</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Whether you want to learn DIY or have personalized guidance, we have the right option.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {courseTiers.map((tier) => (
              <div
                key={tier.key}
                className={`relative group p-8 rounded-2xl bg-background border transition-all ${
                  tier.popular
                    ? "border-accent shadow-lg shadow-accent/10 scale-105 z-10"
                    : "border-border-subtle hover:border-accent hover:shadow-lg hover:shadow-accent/5"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <tier.Icon />
                </div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {tier.name}
                </h3>
                <p className="text-accent text-sm font-medium mb-2">{tier.subtitle}</p>
                <p className="text-text-secondary text-sm mb-6">{tier.description}</p>
                <div className="mb-6">
                  <span
                    className="text-4xl font-bold text-accent"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    ${tier.price.toLocaleString()}
                  </span>
                  <span className="text-text-secondary ml-2">{tier.priceLabel}</span>
                  {tier.altPrice && (
                    <p className="text-text-muted text-sm mt-1">{tier.altPrice}</p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Email Input */}
                {showEmailInput === tier.key && !tier.isContact && !session?.user?.email && (
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-surface border border-border-subtle focus:border-accent focus:outline-none text-text-primary"
                    />
                  </div>
                )}

                {tier.isContact ? (
                  <Link
                    href="/contact?subject=AI%20Launchpad%20Pro"
                    className="block w-full text-center px-6 py-3 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-colors"
                  >
                    {tier.ctaText}
                  </Link>
                ) : isEnrolled ? (
                  <Link
                    href="/academy/dashboard"
                    className="block w-full text-center px-6 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-medium"
                  >
                    Already Enrolled
                  </Link>
                ) : (
                  <button
                    onClick={() => handleCheckout(tier.key)}
                    disabled={loading === tier.key}
                    className={`block w-full text-center px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 ${
                      tier.popular
                        ? "bg-accent hover:bg-accent-hover text-white"
                        : "bg-surface border border-border-subtle hover:border-accent text-text-primary"
                    }`}
                  >
                    {loading === tier.key ? "Loading..." : tier.ctaText}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Payment Plan Option */}
          {!isEnrolled && (
            <div className="mt-8 text-center">
              <p className="text-text-secondary">
                Need a payment plan?{" "}
                <button
                  onClick={() => handleCheckout("paymentPlan")}
                  className="text-accent hover:underline"
                >
                  3 payments of $397
                </button>{" "}
                for the Self-Paced course.
              </p>
            </div>
          )}
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

      {/* What You'll Learn */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              What You&apos;ll <span className="text-accent">Learn</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { module: "1-2", title: "Foundations & Claude Code", hours: "2.5 hrs" },
              { module: "3-4", title: "MCP Servers & Skills", hours: "2.5 hrs" },
              { module: "5-6", title: "Automation & Cloud", hours: "2.5 hrs" },
              { module: "7-8", title: "Security & Capstone", hours: "2 hrs" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-background border border-border-subtle text-center"
              >
                <div className="text-accent text-sm font-medium mb-2">Module {item.module}</div>
                <div className="font-semibold mb-1">{item.title}</div>
                <div className="text-text-muted text-sm">{item.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launchpad Stack Section */}
      <section className="py-20">
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
                      className="group p-4 rounded-xl bg-surface border border-border-subtle hover:border-accent transition-all"
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
      <section className="py-20 bg-surface/50">
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
                className="p-8 rounded-2xl bg-background border border-border-subtle text-center group hover:border-accent transition-all"
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

      {/* Guarantee */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            14-Day Money-Back Guarantee
          </h2>
          <p className="text-text-secondary">
            Try the course risk-free. If it&apos;s not for you within the first 14 days, we&apos;ll refund
            your purchase in full. No questions asked.
          </p>
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
            {isEnrolled
              ? "Continue your learning journey in the course dashboard."
              : "Book a free strategy call to discuss your goals and find the right path for you."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isEnrolled ? (
              <Link
                href="/academy/dashboard"
                className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="#pricing"
                  className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
                >
                  Enroll Now
                </Link>
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
                >
                  Call {CONTACT_INFO.phone}
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function LaunchpadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-pulse text-accent">Loading...</div></div>}>
      <LaunchpadContent />
    </Suspense>
  );
}
