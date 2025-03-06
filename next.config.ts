/** @type {import('next').NextConfig} */
const nextConfig2 = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 这个会影响路径解析
  basePath: '',
  // 不使用尾部斜杠
  trailingSlash: false,
}

module.exports = nextConfig2