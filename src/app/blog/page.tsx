// app/blog/page.tsx (Updated)
import { getAllBlogPosts, getUniqueCategories, getUniqueTags } from '@/lib/mdx-content'
import { ContentFilter } from '@/components/content/ContentFilter'
import { BlogPageHeader } from '@/components/blog/BlogPageHeader'
import { BlogPageClient } from '@/components/blog/BlogPageClient'
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts on software development, AI, and technology'
}

export default async function BlogPage() {
    const posts = await getAllBlogPosts()

    // Extract unique categories and tags
    const categories = getUniqueCategories(posts)
    const tags = getUniqueTags(posts)

    return (
        <div className="min-h-screen">
            <BlogPageHeader />

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

            <BlogPageClient posts={posts} />
        </div>
    )
}