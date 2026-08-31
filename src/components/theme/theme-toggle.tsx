'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { IconToggle } from '@/components/ui/toggle';
import { swapOn, swapOff } from '@/components/ui/toggle-variants';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Same box as the real button, so the nav does not shift on hydration.
  if (!mounted)
    return (
      <div
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
          'pointer-events-none'
        )}
      />
    );

  const isDark = resolvedTheme === 'dark';

  return (
    <IconToggle
      pressed={isDark}
      onPressedChange={next => setTheme(next ? 'dark' : 'light')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <Moon className={cn(swapOn, 'h-4 w-4')} />
      <Sun className={cn(swapOff, 'h-4 w-4')} />
    </IconToggle>
  );
}
