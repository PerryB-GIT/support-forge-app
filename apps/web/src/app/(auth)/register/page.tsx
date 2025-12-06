"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      company: formData.get("company") as string,
      phone: formData.get("phone") as string,
    };

    const confirmPassword = formData.get("confirmPassword") as string;

    if (data.password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Registration failed");
      } else {
        router.push("/login?registered=true");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg
              width="40"
              height="40"
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
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Support Forge
            </span>
          </div>
          <p className="text-text-secondary">Create your account</p>
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
              htmlFor="name"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-forge-copper focus:ring-1 focus:ring-forge-copper outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>

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
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-forge-copper focus:ring-1 focus:ring-forge-copper outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Company (Optional)
            </label>
            <input
              id="company"
              name="company"
              type="text"
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-forge-copper focus:ring-1 focus:ring-forge-copper outline-none transition-colors"
              placeholder="Your company"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Phone (Optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-forge-copper focus:ring-1 focus:ring-forge-copper outline-none transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-forge-copper focus:ring-1 focus:ring-forge-copper outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              className="w-full px-4 py-2.5 rounded-lg bg-elevated border border-border-subtle focus:border-forge-copper focus:ring-1 focus:ring-forge-copper outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-text-secondary text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
