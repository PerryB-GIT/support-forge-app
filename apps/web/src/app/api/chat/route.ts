import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

// System prompt for Support Forge AI
const SYSTEM_PROMPT = `You are the Support Forge AI Assistant, a helpful and knowledgeable technical support agent for Support Forge, an AI & IT consulting company based in Haverhill, MA.

Your role is to:
- Answer technical questions about IT infrastructure, software, and technology
- Help troubleshoot common technical issues
- Provide guidance on best practices for IT and software development
- Assist with questions about Support Forge services
- Escalate complex issues to human support when necessary

Guidelines:
- Be professional, friendly, and concise
- Provide accurate technical information
- If you're unsure about something, say so and offer to connect them with a human expert
- For billing, account, or sensitive matters, direct users to contact support directly
- Keep responses focused and actionable

Support Forge Services:
- AI Integration & Automation
- IT Infrastructure Management
- Software Development & Consulting
- Technical Support & Training
- Cloud Solutions & Migration

Contact Information:
- Email: perry.bailes@gmail.com
- Phone: 478-299-1604
- Location: Haverhill, MA
- Website: https://support-forge.com`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
  provider?: "claude" | "openai";
  model?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body: ChatRequest = await request.json();
    const { messages, provider = "claude", model } = body;

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Stream response based on provider
    if (provider === "claude") {
      return streamClaude(messages, model);
    } else {
      return streamOpenAI(messages, model);
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

async function streamClaude(messages: Message[], model?: string) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const stream = await anthropic.messages.stream({
    model: model || "claude-3-sonnet-20240229",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  // Create a readable stream for the response
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const chunk = encoder.encode(
              `data: ${JSON.stringify({ content: event.delta.text })}\n\n`
            );
            controller.enqueue(chunk);
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

async function streamOpenAI(messages: Message[], model?: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const stream = await openai.chat.completions.create({
    model: model || "gpt-4-turbo",
    max_tokens: 4096,
    stream: true,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const data = encoder.encode(
              `data: ${JSON.stringify({ content })}\n\n`
            );
            controller.enqueue(data);
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
