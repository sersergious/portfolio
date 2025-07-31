// =======================================
// lib/mdx.ts - MDX processing utilities
// =======================================

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import { notionUtils } from './notion'
import {blogMetaSchema, projectMetaSchema, researchMetaSchema} from "@/lib/validations";

// Content types
export type ContentType = 'projects' | 'blog' | 'research'

export interface MDXContent {
  slug: string
  meta: any
  content: string
  serialized: MDXRemoteSerializeResult
  readingTime: string
  wordCount: number
  headings: Heading[]
}

export interface Heading {
  id: string
  text: string
  level: number
}

// MDX processing configuration
const mdxOptions = {
  remarkPlugins: [
    remarkGfm, // GitHub Flavored Markdown
    remarkMath, // Math support
  ],
  rehypePlugins: [
    rehypeSlug, // Add IDs to headings
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: {
          className: ['heading-link'],
        },
      },
    ],
    rehypeHighlight, // Syntax highlighting
    rehypeKatex, // Math rendering
  ],
  format: 'mdx' as const,
}

// Get content directory path
function getContentDirectory(type: ContentType): string {
  return path.join(process.cwd(), 'content', type)
}

// Get all files of a specific content type
export async function getAllContent(type: ContentType): Promise<string[]> {
  const contentDirectory = getContentDirectory(type)

  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const files = fs.readdirSync(contentDirectory)
  return files
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => file.replace(/\.(mdx|md)$/, ''))
}

// Get content by slug
export async function getContentBySlug(
  type: ContentType,
  slug: string
): Promise<MDXContent> {
  const contentDirectory = getContentDirectory(type)
  const fullPath = path.join(contentDirectory, `${slug}.mdx`)

  // Try .mdx first, then .md
  let fileContents: string
  let filePath = fullPath

  if (fs.existsSync(fullPath)) {
    fileContents = fs.readFileSync(fullPath, 'utf8')
  } else {
    const mdPath = path.join(contentDirectory, `${slug}.md`)
    if (fs.existsSync(mdPath)) {
      fileContents = fs.readFileSync(mdPath, 'utf8')
      filePath = mdPath
    } else {
      throw new Error(`Content not found: ${slug}`)
    }
  }

  const { data, content } = matter(fileContents)

  // Calculate reading time and word count
  const wordCount = content.trim().split(/\s+/).length
  const readingTime = notionUtils.getReadingTime(content)

  // Extract headings
  const headings = extractHeadings(content)

  // Serialize MDX
  const serialized = await serialize(content, mdxOptions)

  return {
    slug,
    meta: data,
    content,
    serialized,
    readingTime,
    wordCount,
    headings,
  }
}

// Get all content with metadata
export async function getAllContentWithMeta(
  type: ContentType,
  options: {
    limit?: number
    featured?: boolean
    published?: boolean
    sortBy?: 'date' | 'title'
    sortOrder?: 'asc' | 'desc'
  } = {}
): Promise<Array<{ slug: string; meta: any; readingTime: string }>> {
  const {
    limit,
    featured,
    published = true,
    sortBy = 'date',
    sortOrder = 'desc'
  } = options

  const slugs = await getAllContent(type)

  let content = await Promise.all(
    slugs.map(async (slug) => {
      const { meta, readingTime } = await getContentBySlug(type, slug)
      return { slug, meta, readingTime }
    })
  )

  // Filter content
  content = content.filter(item => {
    if (published && item.meta.published === false) return false
    if (featured !== undefined && item.meta.featured !== featured) return false
    return true
  })

  // Sort content
  content.sort((a, b) => {
    let aValue: any = a.meta[sortBy]
    let bValue: any = b.meta[sortBy]

    if (sortBy === 'date') {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (sortOrder === 'desc') {
      return bValue > aValue ? 1 : -1
    } else {
      return aValue > bValue ? 1 : -1
    }
  })

  // Apply limit
  if (limit) {
    content = content.slice(0, limit)
  }

  return content
}

// Search content
export async function searchContent(
  query: string,
  type?: ContentType,
  options: {
    limit?: number
    includeContent?: boolean
  } = {}
): Promise<Array<{ slug: string; meta: any; type: ContentType; score: number }>> {
  const { limit = 10, includeContent = false } = options
  const searchTypes: ContentType[] = type ? [type] : ['projects', 'blog', 'research']

  const results: Array<{ slug: string; meta: any; type: ContentType; score: number }> = []

  for (const contentType of searchTypes) {
    const content = await getAllContentWithMeta(contentType, { published: true })

    for (const item of content) {
      const score = calculateSearchScore(query, item, includeContent)
      if (score > 0) {
        results.push({
          slug: item.slug,
          meta: item.meta,
          type: contentType,
          score
        })
      }
    }
  }

  // Sort by score and apply limit
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

// Calculate search relevance score
function calculateSearchScore(
  query: string,
  item: { slug: string; meta: any },
  includeContent: boolean = false
): number {
  const searchTerms = query.toLowerCase().split(/\s+/)
  let score = 0

  const title = item.meta.title?.toLowerCase() || ''
  const description = item.meta.description?.toLowerCase() || ''
  const tags = item.meta.tags?.map((tag: string) => tag.toLowerCase()) || []

  searchTerms.forEach(term => {
    // Title matches (highest weight)
    if (title.includes(term)) {
      score += title === term ? 10 : 5
    }

    // Description matches
    if (description.includes(term)) {
      score += 3
    }

    // Tag matches
    tags.forEach((tag: string) => {
      if (tag.includes(term)) {
        score += tag === term ? 4 : 2
      }
    })

    // Slug matches
    if (item.slug.toLowerCase().includes(term)) {
      score += 2
    }
  })

  return score
}

// Extract headings from markdown content
function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm
  const headings: Heading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    headings.push({ id, text, level })
  }

  return headings
}

// Generate table of contents from headings
export function generateTableOfContents(headings: Heading[]): string {
  if (headings.length === 0) return ''

  let toc = '<nav class="table-of-contents">\n<ul>\n'

  headings.forEach(heading => {
    const indent = '  '.repeat(heading.level - 1)
    toc += `${indent}<li><a href="#${heading.id}">${heading.text}</a></li>\n`
  })

  toc += '</ul>\n</nav>'
  return toc
}

// Get related content based on tags
export async function getRelatedContent(
  currentSlug: string,
  currentTags: string[],
  type: ContentType,
  limit: number = 3
): Promise<Array<{ slug: string; meta: any; score: number }>> {
  const allContent = await getAllContentWithMeta(type, { published: true })

  // Filter out current content and calculate similarity scores
  const related = allContent
    .filter(item => item.slug !== currentSlug)
    .map(item => {
      const itemTags = item.meta.tags || []
      const commonTags = currentTags.filter(tag =>
        itemTags.some((itemTag: string) =>
          itemTag.toLowerCase() === tag.toLowerCase()
        )
      )

      const score = commonTags.length / Math.max(currentTags.length, itemTags.length)
      return { ...item, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return related
}

// Validate frontmatter
export function validateFrontmatter(type: ContentType, data: any): boolean {
  try {
    switch (type) {
      case 'projects':
        projectMetaSchema.parse(data)
        break
      case 'blog':
        blogMetaSchema.parse(data)
        break
      case 'research':
        researchMetaSchema.parse(data)
        break
      default:
        return false
    }
    return true
  } catch {
    return false
  }
}

// Get content statistics
export async function getContentStats(): Promise<{
  projects: number
  blog: number
  research: number
  totalWords: number
  totalReadingTime: number
}> {
  const types: ContentType[] = ['projects', 'blog', 'research']
  const stats = {
    projects: 0,
    blog: 0,
    research: 0,
    totalWords: 0,
    totalReadingTime: 0,
  }

  for (const type of types) {
    const content = await getAllContentWithMeta(type, { published: true })
    stats[type] = content.length

    // Calculate total words and reading time
    for (const item of content) {
      const { wordCount, readingTime } = await getContentBySlug(type, item.slug)
      stats.totalWords += wordCount
      stats.totalReadingTime += parseInt(readingTime.split(' ')[0]) || 0
    }
  }

  return stats
}