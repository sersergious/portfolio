import { Message } from 'ai'
import { Bot, User, Copy, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ClaudeMessageProps {
    message: Message
    isLoading?: boolean
    onRegenerate?: () => void
}

export function ClaudeMessage({ message, isLoading, onRegenerate }: ClaudeMessageProps) {
    const {
        role,
        content
    } = message

    const isUser = role === 'user'
    const [showFeedback, setShowFeedback] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
    }

    const messageVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    }

    return (
        <motion.div
            variants={messageVariants}
            initial="initial"
            animate="animate"
            className={cn(
                "flex items-start gap-3 w-full",
                isUser ? "justify-end" : "justify-start"
            )}
            onMouseEnter={() => setShowFeedback(true)}
            onMouseLeave={() => setShowFeedback(false)}
        >
            {!isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                </div>
            )}

            <div className={cn(
                "relative max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                isUser ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted/60 rounded-bl-none"
            )}>
                <div className="prose prose-sm max-w-none text-current prose-p:leading-relaxed prose-pre:bg-background/50 prose-pre:p-3 prose-pre:rounded-md">
                     {isLoading && !isUser ? (
                        <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="h-2 w-2 rounded-full bg-current" />
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="h-2 w-2 rounded-full bg-current" />
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} className="h-2 w-2 rounded-full bg-current" />
                            </div>
                        </div>
                    ) : (
                       <ReactMarkdown remarkPlugins={[remarkGfm]}>
                           {content}
                       </ReactMarkdown>
                    )}
                </div>
                
                {!isUser && !isLoading && (
                    <AnimatePresence>
                        {showFeedback && (
                             <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute -bottom-8 left-0 flex items-center gap-1"
                            >
                                <Button variant="ghost" size="icon_xs" onClick={handleCopy} className="text-muted-foreground">
                                    <Copy className="h-3.5 w-3.5" />
                                </Button>
                                {onRegenerate && (
                                    <Button variant="ghost" size="icon_xs" onClick={onRegenerate} className="text-muted-foreground">
                                        <RotateCcw className="h-3.5 w-3.5" />
                                    </Button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            {isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                </div>
            )}
        </motion.div>
    )
}
