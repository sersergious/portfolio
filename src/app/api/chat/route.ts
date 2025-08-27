// app/api/chat/route.ts
import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Optional: Use edge runtime for better performance
export const runtime = 'edge';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    // Determine model based on query complexity
    let model;

    if (
      lastMessage.includes('hi') ||
      lastMessage.includes('hello') ||
      lastMessage.length < 20
    ) {
      // Greetings = smallest, fastest model
      model = groq('llama-3.1-8b-instant');
    } else if (
      lastMessage.includes('research') ||
      lastMessage.includes('technical') ||
      lastMessage.includes('explain') ||
      lastMessage.includes('code') ||
      lastMessage.includes('algorithm')
    ) {
      // Technical questions = larger model
      model = groq('llama-3.3-70b-versatile');
    } else {
      // Default = balanced model
      model = groq('meta-llama/llama-guard-4-12b');
    }

    // Don't await streamText - it returns immediately
    const result = streamText({
      model,
      system: `You are an AI assistant for a developer and researcher's portfolio website.

               PERSONALITY:
               - Professional but friendly and approachable
               - Knowledgeable about web development, AI/ML, and research
               - Enthusiastic about the work showcased
               - Keep responses concise (2-3 sentences max unless asked for details)

               PORTFOLIO CONTEXT:
               The portfolio belongs to Serhii Kuzmin, a senior at University of Scranton studying Computer Science and Mathematical Sciences.

               Key areas:
               - Web development (Next.js, TypeScript, React)
               - AI/ML and applied mathematics research
               - Competitive programming background
               - Research interests: AI, Quantum Computing, Cryptography

               When users ask about specific areas, provide helpful overviews and direct them to explore the relevant portfolio sections.`,
      messages,
      temperature: 0.7, // Balanced creativity and focus
    });

    // Return the stream response
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);

    // Return a proper error response
    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
