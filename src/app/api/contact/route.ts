import { NextRequest, NextResponse } from "next/server"
import { saveContactInquiry } from "@/lib/storage"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, agentsCount, useCase } = body as {
      name?: string
      email?: string
      company?: string
      agentsCount?: string
      useCase?: string
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your full name." },
        { status: 400 }
      )
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid work email." },
        { status: 400 }
      )
    }

    if (!company || typeof company !== "string" || company.trim().length < 1) {
      return NextResponse.json(
        { success: false, message: "Please provide your company name." },
        { status: 400 }
      )
    }

    const result = saveContactInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      agentsCount: agentsCount?.trim(),
      useCase: useCase?.trim(),
    })

    return NextResponse.json({
      success: true,
      id: result.id,
      message: "Thanks! Our team will be in touch within 1 business day.",
    })
  } catch (err) {
    console.error("[contact] POST error:", err)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
