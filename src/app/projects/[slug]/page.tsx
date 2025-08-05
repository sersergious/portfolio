// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug, getRelatedContent } from '@/lib/mdx-content'
import { ProjectHeader } from '@/components/projects/ProjectHeader'
import { MDXContent } from '@/components/mdx/MDXContent'
import { RelatedContent } from '@/components/content/RelatedContent'
import type { Metadata } from 'next'

interface ProjectPageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const projects = await getAllProjects()
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const project = await getProjectBySlug(params.slug)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            type: 'article',
            publishedTime: project.date,
            images: project.image ? [{ url: project.image }] : [],
        },
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const project = await getProjectBySlug(params.slug)

    if (!project) {
        notFound()
    }

    const allProjects = await getAllProjects()
    const relatedProjects = await getRelatedContent(project, allProjects, 3)

    return (
        <div className="min-h-screen">
            <ProjectHeader project={project} />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <MDXContent source={project.serializedContent} />
                </div>

                {relatedProjects.length > 0 && (
                    <div className="mt-16">
                        <RelatedContent
                            title="Related Projects"
                            items={relatedProjects}
                            type="project"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}