import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive AI & IT services: AI integration, custom software development, cloud solutions, DevOps, cybersecurity, and managed IT services. Transform your business with expert technology solutions.",
  keywords: [
    "AI integration services",
    "custom software development",
    "cloud migration",
    "DevOps consulting",
    "cybersecurity services",
    "managed IT services",
    "machine learning solutions",
    "AWS consulting",
    "Azure consulting",
    "IT strategy",
  ],
  openGraph: {
    title: "IT & AI Services - Support Forge",
    description: "Comprehensive technology solutions: AI integration, software development, cloud solutions, cybersecurity, and 24/7 managed IT services.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT & AI Services - Support Forge",
    description: "Comprehensive technology solutions: AI integration, software development, cloud solutions, cybersecurity, and managed IT services.",
  },
  alternates: {
    canonical: "/services",
  },
};

const ServiceIcon = ({ name }: { name: string }) => {
  const icons: Record<string, ReactNode> = {
    ai: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    code: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    cloud: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    strategy: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    security: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    managed: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };
  return (
    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
      {icons[name]}
    </div>
  );
};

export default function ServicesPage() {
  const services = [
    {
      id: "ai",
      icon: "ai",
      title: "AI Integration & Automation",
      description: "Transform your business with cutting-edge AI solutions. We implement machine learning models, natural language processing, and intelligent automation to streamline operations and drive innovation.",
      features: [
        "Custom AI/ML model development",
        "Chatbot and virtual assistant implementation",
        "Process automation with AI",
        "Predictive analytics and forecasting",
        "Computer vision solutions",
        "Natural language processing"
      ]
    },
    {
      id: "development",
      icon: "code",
      title: "Custom Software Development",
      description: "From concept to deployment, we build scalable, maintainable software tailored to your unique business requirements. Our full-stack expertise ensures seamless solutions across all platforms.",
      features: [
        "Web application development",
        "Mobile app development (iOS & Android)",
        "API design and integration",
        "Database architecture",
        "Legacy system modernization",
        "SaaS product development"
      ]
    },
    {
      id: "cloud",
      icon: "cloud",
      title: "Cloud Solutions & DevOps",
      description: "Leverage the power of cloud computing with our comprehensive cloud services. We help you migrate, optimize, and manage your infrastructure for maximum efficiency and scalability.",
      features: [
        "Cloud migration (AWS, Azure, GCP)",
        "Infrastructure as Code (Terraform, CloudFormation)",
        "CI/CD pipeline implementation",
        "Container orchestration (Docker, Kubernetes)",
        "Cloud cost optimization",
        "Serverless architecture"
      ]
    },
    {
      id: "consulting",
      icon: "strategy",
      title: "IT Consulting & Strategy",
      description: "Navigate the complex technology landscape with expert guidance. Our consultants help you make informed decisions, develop technology roadmaps, and align IT investments with business goals.",
      features: [
        "Technology assessment and audit",
        "Digital transformation strategy",
        "IT roadmap development",
        "Vendor selection and management",
        "Architecture review and design",
        "Technology due diligence"
      ]
    },
    {
      id: "security",
      icon: "security",
      title: "Cybersecurity Services",
      description: "Protect your business from evolving cyber threats with our comprehensive security solutions. We implement defense-in-depth strategies to safeguard your data and systems.",
      features: [
        "Security assessments and penetration testing",
        "Security architecture design",
        "Incident response planning",
        "Compliance consulting (SOC 2, HIPAA, GDPR)",
        "Security awareness training",
        "Vulnerability management"
      ]
    },
    {
      id: "support",
      icon: "managed",
      title: "Managed IT Services",
      description: "Focus on your core business while we handle your IT. Our managed services provide proactive monitoring, maintenance, and support to keep your systems running smoothly 24/7.",
      features: [
        "24/7 system monitoring",
        "Help desk and technical support",
        "Network management",
        "Backup and disaster recovery",
        "Software updates and patch management",
        "Performance optimization"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to accelerate your business growth.
            From AI integration to managed IT services, we have the expertise to transform your operations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="group bg-surface border border-border-subtle rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 scroll-mt-24"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <div className="mb-4"><ServiceIcon name={service.icon} /></div>
                    <h2 className="text-2xl font-bold text-text-primary mb-4">{service.title}</h2>
                    <p className="text-text-secondary text-lg leading-relaxed">{service.description}</p>
                  </div>
                  <div className="lg:w-1/2">
                    <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">Key Capabilities</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-text-secondary">
                          <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-accent/10 via-background to-accent/10 border-y border-border-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Let&apos;s discuss how our services can help you achieve your technology goals.
            Schedule a free consultation with our experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-border-subtle text-text-primary rounded-xl font-semibold text-lg hover:bg-surface transition-all"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
