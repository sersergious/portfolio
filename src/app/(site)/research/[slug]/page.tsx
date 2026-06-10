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
          {paper.youtubeUrl && (
            <div className="mb-10 rounded-xl overflow-hidden aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${paper.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)?.[1]}`}
                title="Research video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
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
