import { NextResponse } from "next/server"
import { z } from "zod"

import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

const createSchema = z.object({
  name: z.string().min(2).max(30).optional(),
  parentId: z.string().optional(),
})

export const POST = async function POST(req) {
  const session = await getSession()

  if (!session?.user) {
    return new Response("Unauthorized.", { status: 403 })
  }

  try {
    const payload = await createSchema.parse(await req.json())

    await db.category.create({
      data: {
        name: payload.name,
        userId: session.user.id,

        ...(payload.parentId && {
          parentId: payload.parentId,
        }),
      },
    })
    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response("Create category failed.", { status: 500 })
  }
}

export const GET = async function GET(req) {
  const categories = await db.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        include: {
          children: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return NextResponse.json(categories)
}
