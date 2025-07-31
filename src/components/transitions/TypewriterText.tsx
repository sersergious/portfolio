// =======================================
// components/transitions/TypewriterText.tsx
// =======================================

'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className = ''
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      delay,
      duration: text.length * (speed / 1000),
      ease: "easeInOut",
    })

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayedText(text.slice(0, latest))
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [count, delay, rounded, speed, text])

  return (
    <motion.span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block w-0.5 h-5 bg-current ml-1"
      />
    </motion.span>
  )
}