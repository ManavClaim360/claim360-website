import { useEffect, useRef, useState } from 'react'

export default function GlobalReachSection() {
  const sectionRef = useRef(null)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect()
            setParallaxY(-rect.top * 0.12)
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f6f1e2] py-14 lg:py-24">
      {/* Subtle warm parallax glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${parallaxY * 0.4}px)`,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,162,74,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="c">
        <div className="text-center mb-8 lg:mb-12">
          <div
            className="inline-block text-[#2e4a88] leading-none px-2"
            style={{ fontFamily: '"Lavishly Yours", cursive', fontSize: 'clamp(1.8rem, 7vw, 5.25rem)' }}
          >
            from india to the world
          </div>
        </div>
      </div>

      {/* Map — bleeds to full width on large screens */}
      <div className="px-4 lg:px-0">
        <div className="mx-auto max-w-6xl lg:max-w-none bg-[#f3ecd8]/60 px-4 py-6 lg:px-10 lg:py-8">
          <img
            src="/assets/map_img.png"
            alt="Global reach map"
            className="w-full h-auto object-contain"
            style={{
              opacity: 0.88,
              transform: `translateY(${parallaxY}px)`,
              willChange: 'transform',
            }}
          />
        </div>
      </div>
    </section>
  )
}
