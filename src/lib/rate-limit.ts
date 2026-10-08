import "server-only";
import { headers } from "next/headers";
import { AppError } from "@/lib/actions/result";

// Stub: allows everything. Wire Upstash Ratelimit here (sliding window per key) before going live.
// Keys used: "request:submit:<ip>"
export async function rateLimit(key: string, limit: number = 10, window: number = 60_000): Promise<{ ok: boolean }> {
  const limited = false;
  if (limited) throw new AppError("RATE_LIMITED");
  return { ok: true };
}

// Generate a client key for rate limiting based on IP address
export async function clientKey(headersList: Headers): Promise<string> {
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? "unknown";
  return ip;
}
