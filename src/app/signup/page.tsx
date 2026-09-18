"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Shield, Loader2, ArrowRight } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      // STEP 1: Create the authentication account
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signupError) {
        setError(signupError.message)
        return
      }

      if (!data.user) {
        setError("Account could not be created. Please try again.")
        return
      }

      /*
        STEP 2:

        We are NOT inserting into profiles here.

        Why?

        Your project has email confirmation enabled.

        After signup, the user may not have an authenticated
        session yet, so RLS can block:

        INSERT INTO profiles

        We'll create profiles automatically using a Supabase
        database trigger in the next step.
      */

      setMessage(
        "Account created successfully. Check your email to confirm your account."
      )

      setEmail("")
      setPassword("")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-veil-ink text-white flex items-center justify-center px-6 relative">

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-signal-green/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-guard-purple/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Back to website */}
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

        {/* VEIL AI logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-10"
        >
          <Shield className="text-signal-green" size={28} />

          <span className="font-bold text-xl tracking-tight">
            VEIL AI
          </span>
        </Link>

        {/* Signup card */}
        <div className="border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8">

          <div className="mb-8">

            <p className="text-signal-green font-mono text-xs mb-3">
              CREATE ACCOUNT
            </p>

            <h1 className="text-3xl font-bold mb-3">
              Build with privacy.
            </h1>

            <p className="text-slate-gray text-sm">
              Create your Veil AI account and start building
              privacy-first AI workflows.
            </p>

          </div>

          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-xs font-mono text-slate-gray mb-2">
                EMAIL
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-signal-green transition-colors disabled:opacity-50"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-xs font-mono text-slate-gray mb-2">
                PASSWORD
              </label>

              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-signal-green transition-colors disabled:opacity-50"
              />

            </div>

            {/* Error */}
            {error && (
              <p className="text-alert-red text-sm font-mono">
                {error}
              </p>
            )}

            {/* Success */}
            {message && (
              <p className="text-signal-green text-sm font-mono">
                {message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-signal-green text-black font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Creating account...
                </>
              ) : (
                <>
                  Create account

                  <ArrowRight size={18} />
                </>
              )}

            </button>

          </form>

          <p className="text-center text-sm text-slate-gray mt-6">

            Already have an account?{" "}

            <Link
              href="/login"
              className="text-signal-green hover:underline"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </main>
  )
}