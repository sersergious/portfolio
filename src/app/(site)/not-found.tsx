import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="mt-10 rounded-lg border border-border p-12 text-center">
      <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        This page doesn’t exist
      </h1>
      <p className="mt-3 text-muted-foreground">
        The link may be outdated, or the page moved.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'primary' }), 'mt-6')}
      >
        Back to overview
      </Link>
    </div>
  );
}
