// components/projects/ProjectsPageClient.tsx
"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Project } from "@/lib/mdx-content";
import { useState } from "react";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectsPageClientProps {
  projects: Project[];
}

type ViewMode = "grid" | "list";

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Projects Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Stay tuned for exciting new projects!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
