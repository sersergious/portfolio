import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, PlayCircle } from 'lucide-react';
import type { ResearchPaper } from '@/lib/sanity-content';

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

interface ResearchCardProps {
  paper: ResearchPaper;
}

export function ResearchCard({ paper }: ResearchCardProps) {
  const videoId = paper.youtubeUrl ? getYouTubeId(paper.youtubeUrl) : null

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

          <div className="flex flex-wrap gap-2">
            {paper.tags?.slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-base-300 text-base-content/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* {videoId && (
          <div className="md:w-56 shrink-0 border-t border-base-300 md:border-t-0 md:border-l relative aspect-video md:aspect-auto">
            <Image
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="Video thumbnail"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <PlayCircle className="w-10 h-10 text-white drop-shadow" />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
