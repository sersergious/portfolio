/**
 * The statuses a work item may carry, split by kind, plus their display labels.
 * Nothing validates frontmatter at build time, so `statusLabel` echoes back an
 * unknown value rather than throwing.
 */
export type WorkKind = 'project' | 'research';

export const STATUS_BY_KIND = {
  project: ['completed', 'in-progress', 'archived'],
  research: ['published', 'preprint', 'in-review', 'draft'],
} as const;

/** Every legal status, across both kinds. */
export type WorkStatus = (typeof STATUS_BY_KIND)[WorkKind][number];

const STATUS_LABEL: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  archived: 'Archived',
  published: 'Published',
  preprint: 'Preprint',
  'in-review': 'In review',
  draft: 'Draft',
};

export function statusLabel(status: string): string {
  return STATUS_LABEL[status] ?? status;
}
