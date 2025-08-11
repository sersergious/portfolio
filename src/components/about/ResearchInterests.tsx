// components/about/ResearchInterests.tsx
import { Brain, Cpu, Shield, Target } from "lucide-react";
import {
  FadeInWhenVisible,
  ScaleOnHover,
  StaggerContainer,
  StaggerItem,
} from "@/components/transitions";

export function ResearchInterests() {
  const researchInterests = [
    {
      title: "Artificial Intelligence",
      description:
        "Exploring deep learning, neural networks, and AGI possibilities",
      icon: Brain,
      color: "text-gb-green",
    },
    {
      title: "Quantum Computing",
      description:
        "Quantum algorithms and their applications in solving complex problems",
      icon: Cpu,
      color: "text-gb-aqua",
    },
    {
      title: "Cryptography",
      description:
        "Post-quantum cryptographic systems for secure communication",
      icon: Shield,
      color: "text-gb-orange",
    },
    {
      title: "Applied Mathematics",
      description: "Applied mathematics in computational contexts",
      icon: Target,
      color: "text-gb-purple",
    },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Research Interests
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              My research passion lies at the intersection of theoretical
              foundations and real-world applications, bridging Computer Science
              and Mathematics to drive practical innovation.
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {researchInterests.map(
            ({ title, description, icon: Icon, color }, index) => (
              <StaggerItem key={title} delay={index * 0.1}>
                <ScaleOnHover scale={1.02}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors sm:aspect-square flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <Icon className={`w-12 h-12 ${color} mb-4`} />
                      <h3 className="text-lg font-semibold mb-3">{title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ),
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
