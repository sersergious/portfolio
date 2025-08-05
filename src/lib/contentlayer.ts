import { allProjects, allBlogPosts, allResearchPapers } from 'contentlayer/generated'
import type { Project, BlogPost, ResearchPaper } from 'contentlayer/generated'

// Export types
export type { Project, BlogPost, ResearchPaper }

// Get all projects
export function getAllProjects(): Project[] {
    return allProjects
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
    return allProjects.find(project => project.slug === slug)
}

// Get featured projects
export function getFeaturedProjects(limit: number = 3): Project[] {
    return allProjects
        .filter(project => project.featured)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
    return allBlogPosts
        .filter(post => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return allBlogPosts.find(post => post.slug === slug && post.published)
}

// Get featured blog posts
export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
    return allBlogPosts
        .filter(post => post.featured && post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}

// Get all research papers
export function getAllResearch(): ResearchPaper[] {
    return allResearchPapers
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get research paper by slug
export function getResearchBySlug(slug: string): ResearchPaper | undefined {
    return allResearchPapers.find(paper => paper.slug === slug)
}

// Get featured research papers
export function getFeaturedResearch(limit: number = 3): ResearchPaper[] {
    return allResearchPapers
        .filter(paper => paper.featured)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}

// Get all featured content
export function getFeaturedContent() {
    return {
        projects: getFeaturedProjects(3),
        blogPosts: getFeaturedBlogPosts(3),
        research: getFeaturedResearch(3),
    }
}

// Helper function to get description/abstract
function getContentDescription(item: Project | BlogPost | ResearchPaper): string {
    if ('abstract' in item) {
        return item.abstract // ResearchPaper
    } else {
        return item.description // Project or BlogPost
    }
}

// Search across all content
export function searchAllContent(query: string, limit: number = 10) {
    const searchTerms = query.toLowerCase().split(/\s+/)

    // Create separate arrays with content type info
    const projectsWithType = allProjects.map(item => ({ content: item, contentType: 'project' as const }))
    const postsWithType = allBlogPosts.filter(post => post.published).map(item => ({ content: item, contentType: 'blog' as const }))
    const papersWithType = allResearchPapers.map(item => ({ content: item, contentType: 'research' as const }))

    const allContent = [...projectsWithType, ...postsWithType, ...papersWithType]

    const results = allContent
        .map(({ content, contentType }) => {
            let score = 0
            const title = content.title.toLowerCase()
            const description = getContentDescription(content)
            const tags = content.tags || []

            searchTerms.forEach(term => {
                if (title.includes(term)) score += title === term ? 10 : 5
                if (description.toLowerCase().includes(term)) score += 3
                tags.forEach((tag: string) => {
                    if (tag.toLowerCase().includes(term)) score += 2
                })
            })

            return {
                ...content,
                contentType, // Use contentType instead of type to avoid conflicts
                score
            }
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)

    return results
}

// Get related content based on tags
export function getRelatedContent<T extends Project | BlogPost | ResearchPaper>(
    currentItem: T,
    allItems: T[],
    limit: number = 3
): T[] {
    const currentTags = currentItem.tags || []

    const itemsWithScore = allItems
        .filter(item => item.slug !== currentItem.slug)
        .map(item => {
            const itemTags = item.tags || []
            const commonTags = currentTags.filter(tag =>
                itemTags.some(itemTag => itemTag.toLowerCase() === tag.toLowerCase())
            )
            const score = commonTags.length / Math.max(currentTags.length, itemTags.length)
            return { item, score }
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)

    return itemsWithScore.map(({ item }) => item)
}

// Extract unique values from arrays
export function getUniqueCategories(items: (Project | BlogPost | ResearchPaper)[]): string[] {
    const categories = new Set<string>()

    items.forEach(item => {
        if ('category' in item) {
            if (Array.isArray(item.category)) {
                item.category.forEach(cat => categories.add(cat))
            } else if (item.category) {
                categories.add(item.category)
            }
        }
    })

    return Array.from(categories).sort()
}

export function getUniqueTags(items: (Project | BlogPost | ResearchPaper)[]): string[] {
    const tags = new Set<string>()

    items.forEach(item => {
        if (item.tags) {
            item.tags.forEach(tag => tags.add(tag))
        }
    })

    return Array.from(tags).sort()
}

// Get content statistics
export function getContentStats() {
    const projects = allProjects.length
    const blog = allBlogPosts.filter(post => post.published).length
    const research = allResearchPapers.length

    const totalWords = [
        ...allProjects,
        ...allBlogPosts.filter(post => post.published),
        ...allResearchPapers
    ].reduce((total, item) => total + item.wordCount, 0)

    const totalReadingTime = [
        ...allProjects,
        ...allBlogPosts.filter(post => post.published),
        ...allResearchPapers
    ].reduce((total, item) => {
        const minutes = parseInt(item.readingTime.split(' ')[0]) || 0
        return total + minutes
    }, 0)

    return {
        projects,
        blog,
        research,
        totalWords,
        totalReadingTime,
    }
}