import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SITE_NAME, SITE_URL, socialMetadata } from '@/lib/site';
import '@/styles/globals.css';

/*
 * The mono face is the drafting concept's voice — section labels, credentials,
 * the facts rows, dates, code. Left to `ui-monospace` it resolved to SF Mono,
 * Consolas or Liberation Mono depending on the visitor's OS, so the one device
 * that carries the design looked like three different sites.
 *
 * Local rather than next/font/google on purpose: the build must not need the
 * network. Latin subset, one weight — no mono call site sets a weight — 20.7KB.
 */
const jetbrainsMono = localFont({
  src: '../fonts/jetbrains-mono-latin-400.woff2',
  variable: '--font-jetbrains-mono',
  weight: '400',
  style: 'normal',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

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
    { media: '(prefers-color-scheme: light)', color: '#f8fafd' },
    { media: '(prefers-color-scheme: dark)', color: '#1c232a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
