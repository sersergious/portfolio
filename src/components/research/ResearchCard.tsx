import Link from 'next/link';
import { Calendar, Users, PlayCircle } from 'lucide-react';
import type { ResearchPaper } from '@/lib/sanity-content';

interface ResearchCardProps {
  paper: ResearchPaper;
}

export function ResearchCard({ paper }: ResearchCardProps) {
  return (
    <div className="relative group h-full border border-base-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-base-200">
      <Link href={`/research/${paper.slug}`} className="absolute inset-0 z-0" aria-label={paper.title} />

      <div className="flex flex-col md:flex-row">
        {/* Text content */}
        <div className="flex-1 p-6">
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {paper.title}
          </h3>

          <div className="flex items-start gap-2 text-base-content/60 mb-4">
            <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-2">{paper.authors.join(', ')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/60 mb-4">
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

          <div className="flex flex-wrap gap-2 mb-4">
            {paper.tags?.slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-base-300 text-base-content/70">
                {tag}
              </span>
            ))}
          </div>

          {paper.youtubeUrl && (
            <div className="flex items-center gap-4 text-sm">
              <a
                href={paper.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1 text-base-content/60 hover:text-base-content transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                Video
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
