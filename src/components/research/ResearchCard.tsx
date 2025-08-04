// components/research/ResearchCard.tsx
import {Calendar} from "lucide-react";
import Link from "next/link";

export function ResearchCard({ paper }: { paper: any }) {
  return (
      <Link
          href={`/research/${paper.slug}`}
          className="group">
        <div className="p-6 border rounded-lg hover:shadow-md transition-all duration-300 bg-card overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                <Link href={`/research/${paper.slug}`}>
                  {paper.meta.title}
                </Link>
              </h3>

              {/* Authors */}
              <p className="text-muted-foreground mb-4">
                {paper.meta.authors.join(', ')}
              </p>

              {/* Publication Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(paper.meta.date).getFullYear()}
                </div>
                {paper.meta.journal && (
                    <span>{paper.meta.journal}</span>
                )}
                {paper.meta.conference && (
                    <span>{paper.meta.conference}</span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {paper.meta.tags?.map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-md">
                  {tag}
                </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              {paper.meta.pdf && (
                  <a
                      href={paper.meta.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-3 py-1 border rounded hover:bg-accent transition-colors"
                  >
                    PDF
                  </a>
              )}
            </div>
          </div>
        </div>
      </Link>
  )
}