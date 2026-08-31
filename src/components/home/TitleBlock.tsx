import { IDENTITY, STATUS } from '@/lib/profile';

/**
 * The title block.
 *
 * On an engineering drawing this is the ruled panel across the bottom of the
 * sheet that says what the sheet is: who drew it, where, to what standard. The
 * hero is the sheet, so the same information belongs in the same place, in the
 * same cells, in the drawing's own voice.
 *
 * It replaces two scattered mono lines — an "Available for hire" row floating
 * above the h1 and a run-on credentials line below the paragraph — rather than
 * adding a device on top of them. Every field is true; there are no revision
 * numbers or scales invented to make it look more like a drawing.
 */
export function TitleBlock({ className }: { className?: string }) {
  return (
    <dl
      className={[
        'grid grid-cols-1 divide-y divide-border overflow-hidden rounded-lg border border-border',
        'sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4',
        'sm:[&>*:nth-child(n+3)]:border-t lg:[&>*:nth-child(n+3)]:border-t-0',
        'sm:[&>*:nth-child(even)]:border-l lg:[&>*]:border-l lg:[&>*:first-child]:border-l-0',
        '[&>*]:border-border',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {IDENTITY.map(field => (
        <Cell key={field.label} label={field.label}>
          {field.value}
        </Cell>
      ))}
      <Cell label="Status">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block aspect-square h-2 w-2 rounded-2xl bg-[var(--success-value)]"
          />
          {STATUS}
        </span>
      </Cell>
    </dl>
  );
}

/** One ruled cell: the field name above the value, as a drawing labels them. */
function Cell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-3">
      <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-subtle-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-xs text-muted-foreground">
        {children}
      </dd>
    </div>
  );
}
