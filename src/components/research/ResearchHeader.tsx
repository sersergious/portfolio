'use client'

import { ContentHeader } from '@/components/content/ContentHeader'
import type { ResearchPaper } from '@/lib/mdx-content'

interface ResearchHeaderProps {
    paper: ResearchPaper
    className?: string
}

export function ResearchHeader({ paper, className }: ResearchHeaderProps) {
    return (
        <div className={className}>
            <ContentHeader content={paper} type="research" />
        </div>
    )
}
