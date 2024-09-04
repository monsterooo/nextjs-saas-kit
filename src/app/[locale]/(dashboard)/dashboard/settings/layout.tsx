"use client"

import { User } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import SidebarNav from "./components/sidebar-nav"

interface SettingsLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems = [
  {
    title: "Profile",
    icon: <User className="size-4" />,
    href: "/dashboard/settings",
  },
]

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="fex flex-col">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full p-1 pr-4 md:overflow-y-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
