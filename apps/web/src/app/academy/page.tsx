"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

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

const courseTiers = [
  {
    key: "selfPaced",
    name: "AI Academy",
    subtitle: "Self-Paced",
    icon: BookIcon,
    price: 997,
    priceLabel: "one-time",
    altPrice: "or 3 payments of $397",
    description: "Learn to build AI systems yourself with our comprehensive video course",
    features: [
      "Complete LAUNCH Method curriculum",
      "12+ hours of video training",
      "Private community access",
      "Monthly group coaching calls",
      "Templates & prompt libraries",
      "Lifetime updates",
    ],
    popular: false,
    ctaText: "Enroll Now",
  },
  {
    key: "liveTutoring",
    name: "AI Academy",
    subtitle: "+ Live Tutoring",
    icon: VideoIcon,
    price: 1500,
    priceLabel: "one-time",
    altPrice: null,
    description: "Personalized tutor-led training with 1-on-1 sessions",
    features: [
      "Everything in Self-Paced, plus:",
      "4x 1-hour live tutoring sessions",
      "Personalized curriculum path",
      "Direct Slack/email access to tutor",
      "Custom project guidance",
      "Priority support for 90 days",
    ],
    popular: true,
    ctaText: "Get Started",
  },
  {
    key: "pro",
    name: "AI Launchpad Pro",
    subtitle: "Done-With-You",
    icon: UserIcon,
    price: 5000,
    priceLabel: "starting",
    altPrice: "Custom quote based on scope",
    description: "We build your AI systems alongside you",
    features: [
      "Everything in Live Tutoring, plus:",
      "Full implementation support",
      "Custom AI workflow builds",
      "Your processes, automated",
      "90 days of priority support",
      "Dedicated project manager",
    ],
    popular: false,
    ctaText: "Book Strategy Call",
    isContact: true,
  },
];

function AcademyContent() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState<string | null>(null);

  const handleCheckout = async (productKey: string) => {
    if (!email && showEmailInput !== productKey) {
      setShowEmailInput(productKey);
      return;
    }

    setLoading(productKey);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey, email }),
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
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            AI Launchpad Academy
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Master AI Implementation
            <span className="text-accent"> That Actually Works</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Stop wasting money on AI subscriptions you don&apos;t use. Learn the LAUNCH Method
            and build AI systems that transform how you work.
          </p>
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
      <section id="pricing" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Choose Your <span className="text-accent">Path</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Whether you want to learn DIY or have personalized guidance, we have the right option.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
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
                  <tier.icon />
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

                {/* Email Input (shown when needed) */}
                {showEmailInput === tier.key && !tier.isContact && (
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

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-text-secondary mb-8">
            Join hundreds of professionals who have already mastered AI implementation.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
          >
            Choose Your Plan
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function AcademyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-pulse text-accent">Loading...</div></div>}>
      <AcademyContent />
    </Suspense>
  );
}
