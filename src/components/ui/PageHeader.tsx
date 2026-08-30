/**
 * The masthead for a top-level page. Same type scale as a work detail page, so
 * /work and /about read as siblings of the pages they lead into rather than as
 * a different kind of document.
 *
 * The graph-paper backdrop is the home page's device, reused: it marks the top
 * of a page and fades out before the content starts.
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
    <header className="relative isolate pt-12 pb-2 md:pt-16">
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute top-0 left-1/2 -z-10 h-[26rem] w-screen -translate-x-1/2"
      />

      <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        {title}
      </h1>

      {lead && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-foreground/70 md:text-xl">
          {lead}
        </p>
      )}

      {/* Same treatment as the facts line on a work detail page. */}
      {facts && facts.length > 0 && (
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-foreground/70">
          {facts.map(fact => (
            <span key={fact}>{fact}</span>
          ))}
        </p>
      )}

      {children}
    </header>
  );
}
