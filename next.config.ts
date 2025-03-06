/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // 启用按需加载
    optimizePackageImports: ['ethers', 'wagmi', 'viem'],
  },
  // 其他配置...
}

module.exports = nextConfig