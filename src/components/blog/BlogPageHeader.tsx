// components/blog/BlogPageHeader.tsx
'use client'

import { FileText } from 'lucide-react'
import { ListPageHeader } from '@/components/content/ListPageHeader'

export function BlogPageHeader() {
    return (
        <ListPageHeader
            title="Blog"
            description="Thoughts on software development, AI research, and building innovative technology."
            icon={<FileText className="h-8 w-8 text-blue-600" />}
            iconClassName="bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
        />
    )
}
