import { cva } from 'class-variance-authority';

/**
 * A cva function, not a component: the call sites are a mix of `<a>`,
 * `next/link`, and markdown-rendered anchors.
 *
 * The primary hover tint is a `color-mix()` rather than a baked literal, so it
 * keeps tracking `--primary` across both themes.
 */
export const linkVariants = cva(
  [
    'cursor-pointer',
    // Ring only on :focus-visible, so a mouse click never leaves an outline.
    'focus:outline-hidden',
    // `outline-current` is load-bearing. Tailwind's outline-2/outline-solid
    // set only width and style, so without it Chrome's -webkit-focus-ring-color
    // survives and the ring comes out blue instead of ink.
    'outline-current',
    'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2',
  ],
  {
    variants: {
      underline: {
        always: 'underline',
        hover: 'no-underline hover:underline',
      },
      tone: {
        default: '',
        primary: [
          'text-primary',
          'hover:text-[color-mix(in_oklab,var(--primary-value),var(--foreground)_22%)]',
        ],
      },
    },
    defaultVariants: { underline: 'hover', tone: 'default' },
  }
);
