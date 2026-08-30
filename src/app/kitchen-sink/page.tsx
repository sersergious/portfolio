import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sun, Moon, Mail } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { linkVariants } from '@/components/ui/link-variants';

/**
 * Specimen sheet for the daisyUI → Base UI migration.
 *
 * Full-page screenshots of the real site catch layout, but never catch `:hover`,
 * `:focus-visible`, or `:active` — which is exactly what swapping a component
 * library breaks. This page renders one instance of every styled surface the
 * site uses; `scripts/ab.sh` drives the states for real (hover, focus, mouse
 * down) and diffs the two builds cell by cell.
 *
 * Two rules keep it useful:
 *
 *   1. Every specimen sits in a `Spec` frame with a stable `data-testid`. The
 *      frame is what gets screenshotted, so it must not move between stages.
 *   2. Nothing here may be non-deterministic — no dates, no random ids, no
 *      content read from disk. A diff must only ever mean a style changed.
 *
 * Gated on NEXT_PUBLIC_E2E so it exists in test builds and 404s in production.
 */

export const metadata: Metadata = {
  title: 'Kitchen sink',
  robots: { index: false, follow: false },
};

export default function KitchenSinkPage() {
  if (!process.env.NEXT_PUBLIC_E2E) notFound();

  return (
    <main className="min-h-screen bg-background p-10 text-foreground">
      <h1 className="mb-10 font-mono text-xs tracking-[0.18em] uppercase">
        Kitchen sink
      </h1>

      <Group label="Button">
        <Spec id="btn-default">
          <button type="button" className={buttonVariants()}>
            Button
          </button>
        </Spec>
        <Spec id="btn-primary">
          <button
            type="button"
            className={buttonVariants({ variant: 'primary' })}
          >
            <Mail className="h-4 w-4" />
            Button
          </button>
        </Spec>
        <Spec id="btn-ghost">
          <button
            type="button"
            className={buttonVariants({ variant: 'ghost' })}
          >
            Button
          </button>
        </Spec>
        <Spec id="btn-square">
          <button
            type="button"
            aria-label="Square"
            className={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
          >
            <Sun className="h-4 w-4" />
          </button>
        </Spec>
        <Spec id="btn-disabled">
          <button
            type="button"
            disabled
            className={buttonVariants({ variant: 'primary' })}
          >
            Button
          </button>
        </Spec>
        <Spec id="btn-anchor">
          <a href="#anchor" className={buttonVariants()}>
            Anchor
          </a>
        </Spec>
      </Group>

      <Group label="Badge">
        <Spec id="badge-ghost">
          <Badge>Completed</Badge>
        </Spec>
        <Spec id="badge-soft">
          <Badge variant="soft">Topic</Badge>
        </Spec>
      </Group>

      <Group label="Link">
        <Spec id="link-plain">
          <a href="#anchor" className={linkVariants({ underline: 'always' })}>
            Underlined link
          </a>
        </Spec>
        <Spec id="link-hover">
          <a href="#anchor" className={linkVariants()}>
            Hover link
          </a>
        </Spec>
        <Spec id="link-primary">
          <a href="#anchor" className={linkVariants({ tone: 'primary' })}>
            Primary link
          </a>
        </Spec>
      </Group>

      {/* The /work filter. Segmented control, not tabs — see WorkList. */}
      <Group label="Toggle group">
        <Spec id="togglegroup">
          <div role="group" aria-label="Filter" className="join">
            <button
              type="button"
              aria-pressed
              className="btn join-item btn-sm gap-2"
            >
              All
              <Badge>3</Badge>
            </button>
            <button
              type="button"
              aria-pressed={false}
              className="btn join-item btn-sm btn-ghost gap-2"
            >
              Projects
              <Badge>2</Badge>
            </button>
            <button
              type="button"
              aria-pressed={false}
              className="btn join-item btn-sm btn-ghost gap-2"
            >
              Research
              <Badge>1</Badge>
            </button>
          </div>
        </Spec>
      </Group>

      {/* ThemeToggle's two states, rendered side by side rather than toggled —
          the real control depends on next-themes having mounted. */}
      <Group label="Theme toggle">
        <Spec id="toggle-off">
          <button
            type="button"
            aria-label="Switch to dark theme"
            className="btn btn-ghost btn-sm btn-square swap swap-rotate"
          >
            <Moon className="swap-on h-4 w-4" />
            <Sun className="swap-off h-4 w-4" />
          </button>
        </Spec>
        <Spec id="toggle-on">
          <button
            type="button"
            aria-label="Switch to light theme"
            className="btn btn-ghost btn-sm btn-square swap swap-rotate swap-active"
          >
            <Moon className="swap-on h-4 w-4" />
            <Sun className="swap-off h-4 w-4" />
          </button>
        </Spec>
        <Spec id="toggle-placeholder">
          <div className="btn btn-ghost btn-sm btn-square pointer-events-none" />
        </Spec>
      </Group>

      <Group label="Misc">
        <Spec id="status">
          <span aria-hidden className="status status-success" />
        </Spec>
        <Spec id="radius-box">
          <div className="h-8 w-16 rounded-lg border border-foreground/15 bg-muted" />
        </Spec>
        <Spec id="radius-field">
          <div className="h-8 w-16 rounded-lg border border-foreground/15 bg-muted" />
        </Spec>
        <Spec id="rule">
          <span className="block h-px w-16 bg-foreground/15" />
        </Spec>
      </Group>
    </main>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-mono text-xs tracking-[0.18em] text-foreground/70 uppercase">
        {label}
      </h2>
      <div className="flex flex-wrap items-start gap-6">{children}</div>
    </section>
  );
}

/**
 * The screenshot unit. Fixed box so a specimen that changes size fails loudly
 * on its own cell instead of reflowing every cell after it.
 */
function Spec({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div
      data-testid={id}
      className="flex h-16 w-52 items-center justify-center p-3"
    >
      {children}
    </div>
  );
}
