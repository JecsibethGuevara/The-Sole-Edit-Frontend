// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login", "/signin", "/", "/public"];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Protected routes
  const protectedPaths = ["/home", "/stores", "/products", "/admin", "/logout"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  //         const token = localStorage.getItem('access_token');

  const token = request.cookies.get("auth-token")?.value;

  if (isProtectedPath) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/stores/:path*",
    "/products/:path*",
    "/admin/:path*",
    "/login",
    "/signin",
  ],
};
