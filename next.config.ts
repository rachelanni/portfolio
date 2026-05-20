import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  allowedDevOrigins: [
    "http://localhost:3001/*",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://187.124.68.21:*/*",
    "http://187.124.68.21:3000/studio/*",
    "http://187.124.68.21:3001/studio/*",
    "https://studio.jiriki.tech*",
  ],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
