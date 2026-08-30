import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Port of daisyUI's `badge badge-sm`, from the measured reference values.
 *
 * The 9px inline padding and 16px radius are not arbitrary-looking by
 * accident: daisyUI derives them from `--size-selector` and `--radius-selector`
 * (`20 / 2 - 1` and `1rem`). Written as literals here because the tokens they
 * came from leave with the plugin in stage 5.
 *
 * `soft` keeps its `color-mix()` form so it keeps tracking the two tokens in
 * both themes, rather than freezing four hex values.
 */
const badgeVariants = cva(
  'inline-flex items-center justify-center gap-2 align-middle h-5 px-[9px] rounded-2xl border text-[0.75rem]',
  {
    variants: {
      variant: {
        ghost: 'bg-muted border-muted text-foreground',
        soft: [
          'text-foreground',
          'bg-[color-mix(in_oklab,var(--foreground)_8%,var(--background))]',
          'border-[color-mix(in_oklab,var(--foreground)_10%,var(--background))]',
        ],
      },
    },
    defaultVariants: { variant: 'ghost' },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
