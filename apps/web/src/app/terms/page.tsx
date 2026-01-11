import Link from "next/link";
import { CONTACT_INFO } from "@support-forge/shared";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service for Support Forge AI & IT Consulting. Understand our policies on service agreements, acceptable use, and intellectual property.",
  openGraph: {
    title: "Terms of Service - Support Forge",
    description:
      "Read the Terms of Service for Support Forge AI & IT Consulting services.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - Support Forge",
    description:
      "Read the Terms of Service for Support Forge AI & IT Consulting services.",
  },
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "December 7, 2025";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Content */}
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Terms of Service
          </h1>
          <p className="text-text-secondary mb-8">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                1. Agreement to Terms
              </h2>
              <p className="text-text-secondary leading-relaxed">
                By accessing or using the services provided by Support Forge
                (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree
                to be bound by these Terms of Service. If you do not agree to
                these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                2. Description of Services
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Support Forge provides AI and IT consulting services, including
                but not limited to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2 mt-4">
                <li>AI integration and automation solutions</li>
                <li>Custom software development</li>
                <li>Cloud solutions and DevOps</li>
                <li>IT consulting and strategy</li>
                <li>Cybersecurity services</li>
                <li>Managed IT services and 24/7 support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                3. User Accounts
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                To access certain features of our services, you may be required
                to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password and account</li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                We reserve the right to suspend or terminate accounts that
                violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                4. Acceptable Use
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                You agree not to use our services to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Engage in any fraudulent or deceptive practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                5. Intellectual Property
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                All content, features, and functionality of our services,
                including but not limited to text, graphics, logos, and
                software, are the exclusive property of Support Forge and are
                protected by intellectual property laws.
              </p>
              <p className="text-text-secondary leading-relaxed">
                For custom development projects, intellectual property rights
                will be specified in individual service agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                6. Payment Terms
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Payment terms for our services are as follows:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>
                  Fees are outlined in individual service agreements or
                  proposals
                </li>
                <li>
                  Payment is due according to the terms specified in each
                  agreement
                </li>
                <li>Late payments may incur additional fees</li>
                <li>All fees are non-refundable unless otherwise specified</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                7. Confidentiality
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We understand the importance of protecting your confidential
                information. Both parties agree to maintain the confidentiality
                of any proprietary or sensitive information shared during the
                course of our engagement. Specific confidentiality terms may be
                outlined in individual service agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                8. Limitation of Liability
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>
                  Our services are provided &quot;as is&quot; without warranties
                  of any kind
                </li>
                <li>
                  We are not liable for indirect, incidental, or consequential
                  damages
                </li>
                <li>
                  Our total liability shall not exceed the amount paid for the
                  services in question
                </li>
                <li>
                  We are not responsible for any third-party services or content
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                9. Indemnification
              </h2>
              <p className="text-text-secondary leading-relaxed">
                You agree to indemnify and hold harmless Support Forge, its
                officers, directors, employees, and agents from any claims,
                damages, losses, or expenses arising from your use of our
                services or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                10. Service Modifications
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any
                aspect of our services at any time. We will provide reasonable
                notice for significant changes that may affect ongoing projects.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                11. Termination
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Either party may terminate the service relationship with written
                notice. Upon termination, you remain responsible for any
                outstanding payments, and we will provide reasonable assistance
                in transitioning your data and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                12. Dispute Resolution
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Any disputes arising from these terms or our services shall
                first be attempted to be resolved through good-faith
                negotiation. If resolution cannot be reached, disputes shall be
                resolved through binding arbitration in accordance with the laws
                of the Commonwealth of Massachusetts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                13. Governing Law
              </h2>
              <p className="text-text-secondary leading-relaxed">
                These Terms of Service shall be governed by and construed in
                accordance with the laws of the Commonwealth of Massachusetts,
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                14. Changes to Terms
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We reserve the right to modify these terms at any time. We will
                notify users of significant changes via email or through our
                website. Continued use of our services after changes constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-accent">
                15. Contact Information
              </h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <div className="mt-4 p-4 rounded-lg bg-surface border border-border-subtle">
                <p className="text-text-primary font-medium">Support Forge</p>
                <p className="text-text-secondary">{CONTACT_INFO.location}</p>
                <p className="text-text-secondary">
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-accent hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </p>
                <p className="text-text-secondary">
                  Phone:{" "}
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="text-accent hover:underline"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
