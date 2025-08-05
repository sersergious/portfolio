// components/blog/BlogCard.tsx
// components/blog/BlogCard.tsx - Fixed
import Link from 'next/link'
import { Calendar, Clock } from "lucide-react"
import type { BlogPost } from '@/lib/contentlayer'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const readingTime = post.readingTime || '5 min read'

  return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <article className="pb-8 border hover:shadow-md -mx-4 px-4 py-4 bg-card rounded-lg transition-colors">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Date and Reading Time */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag: string) => (
                <span key={tag} className="text-xs px-2 py-1 bg-muted group-hover:text-accent rounded-md">
              {tag}
            </span>
            ))}
          </div>
        </article>
      </Link>
  )
}
