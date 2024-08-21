import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { env } from "@/env"

import { db } from "./db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: ({ token, user, trigger }) => {
      if (user) {
        token.id = user.id
      }

      // New user sign up
      if (trigger === "signUp" && user.email) {
        // SendWelcomeEmail({
        //   email: user.email,
        //   title: "Welcome",
        // })
      }
      return token
    },
    session: ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}
