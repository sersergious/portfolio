import { ResearchCard } from '@/components/research/ResearchCard';
import type { ResearchPaper } from '@/lib/data';

interface ResearchPageClientProps {
  papers: ResearchPaper[];
}

export function ResearchPageClient({ papers }: ResearchPageClientProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {papers.map(paper => (
            <div key={paper.slug} className="rounded-lg">
              <ResearchCard paper={paper} />
            </div>
          ))}
        </div>

        {papers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔬</div>
            <h3 className="text-2xl font-semibold mb-2">
              No research papers found
            </h3>
            <p className="text-base-content/60">
              New findings and publications are coming soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
