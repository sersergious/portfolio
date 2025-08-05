// app/research/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getResearchBySlug, getAllResearch, getRelatedContent } from '@/lib/mdx-content'
import { ResearchHeader } from '@/components/research/ResearchHeader'
import { MDXContent } from '@/components/mdx/MDXContent'
import { RelatedContent } from '@/components/content/RelatedContent'
import type { Metadata } from 'next'

interface ResearchPageProps {
    params: { slug: string }
}

export async function generateStaticParams() {
    const papers = await getAllResearch()
    return papers.map(paper => ({ slug: paper.slug }))
}

export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
    const paper = await getResearchBySlug(params.slug)
    if (!paper) return { title: 'Research Paper Not Found' }

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

export default async function ResearchPage({ params }: ResearchPageProps) {
    const paper = await getResearchBySlug(params.slug)
    if (!paper) notFound()

    const allPapers = await getAllResearch()
    const relatedPapers = await getRelatedContent(paper, allPapers, 3)

    return (
        <div className="min-h-screen">
            <ResearchHeader paper={paper} />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <MDXContent source={paper.serializedContent} />
                </div>

                {relatedPapers.length > 0 && (
                    <div className="mt-16">
                        <RelatedContent title="Related Research" items={relatedPapers} type="research" />
                    </div>
                )}
            </div>
        </div>
    )
}