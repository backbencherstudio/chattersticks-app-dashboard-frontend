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
      },
    ],
  },
};

module.exports = nextConfig;
