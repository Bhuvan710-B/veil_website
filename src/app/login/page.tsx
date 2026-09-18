"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-veil-ink text-white flex items-center justify-center p-6">
        <Link
  href="/"
  className="inline-flex items-center gap-2 group mb-8"
>
  <span className="text-2xl font-black tracking-tight text-white group-hover:text-signal-green transition-colors">
    VEIL
  </span>

  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-signal-green/10 text-signal-green border border-signal-green/20">
    On-Device Layer
  </span>
</Link>
      <div className="w-full max-w-md border border-white/10 rounded-2xl p-8 bg-white/5">

        <h1 className="text-3xl font-bold mb-2">
          Welcome back
        </h1>

        <p className="text-white/60 mb-8">
          Sign in to your Veil AI account.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/20 border border-white/10"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/20 border border-white/10"
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-signal-green text-black font-semibold p-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

      </div>
    </main>
  )
}