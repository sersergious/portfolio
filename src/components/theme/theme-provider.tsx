'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Both attributes, deliberately. shadcn's dark variant is `.dark` on the root,
 * daisyUI reads `data-theme`, and daisyUI is still the component layer until
 * stage 5 — writing only one of them would leave half the page stuck in light.
 * The `data-theme` half comes off with the plugin.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute={['class', 'data-theme']}
      defaultTheme="system"
      themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  );
}
