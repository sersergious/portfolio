import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <a
        href="#main"
        className={cn(
          buttonVariants({ variant: 'primary' }),
          'sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100'
        )}
      >
        Skip to content
      </a>
      <div className="flex-1">
        <Navigation />
        {/* 16px body: 14px was below comfortable reading size for long prose. */}
        <main id="main" className="mx-auto w-full max-w-5xl px-6 pb-24">
          {children}
        </main>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
