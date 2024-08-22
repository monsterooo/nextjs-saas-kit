"use client"

import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "../ui/button"

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [themeIcon, setThemeIcon] = useState<React.ReactNode>()

  useEffect(() => {
    const themeColor = theme === "dark" ? "#020817" : "#fff"
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor)

    setThemeIcon(
      theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />
    )
  }, [theme])

  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {themeIcon}
    </Button>
  )
}
