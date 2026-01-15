import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Strategic AI Consulting Services",
  description: "Premium AI consulting for executives: AI Readiness Assessment, Strategic Implementation, and Advisory Retainer. Custom engagements from $15K-$50K+ delivering measurable ROI.",
  keywords: [
    "AI strategy consulting",
    "executive AI consulting",
    "AI readiness assessment",
    "strategic AI implementation",
    "AI advisory services",
    "C-Suite AI consulting",
    "enterprise AI solutions",
    "AI ROI consulting",
  ],
  openGraph: {
    title: "Strategic AI Consulting - Support Forge",
    description: "Premium AI consultancy for decision makers. From assessment to implementation to ongoing advisory.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic AI Consulting - Support Forge",
    description: "Premium AI consultancy for decision makers. Strategic implementation that delivers ROI.",
  },
  alternates: {
    canonical: "/services",
  },
};

const CheckIcon = () => (
  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            Strategic AI Consulting
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            AI Strategy That <span className="text-accent">Delivers Results</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-4">
            We don&apos;t sell packages. We solve problems.
          </p>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Every engagement starts with understanding your business, identifying high-impact opportunities, and building a roadmap tailored to your strategic objectives.
          </p>
        </div>
      </section>

      {/* Engagement Journey */}
      <section className="py-16 px-6 bg-surface/50 border-y border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            How We Work Together
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            A structured approach that minimizes risk and maximizes value at every stage.
          </p>

          {/* Journey Flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-16">
            <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-border-subtle">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">1</div>
              <span className="font-medium">Discovery Call</span>
            </div>
            <div className="hidden md:block w-12 h-0.5 bg-border-subtle" />
            <svg className="hidden md:block w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="hidden md:block w-12 h-0.5 bg-border-subtle" />
            <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-accent">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">2</div>
              <span className="font-medium text-accent">Assessment</span>
            </div>
            <div className="hidden md:block w-12 h-0.5 bg-border-subtle" />
            <svg className="hidden md:block w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="hidden md:block w-12 h-0.5 bg-border-subtle" />
            <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-border-subtle">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">3</div>
              <span className="font-medium">Implementation</span>
            </div>
            <div className="hidden md:block w-12 h-0.5 bg-border-subtle" />
            <svg className="hidden md:block w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="hidden md:block w-12 h-0.5 bg-border-subtle" />
            <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-border-subtle">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">4</div>
              <span className="font-medium">Advisory</span>
            </div>
          </div>

          {/* Mobile Journey (vertical) */}
          <div className="md:hidden flex flex-col items-center gap-2 mb-16">
            <div className="w-0.5 h-4 bg-border-subtle" />
            <svg className="w-4 h-4 text-accent rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Discovery Call */}
          <div id="discovery" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>Discovery Call</h2>
                <p className="text-accent font-medium">Free / 30 minutes</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-text-secondary mb-6">
                  A focused conversation to understand your business challenges and determine if there&apos;s a strategic fit. No pitch, no pressure — just an honest assessment of whether AI can move the needle for your organization.
                </p>
                <h3 className="font-semibold text-text-primary mb-3">What We&apos;ll Discuss:</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-3"><CheckIcon /><span>Your current operational challenges</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Where competitors are using AI effectively</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Quick wins vs. strategic investments</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Whether an Assessment makes sense for you</span></li>
                </ul>
              </div>
              <div className="bg-surface border border-border-subtle rounded-2xl p-6">
                <h3 className="font-semibold text-text-primary mb-4">Best For:</h3>
                <ul className="space-y-3 text-text-secondary text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Executives exploring AI strategy options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Leaders under pressure to &quot;do something with AI&quot;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Decision makers who want a trusted second opinion</span>
                  </li>
                </ul>
                <Link
                  href="/contact?service=discovery"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold transition-all"
                >
                  Schedule Discovery Call
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border-subtle" />

          {/* AI Readiness Assessment */}
          <div id="assessment" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>AI Readiness Assessment</h2>
                <p className="text-accent font-medium">$2,500 / 1-2 weeks</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-text-secondary mb-6">
                  A comprehensive analysis of your operations, technology stack, and team readiness. You&apos;ll walk away knowing exactly where AI will deliver ROI — and where it won&apos;t.
                </p>
                <h3 className="font-semibold text-text-primary mb-3">What&apos;s Included:</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-3"><CheckIcon /><span>2-hour executive deep dive session</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Technology audit and gap analysis</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Competitive landscape review</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Prioritized opportunity roadmap</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>ROI projections for top 3 initiatives</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Executive summary document</span></li>
                </ul>
              </div>
              <div className="bg-surface border border-accent rounded-2xl p-6">
                <div className="text-sm text-accent font-medium mb-2">Recommended Starting Point</div>
                <h3 className="font-semibold text-text-primary mb-4">Deliverables:</h3>
                <ul className="space-y-3 text-text-secondary text-sm mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">1.</span>
                    <span><strong>AI Opportunity Map</strong> — Visual roadmap of where AI fits in your operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">2.</span>
                    <span><strong>Priority Matrix</strong> — Impact vs. effort analysis for each initiative</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">3.</span>
                    <span><strong>Implementation Roadmap</strong> — Sequenced plan with clear next steps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">4.</span>
                    <span><strong>Executive Brief</strong> — Board-ready summary document</span>
                  </li>
                </ul>
                <Link
                  href="/assessment"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold transition-all shadow-lg shadow-accent/25"
                >
                  Learn More About Assessment
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border-subtle" />

          {/* Strategic Implementation */}
          <div id="implementation" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>Strategic Implementation</h2>
                <p className="text-accent font-medium">$15,000 - $50,000+ / Custom Scope</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-text-secondary mb-6">
                  Full white-glove implementation of prioritized AI initiatives. We handle the technical complexity while you focus on running your business. Scope is custom-built based on your Assessment findings.
                </p>
                <h3 className="font-semibold text-text-primary mb-3">Engagement Includes:</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-3"><CheckIcon /><span>Dedicated implementation team</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Weekly executive status updates</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Custom integrations with existing systems</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Team training and change management</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Executive dashboard and reporting</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>90-day post-implementation support</span></li>
                </ul>
              </div>
              <div className="bg-surface border border-border-subtle rounded-2xl p-6">
                <h3 className="font-semibold text-text-primary mb-4">Common Implementation Projects:</h3>
                <ul className="space-y-3 text-text-secondary text-sm mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>AI-powered customer service automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Document processing and workflow automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Sales intelligence and lead scoring systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Internal knowledge base and AI assistants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Reporting and analytics dashboards</span>
                  </li>
                </ul>
                <div className="p-4 bg-background rounded-xl border border-border-subtle">
                  <p className="text-sm text-text-muted">
                    <strong className="text-text-secondary">Note:</strong> Implementation scope and investment are determined by Assessment findings. We don&apos;t quote implementation without first understanding your specific situation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border-subtle" />

          {/* Advisory Retainer */}
          <div id="advisory" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>AI Advisory Retainer</h2>
                <p className="text-accent font-medium">$3,000 - $5,000/month</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-text-secondary mb-6">
                  Ongoing strategic partnership for organizations committed to staying ahead. Your dedicated AI advisor for continuous optimization, new opportunities, and strategic guidance.
                </p>
                <h3 className="font-semibold text-text-primary mb-3">Retainer Includes:</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-3"><CheckIcon /><span>Monthly strategy sessions</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Quarterly business reviews</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>New technology evaluation</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Priority support access</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Team training sessions</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span>Vendor negotiation support</span></li>
                </ul>
              </div>
              <div className="bg-surface border border-border-subtle rounded-2xl p-6">
                <h3 className="font-semibold text-text-primary mb-4">Best For Organizations That:</h3>
                <ul className="space-y-3 text-text-secondary text-sm mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Have completed implementation and want to expand</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Need ongoing guidance as AI landscape evolves</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Want a trusted advisor without a full-time hire</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">&#8226;</span>
                    <span>Value strategic partnership over transactional relationships</span>
                  </li>
                </ul>
                <p className="text-sm text-text-muted">
                  Advisory relationships typically begin after successful implementation engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-20 px-6 bg-surface/50 border-y border-border-subtle">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Our Approach to Investment
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            We believe in transparency about how we price and why.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-2xl p-6 border border-border-subtle">
              <h3 className="font-semibold text-text-primary mb-3">Why We Don&apos;t List Fixed Prices</h3>
              <p className="text-text-secondary text-sm">
                Every organization is different. A $15K engagement for a 30-person company might deliver the same value as a $50K engagement for a 150-person company. We scope based on complexity, not arbitrary tiers.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-6 border border-border-subtle">
              <h3 className="font-semibold text-text-primary mb-3">Why We Start With Assessment</h3>
              <p className="text-text-secondary text-sm">
                We&apos;ve seen too many companies waste money on AI initiatives that weren&apos;t right for them. The Assessment ensures we&apos;re solving the right problems before committing to implementation.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-6 border border-border-subtle">
              <h3 className="font-semibold text-text-primary mb-3">ROI Expectations</h3>
              <p className="text-text-secondary text-sm">
                We target 3-5x ROI on every engagement. If we can&apos;t project clear returns, we&apos;ll tell you. Our reputation depends on delivering results, not selling projects.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-6 border border-border-subtle">
              <h3 className="font-semibold text-text-primary mb-3">Payment Terms</h3>
              <p className="text-text-secondary text-sm">
                Assessment is paid upfront. Implementation is typically 50% at kickoff, 50% at completion. Advisory retainers are billed monthly. We accept wire transfer and major credit cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What size companies do you work with?",
                a: "We work best with mid-market companies (20-200 employees) and SMBs with $2M+ revenue. Our engagements require executive sponsorship and a commitment to implementation — we're not a fit for exploratory projects without decision-making authority."
              },
              {
                q: "How quickly can we see results?",
                a: "Assessment deliverables are ready within 2 weeks. Implementation timelines vary by scope, but most clients see initial ROI within 90 days of project kickoff. We set aggressive but realistic milestones."
              },
              {
                q: "Do you work with companies that have internal IT teams?",
                a: "Absolutely. We complement internal teams by bringing specialized AI expertise. We're not here to replace your IT department — we're here to accelerate capabilities they don't have time or resources to build."
              },
              {
                q: "What if the Assessment reveals AI isn't right for us?",
                a: "Then we'll tell you that. The Assessment is designed to surface the truth, not sell you on implementation. If AI won't deliver ROI for your situation, we'd rather know upfront — and so would you."
              },
              {
                q: "Can we skip the Assessment and go straight to implementation?",
                a: "In rare cases, yes — typically when you have a very specific, well-defined project and strong internal documentation. But we've found that rushing past Assessment usually leads to scope creep and missed opportunities. The Assessment pays for itself in avoided mistakes."
              },
            ].map((faq, index) => (
              <div key={index} className="bg-surface border border-border-subtle rounded-xl p-6">
                <h3 className="font-semibold text-text-primary mb-2">{faq.q}</h3>
                <p className="text-text-secondary">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-accent/10 via-background to-accent/10 border-y border-border-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Ready to Explore What&apos;s Possible?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Schedule a discovery call. We&apos;ll discuss your situation and determine if there&apos;s a strategic fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=discovery"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25"
            >
              Schedule Discovery Call
            </Link>
            <Link
              href="/results"
              className="px-8 py-4 border border-border-subtle text-text-primary rounded-xl font-semibold text-lg hover:bg-surface transition-all"
            >
              View Case Studies
            </Link>
          </div>
          <p className="text-sm text-text-muted mt-6">
            For decision-makers at companies with 20-200 employees or $2M+ revenue.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
