import { ProjectCard } from '@/components/projects/ProjectCard';
import type { Project } from '@/lib/data';

interface ProjectsPageClientProps {
  projects: Project[];
}

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
            <p className="text-base-content/60">
              Stay tuned for exciting new projects!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
