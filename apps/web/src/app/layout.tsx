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
    default: "Support Forge - Strategic AI Consulting for Executives",
    template: "%s | Support Forge",
  },
  description: "Premium AI consultancy for C-Suite executives and SMB leaders. Turn AI investment into competitive advantage with strategic implementation that delivers measurable ROI.",
  keywords: [
    "AI strategy consulting",
    "executive AI consulting",
    "C-Suite AI strategy",
    "AI implementation ROI",
    "strategic AI consulting",
    "AI business transformation",
    "enterprise AI solutions",
    "AI readiness assessment",
    "mid-market AI consulting",
    "SMB AI strategy",
    "AI competitive advantage",
    "AI advisory services",
    "AI consulting Massachusetts",
    "executive technology consulting",
    "AI investment strategy",
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
    title: "Support Forge - Strategic AI Consulting for Executives",
    description: "Premium AI consultancy for C-Suite executives and SMB leaders. Turn AI investment into competitive advantage with strategic implementation that delivers measurable ROI.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Support Forge - Strategic AI Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Forge - Strategic AI Consulting for Executives",
    description: "Premium AI consultancy for C-Suite executives and SMB leaders. Strategic AI implementation that delivers measurable ROI.",
    images: ["/og-image.png"],
    creator: "@supportforge",
    site: "@supportforge",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },
  category: "technology",
  other: {
    "geo.region": "US-MA",
    "geo.placename": "Haverhill",
    "geo.position": "42.7762;-71.0773",
    "ICBM": "42.7762, -71.0773",
  },
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
