import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: "🤖",
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
      icon: "💻",
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
      icon: "☁️",
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
      icon: "🎯",
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
      icon: "🔒",
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
      icon: "🛠️",
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Support Forge
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-cyan-400 font-medium">Services</Link>
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
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
            Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to accelerate your business growth.
            From AI integration to managed IT services, we have the expertise to transform your operations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">{service.description}</p>
                  </div>
                  <div className="lg:w-1/2">
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">Key Capabilities</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-slate-300">
                          <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-y border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss how our services can help you achieve your technology goals.
            Schedule a free consultation with our experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-slate-600 text-white rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all"
            >
              Learn More About Us
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
