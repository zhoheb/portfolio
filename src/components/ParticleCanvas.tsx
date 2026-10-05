import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  accent: boolean
}

// Particles closer than this are joined by a line. Also the spatial grid cell size.
const LINK_DISTANCE = 85
// One particle per this many square pixels, so density is the same on any screen.
const AREA_PER_PARTICLE = 3600
const MIN_PARTICLES = 60
const MAX_PARTICLES = 900
const ACCENT_RATIO = 0.12
const LINE_WIDTH = 0.75
// Opacity of the network outside the spotlight.
const DIM_ALPHA = 0.07
const SPOTLIGHT_RADIUS = 280
// Share of the radius over which brightness falls from full to nothing.
const CORE_FALLOFF = 0.65
const FADE_IN_MS = 200
const FADE_OUT_MS = 500
// On touch devices the spotlight stays on the last touch this long, then drifts.
const TOUCH_HOLD_MS = 4000

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: 1 + Math.random() * 0.5,
    accent: Math.random() < ACCENT_RATIO,
  }
}

// Particle network that fills its (positioned) parent. It is nearly invisible
// except inside a soft spotlight that follows the cursor (or the last touch,
// or drifts on its own on touch devices).
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
    const noHover = window.matchMedia('(hover: none)')

    let width = 0
    let height = 0
    let radius = SPOTLIGHT_RADIUS
    let particles: Particle[] = []
    // Per-particle spotlight brightness, 0..1, recomputed each frame.
    let glow = new Float32Array(0)

    // Spatial grid as linked lists: cellHead[cell] -> particle index -> nextInCell.
    let cols = 0
    let rows = 0
    let cellHead = new Int32Array(0)
    let nextInCell = new Int32Array(0)

    // Last mouse position in viewport coordinates.
    let mouse: { x: number; y: number } | null = null
    // Last touch in canvas coordinates.
    let touch: { x: number; y: number; time: number } | null = null
    const spot = { x: 0, y: 0 }
    // Spotlight strength, 0 (dark) to 1 (fully lit).
    let intensity = 0

    let frame = 0
    let lastTime = 0
    let onScreen = true

    const drawLink = (i: number, j: number) => {
      const a = particles[i]
      const b = particles[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const distanceSq = dx * dx + dy * dy
      if (distanceSq >= LINK_DISTANCE * LINK_DISTANCE) return
      const closeness = 1 - Math.sqrt(distanceSq) / LINK_DISTANCE
      const lit = (glow[i] + glow[j]) / 2
      ctx.globalAlpha = (DIM_ALPHA + (1 - DIM_ALPHA) * lit) * closeness
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const count = particles.length

      // Spotlight brightness per particle, with a smoothstep falloff so the
      // edge of the lit region is soft.
      cellHead.fill(-1)
      for (let i = 0; i < count; i++) {
        const p = particles[i]
        let lit = 0
        if (intensity > 0) {
          // Fully lit in the inner part of the circle, fading to the rim.
          const t = Math.min(
            1,
            (1 - Math.hypot(p.x - spot.x, p.y - spot.y) / radius) / CORE_FALLOFF,
          )
          if (t > 0) lit = intensity * t * t * (3 - 2 * t)
        }
        glow[i] = lit

        const col = Math.min(cols - 1, Math.floor(p.x / LINK_DISTANCE))
        const row = Math.min(rows - 1, Math.floor(p.y / LINK_DISTANCE))
        const cell = row * cols + col
        nextInCell[i] = cellHead[cell]
        cellHead[cell] = i
      }

      // Only compare particles in the same or adjacent grid cells. Each pair of
      // cells is visited once by looking right and down.
      ctx.strokeStyle = blue
      ctx.lineWidth = LINE_WIDTH
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          for (let i = cellHead[row * cols + col]; i !== -1; i = nextInCell[i]) {
            for (let j = nextInCell[i]; j !== -1; j = nextInCell[j]) {
              drawLink(i, j)
            }
            for (const [dCol, dRow] of [
              [1, 0],
              [-1, 1],
              [0, 1],
              [1, 1],
            ]) {
              const nCol = col + dCol
              const nRow = row + dRow
              if (nCol < 0 || nCol >= cols || nRow >= rows) continue
              for (
                let j = cellHead[nRow * cols + nCol];
                j !== -1;
                j = nextInCell[j]
              ) {
                drawLink(i, j)
              }
            }
          }
        }
      }

      for (let i = 0; i < count; i++) {
        const p = particles[i]
        ctx.globalAlpha = DIM_ALPHA + (1 - DIM_ALPHA) * glow[i]
        ctx.fillStyle = p.accent ? coral : blue
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // Moves the spotlight toward its target and fades it in or out.
    const updateSpotlight = (time: number, elapsed: number) => {
      const frames = elapsed / 16.67
      let target: { x: number; y: number } | null = null
      let ease = 0.35

      if (noHover.matches) {
        if (touch && time - touch.time < TOUCH_HOLD_MS) {
          target = touch
        } else {
          // No recent touch: wander slowly around the hero.
          target = {
            x: width * (0.5 + 0.32 * Math.sin(time * 0.00021)),
            y: height * (0.5 + 0.28 * Math.sin(time * 0.00033 + 1.3)),
          }
          ease = 0.03
        }
      } else if (mouse) {
        // Re-checked every frame so scrolling the hero out from under a
        // stationary cursor also counts as leaving.
        const rect = canvas.getBoundingClientRect()
        const x = mouse.x - rect.left
        const y = mouse.y - rect.top
        if (x >= 0 && x <= width && y >= 0 && y <= height) target = { x, y }
      }

      if (target) {
        if (intensity === 0) {
          spot.x = target.x
          spot.y = target.y
        } else {
          const k = 1 - Math.pow(1 - ease, frames)
          spot.x += (target.x - spot.x) * k
          spot.y += (target.y - spot.y) * k
        }
        intensity = Math.min(1, intensity + elapsed / FADE_IN_MS)
      } else {
        intensity = Math.max(0, intensity - elapsed / FADE_OUT_MS)
      }
    }

    const step = (time: number) => {
      // Cap the step so a stalled tab doesn't jump.
      const elapsed = Math.min(time - lastTime, 32)
      lastTime = time
      const frames = elapsed / 16.67
      for (const p of particles) {
        p.x += p.vx * frames
        p.y += p.vy * frames
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        p.x = Math.min(Math.max(p.x, 0), width)
        p.y = Math.min(Math.max(p.y, 0), height)
      }
      updateSpotlight(time, elapsed)
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
      // Shrink the spotlight on narrow screens so it doesn't light everything.
      radius = Math.min(SPOTLIGHT_RADIUS, Math.min(width, height) * 0.55)

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
      glow = new Float32Array(count)
      nextInCell = new Int32Array(count)
      cols = Math.floor(width / LINK_DISTANCE) + 1
      rows = Math.floor(height / LINK_DISTANCE) + 1
      cellHead = new Int32Array(cols * rows)
      draw()
    }

    const onMouseMove = (event: MouseEvent) => {
      mouse = { x: event.clientX, y: event.clientY }
    }
    const onMouseLeave = () => {
      mouse = null
    }
    const onTouch = (event: TouchEvent) => {
      const point = event.touches[0]
      if (!point) return
      const rect = canvas.getBoundingClientRect()
      const x = point.clientX - rect.left
      const y = point.clientY - rect.top
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        touch = { x, y, time: performance.now() }
      }
    }
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        // Static, dim network with no spotlight.
        stop()
        intensity = 0
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
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    reducedMotion.addEventListener('change', onMotionChange)

    resize()
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
