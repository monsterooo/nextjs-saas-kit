import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const POST = async function POST(req) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return new Response(null, { status: 403 })
  }

  const payload = await req.json()
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
  })
  return NextResponse.json(categories)
}
