import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/ui/HeroSection";
import { AnimatedProcessFlow } from "@/components/ui/AnimatedProcessFlow";
import {
  IconDiscovery,
  IconAssessment,
  IconImplementation,
  IconAdvisory,
} from "@/components/icons";

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
      <HeroSection
        title={
          <>
            AI Strategy That <span className="text-accent">Delivers Results</span>
          </>
        }
        subtitle="We don't sell packages. We solve problems."
        gradient
        size="lg"
      >
        <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
          Strategic AI Consulting
        </div>
        <p className="text-lg text-text-muted max-w-2xl mx-auto mt-4">
          Every engagement starts with understanding your business, identifying high-impact opportunities, and building a roadmap tailored to your strategic objectives.
        </p>
      </HeroSection>

      {/* Engagement Journey */}
      <section className="py-16 px-6 bg-surface/50 border-y border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            How We Work Together
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            A structured approach that minimizes risk and maximizes value at every stage.
          </p>

          {/* Animated Journey Flow */}
          <div className="mb-16">
            <AnimatedProcessFlow
              steps={[
                { number: 1, label: "Discovery Call" },
                { number: 2, label: "Assessment", isHighlighted: true },
                { number: 3, label: "Implementation" },
                { number: 4, label: "Advisory" },
              ]}
              staggerDelay={400}
            />
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Discovery Call */}
          <div id="discovery" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <IconDiscovery size={24} />
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
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <IconAssessment size={24} />
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
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <IconImplementation size={24} />
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
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <IconAdvisory size={24} />
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
