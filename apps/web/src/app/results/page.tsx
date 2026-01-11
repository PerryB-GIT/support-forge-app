import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Results & Case Studies | AI Launchpad",
  description: "See real results from AI Launchpad clients. Our proven LAUNCH Method helps teams save 30-40 hours per week and go from AI-curious to AI-powered in just 2 weeks.",
  keywords: ["AI transformation results", "AI consulting case studies", "Claude Code training", "AI productivity gains", "business automation ROI"],
  openGraph: {
    title: "Results & Case Studies - Support Forge AI Launchpad",
    description: "Real results from real clients. See how teams save 30-40 hours per week with our proven LAUNCH Method.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/results",
  },
};

export default function ResultsPage() {
  const stats = [
    { value: "30-40", unit: "hrs/week", label: "Average Time Saved" },
    { value: "2", unit: "weeks", label: "Time to Productive" },
    { value: "95%", unit: "", label: "Client Satisfaction" },
    { value: "100%", unit: "", label: "Would Recommend" },
  ];

  const outcomes = [
    {
      title: "Marketing Agency Owner",
      industry: "Digital Marketing",
      challenge: "Spending 15+ hours weekly on content creation and client reporting",
      solution: "Implemented Claude Code workflows for content drafts, social media scheduling, and automated report generation",
      results: [
        "Content creation time reduced by 80%",
        "Client reports now auto-generated",
        "Freed up 35 hours per week for strategy work",
        "Took on 3 new clients without hiring",
      ],
      quote: "I went from drowning in deliverables to actually having time to grow my business. The ROI was immediate.",
    },
    {
      title: "Software Development Team Lead",
      industry: "Technology",
      challenge: "Team spending too much time on boilerplate code and documentation",
      solution: "Full Claude Code + GitHub Copilot integration with custom workflows for code review and documentation",
      results: [
        "Code review time cut by 60%",
        "Documentation now auto-generated",
        "Onboarding new devs 3x faster",
        "Team shipping features 40% faster",
      ],
      quote: "Our entire development workflow transformed in two weeks. Every developer on the team now ships with AI daily.",
    },
    {
      title: "Small Business Consultant",
      industry: "Professional Services",
      challenge: "Overwhelmed by admin tasks, proposal writing, and client follow-ups",
      solution: "N8N + Zapier automation stack with Claude for proposal generation and email drafting",
      results: [
        "Proposal creation from 4 hours to 30 minutes",
        "Automated client follow-up sequences",
        "40 hours per week reclaimed",
        "Revenue up 50% with same hours",
      ],
      quote: "I was skeptical about AI hype. Now I can't imagine running my business without it. This changed everything.",
    },
  ];

  const beforeAfter = [
    { before: "Hours lost to repetitive tasks", after: "Automation handles the mundane" },
    { before: "AI subscriptions gathering dust", after: "AI integrated into daily workflow" },
    { before: "Confusion about which tools to use", after: "Clear stack: Claude + GitHub + Zapier" },
    { before: "Trial and error for months", after: "Productive in 2 weeks flat" },
    { before: "Generic YouTube tutorials", after: "Hands-on setup with experts" },
    { before: "No one to ask when stuck", after: "Direct Slack access to support" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Real Results
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            From AI-Curious to{" "}
            <span className="text-accent">AI-Powered</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12">
            Our clients don&apos;t just learn about AI—they transform how they work.
            Here&apos;s what happens when you stop experimenting and start shipping.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-surface border border-border-subtle"
              >
                <div className="text-4xl md:text-5xl font-bold text-accent mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {stat.value}
                  <span className="text-2xl text-text-secondary">{stat.unit}</span>
                </div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 px-6 bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The <span className="text-accent">Transformation</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-sm font-medium text-red-400 uppercase tracking-wide mb-4">Before Launchpad</div>
              {beforeAfter.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-text-secondary">{item.before}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="text-sm font-medium text-green-400 uppercase tracking-wide mb-4">After Launchpad</div>
              {beforeAfter.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-primary">{item.after}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Client <span className="text-accent">Success Stories</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Real transformations from real businesses. These are the kinds of results
              our LAUNCH Method delivers consistently.
            </p>
          </div>

          <div className="space-y-8">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-surface border border-border-subtle hover:border-accent/50 transition-all"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <h3 className="text-xl font-bold text-text-primary">{outcome.title}</h3>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                    {outcome.industry}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-sm font-medium text-red-400 uppercase tracking-wide mb-2">Challenge</div>
                    <p className="text-text-secondary">{outcome.challenge}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-accent uppercase tracking-wide mb-2">Solution</div>
                    <p className="text-text-secondary">{outcome.solution}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-400 uppercase tracking-wide mb-2">Results</div>
                    <ul className="space-y-1">
                      {outcome.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
                          <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border-subtle">
                  <blockquote className="text-text-primary italic">
                    &ldquo;{outcome.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-accent/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready for Your Transformation?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join the businesses already saving 30-40 hours every week. Start your AI journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/launchpad"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              See Our Programs
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              Book a Free Strategy Call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
