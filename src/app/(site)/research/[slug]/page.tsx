import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { getAllResearch, getResearchBySlug, getRelatedContent } from '@/lib/sanity-content';
import { ALL_RESEARCH_SLUGS_QUERY } from '@/sanity/lib/queries';
import { ResearchHeader } from '@/components/research/ResearchHeader';
import { MDXContent } from '@/components/mdx/MDXContent';
import { RelatedContent } from '@/components/content/RelatedContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<Array<{ slug: string }>>(ALL_RESEARCH_SLUGS_QUERY);
  return slugs ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = await getResearchBySlug(slug);
  if (!paper) return {};
  return {
    title: `${paper.title} — Portfolio`,
    description: paper.abstract,
  };
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const [paper, allResearch] = await Promise.all([
    getResearchBySlug(slug),
    getAllResearch(),
  ]);
  if (!paper) notFound();

  const related = getRelatedContent(paper, allResearch);

  return (
    <div className="min-h-screen">
      <ResearchHeader paper={paper} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <MDXContent source={paper.content} />
        </div>
        {related.length > 0 && (
          <div className="mt-16">
            <RelatedContent
              title="Related Research"
              items={related}
              type="research"
            />
          </div>
        )}
      </div>
    </div>
  );
}
