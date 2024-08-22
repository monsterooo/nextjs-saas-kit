import Link from "next/link"

import { NavLinkProps } from "@/types/dashboard"
import { cn } from "@/lib/utils"
import useCheckActiveNav from "@/hooks/use-check-active-nav"

import { Icons } from "../icons"
import { buttonVariants } from "../ui/button"

export function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  const Icon = Icons[icon]

  return (
    <Link
      href={href}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: checkActiveNav(href) ? "secondary" : "ghost",
          size: "sm",
        }),
        "h-12 justify-start text-wrap rounded-none px-6 text-xs",
        subLink && "h-10 w-full border-l border-l-slate-500 px-2"
      )}
      aria-current={checkActiveNav(href) ? "page" : undefined}
    >
      <div className="mr-2">{icon && <Icon className="size-5" />}</div>
      {title}
      {label && (
        <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
          {label}
        </div>
      )}
    </Link>
  )
}
