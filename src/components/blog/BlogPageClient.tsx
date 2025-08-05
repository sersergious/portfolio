// components/blog/BlogPageClient.tsx
'use client'

import { motion } from 'framer-motion'
import { BlogCard } from '@/components/blog/BlogCard'
import {BlogPost} from "@/lib/contentlayer";

interface BlogPageClientProps {
    posts: BlogPost[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                    {posts.map((post, index) => (
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
    )
}