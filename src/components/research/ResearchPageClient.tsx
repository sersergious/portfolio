// components/research/ResearchPageClient.tsx
'use client'

import { motion } from 'framer-motion'
import { ResearchCard } from '@/components/research/ResearchCard'
import {ResearchPaper} from "@/lib/contentlayer";

interface ResearchPageClientProps {
    papers: ResearchPaper[] // Import ResearchPaper from '@/lib/contentlayer'
}
export function ResearchPageClient({ papers }: ResearchPageClientProps) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="space-y-4">
                {papers.map((paper, index) => (
                    <motion.div
                        key={paper.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <ResearchCard paper={paper} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
