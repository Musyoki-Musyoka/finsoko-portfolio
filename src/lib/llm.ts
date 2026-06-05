/**
 * FinSoko LLM Provider
 *
 * Connects to an OpenAI-compatible chat completions API.
 * Configure via environment variables:
 *   - LLM_API_URL   (required) — API base URL, e.g. "https://api.example.com/v1"
 *   - LLM_API_KEY   (required) — API key for authentication
 *   - LLM_TOKEN     (optional) — Additional session token
 *   - LLM_USER_ID   (optional) — User identifier
 *   - LLM_CHAT_ID   (optional) — Chat session identifier
 *
 * Falls back to a local development proxy when env vars are not set.
 */

/* ──────────────── Public API ──────────────── */

export interface ChatMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

export interface ChatCompletionResult {
  content: string;
  model?: string;
}

/* ──────────────── API Configuration ──────────────── */

const API_URL = process.env.LLM_API_URL;
const API_KEY = process.env.LLM_API_KEY;
const TOKEN = process.env.LLM_TOKEN;
const USER_ID = process.env.LLM_USER_ID;
const CHAT_ID = process.env.LLM_CHAT_ID;

const hasApiConfig = !!(API_URL && API_KEY);

/* ──────────────── Direct API Client ──────────────── */

async function callAPI(messages: ChatMessage[]): Promise<ChatCompletionResult> {
  const url = `${API_URL}/chat/completions`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  if (CHAT_ID) headers["X-Chat-Id"] = CHAT_ID;
  if (USER_ID) headers["X-User-Id"] = USER_ID;
  if (TOKEN) headers["X-Token"] = TOKEN;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      thinking: { type: "disabled" },
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => "Unknown error");
    throw new Error(`LLM API error (${response.status}): ${err}`);
  }

  const data = await response.json();
  return {
    content: data.choices?.[0]?.message?.content ?? "Response unavailable.",
    model: data.model,
  };
}

/* ──────────────── Local Dev Proxy ──────────────── */

const PROXY_URL = process.env.LLM_PROXY_URL || "http://localhost:3031";

async function callProxy(messages: ChatMessage[]): Promise<ChatCompletionResult> {
  const response = await fetch(`${PROXY_URL}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "finsoko-llm",
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature: 0.3,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => "Unknown error");
    throw new Error(`LLM proxy error (${response.status}): ${err}`);
  }

  const data = await response.json();
  return {
    content: data.choices?.[0]?.message?.content ?? "Response unavailable.",
    model: data.model,
  };
}

/* ──────────────── Main Entry ──────────────── */

/**
 * Create a chat completion.
 *
 * Tries the configured API first, then falls back to a local dev proxy.
 * The caller should catch errors and use a deterministic fallback.
 */
export async function createChatCompletion(
  messages: ChatMessage[]
): Promise<ChatCompletionResult> {
  // 1. Try configured API endpoint (works in production)
  if (hasApiConfig) {
    try {
      return await callAPI(messages);
    } catch (err: unknown) {
      console.warn("[LLM] API call failed, trying fallback:", err instanceof Error ? err.message : err);
    }
  }

  // 2. Try local dev proxy (works during development)
  try {
    return await callProxy(messages);
  } catch {
    // Proxy not available
  }

  // Both failed — caller should use deterministic fallback
  throw new Error("LLM unavailable. API not configured or call failed. Local proxy also unavailable.");
}
