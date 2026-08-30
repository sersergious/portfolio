import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { buttonVariants } from '@/components/ui/button';
import { linkVariants } from '@/components/ui/link-variants';
import { badgeVariants } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { languageColor } from '@/lib/languages';
import { formatDate } from '@/lib/utils';
import { statusLabel } from '@/lib/work-status';
import type { WorkItem } from '@/lib/work-content';

export function ContentHeader({ item }: { item: WorkItem }) {
  const [language, ...topics] = item.tags ?? [];

  const actions = [
    item.github && { href: item.github, label: 'View code' },
    item.demo && { href: item.demo, label: 'Open demo', primary: true },
    item.pdf && { href: item.pdf, label: 'Read PDF', primary: true },
    item.doi && { href: `https://doi.org/${item.doi}`, label: 'DOI' },
    // Both fields hold a bare identifier, not a URL — prefix them the same way.
    item.arxiv && {
      href: `https://arxiv.org/abs/${item.arxiv}`,
      label: 'arXiv',
    },
  ].filter(Boolean) as { href: string; label: string; primary?: boolean }[];

  return (
    <>
      <header className="pt-12 md:pt-16">
        <Link
          href="/work"
          className={cn(
            linkVariants(),
            'font-mono text-xs tracking-[0.18em] text-foreground/70 uppercase'
          )}
        >
          ← All work
        </Link>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          {item.title}
        </h1>

        {/* A paper is introduced by its authors, a project by what it does. */}
        {item.kind === 'research' && item.authors && item.authors.length > 0 ? (
          <p className="mt-6 text-lg leading-relaxed text-foreground/70">
            {item.authors.join(', ')}
          </p>
        ) : (
          item.description && (
            <p className="mt-6 text-lg leading-relaxed text-foreground/70 md:text-xl">
              {item.description}
            </p>
          )
        )}

        {/* Facts, in the same mono voice as the hero credentials line. */}
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-foreground/70">
          {language && (
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: languageColor(language) }}
              />
              {language}
            </span>
          )}
          <span>{statusLabel(item.status)}</span>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          {item.journal && <span>{item.journal}</span>}
          {item.conference && <span>{item.conference}</span>}
        </p>

        {topics.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {topics.map(topic => (
              <li key={topic} className={badgeVariants({ variant: 'soft' })}>
                {topic}
              </li>
            ))}
          </ul>
        )}

        {actions.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {actions.map(action => (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: action.primary ? 'primary' : 'default',
                })}
              >
                {action.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {item.abstract && (
        <section className="pt-14">
          <SectionLabel>Abstract</SectionLabel>
          <p className="text-base leading-relaxed">{item.abstract}</p>
        </section>
      )}
    </>
  );
}
