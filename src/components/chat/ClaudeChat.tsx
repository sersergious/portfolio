'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import {Bot} from "lucide-react";
import {ClaudeMessage} from "@/components/chat/ClaudeMessage";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {ClaudeChatInput} from "@/components/chat/ClaudeChatInput";

export function ClaudeChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm Claude, your portfolio assistant. I'm here to help you learn about the research, projects, and experience featured in this portfolio. What would you like to explore?"
      }
    ]
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleFeedback = (messageId: string, type: 'up' | 'down') => {
    // Implement feedback logic here
    console.log(`Feedback for ${messageId}: ${type}`);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-foreground">Portfolio Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Powered by AI • Ask me about projects, research, and experience
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-2 w-2 rounded-full",
                isLoading ? "bg-yellow-500 animate-pulse" : "bg-green-500"
              )} />
              <span className="text-xs font-medium text-muted-foreground">
                {isLoading ? 'Thinking...' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
      >
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center p-8">
            <div className="text-center space-y-4 max-w-md">
              <div className="h-16 w-16 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto">
                <Bot className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Welcome to the Portfolio
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I&#39;m here to help you explore the projects, research, and experience showcased in this portfolio.
                  Ask me anything you&#39;d like to know!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Message List */}
        {messages.map((message, index) => (
          <ClaudeMessage
            key={message.id}
            message={message}
            isLoading={isLoading && index === messages.length - 1 && message.role === 'assistant'}
            onCopy={() => console.log('Message copied')}
            onRegenerate={() => reload()}
            onFeedback={(type) => handleFeedback(message.id, type)}
          />
        ))}

        <div ref={messagesEndRef} />

        {/* Add some bottom padding */}
        <div className="h-4" />
      </div>

      {/* Error Display */}
      {error && (
        <div className="border-t border-destructive/20 bg-destructive/5 px-6 py-3">
          <div className="mx-auto max-w-4xl flex items-center justify-between">
            <span className="text-sm text-destructive">
              I encountered an error. Please try again.
            </span>
            <Button
              onClick={() => reload()}
              size="sm"
              variant="outline"
              className="border-destructive/20 text-destructive hover:bg-destructive/10"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Chat Input */}
      <ClaudeChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        reload={reload}
      />
    </div>
  );
}
