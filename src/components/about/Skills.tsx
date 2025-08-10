// components/about/Skills.tsx
import { Code, Brain, Cog } from "lucide-react";
import {
  FadeInWhenVisible,
  StaggerContainer,
  StaggerItem,
  FadeInScroll,
} from "@/components/transitions";

export function Skills() {
  const skills = [
    { name: "JavaScript/TypeScript", level: 90, color: "bg-gb-blue" },
    { name: "Java", level: 90, color: "bg-gb-purple" },
    { name: "Python", level: 80, color: "bg-gb-green" },
    { name: "C", level: 80, color: "bg-gb-aqua" },
    { name: "Go", level: 50, color: "bg-gb-orange" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible direction="up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Cog className="w-8 h-8 text-shadow-emerald-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Skills & Expertise
            </h2>
          </div>

          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            I'm well versed in both Computer Science and Mathematics. Most of my
            programming skills I've mastered on my own through self study and
            then further improved in my college classes.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible direction="up" delay={0.2}>
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Software Development Skills */}
            <FadeInScroll>
              <div className="bg-card border border-border rounded-lg p-6 h-full">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Software Development
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Web development (Next.js, React, Node.js)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Database design and optimization (PostgreSQL, SQLite)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Docker and Git</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Systems design</span>
                  </li>
                </ul>
              </div>
            </FadeInScroll>

            {/* Mathematical Expertise */}
            <FadeInScroll>
              <div className="bg-card border border-border rounded-lg p-6 h-full">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  Mathematical Expertise
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Applied Combinatorics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Calculus & Linear Algebra</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Mathematical Proofwriting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Cryptographic protocols</span>
                  </li>
                </ul>
              </div>
            </FadeInScroll>

            {/* Programming Languages Progress Bars */}
            <FadeInScroll>
              <div className="bg-card border border-border rounded-lg p-6 h-full">
                <h3 className="text-xl font-semibold mb-4">
                  Programming Languages
                </h3>
                <StaggerContainer className="space-y-4">
                  {skills.map((skill, index) => (
                    <StaggerItem key={index} delay={index * 0.05}>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${skill.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeInScroll>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
