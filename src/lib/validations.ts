// =======================================
// lib/validations.ts - Form validations
// =======================================

import { z } from 'zod'

// Contact form validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),

  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),

  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),

  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Newsletter subscription validation
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),

  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .optional(),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Comment form validation
export const commentSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),

  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),

  comment: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(2000, 'Comment must be less than 2000 characters'),
})

export type CommentData = z.infer<typeof commentSchema>

// Search validation
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query cannot be empty')
    .max(200, 'Search query must be less than 200 characters')
    .regex(/^[a-zA-Z0-9\s\-_.,!?]+$/, 'Search query contains invalid characters'),

  type: z
    .enum(['all', 'projects', 'blog', 'research'])
    .default('all'),

  tags: z
    .array(z.string())
    .optional(),
})

export type SearchData = z.infer<typeof searchSchema>

// Chat message validation
export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),

  conversationId: z
    .string()
    .uuid()
    .optional(),
})

export type ChatMessageData = z.infer<typeof chatMessageSchema>

// Portfolio content validation
export const projectMetaSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  date: z.string().datetime(),
  tags: z.array(z.string()),
  image: z.string().url().optional(),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
  featured: z.boolean().default(false),
})

export const blogMetaSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  date: z.string().datetime(),
  tags: z.array(z.string()),
  image: z.string().url().optional(),
  category: z.string().max(50).optional(),
  author: z.object({
    name: z.string().min(1).max(100),
    avatar: z.string().url().optional(),
  }).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
})

export const researchMetaSchema = z.object({
  title: z.string().min(1).max(300),
  abstract: z.string().min(1).max(2000),
  authors: z.array(z.string().min(1)),
  date: z.string().datetime(),
  journal: z.string().max(200).optional(),
  conference: z.string().max(200).optional(),
  volume: z.string().max(50).optional(),
  pages: z.string().max(50).optional(),
  doi: z.string().max(100).optional(),
  arxiv: z.string().max(50).optional(),
  pdf: z.string().url().optional(),
  tags: z.array(z.string()),
  image: z.string().url().optional(),
  status: z.enum(['published', 'preprint', 'in-review', 'draft']).default('draft'),
  citations: z.number().min(0).optional(),
  awards: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
})

// Utility functions for validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '')
}

export const validateSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}