import { createSharedPathnamesNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const locales = ["en", "zh"]

export const defaultLocale = "en"

export const routing = defineRouting({
  locales,
  defaultLocale,
})

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing)
