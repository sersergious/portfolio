'use client';

import { useMemo, useState } from 'react';
import { WorkCard } from '@/components/work/WorkCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { ToggleGroupItem } from '@/components/ui/toggle';
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
          only one list that filters in place. The pressed item keeps the
          default button fill while the rest go ghost, so both states sit at
          full foreground and need no contrast patching.

          Base UI supplies roving arrow-key focus and `data-pressed`, which the
          hand-rolled `aria-pressed` version did not have. Deselecting is
          ignored: this is a filter, so something is always selected.
        */}
        <ToggleGroup
          aria-label="Filter work"
          value={[filter]}
          onValueChange={next => {
            if (next.length > 0) setFilter(next[0] as Filter);
          }}
          className="mt-8 inline-flex items-stretch"
        >
          {FILTERS.map(option => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              pressed={filter === option.value}
            >
              {option.label}
              <Badge>{counts[option.value]}</Badge>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </PageHeader>

      {/* Cards are h3s; without this the page would jump h1 -> h3. */}
      <h2 className="sr-only">Work items</h2>

      {/* Filtering swaps content with no focus change — announce the result. */}
      <p aria-live="polite" className="sr-only">
        {shown.length} {shown.length === 1 ? 'item' : 'items'} shown
      </p>

      {shown.length > 0 ? (
        <div className="divide-y divide-border border-y border-border">
          {shown.map(item => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-subtle-foreground">
          {items.length === 0
            ? 'Nothing published yet. Check back soon.'
            : 'Nothing here yet — try another filter.'}
        </p>
      )}
    </div>
  );
}
