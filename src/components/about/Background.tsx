import { Code, Brain, Layers } from 'lucide-react';

const languages = [
  'Python',
  'Java',
  'C',
  'JavaScript / TypeScript',
  'HTML / CSS',
  'Kotlin',
];

const frameworks = [
  'React',
  'Next.js',
  'Jetpack Compose',
  'Tailwind CSS',
  'FastAPI',
  'NumPy',
  'SciPy',
  'Qiskit',
];

const mathTopics = [
  'Calculus',
  'Linear Algebra',
  'Probability Theory',
  'Statistics',
  'Numerical Analysis',
  'Cryptography',
  'Coding Theory',
];

export function BackgroundSWE() {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-row items-center justify-center gap-4 mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full shrink-0">
            <Layers className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Background</h2>
        </div>

        {/* Software Engineering — text left, card right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Code className="w-6 h-6 text-primary" />
              Software Engineering
            </h3>
            <p className="text-lg text-base-content/70 leading-relaxed">
              I have a strong background in software engineering. Most of my
              skills I have acquired through self-study and continuous
              improvement during my college years. I enjoy working on Full Stack
              Web Applications as well as Mobile Applications (Android).
            </p>
          </div>

          <div className="flex justify-center">
          <div className="w-full max-w-120 bg-base-200 border border-base-300 rounded-2xl p-6">
            <h4 className="font-semibold mb-4 text-base-content/80">
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <span
                  key={lang}
                  className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold"
                >
                  {lang}
                </span>
              ))}
            </div>

            <div className="border-t border-base-300 my-6" />

            <h4 className="font-semibold mb-4 text-base-content/80">
              Frameworks & Libraries
            </h4>
            <div className="flex flex-wrap gap-2">
              {frameworks.map(fw => (
                <span
                  key={fw}
                  className="px-3 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-semibold"
                >
                  {fw}
                </span>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Mathematics — card left, text right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="flex justify-center order-2">
          <div className="w-full max-w-120 bg-base-200 border border-base-300 rounded-2xl p-6">
            <h4 className="font-semibold mb-4 text-base-content/80">Topics</h4>
            <ul className="space-y-2">
              {mathTopics.map(topic => (
                <li
                  key={topic}
                  className="flex items-center gap-2 text-base-content/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          </div>

          <div className="order-1 space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Brain className="w-6 h-6 text-accent" />
              Mathematics
            </h3>
            <p className="text-lg text-base-content/70 leading-relaxed">
              I am well versed in applied mathematics. Over the years, I have
              developed my proficiency in areas like Numerical Analysis,
              Information Theory and Applied Probability and Statistics.
              Throughout my studies, I&apos;ve focused on deep understanding of
              the mathematical concepts and their applications in various fields
              including Computer Science.
            </p>
            <p className="text-sm text-base-content/40 italic">
              For more information on anything related to my background, feel
              free to reach out personally and I will provide additional
              details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
