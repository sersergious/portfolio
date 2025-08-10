import "@/styles/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navigation } from "@/components/layout/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Portfolio - Research. Develop. Innovate.",
    template: "%s - Portfolio",
  },
  description: "Portfolio showcasing research and development work",
  keywords: ["portfolio", "research", "development", "software engineering"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Portfolio",
    description: "Research. Develop. Innovate.",
    url: "https://sersergious.dev",
    siteName: "Portfolio",
    images: ["/og-image.jpg"],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description: "Research. Develop. Innovate.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          {/* Site structure */}
          <div className="flex min-h-screen flex-col">
            {/* Navigation */}
            <Navigation />

            {/* Main content */}

            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
