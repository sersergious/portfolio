// app/research/[slug]/page.tsx
import { getResearchBySlug, getAllResearch } from '@/lib/content'
import { ContentHeader } from '@/components/content/ContentHeader'
import { Button } from '@/components/ui/button'
import { FileText, ExternalLink, Download, Quote } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link";

export async function generateStaticParams() {
    const papers = await getAllResearch()
    return papers.map(paper => ({
        slug: paper.slug
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const paper = await getResearchBySlug(params.slug)
    return {
        title: `${paper.meta.title} - Research`,
        description: paper.meta.abstract
    }
}

export default async function ResearchPage({ params }: { params: { slug: string } }) {
    try {
        const paper = await getResearchBySlug(params.slug)
        const allPapers = await getAllResearch()

        // Get related papers
        const relatedPapers = allPapers
            .filter(p => p.slug !== paper.slug)
            .filter(p => p.meta.tags?.some((tag: string) => paper.meta.tags?.includes(tag)))
            .slice(0, 3)

        // Format authors for display
        const formattedAuthors = paper.meta.authors.join(', ')

        return (
            <article className="min-h-screen">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <ContentHeader
                        title={paper.meta.title}
                        subtitle={formattedAuthors}
                        backLink={{
                            href: '/research',
                            label: 'Back to Research'
                        }}
                        meta={{
                            date: paper.meta.date,
                            tags: paper.meta.tags
                        }}
                        actions={
                            <>
                                {paper.meta.pdf && (
                                    <Button asChild variant="outline">
                                        <a
                                            href={paper.meta.pdf}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download PDF
                                        </a>
                                    </Button>
                                )}
                                {paper.meta.doi && (
                                    <Button asChild variant="outline">
                                        <a
                                            href={`https://doi.org/${paper.meta.doi}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View on DOI
                                        </a>
                                    </Button>
                                )}
                                {paper.meta.arxiv && (
                                    <Button asChild variant="outline">
                                        <a
                                            href={`https://arxiv.org/abs/${paper.meta.arxiv}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FileText className="w-4 h-4 mr-2" />
                                            arXiv
                                        </a>
                                    </Button>
                                )}
                            </>
                        }
                    />

                    {/* Abstract Section */}
                    <div className="mb-12 p-6 bg-muted/50 rounded-lg border">
                        <h2 className="text-lg font-semibold mb-3">Abstract</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {paper.meta.abstract}
                        </p>
                    </div>

                    {/* Publication Details */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Publication Details</h3>
                            <dl className="space-y-2 text-sm">
                                {paper.meta.journal && (
                                    <>
                                        <dt className="text-muted-foreground">Journal</dt>
                                        <dd className="font-medium">{paper.meta.journal}</dd>
                                    </>
                                )}
                                {paper.meta.conference && (
                                    <>
                                        <dt className="text-muted-foreground">Conference</dt>
                                        <dd className="font-medium">{paper.meta.conference}</dd>
                                    </>
                                )}
                                {paper.meta.volume && (
                                    <>
                                        <dt className="text-muted-foreground">Volume</dt>
                                        <dd className="font-medium">{paper.meta.volume}</dd>
                                    </>
                                )}
                                {paper.meta.pages && (
                                    <>
                                        <dt className="text-muted-foreground">Pages</dt>
                                        <dd className="font-medium">{paper.meta.pages}</dd>
                                    </>
                                )}
                            </dl>
                        </div>

                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Metrics</h3>
                            <dl className="space-y-2 text-sm">
                                {paper.meta.citations && (
                                    <>
                                        <dt className="text-muted-foreground">Citations</dt>
                                        <dd className="font-medium">{paper.meta.citations}</dd>
                                    </>
                                )}
                                <dt className="text-muted-foreground">Status</dt>
                                <dd className="font-medium capitalize">{paper.meta.status}</dd>
                            </dl>
                        </div>
                    </div>

                    {/* Content Tabs */}
                    <Tabs defaultValue="paper" className="mb-12">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="paper">Paper</TabsTrigger>
                            <TabsTrigger value="bibtex">BibTeX</TabsTrigger>
                        </TabsList>

                        <TabsContent value="paper" className="mt-6">
                            <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-img:rounded-lg">
                                <MDXRemote source={paper.content} />
                            </div>
                        </TabsContent>

                        <TabsContent value="bibtex" className="mt-6">
                            <div className="relative">
                <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm">
                        {`@article{${paper.slug}${new Date(paper.meta.date).getFullYear()},
                          title={${paper.meta.title}},
                          author={${paper.meta.authors.join(' and ')}},
                          journal={${paper.meta.journal || paper.meta.conference || 'Preprint'}},
                          year={${new Date(paper.meta.date).getFullYear()}}${paper.meta.doi ? `,
                          doi={${paper.meta.doi}}` : ''}
                        }`}
                </pre>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="absolute top-2 right-2"
                                    onClick={() => {
                                        navigator.clipboard.writeText(/* bibtex content */)
                                    }}
                                >
                                    <Quote className="w-4 h-4 mr-2" />
                                    Copy
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Related Papers */}
                    {relatedPapers.length > 0 && (
                        <div className="mt-16 pt-8 border-t">
                            <h2 className="text-2xl font-bold mb-6">Related Research</h2>
                            <div className="space-y-4">
                                {relatedPapers.map(related => (
                                    <Link
                                        key={related.slug}
                                        href={`/research/${related.slug}`}
                                        className="block group"
                                    >
                                        <div className="p-4 border rounded-lg hover:shadow-md transition-all">
                                            <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                                                {related.meta.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {related.meta.authors.join(', ')} • {new Date(related.meta.date).getFullYear()}
                                            </p>
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