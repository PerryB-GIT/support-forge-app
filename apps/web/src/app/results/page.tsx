import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/ui/HeroSection";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how mid-market companies and SMBs achieve measurable ROI from strategic AI implementation. Real results from real engagements.",
  keywords: [
    "AI implementation case studies",
    "AI ROI examples",
    "executive AI consulting results",
    "AI business transformation",
    "AI automation ROI",
  ],
  openGraph: {
    title: "Case Studies | Support Forge",
    description:
      "Real results from strategic AI implementation. See how organizations achieve measurable ROI.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/results",
  },
};

export default function CaseStudiesPage() {
  const stats = [
    { value: "40%", label: "Average Efficiency Gain" },
    { value: "6-12", unit: "months", label: "Typical ROI Timeline" },
    { value: "$2.3M", label: "Avg. Annual Value Created" },
    { value: "94%", label: "Client Retention Rate" },
  ];

  const caseStudies = [
    {
      id: "manufacturing-ops",
      company: "Regional Manufacturing Company",
      industry: "Manufacturing",
      size: "85 employees",
      revenue: "$12M annual revenue",
      executive: "COO",
      challenge:
        "Production scheduling consumed 20+ hours weekly across three managers. Quality control documentation was inconsistent, leading to compliance concerns. The executive team knew AI could help but had no clear roadmap.",
      approach: [
        "Conducted AI Readiness Assessment to identify highest-impact opportunities",
        "Prioritized production scheduling and QC documentation as Phase 1",
        "Implemented custom scheduling optimization using historical production data",
        "Built automated QC documentation system integrated with existing ERP",
      ],
      results: [
        {
          metric: "15 hours/week",
          description: "Scheduling time reduced from 20+ to 5 hours",
        },
        {
          metric: "100%",
          description: "QC documentation compliance achieved",
        },
        {
          metric: "$180K",
          description: "Annual labor cost savings",
        },
        {
          metric: "3 weeks",
          description: "Time to first production deployment",
        },
      ],
      quote:
        "We knew AI was important but had no idea where to start. The assessment gave us clarity, and the implementation delivered faster than we expected. The ROI case practically wrote itself for our board.",
      quoteAttribution: "Chief Operating Officer",
      timeline: "8 weeks from assessment to full deployment",
      investment: "Strategic Implementation engagement",
    },
    {
      id: "professional-services",
      company: "Multi-State Professional Services Firm",
      industry: "Professional Services",
      size: "45 employees",
      revenue: "$8M annual revenue",
      executive: "Managing Partner",
      challenge:
        "Client proposal development took 6-8 hours each, limiting capacity to pursue new business. Senior partners spent excessive time on administrative tasks rather than client-facing work. Previous AI tool purchases went unused.",
      approach: [
        "Assessed existing tech stack and identified integration opportunities",
        "Developed custom proposal generation system trained on firm's successful proposals",
        "Created AI-assisted research and analysis workflows for senior partners",
        "Implemented with minimal disruption to ongoing client work",
      ],
      results: [
        {
          metric: "75%",
          description: "Reduction in proposal development time",
        },
        {
          metric: "12 hours/week",
          description: "Per-partner time reclaimed for client work",
        },
        {
          metric: "40%",
          description: "Increase in proposals submitted",
        },
        {
          metric: "$340K",
          description: "New revenue attributed to increased capacity",
        },
      ],
      quote:
        "The difference between our failed DIY attempts and this engagement was night and day. Having someone who understood both the technology and our business made all the difference.",
      quoteAttribution: "Managing Partner",
      timeline: "6 weeks to full deployment",
      investment: "Assessment + Strategic Implementation",
    },
    {
      id: "healthcare-admin",
      company: "Regional Healthcare Provider",
      industry: "Healthcare",
      size: "120 employees",
      revenue: "$18M annual revenue",
      executive: "CEO",
      challenge:
        "Administrative burden consuming clinical staff time. Patient communication inconsistent and often delayed. Leadership team facing board pressure to demonstrate technology investment ROI while maintaining strict compliance requirements.",
      approach: [
        "Conducted comprehensive AI Readiness Assessment with compliance focus",
        "Identified patient communication and scheduling as low-risk, high-impact starting points",
        "Implemented HIPAA-compliant automation for appointment reminders and follow-ups",
        "Created administrative workflow automation for non-clinical staff",
      ],
      results: [
        {
          metric: "35%",
          description: "Reduction in no-show appointments",
        },
        {
          metric: "25 hours/week",
          description: "Administrative time saved across staff",
        },
        {
          metric: "100%",
          description: "HIPAA compliance maintained",
        },
        {
          metric: "$420K",
          description: "Annual operational savings",
        },
      ],
      quote:
        "The board wanted to see us innovate with AI, but compliance was non-negotiable. Support Forge delivered both—we're now seen as a technology leader in our region.",
      quoteAttribution: "Chief Executive Officer",
      timeline: "12 weeks including compliance review",
      investment: "Assessment + Phased Implementation",
    },
  ];

  const industries = [
    "Manufacturing",
    "Professional Services",
    "Healthcare",
    "Financial Services",
    "Technology",
    "Retail & Distribution",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Measurable Impact from Strategic AI"
        subtitle="We measure success in business outcomes, not technology deployed. These case studies demonstrate the real-world ROI our clients achieve."
        gradient
        size="md"
      >
        <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
          Client Results
        </div>
      </HeroSection>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-border-subtle bg-surface/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold text-accent mb-1"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.value}
                  {stat.unit && (
                    <span className="text-lg text-text-secondary ml-1">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <article
                key={study.id}
                className="rounded-2xl bg-surface border border-border-subtle overflow-hidden"
              >
                {/* Header with Industry Accent */}
                <div className="p-8 border-b border-border-subtle">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wide">
                      {study.industry}
                    </span>
                    <span className="text-text-muted text-sm">
                      {study.size}
                    </span>
                    <span className="text-text-muted text-sm">•</span>
                    <span className="text-text-muted text-sm">
                      {study.revenue}
                    </span>
                  </div>
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {study.company}
                  </h2>
                  <p className="text-text-secondary">
                    Engagement sponsor: {study.executive}
                  </p>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Challenge */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
                      The Challenge
                    </h3>
                    <p className="text-text-primary">{study.challenge}</p>
                  </div>

                  {/* Approach */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
                      Our Approach
                    </h3>
                    <ul className="space-y-2">
                      {study.approach.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-text-secondary"
                        >
                          <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 text-sm font-medium">
                            {i + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
                      Results Achieved
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {study.results.map((result, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-background border border-border-subtle"
                        >
                          <div
                            className="text-2xl font-bold text-accent mb-1"
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            {result.metric}
                          </div>
                          <div className="text-text-secondary text-sm">
                            {result.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
                    <blockquote className="text-text-primary italic mb-3">
                      &ldquo;{study.quote}&rdquo;
                    </blockquote>
                    <div className="text-text-secondary text-sm">
                      — {study.quoteAttribution}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="mt-6 pt-6 border-t border-border-subtle flex flex-wrap gap-6 text-sm">
                    <div>
                      <span className="text-text-muted">Timeline:</span>{" "}
                      <span className="text-text-primary">{study.timeline}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Engagement:</span>{" "}
                      <span className="text-text-primary">
                        {study.investment}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Industries We Serve
          </h2>
          <p className="text-text-secondary mb-8">
            Our methodology adapts to your industry&apos;s unique requirements,
            compliance needs, and competitive landscape.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-background border border-border-subtle text-text-secondary text-sm"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Every engagement starts with understanding your unique challenges
            and opportunities. Let&apos;s discuss what&apos;s possible for your
            organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=discovery"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              Schedule Discovery Call
            </Link>
            <Link
              href="/assessment"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              Learn About Assessment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
