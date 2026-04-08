import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

const DOT_SPACING = 82
const DOT_SIZE = 2
const HOVER_RADIUS = 180

// Dotted field with soft glow behind all content
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
      canvas.height = Math.max(window.innerHeight, document.body.scrollHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const base = isDark ? { r: 201, g: 162, b: 74 } : { r: 13, g: 33, b: 72 }
      const accent = isDark ? { r: 255, g: 214, b: 140 } : { r: 212, g: 176, b: 98 }

      for (let x = DOT_SPACING / 2; x < canvas.width; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < canvas.height; y += DOT_SPACING) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.hypot(dx, dy)
          const influence = Math.exp(-(dist * dist) / (2 * HOVER_RADIUS * HOVER_RADIUS))

          const alternate = (Math.floor(x / DOT_SPACING) + Math.floor(y / DOT_SPACING)) % 2 === 0
          const color = alternate ? base : accent
          const alpha = (isDark ? 0.18 : 0.14) + influence * 0.22

          ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`
          ctx.beginPath()
          ctx.arc(x, y, DOT_SIZE + influence * 1.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Subtle halo
      if (mouse.x > 0) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, HOVER_RADIUS * 1.2)
        grad.addColorStop(0, `rgba(${accent.r},${accent.g},${accent.b},0.15)`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, HOVER_RADIUS * 1.2, 0, Math.PI * 2)
        ctx.fill()
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
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1, // keep behind everything
      }}
    />
  )
}
