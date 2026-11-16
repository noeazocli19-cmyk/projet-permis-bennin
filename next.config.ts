import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel builds Next.js natively — no standalone output needed.
  // (Keep it simple; `output: "standalone"` is only useful for self-hosted Docker.)
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
