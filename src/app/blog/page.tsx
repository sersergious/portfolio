// app/blog/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Tag, Search } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/content'
import { BlogCard } from '@/components/content/BlogCard'
import { StaggerContainer } from '@/components/transitions/StaggerContainer'
import { StaggerItem } from '@/components/transitions/StaggerItem'
import { FadeInWhenVisible } from '@/components/transitions/FadeInWhenVisible'
import { NotionHeader } from '@/components/notion/NotionHeader'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts on software development, research, and technology',
}

export default async function BlogPage() {
    const posts = await getAllBlogPosts()

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) =>
        new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
    )

    // Get unique categories
    const categories = Array.from(
        new Set(posts.flatMap(post => post.meta.category || []))
    )

    // Get unique tags
    const tags = Array.from(
        new Set(posts.flatMap(post => post.meta.tags || []))
    )

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <NotionHeader
                title="Blog"
                description="Thoughts on software development, research, and technology"
                icon="📝"
            />

            {/* Search and Filters */}
            <section className="py-8 border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search posts..."
                                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground mr-2">Categories:</span>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {sortedPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg mb-4">
                                No blog posts yet. Check back soon!
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                            >
                                Go back home
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Featured Post */}
                            {sortedPosts[0]?.meta.featured && (
                                <FadeInWhenVisible direction="up">
                                    <div className="mb-16">
                                        <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
                                        <BlogCard post={sortedPosts[0]} variant="featured" />
                                    </div>
                                </FadeInWhenVisible>
                            )}

                            {/* All Posts */}
                            <div>
                                <h2 className="text-2xl font-bold mb-8">All Posts</h2>
                                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {sortedPosts.map((post, index) => (
                                        <StaggerItem key={post.slug} delay={index * 0.1}>
                                            <BlogCard post={post} />
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            </div>

                            {/* Tags Cloud */}
                            {tags.length > 0 && (
                                <FadeInWhenVisible direction="up" delay={0.3}>
                                    <div className="mt-16 pt-16 border-t border-border">
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                            <Tag className="w-5 h-5" />
                                            Popular Tags
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {tags.map((tag) => (
                                                <Link
                                                    key={tag}
                                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                                    className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                                                >
                                                    #{tag}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </FadeInWhenVisible>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}