"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    companySize: "",
    revenue: "",
    interest: "",
    timeline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (serviceParam) {
      const interestMap: Record<string, string> = {
        discovery: "Discovery Call",
        assessment: "AI Readiness Assessment",
        implementation: "Strategic Implementation",
        advisory: "AI Advisory Retainer",
      };
      setFormData((prev) => ({
        ...prev,
        interest: interestMap[serviceParam] || "",
      }));
    }
  }, [serviceParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      value: "perry@support-forge.com",
      description: "Response within 24 hours",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      value: "(478) 299-1604",
      description: "Mon-Fri 9am-5pm EST",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Location",
      value: "Haverhill, MA",
      description: "Serving clients nationwide",
    },
  ];

  const roles = [
    "CEO / President",
    "COO / Operations",
    "CFO / Finance",
    "CTO / CIO",
    "VP / Director",
    "Founder / Owner",
    "Other Executive",
  ];

  const companySizes = [
    "1-10 employees",
    "11-25 employees",
    "26-50 employees",
    "51-100 employees",
    "101-200 employees",
    "200+ employees",
  ];

  const revenueRanges = [
    "Under $1M",
    "$1M - $2M",
    "$2M - $5M",
    "$5M - $10M",
    "$10M - $20M",
    "$20M+",
  ];

  const interests = [
    "Discovery Call",
    "AI Readiness Assessment",
    "Strategic Implementation",
    "AI Advisory Retainer",
    "Not sure yet",
  ];

  const timelines = [
    "Immediate (within 2 weeks)",
    "This quarter",
    "Next quarter",
    "Exploring for next year",
  ];

  const calendlyUrl = "https://calendly.com/perry-bailes";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Start the Conversation
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Schedule a discovery call or send us a message. We&apos;ll respond
            within 24 hours to discuss your AI strategy objectives.
          </p>
        </div>
      </section>

      {/* Schedule CTA */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border border-accent/30 rounded-2xl p-8 text-center">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Prefer to Schedule Directly?
            </h2>
            <p className="text-text-secondary mb-6">
              Book a 30-minute discovery call at your convenience.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold transition-all hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Schedule Discovery Call
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-surface border border-border-subtle rounded-xl p-5 text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                  {info.icon}
                </div>
                <h3 className="font-semibold mb-1">{info.title}</h3>
                <p className="text-accent font-medium text-sm mb-1">
                  {info.value}
                </p>
                <p className="text-text-muted text-xs">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-border-subtle rounded-2xl p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Message Received
                </h2>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                  Thank you for reaching out. We&apos;ll review your information
                  and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      phone: "",
                      role: "",
                      companySize: "",
                      revenue: "",
                      interest: "",
                      timeline: "",
                      message: "",
                    });
                  }}
                  className="px-6 py-3 bg-surface border border-border-subtle hover:border-accent text-text-primary rounded-lg font-medium transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Tell Us About Your Organization
                  </h2>
                  <p className="text-text-muted">
                    Help us understand your needs so we can prepare for a
                    productive conversation.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
                      Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Work Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                          placeholder="you@company.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Your Role *
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors"
                        >
                          <option value="">Select your role...</option>
                          {roles.map((role, index) => (
                            <option key={index} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
                      Company Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="companySize"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Company Size *
                        </label>
                        <select
                          id="companySize"
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors"
                        >
                          <option value="">Select company size...</option>
                          {companySizes.map((size, index) => (
                            <option key={index} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="revenue"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Annual Revenue Range
                        </label>
                        <select
                          id="revenue"
                          name="revenue"
                          value={formData.revenue}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors"
                        >
                          <option value="">Prefer not to say</option>
                          {revenueRanges.map((range, index) => (
                            <option key={index} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
                      Project Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="interest"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          I&apos;m Interested In *
                        </label>
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors"
                        >
                          <option value="">Select an option...</option>
                          {interests.map((interest, index) => (
                            <option key={index} value={interest}>
                              {interest}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-sm font-medium text-text-secondary mb-2"
                        >
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors"
                        >
                          <option value="">Select timeline...</option>
                          {timelines.map((timeline, index) => (
                            <option key={index} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-text-secondary mb-2"
                      >
                        Tell Us More *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="What are your primary business challenges? What outcomes are you hoping to achieve with AI?"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold transition-all hover:scale-[1.02]"
                    >
                      Submit Inquiry
                    </button>
                    <p className="text-text-muted text-xs text-center mt-4">
                      By submitting, you agree to receive communications from
                      Support Forge. We respect your privacy and never share
                      your information.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Questions Before Reaching Out?
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "What happens during a discovery call?",
                answer:
                  "It's a 30-minute conversation focused on understanding your business objectives, current challenges, and where AI might fit. No pitch — just a focused discussion to see if there's a fit.",
              },
              {
                question: "Is there any obligation after the discovery call?",
                answer:
                  "None. The call is complimentary and designed to help us both determine if we're the right fit. Many conversations lead to valuable insights even without further engagement.",
              },
              {
                question: "What size companies do you work with?",
                answer:
                  "We typically work with organizations of 20-200 employees or $2M+ in annual revenue. This size allows for meaningful AI implementation while remaining agile enough to move quickly.",
              },
              {
                question: "How quickly can you get started?",
                answer:
                  "For discovery calls, we can usually schedule within a few days. AI Readiness Assessments typically begin within 1-2 weeks of agreement. Implementation timelines vary based on scope.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-background border border-border-subtle rounded-xl p-6"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-text-secondary text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ContactPageFallback() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-surface rounded-lg w-3/4 mx-auto mb-6" />
            <div className="h-6 bg-surface rounded-lg w-1/2 mx-auto" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactPageFallback />}>
      <ContactPageContent />
    </Suspense>
  );
}
