import type { Metadata } from 'next';
import { projects } from '@/lib/data';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader';
import { ProjectsPageClient } from '@/components/projects/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects — Portfolio',
  description:
    'A collection of my development work, from web applications to research tools.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <ProjectsHeader />
      <ProjectsPageClient projects={projects} />
    </div>
  );
}
