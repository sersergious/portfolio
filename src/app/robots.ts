import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    // /studio is the CMS — login-gated and nothing a crawler should index.
    rules: { userAgent: '*', allow: '/', disallow: '/studio/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
