// =======================================
// components/notion/NotionHeader.tsx
// =======================================

import { Calendar, Clock, Tag } from 'lucide-react'
import { notionUtils } from '@/lib/notion'

interface NotionHeaderProps {
  title: string
  description?: string
  coverImage?: string
  icon?: string
  publishedDate?: string
  readingTime?: string
  tags?: string[]
  author?: {
    name: string
    avatar?: string
  }
}

export function NotionHeader({
  title,
  description,
  coverImage,
  icon,
  publishedDate,
  readingTime,
  tags,
  author
}: NotionHeaderProps) {
  return (
    <header className="notion-header">
      {/* Cover Image */}
      {coverImage && (
        <div className="w-full h-64 md:h-80 bg-muted rounded-lg overflow-hidden mb-8 -mx-4 md:-mx-8">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-6">
        {icon && (
          <div className="text-4xl shrink-0 mt-1">
            {icon}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          {title}
        </h1>
      </div>

      {/* Description */}
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          {description}
        </p>
      )}

      {/* Metadata */}
      {(publishedDate || readingTime || tags || author) && (
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          {/* Author */}
          {author && (
            <div className="flex items-center gap-2">
              {author.avatar && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span>{author.name}</span>
            </div>
          )}

          {/* Published Date */}
          {publishedDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{notionUtils.formatDate(publishedDate)}</span>
            </div>
          )}

          {/* Reading Time */}
          {readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readingTime}</span>
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <div className="flex gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}