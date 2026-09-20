import { NextResponse } from "next/server";

/** Pega a /v1/health de Nido para despertar Render si el servicio está dormido. */
export async function GET() {
  const apiBase = (process.env.NIDO_API_URL ?? "http://localhost:3002").replace(/\/+$/, "");
  try {
    const response = await fetch(`${apiBase}/v1/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(45000)
    });
    return NextResponse.json({ ok: response.ok });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
