// app/research/error.tsx
'use client';
import { ErrorDisplay } from '@/components/ui/error-display';

export default function ResearchError({
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
      title="Error Loading Content"
      description="We encountered an error while loading the content. This could be temporary, so please try again."
      backLink={{
        href: '/research',
        label: 'Back to Research',
      }}
    />
  );
}
