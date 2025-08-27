import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Page extensions for MDX support
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Image configuration
  images: {
    domains: ['localhost', 'sersergious.dev'],
  },

  // Temporarily disable linting during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Experimental features
  experimental: {
    // Enable optimizePackageImports for framer-motion
    optimizePackageImports: ['framer-motion'],
  },

  // Transpile framer-motion for better compatibility
  transpilePackages: ['framer-motion'],

  // Additional webpack config if needed
  webpack: config => {
    // Handle framer-motion import issues
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
    };
    return config;
  },
};

export default nextConfig;
