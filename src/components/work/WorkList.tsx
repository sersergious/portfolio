'use client';

import { useMemo, useState } from 'react';
import { WorkCard } from '@/components/work/WorkCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/lib/utils';
import type { WorkSummary } from '@/lib/sanity-content';

type Filter = 'all' | 'project' | 'research';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'project', label: 'Projects' },
  { value: 'research', label: 'Research' },
];

export function WorkList({ items }: { items: WorkSummary[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  // Counts come from the full list, so they don't move as you filter.
  const counts = useMemo(
    () => ({
      all: items.length,
      project: items.filter(i => i.kind === 'project').length,
      research: items.filter(i => i.kind === 'research').length,
    }),
    [items]
  );

  const shown =
    filter === 'all' ? items : items.filter(item => item.kind === filter);

  return (
    <div>
      <PageHeader
        title="Work"
        lead="Projects and research papers, newest first."
      >
        {/*
          Toggle buttons, not tabs: there is no panel to switch between, only
          one list that filters in place. daisyUI's `tabs` classes are borrowed
          purely for the look.
        */}
        <div
          role="group"
          aria-label="Filter work"
          className="tabs tabs-box mt-8 w-fit border border-base-content/10"
        >
          {FILTERS.map(option => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
              /*
               * daisyUI dims an inactive tab to 50% of base-content (3.3:1,
               * under the 4.5:1 floor) and separates the active pill from the
               * box by 1.06:1. Both are restated here: /70 for the resting
               * label, and a ring + full-strength colour for the active one.
               */
              className={cn(
                'tab gap-2 transition-colors',
                filter === option.value
                  ? 'bg-base-100 font-medium text-base-content ring-1 ring-base-content/15'
                  : 'text-base-content/70 hover:bg-base-content/5 hover:text-base-content'
              )}
            >
              {option.label}
              <span
                className={cn(
                  'badge badge-sm',
                  filter === option.value
                    ? 'badge-neutral'
                    : 'border-base-content/15 bg-base-content/5 text-base-content/70'
                )}
              >
                {counts[option.value]}
              </span>
            </button>
          ))}
        </div>
      </PageHeader>

      {/* Filtering swaps content with no focus change — announce the result. */}
      <p aria-live="polite" className="sr-only">
        {shown.length} {shown.length === 1 ? 'item' : 'items'} shown
      </p>

      {shown.length > 0 ? (
        <div className="divide-y divide-base-content/15 border-y border-base-content/15">
          {shown.map(item => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-box border border-dashed border-base-content/15 p-8 text-center text-base-content/60">
          {items.length === 0
            ? 'Nothing published yet. Check back soon.'
            : 'Nothing here yet — try another filter.'}
        </p>
      )}
    </div>
  );
}
