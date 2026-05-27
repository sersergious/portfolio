import { Brain, Cpu, Shield, Target } from 'lucide-react';
import {
  FadeInWhenVisible,
  StaggerContainer,
  StaggerItem,
} from '@/components/transitions';

const researchInterests = [
  {
    title: 'Artificial Intelligence',
    description:
      'Exploring deep learning, neural networks, and AGI possibilities',
    icon: Brain,
    colorClass: 'text-success',
  },
  {
    title: 'Quantum Computing',
    description:
      'Quantum algorithms and their applications in solving complex problems',
    icon: Cpu,
    colorClass: 'text-info',
  },
  {
    title: 'Cryptography',
    description: 'Post-quantum cryptographic systems for secure communication',
    icon: Shield,
    colorClass: 'text-warning',
  },
  {
    title: 'Applied Mathematics',
    description: 'Applied mathematics in computational contexts',
    icon: Target,
    colorClass: 'text-secondary',
  },
];

export function ResearchInterests() {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Research Interests
            </h2>
            <p className="text-lg text-base-content/60 max-w-3xl mx-auto">
              My research passion lies at the intersection of theoretical
              foundations and real-world applications, bridging Computer Science
              and Mathematics to drive practical innovation.
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {researchInterests.map(
            ({ title, description, icon: Icon, colorClass }) => (
              <StaggerItem key={title}>
                <div className="bg-base-100 border border-base-300 rounded-lg p-6 hover:border-primary transition-colors sm:aspect-square flex flex-col">
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <Icon className={`w-12 h-12 ${colorClass} mb-4`} />
                    <h3 className="text-lg font-semibold mb-3">{title}</h3>
                    <p className="text-base-content/60 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            )
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
