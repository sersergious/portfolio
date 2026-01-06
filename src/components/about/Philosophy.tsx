// components/about/Philosophy.tsx
import { Heart } from 'lucide-react';
import {
  FadeInWhenVisible,
  FadeInScroll,
} from '@/components/transitions';
import Image from 'next/image';

export function Philosophy() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-10">
        <FadeInWhenVisible direction="up">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="space-y-12">
              {/* What Drives Me */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Heart className="w-12 h-12 text-destructive" />
                  <h3 className="text-2xl font-bold">What Drives Me</h3>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond the code and equations, I'm driven by a deep curiosity
                  about how things work and a desire to push the boundaries of
                  what's possible. Every problem is a puzzle waiting to be
                  solved, every limitation an opportunity for innovation. I
                  believe in the power of technology to amplify human potential
                  and create a better future for all.
                </p>
              </div>

              {/* Who Drives Me */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Heart className="w-12 h-12 text-destructive" />
                  <h3 className="text-2xl font-bold">Who Drives Me</h3>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  My family is my foundation. Everything I do is inspired by
                  them and for them. Their unwavering support fuels my
                  determination to pursue excellence with rigor and curiosity.
                  As someone working at the intersection of Computer Science and
                  Mathematics, I believe that every tool I create and every
                  piece of research I explore holds the potential to
                  meaningfully improve the lives of those around me.
                </p>
              </div>
            </div>

            {/* Right - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/family.png"
                  alt="Family inspiration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
