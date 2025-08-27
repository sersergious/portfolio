import { HeroTLDR } from '@/components/about/HeroTLDR';
import { AboutOrigin } from '@/components/about/AboutOrigin';
import { Skills } from '@/components/about/Skills';
import { ResearchInterests } from '@/components/about/ResearchInterests';
import { Achievements } from '@/components/about/Achievements';
import { Vision } from '@/components/about/Vision';
import { Philosophy } from '@/components/about/Philosophy';

export function About() {
  return (
    <div className="min-h-screen">
      <HeroTLDR />
      <AboutOrigin />
      <Skills />
      <ResearchInterests />
      <Achievements />
      <Philosophy />
      <Vision />
    </div>
  );
}
