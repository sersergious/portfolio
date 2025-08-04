// app/projects/page.tsx (Updated)
import { getAllProjects } from '@/lib/content'
import { ContentFilter } from '@/components/content/ContentFilter'
import { ProjectsHeader } from '@/components/projects/ProjectsHeader'
import { ProjectsPageClient } from '@/components/projects/ProjectsPageClient'

export const metadata = {
    title: 'Projects',
    description: 'A collection of my development work, from web applications to research tools.'
}

export default async function ProjectsPage() {
    const projects = await getAllProjects()

    // Extract unique categories and tags
    const categories = Array.from(new Set(projects.flatMap(p => p.meta.category || [])))
    const tags = Array.from(new Set(projects.flatMap(p => p.meta.tags || [])))

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <ProjectsHeader />

            {/* Filters Section */}

                <div className="container border-b mx-auto px-4 py-6">
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


            {/* Projects Grid */}
            <ProjectsPageClient projects={projects} />
        </div>
    )
}