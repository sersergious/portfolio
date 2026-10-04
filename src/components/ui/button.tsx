import { cva } from 'class-variance-authority';

/**
 * Hover and active mix toward `--foreground`, not toward black: light darkens,
 * dark lightens, and contrast always increases — one expression for both
 * themes, no `dark:` variant. Mixing black dropped the dark primary from 5.55:1
 * to 4.84:1 on hover.
 *
 * Font size is an arbitrary value on purpose: `text-xs` would also pin
 * line-height to 16px, and the design leaves it at `normal` (18px here).
 */
const buttonVariants = cva(
  [
    // `align-middle` is not decoration: an inline-flex
    // button sitting in an inline formatting context otherwise drops to the
    // text baseline and shifts a couple of pixels.
    'inline-flex shrink-0 cursor-pointer items-center justify-center align-middle gap-1.5',
    'rounded-lg border text-[0.75rem] font-semibold select-none touch-manipulation',
    'transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out',
    'outline-offset-2 focus-visible:outline-2 focus-visible:outline-solid',
    'disabled:pointer-events-none disabled:border-transparent',
    'disabled:bg-foreground/10 disabled:text-foreground/20',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-muted border-muted text-foreground outline-foreground',
          'hover:bg-[color-mix(in_oklab,var(--muted),var(--foreground)_10%)]',
          'hover:border-[color-mix(in_oklab,var(--muted),var(--foreground)_14%)]',
          'active:bg-[color-mix(in_oklab,var(--muted),var(--foreground)_16%)]',
          'active:border-[color-mix(in_oklab,var(--muted),var(--foreground)_20%)]',
        ],
        primary: [
          'bg-primary border-primary text-primary-foreground',
          'outline-[var(--primary-value)]',
          'hover:bg-[color-mix(in_oklab,var(--primary-value),var(--foreground)_12%)]',
          'hover:border-[color-mix(in_oklab,var(--primary-value),var(--foreground)_16%)]',
          'active:bg-[color-mix(in_oklab,var(--primary-value),var(--foreground)_18%)]',
          'active:border-[color-mix(in_oklab,var(--primary-value),var(--foreground)_22%)]',
        ],
        // Transparent until touched. Focus fills it back to the default
        // surface.
        ghost: [
          'border-transparent bg-transparent text-foreground outline-foreground',
          'hover:bg-[color-mix(in_oklab,var(--muted),var(--foreground)_10%)]',
          'hover:border-[color-mix(in_oklab,var(--muted),var(--foreground)_14%)]',
          'active:bg-[color-mix(in_oklab,var(--muted),var(--foreground)_16%)]',
          'active:border-[color-mix(in_oklab,var(--muted),var(--foreground)_20%)]',
          'focus-visible:bg-muted focus-visible:border-muted',
        ],
      },
      size: {
        sm: 'h-8 px-3',
        /*
         * The hero's two real actions. Everything else on the site stays at
         * `sm`, which suits a dense technical page — but a 32px, 12px-semibold
         * control was carrying the weight of a primary call to action through
         * font-weight alone, which is work the size should be doing.
         */
        md: 'h-10 px-4 text-[0.8125rem]',
        'icon-sm': 'h-8 w-8 px-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'sm' },
  }
);

export { buttonVariants };
