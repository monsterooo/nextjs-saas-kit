import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pathnameWithOutLocale(pathname: string) {
  const [, , ...segments] = pathname.split("/")
  return `/${segments.join("/")}`
}
