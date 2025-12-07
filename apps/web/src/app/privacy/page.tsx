import Link from "next/link";
import { CONTACT_INFO } from "@support-forge/shared";

export const metadata = {
  title: "Privacy Policy - Support Forge",
  description: "Privacy Policy for Support Forge AI & IT Consulting services",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 7, 2025";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-xl font-bold text-accent"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              SupportForge
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
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

      {/* Content */}
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-text-secondary mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">1. Introduction</h2>
              <p className="text-text-secondary leading-relaxed">
                Support Forge (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">2. Information We Collect</h2>
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Register for an account</li>
                <li>Fill out a contact form</li>
                <li>Schedule a consultation</li>
                <li>Subscribe to our newsletter</li>
                <li>Request support or services</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                This information may include your name, email address, phone number, company name,
                and any other information you choose to provide.
              </p>

              <h3 className="text-lg font-medium mb-2 mt-6">Automatically Collected Information</h3>
              <p className="text-text-secondary leading-relaxed">
                When you visit our website, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2 mt-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">3. How We Use Your Information</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">4. Information Sharing</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties.
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li><strong>Service Providers:</strong> With third-party vendors who assist us in operating our website and providing services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> With your explicit consent for any other purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">5. Data Security</h2>
              <p className="text-text-secondary leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your
                personal information against unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">6. Cookies and Tracking</h2>
              <p className="text-text-secondary leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our website.
                You can control cookie settings through your browser preferences. Essential cookies are
                required for the website to function properly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">7. Your Rights</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">8. Data Retention</h2>
              <p className="text-text-secondary leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes
                for which it was collected, comply with legal obligations, resolve disputes, and enforce
                our agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">9. Children&apos;s Privacy</h2>
              <p className="text-text-secondary leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly
                collect personal information from children. If you become aware that a child has provided
                us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">10. Changes to This Policy</h2>
              <p className="text-text-secondary leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">11. Contact Us</h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 rounded-lg bg-surface border border-border-subtle">
                <p className="text-text-primary font-medium">Support Forge</p>
                <p className="text-text-secondary">{CONTACT_INFO.location}</p>
                <p className="text-text-secondary">
                  Email:{" "}
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-accent hover:underline">
                    {CONTACT_INFO.email}
                  </a>
                </p>
                <p className="text-text-secondary">
                  Phone:{" "}
                  <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-accent hover:underline">
                    {CONTACT_INFO.phone}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-text-muted text-sm">
          <div>&copy; {new Date().getFullYear()} Support Forge. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-accent">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
