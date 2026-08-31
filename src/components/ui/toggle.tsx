'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';

import { buttonVariants } from '@/components/ui/button';
import { joinItem, swapShell } from '@/components/ui/toggle-variants';
import { cn } from '@/lib/utils';

/**
 * Base UI toggles wearing the button's clothes. The layout classes they share
 * with /kitchen-sink live in `toggle-variants.ts`.
 */

/** A single toggle that looks like a ghost icon button. */
export function IconToggle({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive>) {
  return (
    <TogglePrimitive
      className={cn(
        'group',
        buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
        swapShell,
        className
      )}
      {...props}
    />
  );
}

/** The segmented control on /work. Horizontal, one item pressed at a time. */
export function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive>) {
  return (
    <ToggleGroupPrimitive
      className={cn('inline-flex items-stretch', className)}
      {...props}
    />
  );
}

export function ToggleGroupItem({
  className,
  pressed,
  ...props
}: React.ComponentProps<typeof TogglePrimitive> & { pressed?: boolean }) {
  return (
    <TogglePrimitive
      className={cn(
        buttonVariants({ variant: pressed ? 'default' : 'ghost' }),
        joinItem,
        'gap-2',
        className
      )}
      {...props}
    />
  );
}
