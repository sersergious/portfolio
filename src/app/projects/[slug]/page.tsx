// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug, getRelatedContent } from '@/lib/contentlayer'
import { ContentHeader } from '@/components/content/ContentHeader'
import { MDXContent } from '@/components/mdx/MDXContent'
import { RelatedContent } from '@/components/content/RelatedContent'
import type { Metadata } from 'next'

interface ProjectPageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const projects = getAllProjects()
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const project = getProjectBySlug(params.slug)

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

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = getProjectBySlug(params.slug)

    if (!project) {
        notFound()
    }

    const allProjects = getAllProjects()
    const relatedProjects = getRelatedContent(project, allProjects, 3)

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <ContentHeader
                    title={project.title}
                    subtitle={project.description}
                    backLink={{ href: "/projects", label: "Back to Projects" }}
                    meta={{
                        date: project.date,
                        tags: project.tags,
                        techStack: project.techStack,
                        status: project.status,
                        github: project.github,
                        demo: project.demo,
                        readingTime: project.readingTime,
                    }}
                />

                <div className="max-w-4xl mx-auto">
                    <MDXContent content={project.body} />
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
