import { cva } from 'class-variance-authority';

/**
 * Port of daisyUI's `link` utilities. A cva function, not a component:
 * daisyUI's `link` is a class you put on an anchor, and the call sites are a
 * mix of `<a>`, `next/link`, and markdown-rendered anchors. A wrapper
 * component would be a new abstraction with three shapes and no behaviour.
 *
 * `underline: 'hover'` is the default because that is what nine of the ten
 * call sites use.
 *
 * The hover tint is daisyUI's own `color-mix(… 80%, #000)` rather than a baked
 * literal, so it keeps tracking `--primary` across both themes — the light and
 * dark primaries are separately solved values.
 */
export const linkVariants = cva(
  [
    'cursor-pointer',
    // daisyUI suppresses the ring on plain :focus and draws it only for
    // :focus-visible, so a mouse click never leaves an outline behind.
    'focus:outline-hidden',
    // `outline-current` is load-bearing. daisyUI writes `outline: 2px solid`,
    // and the shorthand resets outline-color to its initial `currentcolor`.
    // Tailwind's outline-2/outline-solid set only width and style, so Chrome's
    // -webkit-focus-ring-color survives and the ring comes out blue instead of
    // ink. currentColor also follows link-primary's hover tint for free.
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
          'hover:text-[color-mix(in_oklab,var(--primary-value)_80%,#000)]',
        ],
      },
    },
    defaultVariants: { underline: 'hover', tone: 'default' },
  }
);
