import { Zap } from "lucide-react";
import { FadeInWhenVisible, SlideIn } from "@/components/transitions";
import Image from "next/image";

export function AboutOrigin() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible direction="up">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                How it all started
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image on the left */}
              <SlideIn from="left" className="order-2 lg:order-1">
                <div className="relative aspect-square w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/iron-man.png"
                    alt="Iron Man inspiration"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </SlideIn>

              {/* Text on the right */}
              <SlideIn from="right" delay={0.2} className="order-1 lg:order-2">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Since childhood, I've been fascinated by technology. As a kid,
                  I wanted to be like Iron Man. However, it wasn't just about
                  being a superhero. It was about being a person with a genius
                  and unique mind who can push boundaries of what's possible.
                  That became my mission and has shaped me into who I am today.
                  I continue to excel in multiple disciplines in Computer
                  Science and Math, mastering programming and problem solving,
                  and exploring the cutting edge of technology.
                </p>
              </SlideIn>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
