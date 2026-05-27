'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-4xl rounded-2xl border border-base-300 bg-base-100/40 backdrop-blur-xl shadow-lg border-white/10">
        <div className="px-4">
          <div className="flex h-17 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group"
              aria-label="SerSergious - Home"
            >
              <div className="relative h-8 w-8 flex items-center justify-center">
                <Image
                  src="/images/logo.svg"
                  alt="SerSergious Logo"
                  width={32}
                  height={32}
                  className="object-contain transition-transform duration-200"
                />
              </div>
              <span className="font-bold text-xl transition-colors duration-200 group-hover:text-primary">
                Serhii Kuzmin
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive(item.href)
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-base-content/60 hover:text-base-content hover:bg-base-200'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg bg-base-200 hover:bg-base-200 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-base-300">
              <div className="py-4 space-y-1">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-base-content/60 hover:text-base-content hover:bg-base-200'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
