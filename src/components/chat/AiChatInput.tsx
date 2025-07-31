// ===========================================
// CLAUDE-STYLE CHAT INPUT
// ===========================================

import { useState, useRef, useEffect } from 'react';
import { Send, Square, RotateCcw } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import {cn} from "@/lib/utils";

interface AiChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
  reload: () => void;
  disabled?: boolean;
}

export function AiChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
  reload,
  disabled = false
}: AiChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading && !disabled) {
        handleSubmit(e as never);
      }
    }
  };

  const canSubmit = input.trim() && !isLoading && !disabled;

  return (

      <div className="mx-auto max-w-4xl px-4 py-4">
        {/* Input Container */}
        <div className={cn(
          "relative transition-colors duration-200",
          isFocused
            ? "border-primary/50 shadow-sm"
            : "border-border hover:border-border/80"
        )}>
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Message your portfolio assistant..."
            disabled={disabled}
            className={cn(
              "min-h-[52px] resize-none border-0 bg-transparent px-4 py-3 pr-16",
              "text-base placeholder:text-muted-foreground",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
            )}

          />

          {/* Action Buttons */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            {isLoading ? (
              <Button
                type="button"
                onClick={stop}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={reload}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                disabled={disabled}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}

            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (canSubmit) {
                  handleSubmit(e as never);
                }
              }}
              size="sm"
              className={cn(
                "h-8 w-8 p-0 rounded-lg transition-all duration-200",
                canSubmit
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              disabled={!canSubmit}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {input.length > 0 && (
            <span>{input.length} characters</span>
          )}
        </div>
      </div>
  );
}
