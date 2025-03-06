import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  output: 'export',  // 用于静态导出，兼容 Cloudflare Pages
  images: {
    unoptimized: true,  // 静态导出时需要
  },
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 500000, // 减小到 500KB，进一步强制分割
      minSize: 100000, // 最小 100KB，避免生成过小文件
      cacheGroups: {
        default: false, // 禁用默认分组
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 单独打包 node_modules 的依赖
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
    return config;
  },
  // 可以根据需要选择性地启用按需加载
  // experimental: {
  //   optimizePackageImports: ['ethers', 'wagmi', 'viem'],
  // },
};

export default nextConfig;