import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Hover and active mix toward `--foreground`, not toward black.
 *
 * daisyUI mixed 7% black on hover regardless of theme, which is right in light
 * and backwards in dark: a dark primary button dropped from 5.55:1 to 4.84:1
 * against the page when you pointed at it, and the default button moved 1.06
 * to 1.08, which is no feedback at all. Mixing toward the foreground means
 * light darkens, dark lightens, and contrast always increases — one expression
 * for both themes, no `dark:` variant.
 *
 * Font size is set as an arbitrary value on purpose. Tailwind's `text-xs`
 * would also pin line-height to 16px, but daisyUI sets only font-size and
 * leaves line-height at `normal`, which resolves to 18px here.
 */
const buttonVariants = cva(
  [
    // `align-middle` is daisyUI's, and it is not decoration: an inline-flex
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
        // surface, which is daisyUI's behaviour and easy to lose in a port.
        ghost: [
          'border-transparent bg-transparent text-foreground outline-foreground',
          'hover:bg-[color-mix(in_oklab,var(--muted),#000_7%)]',
          'hover:border-[color-mix(in_oklab,var(--muted),#000_7%)]',
          'active:bg-[color-mix(in_oklab,var(--muted),#000_5%)]',
          'active:border-[color-mix(in_oklab,var(--muted),#000_7%)]',
          'focus-visible:bg-muted focus-visible:border-muted',
        ],
      },
      size: {
        sm: 'h-8 px-3',
        'icon-sm': 'h-8 w-8 px-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'sm' },
  }
);

/**
 * Only for a real `<button>`. Base UI's primitive is a client component, and
 * most "buttons" on this site are links — use `buttonVariants()` directly on an
 * `<a>` or `<Link>` there and keep the page free of client JS.
 */
function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
