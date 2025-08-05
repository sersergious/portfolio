// components/projects/ProjectCard.tsx
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from '@/lib/mdx-content'

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group h-full"
        >
            <div className="h-full border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-card">
                {/* Thumbnail */}
                {project.image && (
                    <div className="aspect-video bg-muted overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags?.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-md">
                {tag}
              </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 text-sm">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="w-4 h-4" />
                                Code
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}