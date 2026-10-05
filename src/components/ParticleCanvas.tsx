import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  accent: boolean
}

const LINK_DISTANCE = 130
const MOUSE_DISTANCE = 180
const MAX_PARTICLES = 140
const MIN_PARTICLES = 45
// One particle per this many square pixels, clamped to the range above.
const AREA_PER_PARTICLE = 9000
const ACCENT_RATIO = 0.12

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: 1.5 + Math.random() * 1.5,
    accent: Math.random() < ACCENT_RATIO,
  }
}

// Animated particle network that fills its (positioned) parent.
export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const styles = getComputedStyle(document.documentElement)
    const blue = styles.getPropertyValue('--blue').trim() || '#4a7bd6'
    const coral = styles.getPropertyValue('--coral').trim() || '#e8505b'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let mouse: { x: number; y: number } | null = null
    let frame = 0
    let lastTime = 0
    let onScreen = true

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.strokeStyle = blue
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance < LINK_DISTANCE) {
            ctx.globalAlpha = (1 - distance / LINK_DISTANCE) * 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (mouse) {
          const distance = Math.hypot(a.x - mouse.x, a.y - mouse.y)
          if (distance < MOUSE_DISTANCE) {
            ctx.globalAlpha = (1 - distance / MOUSE_DISTANCE) * 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 0.9
      for (const p of particles) {
        ctx.fillStyle = p.accent ? coral : blue
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const step = (time: number) => {
      // Normalize to 60fps and cap the step so a stalled tab doesn't jump.
      const dt = Math.min(time - lastTime, 32) / 16.67
      lastTime = time
      for (const p of particles) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        p.x = Math.min(Math.max(p.x, 0), width)
        p.y = Math.min(Math.max(p.y, 0), height)
      }
      draw()
      frame = requestAnimationFrame(step)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const start = () => {
      if (frame || !onScreen || reducedMotion.matches) return
      lastTime = performance.now()
      frame = requestAnimationFrame(step)
    }

    const resize = () => {
      const nextWidth = parent.clientWidth
      const nextHeight = parent.clientHeight
      if (!nextWidth || !nextHeight) return

      // Keep existing particles in the same relative position.
      for (const p of particles) {
        p.x *= nextWidth / width
        p.y *= nextHeight / height
      }
      width = nextWidth
      height = nextHeight

      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(
        Math.min(
          MAX_PARTICLES,
          Math.max(MIN_PARTICLES, (width * height) / AREA_PER_PARTICLE),
        ),
      )
      while (particles.length < count) {
        particles.push(createParticle(width, height))
      }
      particles.length = count
      draw()
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      mouse = x >= 0 && x <= width && y >= 0 && y <= height ? { x, y } : null
    }
    const onMouseLeave = () => {
      mouse = null
    }
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        stop()
        draw()
      } else {
        start()
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(parent)

    // Pause while the hero is scrolled out of view.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    visibilityObserver.observe(canvas)

    window.addEventListener('mousemove', onMouseMove)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    reducedMotion.addEventListener('change', onMotionChange)

    resize()
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
