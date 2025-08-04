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
    serverComponentsExternalPackages: ['@clerk/nextjs'],
    // THIS LINE FIXES THE ISSUE
    esmExternals: 'loose'
  },
  // CRITICAL FIX: Disable static export since Clerk needs SSR
  output: undefined
}

module.exports = nextConfig