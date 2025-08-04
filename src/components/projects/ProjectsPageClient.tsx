// components/projects/ProjectsPageClient.tsx
'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/projects/ProjectCard'

interface Project {
    slug: string
    meta: {
        category?: string[]
        tags?: string[]
        [key: string]: any
    }
    [key: string]: any
}

interface ProjectsPageClientProps {
    projects: Project[]
}

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}