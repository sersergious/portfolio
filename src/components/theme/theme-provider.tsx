'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      themes={['light', 'dark']}
      value={{ light: 'corporate', dark: 'dim' }}
    >
      {children}
    </NextThemesProvider>
  );
}
