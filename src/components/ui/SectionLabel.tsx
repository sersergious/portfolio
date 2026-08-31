import Link from 'next/link';
import { linkVariants } from '@/components/ui/link-variants';
import { cn } from '@/lib/utils';

/** Mono label on a hairline rule — an annotation on a drawing. */
export function SectionLabel({
  children,
  href,
  linkLabel,
  as: Tag = 'h2',
}: {
  children: React.ReactNode;
  href?: string;
  linkLabel?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <Tag className="font-mono text-xs tracking-[0.18em] text-foreground/70 uppercase">
        {children}
      </Tag>
      <span className="h-px flex-1 bg-foreground/15" />
      {href && (
        <Link
          href={href}
          className={cn(linkVariants(), 'font-mono text-xs text-foreground/70')}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
