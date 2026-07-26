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
    <header className="sticky top-0 z-50 border-b border-base-content/15 bg-base-100/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Home"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={24}
            height={24}
            className="shrink-0 rounded-full"
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
                'rounded-field px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors hover:bg-base-200 sm:px-3',
                pathname.startsWith(link.href)
                  ? 'font-medium text-base-content'
                  : 'text-base-content/60'
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
