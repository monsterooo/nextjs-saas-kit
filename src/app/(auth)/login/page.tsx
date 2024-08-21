import Image from "next/image"
import Link from "next/link"

import { env } from "@/env"

import { LoginForm } from "./login-form"

export default async function LoginPage() {
  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/bing`, {
    method: "POST",
  })
  const data = await response.json()

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data?.[0]?.fullUrl})` }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src="/logo.svg"
            width={24}
            height={24}
            alt="logo"
            className="mr-2"
          />
          NSNKit
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;{data?.[0]?.title}&rdquo;</p>
            <footer className="text-sm">{data?.[0]?.copyright}</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight flex flex-col justify-center items-center">
              <Image src="/logo.svg" width={64} height={64} alt="logo" />
              <p className="mt-4">Log in to your account</p>
            </h1>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By logging in, you agree to our
            <br />
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
