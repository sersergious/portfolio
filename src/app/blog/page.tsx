// app/blog/page.tsx (Updated)
import { getAllBlogPosts, getUniqueCategories, getUniqueTags } from '@/lib/contentlayer'
import { ContentFilter } from '@/components/content/ContentFilter'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { BlogPageClient } from '@/components/blog/BlogPageClient'
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts on software development, AI, and technology'
}

export default function BlogPage() {
    const posts = getAllBlogPosts()

    // Extract unique categories and tags
    const categories = getUniqueCategories(posts)
    const tags = getUniqueTags(posts)

    return (
        <div className="min-h-screen">
            <BlogHeader/>

            <div className="border-b">
                <div className="container mx-auto px-4 py-6">
                    <ContentFilter
                        searchPlaceholder="Search posts..."
                        categories={categories}
                        tags={tags}
                        sortOptions={[
                            {value: 'date-desc', label: 'Newest First'},
                            {value: 'date-asc', label: 'Oldest First'},
                            {value: 'popular', label: 'Most Popular'}
                        ]}
                    />
                </div>
            </div>

            <BlogPageClient posts={posts}/>
        </div>
    )
}