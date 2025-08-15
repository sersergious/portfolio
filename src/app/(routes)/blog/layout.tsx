// app/blog/layout.tsx
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Blog",
  },
  description:
    "Technical articles, tutorials, and insights on software development and research",
  openGraph: {
    title: "Blog",
    description:
      "Technical articles, tutorials, and insights on software development and research",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}

      {/* Blog-specific footer or sidebar could go here */}
      {/* <aside className="border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Newsletter Signup */}
      {/*<div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">
                Get the latest posts delivered right to your inbox.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div> */}

      {/* Quick Links */}
      {/*<div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="/blog/rss.xml"
                    className="hover:text-foreground transition-colors"
                  >
                    RSS Feed
                  </a>
                </li>
                <li>
                  <a
                    href="/blog/archive"
                    className="hover:text-foreground transition-colors"
                  >
                    Archive
                  </a>
                </li>
                <li>
                  <a
                    href="/categories"
                    className="hover:text-foreground transition-colors"
                  >
                    Categories
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </aside>*/}
    </div>
  );
}
