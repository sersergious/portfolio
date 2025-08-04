// lib/content.ts - Fixed version with proper error handling

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ProjectMeta {
  category: never[];
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  github?: string
  demo?: string
  status?: 'completed' | 'in-progress' | 'archived'
  featured?: boolean
}

export interface BlogMeta {
  readingTime: string;
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  category?: string
  author?: {
    name: string
    avatar?: string
  }
  featured?: boolean
  published?: boolean
}

export interface ResearchMeta {
  title: string
  abstract: string
  authors: string[]
  date: string
  journal?: string
  conference?: string
  volume?: string
  pages?: string
  doi?: string
  arxiv?: string
  pdf?: string
  tags: string[]
  image?: string
  status: 'published' | 'preprint' | 'in-review' | 'draft'
  citations?: number
  awards?: string[]
  featured?: boolean
}

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.warn(`Created missing directory: ${dirPath}`)
  }
}

// Helper function to create sample content if directory is empty
function createSampleContent(type: 'projects' | 'blog' | 'research', dirPath: string): void {
  const sampleFiles = {
    projects: {
      'sample-project.mdx': `---
title: "Sample Project"
description: "This is a sample project to demonstrate the portfolio structure."
date: "2024-01-15"
tags: ["Next.js", "TypeScript", "Tailwind"]
status: "completed"
featured: true
---

# Sample Project

This is a sample project file. Replace this with your actual project content.

## Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
`,
    },
    blog: {
      'welcome-post.mdx': `---
title: "Welcome to My Portfolio"
description: "A brief introduction to my portfolio and what you can expect to find here."
date: "2024-01-10"
tags: ["introduction", "portfolio", "welcome"]
category: "General"
published: true
featured: true
author:
  name: "Your Name"
---

# Welcome to My Portfolio

This is a sample blog post. Replace this with your actual blog content.

## About This Portfolio

This portfolio showcases my work in research and development.

## What You'll Find Here

- Projects I've worked on
- Research papers and findings
- Blog posts about technology
- Ways to get in touch
`,
    },
    research: {
      'sample-research.mdx': `---
title: "Sample Research Paper"
abstract: "This is a sample research paper abstract that describes the main findings and contributions of the work."
authors: ["Your Name", "Collaborator Name"]
date: "2024-01-01"
tags: ["machine learning", "artificial intelligence"]
status: "published"
journal: "Sample Journal"
featured: true
---

# Sample Research Paper

This is a sample research paper. Replace this with your actual research content.

## Abstract

This paper presents findings on...

## Introduction

The research addresses the problem of...

## Methodology

We employed the following methods...

## Results

Our findings indicate that...

## Conclusion

In conclusion, this work demonstrates...
`,
    },
  }

  const files = sampleFiles[type]
  Object.entries(files).forEach(([filename, content]) => {
    const filePath = path.join(dirPath, filename)
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content)
      console.log(`Created sample file: ${filePath}`)
    }
  })
}

// Get project by slug
export async function getProjectBySlug(slug: string) {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')

  // Ensure directory exists
  ensureDirectoryExists(projectsDirectory)

  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      meta: data as ProjectMeta,
      content,
      slug
    }
  } catch (error) {
    throw new Error(`Project not found: ${slug}`)
  }
}

// Get all projects
export async function getAllProjects() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')

  // Ensure directory exists
  ensureDirectoryExists(projectsDirectory)

  // Check if the directory is empty and create sample content
  const files = fs.readdirSync(projectsDirectory)
  const mdxFiles = files.filter(name => name.endsWith('.mdx'))

  if (mdxFiles.length === 0) {
    console.warn('No project files found. Creating sample content...')
    createSampleContent('projects', projectsDirectory)
    return getAllProjects() // Recursive call after creating sample content
  }

  const projects = mdxFiles
    .map(name => {
      const slug = name.replace(/\.mdx$/, '')
      const fullPath = path.join(projectsDirectory, name)

      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug,
          meta: data as ProjectMeta
        }
      } catch (error) {
        console.error(`Error reading project file ${name}:`, error)
        return null
      }
    })
    .filter(Boolean) // Remove null entries
    .sort((a, b) => new Date(b!.meta.date).getTime() - new Date(a!.meta.date).getTime())

  return projects as Array<{ slug: string; meta: ProjectMeta }>
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const blogDirectory = path.join(process.cwd(), 'content/blog')

  // Ensure directory exists
  ensureDirectoryExists(blogDirectory)

  const fullPath = path.join(blogDirectory, `${slug}.mdx`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      meta: data as BlogMeta,
      content,
      slug
    }
  } catch (error) {
    throw new Error(`Blog post not found: ${slug}`)
  }
}

// Get all blog posts
export async function getAllBlogPosts() {
  const blogDirectory = path.join(process.cwd(), 'content/blog')

  // Ensure directory exists
  ensureDirectoryExists(blogDirectory)

  // Check if directory is empty and create sample content
  const files = fs.readdirSync(blogDirectory)
  const mdxFiles = files.filter(name => name.endsWith('.mdx'))

  if (mdxFiles.length === 0) {
    console.warn('No blog files found. Creating sample content...')
    createSampleContent('blog', blogDirectory)
    return getAllBlogPosts() // Recursive call after creating sample content
  }

  const posts = mdxFiles
    .map(name => {
      const slug = name.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDirectory, name)

      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        // Only include published posts
        if (data.published === false) {
          return null
        }

        return {
          slug,
          meta: data as BlogMeta
        }
      } catch (error) {
        console.error(`Error reading blog file ${name}:`, error)
        return null
      }
    })
    .filter(Boolean) // Remove null entries
    .sort((a, b) => new Date(b!.meta.date).getTime() - new Date(a!.meta.date).getTime())

  return posts as Array<{ slug: string; meta: BlogMeta }>
}

// Get research paper by slug
export async function getResearchBySlug(slug: string) {
  const researchDirectory = path.join(process.cwd(), 'content/research')

  // Ensure directory exists
  ensureDirectoryExists(researchDirectory)

  const fullPath = path.join(researchDirectory, `${slug}.mdx`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      meta: data as ResearchMeta,
      content,
      slug
    }
  } catch (error) {
    throw new Error(`Research paper not found: ${slug}`)
  }
}

// Get all research papers
export async function getAllResearch() {
  const researchDirectory = path.join(process.cwd(), 'content/research')

  // Ensure directory exists
  ensureDirectoryExists(researchDirectory)

  // Check if directory is empty and create sample content
  const files = fs.readdirSync(researchDirectory)
  const mdxFiles = files.filter(name => name.endsWith('.mdx'))

  if (mdxFiles.length === 0) {
    console.warn('No research files found. Creating sample content...')
    createSampleContent('research', researchDirectory)
    return getAllResearch() // Recursive call after creating sample content
  }

  const papers = mdxFiles
    .map(name => {
      const slug = name.replace(/\.mdx$/, '')
      const fullPath = path.join(researchDirectory, name)

      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug,
          meta: data as ResearchMeta
        }
      } catch (error) {
        console.error(`Error reading research file ${name}:`, error)
        return null
      }
    })
    .filter(Boolean) // Remove null entries
    .sort((a, b) => new Date(b!.meta.date).getTime() - new Date(a!.meta.date).getTime())

  return papers as Array<{ slug: string; meta: ResearchMeta }>
}

// Get featured content
export async function getFeaturedContent() {
  try {
    const [projects, blogPosts, research] = await Promise.all([
      getAllProjects(),
      getAllBlogPosts(),
      getAllResearch()
    ])

    return {
      projects: projects.filter(p => p.meta.featured).slice(0, 3),
      blogPosts: blogPosts.filter(p => p.meta.featured).slice(0, 3),
      research: research.filter(p => p.meta.featured).slice(0, 3)
    }
  } catch (error) {
    console.error('Error getting featured content:', error)
    return {
      projects: [],
      blogPosts: [],
      research: []
    }
  }
}

// Search across all content
export async function searchAllContent(query: string, limit: number = 10) {
  try {
    const [projects, blogPosts, research] = await Promise.all([
      getAllProjects(),
      getAllBlogPosts(),
      getAllResearch()
    ])

    const allContent = [
      ...projects.map(p => ({ ...p, type: 'project' as const })),
      ...blogPosts.map(p => ({ ...p, type: 'blog' as const })),
      ...research.map(p => ({ ...p, type: 'research' as const }))
    ]

    const searchTerms = query.toLowerCase().split(/\s+/)

    const results = allContent
      .map(item => {
        let score = 0
        const title = item.meta.title?.toLowerCase() || ''
        const description = item.meta.description || item.meta.abstract || ''
        const tags = item.meta.tags || []

        searchTerms.forEach(term => {
          if (title.includes(term)) score += title === term ? 10 : 5
          if (description.toLowerCase().includes(term)) score += 3
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
  } catch (error) {
    console.error('Error searching content:', error)
    return []
  }
}