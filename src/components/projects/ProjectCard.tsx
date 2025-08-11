// components/projects/ProjectCard.tsx
"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/mdx-content";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative group h-full">
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="h-full border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-card">
          <div className="p-6">
            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.slice(0, 4).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-muted rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Spacer for links */}
            <div className="h-6" />
          </div>
        </div>
      </Link>

      {/* Links positioned absolutely to avoid nesting */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 text-sm">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
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
            className="relative z-10 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
