'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/** `.dark` on the root is shadcn's dark variant, and now the only consumer. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  );
}
