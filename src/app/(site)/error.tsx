'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <div className="mt-10 rounded-lg border border-border p-12 text-center">
      <p className="font-mono text-xs text-muted-foreground">Error</p>
      <h1 className="mt-2 text-xl font-semibold">This page didn’t load</h1>
      <p className="mt-2 text-subtle-foreground">
        Something went wrong rendering this page. Trying again sometimes works.
      </p>
      {error.digest && (
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Reference: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className={cn(buttonVariants({ variant: 'primary' }), 'mt-6')}
      >
        Try again
      </button>
    </div>
  );
}
