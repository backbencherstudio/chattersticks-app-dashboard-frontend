const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.7.14",
        port: "4040",
        pathname: "/public/storage/**",
      },
      {
        protocol: "http",
        hostname: "192.168.4.13",
        port: "8080",
        pathname: "/public/storage/**",
      },
      {
        protocol: "http",
        hostname: "lloyd-texts-mix-lined.trycloudflare.com",
        pathname: "/public/storage/**",
      },
      {
        protocol: "http",
        hostname: "31.97.214.154",
        port: "4000",
        pathname: "/public/storage/**",
      },
      {
        protocol: "https",
        hostname: "explain-rod-corps-chapel.trycloudflare.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
