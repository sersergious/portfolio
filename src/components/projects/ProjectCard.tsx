import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink, Calendar, PlayCircle } from 'lucide-react';
import type { Project } from '@/lib/sanity-content';

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const videoId = project.youtubeUrl ? getYouTubeId(project.youtubeUrl) : null

  return (
    <div className="relative group border border-base-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-base-200">
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0" aria-label={project.title} />

      <div className="flex flex-col md:flex-row">
        {/* Text content */}
        <div className="flex-1 p-6">
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-base-content/60 mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/60 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(project.date).getFullYear()}
            </div>
            <span>•</span>
            <span
              className="capitalize font-medium"
              style={{ color: { completed: '#22c55e', 'in-progress': '#eab308', archived: '#f97316' }[project.status] }}
            >
              {project.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.slice(0, 4).map((tag: string) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-base-300 text-base-content/70">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1 text-base-content/60 hover:text-base-content transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1 text-base-content/60 hover:text-base-content transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
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
