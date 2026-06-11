import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllProjects, getAllResearch } from '@/lib/sanity-content';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ResearchCard } from '@/components/research/ResearchCard';

function SectionHeader({
  label,
  title,
  href,
}: {
  label: string;
  title: string;
  href: string;
}) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <span className="text-xs font-semibold text-base-content/40 uppercase tracking-widest block mb-1">
          {label}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      <Link
        href={href}
        className="flex items-center gap-1 text-sm text-primary hover:underline font-medium"
      >
        View all <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export async function RecentWork() {
  const [allProjects, allResearch] = await Promise.all([
    getAllProjects(),
    getAllResearch(),
  ]);
  const recentProjects = allProjects.slice(0, 3);
  const recentResearch = allResearch.slice(0, 3);

  return (
    <div className="mt-12">
      <div className="container mx-auto px-4 py-16 max-w-7xl space-y-16">
        {/* Recent Projects */}
        <div>
          <SectionHeader
            label="Recent Work"
            title="Projects"
            href="/projects"
          />
          <div className="space-y-4">
            {recentProjects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        {/* Recent Research */}
        <div>
          <SectionHeader
            label="Recent Work"
            title="Research"
            href="/research"
          />
          <div className="space-y-4">
            {recentResearch.map(paper => (
              <ResearchCard key={paper.slug} paper={paper} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
