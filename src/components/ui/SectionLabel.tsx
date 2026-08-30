import Link from 'next/link';

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
          className="link link-hover font-mono text-xs text-foreground/70"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
