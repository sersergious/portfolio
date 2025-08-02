'use client'

import { useState, useCallback } from 'react'
import { TypewriterText } from './TypewriterText'

interface SequentialTypewriterProps {
    lines: Array<{
        text: string
        className?: string
        delay?: number
        speed?: number
    }>
    className?: string
}

export function SequentialTypewriter({ lines, className = '' }: SequentialTypewriterProps) {
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [completedLines, setCompletedLines] = useState<number[]>([])

    const handleLineComplete = useCallback((index: number) => {
        setCompletedLines(prev => [...prev, index])
        if (index < lines.length - 1) {
            setCurrentLineIndex(index + 1)
        }
    }, [lines.length])

    return (
        <div className={className}>
            {lines.map((line, index) => (
                <div key={index} className="block">
                    {index <= currentLineIndex && (
                        <TypewriterText
                            text={line.text}
                            className={line.className}
                            delay={line.delay || 0}
                            speed={line.speed || 50}
                            onComplete={() => handleLineComplete(index)}
                            showCursor={index === currentLineIndex}
                        />
                    )}
                    {completedLines.includes(index) && index < currentLineIndex && (
                        <span className={line.className}>{line.text}</span>
                    )}
                </div>
            ))}
        </div>
    )
}
