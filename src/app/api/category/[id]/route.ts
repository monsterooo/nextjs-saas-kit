import { NextResponse } from "next/server"

import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

export const GET = async function GET(
  req,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const session = await getSession()

  if (!session?.user) {
    return new Response("Unauthorized.", { status: 403 })
  }

  const category = await db.category.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!category) {
    return NextResponse.json("Not found.", { status: 404 })
  }

  return NextResponse.json(category)
}

export const PATCH = async function PATCH(
  req,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const session = await getSession()

  if (!session?.user) {
    return new Response("Unauthorized.", { status: 403 })
  }

  const payload = await req.json()

  await db.category.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      name: payload.name,
      ...(payload.parentId && {
        parentId: payload.parentId,
      }),
    },
  })

  return new Response(null, { status: 200 })
}

export const DELETE = async function DELETE(
  req,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const session = await getSession()

  if (!session?.user) {
    return new Response(null, { status: 403 })
  }

  await db.category.delete({
    where: {
      id,
      userId: session.user.id,
    },
  })

  return new Response(null, { status: 200 })
}
