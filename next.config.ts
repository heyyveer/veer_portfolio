import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for @cloudflare/next-on-pages
  output: "export",
  images: {
    unoptimized: true, // Cloudflare Pages can't run next/image optimization server
  },
};

export default nextConfig;
