import Link from 'next/link';
import { Github, ExternalLink, Calendar, PlayCircle } from 'lucide-react';
import type { Project } from '@/lib/sanity-content';
import { getTagColor } from '@/lib/tag-colors';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
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
            <span className="capitalize">{project.status}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.slice(0, 4).map((tag: string) => (
              <span key={tag} className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getTagColor(tag)}`}>
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

        {/* Video placeholder */}
        <div className="md:w-56 shrink-0 border-t border-base-300 md:border-t-0 md:border-l aspect-video md:aspect-auto bg-base-300 flex flex-col items-center justify-center gap-2 text-base-content/30">
          <PlayCircle className="w-10 h-10" />
          <span className="text-xs font-medium">Video coming soon</span>
        </div>
      </div>
    </div>
  );
}
