import Anthropic from "@anthropic-ai/sdk";
import type {
  AIProviderInterface,
  Message,
  ChatOptions,
  ChatResponse,
  StreamCallbacks,
} from "../types";
import { DEFAULT_SYSTEM_PROMPT } from "../types";

const DEFAULT_MODEL = "claude-3-sonnet-20240229";
const DEFAULT_MAX_TOKENS = 4096;

export class ClaudeProvider implements AIProviderInterface {
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
    });
  }

  async chat(messages: Message[], options?: ChatOptions): Promise<ChatResponse> {
    const systemPrompt = options?.systemPrompt || DEFAULT_SYSTEM_PROMPT;
    const model = options?.model || DEFAULT_MODEL;

    // Convert messages to Anthropic format (exclude system messages)
    const anthropicMessages = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const response = await this.client.messages.create({
      model,
      max_tokens: options?.maxTokens || DEFAULT_MAX_TOKENS,
      temperature: options?.temperature ?? 0.7,
      system: systemPrompt,
      messages: anthropicMessages,
    });

    const textContent = response.content.find((c) => c.type === "text");
    const content = textContent?.type === "text" ? textContent.text : "";

    return {
      content,
      model: response.model,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    };
  }

  async streamChat(
    messages: Message[],
    callbacks: StreamCallbacks,
    options?: ChatOptions
  ): Promise<void> {
    const systemPrompt = options?.systemPrompt || DEFAULT_SYSTEM_PROMPT;
    const model = options?.model || DEFAULT_MODEL;

    const anthropicMessages = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    try {
      const stream = await this.client.messages.stream({
        model,
        max_tokens: options?.maxTokens || DEFAULT_MAX_TOKENS,
        temperature: options?.temperature ?? 0.7,
        system: systemPrompt,
        messages: anthropicMessages,
      });

      let fullContent = "";

      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          const token = event.delta.text;
          fullContent += token;
          callbacks.onToken?.(token);
        }
      }

      const finalMessage = await stream.finalMessage();

      callbacks.onComplete?.({
        content: fullContent,
        model: finalMessage.model,
        usage: {
          inputTokens: finalMessage.usage.input_tokens,
          outputTokens: finalMessage.usage.output_tokens,
        },
      });
    } catch (error) {
      callbacks.onError?.(error as Error);
    }
  }
}

export const claude = new ClaudeProvider();
