import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = body.email

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email is required.",
        },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    const { error } = await supabaseAdmin
      .from("waitlist")
      .insert([
        {
          email: normalizedEmail,
        },
      ])

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            message: "This email is already on the waitlist.",
          },
          { status: 409 }
        )
      }

      console.error("Supabase error:", error)

      return NextResponse.json(
        {
          success: false,
          message: "Failed to join the waitlist.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "You are on the list! We'll reach out shortly.",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Waitlist API error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    )
  }
}