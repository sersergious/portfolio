import { defineType, defineField, defineArrayMember } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const researchPaper = defineType({
  name: 'researchPaper',
  title: 'Research Paper',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'abstract',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'date',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Preprint', value: 'preprint' },
          { title: 'In Review', value: 'in-review' },
          { title: 'Draft', value: 'draft' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({ name: 'journal', type: 'string' }),
    defineField({ name: 'conference', type: 'string' }),
    defineField({ name: 'volume', type: 'string' }),
    defineField({ name: 'pages', type: 'string', title: 'Pages' }),
    defineField({ name: 'doi', type: 'string', title: 'DOI' }),
    defineField({ name: 'arxiv', type: 'string', title: 'arXiv ID' }),
    defineField({ name: 'pdf', type: 'url', title: 'PDF URL' }),
    defineField({ name: 'youtubeUrl', type: 'url', title: 'YouTube Video URL' }),
    defineField({ name: 'citations', type: 'number' }),
    defineField({
      name: 'awards',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content (Markdown)',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'image' },
  },
})
