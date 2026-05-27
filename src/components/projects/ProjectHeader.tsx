
import { ContentHeader } from '@/components/content/ContentHeader';
import type { Project } from '@/lib/data';

interface ProjectHeaderProps {
  project: Project;
  className?: string;
}

export function ProjectHeader({ project, className }: ProjectHeaderProps) {
  return (
    <div className={className}>
      <ContentHeader content={project} type="project" />
    </div>
  );
}
