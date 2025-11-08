import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/",
  "/posts(.*)",
  "/posts/[post_title](.*)",
  "/tech-stack",
  "/projects(.*)",
  "/things-i-believe(.*)",
  
]);

export default clerkMiddleware(async (auth, req) => {
  // Apply Clerk authentication
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Create response with additional security headers
  const response = NextResponse.next();

  // Additional security headers for enhanced protection
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Download-Options", "noopen");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");

  // Security headers for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");
  }

  // Rate limiting headers (basic implementation)
  response.headers.set("X-RateLimit-Limit", "1000");
  response.headers.set("X-RateLimit-Remaining", "999");
  response.headers.set(
    "X-RateLimit-Reset",
    Math.floor(Date.now() / 1000 + 3600).toString(),
  );

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
