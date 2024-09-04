import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { getServerSession, NextAuthOptions } from "next-auth"
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
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.id = user.id
      }
      // New user sign up
      if (trigger === "signUp" && user.email) {
        // SendWelcomeEmail({
        //   email: user.email,
        //   title: "Welcome",
        // })
      } else if (trigger === "update") {
        const refreshedUser = await db.user.findUnique({
          where: {
            id: token.sub,
          },
        })
        if (refreshedUser) {
          token.name = refreshedUser.name
        }
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

export const getSession = async () => {
  const session = await getServerSession(authOptions)

  return session
}
