import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons/brand-icons';
import { getAllWork } from '@/lib/work-content';
import { languageColor } from '@/lib/languages';
import { formatDate } from '@/lib/utils';
import { EMAIL, PRESS, STACK, STATUS } from '@/lib/profile';
import { WorkCard } from '@/components/work/WorkCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { buttonVariants } from '@/components/ui/button';
import { linkVariants } from '@/components/ui/link-variants';

export default async function HomePage() {
  // Already ordered by date desc in the query.
  const recentWork = (await getAllWork()).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Serhii Kuzmin
            </h1>
            {/*
              One positioning line, then one paragraph that adds to it. The
              hero used to restate the same sentence three times before the
              Contact section said it a fourth.
            */}
            <p className="mt-3 text-xl md:text-2xl">
              Software engineer — backend, systems, and quantitative
              development.
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              I write server-side services in Java, and Python, work close to
              the machine in C and C++, and build the UIs on top in TypeScript
              and React. My main focus is on backend and low latency systems.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href="/docs/resume.pdf"
                download
                className={buttonVariants({ variant: 'primary', size: 'md' })}
              >
                <Download className="h-4 w-4" />
                Résumé
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className={buttonVariants({ size: 'md' })}
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>
              <a
                href="https://github.com/sersergious"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'icon-sm',
                })}
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/skuzmin-dev"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'icon-sm',
                })}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <Image
            src="/images/hero.webp"
            alt="Serhii Kuzmin"
            width={512}
            height={512}
            priority
            sizes="(max-width: 768px) 14rem, 18rem"
            className="h-56 w-56 shrink-0 rounded-full border border-border object-cover md:h-72 md:w-72"
          />
        </div>

        <p className="mt-16 text-base text-muted-foreground">
          BS in Computer Science & Mathematics — Pennsylvania, USA. {STATUS}.
        </p>

        <p className="mt-16 max-w-2xl border-l-2 border-primary pl-5 text-base leading-relaxed text-muted-foreground">
          Simplicity is the ultimate sophistication — Leonardo da Vinci, by way
          of Apple’s first brochure, 1977
        </p>
      </section>

      {/* Stack */}
      <section className="py-16">
        <SectionLabel>Stack</SectionLabel>
        <dl className="space-y-6">
          {STACK.map(group => (
            <StackRow key={group.label} {...group} />
          ))}
        </dl>
        <p className="mt-8 max-w-2xl text-subtle-foreground">
          Research background in quantum computing — noise modelling for
          variational eigensolvers.{' '}
          <Link
            href="/work"
            className={linkVariants({ underline: 'always', tone: 'primary' })}
          >
            See the paper
          </Link>
          .
        </p>
      </section>

      {/* Work */}
      <section className="py-16">
        <SectionLabel href="/work" linkLabel="All work">
          Recent work
        </SectionLabel>
        <div className="divide-y divide-border border-y border-border">
          {recentWork.map(item => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      {/* Press */}
      <section className="py-16">
        <SectionLabel>Press</SectionLabel>
        <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          In August 2022 I left Ukraine to start my degree at the University of
          Scranton. Four newsrooms covered the move.
        </p>
        <ul className="divide-y divide-border border-y border-border">
          {PRESS.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs whitespace-nowrap text-muted-foreground sm:w-44">
                  {item.outlet}
                </span>
                <span className="flex-1 group-hover:text-primary">
                  {item.headline}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <time dateTime={item.date}>
                    {formatDate(item.date, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="py-16">
        <SectionLabel>Contact</SectionLabel>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Open to backend, systems, and platform engineering roles. The
            fastest way to reach me is email.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className={buttonVariants({ variant: 'primary' })}
            >
              <Mail className="h-4 w-4" />
              Email me
            </a>
            <Link href="/about" className={buttonVariants()}>
              More about me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function StackRow({
  label,
  items,
  dots = false,
}: {
  label: string;
  items: string[];
  dots?: boolean;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]">
      <dt className="font-mono text-xs text-muted-foreground">{label}</dt>
      <dd className="flex flex-wrap gap-x-5 gap-y-2">
        {items.map(item => (
          <span key={item} className="flex items-center gap-2">
            {dots && (
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: languageColor(item) }}
              />
            )}
            {item}
          </span>
        ))}
      </dd>
    </div>
  );
}
