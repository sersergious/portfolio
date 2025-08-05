import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

// Types for our content - simplified to avoid conflicts
export interface Project {
    slug: string
    title: string
    description: string
    date: string
    tags: string[]
    category: string[]
    featured: boolean
    status: 'completed' | 'in-progress' | 'archived'
    techStack: string[]
    github?: string
    demo?: string
    image?: string
    readingTime: string
    wordCount: number
    url: string
    serializedContent: MDXRemoteSerializeResult
    content: string
}

export interface BlogPost {
    slug: string
    title: string
    description: string
    date: string
    tags: string[]
    category?: string
    featured: boolean
    published: boolean
    authorName: string
    authorAvatar?: string
    author: { name: string; avatar?: string }
    image?: string
    readingTime: string
    wordCount: number
    url: string
    serializedContent: MDXRemoteSerializeResult
    content: string
}

export interface ResearchPaper {
    slug: string
    title: string
    abstract: string
    authors: string[]
    date: string
    tags: string[]
    featured: boolean
    status: 'published' | 'preprint' | 'in-review' | 'draft'
    journal?: string
    conference?: string
    volume?: string
    pages?: string
    doi?: string
    arxiv?: string
    pdf?: string
    citations?: number
    awards?: string[]
    image?: string
    readingTime: string
    wordCount: number
    url: string
    serializedContent: MDXRemoteSerializeResult
    content: string
}

// Simplified MDX options to avoid plugin version conflicts
const mdxOptions = {
    // Start with basic options only
}

// Helper functions
const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
}

// Projects
export async function getAllProjects(): Promise<Project[]> {
    const contentDir = path.join(process.cwd(), 'content', 'projects')

    if (!fs.existsSync(contentDir)) {
        return []
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'))

    const projects = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace('.mdx', '')
            const fullPath = path.join(contentDir, file)
            const fileContent = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContent)

            // Serialize MDX with basic options
            const serializedContent = await serialize(content, mdxOptions)

            return {
                slug,
                title: data.title,
                description: data.description,
                date: data.date,
                tags: data.tags || [],
                category: data.category || [],
                featured: data.featured || false,
                status: data.status || 'completed',
                techStack: data.techStack || [],
                github: data.github,
                demo: data.demo,
                image: data.image,
                readingTime: calculateReadingTime(content),
                wordCount: content.trim().split(/\s+/).length,
                url: `/projects/${slug}`,
                serializedContent,
                content,
            } as Project
        })
    )

    return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await getAllProjects()
    return projects.find(project => project.slug === slug) || null
}

export async function getFeaturedProjects(limit: number = 3): Promise<Project[]> {
    const projects = await getAllProjects()
    return projects.filter(project => project.featured).slice(0, limit)
}

// Blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const contentDir = path.join(process.cwd(), 'content', 'blog')

    if (!fs.existsSync(contentDir)) {
        return []
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'))

    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace('.mdx', '')
            const fullPath = path.join(contentDir, file)
            const fileContent = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContent)

            // Skip unpublished posts
            if (data.published === false) {
                return null
            }

            // Serialize MDX
            const serializedContent = await serialize(content, mdxOptions)

            const authorName = data.authorName || 'Serhii Kuzmin'

            return {
                slug,
                title: data.title,
                description: data.description,
                date: data.date,
                tags: data.tags || [],
                category: data.category,
                featured: data.featured || false,
                published: data.published !== false,
                authorName,
                authorAvatar: data.authorAvatar,
                author: {
                    name: authorName,
                    avatar: data.authorAvatar,
                },
                image: data.image,
                readingTime: calculateReadingTime(content),
                wordCount: content.trim().split(/\s+/).length,
                url: `/blog/${slug}`,
                serializedContent,
                content,
            } as BlogPost
        })
    )

    return posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getAllBlogPosts()
    return posts.find(post => post.slug === slug) || null
}

export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
    const posts = await getAllBlogPosts()
    return posts.filter(post => post.featured).slice(0, limit)
}

// Research papers
export async function getAllResearch(): Promise<ResearchPaper[]> {
    const contentDir = path.join(process.cwd(), 'content', 'research')

    if (!fs.existsSync(contentDir)) {
        return []
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'))

    const papers = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace('.mdx', '')
            const fullPath = path.join(contentDir, file)
            const fileContent = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContent)

            // Serialize MDX
            const serializedContent = await serialize(content, mdxOptions)

            return {
                slug,
                title: data.title,
                abstract: data.abstract,
                authors: data.authors || [],
                date: data.date,
                tags: data.tags || [],
                featured: data.featured || false,
                status: data.status || 'draft',
                journal: data.journal,
                conference: data.conference,
                volume: data.volume,
                pages: data.pages,
                doi: data.doi,
                arxiv: data.arxiv,
                pdf: data.pdf,
                citations: data.citations || 0,
                awards: data.awards || [],
                image: data.image,
                readingTime: calculateReadingTime(content),
                wordCount: content.trim().split(/\s+/).length,
                url: `/research/${slug}`,
                serializedContent,
                content,
            } as ResearchPaper
        })
    )

    return papers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getResearchBySlug(slug: string): Promise<ResearchPaper | null> {
    const papers = await getAllResearch()
    return papers.find(paper => paper.slug === slug) || null
}

export async function getFeaturedResearch(limit: number = 3): Promise<ResearchPaper[]> {
    const papers = await getAllResearch()
    return papers.filter(paper => paper.featured).slice(0, limit)
}

// Combined functions
export async function getFeaturedContent() {
    const [projects, blogPosts, research] = await Promise.all([
        getFeaturedProjects(3),
        getFeaturedBlogPosts(3),
        getFeaturedResearch(3),
    ])

    return { projects, blogPosts, research }
}

// Search function
export async function searchAllContent(query: string, limit: number = 10) {
    const [projects, blogPosts, research] = await Promise.all([
        getAllProjects(),
        getAllBlogPosts(),
        getAllResearch(),
    ])

    const searchTerms = query.toLowerCase().split(/\s+/)

    const allContent = [
        ...projects.map(item => ({ ...item, contentType: 'project' as const })),
        ...blogPosts.map(item => ({ ...item, contentType: 'blog' as const })),
        ...research.map(item => ({ ...item, contentType: 'research' as const })),
    ]

    const results = allContent
        .map(item => {
            let score = 0
            const title = item.title.toLowerCase()
            const description = ('abstract' in item ? item.abstract : item.description).toLowerCase()
            const tags = item.tags || []

            searchTerms.forEach(term => {
                if (title.includes(term)) score += title === term ? 10 : 5
                if (description.includes(term)) score += 3
                tags.forEach((tag: string) => {
                    if (tag.toLowerCase().includes(term)) score += 2
                })
            })

            return { ...item, score }
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)

    return results
}

// Related content
export async function getRelatedContent<T extends Project | BlogPost | ResearchPaper>(
    currentItem: T,
    allItems: T[],
    limit: number = 3
): Promise<T[]> {
    const currentTags = currentItem.tags || []

    return allItems
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
        .map(({ item }) => item)
}

// Utility functions - removed async since they don't need to be
export function getUniqueCategories(items: (Project | BlogPost | ResearchPaper)[]): string[] {
    const categories = new Set<string>()

    items.forEach(item => {
        if ('category' in item) {
            if (Array.isArray(item.category)) {
                item.category.forEach((cat: string) => categories.add(cat))
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
            item.tags.forEach((tag: string) => tags.add(tag))
        }
    })

    return Array.from(tags).sort()
}