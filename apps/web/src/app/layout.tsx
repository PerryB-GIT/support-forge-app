import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://support-forge.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6366f1",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Support Forge - AI & IT Consulting Services",
    template: "%s | Support Forge",
  },
  description: "Transform your business with Support Forge's AI integration, custom software development, cloud solutions, and IT consulting services. 150+ projects delivered with 98% client satisfaction.",
  keywords: [
    "AI consulting",
    "IT consulting",
    "software development",
    "cloud solutions",
    "AI integration",
    "machine learning",
    "DevOps",
    "cybersecurity",
    "managed IT services",
    "digital transformation",
    "business automation",
    "custom software",
  ],
  authors: [{ name: "Support Forge" }],
  creator: "Support Forge",
  publisher: "Support Forge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Support Forge",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Support Forge",
    title: "Support Forge - AI & IT Consulting Services",
    description: "Transform your business with cutting-edge AI solutions and expert IT consulting. Custom software development, cloud solutions, and 24/7 support.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Support Forge - AI & IT Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Forge - AI & IT Consulting Services",
    description: "Transform your business with cutting-edge AI solutions and expert IT consulting. 150+ projects delivered with 98% client satisfaction.",
    images: ["/og-image.png"],
    creator: "@supportforge",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
