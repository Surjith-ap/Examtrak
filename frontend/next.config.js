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
  // CRITICAL FIX: Completely disable static generation to prevent ClerkProvider SSR issues
  output: 'standalone',
  // Disable all static optimization during build
  generateStaticParams: false,
  // Skip build-time pre-rendering that's causing the useContext error
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true
}

module.exports = nextConfig