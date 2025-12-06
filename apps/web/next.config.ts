import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@support-forge/shared", "@support-forge/database"],
};

export default nextConfig;
