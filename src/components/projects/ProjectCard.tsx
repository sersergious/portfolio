import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative group h-full">
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="h-full border border-base-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-base-200">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {project.title}
            </h3>
            <p className="text-base-content/60 mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.slice(0, 4).map((tag: string) => (
                <span key={tag} className="badge badge-ghost text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="h-6" />
          </div>
        </div>
      </Link>

      <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 text-sm">
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
  );
}
