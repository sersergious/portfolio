'use client';

import { Button } from '@/components/ui/button';

/**
 * Catches a failed render inside the site shell. Content is read from the
 * filesystem at build time, so this is a render bug rather than a fetch that
 * flaked — `reset()` re-runs the segment, and the digest is what to report.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-10 rounded-lg border border-foreground/15 p-12 text-center">
      <p className="font-mono text-xs text-foreground/70">Error</p>
      <h1 className="mt-2 text-xl font-semibold">This page didn’t load</h1>
      <p className="mt-2 text-foreground/60">
        Something went wrong rendering this page. Trying again sometimes works.
      </p>
      {error.digest && (
        <p className="mt-4 font-mono text-xs text-foreground/70">
          Reference: {error.digest}
        </p>
      )}
      <Button type="button" variant="primary" onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  );
}
