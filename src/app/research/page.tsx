// app/research/page.tsx (Updated)
import { getAllResearch, getUniqueTags } from '@/lib/mdx-content'
import { ContentFilter } from '@/components/content/ContentFilter'
import { ResearchPageHeader } from '@/components/research/ResearchPageHeader'
import { ResearchPageClient } from '@/components/research/ResearchPageClient'
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Research',
    description: 'Academic papers and research findings in AI, quantum computing, and cryptography'
}

export default async function ResearchPage() {
    const papers = await getAllResearch()

    // Extract unique topics and years
    const topics = getUniqueTags(papers)
    const years = Array.from(new Set(papers.map(p => new Date(p.date).getFullYear().toString())))

    return (
        <div className="min-h-screen">
            <ResearchPageHeader />

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

            <ResearchPageClient papers={papers} />
        </div>
    )
}