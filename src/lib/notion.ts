export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'quote'
  | 'code'
  | 'divider'
  | 'image'
  | 'video'
  | 'callout'
  | 'toggle'
  | 'to_do'

export interface NotionBlock {
  id: string
  type: NotionBlockType
  content: string
  properties?: {
    title?: string
    url?: string
    checked?: boolean
    language?: string
    icon?: string
    color?: string
    caption?: string
  }
  children?: NotionBlock[]
}

// Notion page interface
export interface NotionPageData {
  id: string
  title: string
  description?: string
  coverImage?: string
  icon?: string
  properties: {
    [key: string]: never
  }
  blocks: NotionBlock[]
  lastEdited: string
  createdDate: string
}

// Utility functions for Notion-style formatting
export const notionUtils = {
  // Format date in Notion style
  formatDate: (date: string | Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  },

  // Generate reading time estimate
  getReadingTime: (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const readingTime = Math.ceil(words / wordsPerMinute)
    return `${readingTime} min read`
  },

  // Generate page slug from title
  generateSlug: (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  },

  // Extract text from blocks for search/preview
  extractTextFromBlocks: (blocks: NotionBlock[]): string => {
    return blocks
      .map(block => block.content)
      .join(' ')
      .substring(0, 200)
  },

  // Get color classes for Notion-style callouts
  getCalloutClasses: (color?: string) => {
    const colorMap = {
      gray: 'bg-muted border-border text-foreground',
      brown: 'bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-100',
      orange: 'bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-100',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100',
      green: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100',
      blue: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100',
      purple: 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-100',
      pink: 'bg-pink-50 border-pink-200 text-pink-900 dark:bg-pink-950 dark:border-pink-800 dark:text-pink-100',
      red: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.gray
  }
}