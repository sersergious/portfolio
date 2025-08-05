// components/blog/BlogHeader.tsx
'use client'

import { motion } from 'framer-motion'

export function BlogHeader() {
    return (
        <div className="border-b bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl font-bold mb-4">Blog</h1>
                    <p className="text-xl text-muted-foreground">
                        Thoughts on software development, AI research, and building innovative technology.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
