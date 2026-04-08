import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

const NUM_POINTS = 70
const LINK_DIST = 140       // max distance between points to draw a line
const CURSOR_DIST = 180     // max distance from cursor to connect a point
const SPEED = 0.35

export default function CursorGlow() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    // Initialise drifting particles
    const points = Array.from({ length: NUM_POINTS }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Light mode: dark navy threads. Dark mode: gold threads.
      const r = isDark ? 201 : 10
      const g = isDark ? 162 : 22
      const b = isDark ? 74  : 40

      // Update particle positions
      for (const p of points) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      }

      // Draw web lines between nearby particles
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.12
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
          }
        }

        // Draw lines from particle to cursor
        const dx = points[i].x - mouse.x
        const dy = points[i].y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < CURSOR_DIST) {
          const alpha = (1 - dist / CURSOR_DIST) * 0.35
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(points[i].x, points[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  )
}
