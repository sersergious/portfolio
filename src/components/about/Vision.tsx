import { Rocket, Code, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FadeInWhenVisible } from '@/components/transitions'

export function Vision() {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <div className="max-w-4xl mx-auto text-center">
            <Rocket className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking Forward</h2>
            <p className="text-lg text-base-content/60 leading-relaxed mb-8">
              My goal is to pursue a PhD at the intersection of applied mathematics and computer
              science, focusing on AI, quantum computing, and cryptography. I believe these
              fields hold the key to solving humanity&apos;s greatest challenges — from curing
              diseases to expanding our understanding of the universe itself.
            </p>
            <p className="text-xl font-medium mb-12">
              I want to build technologies that don&apos;t just solve today&apos;s problems, but create
              possibilities we haven&apos;t even imagined yet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <Code className="w-5 h-5" />
                View My Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
