// ClaudeChatInput.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Square } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ClaudeChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
  reload: () => void;
}

export function ClaudeChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
  reload,
}: ClaudeChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.closest("form");
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSubmit(e);
    }
  };

  const canSubmit = input.trim().length > 0 && !isLoading;

  return (
    <form onSubmit={onSubmit} className="w-full">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative flex w-full items-end rounded-3xl border bg-card transition-all duration-200",
          isFocused
            ? "border-primary/30 shadow-lg"
            : "border-border/30 shadow-sm",
        )}
      >
        <div className="flex flex-1 items-end p-1">
          {/* Main input area */}
          <div className="flex-1 flex items-end px-4 py-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me anything"
              rows={1}
              className="w-full resize-none border-0 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:outline-none focus:ring-0 min-h-[24px] max-h-[200px] overflow-y-auto leading-6"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            />
            <style jsx>{`
              textarea::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>

          {/* Send/Stop button */}
          <div className="flex items-center p-2">
            {isLoading ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={stop}
                className="h-8 w-8 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              >
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!canSubmit}
                className={cn(
                  "h-8 w-8 rounded-full transition-all duration-200",
                  canSubmit
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                    : "bg-muted/30 text-muted-foreground/40 cursor-not-allowed",
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </form>
  );
}
