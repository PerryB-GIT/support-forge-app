import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI Readiness Assessment",
  description:
    "A strategic 2-week engagement to identify exactly where AI will deliver ROI for your organization. Get a prioritized roadmap with clear next steps.",
  keywords: [
    "AI readiness assessment",
    "AI audit",
    "AI strategy assessment",
    "AI gap analysis",
    "AI opportunity analysis",
    "executive AI assessment",
  ],
  openGraph: {
    title: "AI Readiness Assessment | Support Forge",
    description:
      "A strategic 2-week engagement to identify exactly where AI will deliver ROI for your organization.",
  },
};

export default function AssessmentPage() {
  const deliverables = [
    {
      title: "Executive Summary",
      description:
        "A board-ready document outlining your AI opportunities, prioritized by impact and feasibility.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "Technology Audit",
      description:
        "Complete analysis of your current tech stack, integrations, and data infrastructure readiness.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Opportunity Roadmap",
      description:
        "Prioritized list of AI implementation opportunities with estimated ROI and effort for each.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
    {
      title: "Risk Assessment",
      description:
        "Identification of potential implementation challenges, data risks, and change management considerations.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    {
      title: "Quick Wins List",
      description:
        "3-5 immediately actionable improvements you can implement with existing resources.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Implementation Recommendations",
      description:
        "Detailed next steps including build vs. buy analysis and vendor recommendations where applicable.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery Call",
      duration: "30 minutes",
      description:
        "We discuss your business objectives, current challenges, and what success looks like. This call is complimentary and helps us both determine if the assessment is the right fit.",
    },
    {
      step: "02",
      title: "Kickoff & Access",
      duration: "Day 1",
      description:
        "Brief kickoff meeting to align on scope. You'll provide access to relevant systems, documentation, and key stakeholder contacts.",
    },
    {
      step: "03",
      title: "Deep Dive Session",
      duration: "2-3 hours",
      description:
        "Intensive working session with you and your leadership team. We'll map your operations, identify pain points, and explore AI opportunities together.",
    },
    {
      step: "04",
      title: "Analysis & Research",
      duration: "Days 2-8",
      description:
        "We analyze your systems, research relevant AI solutions, evaluate vendors, and build your customized roadmap. Minimal time required from your team.",
    },
    {
      step: "05",
      title: "Findings Presentation",
      duration: "1-2 hours",
      description:
        "Executive presentation of findings, roadmap, and recommendations. Interactive session to answer questions and discuss priorities.",
    },
    {
      step: "06",
      title: "Documentation Delivery",
      duration: "Day 10-14",
      description:
        "Final delivery of all assessment documentation. You'll have everything needed to move forward — with us or independently.",
    },
  ];

  const idealFor = [
    "CEOs and COOs exploring AI but unsure where to start",
    "Leadership teams evaluating AI investments for the upcoming year",
    "Companies that have tried AI tools with mixed results",
    "Organizations preparing for growth and looking to scale efficiently",
    "Executives facing board questions about AI strategy",
  ];

  const notIdealFor = [
    "Companies looking for a quick tool recommendation",
    "Organizations not ready to share operational details",
    "Teams seeking implementation without strategic alignment",
    "Businesses with less than $1M in annual revenue",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            Strategic Assessment
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            AI Readiness Assessment
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Know exactly where AI will move the needle for your organization.
            Get a prioritized roadmap, clear ROI projections, and actionable
            next steps — in two weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=assessment"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              Schedule Discovery Call
            </Link>
            <a
              href="#process"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              See the Process
            </a>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-12 px-4 border-y border-border-subtle bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">$2,500</div>
              <div className="text-text-secondary">Fixed Investment</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-primary mb-2">
                10-14 Days
              </div>
              <div className="text-text-secondary">Typical Timeline</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-primary mb-2">
                3-5 Hours
              </div>
              <div className="text-text-secondary">Your Time Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              What You&apos;ll Receive
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Six comprehensive deliverables that give you complete clarity on
              your AI strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-surface border border-border-subtle hover:border-accent/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        className="py-20 px-4 bg-surface/50 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              How It Works
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A structured process designed to minimize disruption to your team
              while maximizing insight.
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 rounded-2xl bg-background border border-border-subtle"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className="text-sm text-accent font-medium">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-2xl font-bold mb-6 flex items-center gap-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Ideal For
              </h2>
              <ul className="space-y-4">
                {idealFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2
                className="text-2xl font-bold mb-6 flex items-center gap-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
                Not the Right Fit If
              </h2>
              <ul className="space-y-4">
                {notIdealFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-20 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            What Happens After the Assessment?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            The assessment stands alone as a valuable deliverable. You&apos;ll
            have everything you need to move forward — whether that&apos;s with
            us, your internal team, or another partner.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-background border border-border-subtle">
              <div className="text-2xl mb-3">1</div>
              <h3 className="font-semibold mb-2">Implement Independently</h3>
              <p className="text-text-secondary text-sm">
                Use our roadmap to guide your internal team or hire vendors
                directly.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border-subtle">
              <div className="text-2xl mb-3">2</div>
              <h3 className="font-semibold mb-2">Strategic Implementation</h3>
              <p className="text-text-secondary text-sm">
                Continue with us for white-glove implementation of your
                prioritized opportunities.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border-subtle">
              <div className="text-2xl mb-3">3</div>
              <h3 className="font-semibold mb-2">Hybrid Approach</h3>
              <p className="text-text-secondary text-sm">
                Handle quick wins internally while engaging us for complex
                implementations.
              </p>
            </div>
          </div>
          <p className="text-text-muted text-sm mt-8">
            No obligation to continue engagement. Assessment investment applies
            as credit toward Strategic Implementation if you choose to proceed.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready to Get Clarity on Your AI Strategy?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Start with a 30-minute discovery call. We&apos;ll discuss your
            objectives and determine if the assessment is the right next step.
          </p>
          <Link
            href="/contact?service=assessment"
            className="inline-block px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
          >
            Schedule Discovery Call
          </Link>
          <p className="text-text-muted text-sm mt-4">
            No commitment required. 30 minutes to explore the fit.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
