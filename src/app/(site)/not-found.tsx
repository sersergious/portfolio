import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mt-10 rounded-box border border-base-content/15 p-12 text-center">
      <p className="font-mono text-xs tracking-[0.18em] text-base-content/70">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 text-base-content/70">
        The link may be outdated, or the page moved.
      </p>
      <Link href="/" className="btn btn-sm btn-primary mt-6">
        Back to overview
      </Link>
    </div>
  );
}
