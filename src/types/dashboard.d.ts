import { Category } from "@prisma/client"

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: string
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export interface NavLinkProps extends SideLink {
  subLink?: boolean
  closeNav: () => void
}

export interface ICategoryTree extends Category {
  children?: CategoryTree[]
}
