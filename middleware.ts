import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/actions/get-user";

export async function middleware(request: NextRequest) {
  const user = await getUser();

  const publicRoutes = ["/login"];

  // ✅ Check if the request path is a public route
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);

  // ✅ If unauthenticated and accessing a protected route, redirect to login
  if (!user && !isPublicRoute) {
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
