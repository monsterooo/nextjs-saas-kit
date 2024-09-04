import { usePathname } from "next/navigation"

import { pathnameWithOutLocale } from "@/lib/utils"

export default function useCheckActiveNav() {
  const pathname = usePathname()
  const url = pathnameWithOutLocale(pathname)

  const checkActiveNav = (nav: string) => {
    return url.startsWith(nav)
  }

  return { checkActiveNav }
}
