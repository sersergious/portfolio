// =======================================
// components/transitions/StaggerContainer.tsx
// =======================================

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export function StaggerContainer({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
      style={{
        '--stagger-delay': `${staggerDelay}s`,
        '--delay': `${delay}s`
      } as any}
    >
      {children}
    </motion.div>
  )
}