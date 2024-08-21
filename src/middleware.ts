import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export default async function Middleware(req: NextRequest) {
  const token = await getToken({ req })
  const isAuth = !!token

  // Page auth check
  const needAuthRoutes = ["/dashboard", "/login"]
  const isNeedAuthRoutes = needAuthRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  )
  if (isNeedAuthRoutes) {
    const isAuthPage = req.nextUrl.pathname.startsWith("/login")
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
}
