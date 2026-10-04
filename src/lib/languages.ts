// GitHub linguist colors — intentionally theme-independent, like any chart legend.
const LANGUAGE_COLORS: Record<string, string> = {
  // ponytail: only languages that appear; add a linguist colour when a new one does.
  typescript: '#3178c6',
  python: '#3572A5',
  java: '#b07219',
  c: '#555555',
  'c++': '#f34b7d',
  sql: '#e38c00',
};

/**
 * Real linguist color when we know the language, otherwise a hue derived from
 * the tag itself — so a topic keeps the same dot everywhere it appears.
 */
export function languageColor(tag: string): string {
  const known = LANGUAGE_COLORS[tag.toLowerCase()];
  if (known) return known;

  let hash = 0;
  for (const char of tag.toLowerCase()) {
    hash = (hash * 31 + char.charCodeAt(0)) % 360;
  }
  return `hsl(${hash} 58% 52%)`;
}
