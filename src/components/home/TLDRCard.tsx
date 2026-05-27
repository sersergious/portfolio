import Link from 'next/link';
import { FadeInWhenVisible } from '@/components/transitions';

export function TLDRCard() {
  return (
    <FadeInWhenVisible>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 md:p-8">
          <span className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-3">
            TL;DR
          </span>
          <p className="text-lg md:text-xl leading-relaxed text-base-content/80">
            I recently completed my bachelor&apos;s degree in{' '}
            <span className="text-primary font-semibold">Computer Science</span>{' '}
            and{' '}
            <span className="text-accent font-semibold">
              Mathematical Sciences
            </span>
            . I am a multi-faceted individual. I have developed multiple apps
            for various platforms including Web and Mobile (Android). I have
            also conducuted research in Quantum Computing. I have worked as a
            Peer Tutor at my college for 2.5 years tutoring CS and Math. Outside
            of my routine, I am passionate about gym, outdoors and leadership. I
            have led multiple retreat trips at my college. I have also been
            heavily involved with multiple leadership organizations and
            initiatives.{' '}
            <Link
              href="/about"
              className="text-primary hover:underline font-medium"
            >
              To learn more about me →
            </Link>
          </p>
        </div>
      </div>
    </FadeInWhenVisible>
  );
}
