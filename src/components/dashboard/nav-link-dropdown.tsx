import { ChevronDown } from "lucide-react"

import { NavLinkProps } from "@/types/dashboard"
import { cn } from "@/lib/utils"
import useCheckActiveNav from "@/hooks/use-check-active-nav"

import { Icons } from "../icons"
import { buttonVariants } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { NavLink } from "./nav-link"

export function NavLinkDropdown({
  title,
  icon,
  label,
  sub,
  closeNav,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  const Icon = Icons[icon]
  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href))

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "group h-12 w-full justify-start rounded-none px-6"
        )}
      >
        <div className="mr-2">{icon && <Icon className="size-5" />}</div>
        {title}
        {label && (
          <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
            {label}
          </div>
        )}
        <span
          className={cn(
            'ml-auto transition-all group-data-[state="open"]:-rotate-180'
          )}
        >
          <ChevronDown />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsibleDropdown" asChild>
        <ul>
          {sub!.map((sublink) => (
            <li key={sublink.title} className="my-1 ml-8">
              <NavLink {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
