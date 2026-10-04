import Link from 'next/link';
import { ExternalLink, PlayCircle, FolderGit2, ScrollText } from 'lucide-react';
import { Github } from '@/components/icons/brand-icons';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { languageColor } from '@/lib/languages';
import { statusLabel } from '@/lib/work-status';
import type { WorkSummary } from '@/lib/work-content';

const KIND_ICON = {
  project: FolderGit2,
  research: ScrollText,
} as const;

export function WorkCard({ item }: { item: WorkSummary }) {
  // First tag is the primary language (project) or field (research).
  const [language, ...topics] = item.tags;
  const isResearch = item.kind === 'research';
  const Icon = KIND_ICON[item.kind];
  const venue = item.journal ?? item.conference;

  return (
    <article className="group relative py-5">
      <div className="flex items-start justify-between gap-2">
        {/* Colour marks the hover target, as in the Press rows — a list of
          always-primary titles spends the accent on nothing. */}
        <h3 className="flex min-w-0 items-start gap-2 font-semibold transition-colors group-hover:text-primary">
          <Icon className="h-4 w-4 shrink-0 translate-y-0.5 text-foreground/50" />
          <Link
            href={item.url}
            className="line-clamp-2 hover:underline before:absolute before:inset-0 before:content-['']"
          >
            {item.title}
          </Link>
        </h3>
        <Badge className="shrink-0">{statusLabel(item.status)}</Badge>
      </div>

      {/* Research leads with its authors; a project leads with what it is. */}
      {isResearch ? (
        <>
          {item.authors && item.authors.length > 0 && (
            <p className="mt-2 line-clamp-1 text-subtle-foreground">
              {item.authors.join(', ')}
            </p>
          )}
          {venue && (
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
              {venue}
            </p>
          )}
        </>
      ) : (
        <p className="mt-2 line-clamp-2 text-subtle-foreground">
          {item.description}
        </p>
      )}

      {topics.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {topics.slice(0, 3).map(topic => (
            <li key={topic} className={badgeVariants({ variant: 'soft' })}>
              {topic}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-subtle-foreground">
        {language && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: languageColor(language) }}
            />
            {language}
          </span>
        )}
        <span>{item.date.slice(0, 4)}</span>
        {item.github && (
          <MetaLink href={item.github} icon={Github} label="Code" />
        )}
        {item.demo && (
          <MetaLink href={item.demo} icon={ExternalLink} label="Demo" />
        )}
        {item.youtubeUrl && (
          <MetaLink href={item.youtubeUrl} icon={PlayCircle} label="Video" />
        )}
      </div>
    </article>
  );
}

/** Sits above the card's overlay link so it stays independently clickable. */
function MetaLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 flex items-center gap-1 hover:text-foreground"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}
