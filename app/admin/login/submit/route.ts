import { NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "jondrea_admin_session";
const ADMIN_SESSION_VALUE = "ok";

/** Sanitiza el path de redirección post-login. */
function sanitizeNextPath(raw?: string | null) {
  if (!raw || !raw.startsWith("/")) {
    return "/admin";
  }
  return raw;
}

/** Valida credenciales admin y setea cookie de sesión. */
export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const nextPath = sanitizeNextPath(String(formData.get("next") ?? ""));

  const adminUser = process.env.ADMIN_USER ?? "admin";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin";

  if (username !== adminUser || password !== adminPassword) {
    const errorUrl = new URL("/admin/login", request.url);
    errorUrl.searchParams.set("next", nextPath);
    errorUrl.searchParams.set("error", "1");
    return NextResponse.redirect(errorUrl);
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url));
  response.cookies.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return response;
}
