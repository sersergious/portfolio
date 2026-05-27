import Link from 'next/link'
import { FadeInWhenVisible } from '@/components/transitions'

export function TLDRCard() {
  return (
    <FadeInWhenVisible>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 md:p-8">
          <span className="text-xs font-semibold text-base-content/50 uppercase tracking-widest block mb-3">
            TL;DR
          </span>
          <p className="text-lg md:text-xl leading-relaxed text-base-content/80">
            Senior at the University of Scranton studying{' '}
            <span className="text-primary font-semibold">Computer Science</span> and{' '}
            <span className="text-accent font-semibold">Mathematical Sciences</span>.
            I build things at the intersection of math and software, run hiking retreats,
            serve in Student Government, and lead clubs on campus.{' '}
            <Link href="/about" className="text-primary hover:underline font-medium">
              More about me →
            </Link>
          </p>
        </div>
      </div>
    </FadeInWhenVisible>
  )
}
