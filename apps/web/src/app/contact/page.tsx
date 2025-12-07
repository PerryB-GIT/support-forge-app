"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      value: "perry.bailes@gmail.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: "📞",
      title: "Call Us",
      value: "(478) 299-1604",
      description: "Mon-Fri 9am-6pm EST"
    },
    {
      icon: "📍",
      title: "Location",
      value: "Haverhill, MA",
      description: "Massachusetts"
    }
  ];

  const services = [
    "AI Integration & Automation",
    "Custom Software Development",
    "Cloud Solutions & DevOps",
    "IT Consulting & Strategy",
    "Cybersecurity Services",
    "Managed IT Services",
    "Other"
  ];

  // Calendly URL
  const calendlyUrl = "https://calendly.com/perry-bailes";

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border-subtle backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/sf-logo.png" alt="Support Forge" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-bold text-accent">
              SupportForge
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">Services</Link>
            <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-accent font-medium">Contact</Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all"
            >
              Client Portal
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Ready to transform your business with technology? We&apos;d love to hear from you.
            Reach out and let&apos;s start a conversation about your goals.
          </p>
        </div>
      </section>

      {/* Schedule Consultation CTA */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border border-accent/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Schedule a Free Consultation
            </h2>
            <p className="text-text-secondary mb-6">
              Book a 30-minute call with our experts to discuss your technology needs.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule on Calendly
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-surface border border-border-subtle rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{info.title}</h3>
                <p className="text-accent font-medium mb-1">{info.value}</p>
                <p className="text-text-muted text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-border-subtle rounded-2xl p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">Thank You!</h2>
                <p className="text-text-secondary mb-8">
                  Your message has been received. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", company: "", phone: "", service: "", message: "" });
                  }}
                  className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-2">Send Us a Message</h2>
                  <p className="text-text-muted">Fill out the form below and we&apos;ll get back to you shortly.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
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
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-text-secondary mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                        placeholder="Acme Inc."
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
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
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-text-secondary mb-2">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-text-secondary">Quick answers to common questions</p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "How quickly can you start on a new project?",
                answer: "We typically begin discovery and planning within 1-2 weeks of contract signing. For urgent needs, we can often accommodate faster timelines."
              },
              {
                question: "Do you offer free consultations?",
                answer: "Yes! We offer a free initial consultation to understand your needs and discuss how we can help. This helps us provide accurate estimates and recommendations."
              },
              {
                question: "What industries do you work with?",
                answer: "We work across various industries including healthcare, finance, retail, manufacturing, and technology. Our solutions are tailored to meet industry-specific requirements."
              },
              {
                question: "Do you provide ongoing support after project completion?",
                answer: "Absolutely. We offer various support and maintenance packages to ensure your solutions continue to perform optimally. Our 24/7 support team is always ready to help."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-background border border-border-subtle rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">{faq.question}</h3>
                <p className="text-text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/sf-logo.png" alt="Support Forge" width={28} height={28} className="rounded-lg" />
              <span className="font-bold text-accent">
                SupportForge
              </span>
            </Link>
            <div className="flex gap-6 text-text-muted">
              <Link href="/services" className="hover:text-text-primary transition-colors">Services</Link>
              <Link href="/about" className="hover:text-text-primary transition-colors">About</Link>
              <Link href="/contact" className="hover:text-text-primary transition-colors">Contact</Link>
            </div>
            <div className="text-text-muted">
              © {new Date().getFullYear()} SupportForge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
