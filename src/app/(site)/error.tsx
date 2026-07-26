'use client';

/**
 * Catches a failed render inside the site shell — in practice a Sanity fetch
 * that threw during an ISR revalidate. `reset()` re-runs the segment, which is
 * usually enough when the CMS was briefly unreachable.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-10 rounded-box border border-base-content/15 p-12 text-center">
      <p className="font-mono text-xs text-base-content/70">Error</p>
      <h1 className="mt-2 text-xl font-semibold">This page didn&apos;t load</h1>
      <p className="mt-2 text-base-content/60">
        The content couldn&apos;t be fetched. Trying again usually works.
      </p>
      {error.digest && (
        <p className="mt-4 font-mono text-xs text-base-content/50">
          Reference: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="btn btn-sm btn-primary mt-6"
      >
        Try again
      </button>
    </div>
  );
}
