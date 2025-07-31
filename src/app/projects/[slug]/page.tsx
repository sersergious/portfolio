// app/projects/[slug]/page.tsx
import { getProjectBySlug, getAllProjects } from '@/lib/content'
import { NotionPage } from '@/components/notion/NotionPage'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

// Generate static paths for all projects
export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map(project => ({
    slug: project.slug
  }))
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  return {
    title: `${project.meta.title} - Projects`,
    description: project.meta.description
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  try {
    const project = await getProjectBySlug(params.slug)

    return (
      <div className="container mx-auto px-4 py-8">
        <NotionPage
          title={project.meta.title}
          description={project.meta.description}
          coverImage={project.meta.image}
        >
          <MDXRemote source={project.content} />

          {/* Project Links */}
          <div className="flex gap-4 mt-8 not-prose">
            {project.meta.github && (
              <a href={project.meta.github} className="btn-primary">
                View Code
              </a>
            )}
            {project.meta.demo && (
              <a href={project.meta.demo} className="btn-secondary">
                Live Demo
              </a>
            )}
          </div>
        </NotionPage>
      </div>
    )
  } catch (error) {
    notFound()
  }
}