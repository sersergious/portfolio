// components/projects/ProjectsHeader.tsx
'use client'

import { motion } from 'framer-motion'

export function ProjectsHeader() {
    return (
        <div className="bg-background/95 backdrop-blur">
            <div className="container border-b mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl font-bold mb-4">Projects</h1>
                    <p className="text-xl text-muted-foreground">
                        Building innovative solutions that push boundaries and solve real problems.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}