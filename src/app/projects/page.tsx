// app/projects/page.tsx
import { getAllProjects } from '@/lib/content'
import { ProjectCard } from '@/components/content/ProjectCard'
import { NotionPage } from '@/components/notion/NotionPage'

export const metadata = {
  title: 'Projects - Portfolio',
  description: 'Explore my development projects and technical work'
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="container mx-auto px-4 py-8">
      <NotionPage
        title="Projects"
        description="A collection of my development work, from web applications to research tools."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
          {projects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </NotionPage>
    </div>
  )
}