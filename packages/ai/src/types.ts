// AI Provider Types

export type AIProvider = "claude" | "openai";

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface ChatResponse {
  content: string;
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface StreamCallbacks {
  onToken?: (token: string) => void;
  onComplete?: (response: ChatResponse) => void;
  onError?: (error: Error) => void;
}

export interface AIProviderInterface {
  chat(messages: Message[], options?: ChatOptions): Promise<ChatResponse>;
  streamChat(
    messages: Message[],
    callbacks: StreamCallbacks,
    options?: ChatOptions
  ): Promise<void>;
}

// Default system prompt for Support Forge AI assistant
export const DEFAULT_SYSTEM_PROMPT = `You are the Support Forge AI Assistant, a helpful and knowledgeable technical support agent for Support Forge, an AI & IT consulting company.

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
- Cloud Solutions & Migration`;
