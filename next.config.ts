import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4010',
        pathname: '/public/storage/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.7.14',
        port: '4010',
        pathname: '/public/storage/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
