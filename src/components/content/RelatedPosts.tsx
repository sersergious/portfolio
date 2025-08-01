// components/content/RelatedPosts.tsx
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { ScaleOnHover } from '@/components/transitions/ScaleOnHover'
import { StaggerContainer } from '@/components/transitions/StaggerContainer'
import { StaggerItem } from '@/components/transitions/StaggerItem'

interface RelatedPost {
    slug: string
    meta: {
        title: string
        description: string
        date: string
        publishedAt?: string
        readingTime?: string
        image?: string
        coverImage?: string
        tags?: string[]
        category?: string
    }
}

interface RelatedPostsProps {
    posts: RelatedPost[]
    currentPostSlug?: string
    title?: string
    variant?: 'grid' | 'list' | 'minimal'
    showTags?: boolean
}

export function RelatedPosts({
                                 posts,
                                 currentPostSlug,
                                 title = "Related Posts",
                                 variant = 'grid',
                                 showTags = true
                             }: RelatedPostsProps) {
    // Filter out current post if provided
    const filteredPosts = posts.filter(post => post.slug !== currentPostSlug)

    if (filteredPosts.length === 0) return null

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (variant === 'minimal') {
        return (
            <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <ul className="space-y-3">
                    {filteredPosts.slice(0, 5).map((post) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group flex items-start gap-3 text-sm"
                            >
                                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-0.5 flex-shrink-0" />
                                <div>
                  <span className="text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.meta.title}
                  </span>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {formatDate(post.meta.date || post.meta.publishedAt || '')}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    if (variant === 'list') {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-6">{title}</h2>
                <div className="space-y-4">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <div className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-200">
                                    {(post.meta.image || post.meta.coverImage) && (
                                        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-muted">
                                            <Image
                                                src={post.meta.image || post.meta.coverImage || ''}
                                                alt={post.meta.title}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                                            {post.meta.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                            {post.meta.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                          {formatDate(post.meta.date || post.meta.publishedAt || '')}
                      </span>
                                            {post.meta.readingTime && (
                                                <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                                                    {post.meta.readingTime}
                        </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        )
    }

    // Default grid variant
    return (
        <div>
            <h2 className="text-2xl font-bold mb-8">{title}</h2>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(0, 3).map((post, index) => (
                    <StaggerItem key={post.slug} delay={index * 0.1}>
                        <ScaleOnHover scale={1.02}>
                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                <article className="bg-card border border-border rounded-lg overflow-hidden h-full hover:border-primary/50 transition-all duration-200">
                                    {/* Image */}
                                    {(post.meta.image || post.meta.coverImage) && (
                                        <div className="aspect-video bg-muted overflow-hidden">
                                            <Image
                                                src={post.meta.image || post.meta.coverImage || ''}
                                                alt={post.meta.title}
                                                width={400}
                                                height={225}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-5">
                                        {/* Category */}
                                        {post.meta.category && (
                                            <div className="text-xs font-medium text-primary mb-2">
                                                {post.meta.category}
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                            {post.meta.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                            {post.meta.description}
                                        </p>

                                        {/* Tags */}
                                        {showTags && post.meta.tags && post.meta.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.meta.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                                                    >
                            <Tag className="w-3 h-3" />
                                                        {tag}
                          </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                          {formatDate(post.meta.date || post.meta.publishedAt || '')}
                      </span>
                                            {post.meta.readingTime && (
                                                <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                                                    {post.meta.readingTime}
                        </span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </ScaleOnHover>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            {filteredPosts.length > 3 && (
                <div className="text-center mt-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group"
                    >
                        View more posts
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}
        </div>
    )
}