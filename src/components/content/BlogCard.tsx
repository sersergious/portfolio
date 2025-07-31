// =======================================
// components/content/BlogCard.tsx
// =======================================

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, MessageCircle, Heart, Tag, ArrowRight } from 'lucide-react'
import { notionUtils } from '@/lib/notion'

export interface BlogPost {
  slug: string
  meta: {
    title: string
    description: string
    date: string
    readingTime?: string
    tags: string[]
    image?: string
    author?: {
      name: string
      avatar?: string
    }
    category?: string
    featured?: boolean
    published?: boolean
    likes?: number
    comments?: number
  }
}

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'compact' | 'minimal'
  showExcerpt?: boolean
}

export function BlogCard({ post, variant = 'default', showExcerpt = true }: BlogCardProps) {
  const { slug, meta } = post

  if (variant === 'minimal') {
    return (
      <Link
        href={`/blog/${slug}`}
        className="group block py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors duration-200 -mx-2 px-2 rounded-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
              {meta.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{notionUtils.formatDate(meta.date)}</span>
              {meta.readingTime && (
                <>
                  <span>•</span>
                  <span>{meta.readingTime}</span>
                </>
              )}
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 shrink-0" />
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/blog/${slug}`}
        className="group block p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-sm bg-card"
      >
        <div className="flex gap-4">
          {meta.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
              <Image
                src={meta.image}
                alt={meta.title}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            {/* Category */}
            {meta.category && (
              <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium mb-2">
                {meta.category}
              </span>
            )}

            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {meta.title}
            </h3>

            {showExcerpt && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {meta.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{notionUtils.formatDate(meta.date)}</span>
              </div>
              {meta.readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{meta.readingTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/blog/${slug}`}
        className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
      >
        {/* Featured Image */}
        {meta.image && (
          <div className="aspect-[16/9] bg-muted overflow-hidden relative">
            <Image
              src={meta.image}
              alt={meta.title}
              width={800}
              height={450}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {meta.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          {/* Category */}
          {meta.category && (
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              {meta.category}
            </span>
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {meta.title}
          </h2>

          {/* Description */}
          {showExcerpt && (
            <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {meta.description}
            </p>
          )}

          {/* Tags */}
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {meta.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {meta.tags.length > 3 && (
                <span className="text-xs text-muted-foreground px-2.5 py-1">
                  +{meta.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {meta.author && (
                <div className="flex items-center gap-2">
                  {meta.author.avatar && (
                    <Image
                      src={meta.author.avatar}
                      alt={meta.author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm text-muted-foreground">{meta.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{notionUtils.formatDate(meta.date)}</span>
              </div>
              {meta.readingTime && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{meta.readingTime}</span>
                </div>
              )}
            </div>

            {/* Engagement */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {meta.likes && (
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{meta.likes}</span>
                </div>
              )}
              {meta.comments && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{meta.comments}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary/50"
    >
      {/* Blog Image */}
      {meta.image && (
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          <Image
            src={meta.image}
            alt={meta.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5">
        {/* Category */}
        {meta.category && (
          <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium mb-3">
            {meta.category}
          </span>
        )}

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {meta.title}
        </h3>

        {/* Description */}
        {showExcerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {meta.description}
          </p>
        )}

        {/* Tags */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {meta.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {meta.tags.length > 2 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{meta.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{notionUtils.formatDate(meta.date)}</span>
            </div>
            {meta.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{meta.readingTime}</span>
              </div>
            )}
          </div>

          {meta.author && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{meta.author.name}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}