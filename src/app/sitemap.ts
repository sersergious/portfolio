import type { MetadataRoute } from 'next';
import { getAllWork } from '@/lib/sanity-content';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getAllWork();

  // The newest item's date is the best available signal for when /work changed.
  const newest = items[0]?.date;

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly' },
    {
      url: `${SITE_URL}/work`,
      lastModified: newest ? new Date(newest) : new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
    },
    ...items.map(item => ({
      url: `${SITE_URL}${item.url}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'yearly' as const,
    })),
  ];
}
