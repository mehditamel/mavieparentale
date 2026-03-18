/**
 * Simple in-memory rate limiter for API routes.
 * Uses a sliding window per key.
 *
 * For production at scale, replace with @upstash/ratelimit + Redis.
 */

const store = new Map<string, { count: number; resetAt: number }>();

/**
 * Returns `true` if the request should be rate-limited (blocked).
 *
 * @param key - Unique identifier (e.g. "ai-coach" or "banking-connect")
 * @param limit - Maximum number of requests per window
 * @param windowMs - Window duration in milliseconds
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count++;
  if (entry.count > limit) {
    return true;
  }

  return false;
}
