// =======================================
// components/content/ProjectCard.tsx
// =======================================

import Link from 'next/link'
import Image from 'next/image'
import {
    Calendar,
    ExternalLink,
    Github,
    Tag
} from 'lucide-react'
import { notionUtils } from '@/lib/notion'

export interface Project {
  slug: string
  meta: {
    title: string
    description: string
    date: string
    tags: string[]
    image?: string
    github?: string
    demo?: string
    status?: 'completed' | 'in-progress' | 'archived'
    featured?: boolean
  }
}

interface ProjectCardProps {
  project: Project
  variant?: 'default' | 'featured' | 'compact'
}

export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const { slug, meta } = project

  if (variant === 'compact') {
    return (
      <Link
        href={`/projects/${slug}`}
        className="group block p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-sm"
      >
        <div className="flex items-start gap-3">
          {meta.image && (
            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted">
              <Image
                src={meta.image}
                alt={meta.title}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {meta.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {meta.description}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{notionUtils.formatDate(meta.date)}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/projects/${slug}`}
        className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
      >
        {/* Featured Image */}
        {meta.image && (
          <div className="aspect-video bg-muted overflow-hidden">
            <Image
              src={meta.image}
              alt={meta.title}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-6">
          {/* Status Badge */}
          {meta.status && (
            <div className="mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(meta.status)}`}>
                {meta.status === 'in-progress' ? 'In Progress' :
                 meta.status === 'completed' ? 'Completed' : 'Archived'}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {meta.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {meta.description}
          </p>

          {/* Tags */}
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {meta.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {meta.tags.length > 3 && (
                <span className="text-xs text-muted-foreground px-2.5 py-1">
                  +{meta.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{notionUtils.formatDate(meta.date)}</span>
            </div>

            <div className="flex items-center gap-2">
              {meta.github && (
                <Github className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              )}
              {meta.demo && (
                <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary/50"
    >
      {/* Project Image */}
      {meta.image && (
        <div className="aspect-video bg-muted overflow-hidden">
          <Image
            src={meta.image}
            alt={meta.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5">
        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {meta.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {meta.description}
        </p>

        {/* Tags */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {meta.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {meta.tags.length > 2 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{meta.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>{notionUtils.formatDate(meta.date)}</span>
          </div>

          <div className="flex items-center gap-2">
            {meta.github && (
              <Github className="w-3 h-3 opacity-60" />
            )}
            {meta.demo && (
              <ExternalLink className="w-3 h-3 opacity-60" />
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

// Helper function for status badge colors
function getStatusClasses(status: string) {
  const statusMap = {
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'archived': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
  return statusMap[status as keyof typeof statusMap] || statusMap.completed
}