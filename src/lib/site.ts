/**
 * Canonical origin. Used by `metadataBase`, the sitemap, and robots.txt, so
 * they can't drift apart. Override with NEXT_PUBLIC_SITE_URL for a preview
 * deployment that should advertise its own URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://skuzmin.dev'
).replace(/\/$/, '');

/** Bare host, for display. Derived so it can't drift from `SITE_URL`. */
export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, '');

export const SITE_NAME = 'Serhii Kuzmin';

export const OG_IMAGE_ALT = 'Serhii Kuzmin — backend and systems engineer';

/**
 * Shared social metadata. Two Next behaviours make this worth centralising,
 * both confirmed against the built HTML rather than assumed:
 *
 * 1. A page that defines `openGraph` replaces the parent's entirely, which
 *    drops the `opengraph-image.tsx` card. So the image is named explicitly
 *    here — `metadataBase` resolves it to an absolute URL.
 * 2. `twitter:*` tags cannot be suppressed while Open Graph is emitted.
 *    `postProcessMetadata` in next/dist/lib/metadata/resolve-metadata.js
 *    back-fills twitter from openGraph and overwrites `twitter: null`, so
 *    there is no opt-out. The emitted tags mirror the OG ones — harmless, but
 *    don't spend time trying to remove them again.
 */
export function socialMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  authors,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
}) {
  return {
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: 'en_US',
      title,
      description,
      url: path,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
      ...(type === 'article' ? { publishedTime, authors, tags } : {}),
    },
  };
}
