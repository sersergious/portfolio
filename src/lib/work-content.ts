import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {
  STATUS_BY_KIND,
  type WorkKind,
  type WorkStatus,
} from '@/lib/work-status';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'work');

/**
 * What a card renders. Kind-specific fields are optional rather than a
 * discriminated union — consumers branch on `kind` in a handful of places, and
 * a union would only buy casts at every call site.
 */
export interface WorkSummary {
  kind: WorkKind;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  status: WorkStatus;
  url: string;
  youtubeUrl?: string;
  // project
  github?: string;
  demo?: string;
  // research
  authors?: string[];
  journal?: string;
  conference?: string;
}

/**
 * A full document. `getAllWork` deliberately drops these fields, so only
 * `getWorkBySlug` returns this type — the extra shape is what stops a card from
 * reading a `content` the list never needed.
 */
export interface WorkItem extends WorkSummary {
  content: string;
  abstract?: string;
  doi?: string;
  arxiv?: string;
  pdf?: string;
}

/** Frontmatter is untyped YAML — nothing validates it before it reaches here. */
type Frontmatter = Record<string, unknown>;

const str = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined;

const strArray = (v: unknown): string[] | undefined =>
  Array.isArray(v)
    ? v.filter((x): x is string => typeof x === 'string')
    : undefined;

/**
 * Dates are written quoted in the frontmatter so YAML keeps them as strings.
 * If one is ever left unquoted, js-yaml parses it to a Date and shifts it by the
 * local offset — normalise back to the `YYYY-MM-DD` that `formatDate` expects.
 */
function toDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return str(v) ?? '';
}

/**
 * Falls back when a document has no `status`, or carries one that isn't legal
 * for its kind — either way the card still renders.
 */
function toStatus(value: unknown, kind: WorkKind): WorkStatus {
  const allowed: readonly string[] = STATUS_BY_KIND[kind];
  const v = str(value);
  if (v && allowed.includes(v)) return v as WorkStatus;
  return kind === 'research' ? 'draft' : 'completed';
}

function toSummary(slug: string, fm: Frontmatter): WorkSummary {
  const kind: WorkKind = fm.kind === 'research' ? 'research' : 'project';

  return {
    kind,
    slug,
    title: str(fm.title) ?? '',
    description: str(fm.description) ?? '',
    date: toDate(fm.date),
    tags: strArray(fm.tags) ?? [],
    status: toStatus(fm.status, kind),
    url: `/work/${slug}`,
    youtubeUrl: str(fm.youtubeUrl),
    github: str(fm.github),
    demo: str(fm.demo),
    authors: strArray(fm.authors),
    journal: str(fm.journal),
    conference: str(fm.conference),
  };
}

/** Reads and parses one file. Returns null when the slug has no file. */
async function parse(
  slug: string
): Promise<{ data: Frontmatter; body: string } | null> {
  try {
    const raw = await readFile(path.join(CONTENT_DIR, `${slug}.md`), 'utf8');
    const { data, content } = matter(raw);
    return { data, body: content.trim() };
  } catch {
    return null;
  }
}

/** Every slug with a file. The filename is the slug. */
export async function getAllWorkSlugs(): Promise<string[]> {
  const files = await readdir(CONTENT_DIR);
  return files.filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
}

/** Newest first. */
export async function getAllWork(): Promise<WorkSummary[]> {
  const slugs = await getAllWorkSlugs();

  const parsed = await Promise.all(
    slugs.map(async slug => {
      const file = await parse(slug);
      return file && toSummary(slug, file.data);
    })
  );

  return parsed
    .filter((s): s is WorkSummary => s !== null && s !== undefined)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getWorkBySlug(slug: string): Promise<WorkItem | null> {
  const file = await parse(slug);
  if (!file) return null;

  const { data, body } = file;
  return {
    ...toSummary(slug, data),
    content: body,
    abstract: str(data.abstract),
    doi: str(data.doi),
    arxiv: str(data.arxiv),
    pdf: str(data.pdf),
  };
}
