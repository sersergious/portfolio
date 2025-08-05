// components/blog/BlogPageClient.tsx
'use client'

import { motion } from 'framer-motion'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogPost } from "@/lib/mdx-content"
import { useState } from 'react'
import { Grid, List, Calendar, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface BlogPageClientProps {
    posts: BlogPost[]
}

type ViewMode = 'list' | 'grid'

export function BlogPageClient({ posts }: BlogPageClientProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('list')
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* View Mode Toggle */}
                <motion.div 
                    className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                        </span>
                        <Badge variant="secondary" className="ml-2">
                            📝 Latest
                        </Badge>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="gap-2"
                        >
                            <List className="h-4 w-4" />
                            List
                        </Button>
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="gap-2"
                        >
                            <Grid className="h-4 w-4" />
                            Grid
                        </Button>
                    </div>
                </motion.div>

                {/* Posts Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={viewMode === 'grid' 
                        ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
                        : "space-y-8"
                    }
                >
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { type: 'spring', stiffness: 300, damping: 20 }
                            }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="group relative"
                        >
                            {/* Hover Effect Background */}
                            <motion.div
                                className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                animate={{
                                    opacity: hoveredIndex === index ? 0.1 : 0
                                }}
                            />
                            
                            <div className="relative z-10">
                                <BlogCard post={post} />
                                
                                {/* Interactive Post Meta */}
                                <motion.div 
                                    className="mt-4 flex items-center gap-4 text-xs text-muted-foreground"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readingTime}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {post.author.name}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {/* Empty State */}
                {posts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-semibold mb-2">No posts found</h3>
                        <p className="text-muted-foreground">Check back later for new content!</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
