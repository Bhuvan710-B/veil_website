"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function MorphingLight({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera?: any
    scene?: any
    renderer?: any
    clock?: any
    uniforms?: any
    animationId?: number
  }>({})

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() { 
        gl_Position = vec4(position, 1.0); 
      }
    `

    // Fragment shader with Veil palette adaptation (Signal green, Guard purple, Deep ink)
    const fragmentShader = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;

      void main() {
        vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.yy;

        // Rotate UVs by -90 degrees
        float angle = -1.5708;
        mat2 rotation = mat2(cos(angle), -sin(angle),
                             sin(angle),  cos(angle));
        uv = rotation * uv;

        float c = distance(uv, vec2(0.0));
        float a = u_time * 1.5;

        vec3 light = vec3(0.5 - acos(sin(c * 4. + a)), 0.5 - acos(sin(c * 8. + a)), 0.1);
        vec3 source = mix(light, vec3(2.5), .4 - c);
        
        // Blend Veil Signal Green (#1FAE6E = 0.12, 0.68, 0.43) and Guard Purple (#6E5BD0 = 0.43, 0.35, 0.81)
        vec3 greenTone = vec3(0.12, 0.68, 0.43);
        vec3 purpleTone = vec3(0.43, 0.35, 0.81);
        vec3 hue = mix(greenTone, purpleTone, (uv.y - sin(u_time * 0.8)) * 0.5 + 0.5);
        
        vec3 color = mix(source * 0.4, hue, uv.x * 0.5 + 0.5);
        color = mix(vec3(0.043, 0.07, 0.125), color, 0.7); // Blend with Veil Ink base

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const clock = new THREE.Clock()
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      u_time: { value: 1.0 },
      u_resolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    container.appendChild(renderer.domElement)

    sceneRef.current = {
      camera,
      scene,
      renderer,
      clock,
      uniforms,
    }

    const onWindowResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight

      renderer.setSize(width, height)
      uniforms.u_resolution.value.x = renderer.domElement.width
      uniforms.u_resolution.value.y = renderer.domElement.height
    }

    const animate = () => {
      if (!sceneRef.current.uniforms || !sceneRef.current.clock) return

      sceneRef.current.uniforms.u_time.value = sceneRef.current.clock.getElapsedTime()
      renderer.render(scene, camera)
      sceneRef.current.animationId = requestAnimationFrame(animate)
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize)
    animate()

    return () => {
      window.removeEventListener("resize", onWindowResize)

      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }

      if (sceneRef.current.renderer) {
        container.removeChild(sceneRef.current.renderer.domElement)
        sceneRef.current.renderer.dispose()
      }

      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className || "absolute inset-0 w-full h-full -z-10 pointer-events-none"}
    />
  )
}
