"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function StudentLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // Check enrollment status
      const enrollmentRes = await fetch(`/api/academy/enrollment?email=${encodeURIComponent(email)}`);
      const enrollmentData = await enrollmentRes.json();

      if (!enrollmentData.enrolled) {
        setError("You are not enrolled in the academy. Please enroll first.");
        setLoading(false);
        return;
      }

      router.push("/academy/dashboard");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Image
              src="/academy-logo.svg"
              alt="AI Launchpad Academy"
              width={56}
              height={56}
              className="object-contain"
            />
            <div className="text-left">
              <span
                className="text-2xl font-bold block"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                AI Launchpad
              </span>
              <span className="text-accent text-sm">Academy</span>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-text-primary mb-1">Student Portal</h1>
          <p className="text-text-secondary">Sign in to access your courses</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border-subtle rounded-xl p-6 space-y-4"
        >
          {error && (
            <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-accent hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in to Academy"}
          </button>
        </form>

        <p className="mt-6 text-center text-text-secondary text-sm">
          Not enrolled yet?{" "}
          <Link href="/academy" className="text-accent hover:underline">
            View courses & pricing
          </Link>
        </p>

        <p className="mt-4 text-center">
          <Link
            href="/"
            className="text-text-muted hover:text-text-secondary text-sm inline-flex items-center gap-1.5 group"
          >
            {/* Custom back icon with motion trail */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 9H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-40 group-hover:opacity-60 transition-opacity"/>
              <path d="M8 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-40 group-hover:opacity-60 transition-opacity"/>
            </svg>
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
