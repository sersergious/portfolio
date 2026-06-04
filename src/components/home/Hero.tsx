import Image from 'next/image';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  {
    href: 'https://github.com/sersergious',
    icon: Github,
    label: 'GitHub',
    color: 'bg-neutral text-neutral-content hover:bg-neutral/80',
  },
  {
    href: 'https://www.linkedin.com/in/sersergious-dev',
    icon: Linkedin,
    label: 'LinkedIn',
    color: 'bg-blue-600 text-white hover:bg-blue-700',
  },
  {
    href: 'mailto:serhii.kuzmin@scranton.edu',
    icon: Mail,
    label: 'Email',
    color: 'bg-rose-500 text-white hover:bg-rose-600',
  },
];

export function Hero() {
  return (
    <section className="relative pt-20 pb-6 md:pt-28 md:pb-10 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch gap-6 py-12 container mx-auto px-4">
        {/* Text Content */}
        <div className="w-full lg:flex-1 bg-base-200 border border-base-300 rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for hire
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Hi, I&apos;m <span className="text-primary">Serhii Kuzmin</span>
            </h1>

            {/* Hero Image — Mobile */}
            <div className="lg:hidden flex justify-center my-6">
              <div className="relative aspect-square w-65 rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-img.png"
                  alt="Hero image"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </div>

            <p className="text-lg text-base-content/60 leading-relaxed">
              Software Engineer.{' '}
              <span className="text-base-content font-medium">Researcher.</span>{' '}
              <span className="text-accent font-medium">Innovator.</span>
            </p>

            <p className="text-base text-base-content/75 leading-relaxed mt-3">
              I am a Software Engineer who specializes in building Full-Stack
              web applications with the main focus on the backend. I also have
              experience in developing Android apps using Kotlin and Systems
              Programming using C.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {[
                {
                  label: 'HTML/CSS',
                  color:
                    'bg-orange-600/15 text-orange-500 border-orange-600/30',
                },
                {
                  label: 'TypeScript',
                  color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
                },
                {
                  label: 'Python',
                  color:
                    'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
                },
                {
                  label: 'Java',
                  color:
                    'bg-orange-500/15 text-orange-400 border-orange-500/30',
                },
                {
                  label: 'Kotlin',
                  color:
                    'bg-violet-500/15 text-violet-400 border-violet-500/30',
                },
                {
                  label: 'C',
                  color:
                    'bg-purple-500/15 text-purple-400 border-purple-500/30',
                },
                {
                  label: 'PostgreSQL',
                  color:
                    'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
                },
              ].map(tag => (
                <span
                  key={tag.label}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${tag.color}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a href="/docs/resume.pdf" download>
              <button className="btn btn-primary">
                <Download className="h-4 w-4" />
                Resume
              </button>
            </a>
            {socials.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-square w-10 h-10 rounded-lg transition-colors ${social.color}`}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Hero Image — Desktop */}
        <div className="hidden lg:block relative w-100 shrink-0 rounded-2xl overflow-hidden">
          <Image
            src="/images/hero-img.png"
            alt="Hero image"
            fill
            sizes="400px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
