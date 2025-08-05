import { defineDocumentType, makeSource } from 'contentlayer/source-files'

// Calculate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Project document type
export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    category: { type: 'list', of: { type: 'string' }, default: [] },
    image: { type: 'string', required: false },
    github: { type: 'string', required: false },
    demo: { type: 'string', required: false },
    status: {
      type: 'enum',
      options: ['completed', 'in-progress', 'archived'],
      default: 'completed',
    },
    featured: { type: 'boolean', default: false },
    techStack: { type: 'list', of: { type: 'string' }, default: [] },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('projects/', ''),
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => calculateReadingTime(doc.body.raw),
    },
    wordCount: {
      type: 'number',
      resolve: (doc) => doc.body.raw.trim().split(/\s+/).length,
    },
    url: {
      type: 'string',
      resolve: (doc) => `/projects/${doc._raw.flattenedPath.replace('projects/', '')}`,
    },
  },
}))

// Blog post document type
export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    category: { type: 'string', required: false },
    image: { type: 'string', required: false },
    authorName: { type: 'string', default: 'Serhii Kuzmin' },
    authorAvatar: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => calculateReadingTime(doc.body.raw),
    },
    wordCount: {
      type: 'number',
      resolve: (doc) => doc.body.raw.trim().split(/\s+/).length,
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('blog/', '')}`,
    },
    author: {
      type: 'json',
      resolve: (doc) => ({
        name: doc.authorName || 'Serhii Kuzmin',
        avatar: doc.authorAvatar || undefined,
      }),
    },
  },
}))

// Research paper document type
export const ResearchPaper = defineDocumentType(() => ({
  name: 'ResearchPaper',
  filePathPattern: 'research/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    abstract: { type: 'string', required: true },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    date: { type: 'date', required: true },
    journal: { type: 'string', required: false },
    conference: { type: 'string', required: false },
    volume: { type: 'string', required: false },
    pages: { type: 'string', required: false },
    doi: { type: 'string', required: false },
    arxiv: { type: 'string', required: false },
    pdf: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    image: { type: 'string', required: false },
    status: {
      type: 'enum',
      options: ['published', 'preprint', 'in-review', 'draft'],
      default: 'draft',
    },
    citations: { type: 'number', required: false },
    awards: { type: 'list', of: { type: 'string' }, default: [] },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('research/', ''),
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => calculateReadingTime(doc.body.raw),
    },
    wordCount: {
      type: 'number',
      resolve: (doc) => doc.body.raw.trim().split(/\s+/).length,
    },
    url: {
      type: 'string',
      resolve: (doc) => `/research/${doc._raw.flattenedPath.replace('research/', '')}`,
    },
  },
}))

// Contentlayer source configuration
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, BlogPost, ResearchPaper],
})
