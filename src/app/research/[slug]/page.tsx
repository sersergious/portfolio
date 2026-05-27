import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { research } from '@/lib/data'
import { ResearchHeader } from '@/components/research/ResearchHeader'
import { MDXContent } from '@/components/mdx/MDXContent'
import { RelatedContent } from '@/components/content/RelatedContent'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return research.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const paper = research.find(p => p.slug === slug)
  if (!paper) return {}
  return {
    title: `${paper.title} — Portfolio`,
    description: paper.abstract,
  }
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params
  const paper = research.find(p => p.slug === slug)
  if (!paper) notFound()

  const related = research
    .filter(p => p.slug !== slug && p.tags.some(t => paper.tags.includes(t)))
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <ResearchHeader paper={paper} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <MDXContent source={paper.content} />
        </div>
        {related.length > 0 && (
          <div className="mt-16">
            <RelatedContent title="Related Research" items={related} type="research" />
          </div>
        )}
      </div>
    </div>
  )
}
