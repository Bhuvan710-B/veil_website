"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import * as THREE from "three"

const defaultCardItems = [
  {
    id: 1,
    title: "Checkout Flow",
    field: "Card: 4532 •••• •••• 8821",
    status: "DETECTED_PAN",
    type: "Financial PII",
  },
  {
    id: 2,
    title: "Gov Portal KYC",
    field: "Aadhaar: 4920 8391 0029",
    status: "DETECTED_AADHAAR",
    type: "National ID",
  },
  {
    id: 3,
    title: "SSO Login Page",
    field: "Password: ••••••••••••",
    status: "DETECTED_PASSWORD",
    type: "Auth Credential",
  },
  {
    id: 4,
    title: "Developer Console",
    field: "Key: sk_live_920492819a...",
    status: "DETECTED_API_KEY",
    type: "Secret Token",
  },
  {
    id: 5,
    title: "HR Portal Profile",
    field: "Email: user@company.com",
    status: "DETECTED_EMAIL",
    type: "Personal Data",
  },
]

const ASCII_CHARS = "0123456789{}[]<>;:,._-+=!@#$%*|/\\VEILREDACTED"
const generateCode = (width: number, height: number): string => {
  let text = ""
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
  }
  let out = ""
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n"
  }
  return out
}

export type ScannerCardStreamProps = {
  showControls?: boolean
  initialSpeed?: number
  direction?: -1 | 1
  repeat?: number
  cardGap?: number
  friction?: number
}

export function ScannerCardStream({
  showControls = false,
  initialSpeed = 120,
  direction = -1,
  repeat = 6,
  cardGap = 40,
  friction = 0.98,
}: ScannerCardStreamProps) {
  const [isScanning, setIsScanning] = useState(false)

  const cards = useMemo(() => {
    const total = defaultCardItems.length * repeat
    return Array.from({ length: total }, (_, i) => {
      const item = defaultCardItems[i % defaultCardItems.length]
      return {
        ...item,
        id: i,
        ascii: generateCode(32, 12),
      }
    })
  }, [repeat])

  const cardLineRef = useRef<HTMLDivElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null)
  const originalAscii = useRef<Map<number, string>>(new Map())

  const cardStreamState = useRef({
    position: 0,
    velocity: initialSpeed,
    direction: direction,
    isDragging: false,
    lastMouseX: 0,
    lastTime: performance.now(),
    cardLineWidth: (340 + cardGap) * cards.length,
    friction: friction,
    minVelocity: 30,
  })

  const scannerState = useRef({ isScanning: false })

  useEffect(() => {
    const cardLine = cardLineRef.current
    const particleCanvas = particleCanvasRef.current
    const scannerCanvas = scannerCanvasRef.current

    if (!cardLine || !particleCanvas || !scannerCanvas) return

    cards.forEach((card) => originalAscii.current.set(card.id, card.ascii))
    let animationFrameId: number

    // --- Three.js particle background ---
    const width = window.innerWidth
    const height = 240
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      1000,
    )
    camera.position.z = 100

    const renderer = new THREE.WebGLRenderer({
      canvas: particleCanvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)

    const particleCount = 200
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    const alphas = new Float32Array(particleCount)

    const texCanvas = document.createElement("canvas")
    texCanvas.width = 64
    texCanvas.height = 64
    const texCtx = texCanvas.getContext("2d")!
    const half = 32
    const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half)
    gradient.addColorStop(0, "rgba(31, 174, 110, 1)")
    gradient.addColorStop(0.3, "rgba(31, 174, 110, 0.4)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
    texCtx.fillStyle = gradient
    texCtx.arc(half, half, half, 0, Math.PI * 2)
    texCtx.fill()
    const texture = new THREE.CanvasTexture(texCanvas)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * width * 1.5
      positions[i * 3 + 1] = (Math.random() - 0.5) * height
      positions[i * 3 + 2] = 0
      velocities[i] = Math.random() * 40 + 20
      alphas[i] = Math.random() * 0.7 + 0.3
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 12.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Scanner beam canvas
    const sCtx = scannerCanvas.getContext("2d")!
    scannerCanvas.width = width
    scannerCanvas.height = 260
    let scannerParticles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number
      life: number
      decay: number
    }> = []

    const createScannerParticle = () => ({
      x: width / 2 + (Math.random() - 0.5) * 6,
      y: Math.random() * 260,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 1.2 + 0.5,
      alpha: Math.random() * 0.6 + 0.4,
      life: 1.0,
      decay: Math.random() * 0.03 + 0.01,
    })

    for (let i = 0; i < 200; i++) {
      scannerParticles.push(createScannerParticle())
    }

    const runScrambleEffect = (element: HTMLElement, cardId: number) => {
      if (element.dataset.scrambling === "true") return
      element.dataset.scrambling = "true"
      const originalText = originalAscii.current.get(cardId) || ""
      let count = 0
      const interval = setInterval(() => {
        element.textContent = generateCode(32, 12)
        count++
        if (count >= 8) {
          clearInterval(interval)
          element.textContent = originalText
          delete element.dataset.scrambling
        }
      }, 40)
    }

    const updateCardEffects = () => {
      const scannerX = window.innerWidth / 2
      const scannerWidth = 16
      const scannerLeft = scannerX - scannerWidth / 2
      const scannerRight = scannerX + scannerWidth / 2
      let anyCardScanning = false

      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect()
        const normalCard = wrapper.querySelector<HTMLElement>(".card-normal")
        const asciiCard = wrapper.querySelector<HTMLElement>(".card-ascii")
        const asciiContent = asciiCard?.querySelector<HTMLElement>("pre")

        if (!normalCard || !asciiCard) return

        if (rect.left < scannerRight && rect.right > scannerLeft) {
          anyCardScanning = true
          if (wrapper.dataset.scanned !== "true" && asciiContent) {
            runScrambleEffect(asciiContent, index)
          }
          wrapper.dataset.scanned = "true"
          const intersectLeft = Math.max(scannerLeft - rect.left, 0)
          const intersectRight = Math.min(scannerRight - rect.left, rect.width)
          normalCard.style.setProperty("--clip-right", `${(intersectLeft / rect.width) * 100}%`)
          asciiCard.style.setProperty("--clip-left", `${(intersectRight / rect.width) * 100}%`)
        } else {
          delete wrapper.dataset.scanned
          if (rect.right < scannerLeft) {
            normalCard.style.setProperty("--clip-right", "100%")
            asciiCard.style.setProperty("--clip-left", "100%")
          } else {
            normalCard.style.setProperty("--clip-right", "0%")
            asciiCard.style.setProperty("--clip-left", "0%")
          }
        }
      })

      setIsScanning(anyCardScanning)
      scannerState.current.isScanning = anyCardScanning
    }

    const onResize = () => {
      const newWidth = window.innerWidth
      camera.left = -newWidth / 2
      camera.right = newWidth / 2
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, height)
      scannerCanvas.width = newWidth
    }
    window.addEventListener("resize", onResize)

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - cardStreamState.current.lastTime) / 1000
      cardStreamState.current.lastTime = currentTime

      if (!cardStreamState.current.isDragging) {
        cardStreamState.current.position +=
          cardStreamState.current.velocity * cardStreamState.current.direction * deltaTime
      }

      const { position, cardLineWidth } = cardStreamState.current
      const containerWidth = cardLine.parentElement?.offsetWidth || window.innerWidth
      if (position < -cardLineWidth) cardStreamState.current.position = containerWidth
      else if (position > containerWidth) cardStreamState.current.position = -cardLineWidth

      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`
      updateCardEffects()

      // Three.js particles
      const time = currentTime * 0.001
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.012
        if (positions[i * 3] > width / 2 + 50) positions[i * 3] = -width / 2 - 50
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.3
      }
      geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)

      // Scanner canvas particles
      sCtx.clearRect(0, 0, width, 260)
      scannerParticles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay
        if (p.life <= 0 || p.x > width) Object.assign(p, createScannerParticle())
        sCtx.globalAlpha = p.alpha * p.life
        sCtx.fillStyle = "#1FAE6E"
        sCtx.beginPath()
        sCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        sCtx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [cards, cardGap, friction, initialSpeed, direction])

  return (
    <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden select-none bg-veil-ink/90 border-y border-white/10">
      {/* Three.js Background canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-[240px] pointer-events-none z-0"
      />
      {/* Scanner glow particles canvas */}
      <canvas
        ref={scannerCanvasRef}
        className="absolute inset-0 w-full h-[260px] pointer-events-none z-10"
      />

      {/* Vertical Scanner Line with Signal Green glow */}
      <div
        className={`scanner-line absolute top-1/2 left-1/2 h-[260px] w-0.5 -translate-x-1/2 -translate-y-1/2 
          bg-gradient-to-b from-transparent via-signal-green to-transparent rounded-full
          transition-opacity duration-300 z-20 pointer-events-none animate-scan-pulse
          ${isScanning ? "opacity-100" : "opacity-75"}
        `}
        style={{
          boxShadow: "0 0 10px #1FAE6E, 0 0 20px #1FAE6E, 0 0 35px #1FAE6E, 0 0 50px rgba(31, 174, 110, 0.5)",
        }}
      />

      {/* Streaming Cards */}
      <div className="absolute w-full h-[240px] flex items-center overflow-visible">
        <div
          ref={cardLineRef}
          className="flex items-center whitespace-nowrap cursor-grab select-none will-change-transform"
          style={{ gap: `${cardGap}px` }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="card-wrapper relative w-[340px] h-[190px] shrink-0"
            >
              {/* Normal Raw Card (left of scanner) */}
              <div className="card-normal absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md p-5 flex flex-col justify-between shadow-2xl z-[2] [clip-path:inset(0_0_0_var(--clip-right,0%))]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/50">{card.type}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-alert-red/20 text-alert-red border border-alert-red/30">
                    RAW PAGE
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{card.title}</h4>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-white/90">
                    {card.field}
                  </div>
                </div>
                <div className="text-[11px] text-slate-gray flex items-center justify-between">
                  <span>Detected by local DOM parser</span>
                  <span className="text-caution-amber">● Pending Redaction</span>
                </div>
              </div>

              {/* Redacted Ascii / Sanitized Card (right of scanner) */}
              <div className="card-ascii absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden bg-veil-ink border border-signal-green/40 p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(31,174,110,0.15)] z-[1] [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-signal-green font-bold">VEIL AI ENGINE</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-signal-green/20 text-signal-green border border-signal-green/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-ping" />
                    SAFE
                  </span>
                </div>
                <div className="relative">
                  <div className="p-2 rounded bg-black/60 border border-signal-green/30 font-mono text-xs text-signal-green font-bold flex items-center justify-between">
                    <span>[{card.status}]</span>
                    <span className="text-[10px] text-white/60">0ms LEAK</span>
                  </div>
                  <pre className="ascii-content mt-2 font-mono text-[10px] leading-[12px] text-signal-green/70 overflow-hidden select-none">
                    {card.ascii}
                  </pre>
                </div>
                <div className="text-[10px] text-white/50 flex items-center justify-between">
                  <span>Sanitized context shared</span>
                  <span className="text-signal-green">✓ Client Protected</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
