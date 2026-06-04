import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/sanity-content';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader';
import { ProjectsPageClient } from '@/components/projects/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Serhii Kuzmin - Projects',
  description:
    'A collection of my development work, from web applications to research tools.',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return (
    <div className="min-h-screen">
      <ProjectsHeader />
      <ProjectsPageClient projects={projects} />
    </div>
  );
}
