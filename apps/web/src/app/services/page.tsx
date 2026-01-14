import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Services - AI Implementation Partner",
  description: "AI implementation services: Website Liberation ($2,500), AI Toolkit Setup ($5,000), Full Digital Overhaul ($10-15K). One-time investment, you own everything, no monthly fees.",
  keywords: [
    "AI implementation",
    "website migration",
    "AWS hosting",
    "Claude Code setup",
    "AI automation",
    "digital transformation",
    "small business AI",
    "website independence",
  ],
  openGraph: {
    title: "AI Implementation Services - Support Forge",
    description: "We set it up. You own it forever. From developer dependency to digital independence.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Implementation Services - Support Forge",
    description: "We set it up. You own it forever. From developer dependency to digital independence.",
  },
  alternates: {
    canonical: "/services",
  },
};

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function ServicesPage() {
  const services = [
    {
      id: "website-liberation",
      tier: "Tier 1",
      title: "Website Liberation",
      price: "$2,500",
      timeline: "1 week",
      description: "Escape platform jail. Migrate your existing site to infrastructure you own and control.",
      idealFor: "Business owners paying monthly platform fees who want out",
      features: [
        "Migrate existing site to AWS (~$4/month hosting)",
        "Set up Claude Code on your computer",
        "Connect to Google Drive for easy photo uploads",
        "Staging environment for safe testing",
        "2x live training sessions (60 min each)",
        "30-day email support",
      ],
      outcome: "You type \"Add this photo to the About page\" and it happens. No developer. No invoice. No waiting.",
      roi: "Save $300+/year on hosting alone. Eliminate $1,000+/year in developer change fees. Pays for itself in Year 1.",
    },
    {
      id: "ai-toolkit",
      tier: "Tier 2",
      title: "AI Toolkit Setup",
      price: "$5,000",
      timeline: "2 weeks",
      popular: true,
      description: "AI working across your entire business, not just your website.",
      idealFor: "Professionals who want AI integrated across their daily operations",
      features: [
        "Everything in Website Liberation",
        "MCP connections to your tools (Gmail, Google Drive, Calendar, GitHub)",
        "Zapier/N8N automation setup (3 workflows)",
        "Custom AI prompts for your specific business",
        "Document templates and SOPs",
        "4x live training sessions (60 min each)",
        "60-day email support",
      ],
      outcome: "Your AI assistant knows your business. It can draft emails in your voice, pull data from your spreadsheets, and update your website — all from natural language commands.",
      roi: "Save 5-10 hours/week on repetitive tasks. At $50/hour value = $15,000+/year in time savings.",
    },
    {
      id: "digital-overhaul",
      tier: "Tier 3",
      title: "Full Digital Overhaul",
      price: "$10,000 - $15,000",
      timeline: "3-4 weeks",
      description: "Complete digital transformation for businesses ready to go all-in.",
      idealFor: "Businesses needing a complete digital transformation with custom functionality",
      features: [
        "Everything in AI Toolkit Setup",
        "Complete website redesign (not just migration)",
        "Custom functionality (booking systems, client portals, etc.)",
        "Database setup if needed",
        "8x live training sessions",
        "Team training (up to 3 people)",
        "90-day priority support",
        "One \"emergency\" session within first year",
      ],
      outcome: "Your entire digital presence is rebuilt on infrastructure you own, managed by AI you control, with a team that knows how to use it.",
      roi: "Replaces $20K-50K agency projects. Eliminates ongoing developer retainers. Complete digital independence.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            AI Implementation Partner
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Choose Your <span className="text-accent">Implementation</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-4">
            One-time investment. You own everything. No monthly fees.
          </p>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            We do the heavy lifting upfront and hand you the keys. Our goal is to make ourselves unnecessary.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className={`relative bg-surface border rounded-2xl p-8 lg:p-10 scroll-mt-24 ${
                service.popular
                  ? "border-accent shadow-lg shadow-accent/10"
                  : "border-border-subtle"
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-8 px-4 py-1 bg-accent text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column */}
                <div>
                  <div className="text-accent text-sm font-medium mb-2">{service.tier}</div>
                  <h2 className="text-3xl font-bold text-text-primary mb-2">{service.title}</h2>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-accent">{service.price}</span>
                    <span className="text-text-muted">/ {service.timeline}</span>
                  </div>
                  <p className="text-lg text-text-secondary mb-6">{service.description}</p>

                  <div className="bg-background/50 rounded-xl p-4 mb-6">
                    <div className="text-sm font-medium text-text-muted mb-1">Ideal For:</div>
                    <div className="text-text-primary">{service.idealFor}</div>
                  </div>

                  <Link
                    href={`/contact?service=${service.id}`}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      service.popular
                        ? "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25"
                        : "bg-accent/10 hover:bg-accent/20 text-accent"
                    }`}
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-text-secondary">
                        <CheckIcon />
                        <span className={feature.startsWith("Everything") ? "font-semibold text-text-primary" : ""}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-4">
                    <div className="bg-accent/5 rounded-xl p-4 border border-accent/20">
                      <div className="text-sm font-semibold text-accent mb-1">The Outcome:</div>
                      <div className="text-text-secondary text-sm">{service.outcome}</div>
                    </div>
                    <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                      <div className="text-sm font-semibold text-green-500 mb-1">ROI:</div>
                      <div className="text-text-secondary text-sm">{service.roi}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-surface/50 border-y border-border-subtle">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Free Demo", desc: "30-minute screen share showing exactly what's possible with YOUR business" },
              { step: "2", title: "Choose Your Tier", desc: "Pick the implementation level that matches your needs and budget" },
              { step: "3", title: "We Build It", desc: "Live collaboration sessions where we set up everything together" },
              { step: "4", title: "You Own It", desc: "We hand you the keys and teach you to run it yourself" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "I'm not technical. Can I really do this?",
                a: "Absolutely. My best clients are a sheep farmer and a veterinary practice owner. Neither had technical backgrounds. If you can describe what you want in plain English, you can use these tools."
              },
              {
                q: "What if it doesn't work for me?",
                a: "Two things: First, we do a live demo before you commit. You'll see exactly what's possible with YOUR business, not a generic example. Second, I include training sessions — not just setup. If you can describe what you want in plain English, you can do this."
              },
              {
                q: "Why not just learn this myself?",
                a: "You could. Anthropic has free courses, YouTube has tutorials. But busy professionals start those courses and never finish. They get stuck on step 3 and give up. What I offer is accountability and speed. In 2 weeks, you're operational. Not still watching videos."
              },
              {
                q: "What happens after the implementation?",
                a: "You're independent. That's the whole point. I include email support (30-90 days depending on tier), and you can always book follow-up sessions if needed. But most clients don't need them — they're off and running."
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
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready for Digital Independence?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Book a free 30-minute demo. I&apos;ll share my screen and show you exactly how it works with YOUR business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25"
            >
              Book Your Free Demo
            </Link>
            <Link
              href="/results"
              className="px-8 py-4 border border-border-subtle text-text-primary rounded-xl font-semibold text-lg hover:bg-surface transition-all"
            >
              See Client Results
            </Link>
          </div>
          <p className="text-sm text-text-muted mt-4">
            No pressure. No commitment. Just a live demo showing what&apos;s possible.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
