import { FadeInWhenVisible } from "../transitions/FadeInWhenVisible";
import Image from "next/image";

export function HeroTLDR() {
  return (
    /* Hero Section with TL;DR */
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* TL;DR Section */}
          <FadeInWhenVisible direction="up">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 block">
                TL;DR
              </span>
              <p className="text-2xl md:text-3xl font-medium leading-relaxed text-center max-w-4xl mx-auto">
                I'm a senior at the University of Scranton studying{" "}
                <span className="text-primary">Computer Science</span> and{" "}
                <span className="text-accent">Mathematical Sciences</span> with
                passion for science and technology. In my free time I'm a very
                outdoorsy person helping run hiking retreats at my University,
                serve as a senator for the Student Government and a club leader.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* About Me Section */}
          <FadeInWhenVisible direction="up" delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  About Me
                </h1>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    My name is Serhii Kuzmin and I'm an aspiring developer and
                    researcher on a mission to bridge{" "}
                    <span className="text-primary font-semibold">
                      mathematics
                    </span>{" "}
                    and
                    <span className="text-accent font-semibold">
                      {" "}
                      computer science
                    </span>{" "}
                    to create technologies that make a lasting impact.
                  </p>
                  <p>
                    The cornerstone of my philosophy is I need to do my best and
                    try my hardest to achieve my goals. This extends to every
                    part of my life. Everything from my academic endeavours, to
                    personal hobbies. I believe a person who is truly committed
                    to what they love is the one who won't regret much in life
                    because of simply trying to pursue their dreams and
                    interests.
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about-hero.png"
                    alt="Hero image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
      </div>
    </section>
  );
}
