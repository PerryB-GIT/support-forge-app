import type { Metadata } from "next";
import { FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Support Forge for AI & IT consulting services. Schedule a free consultation, request a quote, or discuss your technology needs. We respond within 24 hours.",
  keywords: [
    "contact Support Forge",
    "IT consulting inquiry",
    "free consultation",
    "technology services quote",
    "AI consulting contact",
    "schedule consultation",
  ],
  openGraph: {
    title: "Contact Support Forge - AI & IT Consulting",
    description: "Ready to transform your business? Contact us for a free consultation. We'll discuss your technology needs and provide tailored solutions.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Support Forge - AI & IT Consulting",
    description: "Ready to transform your business? Contact us for a free consultation. We respond within 24 hours.",
  },
  alternates: {
    canonical: "/contact",
  },
};

const faqs = [
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
];

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQJsonLd questions={faqs} />
      {children}
    </>
  );
}
