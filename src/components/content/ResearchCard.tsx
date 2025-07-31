// =======================================
// components/content/ResearchCard.tsx
// =======================================

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Download, ExternalLink, FileText, Users, Award, BookOpen, Quote } from 'lucide-react'
import { notionUtils } from '@/lib/notion'

export interface ResearchPaper {
  slug: string
  meta: {
    title: string
    abstract: string
    authors: string[]
    date: string
    journal?: string
    conference?: string
    volume?: string
    pages?: string
    doi?: string
    arxiv?: string
    pdf?: string
    tags: string[]
    image?: string
    status: 'published' | 'preprint' | 'in-review' | 'draft'
    citations?: number
    awards?: string[]
    featured?: boolean
  }
}

interface ResearchCardProps {
  paper: ResearchPaper
  variant?: 'default' | 'featured' | 'compact' | 'citation'
  showAbstract?: boolean
}

export function ResearchCard({ paper, variant = 'default', showAbstract = true }: ResearchCardProps) {
  const { slug, meta } = paper

  if (variant === 'citation') {
    return (
      <div className="group p-4 border border-border rounded-lg hover:border-primary/50 transition-all duration-200 bg-card">
        <div className="flex items-start gap-3">
          <Quote className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground mb-2 line-clamp-2">
              {meta.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {meta.authors.join(', ')} ({new Date(meta.date).getFullYear()})
            </p>
            {meta.journal && (
              <p className="text-sm text-muted-foreground italic">
                {meta.journal}
                {meta.volume && `, ${meta.volume}`}
                {meta.pages && `, ${meta.pages}`}
              </p>
            )}
            <div className="flex items-center gap-4 mt-3">
              {meta.doi && (
                <a
                  href={`https://doi.org/${meta.doi}`}
                  className="text-xs text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DOI: {meta.doi}
                </a>
              )}
              {meta.pdf && (
                <a
                  href={meta.pdf}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-3 h-3" />
                  PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/research/${slug}`}
        className="group block p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-sm bg-card"
      >
        <div className="flex gap-4">
          {meta.image && (
            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
              <Image
                src={meta.image}
                alt={meta.title}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getResearchStatusClasses(meta.status)}`}>
                {getResearchStatusLabel(meta.status)}
              </span>
              {meta.featured && (
                <Award className="w-4 h-4 text-yellow-500" />
              )}
            </div>

            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {meta.title}
            </h3>

            <p className="text-xs text-muted-foreground mb-2">
              {meta.authors.slice(0, 2).join(', ')}
              {meta.authors.length > 2 && ` et al.`}
            </p>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{notionUtils.formatDate(meta.date)}</span>
              </div>
              {meta.citations && (
                <div className="flex items-center gap-1">
                  <Quote className="w-3 h-3" />
                  <span>{meta.citations} citations</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/research/${slug}`}
        className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
      >
        {/* Featured Image */}
        {meta.image && (
          <div className="aspect-[16/10] bg-muted overflow-hidden relative">
            <Image
              src={meta.image}
              alt={meta.title}
              width={800}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getResearchStatusClasses(meta.status)}`}>
                {getResearchStatusLabel(meta.status)}
              </span>
              {meta.featured && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {meta.title}
          </h2>

          {/* Authors */}
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              {meta.authors.join(', ')}
            </p>
          </div>

          {/* Abstract */}
          {showAbstract && (
            <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-4">
              {meta.abstract}
            </p>
          )}

          {/* Publication Info */}
          {(meta.journal || meta.conference) && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium text-foreground">
                  {meta.journal || meta.conference}
                </p>
                {(meta.volume || meta.pages) && (
                  <p className="text-muted-foreground">
                    {meta.volume && `Vol. ${meta.volume}`}
                    {meta.volume && meta.pages && ', '}
                    {meta.pages && `pp. ${meta.pages}`}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {meta.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              {meta.tags.length > 4 && (
                <span className="text-xs text-muted-foreground px-2.5 py-1">
                  +{meta.tags.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{notionUtils.formatDate(meta.date)}</span>
              </div>
              {meta.citations && (
                <div className="flex items-center gap-1">
                  <Quote className="w-4 h-4" />
                  <span>{meta.citations} citations</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {meta.pdf && (
                <Download className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              )}
              {meta.doi && (
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
      href={`/research/${slug}`}
      className="group block bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary/50"
    >
      {/* Paper Image */}
      {meta.image && (
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          <Image
            src={meta.image}
            alt={meta.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5">
        {/* Status & Awards */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getResearchStatusClasses(meta.status)}`}>
            {getResearchStatusLabel(meta.status)}
          </span>
          {meta.awards && meta.awards.length > 0 && (
            <Award className="w-4 h-4 text-yellow-500" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {meta.title}
        </h3>

        {/* Authors */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
          {meta.authors.slice(0, 3).join(', ')}
          {meta.authors.length > 3 && ' et al.'}
        </p>

        {/* Abstract */}
        {showAbstract && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {meta.abstract}
          </p>
        )}

        {/* Publication */}
        {(meta.journal || meta.conference) && (
          <p className="text-xs text-muted-foreground italic mb-3 line-clamp-1">
            {meta.journal || meta.conference}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{notionUtils.formatDate(meta.date)}</span>
            </div>
            {meta.citations && (
              <div className="flex items-center gap-1">
                <Quote className="w-3 h-3" />
                <span>{meta.citations}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {meta.pdf && (
              <FileText className="w-3 h-3 opacity-60" />
            )}
            {meta.doi && (
              <ExternalLink className="w-3 h-3 opacity-60" />
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

// Helper functions for research status
function getResearchStatusClasses(status: string) {
  const statusMap = {
    'published': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'preprint': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'in-review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'draft': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
  return statusMap[status as keyof typeof statusMap] || statusMap.draft
}

function getResearchStatusLabel(status: string) {
  const labelMap = {
    'published': 'Published',
    'preprint': 'Preprint',
    'in-review': 'Under Review',
    'draft': 'Draft'
  }
  return labelMap[status as keyof typeof labelMap] || 'Draft'
}