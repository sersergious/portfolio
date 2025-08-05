// components/research/ResearchPageClient.tsx
'use client'

import { motion } from 'framer-motion'
import { ResearchCard } from '@/components/research/ResearchCard'
import { ResearchPaper } from "@/lib/mdx-content"
import { useState } from 'react'
import { Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ResearchPageClientProps {
    papers: ResearchPaper[]
}

type ViewMode = 'list' | 'grid'

export function ResearchPageClient({ papers }: ResearchPageClientProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('list')

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                 {/* View Mode Toggle */}
                <motion.div 
                    className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                            {papers.length} {papers.length === 1 ? 'paper' : 'papers'}
                        </span>
                         <Badge variant="secondary" className="ml-2">
                            🔬 Published
                        </Badge>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="gap-2"
                        >
                            <List className="h-4 w-4" />
                            List
                        </Button>
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="gap-2"
                        >
                            <Grid className="h-4 w-4" />
                            Grid
                        </Button>
                    </div>
                </motion.div>

                {/* Papers Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={viewMode === 'grid' 
                        ? "grid md:grid-cols-2 gap-6" 
                        : "space-y-6"
                    }
                >
                    {papers.map((paper) => (
                        <motion.div
                            key={paper.slug}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02, 
                                boxShadow: '0px 8px 30px rgba(0,0,0,0.08)',
                                transition: { type: 'spring', stiffness: 300, damping: 20 }
                            }}
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
                        <h3 className="text-2xl font-semibold mb-2">No research papers found</h3>
                        <p className="text-muted-foreground">New findings and publications are coming soon!</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
