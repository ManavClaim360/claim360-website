import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 7, suffix: '+', label: 'Years of Excellence', desc: 'Established in 2016' },
  { value: 320, suffix: '+', label: 'Clients Served', desc: 'Across India & abroad' },
  { value: 6, suffix: '', label: 'Countries Reached', desc: 'Global client base' },
  { value: 99, suffix: '%+', label: 'Success Rate', desc: 'Proven track record' },
]

function Counter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsSection() {
  return (
    <section id="stats" className="py-16 bg-navy dark:bg-navy-deep relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="c relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-gold mb-3">
            <span className="w-5 h-px bg-gold block"/>By The Numbers
          </div>
          <h2 className="font-display text-white text-3xl lg:text-4xl tracking-tight">
            Results That Speak For Themselves
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08]">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-navy dark:bg-navy-deep p-8 text-center hover:bg-navy-light/30 transition-colors duration-300 group"
            >
              <div className="font-display text-white mb-2 leading-none group-hover:text-gold transition-colors duration-300"
                style={{ fontSize: 'clamp(40px, 5vw, 60px)' }}
              >
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/70 font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-white/30 text-xs">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Subsidiary line */}
        <div className="text-center mt-8 text-white/25 text-xs">
          ₹105 Crore+ currently under active recovery management
        </div>
      </div>
    </section>
  )
}
