// app/research/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Research",
    template: "%s | Research",
  },
  description:
    "Academic research in machine learning, artificial intelligence, and software engineering",
  openGraph: {
    title: "Research",
    description:
      "Academic research in machine learning, artificial intelligence, and software engineering",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}

      {/* Research-specific resources */}
      <aside className="border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Research Profiles */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Research Profiles</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="https://scholar.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Google Scholar →
                  </a>
                </li>
                <li>
                  <a
                    href="https://orcid.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    ORCID →
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.researchgate.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    ResearchGate →
                  </a>
                </li>
                <li>
                  <a
                    href="https://arxiv.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    arXiv →
                  </a>
                </li>
              </ul>
            </div>

            {/* Collaboration */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Collaboration</h3>
              <p className="text-muted-foreground mb-4">
                Interested in collaborating on research? I&apos;m always open to
                discussing new ideas and potential partnerships.
              </p>
              <a
                href="/contact"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
