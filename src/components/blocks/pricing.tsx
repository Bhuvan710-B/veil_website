"use client"

import React, { useState } from "react"
import { Check, Shield, ArrowRight, Sparkles, Building2, Terminal, Users, Lock, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pricing() {
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    company: "",
    agentsCount: "10-50",
    useCase: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [contactError, setContactError] = useState<string | null>(null)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactData.name || !contactData.email || !contactData.company) return
    setSubmitting(true)
    setContactError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setContactError(data.message || "Failed to submit inquiry. Please try again.")
      } else {
        setContactSuccess(true)
      }
    } catch {
      setContactError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const plans = [
    {
      name: "Starter",
      audience: "B2B SaaS / Indie Devs",
      desc: "For individual developers and small teams testing AI browser agents.",
      price: "300",
      period: "/agent /mo",
      highlighted: false,
      features: [
        "100% On-device redaction engine",
        "Aadhaar, PAN & password masking",
        "Standard prompt injection guardrails",
        "Up to 5 browser agent instances",
        "Community & Discord developer docs",
      ],
      cta: "Start Free Trial",
      href: "#early-access",
    },
    {
      name: "Team",
      audience: "SaaS Teams & Startups",
      desc: "For SaaS teams automating sensitive customer workflows at scale.",
      price: "550",
      period: "/agent /mo",
      highlighted: true,
      badge: "MOST POPULAR",
      features: [
        "Everything in Starter, plus:",
        "Real-time privacy metrics dashboard (PLR, FNR, MER)",
        "WebGPU visual fallback engine",
        "Shared team policy templates",
        "Custom regex & rule definitions",
        "Priority Slack support channel",
      ],
      cta: "Get Early Access",
      href: "#early-access",
    },
    {
      name: "Enterprise",
      audience: "Large Organizations",
      desc: "For organizations protecting internal browser activity with custom compliance.",
      price: "Custom",
      period: "annual contract",
      highlighted: false,
      features: [
        "Unlimited browser agent instances",
        "Custom on-device NER model fine-tuning",
        "SAML SSO & SCIM directory sync",
        "Air-gapped deployment support",
        "Dedicated onboarding & security audits",
        "24/7 dedicated SLA & account engineer",
      ],
      cta: "Contact Sales",
      isContact: true,
    },
    {
      name: "API / SDK",
      audience: "Agent Platform Builders",
      desc: "Drop-in privacy layer for agent frameworks (LangChain, AutoGPT, Playwright).",
      price: "Usage-based",
      period: "starts at $0.002 / run",
      highlighted: false,
      features: [
        "Full client SDK (TypeScript & Python)",
        "Zero-latency WebAssembly distribution",
        "White-label agent integration option",
        "Direct DOM tree sanitization hooks",
        "Headless browser & CI/CD support",
      ],
      cta: "View Architecture Specs",
      href: "#technology",
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-veil-ink text-white relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-signal-green uppercase px-3 py-1 rounded-full bg-signal-green/10 border border-signal-green/20">
            TRANSPARENT PRICING
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            Pricing that scales with how much you automate.
          </h2>
          <p className="text-base sm:text-lg text-slate-gray">
            Deploy on-device privacy guarantees with predictable tiers. Zero cloud extraction billing surprises.
          </p>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? "bg-veil-ink border-2 border-signal-green shadow-[0_0_35px_rgba(31,174,110,0.2)] relative scale-[1.03]"
                  : "bg-white/[0.03] border border-white/10 hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-white/50 uppercase">
                    {plan.audience}
                  </span>
                  {plan.badge && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-signal-green text-veil-ink">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-gray leading-relaxed mb-6">
                  {plan.desc}
                </p>

                <div className="mb-6 pb-6 border-b border-white/10">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-gray ml-1.5 font-mono">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                      <Check size={14} className="text-signal-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.isContact ? (
                <Button
                  onClick={() => {
                    setContactSuccess(false)
                    setContactError(null)
                    setShowContactModal(true)
                  }}
                  className="w-full py-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all bg-white/10 text-white hover:bg-white/20 border border-white/10"
                >
                  {plan.cta}
                </Button>
              ) : (
                <Button
                  asChild
                  className={`w-full py-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    plan.highlighted
                      ? "bg-signal-green text-veil-ink hover:bg-signal-green/90 shadow-[0_0_20px_rgba(31,174,110,0.3)]"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  }`}
                >
                  <a href={plan.href}>{plan.cta}</a>
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Regulated Deployments Footnote */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              setContactSuccess(false)
              setContactError(null)
              setShowContactModal(true)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-gray font-mono hover:border-signal-green/40 hover:text-white transition-all cursor-pointer"
          >
            <Lock size={14} className="text-signal-green" />
            <span>
              Finance, healthcare, and government teams — talk to us about regulated air-gapped deployments.
            </span>
          </button>
        </div>
      </div>

      {/* Enterprise Contact Modal Dialog */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-veil-ink border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-signal-green font-bold flex items-center gap-1.5 mb-1">
                <Building2 size={14} /> Enterprise Inquiries
              </span>
              <h3 className="text-2xl font-bold text-white">Deploy Veil in your Organization</h3>
              <p className="text-xs text-slate-gray mt-1">
                Air-gapped runtimes, custom NER models, and enterprise SLA contracts.
              </p>
            </div>

            {contactSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-signal-green/20 border border-signal-green text-signal-green flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-slate-gray max-w-sm mx-auto">
                  Thank you! Our engineering team will review your deployment requirements and get back to you within 1 business day.
                </p>
                <Button
                  onClick={() => setShowContactModal(false)}
                  className="mt-4 bg-signal-green text-veil-ink font-bold text-xs uppercase px-6 py-2 rounded-full"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-white/70 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:border-signal-green focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:border-signal-green focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Company / Org *</label>
                    <input
                      type="text"
                      required
                      value={contactData.company}
                      onChange={(e) => setContactData({ ...contactData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:border-signal-green focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Estimated Active Agent Instances</label>
                  <select
                    value={contactData.agentsCount}
                    onChange={(e) => setContactData({ ...contactData, agentsCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-veil-ink border border-white/15 text-white focus:border-signal-green focus:outline-none"
                  >
                    <option value="1-10">1 – 10 agents</option>
                    <option value="10-50">10 – 50 agents</option>
                    <option value="50-200">50 – 200 agents</option>
                    <option value="200+">200+ agents (Air-gapped fleet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Use Case &amp; Compliance Requirements</label>
                  <textarea
                    rows={3}
                    value={contactData.useCase}
                    onChange={(e) => setContactData({ ...contactData, useCase: e.target.value })}
                    placeholder="e.g. Automating banking portal operations, HIPAA/SOC2 compliance..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white focus:border-signal-green focus:outline-none text-xs"
                  />
                </div>

                {contactError && (
                  <p className="text-alert-red text-xs">{contactError}</p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowContactModal(false)}
                    className="text-white/60 hover:text-white text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-signal-green text-veil-ink font-bold text-xs uppercase px-6 py-2 rounded-xl hover:bg-signal-green/90"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 size={14} className="animate-spin" /> Submitting...
                      </span>
                    ) : (
                      "Submit Enterprise Request"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

