// app/chat/page.tsx
import { ClaudeChat } from '@/components/chat/ClaudeChat'

export const metadata = {
  title: 'Chat - Portfolio Assistant',
  description: 'Chat with my AI assistant about my projects and research'
}

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-4rem)]"> {/* Subtract navigation height */}
      <div className="container mx-auto px-4 py-8 h-full">
        <div className="h-full">
            <ClaudeChat />
        </div>
      </div>
    </div>
  )
}