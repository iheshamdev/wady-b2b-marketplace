import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// ✅ Middleware for Authentication & Internationalization
export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  console.log("token", token, request.cookies.get("auth_token"));
  // ✅ Define public routes (accessible without authentication)
  const publicRoutes = ["/login"];

  // ✅ Check if the request path is a public route
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);

  // ✅ If authenticated but accessing a public route, redirect to home
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ If unauthenticated and accessing a protected route, redirect to login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Continue with the request
  return NextResponse.next();
}

// ✅ Middleware Configuration
export const config = {
  matcher: [
    "/((?!api|_next|images|favicon.ico|sitemap.xml|robots.txt).*)", // Exclude API, _next, images, and static files
  ],
};
