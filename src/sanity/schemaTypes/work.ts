import {
  defineType,
  defineField,
  defineArrayMember,
  type ConditionalPropertyCallbackContext,
} from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';
import {
  STATUS_BY_KIND,
  statusLabel,
  type WorkKind,
} from '../../lib/work-status';

const onlyFor =
  (kind: WorkKind) =>
  ({ document }: ConditionalPropertyCallbackContext) =>
    document?.kind !== kind;

export const work = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'project', title: 'Project' },
    { name: 'research', title: 'Research' },
  ],
  fields: [
    defineField({
      name: 'kind',
      type: 'string',
      description: 'Drives which fields below apply, and how the card renders.',
      options: {
        list: [
          { title: 'Project', value: 'project' },
          { title: 'Research', value: 'research' },
        ],
        layout: 'radio',
      },
      initialValue: 'project',
      validation: r => r.required(),
      group: 'content',
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: r => r.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: r => r.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description:
        'One or two sentences. Used for the page meta description and the related-work list.',
      validation: r => r.required(),
      group: 'content',
    }),
    defineField({
      name: 'date',
      type: 'date',
      validation: r => r.required(),
      group: 'content',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      description:
        'First tag is the primary language or field — it drives the colour dot.',
      of: [defineArrayMember({ type: 'string' })],
      group: 'content',
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed (project)', value: 'completed' },
          { title: 'In progress (project)', value: 'in-progress' },
          { title: 'Archived (project)', value: 'archived' },
          { title: 'Published (research)', value: 'published' },
          { title: 'Preprint (research)', value: 'preprint' },
          { title: 'In review (research)', value: 'in-review' },
          { title: 'Draft (research)', value: 'draft' },
        ],
      },
      initialValue: 'completed',
      validation: r =>
        r.required().custom((value, ctx) => {
          const kind = (ctx.document?.kind as WorkKind) ?? 'project';
          const allowed: readonly string[] = STATUS_BY_KIND[kind];
          return (
            allowed.includes(value as string) ||
            `"${value}" is not a ${kind} status. Pick one of: ${allowed.join(', ')}.`
          );
        }),
      group: 'content',
    }),
    defineField({
      name: 'youtubeUrl',
      type: 'url',
      title: 'YouTube Video URL',
      group: 'content',
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Studio thumbnail only — not rendered on the site.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alternative Text' }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content (Markdown)',
      type: 'text',
      group: 'content',
    }),

    // Project-only
    defineField({
      name: 'github',
      type: 'url',
      hidden: onlyFor('project'),
      group: 'project',
    }),
    defineField({
      name: 'demo',
      type: 'url',
      hidden: onlyFor('project'),
      group: 'project',
    }),

    // Research-only
    defineField({
      name: 'abstract',
      type: 'text',
      rows: 4,
      hidden: onlyFor('research'),
      group: 'research',
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      hidden: onlyFor('research'),
      group: 'research',
    }),
    defineField({
      name: 'journal',
      type: 'string',
      hidden: onlyFor('research'),
      group: 'research',
    }),
    defineField({
      name: 'conference',
      type: 'string',
      hidden: onlyFor('research'),
      group: 'research',
    }),
    defineField({
      name: 'doi',
      type: 'string',
      title: 'DOI',
      hidden: onlyFor('research'),
      group: 'research',
    }),
    defineField({
      name: 'arxiv',
      type: 'string',
      title: 'arXiv ID',
      hidden: onlyFor('research'),
      group: 'research',
    }),
    defineField({
      name: 'pdf',
      type: 'url',
      title: 'PDF URL',
      hidden: onlyFor('research'),
      group: 'research',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', kind: 'kind', status: 'status', media: 'image' },
    prepare: ({ title, kind, status, media }) => ({
      title,
      subtitle: `${kind === 'research' ? 'Research' : 'Project'} · ${statusLabel(status)}`,
      media,
    }),
  },
});
