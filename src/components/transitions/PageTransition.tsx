'use client'

import { AnimatePresence, motion, Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useRef } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

// Page-like transitions
const pageVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
}

// Slide transitions (directional)
const slideVariants: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  })
}

// Chat-like transitions
const chatVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname()
  const previousPath = useRef(pathname)

  const getAnimationType = (path: string) => {
    if (path === '/chat') return 'chat'
    if (path.includes('/projects/') || path.includes('/blog/') || path.includes('/research/')) {
      return 'slide'
    }
    return 'page'
  }

  const getDirection = (current: string, previous: string) => {
    const routes = ['/', '/about', '/projects', '/research', '/blog', '/chat', '/contact']
    const currentIndex = routes.findIndex(route => current.startsWith(route))
    const previousIndex = routes.findIndex(route => previous.startsWith(route))
    return currentIndex > previousIndex ? 1 : -1
  }

  const animationType = getAnimationType(pathname)
  const direction = animationType === 'slide' ? getDirection(pathname, previousPath.current) : 0
  previousPath.current = pathname

  const variants = {
    page: pageVariants,
    slide: slideVariants,
    chat: chatVariants
  }[animationType]

  return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
            key={pathname}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className={`min-h-screen ${className}`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
  )
}
