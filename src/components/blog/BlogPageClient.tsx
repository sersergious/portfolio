// components/blog/BlogPageClient.tsx
'use client';

import { motion } from 'framer-motion';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPost } from '@/lib/mdx-content';
import { useState } from 'react';

interface BlogPageClientProps {
  posts: BlogPost[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Posts Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={'space-y-8'}
        >
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              variants={itemVariants as any}
              className="group relative"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Hover Effect Background */}
              <div
                className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="relative z-10">
                <BlogCard post={post} />
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
            <p className="text-muted-foreground">
              Check back later for new content!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
