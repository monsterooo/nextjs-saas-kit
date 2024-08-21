"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function LoginForm() {
  const GithubComponent = () => {
    return (
      <Button
        variant="outline"
        className="flex items-center justify-center w-full"
        onClick={() => {
          signIn("github")
        }}
      >
        <Icons.gitHub className="size-4 mr-2" /> Github
      </Button>
    )
  }

  const authProviders = [
    {
      name: "github",
      component: <GithubComponent />,
    },
  ]
  return (
    <div>
      {authProviders.map((provider) => (
        <div key={provider.name} className="flex">
          {provider.component}
        </div>
      ))}
    </div>
  )
}
