import { NextResponse } from "next/server";
import { NIDO_WAKE_TIMEOUT_MS, nidoApiBase, pingNidoHealth } from "../../../lib/admin";

export const maxDuration = 120;

/** Pega a /v1/health de Nido para despertar Render si el servicio está dormido. */
export async function GET() {
  const result = await pingNidoHealth(nidoApiBase(), NIDO_WAKE_TIMEOUT_MS);
  return NextResponse.json(result);
}
