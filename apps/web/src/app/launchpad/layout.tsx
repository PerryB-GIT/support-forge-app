import { Metadata } from "next";
import { CourseJsonLd } from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://support-forge.com";

export const metadata: Metadata = {
  title: "AI Launchpad Academy",
  description:
    "Learn AI, automation, and modern IT skills with hands-on courses. The AI Launchpad Academy by Support Forge helps you master cutting-edge technology.",
  keywords: [
    "AI courses",
    "automation training",
    "AI academy",
    "learn AI",
    "IT training",
    "tech education",
    "AI certification",
    "automation courses",
  ],
  openGraph: {
    title: "AI Launchpad Academy - Support Forge",
    description:
      "Learn AI, automation, and modern IT skills with hands-on courses from Support Forge.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Launchpad Academy - Support Forge",
    description:
      "Learn AI, automation, and modern IT skills with hands-on courses from Support Forge.",
  },
  alternates: {
    canonical: "/launchpad",
  },
};

export default function LaunchpadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CourseJsonLd
        name="AI Launchpad Academy"
        description="Master AI implementation with the LAUNCH Method. Learn to build AI systems that transform how you work with hands-on training in Claude Code, MCP servers, automation tools, and cloud deployment."
        provider={{
          name: "Support Forge",
          url: siteUrl,
        }}
        url={`${siteUrl}/launchpad`}
        courseMode="online"
        educationalLevel="Beginner to Advanced"
        offers={[
          {
            name: "AI Academy Self-Paced",
            price: 997,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            name: "AI Academy + Live Tutoring",
            price: 1500,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            name: "AI Launchpad Pro (Done-With-You)",
            price: 5000,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        ]}
        hasCourseInstance={[
          {
            name: "Self-Paced Online Course",
            courseMode: "online",
            courseWorkload: "PT12H",
          },
          {
            name: "Live Tutoring Sessions",
            courseMode: "online",
            courseWorkload: "PT4H",
          },
        ]}
        about={[
          "Artificial Intelligence",
          "AI Integration",
          "Business Automation",
          "Claude Code",
          "MCP Servers",
          "Prompt Engineering",
          "Workflow Automation",
          "Cloud Computing",
        ]}
      />
      {children}
    </>
  );
}
