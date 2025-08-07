import { Heart } from "lucide-react";
import { FadeInWhenVisible } from "@/components/transitions/FadeInWhenVisible";

export function Philosophy() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-destructive mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-6">What Drives Me</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond the code and equations, I'm driven by a deep curiosity
              about how things work and a desire to push the boundaries of
              what's possible. Every problem is a puzzle waiting to be solved,
              every limitation an opportunity for innovation. I believe in the
              power of technology to amplify human potential and create a better
              future for all.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
