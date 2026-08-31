import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    <div className="mb-8 flex items-center gap-4">
      <Tag className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
        {children}
      </Tag>
      <span className="h-px flex-1 bg-border" />
      {href && (
        <Link
          href={href}
          className={cn(
            linkVariants(),
            'inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground'
          )}
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
