import { BookOpen } from 'lucide-react';
import { ClientPageHeader } from '@/components/content/ClientPageHeader';

export function ResearchPageHeader() {
  return (
    <ClientPageHeader
      title="Research"
      description="Here I will publish all of my research work I've done."
      icon={<BookOpen className="h-8 w-8 text-primary" />}
    />
  );
}
