// app/blog/page.tsx
import { getAllBlogPosts } from '@/lib/content'
import { ContentFilter } from '@/components/content/ContentFilter'
import { BlogCard } from '@/components/blog/BlogCard'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'

export const metadata = {
    title: 'Blog',
    description: 'Thoughts on software development, AI, and technology'
}

export default async function BlogPage() {
    const posts = await getAllBlogPosts()

    // Sort posts by date
    const sortedPosts = posts.sort((a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    )

    // Extract unique categories and tags
    const categories = Array.from(new Set(posts.flatMap(p => p.meta.category || [])))
    const tags = Array.from(new Set(posts.flatMap(p => p.meta.tags || [])))

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <div className="border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl font-bold mb-4">Blog</h1>
                        <p className="text-xl text-muted-foreground">
                            Thoughts on software development, AI research, and building innovative technology.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-6">
                    <ContentFilter
                        searchPlaceholder="Search posts..."
                        categories={categories}
                        tags={tags}
                        sortOptions={[
                            { value: 'date-desc', label: 'Newest First' },
                            { value: 'date-asc', label: 'Oldest First' },
                            { value: 'popular', label: 'Most Popular' }
                        ]}
                    />
                </div>
            </div>

            {/* Blog Posts List */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {sortedPosts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <BlogCard post={post} />
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}