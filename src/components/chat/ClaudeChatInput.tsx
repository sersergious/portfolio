import { useState, useRef, useEffect } from 'react'
import { Send, Square, RotateCcw, Paperclip, Mic } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '../ui/button'
import { cn } from "@/lib/utils"
import { motion } from 'framer-motion'

interface ClaudeChatInputProps {
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
    stop: () => void
    reload: () => void
}

export function ClaudeChatInput({
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
}: ClaudeChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            const scrollHeight = textarea.scrollHeight
            textarea.style.height = `${Math.min(scrollHeight, 256)}px`
        }
    }, [input])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (input.trim() && !isLoading) {
                handleSubmit(e as never)
            }
        }
    }

    const canSubmit = input.trim().length > 0 && !isLoading

    return (
        <div className="w-full px-6 py-6">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className={cn(
                        "relative flex w-full flex-col overflow-hidden rounded-3xl border bg-background shadow-lg transition-all",
                        isFocused ? "ring-2 ring-primary/50" : "border-border/30"
                    )}
                >
                    <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Ask me anything about this portfolio..."
                        className="w-full resize-none border-0 bg-transparent px-6 py-5 pr-32 text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[60px]"
                        rows={1}
                    />
                    <div className="flex items-center justify-between px-4 pb-3">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon_sm" className="text-muted-foreground hover:text-foreground">
                                <Paperclip className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon_sm" className="text-muted-foreground hover:text-foreground">
                                <Mic className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-3">
                            {isLoading && (
                                 <Button variant="outline" size="default" onClick={stop} className="gap-2">
                                    <Square className="h-4 w-4" />
                                    Stop
                                </Button>
                            )}
                             {!isLoading && (
                                <Button variant="ghost" size="default" onClick={() => reload()} className="text-muted-foreground hover:text-foreground">
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Regenerate
                                </Button>
                            )}
                            <Button
                                type="submit"
                                size="default"
                                disabled={!canSubmit}
                                onClick={(e) => handleSubmit(e as never)}
                                className="rounded-xl px-6 py-2 bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
                <p className="mt-3 text-center text-sm text-muted-foreground">Shift+Enter for new line. AI may produce inaccuracies.</p>
            </div>
        </div>
    )
}
