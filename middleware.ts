import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "jondrea_admin_session";
const ADMIN_SESSION_VALUE = "ok";

/** Paths públicos del área admin. */
function isPublicAdminPath(pathname: string) {
  if (pathname === "/admin/login") {
    return true;
  }
  return pathname.startsWith("/admin/login/");
}

/** Protege /admin/* con cookie de sesión. */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicAdminPath(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (sessionCookie === ADMIN_SESSION_VALUE) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = `next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"]
};
