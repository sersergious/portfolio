import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin } from '@/components/icons/brand-icons';
import { EMAIL } from '@/lib/profile';
import { linkVariants } from '@/components/ui/link-variants';
import { cn } from '@/lib/utils';

const pages = [
  { href: '/', label: 'Overview' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
];

const externals = [
  { href: 'https://github.com/sersergious', label: 'GitHub', Icon: Github },
  {
    href: 'https://www.linkedin.com/in/skuzmin-dev',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
];

/**
 * Opaque background on purpose: the sheet ends where the drawing ends. Letting
 * the grid run on through the footer left the page with no bottom edge.
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-sm text-muted-foreground lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
        <div className="flex items-center gap-2 lg:justify-self-start">
          <Image
            src="/images/logo.png"
            alt=""
            width={20}
            height={20}
            className="rounded-full"
          />
          <span>© {new Date().getFullYear()} Serhii Kuzmin</span>
        </div>

        <nav aria-label="Footer" className="lg:justify-self-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {pages.map(page => (
              <li key={page.href}>
                <Link href={page.href} className={linkVariants()}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-self-end">
          {externals.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  linkVariants(),
                  'inline-flex items-center gap-1.5'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${EMAIL}`} className={linkVariants()}>
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
