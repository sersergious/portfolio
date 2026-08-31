'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const links = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      {/* Taller on md+ so the larger avatar keeps its breathing room. */}
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6 md:h-16">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Home"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={144}
            height={144}
            sizes="(min-width: 768px) 44px, 36px"
            priority
            className="h-9 w-9 shrink-0 rounded-full object-cover md:h-11 md:w-11"
          />
          {/* Logo alone carries identity once the nav needs the width. */}
          <span className="hidden text-sm font-semibold whitespace-nowrap sm:inline">
            Serhii Kuzmin
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
              className={cn(
                'rounded-lg px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors hover:bg-muted sm:px-3',
                pathname.startsWith(link.href)
                  ? 'font-medium text-foreground'
                  : 'text-subtle-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
