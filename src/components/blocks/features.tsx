"use client"

import React from "react"
import { FeatureSteps, Feature } from "@/components/ui/feature-section"
import { ShieldCheck, Cpu, Database, Activity, Eye, Shield, Lock, CheckCircle, Terminal, Layers } from "lucide-react"

export function Features() {
  const pipelineFeatures: Feature[] = [
    {
      step: "01 — SEE",
      title: "See Locally",
      content:
        "Reads webpage structure, DOM elements, and viewport entirely on-device. No page content is transmitted to the cloud just to be parsed or understood.",
      renderVisual: () => (
        <div className="w-full h-full p-6 flex flex-col justify-between font-mono text-xs text-white/90">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-signal-green flex items-center gap-2 font-bold">
              <Cpu size={16} /> On-Device DOM Extraction
            </span>
            <span className="px-2 py-0.5 rounded bg-signal-green/20 text-signal-green text-[10px]">
              0ms Network
            </span>
          </div>
          <div className="bg-black/60 rounded-xl p-4 border border-white/10 space-y-2 text-[11px]">
            <p className="text-white/40">{"// Viewport element discovery:"}</p>
            <p className="text-guard-purple">
              &lt;form id=&quot;payment-form&quot; action=&quot;/checkout&quot;&gt;
            </p>
            <p className="pl-4 text-white/80">
              &lt;input type=&quot;text&quot; name=&quot;aadhaar_number&quot; /&gt;{" "}
              <span className="text-caution-amber">← Identified</span>
            </p>
            <p className="pl-4 text-white/80">
              &lt;button type=&quot;submit&quot;&gt;Confirm Pay&lt;/button&gt;{" "}
              <span className="text-signal-green">← Action Target</span>
            </p>
            <p className="text-guard-purple">&lt;/form&gt;</p>
          </div>
          <div className="text-[11px] text-white/60 flex items-center justify-between">
            <span>DOM parsed in 12ms</span>
            <span className="text-signal-green">● Ready for local masking</span>
          </div>
        </div>
      ),
    },
    {
      step: "02 — REDACT",
      title: "Redact Locally",
      content:
        "Detects and masks PII, passwords, credit card numbers, emails, faces, and API keys before anything leaves the browser. Heuristics & local models run client-side.",
      renderVisual: () => (
        <div className="w-full h-full p-6 flex flex-col justify-between font-mono text-xs text-white/90">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-caution-amber flex items-center gap-2 font-bold">
              <ShieldCheck size={16} /> Live Masking Pipeline
            </span>
            <span className="px-2 py-0.5 rounded bg-caution-amber/20 text-caution-amber text-[10px]">
              SAFE STATUS
            </span>
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-black/60 border border-alert-red/30 flex items-center justify-between">
              <span className="text-white/60">Input: &quot;4829 1928 0192&quot;</span>
              <span className="text-alert-red font-bold">RAW PII</span>
            </div>
            <div className="text-center text-white/40 text-xs">↓ Local Redaction Transform</div>
            <div className="p-2.5 rounded-lg bg-black/60 border border-signal-green/40 flex items-center justify-between shadow-[0_0_15px_rgba(31,174,110,0.15)]">
              <span className="text-signal-green font-bold">Mask: [REDACTED_AADHAAR]</span>
              <span className="text-signal-green font-bold text-[10px]">VERIFIED 100%</span>
            </div>
          </div>
          <div className="text-[11px] text-white/60 flex items-center justify-between">
            <span>Redaction engine latency: 18ms</span>
            <span className="text-signal-green">Zero Cloud Calls</span>
          </div>
        </div>
      ),
    },
    {
      step: "03 — SHARE",
      title: "Share Safely",
      content:
        "Sends only sanitized screenshots, accessibility trees, element roles, and redaction manifests to the AI planning layer — never raw confidential content.",
      renderVisual: () => (
        <div className="w-full h-full p-6 flex flex-col justify-between font-mono text-xs text-white/90">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-guard-purple flex items-center gap-2 font-bold">
              <Terminal size={16} /> AI Planning Payload
            </span>
            <span className="px-2 py-0.5 rounded bg-guard-purple/20 text-guard-purple text-[10px]">
              SANITIZED
            </span>
          </div>
          <div className="bg-black/60 rounded-xl p-3.5 border border-white/10 space-y-1 text-[11px]">
            <p className="text-white/40">{"// Sanitized Context Sent to LLM:"}</p>
            <p className="text-white/70">{`{`}</p>
            <p className="pl-3 text-white/70">&quot;page_intent&quot;: &quot;Complete KYC verification&quot;,</p>
            <p className="pl-3 text-white/70">&quot;target_element&quot;: &quot;button#submit&quot;,</p>
            <p className="pl-3 text-signal-green">&quot;credentials_exposed&quot;: false,</p>
            <p className="pl-3 text-signal-green">&quot;pii_leaked&quot;: false</p>
            <p className="text-white/70">{`}`}</p>
          </div>
          <div className="text-[11px] text-white/60 flex items-center justify-between">
            <span>Payload Size: &lt; 4KB JSON</span>
            <span className="text-signal-green">Safe for GPT-4 / Claude</span>
          </div>
        </div>
      ),
    },
    {
      step: "04 — ACT",
      title: "Act Locally",
      content:
        "Validates every AI-proposed action against local policy and executes it inside the browser, with the user in the approval loop for high-risk operations.",
      renderVisual: () => (
        <div className="w-full h-full p-6 flex flex-col justify-between font-mono text-xs text-white/90">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-signal-green flex items-center gap-2 font-bold">
              <CheckCircle size={16} /> Policy Validation & Action
            </span>
            <span className="px-2 py-0.5 rounded bg-signal-green/20 text-signal-green text-[10px]">
              AUTHORIZED
            </span>
          </div>
          <div className="space-y-2.5 text-[11px]">
            <div className="p-3 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-white/90 font-bold">Action: Click &quot;Submit Payment&quot;</p>
                <p className="text-slate-gray text-[10px]">Requires user consent modal</p>
              </div>
              <span className="px-2 py-1 rounded bg-caution-amber/20 text-caution-amber font-bold text-[10px]">
                CONFIRM REQ
              </span>
            </div>
            <div className="p-3 rounded-lg bg-signal-green/10 border border-signal-green/30 flex items-center gap-2 text-signal-green">
              <Shield size={14} />
              <span>Prompt injection scan: PASSED (0 threats)</span>
            </div>
          </div>
          <div className="text-[11px] text-white/60 flex items-center justify-between">
            <span>Browser executor: native DOM dispatch</span>
            <span className="text-signal-green">✓ Completed</span>
          </div>
        </div>
      ),
    },
  ]

  const secondaryFeatures = [
    {
      icon: Cpu,
      title: "On-device DOM + Vision Fallback",
      desc: "Local WebGPU & ONNX models handle canvas and dynamic SPAs when standard DOM trees fail.",
      accent: "text-signal-green",
    },
    {
      icon: Shield,
      title: "Guardrail Layer",
      desc: "Pre-execution prompt-injection detection, schema validation, and banned-term scanning.",
      accent: "text-guard-purple",
    },
    {
      icon: Database,
      title: "Encrypted Local Data Store",
      desc: "Zero-cloud credential store on client machine for tokens, user preferences, and history.",
      accent: "text-caution-amber",
    },
    {
      icon: Activity,
      title: "Live Privacy Metrics",
      desc: "Real-time calculation of PLR (Privacy Leakage Rate), FNR, MER, and SAFE status indicators.",
      accent: "text-signal-green",
    },
  ]

  return (
    <section id="features" className="py-24 bg-veil-ink text-white relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Core Feature Steps from features.txt */}
        <FeatureSteps
          title="Privacy enforced before AI planning, not after."
          subtitle="Veil’s four-pillar architecture guarantees that automation takes place without sacrificing confidential user data."
          features={pipelineFeatures}
          autoPlayInterval={5000}
          imageHeight="h-[380px]"
        />

        {/* Secondary Feature Strip */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold tracking-widest text-white/50 uppercase">
              DEEP DEFENSE CAPABILITIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2">
              Engineering guarantees at every layer
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryFeatures.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div
                  key={i}
                  className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <Icon size={22} className={feat.accent} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{feat.title}</h4>
                  <p className="text-sm text-slate-gray leading-relaxed">{feat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}