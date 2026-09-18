import { NextRequest, NextResponse } from "next/server"
import { saveEarlyAccess } from "@/lib/storage"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, plan } = body as { email?: string; plan?: string }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      )
    }

    const trimmed = email.trim()

    if (!EMAIL_REGEX.test(trimmed)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    const userAgent = req.headers.get("user-agent") ?? undefined
    const result = saveEarlyAccess(trimmed, plan ?? "General", userAgent)

    if (result.alreadyExists) {
      return NextResponse.json({
        success: true,
        alreadyExists: true,
        position: result.position,
        message: `You're already on the list at position #${result.position}. We'll reach out soon!`,
      })
    }

    return NextResponse.json({
      success: true,
      alreadyExists: false,
      position: result.position,
      message: `You're on the list at position #${result.position}. We'll be in touch!`,
    })
  } catch (err) {
    console.error("[early-access] POST error:", err)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
