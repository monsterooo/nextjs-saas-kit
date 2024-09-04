import { z } from "zod"

import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

const updateSchema = z.object({
  name: z.string().min(2).max(30).optional(),
})

export const PATCH = async function PATCH(req) {
  try {
    const session = await getSession()

    if (!session?.user) {
      return new Response(null, { status: 403 })
    }

    const { name } = await updateSchema.parse(await req.json())

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
      },
    })
    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
