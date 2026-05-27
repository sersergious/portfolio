import { Hero } from '@/components/home/Hero';
import { TLDRCard } from '@/components/home/TLDRCard';
import { RecentWork } from '@/components/home/RecentWork';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <TLDRCard />
      <RecentWork />
    </div>
  );
}
