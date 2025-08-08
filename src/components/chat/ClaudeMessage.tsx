// ClaudeMessage.tsx
"use client";

import {
  Bot,
  User,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Message } from "ai";

interface ClaudeMessageProps {
  message: Message;
  isLoading?: boolean;
  onRegenerate?: () => void;
}

export function ClaudeMessage({
  message,
  isLoading,
  onRegenerate,
}: ClaudeMessageProps) {
  const { role, content } = message;
  const isUser = role === "user";
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group relative flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
      onMouseEnter={() => !isLoading && setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
            <Bot className="h-5 w-5 text-accent-foreground" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn("flex-1 space-y-2 min-w-0", isUser && "flex justify-end")}
      >
        <div
          className={cn(
            "relative rounded-[1.25rem] px-4 py-3 border break-words overflow-hidden",
            isUser
              ? "bg-card text-primary-foreground border-border/30 max-w-[85%] inline-block"
              : "bg-card text-card-foreground border-border/40 max-w-full",
          )}
        >
          {isLoading && !content ? (
            <div className="flex items-center gap-1.5 py-1">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-current opacity-50"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="h-2 w-2 rounded-full bg-current opacity-50"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="h-2 w-2 rounded-full bg-current opacity-50"
              />
            </div>
          ) : (
            <div
              className={cn(
                "prose prose-sm max-w-none break-words",
                isUser && "prose-invert",
                "prose-p:leading-relaxed prose-p:mb-0",
                "prose-pre:bg-background/10 prose-pre:border prose-pre:border-border/20",
                "prose-code:text-[13px] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
                "prose-code:bg-background/10 prose-code:before:content-none prose-code:after:content-none",
                "prose-ul:my-2 prose-ol:my-2 prose-li:my-0",
                "prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2",
                "[&>*:last-child]:mb-0",
              )}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm as any]}>
                {content || ""}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Action buttons for assistant messages */}
        {!isUser && !isLoading && content && (
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                {onRegenerate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRegenerate}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1" />
                    Regenerate
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
