import { Compass } from 'lucide-react';

export function Interests() {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-center gap-4 mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full shrink-0">
            <Compass className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Interests</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image — left on desktop, top on mobile */}
          <div className="flex justify-center">
            <div className="aspect-square w-full max-w-120 rounded-2xl bg-base-200 border-2 border-dashed border-base-300 flex items-center justify-center">
              <span className="text-base-content/30 text-sm font-medium">
                Image coming soon
              </span>
            </div>
          </div>

          {/* Text — right on desktop, bottom on mobile */}
          <div className="space-y-4">
            <p className="text-lg text-base-content/70 leading-relaxed">
              Outside of work, I enjoy spending time outdoors, traveling, and
              cooking. I&apos;ve been actively involved in leading outdoor
              retreats and organizing activities for groups of people. Some of
              my recent adventures include trips to Death Valley, California,
              and World End State Park, Pennsylvania — the latter of which I led
              myself.
            </p>
            <p className="text-lg text-base-content/70 leading-relaxed">
              I&apos;m also an avid traveler. Growing up in Ukraine and starting
              my explorations at age 18, I&apos;ve been fortunate to visit
              multiple countries including Germany, Spain, Croatia, and Turkey.
              I&apos;m passionate about discovering new destinations and
              experiencing different cultures. When I&apos;m not traveling, I
              enjoy cooking and spending quality time with friends and family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
