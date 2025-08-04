// components/content/ContentHeader.tsx
'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ContentHeaderProps {
    title: string
    subtitle?: string
    backLink?: {
        href: string
        label: string
    }
    meta?: {
        date?: string
        author?: string
        readingTime?: string
        tags?: string[]
    }
    actions?: React.ReactNode
    className?: string
}

export function ContentHeader({
                                  title,
                                  subtitle,
                                  backLink,
                                  meta,
                                  actions,
                                  className
                              }: ContentHeaderProps) {
    return (
        <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("mb-12", className)}
        >
            {/* Back Navigation */}
            {backLink && (
                <Link
                    href={backLink.href}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {backLink.label}
                </Link>
            )}

            {/* Title Section */}
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-xl text-muted-foreground max-w-3xl">
                        {subtitle}
                    </p>
                )}

                {/* Meta Information */}
                {meta && (
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {meta.author && (
                            <div className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                <span>{meta.author}</span>
                            </div>
                        )}

                        {meta.date && (
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={meta.date}>
                                    {new Date(meta.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                        )}

                        {meta.readingTime && (
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{meta.readingTime}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Tags */}
                {meta?.tags && meta.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {meta.tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="px-3 py-1"
                            >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                {actions && (
                    <Button className="flex flex-wrap gap-3 pt-2">
                        {actions}
                    </Button>
                )}
            </div>
        </motion.header>
    )
}