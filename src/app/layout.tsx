import type { Metadata, Viewport } from 'next';
import { SITE_NAME, SITE_URL, socialMetadata } from '@/lib/site';
import '@/styles/globals.css';

const description =
  'Backend and systems engineer — C behind an FFI boundary, Python and TypeScript services above it, and research in quantum computing.';

export const metadata: Metadata = {
  // Makes the relative URLs below, and the generated OG image, absolute.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Portfolio`,
    template: `%s — ${SITE_NAME}`,
  },
  description,
  ...socialMetadata({
    title: `${SITE_NAME} — Portfolio`,
    description,
    path: '/',
  }),
};

/** Browser chrome matches `background` in each theme, so the page has no seam. */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1d232a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
