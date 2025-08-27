// components/blog/BlogCard.tsx
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/mdx-content';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const readingTime = post.readingTime || '5 min read';

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <article className="h-full border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-card">
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Meta Info - All in one line */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
