import { Origin } from '@/components/about/Origin';
import { BackgroundSWE } from '@/components/about/Background';
import { BackgroundResearch } from '@/components/about/Research';
import { Interests } from '@/components/about/Interests';
import { Philosophy } from '@/components/about/Philosophy';

export function About() {
  return (
    <div className="min-h-screen">
      <Origin />
      <BackgroundSWE />
      <BackgroundResearch />
      <Interests />
      <Philosophy />
    </div>
  );
}
