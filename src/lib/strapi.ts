const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? '';

// ─── Public types (same shape as former MDX interfaces) ───────────────────────

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string[];
  featured: boolean;
  status: 'completed' | 'in-progress' | 'archived';
  github?: string;
  demo?: string;
  image?: string;
  readingTime: string;
  wordCount: number;
  url: string;
  content: string;
}

export interface ResearchPaper {
  slug: string;
  title: string;
  abstract: string;
  authors: string[];
  date: string;
  tags: string[];
  featured: boolean;
  status: 'published' | 'preprint' | 'in-review' | 'draft';
  journal?: string;
  conference?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  arxiv?: string;
  pdf?: string;
  citations?: number;
  awards?: string[];
  image?: string;
  readingTime: string;
  wordCount: number;
  url: string;
  content: string;
}

// ─── Strapi v5 raw API types ──────────────────────────────────────────────────

interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
}

interface StrapiProject {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[] | null;
  category: string[] | null;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'archived';
  github?: string | null;
  demo?: string | null;
  image?: StrapiMedia | null;
  content: string | null;
}

interface StrapiResearch {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  abstract: string;
  authors: string[] | null;
  date: string;
  tags: string[] | null;
  featured: boolean;
  status: 'published' | 'preprint' | 'in-review' | 'draft';
  journal?: string | null;
  conference?: string | null;
  volume?: string | null;
  pages?: string | null;
  doi?: string | null;
  arxiv?: string | null;
  pdf?: string | null;
  citations?: number | null;
  awards?: string[] | null;
  image?: StrapiMedia | null;
  content: string | null;
}

interface StrapiList<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
}

function imageUrl(media?: StrapiMedia | null): string | undefined {
  if (!media?.url) return undefined;
  return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`;
}

async function strapiGet<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: STRAPI_API_TOKEN
      ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
      : {},
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Strapi ${res.status} — ${url}`);
  return res.json() as Promise<T>;
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

function toProject(d: StrapiProject): Project {
  const body = d.content ?? '';
  return {
    slug: d.slug,
    title: d.title,
    description: d.description,
    date: d.date,
    tags: d.tags ?? [],
    category: d.category ?? [],
    featured: d.featured ?? false,
    status: d.status ?? 'completed',
    github: d.github ?? undefined,
    demo: d.demo ?? undefined,
    image: imageUrl(d.image),
    content: body,
    readingTime: readingTime(body),
    wordCount: body.trim().split(/\s+/).length,
    url: `/projects/${d.slug}`,
  };
}

function toResearch(d: StrapiResearch): ResearchPaper {
  const body = d.content ?? '';
  return {
    slug: d.slug,
    title: d.title,
    abstract: d.abstract,
    authors: d.authors ?? [],
    date: d.date,
    tags: d.tags ?? [],
    featured: d.featured ?? false,
    status: d.status ?? 'draft',
    journal: d.journal ?? undefined,
    conference: d.conference ?? undefined,
    volume: d.volume ?? undefined,
    pages: d.pages ?? undefined,
    doi: d.doi ?? undefined,
    arxiv: d.arxiv ?? undefined,
    pdf: d.pdf ?? undefined,
    citations: d.citations ?? undefined,
    awards: d.awards ?? undefined,
    image: imageUrl(d.image),
    content: body,
    readingTime: readingTime(body),
    wordCount: body.trim().split(/\s+/).length,
    url: `/research/${d.slug}`,
  };
}

// ─── Public API (same surface as former mdx-content.ts) ──────────────────────

export async function getAllProjects(): Promise<Project[]> {
  const { data } = await strapiGet<StrapiList<StrapiProject>>('/projects', {
    populate: 'image',
    sort: 'date:desc',
    'pagination[pageSize]': '100',
  });
  return data.map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data } = await strapiGet<StrapiList<StrapiProject>>('/projects', {
    populate: 'image',
    'filters[slug][$eq]': slug,
  });
  return data[0] ? toProject(data[0]) : null;
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const { data } = await strapiGet<StrapiList<StrapiProject>>('/projects', {
    populate: 'image',
    'filters[featured][$eq]': 'true',
    sort: 'date:desc',
    'pagination[pageSize]': String(limit),
  });
  return data.map(toProject);
}

export async function getAllResearch(): Promise<ResearchPaper[]> {
  const { data } = await strapiGet<StrapiList<StrapiResearch>>(
    '/research-papers',
    {
      populate: 'image',
      sort: 'date:desc',
      'pagination[pageSize]': '100',
    }
  );
  return data.map(toResearch);
}

export async function getResearchBySlug(
  slug: string
): Promise<ResearchPaper | null> {
  const { data } = await strapiGet<StrapiList<StrapiResearch>>(
    '/research-papers',
    {
      populate: 'image',
      'filters[slug][$eq]': slug,
    }
  );
  return data[0] ? toResearch(data[0]) : null;
}

export async function getFeaturedResearch(limit = 3): Promise<ResearchPaper[]> {
  const { data } = await strapiGet<StrapiList<StrapiResearch>>(
    '/research-papers',
    {
      populate: 'image',
      'filters[featured][$eq]': 'true',
      sort: 'date:desc',
      'pagination[pageSize]': String(limit),
    }
  );
  return data.map(toResearch);
}

export async function getRelatedContent<T extends Project | ResearchPaper>(
  current: T,
  all: T[],
  limit = 3
): Promise<T[]> {
  const currentTags = current.tags ?? [];
  return all
    .filter(item => item.slug !== current.slug)
    .map(item => {
      const itemTags = item.tags ?? [];
      const shared = currentTags.filter(t =>
        itemTags.some(it => it.toLowerCase() === t.toLowerCase())
      );
      const score =
        shared.length / Math.max(currentTags.length, itemTags.length, 1);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

export function getUniqueTags(items: (Project | ResearchPaper)[]): string[] {
  const set = new Set<string>();
  items.forEach(item => item.tags?.forEach(t => set.add(t)));
  return Array.from(set).sort();
}

export function getUniqueCategories(
  items: (Project | ResearchPaper)[]
): string[] {
  const set = new Set<string>();
  items.forEach(item => {
    if ('category' in item && Array.isArray(item.category)) {
      item.category.forEach(c => set.add(c));
    }
  });
  return Array.from(set).sort();
}
