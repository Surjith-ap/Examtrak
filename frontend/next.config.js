/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@clerk/nextjs']
  },
  // Try a different approach - disable problematic optimizations
  swcMinify: false,
  // Disable static generation that's causing issues
  staticPageGenerationTimeout: 0
}

module.exports = nextConfig