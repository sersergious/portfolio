// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAllBlogPosts, getBlogPostBySlug, getRelatedContent } from '@/lib/contentlayer'
import { ContentHeader } from '@/components/content/ContentHeader'
import { MDXContent } from '@/components/mdx/MDXContent'
import { RelatedContent } from '@/components/content/RelatedContent'
import type { Metadata } from 'next'

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const posts = getAllBlogPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

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
    }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    const allPosts = getAllBlogPosts()
    const relatedPosts = getRelatedContent(post, allPosts, 3)

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <ContentHeader
                    title={post.title}
                    subtitle={post.description}
                    backLink={{ href: "/blog", label: "Back to Blog" }}
                    meta={{
                        date: post.date,
                        author: post.author?.name,
                        readingTime: post.readingTime,
                        tags: post.tags,
                    }}
                />

                <div className="max-w-4xl mx-auto">
                    <MDXContent content={post.body} />
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
    )
}
