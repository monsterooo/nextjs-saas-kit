import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pathnameWithOutLocale(pathname: string) {
  const [, , ...segments] = pathname.split("/")
  return `/${segments.join("/")}`
}

export function getFileExtension(contentType): string {
  const mimeTypes = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/bmp": ".bmp",
    "image/webp": ".webp",
  }

  return mimeTypes[contentType] || null
}
