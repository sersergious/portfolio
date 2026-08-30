'use client';

import { useMemo, useState } from 'react';
import { WorkCard } from '@/components/work/WorkCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { WorkSummary } from '@/lib/work-content';

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
          A segmented control, not tabs: there is no panel to switch between,
          only one list that filters in place. `join` groups the buttons; the
          selected one keeps the default `btn` fill while the rest go ghost, so
          both states sit at full foreground and need no contrast patching.
        */}
        <div role="group" aria-label="Filter work" className="join mt-8">
          {FILTERS.map(option => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={cn(
                'btn join-item btn-sm gap-2',
                filter !== option.value && 'btn-ghost'
              )}
            >
              {option.label}
              <Badge>{counts[option.value]}</Badge>
            </button>
          ))}
        </div>
      </PageHeader>

      {/* Cards are h3s; without this the page would jump h1 -> h3. */}
      <h2 className="sr-only">Work items</h2>

      {/* Filtering swaps content with no focus change — announce the result. */}
      <p aria-live="polite" className="sr-only">
        {shown.length} {shown.length === 1 ? 'item' : 'items'} shown
      </p>

      {shown.length > 0 ? (
        <div className="divide-y divide-foreground/15 border-y border-foreground/15">
          {shown.map(item => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-foreground/15 p-8 text-center text-foreground/60">
          {items.length === 0
            ? 'Nothing published yet. Check back soon.'
            : 'Nothing here yet — try another filter.'}
        </p>
      )}
    </div>
  );
}
