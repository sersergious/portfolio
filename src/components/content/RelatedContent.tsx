// components/content/RelatedContent.tsx
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import type { Project, BlogPost, ResearchPaper } from '@/lib/mdx-content'

interface RelatedContentProps {
    title: string
    items: (Project | BlogPost | ResearchPaper)[]
    type: 'project' | 'blog' | 'research'
}

export function RelatedContent({ title, items, type }: RelatedContentProps) {
    if (items.length === 0) return null

    const getItemUrl = (item: Project | BlogPost | ResearchPaper) => {
        return `/${type === 'blog' ? 'blog' : type === 'research' ? 'research' : 'projects'}/${item.slug}`
    }

    const getItemDescription = (item: Project | BlogPost | ResearchPaper): string => {
        if ('abstract' in item) {
            return item.abstract // ResearchPaper
        } else {
            return item.description // Project or BlogPost
        }
    }

    return (
        <section className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{title}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full">
                            <Link href={getItemUrl(item)}>
                                <div className="p-6 space-y-4">
                                    <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {getItemDescription(item)}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(item.date).toLocaleDateString()}
                                        </div>

                                        {item.readingTime && (
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {item.readingTime}
                                            </div>
                                        )}
                                    </div>

                                    {item.tags && item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {item.tags.slice(0, 3).map((tag: string) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {item.tags.length > 3 && (
                                                <span className="text-xs text-muted-foreground">
                          +{item.tags.length - 3} more
                        </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}