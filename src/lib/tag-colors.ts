const TAG_COLORS = [
  'bg-primary/10 text-primary border border-primary/20',
  'bg-secondary/10 text-secondary border border-secondary/20',
  'bg-accent/10 text-accent border border-accent/20',
  'bg-info/10 text-info border border-info/20',
  'bg-success/10 text-success border border-success/20',
  'bg-warning/10 text-warning border border-warning/20',
  'bg-error/10 text-error border border-error/20',
];

export function getTagColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}
