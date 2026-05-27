import Link from 'next/link'
import { Calendar, Users } from 'lucide-react'
import type { ResearchPaper } from '@/lib/data'

interface ResearchCardProps {
  paper: ResearchPaper
}

export function ResearchCard({ paper }: ResearchCardProps) {
  return (
    <Link href={`/research/${paper.slug}`} className="block group h-full">
      <div className="h-full border border-base-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-base-200">
        <div className="p-6">
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

          <div className="flex flex-wrap gap-2">
            {paper.tags?.slice(0, 3).map((tag: string) => (
              <span key={tag} className="badge badge-ghost text-xs">
                {tag}
              </span>
            ))}
          </div>

          {paper.pdf && (
            <div className="mt-4">
              <a
                href={paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-base-content/60 hover:text-base-content transition-colors"
                onClick={e => e.stopPropagation()}
              >
                View PDF →
              </a>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
