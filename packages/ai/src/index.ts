// Support Forge AI Package
// Unified interface for Claude and OpenAI

import { ClaudeProvider } from "./providers/claude";
import { OpenAIProvider } from "./providers/openai";
import type {
  AIProvider,
  AIProviderInterface,
  Message,
  ChatOptions,
  ChatResponse,
  StreamCallbacks,
} from "./types";

export * from "./types";
export { ClaudeProvider } from "./providers/claude";
export { OpenAIProvider } from "./providers/openai";

// Available models
export const AVAILABLE_MODELS = {
  claude: [
    { id: "claude-3-opus-20240229", name: "Claude 3 Opus", description: "Most capable" },
    { id: "claude-3-sonnet-20240229", name: "Claude 3 Sonnet", description: "Balanced" },
    { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku", description: "Fastest" },
  ],
  openai: [
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Most capable" },
    { id: "gpt-4", name: "GPT-4", description: "Reliable" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fastest" },
  ],
} as const;

// Unified AI client that can switch between providers
export class SupportForgeAI {
  private providers: Map<AIProvider, AIProviderInterface>;
  private currentProvider: AIProvider;

  constructor(defaultProvider: AIProvider = "claude") {
    this.providers = new Map();
    this.currentProvider = defaultProvider;

    // Initialize providers lazily
    if (process.env.ANTHROPIC_API_KEY) {
      this.providers.set("claude", new ClaudeProvider());
    }
    if (process.env.OPENAI_API_KEY) {
      this.providers.set("openai", new OpenAIProvider());
    }
  }

  setProvider(provider: AIProvider): void {
    if (!this.providers.has(provider)) {
      throw new Error(`Provider ${provider} is not configured. Check your API keys.`);
    }
    this.currentProvider = provider;
  }

  getProvider(): AIProvider {
    return this.currentProvider;
  }

  getAvailableProviders(): AIProvider[] {
    return Array.from(this.providers.keys());
  }

  private getActiveProvider(): AIProviderInterface {
    const provider = this.providers.get(this.currentProvider);
    if (!provider) {
      throw new Error(
        `Provider ${this.currentProvider} is not configured. Check your API keys.`
      );
    }
    return provider;
  }

  async chat(messages: Message[], options?: ChatOptions): Promise<ChatResponse> {
    return this.getActiveProvider().chat(messages, options);
  }

  async streamChat(
    messages: Message[],
    callbacks: StreamCallbacks,
    options?: ChatOptions
  ): Promise<void> {
    return this.getActiveProvider().streamChat(messages, callbacks, options);
  }
}

// Export singleton instance
export const ai = new SupportForgeAI();
