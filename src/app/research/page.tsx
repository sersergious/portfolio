// app/research/page.tsx
import { getAllResearch } from '@/lib/content'
import { ContentFilter } from '@/components/content/ContentFilter'
import { ResearchCard } from '@/components/research/ResearchCard'
import { PlaceholderAwards } from '@/components/research/PlaceHolderAwards'
import { motion } from 'framer-motion'
import {FileText, Award, Calendar, BookOpen} from 'lucide-react'

export const metadata = {
    title: 'Research',
    description: 'Academic papers and research findings in AI, quantum computing, and cryptography'
}

export default async function ResearchPage() {
    const papers = await getAllResearch()

    // Extract unique topics and years
    const topics = Array.from(new Set(papers.flatMap(p => p.meta.tags || [])))
    const years = Array.from(new Set(papers.map(p => new Date(p.meta.date).getFullYear().toString())))

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <div className="border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <BookOpen className="w-6 h-6 text-primary" />
                        <h1 className="text-4xl font-bold mb-4">Research</h1>
                        <p className="text-xl text-muted-foreground">
                            Exploring the frontiers of AI, quantum computing, and cryptography through rigorous academic research.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Awards Placeholder */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-6">
                    <PlaceholderAwards />
                </div>
            </div>

            {/* Filters Section */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-6">
                    <ContentFilter
                        searchPlaceholder="Search papers by title, author, or keyword..."
                        categories={years}
                        tags={topics}
                        sortOptions={[
                            { value: 'date-desc', label: 'Newest First' },
                            { value: 'date-asc', label: 'Oldest First' },
                            { value: 'citations', label: 'Most Cited' }
                        ]}
                    />
                </div>
            </div>

            {/* Publications List */}
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
        </div>
    )
}
