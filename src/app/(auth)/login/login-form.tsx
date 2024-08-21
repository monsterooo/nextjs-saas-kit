"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function LoginForm() {
  const GithubComponent = () => {
    return (
      <Button
        onClick={() => {
          signIn("github")
        }}
      >
        <Icons.gitHub /> Github
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
        <div key={provider.name}>{provider.component}</div>
      ))}
    </div>
  )
}
