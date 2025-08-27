// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedContent,
} from '@/lib/mdx-content';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { MDXContent } from '@/components/mdx/MDXContent';
import { RelatedContent } from '@/components/content/RelatedContent';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>; // Changed: params is now a Promise
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params; // Added: await params
  const post = await getBlogPostBySlug(resolvedParams.slug); // Changed: use resolvedParams
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author?.name || 'Serhii Kuzmin'],
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params; // Added: await params
  const post = await getBlogPostBySlug(resolvedParams.slug); // Changed: use resolvedParams
  if (!post) notFound();

  const allPosts = await getAllBlogPosts();
  const relatedPosts = await getRelatedContent(post, allPosts, 3);

  return (
    <div className="min-h-screen">
      <BlogHeader post={post} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <MDXContent source={post.serializedContent} />
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <RelatedContent
              title="Related Posts"
              items={relatedPosts}
              type="blog"
            />
          </div>
        )}
      </div>
    </div>
  );
}
