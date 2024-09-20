import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NEXTAUTH_URL: z.string().url().optional(),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    SUPABASE_URL: z.string().min(1),
    SUPABASE_KEY: z.string().min(1),
    SUPABASE_BUCKET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    // NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_STORAGE_PATH: z.string().min(1),
    // NEXT_PUBLIC_SUPABASE_BUCKET: z.string().min(1),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_BUCKET: process.env.SUPABASE_BUCKET,
    NEXT_PUBLIC_SUPABASE_STORAGE_PATH:
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PATH,
  },
})
