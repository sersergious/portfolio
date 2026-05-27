'use client';

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Code,
  Download,
  ExternalLink,
  Github,
  Globe,
  Tag,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Project, ResearchPaper } from '@/lib/data';

type Content = Project | ResearchPaper;

interface ContentHeaderProps {
  content: Content;
  type: 'project' | 'research';
}

const contentConfig = {
  project: {
    icon: Code,
    color: 'from-purple-500 to-violet-600',
    backLink: '/projects' as const,
    backText: 'All Projects',
  },
  research: {
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-600',
    backLink: '/research' as const,
    backText: 'All Research',
  },
};

export function ContentHeader({ content, type }: ContentHeaderProps) {
  const config = contentConfig[type];
  const Icon = config.icon;

  const renderMetaItem = (
    IconComponent: React.ElementType,
    label: string | React.ReactNode
  ) => (
    <div className="flex items-center gap-2 text-sm text-base-content/60">
      <IconComponent className="h-4 w-4" />
      <span>{label}</span>
    </div>
  );

  return (
    <header className="relative w-full overflow-hidden border-b border-base-300 bg-base-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-primary opacity-10 blur-xl" />
        <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-accent opacity-10 blur-xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            href={config.backLink}
            className="group inline-flex items-center gap-2 text-sm text-base-content/60 transition-all duration-200 hover:text-base-content hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {config.backText}
          </Link>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div
            className={cn(
              'relative flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-3xl shadow-xl',
              `bg-gradient-to-br ${config.color}`
            )}
          >
            <Icon className="h-12 w-12 text-white" />
          </div>

          <div className="flex-grow">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {content.title}
            </h1>

            <p className="mb-6 max-w-3xl text-lg leading-relaxed text-base-content/60">
              {'description' in content && content.description}
              {'abstract' in content && content.abstract}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-base-300 pt-6">
              {'author' in content &&
                renderMetaItem(
                  User,
                  (content as { author: { name: string } }).author.name
                )}
              {'authors' in content &&
                renderMetaItem(
                  Users,
                  (content as ResearchPaper).authors.join(', ')
                )}
              {renderMetaItem(
                Calendar,
                new Date(content.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              )}
              {'readingTime' in content &&
                renderMetaItem(Clock, content.readingTime)}
            </div>

            {'tags' in content && content.tags && content.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {content.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="badge badge-secondary gap-1.5 px-3 py-1.5"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {'github' in content && (content as Project).github && (
                <a
                  href={(content as Project).github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {'demo' in content && (content as Project).demo && (
                <a
                  href={(content as Project).demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {'pdf' in content && (content as ResearchPaper).pdf && (
                <a
                  href={(content as ResearchPaper).pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm gap-2"
                >
                  <Download className="h-4 w-4" />
                  PDF
                </a>
              )}
              {'doi' in content && (content as ResearchPaper).doi && (
                <a
                  href={`https://doi.org/${(content as ResearchPaper).doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm gap-2"
                >
                  <Globe className="h-4 w-4" />
                  DOI
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
