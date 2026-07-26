import type { Metadata } from 'next';
import { socialMetadata } from '@/lib/site';
import { About } from '@/components/about/About';

const description =
  'From maths olympiads in Ukraine to backend and systems engineering in Pennsylvania.';

export const metadata: Metadata = {
  title: 'About',
  description,
  ...socialMetadata({ title: 'About', description, path: '/about' }),
};

export default function AboutPage() {
  return <About />;
}
