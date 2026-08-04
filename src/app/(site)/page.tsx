import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons/brand-icons';
import { ProtectedMailLink } from '@/components/ui/ProtectedMailLink';
import { getAllWork } from '@/lib/work-content';
import { languageColor } from '@/lib/languages';
import { formatDate } from '@/lib/utils';
import { CREDENTIALS, EMAIL_B64, PRESS, STACK } from '@/lib/profile';
import { WorkCard } from '@/components/work/WorkCard';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default async function HomePage() {
  // Already ordered by date desc in the query.
  const recentWork = (await getAllWork()).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate pt-16 pb-20 md:pt-24 md:pb-28">
        <div
          aria-hidden
          className="blueprint pointer-events-none absolute top-0 left-1/2 -z-10 h-[720px] w-screen -translate-x-1/2"
        />
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-base-content/70 uppercase">
              <span className="status status-success" />
              Available for hire
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Serhii Kuzmin
            </h1>
            <p className="mt-3 text-xl text-base-content/70 md:text-2xl">
              Software engineer — full-stack with focus on backend and systems.
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-base-content/70">
              Full-Stack Engineer, focused on backend and systems. I build
              modern web UIs using TypeScript and React, write server-side
              services in Java, Kotlin, and Python, and work close to the
              machine in C.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-base-content">
              Looking for backend, systems, or full-stack roles
            </p>

            <p className="mt-5 font-mono text-xs text-base-content/70">
              {CREDENTIALS.join(' · ')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href="/docs/resume.pdf"
                download
                className="btn btn-sm btn-primary"
              >
                <Download className="h-4 w-4" />
                Résumé
              </a>
              <ProtectedMailLink encoded={EMAIL_B64} className="btn btn-sm">
                <Mail className="h-4 w-4" />
                Email me
              </ProtectedMailLink>
              <a
                href="https://github.com/sersergious"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-ghost btn-square"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/skuzmin-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-ghost btn-square"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <Image
            src="/images/hero.png"
            alt="Serhii Kuzmin"
            width={512}
            height={512}
            priority
            sizes="(max-width: 768px) 14rem, 18rem"
            className="h-56 w-56 shrink-0 rounded-full border border-base-content/15 object-cover md:h-72 md:w-72"
          />
        </div>

        <p className="mt-16 max-w-2xl border-l-2 border-primary pl-5 text-base leading-relaxed text-base-content/70">
          Simplicity is the ultimate sophistication — Steve Jobs
        </p>
      </section>

      {/* Stack */}
      <section className="py-14">
        <SectionLabel>Stack</SectionLabel>
        <dl className="space-y-6">
          {STACK.map(group => (
            <StackRow key={group.label} {...group} />
          ))}
        </dl>
        <p className="mt-8 max-w-2xl text-base-content/60">
          Research background in quantum computing — noise modelling for
          variational eigensolvers.{' '}
          <Link href="/work" className="link link-primary">
            See the paper
          </Link>
          .
        </p>
      </section>

      {/* Work */}
      <section className="py-14">
        <SectionLabel href="/work" linkLabel="All work">
          Recent work
        </SectionLabel>
        <div className="divide-y divide-base-content/15 border-y border-base-content/15">
          {recentWork.map(item => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      {/* Press */}
      <section className="py-14">
        <SectionLabel>Press</SectionLabel>
        <p className="mb-6 max-w-2xl text-base leading-relaxed text-base-content/70">
          In August 2022 I left Ukraine to start my degree at the University of
          Scranton. Four newsrooms covered the move.
        </p>
        <ul className="divide-y divide-base-content/15 border-y border-base-content/15">
          {PRESS.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs whitespace-nowrap text-base-content/70 sm:w-44">
                  {item.outlet}
                </span>
                <span className="flex-1 group-hover:text-primary">
                  {item.headline}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-base-content/70">
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
      <section className="py-14">
        <SectionLabel>Contact</SectionLabel>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-base leading-relaxed text-base-content/70">
            Open to backend, systems, and platform engineering roles. The
            fastest way to reach me is email.
          </p>
          <div className="flex flex-wrap gap-2">
            <ProtectedMailLink
              encoded={EMAIL_B64}
              className="btn btn-sm btn-primary"
            >
              <Mail className="h-4 w-4" />
              Email me
            </ProtectedMailLink>
            <Link href="/about" className="btn btn-sm">
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
      <dt className="font-mono text-xs text-base-content/70">{label}</dt>
      <dd className="flex flex-wrap gap-x-5 gap-y-2">
        {items.map(item => (
          <span key={item} className="flex items-center gap-2">
            {dots && (
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: languageColor(item.split(' / ')[0]) }}
              />
            )}
            {item}
          </span>
        ))}
      </dd>
    </div>
  );
}
