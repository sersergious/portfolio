import { ThemeProvider } from '@/components/theme/theme-provider';

/**
 * The harness gets the theme machinery but none of the site chrome — no
 * Navigation, no Footer. Nav and footer are already covered by the page-level
 * comparisons; here they would only add pixels that can drift for unrelated
 * reasons.
 *
 * The provider itself is not optional: from Stage 1 the dark palette hangs off
 * the `dark` class that next-themes writes, so without it `set media dark`
 * would leave this page permanently light.
 */
export default function KitchenSinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
