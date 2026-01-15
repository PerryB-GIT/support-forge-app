import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Support Forge helps mid-market executives cut through AI hype to implement solutions that deliver measurable ROI. Strategic AI consulting for leaders who need results, not experiments.",
  keywords: [
    "AI strategy consulting",
    "executive AI advisor",
    "C-Suite AI consulting",
    "strategic AI implementation",
    "AI business transformation",
    "mid-market AI consulting",
  ],
  openGraph: {
    title: "About | Support Forge",
    description:
      "Strategic AI consulting for executives who need results, not experiments. We help mid-market leaders implement AI that delivers measurable ROI.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const philosophy = [
    {
      title: "Strategy Before Technology",
      description:
        "We identify business problems first, then determine if AI is the right solution. Sometimes it isn't—and we'll tell you that.",
    },
    {
      title: "Measured by Your Outcomes",
      description:
        "Our success is measured in your results: time saved, costs reduced, revenue generated. If we can't define the ROI, we don't recommend the project.",
    },
    {
      title: "Implementation, Not Experimentation",
      description:
        "We deploy solutions that work in production, not proofs of concept that never leave the sandbox. Real results require real commitment.",
    },
    {
      title: "Knowledge Transfer",
      description:
        "We build your team's capabilities alongside every engagement. You should be less dependent on us over time, not more.",
    },
  ];

  const idealClients = [
    {
      title: "Mid-Market Leaders",
      description:
        "Companies with $5M-$50M in revenue who have the resources to invest in AI but lack dedicated AI expertise on staff.",
    },
    {
      title: "Operational Executives",
      description:
        "COOs, CFOs, and operations leaders looking to automate manual processes and improve efficiency across their organizations.",
    },
    {
      title: "Growth-Focused CEOs",
      description:
        "Leaders who recognize AI as a competitive necessity and want to move from exploration to implementation.",
    },
    {
      title: "Professional Services Firms",
      description:
        "Law firms, accounting practices, and consultancies where partner time is the most valuable—and most wasted—resource.",
    },
  ];

  const notIdealFor = [
    "Companies looking for the cheapest option",
    "Organizations wanting AI for AI's sake",
    "Teams not ready to commit time to implementation",
    "Businesses seeking a one-time software purchase",
  ];

  const differentiators = [
    {
      label: "Business-First Approach",
      detail:
        "We speak your language—revenue, margin, efficiency—not technical jargon. Every recommendation ties to business outcomes.",
    },
    {
      label: "Hands-On Implementation",
      detail:
        "We don't just advise—we build. Our team implements solutions and stays until they're working in production.",
    },
    {
      label: "Executive Partnership",
      detail:
        "We work directly with decision-makers. No layers of account managers or junior staff learning on your engagement.",
    },
    {
      label: "Transparent Economics",
      detail:
        "Clear pricing, defined scope, and honest assessments of expected ROI. No surprises, no hidden costs.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            About Support Forge
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            AI Strategy That Delivers Business Results
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We help mid-market executives cut through the AI hype to implement
            solutions that actually work. No experiments. No pilots that go
            nowhere. Just measurable ROI.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-border-subtle rounded-2xl p-8 md:p-12">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Why We Built Support Forge
            </h2>
            <div className="space-y-6 text-text-secondary">
              <p>
                After years of watching mid-market companies struggle with AI
                adoption, a pattern became clear: it wasn&apos;t a technology
                problem—it was a strategy problem.
              </p>
              <p>
                Enterprise companies have armies of consultants and dedicated AI
                teams. Small businesses can often get by with off-the-shelf
                tools. But mid-market companies? They fall into a gap. Too
                sophisticated for simple solutions, but without the resources
                for enterprise approaches.
              </p>
              <p className="text-text-primary font-medium">
                Support Forge exists to fill that gap. We bring enterprise-level
                AI strategy expertise to organizations that need results without
                the enterprise price tag or timeline.
              </p>
              <p>
                Every engagement starts with the same question: &quot;What
                business problem are we actually solving?&quot; If AI is the
                right answer, we implement it. If it isn&apos;t, we&apos;ll tell
                you that too—and point you toward what will actually help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Our Philosophy
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              How we approach every engagement and why it matters for your
              results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {philosophy.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border-subtle"
              >
                <h3
                  className="text-lg font-semibold text-text-primary mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.title}
                </h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Who We Work With
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our approach isn&apos;t for everyone. Here&apos;s who gets the
              most value from working with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {idealClients.map((client, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-surface border border-border-subtle"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent"
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
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold text-text-primary mb-1"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {client.title}
                    </h3>
                    <p className="text-text-secondary">{client.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Not Ideal For */}
          <div className="bg-surface/50 border border-border-subtle rounded-xl p-8">
            <h3
              className="text-lg font-semibold text-text-primary mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              We&apos;re Probably Not the Right Fit If You&apos;re Looking
              For...
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {notIdealFor.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-text-secondary"
                >
                  <svg
                    className="w-4 h-4 text-text-muted flex-shrink-0"
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
                  {item}
                </div>
              ))}
            </div>
            <p className="text-text-muted text-sm mt-4">
              Being selective about who we work with allows us to deliver better
              results for clients who are a genuine fit.
            </p>
          </div>
        </div>
      </section>

      {/* Why Support Forge */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent/10 via-background to-accent/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Why Executives Choose Support Forge
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              What sets us apart from other AI consultancies and technology
              vendors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border-subtle"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold text-text-primary mb-1"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {item.label}
                    </h3>
                    <p className="text-text-secondary">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-border-subtle rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div
                  className="text-3xl font-bold text-accent mb-1"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  94%
                </div>
                <div className="text-text-secondary text-sm">
                  Client Retention
                </div>
              </div>
              <div>
                <div
                  className="text-3xl font-bold text-accent mb-1"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  40%
                </div>
                <div className="text-text-secondary text-sm">
                  Avg. Efficiency Gain
                </div>
              </div>
              <div>
                <div
                  className="text-3xl font-bold text-accent mb-1"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  8 weeks
                </div>
                <div className="text-text-secondary text-sm">
                  Avg. Time to Value
                </div>
              </div>
              <div>
                <div
                  className="text-3xl font-bold text-accent mb-1"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  $2.3M
                </div>
                <div className="text-text-secondary text-sm">
                  Avg. Annual Value
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready to Explore What&apos;s Possible?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            A discovery call is the first step. No sales pitch—just a
            conversation about your challenges and whether we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=discovery"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              Schedule Discovery Call
            </Link>
            <Link
              href="/results"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
