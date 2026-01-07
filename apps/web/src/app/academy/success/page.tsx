import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Welcome to AI Academy | Support Forge",
  description: "Your enrollment is confirmed. Get ready to master AI implementation.",
};

async function SuccessContent({ sessionId }: { sessionId: string }) {
  let customerEmail = "";
  let productName = "AI Academy";

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      customerEmail = session.customer_details?.email || session.customer_email || "";
      productName = session.metadata?.productName || "AI Academy";
    } catch (error) {
      console.error("Error retrieving session:", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Welcome to <span className="text-accent">{productName}</span>!
      </h1>

      <p className="text-text-secondary text-lg mb-8">
        Your enrollment is confirmed. We&apos;re excited to have you on board!
      </p>

      {customerEmail && (
        <p className="text-text-muted mb-8">
          A confirmation email has been sent to <span className="text-text-primary">{customerEmail}</span>
        </p>
      )}

      {/* Next Steps */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-8 mb-8 text-left">
        <h2 className="text-xl font-semibold mb-6">Next Steps</h2>
        <ol className="space-y-4">
          <li className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 font-bold">
              1
            </span>
            <div>
              <p className="font-medium">Check Your Email</p>
              <p className="text-text-secondary text-sm">
                You&apos;ll receive login credentials and course access instructions.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 font-bold">
              2
            </span>
            <div>
              <p className="font-medium">Join the Community</p>
              <p className="text-text-secondary text-sm">
                Connect with other students in our private Discord community.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 font-bold">
              3
            </span>
            <div>
              <p className="font-medium">Start Module 0</p>
              <p className="text-text-secondary text-sm">
                Begin with the Welcome module to set up your learning environment.
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/academy/dashboard"
          className="px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
        >
          Go to Course Dashboard
        </Link>
        <Link
          href="/"
          className="px-8 py-4 rounded-lg bg-surface border border-border-subtle hover:border-accent text-text-primary font-medium transition-all"
        >
          Return Home
        </Link>
      </div>

      {/* Support Note */}
      <p className="text-text-muted text-sm mt-12">
        Questions? Email us at{" "}
        <a href="mailto:support@support-forge.com" className="text-accent hover:underline">
          support@support-forge.com
        </a>
      </p>
    </div>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id || "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4">
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="w-20 h-20 rounded-full bg-surface mx-auto mb-8"></div>
                <div className="h-8 bg-surface rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-surface rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          }
        >
          <SuccessContent sessionId={sessionId} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
