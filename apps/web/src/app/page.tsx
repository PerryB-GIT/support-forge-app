import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { CONTACT_INFO } from "@support-forge/shared";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 5L5 20v20l25 15 25-15V20L30 5z"
                stroke="var(--forge-copper)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M30 15L15 24v12l15 9 15-9V24L30 15z"
                fill="var(--forge-copper)"
                opacity="0.3"
              />
              <path d="M25 28h10v8l-5 4-5-4v-8z" fill="var(--forge-copper)" />
            </svg>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Support Forge
            </span>
          </div>
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
      <main className="flex-1 flex items-center justify-center px-4 pt-16">
        <div className="max-w-3xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Your AI & IT
            <span className="text-accent"> Partner</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Access your client portal, manage projects, schedule consultations,
            and get AI-powered support—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 rounded-lg bg-surface border border-border-subtle hover:border-border-default text-text-primary font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3 text-left">
            <div className="p-6 rounded-xl bg-surface border border-border-subtle">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Project Management</h3>
              <p className="text-text-secondary text-sm">
                Track your projects, view progress, and collaborate with our team.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-surface border border-border-subtle">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">AI Assistant</h3>
              <p className="text-text-secondary text-sm">
                Get instant answers to your technical questions 24/7.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-surface border border-border-subtle">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-text-secondary text-sm">
                Book consultations and manage appointments effortlessly.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div>
              <h4 className="font-semibold mb-3">Support Forge</h4>
              <p className="text-text-secondary text-sm">
                AI & IT Consulting services for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
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
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Location</h4>
              <p className="text-text-secondary text-sm">{CONTACT_INFO.location}</p>
            </div>
          </div>
          <div className="pt-6 border-t border-border-subtle text-center text-text-muted text-sm">
            © {new Date().getFullYear()} Support Forge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
