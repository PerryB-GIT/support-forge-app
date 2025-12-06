import OpenAI from "openai";
import type {
  AIProviderInterface,
  Message,
  ChatOptions,
  ChatResponse,
  StreamCallbacks,
} from "../types";
import { DEFAULT_SYSTEM_PROMPT } from "../types";

const DEFAULT_MODEL = "gpt-4-turbo";
const DEFAULT_MAX_TOKENS = 4096;

export class OpenAIProvider implements AIProviderInterface {
  private client: OpenAI;

  constructor(apiKey?: string) {
    this.client = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });
  }

  async chat(messages: Message[], options?: ChatOptions): Promise<ChatResponse> {
    const systemPrompt = options?.systemPrompt || DEFAULT_SYSTEM_PROMPT;
    const model = options?.model || DEFAULT_MODEL;

    // Build messages array with system prompt
    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
    ];

    const response = await this.client.chat.completions.create({
      model,
      max_tokens: options?.maxTokens || DEFAULT_MAX_TOKENS,
      temperature: options?.temperature ?? 0.7,
      messages: openaiMessages,
    });

    const content = response.choices[0]?.message?.content || "";

    return {
      content,
      model: response.model,
      usage: response.usage
        ? {
            inputTokens: response.usage.prompt_tokens,
            outputTokens: response.usage.completion_tokens,
          }
        : undefined,
    };
  }

  async streamChat(
    messages: Message[],
    callbacks: StreamCallbacks,
    options?: ChatOptions
  ): Promise<void> {
    const systemPrompt = options?.systemPrompt || DEFAULT_SYSTEM_PROMPT;
    const model = options?.model || DEFAULT_MODEL;

    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
    ];

    try {
      const stream = await this.client.chat.completions.create({
        model,
        max_tokens: options?.maxTokens || DEFAULT_MAX_TOKENS,
        temperature: options?.temperature ?? 0.7,
        messages: openaiMessages,
        stream: true,
      });

      let fullContent = "";

      for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content || "";
        if (token) {
          fullContent += token;
          callbacks.onToken?.(token);
        }
      }

      callbacks.onComplete?.({
        content: fullContent,
        model,
        usage: undefined, // OpenAI streaming doesn't provide usage in chunks
      });
    } catch (error) {
      callbacks.onError?.(error as Error);
    }
  }
}

export const openai = new OpenAIProvider();
