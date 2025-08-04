// app/blog/[slug]/page.tsx
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content'
import { ContentHeader } from '@/components/content/ContentHeader'
import { Button } from '@/components/ui/button'
import { Share2, Bookmark, MessageCircle, Twitter, Linkedin } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export async function generateStaticParams() {
    const posts = await getAllBlogPosts()
    return posts.map(post => ({
        slug: post.slug
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = await getBlogPostBySlug(params.slug)
    return {
        title: `${post.meta.title} - Blog`,
        description: post.meta.description,
        openGraph: {
            title: post.meta.title,
            description: post.meta.description,
            type: 'article',
            publishedTime: post.meta.date,
        }
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    try {
        const post = await getBlogPostBySlug(params.slug)
        const allPosts = await getAllBlogPosts()

        // Get related posts
        const relatedPosts = allPosts
            .filter(p => p.slug !== post.slug)
            .filter(p =>
                p.meta.category === post.meta.category ||
                p.meta.tags?.some((tag: string) => post.meta.tags?.includes(tag))
            )
            .slice(0, 3)

        const readingTime = post.meta.readingTime || '5 min read'

        return (
            <article className="min-h-screen">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <ContentHeader
                        title={post.meta.title}
                        subtitle={post.meta.description}
                        backLink={{
                            href: '/blog',
                            label: 'Back to Blog'
                        }}
                        meta={{
                            date: post.meta.date,
                            author: post.meta.author?.name,
                            readingTime: readingTime,
                            tags: post.meta.tags
                        }}
                        actions={
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Share2 className="w-4 h-4 mr-2" />
                                            Share
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <Twitter className="w-4 h-4 mr-2" />
                                            Share on Twitter
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Linkedin className="w-4 h-4 mr-2" />
                                            Share on LinkedIn
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button variant="outline" size="sm">
                                    <Bookmark className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                            </div>
                        }
                    />

                    {/* Cover Image */}
                    {post.meta.image && (
                        <div className="mb-12 rounded-lg overflow-hidden border">
                            <img
                                src={post.meta.image}
                                alt={post.meta.title}
                                className="w-full"
                            />
                        </div>
                    )}

                    {/* MDX Content */}
                    <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:italic prose-img:rounded-lg mb-12">
                        <MDXRemote source={post.content} />
                    </div>

                    {/* Author Bio */}
                    {post.meta.author && (
                        <div className="p-6 bg-muted/50 rounded-lg border mb-12">
                            <div className="flex items-start gap-4">
                                {post.meta.author.avatar && (
                                    <img
                                        src={post.meta.author.avatar}
                                        alt={post.meta.author.name}
                                        className="w-16 h-16 rounded-full"
                                    />
                                )}
                                <div>
                                    <h3 className="font-semibold mb-2">About the Author</h3>
                                    <p className="text-muted-foreground">
                                        {post.meta.author.bio || `${post.meta.author.name} is a developer and researcher passionate about technology.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Comments Placeholder */}
                    <div className="p-8 bg-muted/30 rounded-lg border text-center mb-12">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">Comments</h3>
                        <p className="text-muted-foreground">
                            Comments are coming soon! Check back later to join the discussion.
                        </p>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-16 pt-8 border-t">
                            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPosts.map(related => (
                                    <Link
                                        key={related.slug}
                                        href={`/blog/${related.slug}`}
                                        className="group block"
                                    >
                                        <article className="h-full border rounded-lg p-4 hover:shadow-md transition-all">
                                            <h3 className="font-semibold group-hover:text-primary transition-colors mb-2 line-clamp-2">
                                                {related.meta.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                                                {related.meta.description}
                                            </p>
                                            <time className="text-xs text-muted-foreground">
                                                {new Date(related.meta.date).toLocaleDateString()}
                                            </time>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        )
    } catch (error) {
        notFound()
    }
}