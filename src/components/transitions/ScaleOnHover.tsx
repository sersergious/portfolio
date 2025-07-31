// =======================================
// components/transitions/ScaleOnHover.tsx
// =======================================

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScaleOnHoverProps {
  children: ReactNode
  className?: string
  scale?: number
  tapScale?: number
}

export function ScaleOnHover({
  children,
  className = '',
  scale = 1.05,
  tapScale = 0.95
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      whileTap={{
        scale: tapScale,
        transition: { duration: 0.1, ease: 'easeInOut' }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}