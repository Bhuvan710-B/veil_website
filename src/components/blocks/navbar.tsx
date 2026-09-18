"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Eye, Layers, ShieldCheck, Lock, Sparkles, Cpu } from "lucide-react"
import { TubelightNavBar, NavItem } from "@/components/ui/tubelight-navbar"
import { Button } from "@/components/ui/button"

interface NavBarProps {
  className?: string
}

export function NavBar({ className }: NavBarProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])
  const navItems: NavItem[] = [
    { name: "Product", url: "#product", icon: Eye },
    { name: "How It Works", url: "#how-it-works", icon: Layers },
    { name: "Features", url: "#features", icon: Sparkles },
    { name: "Technology", url: "#technology", icon: Cpu },
    { name: "Privacy", url: "#privacy", icon: ShieldCheck },
    { name: "Pricing", url: "#pricing", icon: Lock },
  ]

  return (
    <>
      {/* Top Header Bar with Logo and Actions */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-veil-ink/75 backdrop-blur-md border-b border-white/5 h-16">
        <div className="container mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group select-none">
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-signal-green transition-colors">
              VEIL
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-signal-green/10 text-signal-green border border-signal-green/20 hidden sm:inline-block">
              On-Device Layer
            </span>
          </Link>

          {/* Spacer for center tubelight nav */}
          <div className="hidden lg:block w-96" />

          {/* Right Actions */}
          {/* Right Actions */}
<div className="flex items-center gap-4">

  {loading ? null : user ? (
    <>
      <Link
        href="/dashboard"
        className="text-xs sm:text-sm font-medium text-white/70 hover:text-white transition-colors"
      >
        Dashboard
      </Link>

      <Button
        size="sm"
        onClick={async () => {
          await supabase.auth.signOut()
        }}
        className="bg-signal-green text-veil-ink hover:bg-signal-green/90 font-bold px-4 py-2 rounded-full text-xs sm:text-sm transition-all"
      >
        Log out
      </Button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="text-xs sm:text-sm font-medium text-white/70 hover:text-white transition-colors"
      >
        Log in
      </Link>

      <Button
        size="sm"
        className="bg-signal-green text-veil-ink hover:bg-signal-green/90 font-bold px-4 py-2 rounded-full text-xs sm:text-sm transition-all"
        asChild
      >
        <Link href="/signup">Sign up</Link>
      </Button>
    </>
  )}

</div>
        </div>
      </header>

      {/* Tubelight Navbar floating pill with Lamp glow */}
      <TubelightNavBar items={navItems} className="top-2 sm:top-3" />
    </>
  )
}