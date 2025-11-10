/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.7.14',
        port: '4040',
        pathname: '/public/storage/**',
      },
    ],
  },
};

module.exports = nextConfig;
