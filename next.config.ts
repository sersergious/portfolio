import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // /projects and /research merged into /work. 308s so existing links and
  // search results keep resolving.
  async redirects() {
    return [
      { source: '/projects', destination: '/work', permanent: true },
      {
        source: '/projects/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
      { source: '/research', destination: '/work', permanent: true },
      {
        source: '/research/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
