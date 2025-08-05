// components/research/ResearchHeader.tsx
'use client'

import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

export function ResearchHeader() {
    return (
        <div className="border-b bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                >
                    <BookOpen className="w-6 h-6 text-primary mb-4" />
                    <h1 className="text-4xl font-bold mb-4">Research</h1>
                    <p className="text-xl text-muted-foreground">
                        Exploring the frontiers of AI, quantum computing, and cryptography through rigorous academic research.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}