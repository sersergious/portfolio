/** The statuses a work item may carry, split by kind, plus their display labels. */
export type WorkKind = 'project' | 'research';

export const STATUS_BY_KIND = {
  project: ['completed', 'in-progress', 'archived'],
  research: ['published', 'preprint', 'in-review', 'draft'],
} as const;

/** Every legal status, across both kinds. */
export type WorkStatus = (typeof STATUS_BY_KIND)[WorkKind][number];

/** `in-progress` -> `In progress`. */
export function statusLabel(status: string): string {
  return status[0].toUpperCase() + status.slice(1).replace('-', ' ');
}
