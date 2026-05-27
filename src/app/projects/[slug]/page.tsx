import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'
import { ProjectHeader } from '@/components/projects/ProjectHeader'
import { MDXContent } from '@/components/mdx/MDXContent'
import { RelatedContent } from '@/components/content/RelatedContent'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) notFound()

  const related = projects
    .filter(p => p.slug !== slug && p.tags.some(t => project.tags.includes(t)))
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <ProjectHeader project={project} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <MDXContent source={project.content} />
        </div>
        {related.length > 0 && (
          <div className="mt-16">
            <RelatedContent title="Related Projects" items={related} type="project" />
          </div>
        )}
      </div>
    </div>
  )
}
