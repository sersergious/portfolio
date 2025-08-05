// components/research/ResearchPageHeader.tsx
'use client'

import { BookOpen } from 'lucide-react'
import { ListPageHeader } from '@/components/content/ListPageHeader'

export function ResearchPageHeader() {
    return (
        <ListPageHeader
            title="Research"
            description="Exploring the frontiers of AI, quantum computing, and cryptography through rigorous academic research."
            icon={<BookOpen className="h-8 w-8 text-white" />}
            iconClassName="bg-gradient-to-br from-emerald-500 to-green-600 text-white"
        />
    )
}
