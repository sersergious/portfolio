import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * The 9px inline padding and 16px radius are measured values, not typos.
 * `soft` stays a `color-mix()` so it tracks the tokens in both themes.
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
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
