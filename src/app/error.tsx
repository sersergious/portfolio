// app/error.tsx
'use client';

import { ErrorDisplay } from '@/components/ui/error-display';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorDisplay
      error={error}
      reset={reset}
      title="Page Error"
      description="We encountered an error while loading the page. This could be temporary, so please try again."
      backLink={{
        href: '/',
        label: 'Back to Home',
      }}
    />
  );
}
