import { ImageResponse } from 'next/og';
import { OG_IMAGE_ALT, SITE_DOMAIN } from '@/lib/site';

// One card for the whole site, served at /opengraph-image. Pages point at it
// through `socialMetadata()` rather than relying on segment inheritance, which
// a page-level `openGraph` object overrides.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = OG_IMAGE_ALT;

const GRID = 48;
const INK = '#f8f8f2';
const PAPER = '#191e24';
const RULE = 'rgba(248, 248, 242, 0.08)';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: PAPER,
        color: INK,
        padding: 72,
        // The site's graph-paper backdrop, drawn with gradients so Satori
        // can render it without an image asset.
        backgroundImage: `linear-gradient(to right, ${RULE} 1px, transparent 1px), linear-gradient(to bottom, ${RULE} 1px, transparent 1px)`,
        backgroundSize: `${GRID}px ${GRID}px`,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 22,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: 'rgba(248, 248, 242, 0.6)',
        }}
      >
        {SITE_DOMAIN}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 92, fontWeight: 600 }}>
          Serhii Kuzmin
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 16,
            fontSize: 38,
            color: 'rgba(248, 248, 242, 0.72)',
          }}
        >
          Software engineer — backend, systems, low-level.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 28,
          fontSize: 24,
          color: 'rgba(248, 248, 242, 0.6)',
        }}
      >
        <span>C</span>
        <span>·</span>
        <span>Python</span>
        <span>·</span>
        <span>TypeScript</span>
        <span>·</span>
        <span>Quantum computing research</span>
      </div>
    </div>,
    size
  );
}
