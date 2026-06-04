import { Heart } from 'lucide-react';

export function Philosophy() {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-center gap-4 mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-full shrink-0">
            <Heart className="w-8 h-8 text-error" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">My Philosophy</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text — left on desktop, bottom on mobile */}
          <div className="order-2 lg:order-1 space-y-10">
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-error shrink-0" />
                What Drives Me
              </h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                Beyond the code and equations, I&apos;m driven by a deep
                curiosity about how things work and a desire to push the
                boundaries of what&apos;s possible. Every problem is a puzzle
                waiting to be solved, every limitation an opportunity for
                innovation. I believe in the power of technology to amplify
                human potential and create a better future for all.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-error shrink-0" />
                Who Drives Me
              </h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                My family is my foundation. Everything I do is inspired by them
                and for them. Their unwavering support fuels my determination to
                pursue excellence with rigor and curiosity. As someone working
                at the intersection of Computer Science and Mathematics, I
                believe that every tool I create and every piece of research I
                explore holds the potential to meaningfully improve the lives of
                those around me.
              </p>
            </div>
          </div>

          {/* Image — right on desktop, top on mobile */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="aspect-square w-full max-w-120 rounded-2xl bg-base-200 border-2 border-dashed border-base-300 flex items-center justify-center">
              <span className="text-base-content/30 text-sm font-medium">
                Image coming soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
