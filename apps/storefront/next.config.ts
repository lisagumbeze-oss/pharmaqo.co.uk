import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.pharmaqo.co.uk',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/store/:path*',
        destination: `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'}/store/:path*`,
      },
    ]
  },
}

export default nextConfig
