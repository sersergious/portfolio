// AssistantChat.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { AssistantMessage } from '@/components/_chat/AssistantMessage';
import { AssistantChatInput } from '@/components/_chat/AssistantChatInput';

// export function AssistantChat() {
//   const {
//     messages,
//     input,
//     handleInputChange,
//     handleSubmit,
//     isLoading,
//     error,
//     reload,
//     stop,
//   } = useChat({
//     api: "/api/chat",
//     initialMessages: [
//       {
//         id: "welcome",
//         role: "assistant",
//         content:
//           "Hello! I'm an AI assistant trained to answer questions about this portfolio. I can provide details about the projects, research, and professional experience showcased here. What would you like to know?",
//       },
//     ],
//   });

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Show error if there is one
//   useEffect(() => {
//     if (error) {
//       console.error("Chat error:", error);
//     }
//   }, [error]);

//   return (
//     <div className="flex h-screen flex-col bg-background">
//       {/* Messages Area */}
//       <main className="flex-1 overflow-y-auto pb-28">
//         <div className="mx-auto max-w-3xl px-4 pt-4">
//           <div className="space-y-6">
//             {messages.map((message, index) => (
//               <AssistantMessage
//                 key={message.id}
//                 message={message}
//                 isLoading={
//                   isLoading &&
//                   index === messages.length - 1 &&
//                   message.role === "assistant"
//                 }
//                 onRegenerate={reload}
//               />
//             ))}
//             {/* Show loading state for assistant's response */}
//             {isLoading && messages[messages.length - 1]?.role === "user" && (
//               <AssistantMessage
//                 message={{
//                   id: "loading",
//                   role: "assistant",
//                   content: "",
//                 }}
//                 isLoading={true}
//               />
//             )}
//             {error && (
//               <div className="text-red-500 text-sm p-4 border border-red-200 rounded-lg">
//                 Error: {error.message}
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         </div>
//       </main>

//       {/* Chat Input - Sticky at bottom */}
//       <div className="fixed bottom-0 left-0 w-full bg-background px-4 pb-5">
//         <div className="mx-auto max-w-3xl">
//           <AssistantChatInput
//             input={input}
//             handleInputChange={handleInputChange}
//             handleSubmit={handleSubmit}
//             isLoading={isLoading}
//             stop={stop}
//             reload={reload}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export function AssistantChat() {
  return <div></div>;
}
