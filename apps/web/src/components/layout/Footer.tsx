import Link from "next/link";
import Image from "next/image";
import { CONTACT_INFO } from "@support-forge/shared";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/sf-logo.png"
                alt="Support Forge"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span
                className="font-bold text-accent"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                SupportForge
              </span>
            </Link>
            <p className="text-text-secondary text-sm">
              AI & IT Consulting services for modern businesses. Transforming ideas into reality.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/launchpad" className="hover:text-accent transition-colors">
                  AI Academy
                </Link>
              </li>
              <li>
                <Link href="/ai-transformation" className="hover:text-accent transition-colors">
                  AI Transformation
                </Link>
              </li>
              <li>
                <Link href="/services#ai" className="hover:text-accent transition-colors">
                  AI Integration
                </Link>
              </li>
              <li>
                <Link href="/services#development" className="hover:text-accent transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/services#cloud" className="hover:text-accent transition-colors">
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link href="/services#consulting" className="hover:text-accent transition-colors">
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link href="/services#security" className="hover:text-accent transition-colors">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="/services#support" className="hover:text-accent transition-colors">
                  Managed IT
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-accent transition-colors">
                  Workflow Shop
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-accent transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="hover:text-accent transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>{CONTACT_INFO.location}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4 text-text-muted text-sm">
          <div>&copy; {new Date().getFullYear()} Support Forge. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
