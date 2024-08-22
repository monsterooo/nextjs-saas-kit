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
