// components/content/TableOfContents.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, List } from 'lucide-react'

interface TocItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    blocks?: any[] // NotionBlock array
    selector?: string // Custom selector for non-Notion content
    className?: string
}

export function TableOfContents({ blocks, selector = 'h1, h2, h3', className = '' }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        if (blocks) {
            // Extract headings from Notion blocks
            const items = blocks
                .filter(block => ['heading_1', 'heading_2', 'heading_3'].includes(block.type))
                .map(block => ({
                    id: block.id,
                    text: block.content,
                    level: parseInt(block.type.split('_')[1])
                }))
            setHeadings(items)
        } else {
            // Extract headings from DOM
            const elements = document.querySelectorAll(selector)
            const items: TocItem[] = []

            elements.forEach((element) => {
                const id = element.id || element.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
                if (!element.id) {
                    element.id = id
                }

                items.push({
                    id,
                    text: element.textContent || '',
                    level: parseInt(element.tagName.charAt(1))
                })
            })

            setHeadings(items)
        }
    }, [blocks, selector])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100

            for (let i = headings.length - 1; i >= 0; i--) {
                const element = document.getElementById(headings[i].id)
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveId(headings[i].id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [headings])

    const handleClick = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            })
        }
    }

    if (headings.length === 0) return null

    return (
        <nav className={`${className}`}>
            <div className="bg-card border border-border rounded-lg p-4">
                <div
                    className="flex items-center justify-between mb-4 cursor-pointer"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <h3 className="font-semibold flex items-center gap-2">
                        <List className="w-4 h-4" />
                        Table of Contents
                    </h3>
                    <motion.div
                        animate={{ rotate: isCollapsed ? 0 : 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                </div>

                <motion.div
                    initial={false}
                    animate={{ height: isCollapsed ? 0 : 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <ul className="space-y-2">
                        {headings.map((heading) => {
                            const isActive = activeId === heading.id
                            const paddingLeft = (heading.level - 1) * 16

                            return (
                                <li key={heading.id}>
                                    <button
                                        onClick={() => handleClick(heading.id)}
                                        className={`
                      block w-full text-left text-sm py-1.5 pr-2 rounded transition-all
                      hover:bg-muted/50 hover:text-foreground
                      ${isActive
                                            ? 'text-primary font-medium bg-primary/10 border-l-2 border-primary'
                                            : 'text-muted-foreground'
                                        }
                    `}
                                        style={{ paddingLeft: `${paddingLeft + 8}px` }}
                                    >
                                        {heading.text}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </motion.div>
            </div>

            {/* Progress indicator */}
            <div className="mt-4 bg-muted rounded-lg p-2">
                <div className="text-xs text-muted-foreground mb-1">Reading Progress</div>
                <div className="h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(headings.findIndex(h => h.id === activeId) + 1) / headings.length * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
        </nav>
    )
}