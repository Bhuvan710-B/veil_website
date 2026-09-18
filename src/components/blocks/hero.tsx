"use client"

import React, { useState, useEffect } from "react"
import LiquidMetalHero from "@/components/ui/liquid-metal-hero"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, Eye, EyeOff, Lock, CheckCircle, RefreshCw, Sparkles, Terminal } from "lucide-react"

export function Hero() {
  // Interactive Browser Redaction Mockup State
  const [redactedState, setRedactedState] = useState<"detecting" | "redacted" | "sanitized">("detecting")
  const [activeTab, setActiveTab] = useState<"aadhaar" | "pan" | "password">("aadhaar")

  useEffect(() => {
    const cycle = setInterval(() => {
      setRedactedState("detecting")
      const t1 = setTimeout(() => setRedactedState("redacted"), 1200)
      const t2 = setTimeout(() => setRedactedState("sanitized"), 2600)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }, 4500)

    return () => clearInterval(cycle)
  }, [activeTab])

  const demoFields = {
    aadhaar: {
      label: "Government KYC Verification",
      fieldName: "Citizen Identity (Aadhaar)",
      rawVal: "4819 0281 9923",
      redactedVal: "[REDACTED_AADHAAR]",
      badge: "National ID (India)",
      confidence: "99.98% match",
    },
    pan: {
      label: "Bank Account Linking",
      fieldName: "Taxpayer ID (PAN)",
      rawVal: "ABCDE1234F",
      redactedVal: "[REDACTED_PAN]",
      badge: "Financial PII",
      confidence: "99.94% match",
    },
    password: {
      label: "Workplace SSO Portal",
      fieldName: "Master Password",
      rawVal: "P@ssw0rd2026!Sec",
      redactedVal: "[REDACTED_PASSWORD]",
      badge: "Auth Secret",
      confidence: "100% match",
    },
  }

  const current = demoFields[activeTab]

  return (
    <div id="product">
      <LiquidMetalHero
        badge="PRIVACY-FIRST AI BROWSING"
        title="Your AI agent shouldn't have to see your passwords to click a button."
        subtitle="Veil sits between your browser and any AI agent — extracting structure, masking sensitive data, and sending only a sanitized context for planning. Raw pages never leave the device."
        primaryCtaLabel="Get Early Access"
        secondaryCtaLabel="Watch it redact live"
        onPrimaryCtaClick={() => {
          const el = document.getElementById("early-access")
          el?.scrollIntoView({ behavior: "smooth" })
        }}
        onSecondaryCtaClick={() => {
          const el = document.getElementById("how-it-works")
          el?.scrollIntoView({ behavior: "smooth" })
        }}
        microTrustLine="No raw data ever leaves your device."
        features={[
          "Sub-100ms local processing",
          "100% on-device perception (SIH26171)",
          "Zero raw data leakage guaranteed",
        ]}
      >
        {/* Visual: Live Animated Browser Mockup showing real-time detection & redaction */}
        <div className="w-full max-w-4xl mx-auto mt-6 text-left">
          <div className="rounded-2xl border border-white/15 bg-veil-ink/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Browser chrome header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-alert-red/80" />
                <span className="w-3 h-3 rounded-full bg-caution-amber/80" />
                <span className="w-3 h-3 rounded-full bg-signal-green/80" />
                <span className="ml-2 text-xs font-mono text-white/50 flex items-center gap-1">
                  <Lock size={12} className="text-signal-green" />
                  https://secure-banking.portal/kyc-verify
                </span>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-signal-green flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-signal-green/10 border border-signal-green/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-ping" />
                  VEIL SHIELD ACTIVE
                </span>
              </div>
            </div>

            {/* Test field tabs */}
            <div className="flex border-b border-white/10 bg-black/20 px-4 pt-2 gap-2 text-xs font-mono">
              {(["aadhaar", "pan", "password"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors capitalize ${
                    activeTab === tab
                      ? "bg-white/10 text-signal-green font-bold border-t-2 border-signal-green"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab} Test Case
                </button>
              ))}
            </div>

            {/* Browser Content & Redaction Demo */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Form field */}
              <div className="md:col-span-7 space-y-4">
                <div className="text-xs font-mono text-white/60 uppercase tracking-wider flex items-center justify-between">
                  <span>{current.label}</span>
                  <span className="text-caution-amber">{current.badge}</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/80 block">
                    {current.fieldName}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      readOnly
                      type="text"
                      value={
                        redactedState === "detecting"
                          ? current.rawVal
                          : current.redactedVal
                      }
                      className={`w-full py-3.5 pl-4 pr-36 rounded-xl font-mono text-sm border transition-all duration-300 ${
                        redactedState === "detecting"
                          ? "bg-alert-red/5 border-alert-red/40 text-white shadow-[0_0_15px_rgba(229,72,77,0.15)]"
                          : "bg-signal-green/10 border-signal-green/50 text-signal-green font-bold shadow-[0_0_20px_rgba(31,174,110,0.2)]"
                      }`}
                    />

                    {/* Animated redaction overlay badge */}
                    <div className="absolute right-2.5 flex items-center gap-1.5">
                      <AnimatePresence mode="wait">
                        {redactedState === "detecting" ? (
                          <motion.span
                            key="detecting"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="px-2.5 py-1 rounded-md bg-caution-amber/20 text-caution-amber border border-caution-amber/40 text-[11px] font-mono flex items-center gap-1"
                          >
                            <RefreshCw size={11} className="animate-spin" />
                            Detecting...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="redacted"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="px-2.5 py-1 rounded-md bg-signal-green text-veil-ink font-bold text-[11px] font-mono flex items-center gap-1 shadow-md"
                          >
                            <ShieldCheck size={12} />
                            REDACTED LOCALLY
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pt-1">
                  <span>DOM Element: &lt;input name=&quot;{activeTab}&quot; /&gt;</span>
                  <span className="text-signal-green font-semibold">Latency: ~24ms</span>
                </div>
              </div>

              {/* Right Column: AI Planning Agent Perspective */}
              <div className="md:col-span-5 rounded-xl bg-black/40 border border-white/10 p-4 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70 font-semibold flex items-center gap-1.5">
                    <Terminal size={14} className="text-guard-purple" />
                    AI Agent Context
                  </span>
                  <span className="text-[10px] text-signal-green px-1.5 py-0.5 rounded bg-signal-green/10">
                    SANITIZED
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-white/80 leading-relaxed overflow-x-auto">
                  <p className="text-white/40">{"// Sent to LLM Planning:"}</p>
                  <p className="text-guard-purple">{`{`}</p>
                  <p className="pl-3 text-white/70">
                    <span className="text-white/50">&quot;action&quot;:</span> &quot;fill_form&quot;,
                  </p>
                  <p className="pl-3 text-white/70">
                    <span className="text-white/50">&quot;field&quot;:</span> &quot;{activeTab}&quot;,
                  </p>
                  <p className="pl-3 text-signal-green font-bold">
                    <span className="text-white/50">&quot;sanitized_val&quot;:</span> &quot;{current.redactedVal}&quot;,
                  </p>
                  <p className="pl-3 text-white/70">
                    <span className="text-white/50">&quot;raw_data_sent&quot;:</span> <span className="text-alert-red font-bold">false</span>
                  </p>
                  <p className="text-guard-purple">{`}`}</p>
                </div>

                <div className="p-2 rounded bg-signal-green/10 border border-signal-green/20 text-[10px] text-signal-green flex items-center gap-2">
                  <CheckCircle size={13} className="shrink-0" />
                  <span>Agent receives structural intent without sensitive values.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LiquidMetalHero>
    </div>
  )
}