import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pawon.urbanstories.id",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/index",
        destination: "/archive",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;