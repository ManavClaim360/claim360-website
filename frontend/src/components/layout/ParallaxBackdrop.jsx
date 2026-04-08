import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

// Soft parallax blobs that drift with scroll; kept far under UI chrome
export default function ParallaxBackdrop() {
  const { isDark } = useTheme()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      const next = window.scrollY
      if (!ticking) {
        requestAnimationFrame(() => {
          setOffset(next)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const palette = isDark
    ? ['rgba(14,26,48,0.65)', 'rgba(24,48,88,0.55)', 'rgba(201,162,74,0.12)']
    : ['rgba(230,237,245,0.8)', 'rgba(212,188,140,0.18)', 'rgba(151,176,215,0.22)']

  const layers = [
    { size: 760, baseX: '-18%', baseY: '-12%', speed: 0.12, color: palette[0], blur: 'blur-3xl' },
    { size: 540, baseX: '68%', baseY: '8%', speed: 0.18, color: palette[1], blur: 'blur-2xl' },
    { size: 900, baseX: '32%', baseY: '64%', speed: 0.08, color: palette[2], blur: 'blur-3xl' },
  ]

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
      {layers.map((layer, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${layer.blur}`}
          style={{
            width: layer.size,
            height: layer.size,
            background: `radial-gradient(circle, ${layer.color} 0%, transparent 70%)`,
            transform: `translate3d(${layer.baseX}, calc(${layer.baseY} + ${offset * layer.speed}px), 0)`,
            transition: 'background 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}
