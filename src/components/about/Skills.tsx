import { Code, Brain, Cog } from 'lucide-react'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/transitions'

const skills = [
  { name: 'JavaScript/TypeScript', level: 90 },
  { name: 'Java', level: 90 },
  { name: 'Python', level: 80 },
  { name: 'C', level: 80 },
  { name: 'Go', level: 50 },
]

export function Skills() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Cog className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg text-base-content/60 text-center max-w-3xl mx-auto mb-12">
              I'm well versed in both Computer Science and Mathematics. Most of my programming
              skills I've mastered on my own through self study and then further improved in my
              college classes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Software Development */}
            <div className="bg-base-100 border border-base-300 rounded-lg p-6 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Software Development
              </h3>
              <ul className="space-y-3 text-base-content/60">
                {[
                  'Web development (Next.js, React, Node.js)',
                  'Database design and optimization (PostgreSQL, SQLite)',
                  'Docker and Git',
                  'Systems design',
                ].map(item => (
                  <li key={item} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mathematical Expertise */}
            <div className="bg-base-100 border border-base-300 rounded-lg p-6 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                Mathematical Expertise
              </h3>
              <ul className="space-y-3 text-base-content/60">
                {[
                  'Applied Combinatorics',
                  'Calculus & Linear Algebra',
                  'Mathematical Proofwriting',
                  'Cryptographic protocols',
                ].map(item => (
                  <li key={item} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programming Languages */}
            <div className="bg-base-100 border border-base-300 rounded-lg p-6 h-full">
              <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
              <StaggerContainer className="space-y-4">
                {skills.map(skill => (
                  <StaggerItem key={skill.name}>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-base-content/60">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
