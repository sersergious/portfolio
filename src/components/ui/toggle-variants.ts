import { cn } from '@/lib/utils';

/**
 * The two daisyUI layout behaviours that came with `join` and `swap`, as
 * plain class strings.
 *
 * Kept out of `toggle.tsx` because that module is `'use client'` and
 * /kitchen-sink is a Server Component that needs only the strings — importing
 * them from the client module would drag a client boundary onto a static page.
 */

/**
 * daisyUI's `join-item`. The group squares the inner corners by handing each
 * child `--join-ss/se/ee/es`: the first keeps its left radius, the last keeps
 * its right, the middle goes square. The -1px inline start margin collapses
 * neighbouring borders into one hairline, and the focus z-index keeps a focused
 * item's ring from being clipped by the next item.
 *
 * `rounded-none` must come after the button's `rounded-lg` for tailwind-merge
 * to drop it; the `first:`/`last:` variants survive because they are a
 * different variant group.
 */
export const joinItem =
  'rounded-none first:rounded-l-lg last:rounded-r-lg -ml-px first:ml-0 focus:z-1';

/**
 * daisyUI's `swap swap-rotate`. The two icons are stacked in one grid cell and
 * cross-fade with a quarter turn: the incoming one settles from 45deg to 0,
 * the outgoing one leaves to -45deg.
 *
 * Tailwind v4's `rotate-*` compiles to the `rotate` property, not a `transform`
 * function, which is what daisyUI used — so these match on the computed value
 * and not merely on appearance.
 *
 * The transition sits behind `motion-safe:` because daisyUI guarded it with
 * `prefers-reduced-motion: no-preference`.
 */
export const swapShell = 'relative inline-grid place-content-center';

const swapIconBase = [
  'col-start-1 row-start-1',
  'motion-safe:transition-[transform,rotate,opacity]',
  'motion-safe:duration-200 motion-safe:ease-out',
].join(' ');

/** Shown when the toggle is pressed. */
export const swapOn = cn(
  swapIconBase,
  'rotate-45 opacity-0',
  'group-data-pressed:rotate-0 group-data-pressed:opacity-100'
);

/** Shown when it is not. */
export const swapOff = cn(
  swapIconBase,
  'rotate-0 opacity-100',
  'group-data-pressed:-rotate-45 group-data-pressed:opacity-0'
);
