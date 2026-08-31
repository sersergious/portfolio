import type { Metadata } from 'next';
import { socialMetadata } from '@/lib/site';
import { notFound } from 'next/navigation';
import { getAllWorkSlugs, getWorkBySlug } from '@/lib/work-content';
import { youtubeEmbedUrl } from '@/lib/utils';
import { ContentHeader } from '@/components/content/ContentHeader';
import { MDXContent } from '@/components/mdx/MDXContent';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getAllWorkSlugs()).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWorkBySlug(slug);
  if (!item) return {};

  const title = item.title.trim();
  return {
    title,
    description: item.description,
    ...socialMetadata({
      title,
      description: item.description,
      path: item.url,
      type: 'article',
      publishedTime: item.date || undefined,
      authors: item.authors,
      tags: item.tags,
    }),
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getWorkBySlug(slug);
  if (!item) notFound();

  const embed = youtubeEmbedUrl(item.youtubeUrl);

  return (
    /* Article column: centred on the page, text still ranged left inside it. */
    <div className="mx-auto max-w-3xl">
      <ContentHeader item={item} />

      {embed && (
        <section className="pt-16">
          <SectionLabel>
            {item.kind === 'research' ? 'Presentation' : 'Demo'}
          </SectionLabel>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={embed}
              title={
                item.kind === 'research' ? 'Research video' : 'Project video'
              }
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </section>
      )}

      {item.content.trim() && (
        <section className="pt-16">
          <SectionLabel>Write-up</SectionLabel>
          <MDXContent source={item.content} />
        </section>
      )}
    </div>
  );
}
