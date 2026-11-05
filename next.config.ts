import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Do not fail production builds on ESLint issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep typechecking on; set true only if types block deploy
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
