import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

const DOT_SPACING = 88
const DOT_SIZE = 2.4
const HOVER_RADIUS = 140

// Dotted grid glow, low z-index so it never interferes with content
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

      const primary = isDark ? { r: 201, g: 162, b: 74 } : { r: 14, g: 32, b: 74 }
      const secondary = isDark ? primary : { r: 212, g: 176, b: 98 }

      for (let x = DOT_SPACING / 2; x < canvas.width; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < canvas.height; y += DOT_SPACING) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.hypot(dx, dy)
          const near = Math.max(0, 1 - dist / HOVER_RADIUS)

          // Alternate colors in light mode for subtle depth
          const useSecondary = !isDark && (Math.floor(x / DOT_SPACING) + Math.floor(y / DOT_SPACING)) % 2 === 0
          const c = useSecondary ? secondary : primary
          const alpha = 0.16 + near * 0.28

          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`
          ctx.beginPath()
          ctx.arc(x, y, DOT_SIZE + near * 1.1, 0, Math.PI * 2)
          ctx.fill()
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
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1, // sits under headers/menus
      }}
    />
  )
}
