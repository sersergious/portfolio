import { client } from '@/sanity/lib/client'
import {
  ALL_PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  FEATURED_PROJECTS_QUERY,
  ALL_RESEARCH_QUERY,
  RESEARCH_BY_SLUG_QUERY,
  FEATURED_RESEARCH_QUERY,
} from '@/sanity/lib/queries'

export interface Project {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string[]
  featured: boolean
  status: 'completed' | 'in-progress' | 'archived'
  github?: string
  demo?: string
  youtubeUrl?: string
  image?: string
  readingTime: string
  wordCount: number
  url: string
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
  youtubeUrl?: string
  citations?: number
  awards?: string[]
  image?: string
  readingTime: string
  wordCount: number
  url: string
  content: string
}

type RawProject = {
  _id: string
  slug: string | null
  title: string | null
  description: string | null
  date: string | null
  tags: string[] | null
  category: string[] | null
  featured: boolean | null
  status: string | null
  github: string | null
  demo: string | null
  youtubeUrl: string | null
  image: string | null
  content: string | null
}

type RawResearch = {
  _id: string
  slug: string | null
  title: string | null
  abstract: string | null
  authors: string[] | null
  date: string | null
  tags: string[] | null
  featured: boolean | null
  status: string | null
  journal: string | null
  conference: string | null
  volume: string | null
  pages: string | null
  doi: string | null
  arxiv: string | null
  pdf: string | null
  youtubeUrl: string | null
  citations: number | null
  awards: string[] | null
  image: string | null
  content: string | null
}

function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  return `${Math.ceil(words / 200)} min read`
}

function toProject(d: RawProject): Project {
  const body = d.content ?? ''
  return {
    slug: d.slug ?? '',
    title: d.title ?? '',
    description: d.description ?? '',
    date: d.date ?? '',
    tags: d.tags ?? [],
    category: d.category ?? [],
    featured: d.featured ?? false,
    status: (d.status as Project['status']) ?? 'completed',
    github: d.github ?? undefined,
    demo: d.demo ?? undefined,
    youtubeUrl: d.youtubeUrl ?? undefined,
    image: d.image ?? undefined,
    content: body,
    readingTime: readingTime(body),
    wordCount: body.trim() ? body.trim().split(/\s+/).length : 0,
    url: `/projects/${d.slug}`,
  }
}

function toResearch(d: RawResearch): ResearchPaper {
  const body = d.content ?? ''
  return {
    slug: d.slug ?? '',
    title: d.title ?? '',
    abstract: d.abstract ?? '',
    authors: d.authors ?? [],
    date: d.date ?? '',
    tags: d.tags ?? [],
    featured: d.featured ?? false,
    status: (d.status as ResearchPaper['status']) ?? 'draft',
    journal: d.journal ?? undefined,
    conference: d.conference ?? undefined,
    volume: d.volume ?? undefined,
    pages: d.pages ?? undefined,
    doi: d.doi ?? undefined,
    arxiv: d.arxiv ?? undefined,
    pdf: d.pdf ?? undefined,
    youtubeUrl: d.youtubeUrl ?? undefined,
    citations: d.citations ?? undefined,
    awards: d.awards ?? undefined,
    image: d.image ?? undefined,
    content: body,
    readingTime: readingTime(body),
    wordCount: body.trim() ? body.trim().split(/\s+/).length : 0,
    url: `/research/${d.slug}`,
  }
}

const fetchOpts =
  process.env.NODE_ENV === 'production'
    ? { next: { revalidate: 3600 } }
    : { cache: 'no-store' as const }

export async function getAllProjects(): Promise<Project[]> {
  const data = await client.fetch<RawProject[]>(ALL_PROJECTS_QUERY, {}, fetchOpts)
  return (data ?? []).map(toProject)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await client.fetch<RawProject | null>(
    PROJECT_BY_SLUG_QUERY,
    { slug },
    fetchOpts
  )
  return data ? toProject(data) : null
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const data = await client.fetch<RawProject[]>(
    FEATURED_PROJECTS_QUERY,
    { limit },
    fetchOpts
  )
  return (data ?? []).map(toProject)
}

export async function getAllResearch(): Promise<ResearchPaper[]> {
  const data = await client.fetch<RawResearch[]>(ALL_RESEARCH_QUERY, {}, fetchOpts)
  return (data ?? []).map(toResearch)
}

export async function getResearchBySlug(slug: string): Promise<ResearchPaper | null> {
  const data = await client.fetch<RawResearch | null>(
    RESEARCH_BY_SLUG_QUERY,
    { slug },
    fetchOpts
  )
  return data ? toResearch(data) : null
}

export async function getFeaturedResearch(limit = 3): Promise<ResearchPaper[]> {
  const data = await client.fetch<RawResearch[]>(
    FEATURED_RESEARCH_QUERY,
    { limit },
    fetchOpts
  )
  return (data ?? []).map(toResearch)
}

export function getRelatedContent<T extends Project | ResearchPaper>(
  current: T,
  all: T[],
  limit = 3
): T[] {
  const currentTags = current.tags ?? []
  return all
    .filter(item => item.slug !== current.slug)
    .map(item => {
      const itemTags = item.tags ?? []
      const shared = currentTags.filter(t =>
        itemTags.some(it => it.toLowerCase() === t.toLowerCase())
      )
      const score = shared.length / Math.max(currentTags.length, itemTags.length, 1)
      return { item, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item)
}

export function getUniqueTags(items: (Project | ResearchPaper)[]): string[] {
  const set = new Set<string>()
  items.forEach(item => item.tags?.forEach(t => set.add(t)))
  return Array.from(set).sort()
}

export function getUniqueCategories(items: (Project | ResearchPaper)[]): string[] {
  const set = new Set<string>()
  items.forEach(item => {
    if ('category' in item && Array.isArray(item.category)) {
      item.category.forEach(c => set.add(c))
    }
  })
  return Array.from(set).sort()
}
