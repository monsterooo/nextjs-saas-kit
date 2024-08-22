"use client"

import { forwardRef, useContext } from "react"

import { cn } from "@/lib/utils"

import { LayoutContext } from "./layout"

export const LayoutBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Check if Layout.Body is used within Layout
  const contextVal = useContext(LayoutContext)
  if (contextVal === null) {
    throw new Error(`Layout.Body must be used within Layout.`)
  }

  return (
    <div
      ref={ref}
      data-layout="body"
      className={cn(
        "px-4 py-6 md:overflow-hidden md:px-8",
        contextVal && contextVal.fixed && "flex-1",
        className
      )}
      {...props}
    />
  )
})
