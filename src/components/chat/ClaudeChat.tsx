"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { ClaudeMessage } from "@/components/chat/ClaudeMessage";
import { ClaudeChatInput } from "@/components/chat/ClaudeChatInput";

export function ClaudeChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm an AI assistant trained to answer questions about this portfolio. I can provide details about the projects, research, and professional experience showcased here. What would you like to know?",
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="no-footer flex h-screen flex-col bg-background">
      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="mx-auto max-w-4xl px-6 py-8 space-y-6">
          {messages.map((message, index) => (
            <ClaudeMessage
              key={message.id}
              message={message}
              isLoading={isLoading && index === messages.length - 1}
              onRegenerate={reload}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Chat Input - Sticky to bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/20">
        <ClaudeChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          reload={reload}
        />
      </div>
    </div>
  );
}
