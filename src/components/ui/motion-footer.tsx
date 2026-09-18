"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUp, Github, Twitter, Linkedin, ShieldCheck, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const FOOTER_STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: rgba(255, 255, 255, 0.05);
  --pill-bg-2: rgba(255, 255, 255, 0.02);
  --pill-shadow: rgba(0, 0, 0, 0.4);
  --pill-highlight: rgba(255, 255, 255, 0.12);
  --pill-border: rgba(255, 255, 255, 0.08);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(31, 174, 110, 0.15) 0%, 
    rgba(110, 91, 208, 0.15) 40%, 
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%);
  border-color: rgba(31, 174, 110, 0.4);
  box-shadow: 0 15px 35px -10px rgba(31, 174, 110, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(31, 174, 110, 0.25));
}
`

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType
  }

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null)

    useEffect(() => {
      if (typeof window === "undefined") return
      const element = localRef.current
      if (!element) return

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect()
          const h = rect.width / 2
          const w = rect.height / 2
          const x = e.clientX - rect.left - h
          const y = e.clientY - rect.top - w

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.3,
          })
        }

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.0,
          })
        }

        element.addEventListener("mousemove", handleMouseMove as any)
        element.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any)
          element.removeEventListener("mouseleave", handleMouseLeave)
        }
      }, element)

      return () => ctx.revert()
    }, [])

    return (
      <Component
        ref={(node: HTMLElement) => {
          ;(localRef as any).current = node
          if (typeof forwardedRef === "function") forwardedRef(node)
          else if (forwardedRef) (forwardedRef as any).current = node
        }}
        className={cn("cursor-pointer select-none", className)}
        {...props}
      >
        {children}
      </Component>
    )
  },
)
MagneticButton.displayName = "MagneticButton"

const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6">
    <span>ON-DEVICE PERCEPTION</span> <span className="text-signal-green">✦</span>
    <span>ZERO RAW DATA LEAKAGE</span> <span className="text-guard-purple">✦</span>
    <span>SUB-100MS LATENCY</span> <span className="text-signal-green">✦</span>
    <span>VERIFIED</span> <span className="text-caution-amber">✦</span>
    <span>LOCAL REDACTION ENGINE</span> <span className="text-signal-green">✦</span>
    <span>PRIVACY BY ARCHITECTURE</span> <span className="text-guard-purple">✦</span>
  </div>
)

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!wrapperRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      )

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_STYLES }} />

      <div
        ref={wrapperRef}
        className="relative min-h-[90vh] md:min-h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="relative md:fixed bottom-0 left-0 flex min-h-[90vh] md:h-screen w-full flex-col justify-between overflow-hidden bg-veil-ink text-white cinematic-footer-wrapper pt-16 pb-8">
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            VEIL.
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="relative w-full overflow-hidden border-y border-white/10 bg-veil-ink/70 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs font-mono font-bold tracking-[0.25em] text-white/70 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-12 w-full max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-signal-green/10 border border-signal-green/25 text-signal-green text-xs font-mono mb-6">
              <ShieldCheck size={15} />
              <span>THE PRIVACY LAYER BETWEEN YOUR BROWSER AND AI</span>
            </div>

            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl font-black footer-text-glow tracking-tight mb-8"
            >
              Give your AI agent eyes,<br />not access.
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              <div className="flex flex-wrap justify-center gap-3 w-full">
                <MagneticButton
                  as="a"
                  href="#early-access"
                  className="footer-glass-pill px-8 py-4 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-2.5 group bg-signal-green/20 border-signal-green/40 hover:bg-signal-green hover:text-veil-ink"
                >
                  <span className="w-2 h-2 rounded-full bg-signal-green group-hover:bg-veil-ink" />
                  Get Early Access
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="#technology"
                  className="footer-glass-pill px-8 py-4 rounded-full text-white font-semibold text-sm md:text-base flex items-center gap-2"
                >
                  Read Architecture Specs
                </MagneticButton>
              </div>

              {/* Navigation Quick Links */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full mt-4">
                <MagneticButton as="a" href="#product" className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white">
                  Product
                </MagneticButton>
                <MagneticButton as="a" href="#technology" className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white">
                  Technology
                </MagneticButton>
                <MagneticButton as="a" href="#how-it-works" className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white">
                  How It Works
                </MagneticButton>
                <MagneticButton as="a" href="#privacy" className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white">
                  Privacy Metrics
                </MagneticButton>
                <MagneticButton as="a" href="#pricing" className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white">
                  Pricing
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pt-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
            <div className="text-slate-gray text-xs font-mono order-2 md:order-1 text-center md:text-left">
              © 2026 Veil AI (Team Obscura). All rights reserved.
              <span className="block text-[11px] text-white/40 mt-0.5">
                All processing happens locally in the browser. No raw data leaves the device.
              </span>
            </div>

            <div className="footer-glass-pill px-5 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="text-white/60 text-xs font-mono">Built for</span>
              <span className="text-signal-green font-bold text-xs">PRIVACY</span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-white font-bold text-xs">Team Obscura</span>
            </div>

            <div className="flex items-center gap-3 order-3">
              <div className="flex items-center gap-2">
                <MagneticButton as="a" href="https://github.com" target="_blank" className="w-10 h-10 rounded-full footer-glass-pill flex items-center justify-center text-white/70 hover:text-white">
                  <Github size={16} />
                </MagneticButton>
                <MagneticButton as="a" href="https://twitter.com" target="_blank" className="w-10 h-10 rounded-full footer-glass-pill flex items-center justify-center text-white/70 hover:text-white">
                  <Twitter size={16} />
                </MagneticButton>
                <MagneticButton as="a" href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-full footer-glass-pill flex items-center justify-center text-white/70 hover:text-white">
                  <Linkedin size={16} />
                </MagneticButton>
              </div>

              <MagneticButton
                as="button"
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full footer-glass-pill flex items-center justify-center text-white/70 hover:text-white group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" />
              </MagneticButton>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
