"use client"

import { Sparkles, ArrowRight } from "lucide-react"
import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"

export interface LiquidMetalButtonProps {
  label?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  viewMode?: "text" | "icon"
  icon?: React.ReactNode
  variant?: "primary" | "secondary"
  className?: string
}

export function LiquidMetalButton({
  label = "Get Early Access",
  onClick,
  type = "button",
  disabled = false,
  viewMode = "text",
  icon,
  variant = "primary",
  className,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleId = useRef(0)

  const dimensions = useMemo(() => {
    if (viewMode === "icon") {
      return {
        width: 48,
        height: 48,
        innerWidth: 44,
        innerHeight: 44,
      }
    } else {
      return {
        width: 170,
        height: 48,
        innerWidth: 166,
        innerHeight: 44,
      }
    }
  }, [viewMode])

  // Metallic animated rim shader effect via canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let angle = 0

    const render = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const grad = ctx.createLinearGradient(
        w / 2 + Math.cos(angle) * (w / 2),
        h / 2 + Math.sin(angle) * (h / 2),
        w / 2 - Math.cos(angle) * (w / 2),
        h / 2 - Math.sin(angle) * (h / 2),
      )

      if (variant === "primary") {
        grad.addColorStop(0, "#1FAE6E")
        grad.addColorStop(0.3, "#A3E635")
        grad.addColorStop(0.7, "#6E5BD0")
        grad.addColorStop(1, "#1FAE6E")
      } else {
        grad.addColorStop(0, "#ffffff")
        grad.addColorStop(0.5, "#5B6472")
        grad.addColorStop(1, "#ffffff")
      }

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      angle += isHovered ? 0.05 : 0.02
      animationId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationId)
  }, [isHovered, variant])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (disabled) return

  if (buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = { x, y, id: rippleId.current++ }

    setRipples((prev) => [...prev, ripple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
    }, 600)
  }

  onClick?.()
}
  return (
    <div className={`relative inline-block ${className || ""}`}>
      <div
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "relative",
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            transformStyle: "preserve-3d",
            transition:
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            transform: isPressed ? "scale(0.97)" : isHovered ? "scale(1.03)" : "scale(1)",
          }}
        >
          {/* Label & Icon Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {viewMode === "icon" ? (
              icon || <Sparkles size={18} className="text-white" />
            ) : (
              <>
                <span className="text-sm font-semibold tracking-wide text-white drop-shadow-md">
                  {label}
                </span>
                {icon || <ArrowRight size={15} className="text-white transition-transform group-hover:translate-x-1" />}
              </>
            )}
          </div>

          {/* Inner metallic button cap */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: `${dimensions.innerWidth}px`,
                height: `${dimensions.innerHeight}px`,
                margin: "2px",
                borderRadius: "100px",
                background: "linear-gradient(180deg, #182234 0%, #0B1220 100%)",
                boxShadow: isPressed
                  ? "inset 0px 2px 5px rgba(0, 0, 0, 0.6)"
                  : "inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          {/* Animated Liquid Metal Shader Rim */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                height: `${dimensions.height}px`,
                width: `${dimensions.width}px`,
                borderRadius: "100px",
                overflow: "hidden",
                boxShadow: isHovered
                  ? "0 0 20px rgba(31, 174, 110, 0.4), 0 8px 24px rgba(0, 0, 0, 0.4)"
                  : "0 4px 12px rgba(0, 0, 0, 0.3)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                className="w-full h-full block"
              />
            </div>
          </div>

          {/* Transparent interactive button element */}
          <button
  ref={buttonRef}
  type={type}
  disabled={disabled}
  onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false)
              setIsPressed(false)
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              background: "transparent",
              border: "none",
              cursor: disabled ? "not-allowed" : "pointer",
              outline: "none",
              zIndex: 40,
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
              overflow: "hidden",
              borderRadius: "100px",
            }}
            aria-label={label}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(31, 174, 110, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-animation 0.6s ease-out forwards",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  )
}
