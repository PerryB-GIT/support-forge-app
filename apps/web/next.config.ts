import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Required for Docker deployments
  transpilePackages: ["@support-forge/shared", "@support-forge/database"],
};

export default nextConfig;
