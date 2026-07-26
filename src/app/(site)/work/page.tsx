import type { Metadata } from 'next';
import { socialMetadata } from '@/lib/site';
import { getAllWork } from '@/lib/sanity-content';
import { WorkList } from '@/components/work/WorkList';

const description =
  'Projects and research — development work from web applications to research tools, and papers in AI and quantum computing.';

export const metadata: Metadata = {
  title: 'Work',
  description,
  ...socialMetadata({ title: 'Work', description, path: '/work' }),
};

export default async function WorkPage() {
  const items = await getAllWork();
  return <WorkList items={items} />;
}
