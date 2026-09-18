"use client"

import React, { useState } from "react"
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button"
import { Shield, Sparkles, CheckCircle, Lock, Loader2 } from "lucide-react"

export function CTA() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || loading) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/waitlist", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email }),
})
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.message ?? "Something went wrong. Please try again.")
      } else {
        setSuccessMsg(data.message)
        setSubmitted(true)
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="early-access" className="py-24 bg-veil-ink text-white relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-signal-green/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-guard-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 max-w-4xl relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-signal-green/10 border border-signal-green/30 text-signal-green text-xs font-mono mb-6">
          <Sparkles size={14} />
          <span>JOIN THE VEIL AI DEVELOPER PREVIEW</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Give your AI agent eyes,<br />
          <span className="text-signal-green">not access.</span>
        </h2>

        <p className="text-base sm:text-xl text-slate-gray max-w-2xl mx-auto mb-10 leading-relaxed">
          Redact locally. Share safely. Act locally. Be among the first engineering teams to ship safe, zero-leakage browser automation.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-signal-green/10 border border-signal-green/40 max-w-md mx-auto text-signal-green font-mono text-sm flex items-center justify-center gap-3">
            <CheckCircle size={20} className="shrink-0" />
            <span>{successMsg ?? "You are on the list! We will reach out shortly."}</span>
          </div>
        ) : (
          <div className="max-w-md mx-auto mb-8">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter work email..."
                className="w-full sm:w-72 px-4 py-3.5 rounded-full bg-white/5 border border-white/20 text-white font-mono text-sm focus:border-signal-green focus:outline-none disabled:opacity-50"
              />
              {/* Tactile 3D Liquid Metal Button from cta.txt */}
              <LiquidMetalButton
  type="submit"
  disabled={loading}
  label={loading ? "Joining..." : "Get Early Access"}
/>
            </form>
            {error && (
              <p className="text-alert-red font-mono text-xs mt-3 text-center">
                {error}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-gray font-mono pt-4">
          <div className="flex items-center gap-1.5">
            <CheckCircle size={14} className="text-signal-green" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock size={14} className="text-signal-green" />
            <span>Zero raw data stored</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={14} className="text-signal-green" />
            <span>SIH26171 On-device verified</span>
          </div>
        </div>
      </div>
    </section>
  )
}