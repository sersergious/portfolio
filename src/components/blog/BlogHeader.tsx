'use client';

import { ContentHeader } from '@/components/content/ContentHeader';
import type { BlogPost } from '@/lib/mdx-content';

interface BlogHeaderProps {
  post: BlogPost;
  className?: string;
}

export function BlogHeader({ post, className }: BlogHeaderProps) {
  return (
    <div className={className}>
      <ContentHeader content={post} type="blog" />
    </div>
  );
}
