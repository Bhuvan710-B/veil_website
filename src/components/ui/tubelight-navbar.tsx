"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface NavBarProps {
  items: NavItem[]
  className?: string
  activeItem?: string
  onSelect?: (name: string) => void
}

export function TubelightNavBar({ items, className, activeItem, onSelect }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(activeItem || (items[0]?.name ?? ""))
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (activeItem) {
      setActiveTab(activeItem)
    }
  }, [activeItem])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-4 sm:bottom-auto sm:top-4 left-1/2 -translate-x-1/2 z-50",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-2 bg-veil-ink/90 border border-white/10 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => {
                setActiveTab(item.name)
                onSelect?.(item.name)
              }}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 rounded-full transition-colors select-none",
                "text-white/70 hover:text-white",
                isActive && "text-white font-semibold",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden flex items-center justify-center">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-signal-green/15 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-signal-green rounded-t-full shadow-[0_0_12px_#1FAE6E]">
                    <div className="absolute w-12 h-6 bg-signal-green/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-signal-green/40 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-signal-green/60 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
