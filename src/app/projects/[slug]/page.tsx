// app/projects/[slug]/page.tsx
import { getProjectBySlug, getAllProjects } from '@/lib/content'
import { ContentHeader } from '@/components/content/ContentHeader'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map(project => ({
    slug: project.slug
  }))
}

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
    const allProjects = await getAllProjects()

    // Get related projects (same tags)
    const relatedProjects = allProjects
        .filter(p => p.slug !== project.slug)
        .filter(p => p.meta.tags?.some((tag: string) => project.meta.tags?.includes(tag)))
        .slice(0, 3)

    return (
        <article className="min-h-screen">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <ContentHeader
                title={project.meta.title}
                subtitle={project.meta.description}
                backLink={{
                  href: '/projects',
                  label: 'Back to Projects'
                }}
                meta={{
                  date: project.meta.date,
                  tags: project.meta.tags
                }}
                actions={
                  <div>
                    {project.meta.github && (
                        <Button asChild variant="outline">
                          <a
                              href={project.meta.github}
                              target="_blank"
                              rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                    )}
                    {project.meta.demo && (
                        <Button asChild>
                          <a
                              href={project.meta.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                    )}
                  </div>
                }
            />

            {/* Cover Image */}
            {project.meta.image && (
                <div className="mb-12 rounded-lg overflow-hidden border">
                  <img
                      src={project.meta.image}
                      alt={project.meta.title}
                      className="w-full"
                  />
                </div>
            )}

            {/* MDX Content */}
            <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-primary hover:prose-a:text-primary/80
            prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted
            prose-pre:border prose-blockquote:border-l-primary prose-img:rounded-lg">
              <MDXRemote source={project.content} />
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <div className="mt-16 pt-8 border-t">
                  <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedProjects.map(related => (
                        <Link
                            key={related.slug}
                            href={`/projects/${related.slug}`}
                            className="group block"
                        >
                          <div className="border rounded-lg p-4 hover:shadow-md transition-all">
                            <h3 className="font-semibold group-hover:text-primary transition-colors mb-2">
                              {related.meta.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {related.meta.description}
                            </p>
                            <div className="flex items-center gap-2 mt-3 text-sm text-primary">
                              View Project
                              <ArrowRight className="w-3 h-3" />
                            </div>
                          </div>
                        </Link>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </article>
    )
  } catch (error) {
    notFound()
  }
}