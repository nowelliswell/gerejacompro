/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  transpilePackages: ['recharts'],
}

module.exports = nextConfig
