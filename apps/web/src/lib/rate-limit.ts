/**
 * Simple in-memory rate limiter for API routes.
 * For production, consider using Redis-based rate limiting.
 */

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number; // Max requests per interval
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

/**
 * Rate limiter result
 */
export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
  limit: number;
}

/**
 * Check and update rate limit for a given identifier.
 *
 * @param identifier - Unique identifier (usually user ID or IP)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier;

  let entry = rateLimitStore.get(key);

  // Create new entry if doesn't exist or expired
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + config.interval,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);

  const remaining = Math.max(0, config.limit - entry.count);
  const success = entry.count <= config.limit;

  return {
    success,
    remaining,
    reset: entry.resetTime,
    limit: config.limit,
  };
}

/**
 * Rate limit presets for different API endpoints
 */
export const rateLimitPresets = {
  // Chat API: 30 requests per minute
  chat: {
    interval: 60 * 1000,
    limit: 30,
  },
  // Conversations API: 100 requests per minute
  conversations: {
    interval: 60 * 1000,
    limit: 100,
  },
  // Auth API: 10 requests per minute (stricter for security)
  auth: {
    interval: 60 * 1000,
    limit: 10,
  },
} as const;

/**
 * Apply rate limiting to a Next.js API route.
 * Returns null if rate limit is not exceeded, or a Response if it is.
 *
 * @param identifier - Unique identifier
 * @param preset - Rate limit preset name
 * @returns null or Response
 */
export function applyRateLimit(
  identifier: string,
  preset: keyof typeof rateLimitPresets
): Response | null {
  const config = rateLimitPresets[preset];
  const result = checkRateLimit(identifier, config);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: "Too many requests",
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": result.limit.toString(),
          "X-RateLimit-Remaining": result.remaining.toString(),
          "X-RateLimit-Reset": result.reset.toString(),
          "Retry-After": Math.ceil((result.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  return null;
}
