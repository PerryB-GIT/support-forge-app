import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We pursue excellence in every project, setting high standards and continuously improving our craft."
    },
    {
      icon: "🤝",
      title: "Integrity",
      description: "We operate with transparency and honesty, building trust through ethical business practices."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We embrace innovation, constantly exploring new technologies and methodologies to deliver better solutions."
    },
    {
      icon: "👥",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border-subtle backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-accent">
              SupportForge
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">Services</Link>
            <Link href="/about" className="text-accent font-medium">About</Link>
            <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors">Contact</Link>
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
                  <div key={index} className="bg-background border border-border-subtle rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-accent mb-2">
                      {milestone.stat}
                    </div>
                    <div className="text-sm text-text-muted">{milestone.description}</div>
                  </div>
                ))}
              </div>
            </div>
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
              <div
                key={index}
                className="bg-background border border-border-subtle rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{value.title}</h3>
                <p className="text-text-muted text-sm">{value.description}</p>
              </div>
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
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Proven Track Record</h4>
                    <p className="text-text-muted">150+ successful projects delivered with a 98% client satisfaction rate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Expert Team</h4>
                    <p className="text-text-muted">Certified professionals with deep expertise across multiple technology domains.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Tailored Solutions</h4>
                    <p className="text-text-muted">Every solution is customized to fit your specific business needs and goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Ongoing Support</h4>
                    <p className="text-text-muted">24/7 support and continuous optimization to ensure long-term success.</p>
                  </div>
                </div>
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
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent/25"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border border-border-subtle text-text-primary rounded-xl font-semibold text-lg hover:bg-surface transition-all"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
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
