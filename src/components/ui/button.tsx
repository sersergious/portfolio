import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Port of daisyUI's `btn btn-sm`. Every value here was read off the reference
 * build with `getComputedStyle` (see `.ab/styles/ref-*.json`), not transcribed
 * from daisyUI's source — the source is full of `color-mix()` and `calc()`
 * against theme variables, and the resolved value is the thing that has to
 * match.
 *
 * The hover fills stay written as `color-mix()` rather than baked to a literal
 * so they keep tracking the token in both themes, exactly as daisyUI did:
 * `:hover` mixes 7% black into the button colour, `:active` mixes 5%.
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
          'hover:bg-[color-mix(in_oklab,var(--muted),#000_7%)]',
          'hover:border-[color-mix(in_oklab,var(--muted),#000_7%)]',
          'active:bg-[color-mix(in_oklab,var(--muted),#000_5%)]',
          'active:border-[color-mix(in_oklab,var(--muted),#000_7%)]',
        ],
        primary: [
          'bg-primary border-primary text-primary-foreground',
          'outline-[var(--primary-value)]',
          'hover:bg-[color-mix(in_oklab,var(--primary-value),#000_7%)]',
          'hover:border-[color-mix(in_oklab,var(--primary-value),#000_7%)]',
          'active:bg-[color-mix(in_oklab,var(--primary-value),#000_5%)]',
          'active:border-[color-mix(in_oklab,var(--primary-value),#000_7%)]',
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
