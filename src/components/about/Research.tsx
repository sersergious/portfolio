import Link from 'next/link';
import Image from 'next/image';
import { Microscope, ArrowRight } from 'lucide-react';

const focusAreas = [
  'Quantum Computing (Primary focus)',
  'Robotics',
  'Artificial Intelligence',
  'Novel Software Engineering Applications',
  'Computational Biology',
  'Aerospace Engineering',
];

export function BackgroundResearch() {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-center gap-4 mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full shrink-0">
            <Microscope className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Research</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text — left on desktop, bottom on mobile */}
          <div className="order-2 lg:order-1 space-y-4">
            <p className="text-lg text-base-content/70 leading-relaxed">
              In the summer of 2025, I had a realization that I wanted to
              explore what research is all about. When I returned to college, I
              quickly found an opportunity to pursue a research project in
              Quantum Computing. After about 8 months, I was able to present my
              first results. Since then, I&apos;ve become passionate about
              researching various fields in Computer Science.
            </p>
            <p className="text-lg text-base-content/70 leading-relaxed">
              My primary focus has been on Quantum Computing, but I&apos;m also
              deeply interested in Robotics, AI, and novel applications of
              Software Engineering. I&apos;m particularly drawn to how Computer
              Science intersects with Computational Biology and Aerospace
              Engineering. These interdisciplinary approaches fascinate me and
              drive my continued exploration of emerging research areas.
            </p>

            <div className="pt-2">
              <h4 className="font-semibold mb-3">Key Focus Areas</h4>
              <ul className="space-y-2">
                {focusAreas.map(area => (
                  <li
                    key={area}
                    className="flex items-center gap-2 text-base-content/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
              >
                View Research
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Image — right on desktop, top on mobile */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative aspect-square w-full max-w-120 rounded-2xl overflow-hidden">
              <Image
                src="/images/about-research.png"
                alt="Presenting research at a conference"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
