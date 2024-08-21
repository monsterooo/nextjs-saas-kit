import { NextResponse } from "next/server"

export const POST = async function POST(req) {
  const url = "https://peapix.com/bing/feed?country=us"
  try {
    const response = await fetch(url, { method: "GET" })
    const json = await response.json()
    return NextResponse.json(json)
  } catch (error) {
    console.error("api bing error:", error)
    return NextResponse.json(
      { message: "Fetch bing image failed." },
      { status: 400 }
    )
  }
}
