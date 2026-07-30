import { NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "jondrea_admin_session";

/** Cierra sesión admin y redirige al login. */
export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
