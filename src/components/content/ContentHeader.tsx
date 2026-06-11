import Link from 'next/link';
import type { Project, ResearchPaper } from '@/lib/sanity-content';

type Content = Project | ResearchPaper;

interface ContentHeaderProps {
  content: Content;
  type: 'project' | 'research';
}

const config = {
  project: { backLink: '/projects', backText: 'All Projects' },
  research: { backLink: '/research', backText: 'All Research' },
};

export function ContentHeader({ content, type }: ContentHeaderProps) {
  const { backLink, backText } = config[type];

  const isResearch = 'abstract' in content;
  const paper = isResearch ? (content as ResearchPaper) : null;
  const project = !isResearch ? (content as Project) : null;

  return (
    <div className="pt-32 md:pt-40 pb-8 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={backLink}
            className="inline-flex items-center gap-1 text-sm text-base-content/60 hover:text-base-content transition-colors mb-4"
          >
            ← {backText}
          </Link>

          <div className="bg-base-200 border border-base-300 rounded-2xl p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {content.title}
            </h1>

            <p className="text-lg text-base-content/70 leading-relaxed mb-6">
              {project?.description ?? paper?.abstract}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-base-content/60 mb-6">
              {paper && (
                <span>{paper.authors.join(', ')}</span>
              )}
              <span>
                {new Date(content.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {'readingTime' in content && (
                <span>{content.readingTime}</span>
              )}
              {paper?.journal && <span>{paper.journal}</span>}
              {paper?.conference && <span>{paper.conference}</span>}
              {project && (
                <span className="capitalize">{project.status}</span>
              )}
            </div>

            {/* Tags */}
            {'tags' in content && content.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {content.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-base-300 text-base-content/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-base-300">
              {project?.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  GitHub
                </a>
              )}
              {project?.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Live Demo
                </a>
              )}
              {paper?.pdf && (
                <a
                  href={paper.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  View PDF
                </a>
              )}
              {paper?.doi && (
                <a
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  DOI
                </a>
              )}
              {paper?.arxiv && (
                <a
                  href={paper.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  arXiv
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
