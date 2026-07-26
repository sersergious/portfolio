import { defineMigration, del } from 'sanity/migrate';
import type { SanityDocument } from 'sanity';

/**
 * Phase 2 of the merge. Destructive — run ONLY after `merge-work` has run and
 * you have confirmed that every item resolves at /work/<slug> and that
 * `count(*[_type == "work"])` matches the old project + researchPaper total.
 *
 *   npx sanity migrations run delete-legacy-types                 # dry run
 *   npx sanity migrations run delete-legacy-types --no-dry-run    # deletes
 *
 * Recovery: npx sanity dataset import ./backup-pre-merge.tar.gz production --replace
 *
 * Afterwards, delete from the codebase:
 *   - src/sanity/schemaTypes/project.ts, researchPaper.ts
 *   - their imports in src/sanity/schemaTypes/index.ts
 *   - the "Legacy (pre-merge)" pane in src/sanity/structure.ts
 */
export default defineMigration({
  title: 'Delete pre-merge project and researchPaper documents',
  documentTypes: ['project', 'researchPaper'],

  migrate: {
    document(doc: SanityDocument) {
      return del(doc._id);
    },
  },
});
