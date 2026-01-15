import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Required for Docker deployments
  transpilePackages: ["@support-forge/shared", "@support-forge/database"],
  async redirects() {
    return [
      // Legacy DIY pages redirect to appropriate new pages
      {
        source: "/academy",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/academy/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/launchpad",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/launchpad/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/ai-transformation",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/shop/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/student",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/student/:path*",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/tools",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/tools/:path*",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
