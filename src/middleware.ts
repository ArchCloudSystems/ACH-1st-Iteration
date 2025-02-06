import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const isAuthenticated = !!token

  // Public paths that don't require authentication
  const publicPaths = ["/", "/sign-in", "/sign-up", "/api/auth", "/pricing"]
  const isPublicPath = publicPaths.some((path) => 
    req.nextUrl.pathname.startsWith(path)
  )

  if (isPublicPath) {
    if (isAuthenticated) {
      // Redirect to dashboard if trying to access auth pages while logged in
      if (["/sign-in", "/sign-up"].some(path => 
        req.nextUrl.pathname.startsWith(path)
      )) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return NextResponse.next()
    }
    return NextResponse.next()
  }

  // Protected routes
  if (!isAuthenticated) {
    let callbackUrl = req.nextUrl.pathname
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search
    }
    
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/webhooks|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}