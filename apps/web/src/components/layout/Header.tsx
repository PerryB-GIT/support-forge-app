"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  variant?: "default" | "transparent";
}

export function Header({ variant = "default" }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/launchpad", label: "AI Launchpad", highlight: true },
    { href: "/academy", label: "Academy", highlight: true },
    { href: "/shop", label: "Workflow Shop" },
    { href: "/ai-transformation", label: "AI Transformation" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`border-b border-border-subtle backdrop-blur-sm sticky top-0 z-50 ${
        variant === "transparent" ? "bg-transparent" : "bg-background/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/sf-logo.png"
            alt="Support Forge"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span
            className="text-lg font-bold text-accent"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            SupportForge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                isActive(link.href)
                  ? "text-accent font-medium"
                  : link.highlight
                  ? "text-accent font-medium"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Client Sign in
          </Link>
          <Link
            href="/register"
            className="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/student/login"
            className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-1 pl-2 border-l border-border-subtle"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 9L15 11.5L10 14V9Z" fill="currentColor"/>
              <path d="M6 21H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 21V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M14 21V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Student Portal
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-background">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-text-secondary hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border-subtle space-y-2">
              <Link
                href="/student/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 text-accent hover:bg-accent/10 rounded-lg font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 9L15 11.5L10 14V9Z" fill="currentColor"/>
                  <path d="M6 21H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M10 21V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M14 21V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Student Portal
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 text-text-secondary hover:bg-surface rounded-lg"
              >
                Client Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 bg-accent hover:bg-accent-hover text-white text-center rounded-lg font-medium"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
