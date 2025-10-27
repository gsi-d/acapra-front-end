// Simple fetch wrapper for the external API
// Base URL is taken from NEXT_PUBLIC_API_BASE, defaulting to "/api" which is
// proxied via next.config.ts to your Node backend.

// Base URL:
// - If NEXT_PUBLIC_API_BASE is provided (e.g., http://localhost:3001), use it as-is (no automatic "/api" suffix).
// - If not provided, default to Next.js rewrite path "/api".
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001").replace(/\/$/, "");

type Json = Record<string, any> | Array<any> | null;

export async function apiGet<T = any>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    // avoid caching lists when editing/creating
    cache: "no-store",
  });
  const text = await res.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    data = text as any;
  }
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

export async function apiPost<T = any>(path: string, body?: Json, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    data = text as any;
  }
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

export async function apiPut<T = any>(path: string, body?: Json, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    data = text as any;
  }
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}
