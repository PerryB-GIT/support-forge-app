// Shared type definitions

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// User types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "CLIENT";
  company?: string;
  phone?: string;
  image?: string;
}

// AI Chat types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

export interface ChatConversation {
  id: string;
  title?: string;
  messages: ChatMessage[];
  model: string;
  createdAt: Date;
}

export type AIProvider = "claude" | "openai";

export interface AIConfig {
  provider: AIProvider;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

// Appointment types
export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface BookingRequest {
  date: string;
  time: string;
  type: string;
  notes?: string;
}
