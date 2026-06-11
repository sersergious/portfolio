import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { SanityLive } from '@/sanity/lib/live';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      {process.env.SANITY_API_READ_TOKEN && <SanityLive />}
    </ThemeProvider>
  );
}
