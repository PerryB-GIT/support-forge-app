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
        description="AI & IT Consulting Services - Transform your business with cutting-edge technology solutions"
      />
      <LocalBusinessJsonLd
        url={siteUrl}
        logo={`${siteUrl}/sf-logo.png`}
        name="Support Forge"
        description="AI & IT Consulting services providing AI integration, custom software development, cloud solutions, cybersecurity, and managed IT services."
        email={CONTACT_INFO.email}
        telephone={CONTACT_INFO.phoneRaw}
        address={{
          city: "Haverhill",
          region: "Massachusetts",
          country: "US",
        }}
        priceRange="$"
      />
      <OrganizationJsonLd
        url={siteUrl}
        logo={`${siteUrl}/sf-logo.png`}
        name="Support Forge"
        description="AI & IT Consulting Services - Building stronger foundations for your business"
        email={CONTACT_INFO.email}
        telephone={CONTACT_INFO.phoneRaw}
        address={{
          city: "Haverhill",
          region: "Massachusetts",
          country: "US",
          postalCode: "01830",
        }}
        foundingDate="2005"
        slogan="AI That Actually Works"
      />
      <ServicesListJsonLd
        provider="Support Forge"
        url={siteUrl}
        services={[
          { name: "AI Integration", description: "Custom AI solutions including chatbots, automation, and machine learning integration.", serviceType: "AI Consulting" },
          { name: "Software Development", description: "Full-stack web and mobile application development using modern technologies.", serviceType: "Software Development" },
          { name: "Cloud Solutions", description: "AWS, Azure, and Google Cloud deployment, migration, and optimization services.", serviceType: "Cloud Computing" },
          { name: "IT Consulting", description: "Strategic technology consulting to optimize your IT investments.", serviceType: "IT Consulting" },
          { name: "Cybersecurity", description: "Security assessments, implementation, and monitoring to protect your digital assets.", serviceType: "Cybersecurity" },
          { name: "24/7 Support", description: "Round-the-clock technical support and maintenance services.", serviceType: "Technical Support" },
        ]}
      />
      <FAQJsonLd
        questions={[
          { question: "What AI consulting services does Support Forge offer?", answer: "Support Forge offers custom AI/ML model development, process automation and RPA, natural language processing, chatbot development, and predictive analytics solutions tailored to your business needs." },
          { question: "Does Support Forge offer free consultations?", answer: "Yes, Support Forge offers a free consultation to discuss your technology needs with no obligation. Contact us to schedule a call with our experts." },
          { question: "What industries does Support Forge serve?", answer: "Support Forge serves businesses across all industries, with particular expertise in healthcare, finance, technology startups, and small to medium enterprises looking to leverage AI and modern IT infrastructure." },
        ]}
      />
      {/* Header with mobile hamburger menu */}
      <Header />

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            AI Launchpad
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The Fastest Path From AI-Curious
            <span className="text-accent"> to AI-Powered</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Transform your team from &quot;I should use AI&quot; to &quot;I ship with AI daily&quot; in 2 weeks.
            Our clients save 30-40 hours every week with our proven LAUNCH Method.
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

      {/* Value Props Section */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Why <span className="text-accent">AI Launchpad?</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Stop wasting money on AI subscriptions you don&apos;t use. Bridge the gap from &quot;AI exists&quot; to &quot;my team uses it daily.&quot;
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Value Prop 1: Time Saved */}
            <div className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/5 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-accent mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>30-40</div>
              <h3 className="text-xl font-semibold mb-3">Hours Saved Per Week</h3>
              <p className="text-text-secondary">
                Reclaim your time permanently. Our clients consistently report saving 30-40 hours every week after implementing our AI systems.
              </p>
            </div>

            {/* Value Prop 2: Speed to Value */}
            <div className="group p-8 rounded-2xl bg-background border border-accent shadow-lg shadow-accent/10 transition-all text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wide">
                Our Promise
              </div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-accent mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>2</div>
              <h3 className="text-xl font-semibold mb-3">Weeks to Productive</h3>
              <p className="text-text-secondary">
                Not months of trial and error. In just 2 weeks, your team goes from AI-curious to shipping with AI daily.
              </p>
            </div>

            {/* Value Prop 3: Full Stack */}
            <div className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/5 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-accent mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>Full</div>
              <h3 className="text-xl font-semibold mb-3">Stack Enablement</h3>
              <p className="text-text-secondary">
                Claude Code + GitHub + AWS + Zapier + N8N. We set up your entire AI ecosystem, not just one tool.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/launchpad"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
            >
              See Our Programs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Choose Your <span className="text-accent">Path</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              From self-paced learning to full enterprise transformation
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle hover:border-accent transition-all">
              <div className="text-accent text-sm font-medium mb-2">Launchpad Starter</div>
              <div className="text-3xl font-bold mb-1">$97<span className="text-lg text-text-secondary">/mo</span></div>
              <p className="text-text-secondary text-sm mb-4">Self-paced video course with community support</p>
              <Link href="/launchpad#pricing" className="text-accent hover:underline text-sm">Learn more →</Link>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-2xl bg-background border-2 border-accent shadow-lg shadow-accent/10 relative">
              <div className="absolute -top-2 right-4 px-2 py-0.5 bg-accent text-white text-xs font-bold rounded">POPULAR</div>
              <div className="text-accent text-sm font-medium mb-2">Launchpad Pro</div>
              <div className="text-3xl font-bold mb-1">$3,000</div>
              <p className="text-text-secondary text-sm mb-4">2-week live cohort with hands-on setup</p>
              <Link href="/launchpad#pricing" className="text-accent hover:underline text-sm">Learn more →</Link>
            </div>

            {/* Enterprise */}
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle hover:border-accent transition-all">
              <div className="text-accent text-sm font-medium mb-2">Launchpad Enterprise</div>
              <div className="text-3xl font-bold mb-1">$10,000+</div>
              <p className="text-text-secondary text-sm mb-4">Full custom AI transformation</p>
              <Link href="/contact?subject=Enterprise" className="text-accent hover:underline text-sm">Contact us →</Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-text-muted text-sm mb-4">All programs include the proven LAUNCH Method framework</p>
            <Link
              href="/launchpad"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
            >
              View Full Program Details
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/* Testimonials Section - Hidden until real testimonials are added
      TODO: Uncomment when you have real client testimonials to display
      */}

      {/* CTA Section */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Ready to Transform Your Business?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how AI and modern IT solutions can help you achieve your goals. Schedule a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
