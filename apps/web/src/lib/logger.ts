/**
 * Structured Logger
 * Provides simple structured logging with levels and context
 */

export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  data?: any;
}

class Logger {
  private context: string;

  constructor(context: string = "app") {
    this.context = context;
  }

  private formatLog(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
      data,
    };
  }

  private output(entry: LogEntry): void {
    const logStr = JSON.stringify(entry);
    switch (entry.level) {
      case "error":
        console.error(logStr);
        break;
      case "warn":
        console.warn(logStr);
        break;
      case "debug":
        console.debug(logStr);
        break;
      case "info":
      default:
        console.log(logStr);
        break;
    }
  }

  info(message: string, data?: any): void {
    this.output(this.formatLog("info", message, data));
  }

  warn(message: string, data?: any): void {
    this.output(this.formatLog("warn", message, data));
  }

  error(message: string, data?: any): void {
    this.output(this.formatLog("error", message, data));
  }

  debug(message: string, data?: any): void {
    this.output(this.formatLog("debug", message, data));
  }
}

/**
 * Create a logger instance with a specific context
 * @param context - The context name for logs (e.g., "api", "database", "auth")
 * @returns Logger instance
 */
export function createLogger(context: string = "app"): Logger {
  return new Logger(context);
}

/**
 * Global logger instance
 */
export const logger = createLogger("app");

/**
 * Example usage:
 * 
 * const apiLogger = createLogger("api");
 * apiLogger.info("Fetching clients", { userId: "123" });
 * apiLogger.error("Failed to create client", { error: "Email already exists" });
 */
