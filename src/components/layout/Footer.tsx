// =======================================
// components/layout/Footer.tsx
// =======================================

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, X, Heart } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com/sersergious', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com/in/sersergious', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://twitter.com/sersergious', label: 'Twitter', icon: X },
  { href: 'mailto:hello@sersergious.dev', label: 'Email', icon: Mail },
]

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/projects', label: 'Projects' },
      { href: '/research', label: 'Research' },
    ]
  },
  {
    title: 'Content',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/chat', label: 'AI Chat' },
      { href: '/contact', label: 'Contact' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { href: '/sitemap.xml', label: 'Sitemap' },
      { href: '/rss.xml', label: 'RSS Feed' },
      { href: '/privacy', label: 'Privacy' },
    ]
  }
]

export function Footer() {
    return (
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-t border-border bg-muted/30"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">S</span>
                </div>
                <span className="font-bold text-xl">Sersergious</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Research. Develop. Innovate. Building the future through code and curiosity.
              </p>

              {/* Social Links */}
              <div className="flex space-x-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={section.title}>
                <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} SerSergious. All rights reserved.
            </p>
            <motion.p
              className="text-muted-foreground text-sm flex items-center gap-1 mt-2 md:mt-0"
              whileHover={{ scale: 1.05 }}
            >
              Made with <Heart className="h-4 w-4 text-red-500" /> and lots of coffee
            </motion.p>
          </div>
        </div>
      </motion.footer>
    )
  }