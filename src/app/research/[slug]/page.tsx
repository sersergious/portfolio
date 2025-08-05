// app/research/[slug]/page.tsx
import { getResearchBySlug, getAllResearch, getRelatedContent } from '@/lib/contentlayer'
import { ContentHeader } from '@/components/content/ContentHeader'
import { Button } from '@/components/ui/button'
import { FileText, ExternalLink, Download } from 'lucide-react'
import { MDXContent } from '@/components/mdx/MDXContent'
import { notFound } from 'next/navigation'
import Link from "next/link"
import type { Metadata } from 'next'

interface ResearchPageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const papers = getAllResearch()
    return papers.map(paper => ({
        slug: paper.slug
    }))
}

export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
    const paper = getResearchBySlug(params.slug)

    if (!paper) {
        return {
            title: 'Research Paper Not Found',
        }
    }

    return {
        title: `${paper.title} - Research`,
        description: paper.abstract,
        openGraph: {
            title: paper.title,
            description: paper.abstract,
            type: 'article',
            publishedTime: paper.date,
            authors: paper.authors,
            images: paper.image ? [{ url: paper.image }] : [],
        },
    }
}

export default function ResearchPage({ params }: ResearchPageProps) {
    const paper = getResearchBySlug(params.slug)

    if (!paper) {
        notFound()
    }

    const allPapers = getAllResearch()
    const relatedPapers = getRelatedContent(paper, allPapers, 3)

    // Format authors for display
    const formattedAuthors = paper.authors.join(', ')

    return (
        <article className="min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <ContentHeader
                    title={paper.title}
                    subtitle={formattedAuthors}
                    backLink={{
                        href: '/research',
                        label: 'Back to Research'
                    }}
                    meta={{
                        date: paper.date,
                        tags: paper.tags,
                        readingTime: paper.readingTime,
                    }}
                    actions={
                        <div className="flex flex-wrap gap-3">
                            {paper.pdf && (
                                <Button asChild variant="default">
                                    <a
                                        href={paper.pdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PDF
                                    </a>
                                </Button>
                            )}
                            {paper.doi && (
                                <Button asChild variant="outline">
                                    <a
                                        href={`https://doi.org/${paper.doi}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        View on DOI
                                    </a>
                                </Button>
                            )}
                            {paper.arxiv && (
                                <Button asChild variant="outline">
                                    <a
                                        href={`https://arxiv.org/abs/${paper.arxiv}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FileText className="w-4 h-4 mr-2" />
                                        arXiv
                                    </a>
                                </Button>
                            )}
                        </div>
                    }
                />

                {/* Abstract Section */}
                <div className="mb-12 p-6 bg-muted/50 rounded-lg border">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Abstract
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {paper.abstract}
                    </p>
                </div>

                {/* Publication Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="p-6 border rounded-lg">
                        <h3 className="font-semibold mb-4">Publication Details</h3>
                        <dl className="space-y-3 text-sm">
                            {paper.journal && (
                                <div>
                                    <dt className="text-muted-foreground font-medium">Journal</dt>
                                    <dd className="font-semibold">{paper.journal}</dd>
                                </div>
                            )}
                            {paper.conference && (
                                <div>
                                    <dt className="text-muted-foreground font-medium">Conference</dt>
                                    <dd className="font-semibold">{paper.conference}</dd>
                                </div>
                            )}
                            {paper.volume && (
                                <div>
                                    <dt className="text-muted-foreground font-medium">Volume</dt>
                                    <dd className="font-semibold">{paper.volume}</dd>
                                </div>
                            )}
                            {paper.pages && (
                                <div>
                                    <dt className="text-muted-foreground font-medium">Pages</dt>
                                    <dd className="font-semibold">{paper.pages}</dd>
                                </div>
                            )}
                            <div>
                                <dt className="text-muted-foreground font-medium">Published</dt>
                                <dd className="font-semibold">
                                    {new Date(paper.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="p-6 border rounded-lg">
                        <h3 className="font-semibold mb-4">Research Metrics</h3>
                        <dl className="space-y-3 text-sm">
                            {paper.citations && (
                                <div>
                                    <dt className="text-muted-foreground font-medium">Citations</dt>
                                    <dd className="font-semibold text-primary">{paper.citations}</dd>
                                </div>
                            )}
                            <div>
                                <dt className="text-muted-foreground font-medium">Status</dt>
                                <dd className="font-semibold capitalize">{paper.status.replace('-', ' ')}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground font-medium">Reading Time</dt>
                                <dd className="font-semibold">{paper.readingTime}</dd>
                            </div>
                            {paper.awards && paper.awards.length > 0 && (
                                <div>
                                    <dt className="text-muted-foreground font-medium">Awards</dt>
                                    <dd className="font-semibold text-accent">
                                        {paper.awards.join(', ')}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>

                {/* Paper Content */}
                <div className="mb-12">
                    <MDXContent content={paper.body} />
                </div>

                {/* Related Papers */}
                {relatedPapers.length > 0 && (
                    <div className="mt-16 pt-8 border-t">
                        <h2 className="text-2xl font-bold mb-6">Related Research</h2>
                        <div className="grid gap-4">
                            {relatedPapers.map(related => (
                                <Link
                                    key={related.slug}
                                    href={`/research/${related.slug}`}
                                    className="block group"
                                >
                                    <div className="p-6 border rounded-lg hover:shadow-md hover:border-primary/20 transition-all duration-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 flex-1">
                                                {related.title}
                                            </h3>
                                            <span className="text-xs text-muted-foreground ml-4 flex-shrink-0">
                        {new Date(related.date).getFullYear()}
                      </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                            {related.abstract}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-muted-foreground">
                                                {related.authors.join(', ')}
                                            </p>

                                            {related.status && (
                                                <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                          {related.status.replace('-', ' ')}
                        </span>
                                            )}
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
}