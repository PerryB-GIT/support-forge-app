import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://support-forge.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/projects/",
          "/appointments/",
          "/billing/",
          "/documents/",
          "/chat/",
          "/support/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
