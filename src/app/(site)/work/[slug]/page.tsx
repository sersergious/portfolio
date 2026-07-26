import type { Metadata } from 'next';
import { socialMetadata } from '@/lib/site';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { getWorkBySlug } from '@/lib/sanity-content';
import { ALL_WORK_SLUGS_QUERY } from '@/sanity/lib/queries';
import { youtubeEmbedUrl } from '@/lib/utils';
import { ContentHeader } from '@/components/content/ContentHeader';
import { MDXContent } from '@/components/mdx/MDXContent';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<Array<{ slug: string }>>(ALL_WORK_SLUGS_QUERY);
  return slugs ?? [];
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
        <section className="pt-14">
          <SectionLabel>
            {item.kind === 'research' ? 'Presentation' : 'Demo'}
          </SectionLabel>
          <div className="aspect-video w-full overflow-hidden rounded-box">
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
        <section className="pt-14">
          <SectionLabel>Write-up</SectionLabel>
          <MDXContent source={item.content} />
        </section>
      )}
    </div>
  );
}
