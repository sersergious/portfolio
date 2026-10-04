'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * One segment of the /work filter. The -1px margin collapses neighbouring
 * borders into one hairline; the focus z-index keeps a focused item's ring from
 * being clipped by the next one. `rounded-none` must come after the button's
 * `rounded-lg` for tailwind-merge to drop it.
 */
export function ToggleGroupItem({
  className,
  pressed,
  ...props
}: React.ComponentProps<typeof TogglePrimitive> & { pressed?: boolean }) {
  return (
    <TogglePrimitive
      className={cn(
        buttonVariants({ variant: pressed ? 'default' : 'ghost' }),
        'rounded-none first:rounded-l-lg last:rounded-r-lg -ml-px first:ml-0 focus:z-1',
        'gap-2',
        className
      )}
      {...props}
    />
  );
}
