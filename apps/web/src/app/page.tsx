import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

import { CONTACT_INFO } from "@support-forge/shared";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalBusinessJsonLd, WebSiteJsonLd, OrganizationJsonLd, FAQJsonLd, ServicesListJsonLd } from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://support-forge.com";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <WebSiteJsonLd
        url={siteUrl}
        name="Support Forge"
        description="Premium AI Consultancy for executives and business leaders. Strategic AI implementation that delivers measurable ROI."
      />
      <LocalBusinessJsonLd
        url={siteUrl}
        logo={`${siteUrl}/sf-logo.png`}
        name="Support Forge"
        description="Premium AI Consultancy providing strategic AI implementation, readiness assessments, and advisory services for C-Suite executives and growth-focused business owners."
        email={CONTACT_INFO.email}
        telephone={CONTACT_INFO.phoneRaw}
        address={{
          city: "Haverhill",
          region: "Massachusetts",
          country: "US",
        }}
        priceRange="$$$"
      />
      <OrganizationJsonLd
        url={siteUrl}
        logo={`${siteUrl}/sf-logo.png`}
        name="Support Forge"
        description="Premium AI Consultancy - Strategic AI implementation for executives who can't afford to wait"
        email={CONTACT_INFO.email}
        telephone={CONTACT_INFO.phoneRaw}
        address={{
          city: "Haverhill",
          region: "Massachusetts",
          country: "US",
          postalCode: "01830",
        }}
        foundingDate="2005"
        slogan="AI Strategy That Moves the Needle"
      />
      <ServicesListJsonLd
        provider="Support Forge"
        url={siteUrl}
        services={[
          { name: "AI Readiness Assessment", description: "Strategic deep-dive into your operations with prioritized AI opportunity roadmap.", serviceType: "AI Consulting" },
          { name: "Strategic AI Implementation", description: "White-glove implementation with executive reporting and change management.", serviceType: "AI Implementation" },
          { name: "AI Advisory Retainer", description: "Ongoing strategic guidance, quarterly business reviews, and priority support.", serviceType: "AI Advisory" },
        ]}
      />
      <FAQJsonLd
        questions={[
          { question: "What makes Support Forge different from other AI consultancies?", answer: "We focus on measurable business outcomes, not technology for its own sake. Every engagement starts with understanding your strategic goals and ends with documented ROI." },
          { question: "Who do you typically work with?", answer: "We work with C-Suite executives at mid-market companies and founders of growth-focused SMBs who are ready to make a serious investment in AI capabilities." },
          { question: "How do you measure success?", answer: "We establish clear KPIs at the start of every engagement - whether that's cost reduction, time savings, revenue impact, or competitive positioning. You'll know exactly what success looks like." },
        ]}
      />

      <Header />

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Premium AI Consultancy
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            AI Strategy That
            <span className="text-accent"> Moves the Needle</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            For executives and business leaders who need AI to deliver real ROI — not just another technology experiment.
            Strategic implementation in weeks, not quarters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              Schedule a Discovery Call
            </Link>
            <Link
              href="#approach"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              See Our Approach
            </Link>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              The AI Challenge for <span className="text-accent">Leaders</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              You know AI matters. The question is where to invest for real business impact.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Competitive Pressure</h3>
              <p className="text-text-secondary text-sm">Competitors are moving on AI. You can&apos;t afford to fall behind.</p>
            </div>

            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">ROI Uncertainty</h3>
              <p className="text-text-secondary text-sm">Where will AI actually help? Hard to know without expertise.</p>
            </div>

            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Board Questions</h3>
              <p className="text-text-secondary text-sm">Stakeholders want an AI strategy. You need a clear answer.</p>
            </div>

            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Failed Experiments</h3>
              <p className="text-text-secondary text-sm">Tried AI tools. Didn&apos;t stick. Need a strategic approach.</p>
            </div>
          </div>

          <div className="mt-12 max-w-2xl mx-auto text-center">
            <blockquote className="text-xl italic text-text-secondary">
              &quot;We know AI is important. We just don&apos;t know where to start that will actually move the needle.&quot;
            </blockquote>
            <p className="text-text-muted mt-2">— CEO, Mid-Market Manufacturing Company</p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="approach" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Strategic AI That <span className="text-accent">Delivers</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We focus on business outcomes, not technology for its own sake.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Strategic Clarity</h3>
              <p className="text-text-secondary text-sm">
                Know exactly where AI will — and won&apos;t — help your business. No guessing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-subtle">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Speed to Value</h3>
              <p className="text-text-secondary text-sm">
                Working systems in weeks, not quarters. We move at the pace your business demands.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-subtle">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Risk Mitigation</h3>
              <p className="text-text-secondary text-sm">
                Avoid costly mistakes and failed implementations. We&apos;ve seen what works.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-subtle">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Competitive Edge</h3>
              <p className="text-text-secondary text-sm">
                Implement before your competitors figure it out. First-mover advantage matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Journey Section */}
      <section id="services" className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              How We <span className="text-accent">Work Together</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A structured approach to AI implementation that ensures strategic alignment and measurable outcomes.
            </p>
          </div>

          {/* Engagement Flow */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-border-subtle">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">1</div>
                <span className="font-medium">Discovery Call</span>
              </div>
              <svg className="w-8 h-8 text-accent hidden md:block rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <svg className="w-8 h-8 text-accent md:hidden rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-border-subtle">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">2</div>
                <span className="font-medium">Assessment</span>
              </div>
              <svg className="w-8 h-8 text-accent hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <svg className="w-8 h-8 text-accent md:hidden rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-border-subtle">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">3</div>
                <span className="font-medium">Implementation</span>
              </div>
              <svg className="w-8 h-8 text-accent hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <svg className="w-8 h-8 text-accent md:hidden rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-border-subtle">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">4</div>
                <span className="font-medium">Advisory</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {/* Discovery Call */}
            <div className="p-8 rounded-2xl bg-background border border-border-subtle flex flex-col">
              <div className="text-accent text-sm font-medium mb-2">Start Here</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>Discovery Call</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-accent">Free</span>
                <span className="text-text-muted">/ 30 minutes</span>
              </div>
              <p className="text-text-secondary mb-6">
                A focused conversation to understand your challenges and determine if we&apos;re the right fit.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Discuss your current AI challenges</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Identify potential quick wins</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Determine if Assessment is right for you</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-center font-medium transition-all"
              >
                Schedule a Call
              </Link>
            </div>

            {/* AI Readiness Assessment */}
            <div className="p-8 rounded-2xl bg-background border-2 border-accent shadow-lg shadow-accent/10 relative flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wide">
                Most Start Here
              </div>
              <div className="text-accent text-sm font-medium mb-2">Phase 1</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>AI Readiness Assessment</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold">$2,500</span>
              </div>
              <p className="text-text-secondary mb-6">
                A strategic deep-dive that gives you clarity on exactly where AI will move the needle.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>2-hour deep dive into your operations</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Technology audit and gap analysis</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Prioritized opportunity roadmap</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Executive summary document</span>
                </li>
              </ul>
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 mb-6">
                <p className="text-sm text-text-secondary">
                  <strong className="text-accent">Deliverable:</strong> &quot;Here&apos;s exactly where AI will help and what to do first.&quot;
                </p>
              </div>
              <Link
                href="/contact?service=assessment"
                className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-center font-medium transition-all"
              >
                Request Assessment
              </Link>
            </div>

            {/* Strategic Implementation */}
            <div className="p-8 rounded-2xl bg-background border border-border-subtle flex flex-col">
              <div className="text-accent text-sm font-medium mb-2">Phase 2</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>Strategic Implementation</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold">$15K - $50K+</span>
              </div>
              <p className="text-text-secondary mb-6">
                White-glove implementation custom-scoped from your Assessment findings.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom scoped based on assessment</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Full white-glove implementation</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Executive reporting and dashboards</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Team training and change management</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>90-day post-implementation support</span>
                </li>
              </ul>
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 mb-6">
                <p className="text-sm text-text-secondary">
                  <strong className="text-accent">Note:</strong> Scope and investment determined after Assessment.
                </p>
              </div>
              <Link
                href="/contact?service=implementation"
                className="w-full py-3 rounded-lg bg-surface border border-border-subtle hover:border-accent text-center font-medium transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Advisory Retainer */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="p-8 rounded-2xl bg-background border border-border-subtle">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-accent text-sm font-medium mb-2">Ongoing Partnership</div>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>AI Advisory Retainer</h3>
                  <p className="text-text-secondary max-w-xl">
                    Ongoing strategic guidance for organizations that want a trusted advisor in their corner.
                    Quarterly business reviews, new tool evaluation, and priority support access.
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="text-3xl font-bold">$3K - $5K<span className="text-lg font-normal text-text-muted">/month</span></div>
                  <Link
                    href="/contact?service=advisory"
                    className="px-6 py-2 rounded-lg bg-surface border border-border-subtle hover:border-accent text-center font-medium transition-all"
                  >
                    Inquire About Retainer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Leaders Who <span className="text-accent">Moved First</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Results from executives who partnered with us on their AI strategy.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div className="p-8 rounded-2xl bg-surface border border-border-subtle">
              <div className="text-3xl font-bold text-accent mb-2">40%</div>
              <div className="text-lg font-semibold mb-2">Reduction in Admin Time</div>
              <p className="text-text-secondary text-sm mb-4">
                &quot;We went from drowning in manual processes to having systems that run themselves. My team can finally focus on growth.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">M</div>
                <div>
                  <p className="font-semibold">Michael R.</p>
                  <p className="text-text-muted text-sm">COO, Manufacturing (85 employees)</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border-subtle">
              <div className="text-3xl font-bold text-accent mb-2">3 weeks</div>
              <div className="text-lg font-semibold mb-2">From Assessment to Live</div>
              <p className="text-text-secondary text-sm mb-4">
                &quot;I&apos;d been trying to figure out our AI strategy for six months. Perry gave us clarity in two hours and had systems running in three weeks.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">S</div>
                <div>
                  <p className="font-semibold">Sarah K.</p>
                  <p className="text-text-muted text-sm">Founder, Professional Services ($4M)</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border-subtle">
              <div className="text-3xl font-bold text-accent mb-2">$180K</div>
              <div className="text-lg font-semibold mb-2">Saved in Year One</div>
              <p className="text-text-secondary text-sm mb-4">
                &quot;The Assessment identified inefficiencies we&apos;d been paying for without realizing. ROI was clear within the first quarter.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">D</div>
                <div>
                  <p className="font-semibold">David L.</p>
                  <p className="text-text-muted text-sm">CEO, Healthcare Tech (120 employees)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/results"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
            >
              View detailed case studies
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Ready to Turn AI Investment Into Results?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Schedule a 30-minute discovery call. We&apos;ll discuss your strategic objectives and determine if there&apos;s a fit — no pitch, just a focused conversation about where AI can move the needle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              Schedule Discovery Call
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              About Our Approach
            </Link>
          </div>
          <p className="text-text-muted text-sm mt-6">
            For decision-makers at companies with 20-200 employees or $2M+ revenue.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
