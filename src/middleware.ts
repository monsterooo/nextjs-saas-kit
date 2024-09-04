import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import createMiddleware from "next-intl/middleware"

import { defaultLocale, locales, routing } from "./i18n/routing"

const handleI18nRouting = createMiddleware(routing)

export default async function Middleware(req: NextRequest) {
  const [, locale, ...segments] = req.nextUrl.pathname.split("/")
  const currentLocale = locale ?? defaultLocale
  const pathnameWithOutLocale = `/${segments.join("/")}`
  const token = await getToken({ req })
  const isAuth = !!token

  // Page auth check
  const needAuthRoutes = ["/dashboard", "/login"]
  const isNeedAuthRoutes = needAuthRoutes.some((route) =>
    pathnameWithOutLocale.startsWith(route)
  )
  if (isNeedAuthRoutes) {
    const isAuthPage = pathnameWithOutLocale.startsWith(`/login`)
    if (isAuthPage) {
      if (isAuth) {
        console.log("isAuthPage:", isAuthPage)
        return NextResponse.redirect(
          new URL(`/${currentLocale}/dashboard`, req.url)
        )
      }
      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }
      return NextResponse.redirect(
        new URL(
          `/${currentLocale}/login?from=${encodeURIComponent(from)}`,
          req.url
        )
      )
    }
  }

  // i18n process
  const { pathname } = req.nextUrl
  const shouldHandle =
    pathname === "/" ||
    new RegExp(`^/(${locales.join("|")})(/.*)?$`).test(pathname)
  if (!shouldHandle) return

  return handleI18nRouting(req)
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
}
