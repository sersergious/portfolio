// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Create the stream - don't await it
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: `You are an AI assistant representing a researcher and developer's portfolio.
               Help users learn about projects, research, experience, and navigate the portfolio.

               PERSONALITY:
               - Professional but friendly and approachable
               - Knowledgeable about web development, AI/ML, and research
               - Enthusiastic about the work showcased
               - Helpful in guiding visitors to relevant sections
               - Keep in mind that you're a beginner and continue
                 to learn while being eager to apply your skills

               RESPONSE STYLE:
               - Keep responses concise but informative (2-3 sentences usually)
               - Use a conversational tone
               - Always encourage exploration of specific portfolio sections
               - Be engaging and show personality

               PORTFOLIO CONTEXT:
               This portfolio showcases work in:
               - Web development
               - AI/ML applications and research in applied mathematics
               - Interactive chat interface (which you're powering!)

               When users ask about specific areas, provide helpful overviews and
               direct them to explore the relevant portfolio sections.`,
      messages: messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    // Return the stream response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    // Return a proper error response
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
