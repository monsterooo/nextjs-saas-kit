import Image from "next/image"
import Link from "next/link"

import { Button } from "../ui/button"

export function Nav() {
  return (
    <header className="fixed left-0 pt-8 z-[1000000000] duration-500 transition-all w-full bg-transparent">
      <nav className="container flex items-center justify-between">
        <div className="nav-logo">
          <Link href="/">
            {/* <Image src="/logo.svg" width={24} height={24} alt="logo" /> */}
            NSNKit
          </Link>
        </div>
        <ul className="hidden lg:flex mx-auto bg-white dark:bg-secondary p-2.5 shadow-nav rounded-3xl [&>*:not(:last-child)]:me-1">
          <li>
            <Link
              href="#"
              className="flex items-center text-base font-medium md:px-5 md:py-[5px] border rounded-xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center text-base font-medium md:px-5 md:py-[5px]"
            >
              Blog
            </Link>
          </li>
        </ul>
        <ul className="flex items-center max-lg:ml-auto  [&>*:not(:last-child)]:me-2.5">
          <li>
            <Button>Login</Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
