import type { Metadata } from 'next'
import { research } from '@/lib/data'
import { ResearchPageHeader } from '@/components/research/ResearchPageHeader'
import { ResearchPageClient } from '@/components/research/ResearchPageClient'

export const metadata: Metadata = {
  title: 'Research — Portfolio',
  description: 'Academic papers and research findings in AI, quantum computing, and cryptography.',
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <ResearchPageHeader />
      <ResearchPageClient papers={research} />
    </div>
  )
}
