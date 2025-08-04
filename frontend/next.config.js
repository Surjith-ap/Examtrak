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
  // FINAL APPROACH: Force export mode to bypass static generation
  output: 'export',
  distDir: 'out',
  // Disable all server-side features that cause ClerkProvider issues
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './imageLoader.js'
  }
}

module.exports = nextConfig