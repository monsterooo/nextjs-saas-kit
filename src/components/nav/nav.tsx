import Image from "next/image"
import Link from "next/link"

import { Button } from "../ui/button"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Doc", href: "/doc" },
  { name: "About", href: "/about" },
]

export function Nav() {
  return (
    <header>
      <nav className="container flex justify-between items-center py-5 relative">
        <div>
          <Link href="#">
            <span className="text-2xl font-semibold">NSNKit</span>
            {/* <Image
              src="/logo.svg"
              width={124}
              height={47}
              sizes="min(124px, 100vw)"
              alt="logo"
            /> */}
          </Link>
        </div>
        <div className="flex items-center p-3 gap-5 shadow-nav rounded-2xl border border-[rgba(32, 30, 28, 0.08)]">
          {navLinks.map((link) => (
            <div className="flex justify-start">
              <Link
                className="px-4 py-1 text-sm cursor-pointer rounded-md leading-relaxed hover:text-primary hover:bg-primary/5 transition-all"
                href="#"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>
        <div>
          <Button>Login</Button>
        </div>
      </nav>
    </header>
  )
}
