// app/projects/page.tsx (Updated)
import { getAllProjects, getUniqueCategories, getUniqueTags } from '@/lib/contentlayer'
import { ContentFilter } from '@/components/content/ContentFilter'
import { ProjectsHeader } from '@/components/projects/ProjectsHeader'
import { ProjectsPageClient } from '@/components/projects/ProjectsPageClient'
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Projects',
    description: 'A collection of my development work, from web applications to research tools.'
}

export default function ProjectsPage() {
    const projects = getAllProjects()

    // Extract unique categories and tags using helper functions
    const categories = getUniqueCategories(projects)
    const tags = getUniqueTags(projects)

    return (
        <div className="min-h-screen">
            <ProjectsHeader />

            <div className="border-b">
                <div className="container mx-auto px-4 py-6">
                    <ContentFilter
                        searchPlaceholder="Search projects..."
                        categories={categories}
                        tags={tags}
                        sortOptions={[
                            { value: 'date-desc', label: 'Newest First' },
                            { value: 'date-asc', label: 'Oldest First' },
                            { value: 'name', label: 'Name (A-Z)' }
                        ]}
                    />
                </div>
            </div>

            <ProjectsPageClient projects={projects} />
        </div>
    )
}