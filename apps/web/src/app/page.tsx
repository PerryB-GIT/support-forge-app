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
        description="AI Implementation Partner - We set up your digital toolkit, you own it forever"
      />
      <LocalBusinessJsonLd
        url={siteUrl}
        logo={`${siteUrl}/sf-logo.png`}
        name="Support Forge"
        description="AI Implementation Partner providing website migration, AI toolkit setup, and digital transformation services for small businesses."
        email={CONTACT_INFO.email}
        telephone={CONTACT_INFO.phoneRaw}
        address={{
          city: "Haverhill",
          region: "Massachusetts",
          country: "US",
        }}
        priceRange="$$"
      />
      <OrganizationJsonLd
        url={siteUrl}
        logo={`${siteUrl}/sf-logo.png`}
        name="Support Forge"
        description="AI Implementation Partner - From developer dependency to digital independence"
        email={CONTACT_INFO.email}
        telephone={CONTACT_INFO.phoneRaw}
        address={{
          city: "Haverhill",
          region: "Massachusetts",
          country: "US",
          postalCode: "01830",
        }}
        foundingDate="2005"
        slogan="We set it up. You own it forever."
      />
      <ServicesListJsonLd
        provider="Support Forge"
        url={siteUrl}
        services={[
          { name: "Website Liberation", description: "Migrate your site from expensive platforms to AWS hosting you own. Save $300+/year.", serviceType: "Website Migration" },
          { name: "AI Toolkit Setup", description: "Claude Code, MCP connections, Zapier/N8N automation setup for your business.", serviceType: "AI Implementation" },
          { name: "Full Digital Overhaul", description: "Complete digital transformation with custom functionality and team training.", serviceType: "Digital Transformation" },
        ]}
      />
      <FAQJsonLd
        questions={[
          { question: "What makes Support Forge different from a traditional agency?", answer: "Traditional agencies create dependency - you need them for every change. We set everything up, then teach you to run it yourself. You own your infrastructure forever with no monthly platform fees." },
          { question: "How long does implementation take?", answer: "Website Liberation takes 1 week, AI Toolkit Setup takes 2 weeks, and Full Digital Overhaul takes 3-4 weeks. Compare that to agencies quoting 2+ months." },
          { question: "Do I need technical skills?", answer: "Not at all. Our best clients include a sheep farmer and a veterinary practice owner. If you can describe what you want in plain English, you can use these tools." },
        ]}
      />

      <Header />

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            AI Implementation Partner
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            We Set It Up.
            <span className="text-accent"> You Own It Forever.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            For small business owners tired of waiting on developers and paying monthly platform fees.
            We set up your entire digital toolkit in days, not months — then teach you to run it yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              Book a Free Demo
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              See Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Sound <span className="text-accent">Familiar?</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Platform Jail</h3>
              <p className="text-text-secondary text-sm">Paying $25-50/month for Squarespace or Wix forever</p>
            </div>

            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Developer Dependency</h3>
              <p className="text-text-secondary text-sm">$150+ invoices for text changes, 2-week wait times</p>
            </div>

            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Tech Intimidation</h3>
              <p className="text-text-secondary text-sm">You WANT to learn AI but don&apos;t know where to start</p>
            </div>

            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Trust Issues</h3>
              <p className="text-text-secondary text-sm">Burned by agencies who overpromised and underdelivered</p>
            </div>
          </div>

          <div className="mt-12 max-w-2xl mx-auto text-center">
            <blockquote className="text-xl italic text-text-secondary">
              &quot;How we manage it is not my priority right now. It&apos;s getting it fixed.&quot;
            </blockquote>
            <p className="text-text-muted mt-2">— Veterinary Practice Owner</p>
          </div>
        </div>
      </section>

      {/* The Difference Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              The Support Forge <span className="text-accent">Difference</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Traditional Agency */}
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle">
              <div className="text-text-muted text-sm font-medium mb-4 uppercase tracking-wide">Traditional Agency</div>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>2+ months timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>$20,000-$50,000 cost</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Dependent on them forever</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Changes require tickets</span>
                </li>
              </ul>
            </div>

            {/* Support Forge - Featured */}
            <div className="p-6 rounded-2xl bg-background border-2 border-accent shadow-lg shadow-accent/10 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wide">
                Implementation Partner
              </div>
              <div className="text-accent text-sm font-medium mb-4 uppercase tracking-wide">Support Forge</div>
              <ul className="space-y-3 text-text-primary">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Days</strong>, not months</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>$2,500-$15,000 (one-time)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>You own everything</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>We teach you to maintain it</span>
                </li>
              </ul>
            </div>

            {/* DIY / Online Courses */}
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle">
              <div className="text-text-muted text-sm font-medium mb-4 uppercase tracking-wide">DIY / Online Courses</div>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>You figure it out yourself</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>$30-500 cost</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>High abandonment rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>No accountability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Choose Your <span className="text-accent">Implementation</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              One-time investment. You own everything. No monthly fees.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {/* Tier 1: Website Liberation */}
            <div className="p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all flex flex-col">
              <div className="text-accent text-sm font-medium mb-2">Tier 1</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>Website Liberation</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">$2,500</span>
                <span className="text-text-muted">/ 1 week</span>
              </div>
              <p className="text-text-secondary mb-6">
                Escape platform jail. Migrate your site to infrastructure you own.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Migrate existing site to AWS (~$4/month hosting)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Set up Claude Code on your computer</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Connect to Google Drive for easy uploads</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>2x live training sessions (60 min each)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30-day email support</span>
                </li>
              </ul>
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 mb-6">
                <p className="text-sm text-text-secondary">
                  <strong className="text-accent">ROI:</strong> Save $300+/year on hosting alone. Eliminate $1,000+/year in developer fees.
                </p>
              </div>
              <Link
                href="/contact?service=website-liberation"
                className="w-full py-3 rounded-lg bg-surface border border-border-subtle hover:border-accent text-center font-medium transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Tier 2: AI Toolkit Setup - Featured */}
            <div className="p-8 rounded-2xl bg-background border-2 border-accent shadow-lg shadow-accent/10 relative flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <div className="text-accent text-sm font-medium mb-2">Tier 2</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>AI Toolkit Setup</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">$5,000</span>
                <span className="text-text-muted">/ 2 weeks</span>
              </div>
              <p className="text-text-secondary mb-6">
                AI working across your entire business, not just your website.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Everything in Website Liberation</strong></span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>MCP connections (Gmail, Drive, Calendar, GitHub)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Zapier/N8N automation setup (3 workflows)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom AI prompts for your business</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>4x live training sessions</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>60-day email support</span>
                </li>
              </ul>
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 mb-6">
                <p className="text-sm text-text-secondary">
                  <strong className="text-accent">ROI:</strong> Save 5-10 hours/week. At $50/hr = $15,000+/year in time savings.
                </p>
              </div>
              <Link
                href="/contact?service=ai-toolkit"
                className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-center font-medium transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Tier 3: Full Digital Overhaul */}
            <div className="p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all flex flex-col">
              <div className="text-accent text-sm font-medium mb-2">Tier 3</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>Full Digital Overhaul</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">$10-15K</span>
                <span className="text-text-muted">/ 3-4 weeks</span>
              </div>
              <p className="text-text-secondary mb-6">
                Complete digital transformation for businesses ready to go all-in.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Everything in AI Toolkit Setup</strong></span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete website redesign</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom functionality (booking, portals, etc.)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Database setup if needed</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>8x live training + team training (up to 3)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>90-day priority support + 1 emergency session</span>
                </li>
              </ul>
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 mb-6">
                <p className="text-sm text-text-secondary">
                  <strong className="text-accent">ROI:</strong> Replaces $20K-50K agency projects. Complete digital independence.
                </p>
              </div>
              <Link
                href="/contact?service=digital-overhaul"
                className="w-full py-3 rounded-lg bg-surface border border-border-subtle hover:border-accent text-center font-medium transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              From Intimidated to <span className="text-accent">Independent</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-surface border border-border-subtle">
              <div className="flex items-center gap-1 text-accent mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg mb-4">
                &quot;Oh my God, that would change my life.&quot;
              </blockquote>
              <p className="text-text-secondary text-sm mb-4">
                After seeing a live demo of AI-powered website editing, Autumn went from intimidated to excited. Now she manages her own farm website.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">A</div>
                <div>
                  <p className="font-semibold">Autumn B.</p>
                  <p className="text-text-muted text-sm">Valais Sheep Farm</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border-subtle">
              <div className="flex items-center gap-1 text-accent mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg mb-4">
                &quot;All I needed was your document to kickstart my work... and I was off to the races.&quot;
              </blockquote>
              <p className="text-text-secondary text-sm mb-4">
                Steve connected his systems overnight, ran complex data analysis, generated graphs, and created PDFs — all before our next call.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">S</div>
                <div>
                  <p className="font-semibold">Steve B.</p>
                  <p className="text-text-muted text-sm">Business Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Ready for Digital Independence?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Book a free 30-minute demo. I&apos;ll share my screen and show you exactly how it works with YOUR business — not a generic example.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              Book Your Free Demo
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              Learn About Us
            </Link>
          </div>
          <p className="text-text-muted text-sm mt-6">
            No pressure. No commitment. Just a live demo showing what&apos;s possible.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
