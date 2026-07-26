import { client } from '@/sanity/lib/client';
import { ALL_WORK_QUERY, WORK_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import {
  STATUS_BY_KIND,
  type WorkKind,
  type WorkStatus,
} from '@/lib/work-status';

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
 * A full document. The list query deliberately doesn't fetch these fields, so
 * only `getWorkBySlug` returns this type — the extra shape is what stops a card
 * from reading a `content` that was never loaded.
 */
export interface WorkItem extends WorkSummary {
  content: string;
  abstract?: string;
  doi?: string;
  arxiv?: string;
  pdf?: string;
}

type RawSummary = {
  kind: string | null;
  slug: string | null;
  title: string | null;
  description: string | null;
  date: string | null;
  tags: string[] | null;
  status: string | null;
  youtubeUrl: string | null;
  github: string | null;
  demo: string | null;
  authors: string[] | null;
  journal: string | null;
  conference: string | null;
};

type RawWork = RawSummary & {
  abstract: string | null;
  doi: string | null;
  arxiv: string | null;
  pdf: string | null;
  content: string | null;
};

/**
 * Falls back when the document predates the required `status` field, or carries
 * a value that isn't legal for its kind — either way the card still renders.
 */
function toStatus(value: string | null, kind: WorkKind): WorkStatus {
  const allowed: readonly string[] = STATUS_BY_KIND[kind];
  if (value && allowed.includes(value)) return value as WorkStatus;
  return kind === 'research' ? 'draft' : 'completed';
}

function toSummary(d: RawSummary): WorkSummary {
  const slug = d.slug ?? '';
  const kind: WorkKind = d.kind === 'research' ? 'research' : 'project';

  return {
    kind,
    slug,
    title: d.title ?? '',
    description: d.description ?? '',
    date: d.date ?? '',
    tags: d.tags ?? [],
    status: toStatus(d.status, kind),
    url: `/work/${slug}`,
    youtubeUrl: d.youtubeUrl ?? undefined,
    github: d.github ?? undefined,
    demo: d.demo ?? undefined,
    authors: d.authors ?? undefined,
    journal: d.journal ?? undefined,
    conference: d.conference ?? undefined,
  };
}

function toWork(d: RawWork): WorkItem {
  return {
    ...toSummary(d),
    content: d.content ?? '',
    abstract: d.abstract ?? undefined,
    doi: d.doi ?? undefined,
    arxiv: d.arxiv ?? undefined,
    pdf: d.pdf ?? undefined,
  };
}

const fetchOpts =
  process.env.NODE_ENV === 'production'
    ? { next: { revalidate: 3600 } }
    : { cache: 'no-store' as const };

export async function getAllWork(): Promise<WorkSummary[]> {
  const data = await client.fetch<RawSummary[]>(ALL_WORK_QUERY, {}, fetchOpts);
  return (data ?? []).map(toSummary);
}

export async function getWorkBySlug(slug: string): Promise<WorkItem | null> {
  const data = await client.fetch<RawWork | null>(
    WORK_BY_SLUG_QUERY,
    { slug },
    fetchOpts
  );
  return data ? toWork(data) : null;
}
