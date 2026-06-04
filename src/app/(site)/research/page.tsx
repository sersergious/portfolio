import type { Metadata } from 'next';
import { getAllResearch } from '@/lib/sanity-content';
import { ResearchPageHeader } from '@/components/research/ResearchPageHeader';
import { ResearchPageClient } from '@/components/research/ResearchPageClient';

export const metadata: Metadata = {
  title: 'Serhii Kuzmin - Research',
  description: 'My research findings in AI and quantum computing',
};

export default async function ResearchPage() {
  const papers = await getAllResearch();
  return (
    <div className="min-h-screen">
      <ResearchPageHeader />
      <ResearchPageClient papers={papers} />
    </div>
  );
}
