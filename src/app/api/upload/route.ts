import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

import { getSession } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { getFileExtension } from "@/lib/utils"

export const POST = async function POST(req) {
  const session = await getSession()

  if (!session?.user) {
    return new Response(null, { status: 403 })
  }

  const data = await req.formData()
  const file = data.get("file")
  const directory = session.user.id
  const suffix = getFileExtension(file.type)
  const name = uuidv4()
  const filePath = `${directory}/${name}${suffix}`
  await supabase.storage.from("NSNKit").upload(filePath, file)

  return NextResponse.json({})
}
