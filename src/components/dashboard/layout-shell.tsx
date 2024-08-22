"use client"

import { useState } from "react"

import Sidebar from "./sidebar"

interface IProps {
  children: React.ReactNode
}

export function LayoutShell({ children }: IProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
      >
        {children}
      </main>
    </div>
  )
}
