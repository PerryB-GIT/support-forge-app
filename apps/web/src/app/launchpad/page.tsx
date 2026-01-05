import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CONTACT_INFO } from "@support-forge/shared";

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

// LAUNCH Method steps
const launchSteps = [
  { letter: "L", name: "Landscape", desc: "Map your current processes and identify high-impact AI opportunities" },
  { letter: "A", name: "Architect", desc: "Design your AI ecosystem with the right tools and integrations" },
  { letter: "U", name: "Unlock", desc: "Master prompt engineering and AI interaction patterns" },
  { letter: "N", name: "Network", desc: "Connect your AI tools into automated workflows" },
  { letter: "C", name: "Configure", desc: "Fine-tune and customize for your specific use cases" },
  { letter: "H", name: "Harden", desc: "Secure, document, and prepare for scale" },
];

// Tech stack items
const stackItems = [
  { icon: "🤖", name: "ChatGPT", category: "Core AI" },
  { icon: "🧠", name: "Claude", category: "Core AI" },
  { icon: "⚡", name: "Zapier", category: "Automation" },
  { icon: "🔗", name: "Make", category: "Automation" },
  { icon: "📊", name: "Notion AI", category: "Productivity" },
  { icon: "🎯", name: "Airtable", category: "Data" },
  { icon: "📧", name: "Gmail/Outlook", category: "Communication" },
  { icon: "💬", name: "Slack", category: "Communication" },
  { icon: "📅", name: "Calendar APIs", category: "Scheduling" },
  { icon: "🎨", name: "Canva AI", category: "Design" },
  { icon: "🔊", name: "ElevenLabs", category: "Voice" },
  { icon: "📹", name: "Loom", category: "Video" },
];

// ROI stats
const roiStats = [
  { number: "10+", label: "Hours saved per week on average" },
  { number: "3x", label: "Faster response times to clients" },
  { number: "80%", label: "Reduction in manual data entry" },
];

export default function LaunchpadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
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
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Stop wasting money on AI subscriptions you don&apos;t use. Master the LAUNCH Method and
              build AI systems that transform how you work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#tiers"
                className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
              >
                View Programs
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
              >
                Book a Call
              </Link>
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
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                AI Launchpad Pro
              </h3>
              <p className="text-text-secondary mb-6">We build your AI systems with you</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-accent" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  $7,500
                </span>
                <span className="text-text-secondary ml-2">starting</span>
                <p className="text-text-muted text-sm mt-1">Custom quote based on scope</p>
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
                className="group p-6 rounded-2xl bg-surface border border-border-subtle hover:border-accent transition-all text-center"
              >
                <div
                  className="text-5xl font-bold text-accent mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {step.letter}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.name}</h3>
                <p className="text-text-secondary text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Tools You&apos;ll <span className="text-accent">Master</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Learn to leverage the best AI tools and integrate them into powerful workflows
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stackItems.map((item) => (
              <div
                key={item.name}
                className="group p-4 rounded-xl bg-background border border-border-subtle hover:border-accent transition-all text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-text-muted text-xs">{item.category}</div>
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
                className="p-8 rounded-2xl bg-surface border border-border-subtle text-center"
              >
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
                <span className="text-2xl">🎓</span>
                Certifications
              </h3>
              <ul className="space-y-3">
                {[
                  "AWS Certified Solutions Architect",
                  "Google Cloud Professional",
                  "Microsoft Azure Administrator",
                  "Certified Scrum Master",
                  "ITIL Foundation Certified",
                ].map((cert, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-secondary">
                    <span>🏅</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Track Record */}
            <div className="p-8 rounded-2xl bg-background border border-border-subtle">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-2xl">📈</span>
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
                    <span>🏅</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
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
