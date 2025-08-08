// ClaudeChat.tsx
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
    <div className="flex h-screen flex-col bg-background">
      {/* Messages Area - No borders */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="space-y-6">
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
        </div>
      </main>

      {/* Chat Input - No top border, floating style */}
      <div className="w-full bg-background pb-6">
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
