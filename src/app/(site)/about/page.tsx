import type { Metadata } from 'next';
import { About } from '@/components/about/About';

export const metadata: Metadata = {
  title: 'Serhii Kuzmin - About',
  description: 'Learn more about Serhii Kuzmi.',
};

export default function AboutPage() {
  return <About />;
}
