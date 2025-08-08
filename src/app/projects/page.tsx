// app/projects/page.tsx (Updated)
import {
  getAllProjects,
  getUniqueCategories,
  getUniqueTags,
} from "@/lib/mdx-content";
import { ContentFilter } from "@/components/content/ContentFilter";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of my development work, from web applications to research tools.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  // Extract unique categories and tags using helper functions
  const categories = getUniqueCategories(projects);
  const tags = getUniqueTags(projects);

  return (
    <div className="min-h-screen">
      <ProjectsHeader />
      <ProjectsPageClient projects={projects} />
    </div>
  );
}
