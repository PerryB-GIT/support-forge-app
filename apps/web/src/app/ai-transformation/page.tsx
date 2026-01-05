import Link from "next/link";
import type { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI Transformation",
  description: "Stop collecting AI subscriptions. Start building systems that actually transform your business. Support Forge helps business owners achieve real AI awakening — not just another tool, but a smarter way to work.",
  keywords: [
    "AI transformation",
    "business AI strategy",
    "AI consulting for small business",
    "AI implementation",
    "business automation",
    "AI awakening",
    "AI for business owners",
    "practical AI solutions",
  ],
  openGraph: {
    title: "AI Transformation - Support Forge",
    description: "Downloading the hot new AI tool isn't transformation. We help you build systems that actually change how your business works.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Transformation - Support Forge",
    description: "Stop collecting AI subscriptions. Start building systems that actually transform your business.",
  },
  alternates: {
    canonical: "/ai-transformation",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://support-forge.com";

export default function AITransformationPage() {
  const transformations = [
    {
      before: "Drowning in support tickets every Monday",
      after: "AI handles the routine overnight — you start the week focused on growth",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      before: "Big decisions based on gut feeling and hope",
      after: "Data-backed answers in minutes, not weeks",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      before: "Team buried in repetitive busywork",
      after: "Your people focused on what actually matters",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      before: "Watching competitors and wondering what they know",
      after: "They're watching you",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  const painPoints = [
    "AI tools that seemed magical for a week, now forgotten",
    "A team that's more overwhelmed than empowered",
    "That nagging feeling you're falling behind while everyone else figures it out",
    "Money spent on 'AI initiatives' with nothing to show for it",
  ];

  return (
    <div className="min-h-screen bg-background">
      <ServiceJsonLd
        name="AI Transformation Services"
        description="Strategic AI implementation that transforms how businesses operate — not just another tool, but systems that actually work."
        provider="Support Forge"
        url={`${siteUrl}/ai-transformation`}
      />

      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Real AI Awakening
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Downloading the Hot New AI Tool{" "}
            <span className="text-accent">Isn't Transformation</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Your competitors are collecting subscriptions. You could be building something that actually changes how your business works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25 hover:scale-105"
            >
              Let's Build Something Real
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 border border-border-subtle text-text-primary rounded-xl font-semibold text-lg hover:bg-surface transition-all"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Sound <span className="text-accent">Familiar?</span>
            </h2>
            <p className="text-xl text-text-secondary">
              You've got the subscriptions. You've watched the webinars. Your team has the tools.
            </p>
            <p className="text-xl text-text-primary font-medium mt-4">
              So why does everything still feel... the same?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border-subtle"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-text-secondary">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-accent/10 via-background to-accent/10 border border-accent/20 text-center">
            <p className="text-xl text-text-primary font-medium">
              The gap isn't access to AI. Everyone has that now.
            </p>
            <p className="text-xl text-accent font-bold mt-2">
              The gap is knowing how to make it actually work for YOUR business.
            </p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              We Help You See What's <span className="text-accent">Possible</span>
            </h2>
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-surface border border-border-subtle">
              <p className="text-xl text-text-secondary mb-6">
                We don't show up with a sales pitch for the latest tool.
              </p>
              <p className="text-xl text-text-primary font-medium mb-6">
                We show up with questions: What's eating your time? What keeps you up at night? What would change everything if it just... worked?
              </p>
              <p className="text-xl text-text-secondary">
                Then we roll up our sleeves and build it with you — not just for you.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
              <p className="text-lg text-text-secondary italic mb-4">
                "We're genuinely obsessed with this stuff. We live for the moment when a business owner sees their operation running smarter and says..."
              </p>
              <p className="text-2xl text-accent font-bold">
                "Wait, it can do THAT?"
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border-subtle">
              <p className="text-xl text-text-primary font-medium">
                The promise:
              </p>
              <p className="text-xl text-text-secondary mt-4">
                You won't just use AI. You'll understand it. You'll own it. And you'll wonder how you ever ran your business without it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformations Section */}
      <section className="py-20 px-6 bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              What an AI Awakening <span className="text-accent">Looks Like</span>
            </h2>
          </div>

          <div className="grid gap-6">
            {transformations.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-background border border-border-subtle hover:border-accent/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1 grid md:grid-cols-2 gap-4 md:gap-8">
                    <div className="flex items-center gap-3">
                      <span className="text-red-400 font-medium text-sm uppercase tracking-wide">Before:</span>
                      <p className="text-text-muted">{item.before}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-400 font-medium text-sm uppercase tracking-wide">After:</span>
                      <p className="text-text-primary font-medium">{item.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
            The Window Is <span className="text-accent">Open</span>
          </h2>

          <div className="space-y-6 text-xl text-text-secondary max-w-3xl mx-auto">
            <p>
              Right now, most businesses are fumbling with AI. Downloading apps. Watching tutorials. Hoping something sticks.
            </p>
            <p className="text-text-primary font-medium">
              That won't last.
            </p>
            <p>
              The businesses that figure this out first will pull ahead — and stay there.
            </p>
            <p className="text-accent font-bold text-2xl mt-8">
              This is your window. Let's not waste it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-accent/10 via-background to-accent/10 border-y border-border-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready for Your AI Awakening?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Let's have a real conversation about your business. No sales pitch. No buzzwords. Just honest talk about what's possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25 hover:scale-105"
            >
              Start the Conversation
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border border-border-subtle text-text-primary rounded-xl font-semibold text-lg hover:bg-surface transition-all"
            >
              See All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
