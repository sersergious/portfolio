// app/research/page.tsx (Updated)
import { getAllResearch, getUniqueTags } from '@/lib/contentlayer'
import { ContentFilter } from '@/components/content/ContentFilter'
import { ResearchHeader } from '@/components/research/ResearchHeader'
import { ResearchPageClient } from '@/components/research/ResearchPageClient'
import { PlaceholderAwards } from '@/components/research/PlaceHolderAwards'
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Research',
    description: 'Academic papers and research findings in AI, quantum computing, and cryptography'
}

export default function ResearchPage() {
    const papers = getAllResearch()

    // Extract unique topics and years
    const topics = getUniqueTags(papers)
    const years = Array.from(new Set(papers.map(p => new Date(p.date).getFullYear().toString())))

    return (
        <div className="min-h-screen">
            <ResearchHeader />

            <div className="border-b">
                <div className="container mx-auto px-4 py-6">
                    <PlaceholderAwards />
                </div>
            </div>

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
