'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Toggle } from '@base-ui/react/toggle';
import { Sun, Moon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Both icons share one grid cell and cross-fade with a quarter turn.
const swapIcon =
  'col-start-1 row-start-1 h-4 w-4 motion-safe:transition-[transform,rotate,opacity] motion-safe:duration-200 motion-safe:ease-out';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const iconButton = buttonVariants({ variant: 'ghost', size: 'icon-sm' });

  // Same box as the real button, so the nav does not shift on hydration.
  if (!mounted)
    return <div className={cn(iconButton, 'pointer-events-none')} />;

  const isDark = resolvedTheme === 'dark';

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={next => setTheme(next ? 'dark' : 'light')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      // After the button classes, so tailwind-merge keeps inline-grid.
      className={cn(
        iconButton,
        'group relative inline-grid place-content-center'
      )}
    >
      <Moon
        className={cn(
          swapIcon,
          'rotate-45 opacity-0 group-data-pressed:rotate-0 group-data-pressed:opacity-100'
        )}
      />
      <Sun
        className={cn(
          swapIcon,
          'rotate-0 opacity-100 group-data-pressed:-rotate-45 group-data-pressed:opacity-0'
        )}
      />
    </Toggle>
  );
}
