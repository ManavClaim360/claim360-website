import { useEffect } from 'react'

// Updates CSS variables so section background dots can react to the cursor
export default function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement
    const onMove = e => {
      root.style.setProperty('--cursor-x', `${e.clientX}px`)
      root.style.setProperty('--cursor-y', `${e.clientY}px`)
    }

    const onLeave = () => {
      root.style.setProperty('--cursor-x', '-9999px')
      root.style.setProperty('--cursor-y', '-9999px')
    }

    root.style.setProperty('--cursor-x', '-9999px')
    root.style.setProperty('--cursor-y', '-9999px')

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return null
}
