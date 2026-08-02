import Image from 'next/image';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PageHeader } from '@/components/ui/PageHeader';
import { CREDENTIALS, FOCUS_AREAS, MATH_TOPICS } from '@/lib/profile';

export function About() {
  return (
    <div className="pb-8">
      <PageHeader
        title="About"
        lead="I grew up in Ukraine, started programming at 13, and now write backend and systems software in Pennsylvania. The short version is that maths came first and the code followed."
        facts={CREDENTIALS}
      />

      <Band
        label="Origin"
        image="/images/about-origin.png"
        alt="Serhii Kuzmin on the University of Scranton campus"
      >
        <p>
          Since early childhood I&apos;ve been interested in technology, taking
          computers apart to understand how they work. That turned into coding
          at 13, and from there into what I do today.
        </p>
        <p>
          Mathematics has been the interest that has empowered me to pursue my
          passions. I started to compet in olympiads and presented at
          conferences as early as 7. Fast forward to today and I graduated from
          the University of Scranton with a degree in Computer Science and
          Mathematical Sciences — the ultimate combination I&apos;d been
          building toward the whole time.
        </p>
      </Band>

      <Band label="Engineering">
        <p>
          Most of what I know I taught myself, then sharpened in college. I have
          worked on a variety of projects, from desktop applications to backend
          services to mobile apps to highly abstract qunatum computing
          simulations. However, my primary focus is on backend development and
          low-level systems programming. I have experience with a variety of
          programming languages, including C, Python, TypeScript, and Java. I
          have also worked with a variety of databases, such as PostgreSQL and
          SQLite. On top of that, I have exposure to a variety of backend web
          frameworks, such as FastAPI and Flask. Despite the backend focus, I
          always sure that the UI/UX at the forefront of my work. That is why I
          have mastered a variety of frontend frameworks, such as React and
          Next.js to give my apps a nice UI. FInally, I have deployed multiple
          projects on cloud platforms like AWS.
        </p>
        <figure className="border-l-2 border-primary pl-5">
          <blockquote className="text-base-content/80">
            Surface Evolver highlights my passion for modernizing legacy
            software. I transformed a powerful but inaccessible decades-old
            program into a cross-platform desktop app with a simple elegant UI,
            maintaining 90% engine compatibility while cutting render times by
            30%.
          </blockquote>
          <figcaption className="mt-2 font-mono text-xs text-base-content/70">
            Capstone project, 2026
          </figcaption>
        </figure>
      </Band>

      <Band label="Mathematics" aside={<TagList items={MATH_TOPICS} />}>
        <p>
          I&apos;m well versed in applied mathematics — numerical analysis,
          information theory, and applied probability and statistics in
          particular. Throughout my studies I chased understanding of the
          concepts themselves rather than the mechanics, which is the skill that
          is directly applicable to engineering when tackling challenges.
        </p>
      </Band>

      <Band
        label="Research"
        image="/images/about-research.png"
        alt="Presenting research at a conference"
        flip
      >
        <p>
          In the summer of 2025 I decided I wanted to find out what doing
          research actually is. Back at college I found a quantum computing
          project that peeked my interest, and about eight months later I
          presented my first results at a conference.
        </p>
        <p>
          Quantum computing is the primary focus, but the curiosity is wider
          than that — I&apos;m drawn to where computer science meets other
          disciplines.
        </p>
        <TagList items={FOCUS_AREAS} />
      </Band>

      <Band
        label="Outside work"
        image="/images/about-travel.png"
        alt="Hiking the dunes in Death Valley"
      >
        <p>
          I spend my time outdoors, travelling, and cooking. I&apos;ve led
          outdoor retreats and organised trips for groups — Death Valley in
          California, and World&apos;s End State Park in Pennsylvania, the
          latter of which I ran myself.
        </p>
        <p>
          I started travelling at 18 and have since spent time in the United
          States, Germany, Spain, France, Sweden, the Netherlands, and Austria.
        </p>
      </Band>

      <Band
        label="What drives it"
        image="/images/about-why.png"
        alt="With my parents at a Christmas market in Hamburg"
        flip
      >
        <p>
          I&apos;m driven by curiosity about how things work and by wanting to
          push on what&apos;s possible. Every problem is a puzzle; every
          limitation is somewhere to look harder.
        </p>
        <p>
          My family is the foundation under all of it. Their support is why I
          hold myself to rigour, and why I believe the tools I build and the
          research I chase are worth doing well.
        </p>
      </Band>

      <p className="mt-14 border-t border-base-content/15 pt-6 text-base-content/70">
        Anything not covered here — just ask.
      </p>
    </div>
  );
}

/**
 * One section: label on a rule, prose in a readable measure, and an optional
 * image that alternates sides so the page reads as a spread, not a document.
 */
function Band({
  label,
  image,
  alt,
  aside,
  flip = false,
  children,
}: {
  label: string;
  image?: string;
  alt?: string;
  aside?: React.ReactNode;
  flip?: boolean;
  children: React.ReactNode;
}) {
  const hasSide = Boolean(image || aside);

  return (
    <section className="pt-14">
      <SectionLabel>{label}</SectionLabel>

      <div
        className={
          hasSide
            ? 'grid items-center gap-8 md:grid-cols-2 md:gap-12'
            : 'max-w-3xl'
        }
      >
        <div
          className={`space-y-4 text-base leading-relaxed ${
            flip ? 'md:order-2' : ''
          }`}
        >
          {children}
        </div>

        {image && (
          <Image
            src={image}
            alt={alt ?? ''}
            width={640}
            height={640}
            sizes="(max-width: 768px) 100vw, 28rem"
            className={`aspect-[4/3] w-full rounded-box object-cover ${
              flip ? 'md:order-1' : ''
            }`}
          />
        )}

        {!image && aside && (
          <div className={flip ? 'md:order-1' : ''}>{aside}</div>
        )}
      </div>
    </section>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-base-content/70">
      {items.map(item => (
        <li key={item} className="flex items-center gap-2">
          <span className="h-1 w-1 shrink-0 rounded-full bg-base-content/40" />
          {item}
        </li>
      ))}
    </ul>
  );
}
