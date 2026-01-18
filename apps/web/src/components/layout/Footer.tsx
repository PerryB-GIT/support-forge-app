import Link from "next/link";
import Image from "next/image";
import { CONTACT_INFO } from "@support-forge/shared";

export function Footer() {
  return (
    <footer className="footer-enhanced py-12 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="footer-logo-glow">
                <Image
                  src="/sf-logo.png"
                  alt="Support Forge"
                  width={28}
                  height={28}
                  className="rounded-lg relative z-10"
                />
              </div>
              <span
                className="font-bold text-accent"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                SupportForge
              </span>
            </Link>
            <p className="text-text-secondary text-sm">
              Strategic AI consulting for mid-market executives. We help you cut
              through the hype and implement AI that delivers measurable ROI.
            </p>
          </div>

          {/* Services Links */}
          <div className="footer-separator md:pl-6">
            <h4 className="footer-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/services" className="footer-link">
                  Consulting Services
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="footer-link">
                  AI Readiness Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?service=implementation"
                  className="footer-link"
                >
                  Strategic Implementation
                </Link>
              </li>
              <li>
                <Link href="/contact?service=advisory" className="footer-link">
                  AI Advisory Retainer
                </Link>
              </li>
              <li>
                <Link href="/results" className="footer-link">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-separator md:pl-6">
            <h4 className="footer-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/results" className="footer-link">
                  Results & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="footer-link">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="footer-link">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-separator md:pl-6">
            <h4 className="footer-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="footer-link"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="footer-link">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>{CONTACT_INFO.location}</li>
            </ul>
            <div className="mt-4">
              <Link
                href="/contact?service=discovery"
                className="inline-block px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm rounded-lg transition-colors"
              >
                Schedule Discovery Call
              </Link>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="pt-6 border-t border-border-subtle mb-6">
          <p className="text-center text-text-muted text-xs tracking-wide uppercase mb-4">
            Technology Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <a
              href="https://partners.amazonaws.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/partners/aws-partner.svg"
                alt="AWS Partner"
                width={90}
                height={30}
                className="h-6 w-auto"
              />
            </a>
            <a
              href="https://partner.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/partners/microsoft-partner.svg"
                alt="Microsoft Partner"
                width={90}
                height={30}
                className="h-6 w-auto"
              />
            </a>
            <a
              href="https://vercel.com/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/partners/vercel-partner.svg"
                alt="Vercel Partner"
                width={90}
                height={30}
                className="h-6 w-auto"
              />
            </a>
            <a
              href="https://cloud.google.com/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/partners/google-cloud-partner.svg"
                alt="Google Cloud Partner"
                width={90}
                height={30}
                className="h-6 w-auto"
              />
            </a>
            <a
              href="https://github.com/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/partners/github-partner.svg"
                alt="GitHub Partner"
                width={90}
                height={30}
                className="h-6 w-auto"
              />
            </a>
            <a
              href="https://n8n.io/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/partners/n8n-partner.svg"
                alt="n8n Partner"
                width={90}
                height={30}
                className="h-6 w-auto"
              />
            </a>
            <a
              href="https://www.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/partners/anthropic-partner.svg"
                alt="Anthropic Partner"
                width={90}
                height={30}
                className="h-6 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4 text-text-muted text-sm">
          <div>
            &copy; {new Date().getFullYear()} Support Forge. All rights
            reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
