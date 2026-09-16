import { NextResponse } from "next/server";
import type { ProductKey } from "../../../lib/admin";
import { incrementDownloadCount } from "../../../lib/downloadCounts";
import { getCareMeApk } from "../../../lib/caremeRelease";
import { getNidoApk } from "../../../lib/nidoRelease";

/** Convierte el segmento de URL en producto válido. */
function asProductKey(value: string): ProductKey | null {
  if (value === "careme" || value === "nido") {
    return value;
  }
  return null;
}

/** Registra la descarga y redirige al APK publicado. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ product: string }> }
) {
  const product = asProductKey((await params).product);
  if (!product) {
    return new NextResponse("No encontrado", { status: 404 });
  }

  const apk = product === "careme" ? getCareMeApk() : getNidoApk();
  if (!apk.available || !apk.href) {
    return new NextResponse("APK no publicada", { status: 404 });
  }

  incrementDownloadCount(product);
  return NextResponse.redirect(new URL(apk.href, request.url));
}
