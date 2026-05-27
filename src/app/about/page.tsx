import type { Metadata } from 'next'
import { About } from '@/components/about/About'

export const metadata: Metadata = {
  title: 'About — Serhii Kuzmin',
  description: 'Learn more about Serhii Kuzmin — researcher, developer, and student.',
}

export default function AboutPage() {
  return <About />
}
