/**
 * The masthead for a top-level page. Same type scale as a work detail page, so
 * /work and /about read as siblings of the pages they lead into rather than as
 * a different kind of document.
 */
export function PageHeader({
  title,
  lead,
  facts,
  children,
}: {
  title: string;
  lead?: string;
  /** Scannable orientation, in the same mono voice as a detail page's facts line. */
  facts?: string[];
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-12 pb-2 md:pt-16">
      <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        {title}
      </h1>

      {lead && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
          {lead}
        </p>
      )}

      {/* Same treatment as the facts line on a work detail page. */}
      {facts && facts.length > 0 && (
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          {facts.map(fact => (
            <span key={fact}>{fact}</span>
          ))}
        </p>
      )}

      {children}
    </header>
  );
}
