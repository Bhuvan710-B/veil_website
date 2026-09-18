"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        router.replace("/login")
        return
      }

      setEmail(user.email ?? null)
      setLoading(false)
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace("/login")
        return
      }

      setEmail(session.user.email ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-veil-ink text-white flex items-center justify-center">
        <p className="text-white/60 font-mono text-sm">
          Checking authentication...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-veil-ink text-white p-6">

      {/* Top navigation */}
      <header className="max-w-6xl mx-auto flex items-center justify-between py-6">

        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-signal-green transition-colors">
            VEIL
          </span>

          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-signal-green/10 text-signal-green border border-signal-green/20 hidden sm:inline-block">
            Dashboard
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="text-sm text-white/60 hover:text-signal-green transition-colors"
        >
          Log out
        </button>

      </header>


      {/* Dashboard content */}
      <div className="max-w-6xl mx-auto mt-12">

        <div className="border border-white/10 rounded-2xl p-8 bg-white/5">

          <p className="text-signal-green font-mono text-xs uppercase tracking-wider mb-3">
            Authentication successful
          </p>

          <h1 className="text-4xl font-bold mb-4">
            Welcome to Veil AI.
          </h1>

          <p className="text-white/60 mb-2">
            Your authenticated dashboard is now protected.
          </p>

          {email && (
            <p className="text-signal-green mt-6 font-mono text-sm">
              Signed in as: {email}
            </p>
          )}

        </div>

      </div>

    </main>
  )
}