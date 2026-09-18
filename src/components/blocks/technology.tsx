"use client"

import React from "react"
import { ServiceCarousel, Service } from "@/components/ui/services-card"
import {
  Code,
  Eye,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Zap,
  Lock,
  Terminal,
  AlertTriangle,
  FileCode2,
} from "lucide-react"

export function Technology() {
  const architectureLayers: Service[] = [
    {
      number: "001",
      title: "DOM Analysis & Parsing",
      description:
        "High-performance native JavaScript tree traversal that maps actionable elements, inputs, and aria roles in sub-10ms without streaming pixels.",
      icon: Code,
      badge: "LAYER 1 — PERCEPTION",
      gradient: "from-blue-950/60 to-veil-ink border-blue-500/20",
      specs: ["Sub-10ms traversal", "Accessibility tree mapping", "Shadow DOM support"],
    },
    {
      number: "002",
      title: "Vision Fallback (WebGPU)",
      description:
        "When websites render inside HTML5 canvas, SVG graphics, or nested iframes, an on-device ONNX runtime runs visual element detection on WebGPU.",
      icon: Eye,
      badge: "LAYER 2 — VISION",
      gradient: "from-purple-950/60 to-veil-ink border-purple-500/20",
      specs: ["WebGPU acceleration", "ONNX MobileVLM", "Zero-server OCR"],
    },
    {
      number: "003",
      title: "Redaction & Masking Engine",
      description:
        "Rule-based patterns, contextual heuristics, and on-device NER detect Aadhaar, PAN, passwords, emails, and credentials, replacing them with sanitized tokens.",
      icon: ShieldCheck,
      badge: "LAYER 3 — PRIVACY",
      gradient: "from-emerald-950/60 to-veil-ink border-signal-green/30",
      specs: ["Aadhaar / PAN regex", "Password masking", "Token replacement"],
    },
    {
      number: "004",
      title: "Guardrails & Anti-Injection",
      description:
        "Pre-execution sanitizer blocks prompt injections hidden in website text, verifies action parameters against strict schemas, and halts unauthorized calls.",
      icon: Lock,
      badge: "LAYER 4 — DEFENSE",
      gradient: "from-amber-950/60 to-veil-ink border-caution-amber/30",
      specs: ["Prompt-injection filter", "Schema validation", "Banned terms"],
    },
    {
      number: "005",
      title: "Sanitized Context Dispatch",
      description:
        "Bundles the structural DOM graph and obfuscated visual frames into a compact payload (&lt; 4KB) sent to the AI planning agent.",
      icon: Terminal,
      badge: "LAYER 5 — DISPATCH",
      gradient: "from-cyan-950/60 to-veil-ink border-cyan-500/20",
      specs: ["Compact JSON schema", "Masked screenshots", "Zero raw leakage"],
    },
    {
      number: "006",
      title: "Local Executor & Human Loop",
      description:
        "Receives abstract agent commands (e.g. click, scroll, select) and executes them natively in the browser with user confirmation on high-risk operations.",
      icon: Cpu,
      badge: "LAYER 6 — EXECUTION",
      gradient: "from-emerald-950/60 to-veil-ink border-signal-green/30",
      specs: ["Sandboxed execution", "User approval loop", "State rollback"],
    },
  ]

  const challenges = [
    {
      challenge: "Accurate PII Detection without False Flags",
      solution: "Continuously tuned dual-pass pipeline: deterministic regex matching backed by contextual heuristics to eliminate false alarms.",
      status: "Solved",
    },
    {
      challenge: "Sub-100ms Compute Overhead",
      solution: "WebGPU kernel offloading and WebAssembly DOM parsers keep execution footprint under 85ms on mid-range client hardware.",
      status: "Benchmarked",
    },
    {
      challenge: "Dynamic Single Page Applications",
      solution: "MutationObserver listeners detect client-side routing and reactive re-renders before AI agents formulate execution plans.",
      status: "Integrated",
    },
  ]

  return (
    <section id="technology" className="py-24 bg-veil-ink text-white relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-semibold tracking-widest text-guard-purple uppercase px-3 py-1 rounded-full bg-guard-purple/10 border border-guard-purple/20">
            TECHNICAL ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            Six-Layer On-Device Stack
          </h2>
          <p className="text-base sm:text-lg text-slate-gray">
            Explore the architecture layers engineered specifically for SIH26171 (On-device Visual Perception for Light-weight Browser Agents).
          </p>
        </div>
      </div>

      {/* Service Carousel from technology.txt / services-card.tsx */}
      <ServiceCarousel services={architectureLayers} />

      {/* Challenge Cards Section */}
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl mt-20">
        <div className="text-center mb-10">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Key Engineering Challenges & How Veil Resolves Them
          </h3>
          <p className="text-sm text-slate-gray mt-1">
            Built for production browser agents operating in high-stakes environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 hover:border-signal-green/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-caution-amber flex items-center gap-1.5">
                    <AlertTriangle size={14} /> CHALLENGE {i + 1}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-signal-green/20 text-signal-green">
                    {c.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{c.challenge}</h4>
                <p className="text-sm text-slate-gray leading-relaxed">{c.solution}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-signal-green">
                <CheckCircle2 size={14} />
                <span>Verified in benchmark test suites</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}