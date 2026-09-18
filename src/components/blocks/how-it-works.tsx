"use client"

import React from "react"
import { ScannerCardStream } from "@/components/ui/scanner-card-stream"
import { motion } from "framer-motion"
import {
  Globe,
  Cpu,
  ShieldCheck,
  Send,
  BrainCircuit,
  CheckCircle2,
  Lock,
  Eye,
  ArrowRight,
} from "lucide-react"

export function HowItWorks() {
  const pipelineStages = [
    {
      number: "01",
      title: "Browser Viewport",
      caption: "User triggers an automation task in any web page.",
      details: "Veil attaches as a lightweight browser runtime observer.",
      icon: Globe,
      color: "border-white/20 text-white",
    },
    {
      number: "02",
      title: "Local Extraction",
      caption: "DOM element extraction & vision bounding boxes on-device.",
      details: "Parses DOM tree in sub-10ms without streaming pixels out.",
      icon: Cpu,
      color: "border-guard-purple/40 text-guard-purple",
    },
    {
      number: "03",
      title: "Local Redaction",
      caption: "Detects Aadhaar, PAN, passwords, emails, and API keys.",
      details: "Applies regex, local NER, and visual bounding box obfuscation.",
      icon: ShieldCheck,
      color: "border-signal-green/50 text-signal-green",
    },
    {
      number: "04",
      title: "Sanitized Context",
      caption: "Sends only sanitized page maps & masked screenshots.",
      details: "Guarantees zero raw credentials or PII reach the network.",
      icon: Send,
      color: "border-caution-amber/40 text-caution-amber",
    },
    {
      number: "05",
      title: "AI Planning",
      caption: "Remote LLM/VLM reasons on sanitized context.",
      details: "Formulates execution steps (click, type, navigate) safely.",
      icon: BrainCircuit,
      color: "border-guard-purple/50 text-guard-purple",
    },
    {
      number: "06",
      title: "Validation & Act",
      caption: "Local policy checks action & executes inside browser.",
      details: "User kept in the loop for sensitive confirmations.",
      icon: CheckCircle2,
      color: "border-signal-green text-signal-green",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-veil-ink text-white relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-signal-green uppercase px-3 py-1 rounded-full bg-signal-green/10 border border-signal-green/20">
            HOW VEIL WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            A continuous on-device filter between the page and AI.
          </h2>
          <p className="text-base sm:text-lg text-slate-gray">
            Watch the live stream scanner below: as web elements cross the Veil threshold, sensitive data is scrambled and converted into sanitized context tokens in real time.
          </p>
        </div>
      </div>

      {/* Interactive Three.js Scanner Stream from howitworks.txt */}
      <div className="w-full my-8">
        <ScannerCardStream repeat={8} initialSpeed={110} cardGap={32} />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl mt-16">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            The Six Pipeline Stages (See → Redact → Share → Act)
          </h3>
          <p className="text-sm text-slate-gray mt-1">
            Engineered for sub-100ms latency without cloud privacy compromises.
          </p>
        </div>

        {/* 6 Pipeline Stage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-2xl p-6 bg-white/[0.03] border ${stage.color} backdrop-blur-sm shadow-xl flex flex-col justify-between hover:bg-white/[0.06] transition-colors`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold tracking-widest text-white/40">
                      STAGE {stage.number}
                    </span>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{stage.title}</h4>
                  <p className="text-sm text-slate-gray leading-relaxed mb-3">
                    {stage.caption}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-xs font-mono text-white/60">
                  {stage.details}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}