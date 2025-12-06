import Link from "next/link";

export default function AboutPage() {
  const team = [
    {
      name: "Technology Excellence",
      role: "Our Foundation",
      description: "Built on a foundation of deep technical expertise, we stay at the forefront of emerging technologies to deliver innovative solutions."
    },
    {
      name: "Client Partnership",
      role: "Our Approach",
      description: "We believe in true partnership with our clients, working collaboratively to understand your unique challenges and goals."
    },
    {
      name: "Results Driven",
      role: "Our Commitment",
      description: "Every solution we deliver is measured by the tangible impact it creates for your business success."
    }
  ];

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
    { year: "Founded", stat: "2014", description: "Started with a vision to transform IT consulting" },
    { year: "Projects", stat: "150+", description: "Successfully delivered across industries" },
    { year: "Satisfaction", stat: "98%", description: "Client satisfaction rate maintained" },
    { year: "Support", stat: "24/7", description: "Round-the-clock assistance available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Support Forge
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-slate-300 hover:text-white transition-colors">Services</Link>
            <Link href="/about" className="text-cyan-400 font-medium">About</Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              Client Portal
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Support Forge</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We are a team of passionate technologists dedicated to helping businesses harness
            the power of technology to achieve their goals and drive growth.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  At Support Forge, we believe technology should empower businesses, not complicate them.
                  Our mission is to bridge the gap between complex technology solutions and real business value.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  We combine deep technical expertise with a genuine understanding of business challenges
                  to deliver solutions that drive measurable results. Whether you're looking to integrate
                  AI into your operations, modernize legacy systems, or strengthen your security posture,
                  we're here to guide you every step of the way.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                      {milestone.stat}
                    </div>
                    <div className="text-sm text-slate-400">{milestone.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Approach</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              We take a holistic approach to technology consulting, focusing on understanding
              your business first and technology second.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="text-cyan-400 font-semibold uppercase tracking-wider text-sm mb-2">
                  {item.role}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.name}</h3>
                <p className="text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              These core values guide everything we do and define how we work with our clients and each other.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-slate-700/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Support Forge?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Proven Track Record</h4>
                    <p className="text-slate-400">150+ successful projects delivered with a 98% client satisfaction rate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Expert Team</h4>
                    <p className="text-slate-400">Certified professionals with deep expertise across multiple technology domains.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Tailored Solutions</h4>
                    <p className="text-slate-400">Every solution is customized to fit your specific business needs and goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Ongoing Support</h4>
                    <p className="text-slate-400">24/7 support and continuous optimization to ensure long-term success.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss how we can help transform your business with technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border border-slate-600 text-white rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Support Forge
            </div>
            <div className="flex gap-6 text-slate-400">
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="text-slate-500">
              © 2024 Support Forge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
