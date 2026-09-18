"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface Feature {
  step: string
  title?: string
  content: string
  image?: string
  renderVisual?: () => React.ReactNode
}

export interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  subtitle?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  subtitle,
  autoPlayInterval = 4000,
  imageHeight = "h-[420px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={cn("p-6 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-veil-ink dark:text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-base md:text-lg text-slate-gray max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1 md:col-span-5 space-y-4">
            {features.map((feature, index) => {
              const isCurrent = index === currentFeature

              return (
                <motion.div
                  key={index}
                  onClick={() => {
                    setCurrentFeature(index)
                    setProgress(0)
                  }}
                  className={cn(
                    "flex items-start gap-4 p-5 rounded-2xl cursor-pointer border transition-all duration-300",
                    isCurrent
                      ? "bg-white/80 dark:bg-veil-ink/90 border-signal-green/40 shadow-[0_8px_30px_rgba(31,174,110,0.12)] scale-[1.02]"
                      : "bg-white/30 dark:bg-veil-ink/30 border-black/5 dark:border-white/5 opacity-60 hover:opacity-100 hover:bg-white/60",
                  )}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: isCurrent ? 1 : 0.6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={cn(
                      "w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 mt-0.5",
                      isCurrent
                        ? "bg-signal-green text-white shadow-[0_0_15px_#1FAE6E]"
                        : index < currentFeature
                        ? "bg-signal-green/20 text-signal-green border border-signal-green/30"
                        : "bg-muted border border-border text-muted-foreground",
                    )}
                  >
                    {index <= currentFeature ? "✓" : index + 1}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-signal-green font-semibold">
                        {feature.step}
                      </span>
                      {isCurrent && (
                        <div className="w-16 h-1 bg-signal-green/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-signal-green rounded-full transition-all duration-100"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-veil-ink dark:text-white">
                      {feature.title || feature.step}
                    </h3>
                    <p className="text-sm text-slate-gray mt-1 leading-relaxed">
                      {feature.content}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 md:col-span-7 relative w-full overflow-hidden rounded-2xl border border-border bg-veil-ink/95 shadow-2xl",
              imageHeight
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center p-6"
                      initial={{ y: 60, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -60, opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                    >
                      {feature.renderVisual ? (
                        feature.renderVisual()
                      ) : feature.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={feature.image}
                            alt={feature.step}
                            className="w-full h-full object-cover rounded-xl"
                            width={1000}
                            height={600}
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-veil-ink via-veil-ink/60 to-transparent" />
                        </div>
                      ) : null}
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
