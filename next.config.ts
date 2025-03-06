/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // 启用按需加载
    optimizePackageImports: ['ethers', 'wagmi', 'viem'],
  },
  // 添加这一行，使用 Cloudflare Pages 兼容的输出模式
  output: 'export',
  // 如果您使用了图片优化，需要禁用它
  images: {
    unoptimized: true,
  },
  // 确保关闭严格模式以兼容 Cloudflare
  trailingSlash: false,
}

module.exports = nextConfig