"use client"

import React from "react"
import dynamic from "next/dynamic"
import { liquidMetalPresets } from "@paper-design/shaders-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Shield, Sparkles, CheckCircle2, ArrowRight, EyeOff } from "lucide-react"

// Dynamically import LiquidMetal with ssr: false to guarantee clean client-side WebGL canvas initialization
const LiquidMetal = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.LiquidMetal),
  { ssr: false }
)

export interface LiquidMetalHeroProps {
  badge?: string
  title: string
  subtitle: string
  primaryCtaLabel: string
  secondaryCtaLabel?: string
  onPrimaryCtaClick: () => void
  onSecondaryCtaClick?: () => void
  features?: string[]
  microTrustLine?: string
  children?: React.ReactNode
}

export function LiquidMetalHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = [],
  microTrustLine = "No raw data ever leaves your device.",
  children,
}: LiquidMetalHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 text-white">
      {/* 
        Faithful LiquidMetal shader from hero.txt:
        Uses liquidMetalPresets[2] (Backdrop preset with distortion, softness, contour, angle: 90)
        Positioned to cover the hero background with full visibility
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <LiquidMetal
          {...liquidMetalPresets[2]}
          {...(liquidMetalPresets[2]?.params ?? {})}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
        {/* Subtle vignette and bottom blend to ensure high contrast for text while keeping fluid metal clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-veil-ink/40 via-transparent to-veil-ink pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          className="text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {badge && (
            <motion.div className="flex justify-center" variants={itemVariants}>
              <Badge
                variant="secondary"
                className="bg-signal-green/10 text-signal-green border border-signal-green/30 hover:bg-signal-green/20 transition-colors py-1.5 px-4 rounded-full text-xs font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
                {badge}
              </Badge>
            </motion.div>
          )}

          <motion.div className="space-y-6 max-w-4xl mx-auto" variants={itemVariants}>
            <motion.h1
              role="heading"
              aria-level={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-sm"
            >
              {title}
            </motion.h1>

            <motion.p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-200 leading-relaxed font-normal drop-shadow-sm">
              {subtitle}
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={onPrimaryCtaClick}
                size="lg"
                className="bg-signal-green text-veil-ink hover:bg-signal-green/90 transition-all duration-300 shadow-[0_0_25px_rgba(31,174,110,0.35)] text-base px-8 py-6 font-bold rounded-full gap-2"
              >
                {primaryCtaLabel}
                <ArrowRight size={18} />
              </Button>
            </motion.div>

            {secondaryCtaLabel && onSecondaryCtaClick && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={onSecondaryCtaClick}
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-md text-base px-8 py-6 font-semibold rounded-full gap-2"
                >
                  <EyeOff size={18} className="text-signal-green" />
                  {secondaryCtaLabel}
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Micro-trust line */}
          {microTrustLine && (
            <motion.div variants={itemVariants} className="pt-1">
              <p className="text-xs font-mono text-white/70 flex items-center justify-center gap-1.5 drop-shadow">
                <CheckCircle2 size={13} className="text-signal-green" />
                {microTrustLine}
              </p>
            </motion.div>
          )}

          {/* Child element: Live Interactive Browser Redaction Mockup */}
          {children && (
            <motion.div variants={itemVariants} className="pt-6">
              {children}
            </motion.div>
          )}

          {/* Features Card strip */}
          {features.length > 0 && (
            <motion.div className="pt-8 max-w-4xl mx-auto" variants={itemVariants}>
              <Card className="bg-veil-ink/70 border-white/15 backdrop-blur-xl shadow-2xl rounded-2xl">
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center text-center gap-2.5 p-2"
                      >
                        <Shield size={18} className="text-signal-green shrink-0" />
                        <p className="text-white/95 font-medium text-sm sm:text-base">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default LiquidMetalHero
