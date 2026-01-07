import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ExcellenceIcon,
  IntegrityIcon,
  InnovationIcon,
  CollaborationIcon,
  ValueCard,
  MilestoneCard,
  CheckItem,
} from "@/components/about/AnimatedIcons";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Support Forge - a team of passionate technologists with 10+ years of experience delivering AI & IT consulting solutions. 150+ projects delivered with 98% client satisfaction.",
  keywords: ["about Support Forge", "IT consulting company", "AI consulting team", "technology experts", "digital transformation partner"],
  openGraph: {
    title: "About Support Forge - AI & IT Consulting Experts",
    description: "A team of passionate technologists dedicated to helping businesses harness the power of AI and modern technology. 10+ years experience, 150+ projects delivered.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Support Forge - AI & IT Consulting Experts",
    description: "A team of passionate technologists dedicated to helping businesses harness the power of AI and modern technology.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: <ExcellenceIcon />,
      title: "Excellence",
      description: "We pursue excellence in every project, setting high standards and continuously improving our craft."
    },
    {
      icon: <IntegrityIcon />,
      title: "Integrity",
      description: "We operate with transparency and honesty, building trust through ethical business practices."
    },
    {
      icon: <InnovationIcon />,
      title: "Innovation",
      description: "We embrace innovation, constantly exploring new technologies and methodologies to deliver better solutions."
    },
    {
      icon: <CollaborationIcon />,
      title: "Collaboration",
      description: "We work as partners with our clients, fostering open communication and shared success."
    }
  ];

  const milestones = [
    { stat: "150+", description: "Projects Delivered" },
    { stat: "98%", description: "Client Satisfaction" },
    { stat: "24/7", description: "Support Available" },
    { stat: "10+", description: "Years Experience" }
  ];

  const benefits = [
    { title: "Proven Track Record", description: "150+ successful projects delivered with a 98% client satisfaction rate." },
    { title: "Expert Team", description: "Certified professionals with deep expertise across multiple technology domains." },
    { title: "Tailored Solutions", description: "Every solution is customized to fit your specific business needs and goals." },
    { title: "Ongoing Support", description: "24/7 support and continuous optimization to ensure long-term success." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            About <span className="text-accent">SupportForge</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We are a team of passionate technologists dedicated to helping businesses harness
            the power of technology to achieve their goals and drive growth.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface border border-border-subtle rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6">Our Mission</h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  At SupportForge, we believe technology should empower businesses, not complicate them.
                  Our mission is to bridge the gap between complex technology solutions and real business value.
                </p>
                <p className="text-text-secondary text-lg leading-relaxed">
                  We combine deep technical expertise with a genuine understanding of business challenges
                  to deliver solutions that drive measurable results. Whether you&apos;re looking to integrate
                  AI into your operations, modernize legacy systems, or strengthen your security posture,
                  we&apos;re here to guide you every step of the way.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {milestones.map((milestone, index) => (
                  <MilestoneCard
                    key={index}
                    stat={milestone.stat}
                    description={milestone.description}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Passion Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-accent/10 via-background to-accent/10 border-y border-accent/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Why We <span className="text-accent">Love</span> What We Do
            </h2>
          </div>
          <div className="space-y-6 text-lg text-text-secondary">
            <p>
              Here&apos;s the truth: we&apos;re obsessed with AI. Not in a &quot;let&apos;s chase the latest trend&quot; way, but in a &quot;we genuinely can&apos;t stop thinking about how this changes everything&quot; way.
            </p>
            <p>
              We&apos;ve seen too many businesses buy into the hype — downloading every new tool, sitting through endless webinars — only to end up more confused than when they started. That frustrates us, because we know what&apos;s actually possible.
            </p>
            <p className="text-text-primary font-medium">
              The moment a business owner sees their operation running smarter — when they realize AI isn&apos;t just a buzzword but something that&apos;s genuinely giving them their time back — that&apos;s why we do this.
            </p>
            <p>
              We don&apos;t just implement technology. We translate it. We make it make sense. And we stick around to make sure it keeps working.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/ai-transformation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-accent/25 group"
            >
              See Our AI Approach
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Our Values</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              These core values guide everything we do and define how we work with our clients and each other.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-accent/10 via-background to-accent/10 border border-border-subtle rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Why Choose SupportForge?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <CheckItem
                  title={benefits[0].title}
                  description={benefits[0].description}
                  delay={0.2}
                />
                <CheckItem
                  title={benefits[1].title}
                  description={benefits[1].description}
                  delay={0.4}
                />
              </div>
              <div className="space-y-6">
                <CheckItem
                  title={benefits[2].title}
                  description={benefits[2].description}
                  delay={0.6}
                />
                <CheckItem
                  title={benefits[3].title}
                  description={benefits[3].description}
                  delay={0.8}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Let&apos;s discuss how we can help transform your business with technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border border-border-subtle text-text-primary rounded-xl font-semibold text-lg hover:bg-surface hover:border-accent/50 transition-all"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
