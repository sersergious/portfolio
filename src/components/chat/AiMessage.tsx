import { Message } from 'ai';
import { Bot, User, Copy, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ClaudeMessageProps {
  message: Message;
  isLoading?: boolean;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onFeedback?: (type: 'up' | 'down') => void;
}

export function AiMessage({
  message,
  isLoading,
  onCopy,
  onRegenerate,
  onFeedback
}: ClaudeMessageProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const handleCopy = () => {
    if (message.content) {
      navigator.clipboard?.writeText(message.content);
      onCopy?.();
    }
  };

  return (
    <div className={cn(
      "group relative",
      // User messages have subtle background
      isUser && "bg-muted/30",
      // Assistant messages are on clean background
      isAssistant && "bg-background",
      // Hover state for better interactivity
      "hover:bg-muted/20 transition-colors duration-200"
    )}>
      <div className="mx-auto max-w-4xl px-6 py-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 font-medium text-sm",
            isUser
              ? "bg-primary text-primary-foreground border-primary/30"
              : "bg-accent text-accent-foreground border-accent/30"
          )}>
            {isUser ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-5 w-5" />
            )}
          </div>

          {/* Message Content */}
          <div className="flex-1 space-y-2 min-w-0">
            {/* Role Label */}
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-sm font-semibold",
                isUser ? "text-primary" : "text-accent"
              )}>
                {isUser ? 'You' : 'Assistant'}
              </span>
              {isLoading && isAssistant && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"></div>
                  </div>
                  <span className="text-xs">thinking</span>
                </div>
              )}
            </div>

            {/* Message Text */}
            <div className={cn(
              "prose prose-sm max-w-none",
              "text-foreground leading-relaxed",
              // Custom prose styling for your theme
              "prose-headings:text-foreground prose-headings:font-semibold",
              "prose-p:text-foreground prose-p:my-3 prose-p:leading-7",
              "prose-a:text-primary hover:prose-a:text-primary/80",
              "prose-code:text-accent prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
              "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
              "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground",
              "prose-strong:text-foreground prose-strong:font-semibold",
              "prose-ul:my-3 prose-ol:my-3 prose-li:my-1",
              // Dark mode adjustments
              "dark:prose-invert"
            )}>
              {/* Handle both content and parts for AI SDK compatibility */}
              {message.content ? (
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
              ) : (
                message.parts?.map((part, index) => {
                  if (part.type === 'text') {
                    return (
                      <div key={index} className="whitespace-pre-wrap">
                        {part.text}
                      </div>
                    );
                  }
                  return null;
                })
              )}
            </div>

            {/* Message Actions - Only for assistant messages */}
            {isAssistant && !isLoading && (
              <div className="flex items-center gap-1 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>

                {onRegenerate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRegenerate}
                    className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                )}

                <div className="w-px h-4 bg-border mx-1" />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFeedback?.('up')}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFeedback?.('down')}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}