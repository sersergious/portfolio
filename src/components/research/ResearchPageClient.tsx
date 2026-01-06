// components/research/ResearchPageClient.tsx
'use client';

import { motion } from 'framer-motion';
import { ResearchCard } from '@/components/research/ResearchCard';
import { ResearchPaper } from '@/lib/mdx-content';

interface ResearchPageClientProps {
  papers: ResearchPaper[];
}

export function ResearchPageClient({ papers }: ResearchPageClientProps) {
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
        {/* Papers Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={'space-y-6'}
        >
          {papers.map(paper => (
            <motion.div
              key={paper.slug}
              variants={itemVariants as any}
              className="rounded-lg"
            >
              <ResearchCard paper={paper} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {papers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔬</div>
            <h3 className="text-2xl font-semibold mb-2">
              No research papers found
            </h3>
            <p className="text-muted-foreground">
              New findings and publications are coming soon!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
