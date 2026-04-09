import { useEffect } from 'react'

// Updates CSS variables so section background dots can react to the cursor
export default function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement
    const target = { x: -9999, y: -9999 }
    const current = { x: -9999, y: -9999 }
    let frameId

    const onMove = e => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const onLeave = () => {
      target.x = -9999
      target.y = -9999
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.14
      current.y += (target.y - current.y) * 0.14
      root.style.setProperty('--cursor-x', `${current.x}px`)
      root.style.setProperty('--cursor-y', `${current.y}px`)
      frameId = window.requestAnimationFrame(tick)
    }

    root.style.setProperty('--cursor-x', `${current.x}px`)
    root.style.setProperty('--cursor-y', `${current.y}px`)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return null
}
