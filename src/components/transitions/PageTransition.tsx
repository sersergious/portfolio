// =======================================
// components/transitions/PageTransition.tsx
// =======================================

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

// Animation variants for different page types
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.25, 0, 1], // Custom easing
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.25, 0, 1]
    }
  }
}

// Slide variants for lateral navigation
const slideVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50
  }),
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.25, 0, 1]
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.25, 0, 1]
    }
  })
}

// Chat-specific animations (smoother for real-time interaction)
const chatVariants = {
  initial: {
    opacity: 0,
    scale: 0.95
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.15,
      ease: 'easeIn'
    }
  }
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname()

  // Determine animation type based on route
  const getAnimationType = (path: string) => {
    if (path === '/chat') return 'chat'
    if (path.includes('/projects/') || path.includes('/blog/') || path.includes('/research/')) {
      return 'slide'
    }
    return 'page'
  }

  const animationType = getAnimationType(pathname)

  // Get direction for slide animations (simple logic)
  const getDirection = (path: string) => {
    const routes = ['/', '/about', '/projects', '/research', '/blog', '/chat', '/contact']
    const currentIndex = routes.findIndex(route => path.startsWith(route))
    const previousIndex = routes.findIndex(route =>
      typeof window !== 'undefined' &&
      document.referrer.includes(route)
    )
    return currentIndex > previousIndex ? 1 : -1
  }

  const variants = {
    page: pageVariants,
    slide: slideVariants,
    chat: chatVariants
  }[animationType]

  const direction = animationType === 'slide' ? getDirection(pathname) : 0

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        custom={direction}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        className={`min-h-screen ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}