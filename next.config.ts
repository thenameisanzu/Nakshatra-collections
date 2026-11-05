import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Standard Next.js ISR & on-demand rendering enabled:
  // Allows new Shopify products & collections added by the client to be served
  // instantly on-demand without requiring any manual redeploys.
  images: {
    unoptimized: true, // Direct ultra-fast loading from Shopify CDN (cdn.shopify.com)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
