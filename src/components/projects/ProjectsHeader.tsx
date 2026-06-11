import { Code } from 'lucide-react';
import { ClientPageHeader } from '@/components/content/ClientPageHeader';

export function ProjectsHeader() {
  return (
    <ClientPageHeader
      title="Projects"
      description="Here I publish all of my work I have done or currently working on. More projects are still being finished and prepared for the publication."
      icon={<Code className="h-8 w-8 text-primary" />}
    />
  );
}
