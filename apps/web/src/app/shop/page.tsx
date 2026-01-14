import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { CONTACT_INFO } from "@support-forge/shared";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";

// FAQ data for structured data schema
const shopFaqs = [
  {
    question: "What is n8n?",
    answer: "n8n is an open-source workflow automation platform. You can self-host it for free or use n8n Cloud. Our workflows are JSON files you import directly into n8n.",
  },
  {
    question: "Do I need technical skills?",
    answer: "Basic familiarity with n8n helps, but our workflows come with detailed setup instructions. You'll mainly need to add your API credentials (Gmail, OpenAI, etc.).",
  },
  {
    question: "What's included with purchase?",
    answer: "You receive the workflow JSON file, a setup guide with step-by-step instructions, and 30 days of email support for any questions.",
  },
  {
    question: "Can I modify the workflows?",
    answer: "Absolutely! Once purchased, the workflow is yours. Customize it however you like - change schedules, add nodes, integrate with your other tools.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee if the workflow doesn't meet your needs. Just reach out and we'll process your refund.",
  },
];


export const metadata: Metadata = {
  title: "Workflow Shop | Support Forge",
  description: "Ready-to-deploy automation workflows and custom workflow development services. LinkedIn automation, uptime monitoring, AWS cost reports, and more.",
  openGraph: {
    title: "Workflow Shop | Support Forge",
    description: "Ready-to-deploy automation workflows and custom workflow development services.",
  },
};

// Autonomous workflows - plug and play
const autonomousWorkflows = [
  {
    id: "linkedin-content",
    name: "LinkedIn Content Generator",
    price: 49,
    description: "Automated AI-powered LinkedIn posts with 7 rotating topics. Posts Monday, Wednesday, Friday at 9am.",
    features: [
      "GPT-4 generated content",
      "7 rotating AI/tech topics",
      "Auto-post or draft mode",
      "Google Sheets logging",
      "Email notifications",
      "Custom topic webhook",
    ],
    popular: true,
    stripeLink: "YOUR_STRIPE_LINK_LINKEDIN",
  },
  {
    id: "uptime-monitor",
    name: "Site Uptime Monitor",
    price: 29,
    description: "Monitor up to 10 websites every 5 minutes. Instant email alerts when sites go down.",
    features: [
      "5-minute health checks",
      "Instant email alerts",
      "Downtime logging to Sheets",
      "Status code tracking",
      "Response time monitoring",
      "Easy site configuration",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_UPTIME",
  },
  {
    id: "morning-briefing",
    name: "Morning Briefing",
    price: 39,
    description: "Daily digest with weather, calendar, GitHub activity, and AI-generated summary delivered to your inbox.",
    features: [
      "Local weather forecast",
      "Google Calendar events",
      "GitHub activity summary",
      "AI-personalized briefing",
      "Beautiful HTML emails",
      "Customizable schedule",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_MORNING",
  },
  {
    id: "aws-cost-reporter",
    name: "AWS Cost Reporter",
    price: 39,
    description: "Daily AWS spending reports with service breakdown and threshold alerts.",
    features: [
      "Daily cost summary",
      "Month-to-date totals",
      "Service-by-service breakdown",
      "Spending threshold alerts",
      "Top 5 services highlight",
      "Direct AWS Console links",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_AWS",
  },
  {
    id: "client-onboarding",
    name: "Client Onboarding",
    price: 49,
    description: "Automated new client setup: welcome emails, folder creation, task assignments, and CRM updates.",
    features: [
      "Welcome email sequence",
      "Google Drive folder setup",
      "Task auto-creation",
      "CRM record creation",
      "Slack notifications",
      "Customizable templates",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_ONBOARDING",
  },
  {
    id: "social-scheduler",
    name: "Social Media Scheduler",
    price: 59,
    description: "Schedule and auto-post content across LinkedIn, Twitter/X, and Facebook from a single spreadsheet.",
    features: [
      "Multi-platform posting",
      "Spreadsheet-based scheduling",
      "Image attachment support",
      "Post analytics tracking",
      "Draft review workflow",
      "Hashtag management",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_SOCIAL",
  },
  {
    id: "invoice-reminder",
    name: "Invoice Reminder System",
    price: 39,
    description: "Automatically remind clients about unpaid invoices. Escalating reminders at 7, 14, and 30 days overdue.",
    features: [
      "Automatic overdue detection",
      "Escalating reminder sequence",
      "Professional email templates",
      "Payment link inclusion",
      "Reminder history logging",
      "Skip weekends option",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_INVOICE",
  },
  {
    id: "lead-capture",
    name: "Lead Capture Pipeline",
    price: 49,
    description: "Form submissions automatically create CRM contacts, trigger email sequences, and notify your sales team.",
    features: [
      "Multi-form support",
      "CRM auto-creation",
      "Welcome email sequence",
      "Slack/Teams notifications",
      "Lead scoring tags",
      "Duplicate detection",
    ],
    popular: true,
    stripeLink: "YOUR_STRIPE_LINK_LEAD",
  },
  {
    id: "review-request",
    name: "Review Request Automation",
    price: 35,
    description: "Automatically request Google/Yelp reviews from happy customers after service completion.",
    features: [
      "Timed delay after service",
      "Multi-platform review links",
      "Satisfaction pre-check",
      "Follow-up sequences",
      "Response tracking",
      "Review count dashboard",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_REVIEW",
  },
  {
    id: "appointment-reminder",
    name: "Appointment Reminders",
    price: 29,
    description: "SMS and email reminders sent 24 hours and 1 hour before appointments. Reduce no-shows by 80%.",
    features: [
      "Email + SMS reminders",
      "24hr and 1hr alerts",
      "Calendar integration",
      "Confirmation requests",
      "Reschedule links",
      "No-show tracking",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_APPOINTMENT",
  },
  {
    id: "content-repurposer",
    name: "Content Repurposer",
    price: 59,
    description: "Turn one blog post into Twitter threads, LinkedIn posts, email newsletters, and Instagram captions.",
    features: [
      "AI-powered rewriting",
      "Platform-specific formatting",
      "Hashtag optimization",
      "Image prompt generation",
      "Scheduled publishing",
      "Performance tracking",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_REPURPOSE",
  },
  {
    id: "expense-tracker",
    name: "Expense Auto-Logger",
    price: 35,
    description: "Forward receipt emails to automatically log expenses in Google Sheets with AI-extracted details.",
    features: [
      "Email receipt parsing",
      "AI data extraction",
      "Category auto-tagging",
      "Monthly summaries",
      "Tax category mapping",
      "Attachment storage",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_EXPENSE",
  },
  {
    id: "competitor-monitor",
    name: "Competitor Price Monitor",
    price: 49,
    description: "Track competitor websites for price changes. Get instant alerts when competitors update pricing.",
    features: [
      "Daily price scraping",
      "Change detection alerts",
      "Historical price charts",
      "Multiple competitor tracking",
      "Category filtering",
      "Weekly digest reports",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_COMPETITOR",
  },
  {
    id: "backup-automation",
    name: "Cloud Backup Automation",
    price: 39,
    description: "Automated daily backups of Google Drive, Notion, or Airtable to S3 or another cloud provider.",
    features: [
      "Daily scheduled backups",
      "Multiple source support",
      "S3/GCS/Azure storage",
      "Retention policies",
      "Backup verification",
      "Failure alerts",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_BACKUP",
  },
  {
    id: "slack-daily-report",
    name: "Slack Daily Report",
    price: 29,
    description: "Aggregate team metrics (revenue, leads, support tickets) into a daily Slack digest with trends and alerts.",
    features: [
      "Daily metric compilation",
      "Multi-source data pulling",
      "Trend analysis",
      "Threshold-based alerts",
      "Customizable KPI dashboard",
      "Slack channel routing",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_SLACK_REPORT",
  },
  {
    id: "form-responses-crm",
    name: "Form Responses to CRM",
    price: 35,
    description: "Automatically sync form responses (Typeform, Google Forms, JotForm) to your CRM with smart field mapping.",
    features: [
      "Multi-form platform support",
      "Smart field mapping",
      "Duplicate detection",
      "Automatic contact creation",
      "Custom field population",
      "Error logging",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_FORM_CRM",
  },
  {
    id: "email-support-ticket",
    name: "Email to Support Ticket",
    price: 39,
    description: "Forward customer emails to automatically create support tickets with attachments, priority levels, and auto-responses.",
    features: [
      "Email parsing & extraction",
      "Automatic ticket creation",
      "Priority auto-assignment",
      "Attachment handling",
      "Auto-responder templates",
      "Slack notifications",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_EMAIL_TICKET",
  },
  {
    id: "multi-channel-inventory",
    name: "Multi-Channel Inventory Sync",
    price: 59,
    description: "Keep inventory in sync across Shopify, WooCommerce, and manual spreadsheets in real-time.",
    features: [
      "Real-time inventory sync",
      "Multi-platform support",
      "Stock level alerts",
      "Conflict resolution",
      "Low-stock notifications",
      "Historical tracking",
    ],
    popular: true,
    stripeLink: "YOUR_STRIPE_LINK_INVENTORY_SYNC",
  },
  {
    id: "auto-newsletter",
    name: "Auto Newsletter Generator",
    price: 49,
    description: "Automatically compile blog posts, news items, and metrics into a formatted weekly newsletter.",
    features: [
      "Blog post aggregation",
      "RSS feed parsing",
      "Metric compilation",
      "Email template generation",
      "HTML formatting",
      "Subscriber management",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_NEWSLETTER",
  },
  {
    id: "database-maintenance",
    name: "Database Maintenance Bot",
    price: 45,
    description: "Automated database cleanup, archiving old records, deduplication, and health checks with email reports.",
    features: [
      "Automatic archiving",
      "Duplicate detection & removal",
      "Orphaned record cleanup",
      "Database health checks",
      "Weekly maintenance reports",
      "Rollback capabilities",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_DATABASE_MAINTENANCE",
  },
  {
    id: "job-board-poster",
    name: "Job Board Auto-Poster",
    price: 59,
    description: "Automatically post job openings across multiple job boards (LinkedIn, Indeed, AngelList) from a single Google Sheet.",
    features: [
      "Multi-board posting",
      "Spreadsheet-based management",
      "Automatic expiration",
      "Application tracking",
      "Candidate notifications",
      "Analytics dashboard",
    ],
    popular: false,
    stripeLink: "YOUR_STRIPE_LINK_JOB_POSTER",
  },
];

// Custom workflow tiers
const customTiers = [
  {
    name: "Starter",
    price: 199,
    description: "Perfect for a single automation need",
    features: [
      "1 custom workflow",
      "Up to 3 integrations",
      "1 revision round",
      "Email support",
      "Documentation included",
    ],
    stripeLink: "YOUR_STRIPE_LINK_STARTER",
  },
  {
    name: "Professional",
    price: 499,
    description: "For businesses ready to automate multiple processes",
    features: [
      "Up to 3 custom workflows",
      "Unlimited integrations",
      "3 revision rounds",
      "30-day priority support",
      "Video walkthrough",
      "Maintenance guide",
    ],
    popular: true,
    stripeLink: "YOUR_STRIPE_LINK_PRO",
  },
  {
    name: "Enterprise",
    price: null,
    description: "Full-scale automation transformation",
    features: [
      "Unlimited workflows",
      "Dedicated workflow architect",
      "Ongoing maintenance",
      "24/7 priority support",
      "Custom integrations",
      "Training sessions",
    ],
    stripeLink: null,
  },
];

export default function ShopPage() {
  return (
    <>
      <FAQJsonLd questions={shopFaqs} />
      <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Ready-to-Deploy Automations
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Workflow <span className="text-accent">Shop</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Pre-built n8n automations you can deploy in minutes, or custom workflows built for your exact needs.
          </p>
        </div>
      </section>

      {/* Autonomous Workflows */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Autonomous <span className="text-accent">Workflows</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Plug-and-play automations. Import into n8n, configure your credentials, and you&apos;re live.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {autonomousWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className={`relative group p-6 rounded-2xl bg-background border transition-all hover:shadow-lg ${
                  workflow.popular
                    ? "border-accent shadow-lg shadow-accent/10"
                    : "border-border-subtle hover:border-accent hover:shadow-accent/5"
                }`}
              >
                {workflow.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{workflow.name}</h3>
                  <p className="text-text-secondary text-sm">{workflow.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">${workflow.price}</span>
                  <span className="text-text-secondary text-sm ml-1">one-time</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {workflow.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                {workflow.stripeLink && !workflow.stripeLink.startsWith("YOUR_") ? (
                  <a
                    href={workflow.stripeLink}
                    className={`block w-full py-3 rounded-lg font-medium text-center transition-all ${
                      workflow.popular
                        ? "bg-accent hover:bg-accent-hover text-white"
                        : "bg-surface border border-border-subtle hover:border-accent text-text-primary"
                    }`}
                  >
                    Buy Now
                  </a>
                ) : (
                  <span className="block w-full py-3 rounded-lg font-medium text-center bg-surface/50 border border-border-subtle text-text-muted cursor-not-allowed">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            How It <span className="text-accent">Works</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Purchase</h3>
              <p className="text-text-secondary text-sm">Complete checkout via Stripe</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-text-secondary text-sm">Receive workflow JSON file</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Import</h3>
              <p className="text-text-secondary text-sm">Import into your n8n instance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Configure</h3>
              <p className="text-text-secondary text-sm">Add your credentials & activate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Workflows */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Custom <span className="text-accent">Workflows</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Need something specific? We&apos;ll build automations tailored to your exact business processes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {customTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-8 rounded-2xl bg-background border transition-all ${
                  tier.popular
                    ? "border-accent shadow-lg shadow-accent/10 scale-105"
                    : "border-border-subtle"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
                    Recommended
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-text-secondary text-sm mb-4">{tier.description}</p>
                <div className="mb-6">
                  {tier.price ? (
                    <>
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-text-secondary text-sm ml-1">starting</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">Custom Quote</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {tier.stripeLink && !tier.stripeLink.startsWith("YOUR_") ? (
                  <a
                    href={tier.stripeLink}
                    className={`block w-full py-3 rounded-lg font-medium text-center transition-all ${
                      tier.popular
                        ? "bg-accent hover:bg-accent-hover text-white"
                        : "bg-surface border border-border-subtle hover:border-accent text-text-primary"
                    }`}
                  >
                    Get Started
                  </a>
                ) : tier.stripeLink?.startsWith("YOUR_") ? (
                  <span className="block w-full py-3 rounded-lg font-medium text-center bg-surface/50 border border-border-subtle text-text-muted cursor-not-allowed">
                    Coming Soon
                  </span>
                ) : (
                  <Link
                    href="/contact"
                    className="block w-full py-3 rounded-lg font-medium text-center bg-surface border border-border-subtle hover:border-accent text-text-primary transition-all"
                  >
                    Contact Us
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <h3 className="font-semibold mb-2">What is n8n?</h3>
              <p className="text-text-secondary text-sm">
                n8n is an open-source workflow automation platform. You can self-host it for free or use n8n Cloud. Our workflows are JSON files you import directly into n8n.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <h3 className="font-semibold mb-2">Do I need technical skills?</h3>
              <p className="text-text-secondary text-sm">
                Basic familiarity with n8n helps, but our workflows come with detailed setup instructions. You&apos;ll mainly need to add your API credentials (Gmail, OpenAI, etc.).
              </p>
            </div>
            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <h3 className="font-semibold mb-2">What&apos;s included with purchase?</h3>
              <p className="text-text-secondary text-sm">
                You receive the workflow JSON file, a setup guide with step-by-step instructions, and 30 days of email support for any questions.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <h3 className="font-semibold mb-2">Can I modify the workflows?</h3>
              <p className="text-text-secondary text-sm">
                Absolutely! Once purchased, the workflow is yours. Customize it however you like - change schedules, add nodes, integrate with your other tools.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-background border border-border-subtle">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-text-secondary text-sm">
                Yes, we offer a 14-day money-back guarantee if the workflow doesn&apos;t meet your needs. Just reach out and we&apos;ll process your refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Not Sure What You Need?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Book a free 15-minute call and we&apos;ll help you identify automation opportunities in your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all hover:scale-105"
          >
            Schedule a Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
}
