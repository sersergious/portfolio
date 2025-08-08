// components/research/ResearchCard.tsx
import { Calendar, Users } from "lucide-react";
import Link from "next/link";
import type { ResearchPaper } from "@/lib/mdx-content";

interface ResearchCardProps {
  paper: ResearchPaper;
}

export function ResearchCard({ paper }: ResearchCardProps) {
  return (
    <Link href={`/research/${paper.slug}`} className="block group h-full">
      <div className="h-full border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-card">
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {paper.title}
          </h3>

          {/* Authors with icon */}
          <div className="flex items-start gap-2 text-muted-foreground mb-4">
            <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-2">{paper.authors.join(", ")}</p>
          </div>

          {/* Publication Info */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(paper.date).getFullYear()}
            </div>
            {paper.journal && (
              <>
                <span>•</span>
                <span>{paper.journal}</span>
              </>
            )}
            {paper.conference && (
              <>
                <span>•</span>
                <span>{paper.conference}</span>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {paper.tags?.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-md">
                {tag}
              </span>
            ))}
          </div>

          {/* PDF Link */}
          {paper.pdf && (
            <div className="mt-4">
              <a
                href={paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                View PDF →
              </a>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
