import Link from 'next/link';
import { Github, Linkedin, Mail, X, Heart } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com/sersergious', label: 'GitHub', icon: Github },
  {
    href: 'https://linkedin.com/in/sersergious',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  { href: 'https://twitter.com/sersergious', label: 'Twitter', icon: X },
  { href: 'mailto:hello@sersergious.dev', label: 'Email', icon: Mail },
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
];

export function Footer() {
  return (
    <footer className="pb-4 pt-8 px-4">
      <div className="w-full rounded-2xl border border-base-300 bg-base-200/80 backdrop-blur-lg shadow-lg">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-content">
                    S
                  </span>
                </div>
                <span className="font-bold text-xl">Serhii Kuzmin</span>
              </Link>
              <p className="text-base-content/60 text-sm leading-relaxed mb-4">
                I build software that matters.
              </p>
              <div className="flex space-x-2">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base-content/60 hover:text-base-content transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-base-300 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base-content/60 text-sm">
              © {new Date().getFullYear()} SerSergious. All rights reserved.
            </p>
            <p className="text-base-content/60 text-sm flex items-center gap-1 mt-2 md:mt-0">
              Made with <Heart className="h-4 w-4 text-error" /> and lots of
              coffee
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
