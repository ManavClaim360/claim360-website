import { useState, useEffect } from 'react'

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const onMove = e => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: 700,
        height: 700,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,162,74,0.07) 0%, rgba(201,162,74,0.025) 35%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'transform',
      }}
    />
  )
}
