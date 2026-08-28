'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Same box as the real button, so the nav does not shift on hydration.
  if (!mounted)
    return (
      <div className="btn btn-ghost btn-sm btn-square pointer-events-none" />
    );

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`btn btn-ghost btn-sm btn-square swap swap-rotate ${
        resolvedTheme === 'dark' ? 'swap-active' : ''
      }`}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <Moon className="swap-on h-4 w-4" />
      <Sun className="swap-off h-4 w-4" />
    </button>
  );
}
