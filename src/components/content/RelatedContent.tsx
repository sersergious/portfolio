import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { Project, ResearchPaper } from '@/lib/sanity-content';

interface RelatedContentProps {
  title: string;
  items: (Project | ResearchPaper)[];
  type: 'project' | 'research';
}

export function RelatedContent({ title, items, type }: RelatedContentProps) {
  if (items.length === 0) return null;

  const getItemDescription = (item: Project | ResearchPaper): string => {
    if ('abstract' in item) return item.abstract;
    return item.description;
  };

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.slug} className="h-full">
            <div className="bg-base-100 border border-base-300 rounded-xl h-full flex flex-col">
              <Link
                href={`/${type}/${item.slug}`}
                className="flex flex-col flex-1"
              >
                <div className="p-6 space-y-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-base-content/60 line-clamp-3">
                    {getItemDescription(item)}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-base-content/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    {item.readingTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.readingTime}
                      </div>
                    )}
                  </div>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="badge badge-ghost text-xs">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="text-xs text-base-content/60">
                          +{item.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
