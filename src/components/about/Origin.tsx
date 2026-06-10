import Image from 'next/image';
import { Zap } from 'lucide-react';

export function Origin() {
  return (
    <section className="pt-32 md:pt-40 pb-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-center gap-4 mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full shrink-0">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Origin Story</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text — left on desktop, bottom on mobile */}
          <div className="order-2 lg:order-1 space-y-4">
            <p className="text-lg text-base-content/70 leading-relaxed">
              Since early childhood, I&apos;ve been passionate about technology
              and have always enjoyed tinkering with computers to understand how
              they work. This sparked my interest in coding, and I started
              programming at age 13. I&apos;ve since worked on a variety of
              projects, including web applications and mobile apps.
            </p>
            <p className="text-lg text-base-content/70 leading-relaxed">
              My love for mathematics has been equally defining — since age 5,
              I&apos;ve actively participated in various mathematical
              conferences and olympiads. As a testament to my combined
              background, I graduated from the University of Scranton with a
              degree in Computer Science and Mathematical Sciences.
            </p>
          </div>

          {/* Image — right on desktop, top on mobile */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative aspect-square w-full max-w-120 rounded-2xl overflow-hidden">
              <Image
                src="/images/about-origin.png"
                alt="Serhii Kuzmin"
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
