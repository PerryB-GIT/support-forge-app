import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { CONTACT_INFO } from "@support-forge/shared";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

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
        priceRange="$$"
      />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/sf-logo.png" alt="Support Forge" width={32} height={32} className="rounded-lg" />
            <span
              className="text-xl font-bold text-accent"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              SupportForge
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/ai-transformation" className="text-accent font-medium">
              AI Transformation
            </Link>
            <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Real AI Awakening
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            AI That Actually
            <span className="text-accent"> Works</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Stop collecting AI subscriptions that gather dust. We help business owners build systems that genuinely transform how they work — and we love every minute of it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-transformation"
              className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
            >
              See What's Possible
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Our <span className="text-accent">Services</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Comprehensive AI and IT solutions tailored to accelerate your business growth
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* AI Solutions */}
            <div className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Integration</h3>
              <p className="text-text-secondary mb-4">
                Custom AI solutions including chatbots, automation, and machine learning integration for your business processes.
              </p>
              <Link href="/services#ai" className="text-accent hover:underline inline-flex items-center gap-1">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Software Development */}
            <div className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Software Development</h3>
              <p className="text-text-secondary mb-4">
                Full-stack web and mobile application development using modern technologies and best practices.
              </p>
              <Link href="/services#development" className="text-accent hover:underline inline-flex items-center gap-1">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Cloud & Infrastructure */}
            <div className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cloud Solutions</h3>
              <p className="text-text-secondary mb-4">
                AWS, Azure, and Google Cloud deployment, migration, and optimization services for scalable infrastructure.
              </p>
              <Link href="/services#cloud" className="text-accent hover:underline inline-flex items-center gap-1">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* IT Consulting */}
            <div className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">IT Consulting</h3>
              <p className="text-text-secondary mb-4">
                Strategic technology consulting to help you make informed decisions and optimize your IT investments.
              </p>
              <Link href="/services#consulting" className="text-accent hover:underline inline-flex items-center gap-1">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Cybersecurity */}
            <div className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cybersecurity</h3>
              <p className="text-text-secondary mb-4">
                Comprehensive security assessments, implementation, and monitoring to protect your digital assets.
              </p>
              <Link href="/services#security" className="text-accent hover:underline inline-flex items-center gap-1">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Support & Maintenance */}
            <div className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-text-secondary mb-4">
                Round-the-clock technical support and maintenance to keep your systems running smoothly.
              </p>
              <Link href="/services#support" className="text-accent hover:underline inline-flex items-center gap-1">
                Learn more <span>→</span>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
            >
              View All Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Why Choose <span className="text-accent">Support Forge?</span>
              </h2>
              <p className="text-text-secondary mb-8">
                We combine cutting-edge AI technology with decades of IT expertise to deliver solutions that drive real business results.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fast Implementation</h4>
                    <p className="text-text-secondary text-sm">Rapid deployment with agile methodologies that get you results quickly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Enterprise Security</h4>
                    <p className="text-text-secondary text-sm">Bank-grade security protocols protecting your data at every level.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Dedicated Team</h4>
                    <p className="text-text-secondary text-sm">Expert consultants assigned to your project from start to finish.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/5 rounded-3xl blur-3xl"></div>
              <div className="relative p-8 rounded-2xl bg-surface border border-border-subtle">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6">
                    <div className="text-4xl font-bold text-accent mb-2">150+</div>
                    <div className="text-text-secondary text-sm">Projects Delivered</div>
                  </div>
                  <div className="text-center p-6">
                    <div className="text-4xl font-bold text-accent mb-2">98%</div>
                    <div className="text-text-secondary text-sm">Client Satisfaction</div>
                  </div>
                  <div className="text-center p-6">
                    <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                    <div className="text-text-secondary text-sm">Support Available</div>
                  </div>
                  <div className="text-center p-6">
                    <div className="text-4xl font-bold text-accent mb-2">10+</div>
                    <div className="text-text-secondary text-sm">Years Experience</div>
                  </div>
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
      <footer className="py-12 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image src="/sf-logo.png" alt="Support Forge" width={28} height={28} className="rounded-lg" />
                <span className="font-bold text-accent" style={{ fontFamily: "var(--font-space-grotesk)" }}>SupportForge</span>
              </Link>
              <p className="text-text-secondary text-sm">
                AI & IT Consulting services for modern businesses. Transforming ideas into reality.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/services#ai" className="hover:text-accent transition-colors">AI Integration</Link></li>
                <li><Link href="/services#development" className="hover:text-accent transition-colors">Software Development</Link></li>
                <li><Link href="/services#cloud" className="hover:text-accent transition-colors">Cloud Solutions</Link></li>
                <li><Link href="/services#consulting" className="hover:text-accent transition-colors">IT Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                <li><Link href="/login" className="hover:text-accent transition-colors">Client Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-accent transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-accent transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li>{CONTACT_INFO.location}</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4 text-text-muted text-sm">
            <div>© {new Date().getFullYear()} Support Forge. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
