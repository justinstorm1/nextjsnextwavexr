import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'helpful-wildcat-9.convex.cloud', // Your specific Convex domain
        port: '',
        pathname: '/api/storage/**',
      }
    ]
  }
};

export default nextConfig;
