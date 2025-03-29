import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Add .mjs to the list of extensions so that webpack can resolve modules with .mjs extension.
    config.resolve.extensions.push(".mjs");
    return config;
  },
  // ... any additional Next.js configuration options
};

export default nextConfig;
