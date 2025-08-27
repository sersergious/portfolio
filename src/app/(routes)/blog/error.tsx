// Blog Error (app/blog/error.tsx)
'use client';
import { ErrorDisplay } from '@/components/ui/error-display';

export default function BlogError({
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
      title="Blog Error"
      description="We encountered an error while loading the blog. This could be temporary, so please try again."
      backLink={{
        href: '/blog',
        label: 'Back to Blog',
      }}
    />
  );
}
