const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

export async function GET() {
  const upstream = await fetch(`${API_BASE}/pets`, {
    cache: "no-store",
  });
  const body = await upstream.text();
  return new Response(body, { status: upstream.status, headers: { "Content-Type": "application/json" } });
}

export async function POST(req: Request) {
  const payload = await req.json();
  const upstream = await fetch(`${API_BASE}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await upstream.text();
  return new Response(body, { status: upstream.status, headers: { "Content-Type": "application/json" } });
}
