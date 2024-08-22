"use client"

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export const LayoutContext = createContext<{
  offset: number
  fixed: boolean
} | null>(null)

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean
}

const Layout = ({ className, fixed = false, ...props }: LayoutProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const div = divRef.current

    if (!div) return
    const onScroll = () => setOffset(div.scrollTop)

    // clean up code
    div.removeEventListener("scroll", onScroll)
    div.addEventListener("scroll", onScroll, { passive: true })
    return () => div.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <LayoutContext.Provider value={{ offset, fixed }}>
      <div
        ref={divRef}
        data-layout="layout"
        className={cn(
          "h-full overflow-auto",
          fixed && "flex flex-col",
          className
        )}
        {...props}
      />
    </LayoutContext.Provider>
  )
}
Layout.displayName = "Layout"

const Body = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // Check if Layout.Body is used within Layout
    const contextVal = useContext(LayoutContext)
    if (contextVal === null) {
      throw new Error(`Layout.Body must be used within ${Layout.displayName}.`)
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
  }
)
Body.displayName = "Body"

Layout.Body = Body

export { Layout }
