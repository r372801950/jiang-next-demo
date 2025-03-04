import type { NextConfig } from "next";
module.exports = {
  webpack: (config: NextConfig) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};