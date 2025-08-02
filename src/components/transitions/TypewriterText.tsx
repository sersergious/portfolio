'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  showCursor?: boolean
  onComplete?: () => void
}

export function TypewriterText({
                                 text,
                                 delay = 0,
                                 speed = 50,
                                 className = '',
                                 showCursor = true,
                                 onComplete
                               }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const animationRef = useRef<any>(null)
  const hasStarted = useRef(false)

  // Reset everything when text changes (page navigation)
  useEffect(() => {
    // Reset state
    setDisplayedText('')
    setIsAnimating(false)
    setShowBlinkingCursor(false)
    hasStarted.current = false
    count.set(0)

    // Cancel any existing animation
    if (animationRef.current) {
      animationRef.current.stop()
      animationRef.current = null
    }

    // Start the animation after delay
    const timeoutId = setTimeout(() => {
      if (!hasStarted.current) {
        hasStarted.current = true
        setIsAnimating(true)

        // Start typewriter animation
        animationRef.current = animate(count, text.length, {
          type: "tween",
          duration: text.length * (speed / 1000),
          ease: "easeInOut",
          onComplete: () => {
            setIsAnimating(false)
            setShowBlinkingCursor(false)
            onComplete?.()
          }
        })
      }
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      if (animationRef.current) {
        animationRef.current.stop()
        animationRef.current = null
      }
    }
  }, [text, delay, speed, count, onComplete])

  // Update displayed text based on count
  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayedText(text.slice(0, latest))

      // Show cursor only while animating
      if (latest > 0 && latest < text.length) {
        setShowBlinkingCursor(true)
      } else if (latest >= text.length) {
        setShowBlinkingCursor(false)
      }
    })

    return unsubscribe
  }, [rounded, text])

  return (
      <span className={className}>
      {displayedText}
        {/* Only show cursor while typing */}
        {showBlinkingCursor && (
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop"
                }}
                className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
            />
        )}
    </span>
  )
}
