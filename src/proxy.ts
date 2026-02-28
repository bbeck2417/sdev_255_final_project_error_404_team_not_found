import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

// 1. Define which routes require authentication, and which don't
const protectedRoutes = ["/"];
const publicRoutes = ["/login", "/signup"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 2. Get the session cookie and decrypt it
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  // 3. Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 4. Redirect authenticated users away from public auth pages
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// 5. Specify paths the middleware should ignore (like static files and images)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
