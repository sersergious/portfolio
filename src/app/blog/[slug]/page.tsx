// app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark, MessageCircle } from 'lucide-react'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content'
import { NotionBlock } from '@/components/notion/NotionBlock'
import { FadeInWhenVisible } from '@/components/transitions/FadeInWhenVisible'
import { StaggerContainer } from '@/components/transitions/StaggerContainer'
import { StaggerItem } from '@/components/transitions/StaggerItem'
import { TableOfContents } from '@/components/content/TableOfContents'
import { AuthorCard } from '@/components/content/AuthorCard'
import { RelatedPosts } from '@/components/content/RelatedPosts'

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = await getBlogPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.meta.title,
        description: post.meta.description,
        openGraph: {
            title: post.meta.title,
            description: post.meta.description,
            type: 'article',
            publishedTime: post.meta.publishedAt,
            authors: post.meta.author ? [post.meta.author.name] : undefined,
            images: post.meta.coverImage ? [post.meta.coverImage] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.meta.title,
            description: post.meta.description,
            images: post.meta.coverImage ? [post.meta.coverImage] : undefined,
        },
    }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const posts = await getAllBlogPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getBlogPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    // Get related posts (same category or tags)
    const allPosts = await getAllBlogPosts()
    const relatedPosts = allPosts
        .filter(p => p.slug !== post.slug)
        .filter(p =>
            p.meta.category === post.meta.category ||
            p.meta.tags?.some(tag => post.meta.tags?.includes(tag))
        )
        .slice(0, 3)

    return (
        <article className="min-h-screen">
            {/* Hero Section with Cover Image */}
            {post.meta.coverImage && (
                <div className="relative h-[400px] md:h-[500px] w-full">
                    <Image
                        src={post.meta.coverImage}
                        alt={post.meta.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>
            )}

            {/* Article Header */}
            <FadeInWhenVisible direction="up">
                <header className={`container mx-auto px-4 ${post.meta.coverImage ? '-mt-32 relative z-10' : 'pt-20'}`}>
                    <div className="max-w-4xl mx-auto">
                        {/* Back to Blog */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            {post.meta.title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                            {post.meta.author && (
                                <div className="flex items-center gap-2">
                                    {post.meta.author.avatar && (
                                        <Image
                                            src={post.meta.author.avatar}
                                            alt={post.meta.author.name}
                                            width={24}
                                            height={24}
                                            className="rounded-full"
                                        />
                                    )}
                                    <span>{post.meta.author.name}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={post.meta.publishedAt}>
                                    {new Date(post.meta.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>

                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.meta.readingTime || '5 min read'}</span>
                            </div>
                        </div>

                        {/* Tags */}
                        {post.meta.tags && post.meta.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.meta.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                                    >
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Share and Save */}
                        <div className="flex gap-4 pb-8 border-b border-border">
                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                                <Bookmark className="w-4 h-4" />
                                Save
                            </button>
                        </div>
                    </div>
                </header>
            </FadeInWhenVisible>

            {/* Article Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
                    {/* Main Content */}
                    <FadeInWhenVisible direction="up" delay={0.2}>
                        <div className="prose prose-lg max-w-none">
                            {post.content.map((block) => (
                                <NotionBlock key={block.id} block={block} />
                            ))}
                        </div>
                    </FadeInWhenVisible>

                    {/* Sidebar */}
                    <aside className="mt-12 lg:mt-0">
                        <StaggerContainer>
                            {/* Table of Contents */}
                            <StaggerItem>
                                <div className="sticky top-24">
                                    <TableOfContents blocks={post.content} />
                                </div>
                            </StaggerItem>
                        </StaggerContainer>
                    </aside>
                </div>
            </div>

            {/* Author Card */}
            {post.meta.author && (
                <FadeInWhenVisible direction="up" delay={0.3}>
                    <section className="container mx-auto px-4 py-12">
                        <div className="max-w-4xl mx-auto">
                            <AuthorCard author={post.meta.author} />
                        </div>
                    </section>
                </FadeInWhenVisible>
            )}

            {/* Comments Section */}
            <FadeInWhenVisible direction="up" delay={0.4}>
                <section className="container mx-auto px-4 py-12 border-t border-border">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <MessageCircle className="w-6 h-6" />
                            Comments
                        </h2>
                        <div className="bg-muted/50 rounded-lg p-8 text-center">
                            <p className="text-muted-foreground">
                                Comments are coming soon! Check back later to join the discussion.
                            </p>
                        </div>
                    </div>
                </section>
            </FadeInWhenVisible>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <FadeInWhenVisible direction="up" delay={0.5}>
                    <section className="container mx-auto px-4 py-12">
                        <div className="max-w-6xl mx-auto">
                            <RelatedPosts posts={relatedPosts} />
                        </div>
                    </section>
                </FadeInWhenVisible>
            )}
        </article>
    )
}