// Shared constants

export const APP_NAME = "Support Forge";
export const APP_DESCRIPTION = "AI & IT Consulting Platform";

// Contact Information
export const CONTACT_INFO = {
  email: "contact@support-forge.com",
  phone: "978-219-9092",
  phoneRaw: "9782199092",
  location: "Haverhill, MA",
  website: "https://support-forge.com",
} as const;

// Appointment types
export const APPOINTMENT_TYPES = [
  { value: "consultation", label: "Initial Consultation" },
  { value: "technical", label: "Technical Support" },
  { value: "review", label: "Project Review" },
  { value: "strategy", label: "Strategy Session" },
] as const;

// Appointment duration options (in minutes)
export const APPOINTMENT_DURATIONS = [
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" },
] as const;

// Ticket priorities
export const TICKET_PRIORITIES = {
  LOW: { label: "Low", color: "#10b981" },
  MEDIUM: { label: "Medium", color: "#f59e0b" },
  HIGH: { label: "High", color: "#f97316" },
  URGENT: { label: "Urgent", color: "#ef4444" },
} as const;

// Project statuses
export const PROJECT_STATUSES = {
  ACTIVE: { label: "Active", color: "#10b981" },
  COMPLETED: { label: "Completed", color: "#6366f1" },
  ON_HOLD: { label: "On Hold", color: "#f59e0b" },
  CANCELLED: { label: "Cancelled", color: "#6b7280" },
} as const;

// AI Models
export const AI_MODELS = {
  claude: [
    { value: "claude-3-opus-20240229", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet-20240229", label: "Claude 3 Sonnet" },
    { value: "claude-3-haiku-20240307", label: "Claude 3 Haiku" },
  ],
  openai: [
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  ],
} as const;

// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REGISTER: "/api/auth/register",
    SESSION: "/api/auth/session",
  },
  USERS: "/api/users",
  APPOINTMENTS: "/api/appointments",
  PROJECTS: "/api/projects",
  TICKETS: "/api/tickets",
  CHAT: "/api/chat",
  DOCUMENTS: "/api/documents",
  INVOICES: "/api/invoices",
} as const;
