import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * `twMerge` on top of `clsx` — the shape every shadcn component expects, so
 * pasted components resolve their class conflicts instead of emitting both.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date-only string (`2022-08-24`). Those parse as UTC midnight, so
 * formatting them in a behind-UTC timezone would render the previous day.
 */
export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
) {
  return new Date(iso).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    ...options,
  });
}

export function formatYear(iso: string) {
  return formatDate(iso, { year: 'numeric' });
}

/**
 * Embed URL for a YouTube watch/short/embed link, or `null` when the ID can't
 * be read — callers render nothing rather than an `embed/undefined` iframe.
 */
export function youtubeEmbedUrl(url: string | undefined): string | null {
  const id = url?.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  )?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
