import { defineMigration, create } from 'sanity/migrate';
import type { SanityDocument } from 'sanity';

/**
 * Phase 1 of the project + researchPaper -> work merge.
 *
 * Sanity can't patch `_type`, so each legacy document is copied into a new
 * `work` document. Nothing is deleted here — run `delete-legacy-types` only
 * once you've verified the copies in the Studio and on /work.
 *
 *   npx sanity login
 *   npx sanity dataset export production ./backup-pre-merge.tar.gz
 *   npx sanity migrations run merge-work                 # dry run
 *   npx sanity migrations run merge-work --no-dry-run    # writes
 */

type LegacyDoc = SanityDocument & {
  slug?: { current?: string };
  title?: string;
  description?: string;
  abstract?: string;
  date?: string;
  tags?: string[];
  featured?: boolean;
  status?: string;
  youtubeUrl?: string;
  image?: unknown;
  content?: string;
  // project
  github?: string;
  demo?: string;
  // research
  authors?: string[];
  journal?: string;
  conference?: string;
  doi?: string;
  arxiv?: string;
  pdf?: string;
};

const DRAFT = 'drafts.';

/** `abc` -> `work-abc`, `drafts.abc` -> `drafts.work-abc`. */
function workId(slug: string, legacyId: string): string {
  return legacyId.startsWith(DRAFT) ? `${DRAFT}work-${slug}` : `work-${slug}`;
}

/** Drops keys with undefined values so the new doc has no empty fields. */
function defined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;
}

export default defineMigration({
  title: 'Merge project and researchPaper into work',
  documentTypes: ['project', 'researchPaper'],

  migrate: {
    document(doc: LegacyDoc) {
      const slug = doc.slug?.current;
      if (!slug) {
        // Nothing to route to — leave it for manual handling.
        console.warn(`Skipping ${doc._id}: no slug`);
        return;
      }

      const isResearch = doc._type === 'researchPaper';

      return create({
        _id: workId(slug, doc._id),
        _type: 'work',
        kind: isResearch ? 'research' : 'project',
        slug: { _type: 'slug', current: slug },
        featured: doc.featured ?? false,

        ...defined({
          title: doc.title,
          // Research has no short summary of its own, so the abstract seeds
          // `description` (meta tags + related list). Trim these in the Studio.
          description: isResearch ? doc.abstract : doc.description,
          date: doc.date,
          tags: doc.tags,
          status: doc.status,
          youtubeUrl: doc.youtubeUrl,
          image: doc.image,
          content: doc.content,

          ...(isResearch
            ? {
                abstract: doc.abstract,
                authors: doc.authors,
                journal: doc.journal,
                conference: doc.conference,
                doi: doc.doi,
                arxiv: doc.arxiv,
                pdf: doc.pdf,
              }
            : {
                github: doc.github,
                demo: doc.demo,
              }),
        }),
      });
    },
  },
});
