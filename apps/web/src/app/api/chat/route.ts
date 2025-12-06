import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { applyRateLimit } from "@/lib/rate-limit";
import { prisma } from "@support-forge/database";
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
  conversationId?: string;
}

// Helper to generate conversation title from first message
function generateTitle(content: string): string {
  const maxLength = 50;
  const cleaned = content.replace(/\n/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength).trim() + "...";
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(session.user.id, "chat");
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body: ChatRequest = await request.json();
    const { messages, provider = "claude", model, conversationId } = body;

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const selectedModel = model || (provider === "claude" ? "claude-3-sonnet-20240229" : "gpt-4-turbo");

    // Get or create conversation
    let convId = conversationId;
    let isNewConversation = false;

    if (!convId) {
      // Create new conversation
      const lastUserMessage = messages.filter(m => m.role === "user").pop();
      const conversation = await prisma.conversation.create({
        data: {
          title: generateTitle(lastUserMessage?.content || "New Conversation"),
          model: selectedModel,
          userId: session.user.id,
        },
      });
      convId = conversation.id;
      isNewConversation = true;
    } else {
      // Verify conversation ownership
      const existing = await prisma.conversation.findFirst({
        where: { id: convId, userId: session.user.id },
      });
      if (!existing) {
        return new Response(JSON.stringify({ error: "Conversation not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Save the latest user message
    const latestUserMessage = messages[messages.length - 1];
    if (latestUserMessage && latestUserMessage.role === "user") {
      await prisma.message.create({
        data: {
          conversationId: convId,
          role: "USER",
          content: latestUserMessage.content,
        },
      });
    }

    // Stream response based on provider
    if (provider === "claude") {
      return streamClaude(messages, selectedModel, convId!, isNewConversation);
    } else {
      return streamOpenAI(messages, selectedModel, convId!, isNewConversation);
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

async function streamClaude(
  messages: Message[],
  model: string,
  conversationId: string,
  isNewConversation: boolean
) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const stream = await anthropic.messages.stream({
    model,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  let fullContent = "";
  let inputTokens = 0;
  let outputTokens = 0;

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        // Send conversation ID first
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "metadata",
              conversationId,
              isNewConversation
            })}\n\n`
          )
        );

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullContent += event.delta.text;
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "content", content: event.delta.text })}\n\n`
              )
            );
          }
        }

        // Get final usage info
        const finalMessage = await stream.finalMessage();
        inputTokens = finalMessage.usage.input_tokens;
        outputTokens = finalMessage.usage.output_tokens;

        // Save assistant message to database
        await prisma.message.create({
          data: {
            conversationId,
            role: "ASSISTANT",
            content: fullContent,
            model,
            tokenCount: outputTokens,
          },
        });

        // Update conversation timestamp
        await prisma.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        });

        // Send completion signal with usage info
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "done",
              usage: { inputTokens, outputTokens }
            })}\n\n`
          )
        );
        controller.close();
      } catch (error) {
        console.error("Streaming error:", error);
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

async function streamOpenAI(
  messages: Message[],
  model: string,
  conversationId: string,
  isNewConversation: boolean
) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const stream = await openai.chat.completions.create({
    model,
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

  let fullContent = "";
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        // Send conversation ID first
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "metadata",
              conversationId,
              isNewConversation
            })}\n\n`
          )
        );

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            fullContent += content;
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "content", content })}\n\n`
              )
            );
          }
        }

        // Save assistant message to database
        await prisma.message.create({
          data: {
            conversationId,
            role: "ASSISTANT",
            content: fullContent,
            model,
          },
        });

        // Update conversation timestamp
        await prisma.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        });

        // Send completion signal
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`)
        );
        controller.close();
      } catch (error) {
        console.error("Streaming error:", error);
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
