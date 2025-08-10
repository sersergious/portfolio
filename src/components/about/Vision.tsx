// components/about/Vision.tsx
import { Rocket, FileText, ArrowRight, Mail } from "lucide-react";
import {
  FadeInWhenVisible,
  ScaleOnHover,
  Pulse,
} from "@/components/transitions";
import Link from "next/link";

export function Vision() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible direction="up">
          <div className="max-w-4xl mx-auto text-center">
            <Pulse duration={3}>
              <Rocket className="w-16 h-16 text-primary mx-auto mb-8" />
            </Pulse>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Looking Forward
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              My goal is to pursue a PhD at the intersection of applied
              mathematics and computer science, focusing on AI, quantum
              computing, and cryptography. I believe these fields hold the key
              to solving humanity's greatest challenges - from curing diseases
              to expanding our understanding of the universe itself.
            </p>
            <p className="text-xl font-medium text-foreground mb-12">
              I want to build technologies that don't just solve today's
              problems, but create possibilities we haven't even imagined yet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScaleOnHover>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <FileText className="w-5 h-5" />
                  View My Research
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScaleOnHover>

              <ScaleOnHover>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </Link>
              </ScaleOnHover>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
