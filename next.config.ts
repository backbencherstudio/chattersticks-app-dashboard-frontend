<<<<<<< HEAD
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.4.13",
        port: "8080",
        pathname: "/public/storage/**",
=======
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
>>>>>>> 0d68dfcfa314d961c90c86e8fca59766fcec8abb
      },
    ],
  },
};

module.exports = nextConfig;
