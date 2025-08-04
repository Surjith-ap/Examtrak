/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable middleware support
  // Static export is incompatible with Clerk authentication middleware
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
