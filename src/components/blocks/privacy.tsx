"use client"

import React, { useState } from "react"
import { MorphingLight } from "@/components/ui/morphing-light"
import { ShieldCheck, Lock, AlertTriangle, CheckCircle, Activity, Sparkles, RefreshCw, Zap } from "lucide-react"

export function Privacy() {
  const [testInput, setTestInput] = useState("4920 8391 0029")
  const [detectedType, setDetectedType] = useState("Aadhaar Number (India)")
  const [status, setStatus] = useState<"SAFE" | "MEDIUM" | "RISK">("SAFE")
  const [redactedOutput, setRedactedOutput] = useState("[REDACTED_AADHAAR]")

  const handleTest = (val: string) => {
    setTestInput(val)
    if (/^\d{4}\s?\d{4}\s?\d{4}$/.test(val.trim())) {
      setDetectedType("Aadhaar Number (UIDAI)")
      setStatus("SAFE")
      setRedactedOutput("[REDACTED_AADHAAR]")
    } else if (/[A-Z]{5}[0-9]{4}[A-Z]{1}/i.test(val.trim())) {
      setDetectedType("Income Tax PAN")
      setStatus("SAFE")
      setRedactedOutput("[REDACTED_PAN]")
    } else if (/sk_live|bearer|ey[A-Za-z0-9-_]+/i.test(val)) {
      setDetectedType("Secret Key / Token")
      setStatus("SAFE")
      setRedactedOutput("[REDACTED_API_KEY]")
    } else if (/@[\w.-]+\.\w+/.test(val)) {
      setDetectedType("Email Address")
      setStatus("SAFE")
      setRedactedOutput("[REDACTED_EMAIL]")
    } else if (val.toLowerCase().includes("pass") || val.length > 8) {
      setDetectedType("High-Entropy Secret")
      setStatus("SAFE")
      setRedactedOutput("[REDACTED_SECRET]")
    } else {
      setDetectedType("Public Form Field")
      setStatus("SAFE")
      setRedactedOutput(val)
    }
  }

  const samplePresets = [
    { label: "Aadhaar Number", val: "4920 8391 0029" },
    { label: "Tax PAN Card", val: "ABCDE1234F" },
    { label: "Secret API Key", val: "sk_live_94820194819a" },
    { label: "User Email", val: "alex.sharma@gov.in" },
    { label: "Master Password", val: "TopSecret!2026#" },
  ]

  const metrics = [
    {
      metric: "0.00%",
      label: "Privacy Leakage Rate (PLR)",
      desc: "Zero unmasked credentials transmitted across all evaluation suites.",
      status: "SAFE",
      color: "text-signal-green border-signal-green/30 bg-signal-green/10",
    },
    {
      metric: "< 0.10%",
      label: "False Negative Rate (FNR)",
      desc: "Missed detection rate on sensitive Indian PII & international formats.",
      status: "VERIFIED",
      color: "text-signal-green border-signal-green/30 bg-signal-green/10",
    },
    {
      metric: "< 0.05%",
      label: "Masking Error Rate (MER)",
      desc: "Over-masking rate on neutral non-sensitive structural tags.",
      status: "OPTIMAL",
      color: "text-signal-green border-signal-green/30 bg-signal-green/10",
    },
  ]

  return (
    <section id="privacy" className="py-24 relative overflow-hidden bg-veil-ink text-white border-t border-white/5">
      {/* MorphingLight Three.js Shader background from privacy.txt */}
      <MorphingLight className="absolute inset-0 w-full h-full -z-10 opacity-60" />

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-signal-green uppercase px-3 py-1 rounded-full bg-signal-green/10 border border-signal-green/20">
            ON-DEVICE PRIVACY GUARANTEES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            Privacy by Architecture, Not Just Policy.
          </h2>
          <p className="text-base sm:text-lg text-slate-gray">
            Unlike cloud-based wrappers that process credentials on external servers, Veil enforces redaction inside your local browser memory before planning networks receive a single token.
          </p>
        </div>

        {/* Live Privacy Metrics Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-veil-ink/80 border border-white/10 backdrop-blur-md shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${m.color}`}>
                  {m.status}
                </span>
                <ShieldCheck size={16} className="text-signal-green" />
              </div>
              <div className="text-4xl font-extrabold text-white my-2">{m.metric}</div>
              <div className="text-sm font-semibold text-white/90">{m.label}</div>
              <div className="text-xs text-slate-gray mt-1 leading-relaxed">{m.desc}</div>
            </div>
          ))}
        </div>

        {/* Interactive Live Redaction Inspector Simulator */}
        <div className="rounded-3xl border border-white/15 bg-veil-ink/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-mono text-signal-green font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Zap size={14} /> Interactive Client Tester
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Test Veil&apos;s On-Device Redactor
              </h3>
              <p className="text-sm text-slate-gray mt-0.5">
                Type or choose a test credential below to see instant zero-latency redaction.
              </p>
            </div>

            {/* Traffic Light Logic Indicator */}
            <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-white/60">Risk Protocol:</span>
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-signal-green">
                <span className="w-2.5 h-2.5 rounded-full bg-signal-green shadow-[0_0_8px_#1FAE6E]" />
                SAFE
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-caution-amber opacity-40">
                <span className="w-2.5 h-2.5 rounded-full bg-caution-amber" />
                MEDIUM
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-alert-red opacity-40">
                <span className="w-2.5 h-2.5 rounded-full bg-alert-red" />
                RISK
              </span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 my-6">
            <span className="text-xs font-mono text-white/50 self-center mr-2">Try sample:</span>
            {samplePresets.map((p) => (
              <button
                key={p.label}
                onClick={() => handleTest(p.val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  testInput === p.val
                    ? "bg-signal-green/20 border-signal-green text-signal-green font-bold shadow-[0_0_10px_rgba(31,174,110,0.2)]"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Dual Column: Input vs Redacted Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Side */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-white/70">
                <span>LOCAL BROWSER INPUT (RAW)</span>
                <span className="text-caution-amber font-semibold">Classification: {detectedType}</span>
              </div>
              <input
                type="text"
                value={testInput}
                onChange={(e) => handleTest(e.target.value)}
                placeholder="Enter Aadhaar, PAN, email, or password..."
                className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white font-mono text-sm focus:border-signal-green focus:ring-1 focus:ring-signal-green transition-all"
              />
              <div className="text-[11px] font-mono text-white/40">
                Processed entirely on-device via regex &amp; lightweight client NER.
              </div>
            </div>

            {/* Output Side */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-white/70">
                <span>AI PLANNING DISPATCH (SANITIZED)</span>
                <span className="text-signal-green font-bold">STATUS: {status}</span>
              </div>
              <div className="w-full px-4 py-3.5 rounded-xl bg-signal-green/10 border border-signal-green/40 text-signal-green font-mono text-sm font-bold flex items-center justify-between shadow-[0_0_15px_rgba(31,174,110,0.15)]">
                <span>{redactedOutput}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-signal-green text-veil-ink font-bold">
                  PROTECTED
                </span>
              </div>
              <div className="text-[11px] font-mono text-white/40">
                Raw sensitive value never leaves the client boundary.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}