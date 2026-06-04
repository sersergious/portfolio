import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { getAllProjects, getProjectBySlug, getRelatedContent } from '@/lib/sanity-content';
import { ALL_PROJECT_SLUGS_QUERY } from '@/sanity/lib/queries';
import { ProjectHeader } from '@/components/projects/ProjectHeader';
import { MDXContent } from '@/components/mdx/MDXContent';
import { RelatedContent } from '@/components/content/RelatedContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<Array<{ slug: string }>>(ALL_PROJECT_SLUGS_QUERY);
  return slugs ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects(),
  ]);
  if (!project) notFound();

  const related = getRelatedContent(project, allProjects);

  return (
    <div className="min-h-screen">
      <ProjectHeader project={project} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <MDXContent source={project.content} />
        </div>
        {related.length > 0 && (
          <div className="mt-16">
            <RelatedContent
              title="Related Projects"
              items={related}
              type="project"
            />
          </div>
        )}
      </div>
    </div>
  );
}
