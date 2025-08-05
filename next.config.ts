import { withContentlayer } from 'next-contentlayer'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
}

export default withContentlayer(nextConfig)
