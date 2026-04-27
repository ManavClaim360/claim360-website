import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const BADGE_PHOTOS = [
  '/assets/alphons.png',
  '/assets/sanjay-raigaga.png',
  '/assets/Anushka-Khanna.png',
  '/assets/Rajiv-Kaul.jpg.jpeg',
  '/assets/jamshed-wadia.png',
  '/assets/Vinod-Juneja.png',
  '/assets/Nithya-and-Santhakumar-Sundaram.jpg.jpeg',
  '/assets/M-D-Asthana.png',
]

const STATS = [
  { value: '10+', label: 'Years Experience', sublabel: 'Since 2016' },
  { value: '320+', label: 'Clients Served', sublabel: 'Across 6 Countries' },
  { value: 'Rs.105Cr+', label: 'Recovered', sublabel: 'In Active Recovery' },
  { value: '99%+', label: 'Success Rate', sublabel: 'Proven Track Record' },
]

export default function HeroSection() {
  const heroRef = useRef(null)
  const glowRef = useRef(null)
  const dotRef = useRef(null)
  const [photoIdx, setPhotoIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setPhotoIdx(i => (i + 1) % BADGE_PHOTOS.length), 2500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    heroRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(circle 340px at ${x}px ${y}px, rgba(201,162,74,0.18) 0%, rgba(201,162,74,0.06) 45%, transparent 72%)`
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`
      dotRef.current.style.opacity = '1'
    }
  }

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.background = 'transparent'
    if (dotRef.current) dotRef.current.style.opacity = '0'
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-navy-deep overflow-hidden flex items-center"
      style={{ minHeight: 'calc(100vh - var(--header-stack-height))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 70% at 70% -10%, rgba(201,162,74,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(10,35,71,0.8) 0%, transparent 70%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='8' cy='8' r='1.6' fill='%23c9a24a' fill-opacity='0.22'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
          backgroundPosition: '20px 18px',
        }}
      />

      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{ transition: 'none' }}
      />

      <div
        ref={dotRef}
        className="absolute top-0 left-0 pointer-events-none z-[4]"
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'rgba(201,162,74,0.88)',
          boxShadow: '0 0 14px 4px rgba(201,162,74,0.5), 0 0 28px 12px rgba(201,162,74,0.2)',
          opacity: 0,
          transition: 'opacity 150ms ease',
          willChange: 'transform, opacity',
        }}
      />

      <div className="c relative z-10 pt-3 pb-6 sm:pt-5 sm:pb-10 lg:pt-7 lg:pb-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="reveal inline-flex items-center gap-2.5 bg-white/[0.07] border border-white/15 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
              <span className="text-sm font-medium text-white/80">India's #1 Investment Recovery Firm</span>
            </div>

            <h1
              className="reveal font-display text-white leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: 'clamp(38px, 5.5vw, 72px)' }}
            >
              Reclaim, <span className="italic text-gold">Revive</span> &amp; Secure
              <br />
              Your <span className="text-gold italic">Investments</span>
            </h1>

            <p className="reveal text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              360 Degrees Management Services navigates the complexities of IEPF claims, unclaimed shares,
              and NRI investments so you recover what's rightfully yours.
            </p>

            <div className="reveal flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-7 sm:mb-10">
              <a
                href="#contact"
                className="flex w-full sm:w-auto justify-center items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
              >
                Free Consultation
                <ArrowRight size={16} />
              </a>
              <a
                href="#services"
                className="flex w-full sm:w-auto justify-center items-center gap-2 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Services
              </a>
            </div>

            <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-0 pt-8 border-t border-white/[0.08]">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className={`text-center sm:text-left py-2 sm:py-0 ${i > 0 ? 'sm:border-l border-white/[0.08] sm:pl-6' : ''} ${i % 2 !== 0 ? 'border-l border-white/[0.08] pl-4' : ''}`}
                >
                  <div className="font-display text-3xl text-white mb-1 leading-none">{s.value}</div>
                  <div className="text-xs font-semibold text-white/60 mb-0.5">{s.label}</div>
                  <div className="text-[10px] text-white/30">{s.sublabel}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/assets/home-banner-1.png"
                alt="Investment Recovery"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
            </div>

            <Link
              to="/testimonials"
              className="absolute top-4 right-4 bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl px-3 py-2.5 shadow-2xl animate-float hover:shadow-gold/20 hover:border-gold/30 transition-all duration-300 cursor-pointer"
            >
              <div className="text-[11px] text-slate-400 mb-1">Trusted by</div>
              <div className="font-display text-navy dark:text-white text-base">320+ Clients</div>
              <div className="flex -space-x-2 mt-2">
                {[0, 1, 2].map(offset => (
                  <img
                    key={offset}
                    src={BADGE_PHOTOS[(photoIdx + offset) % BADGE_PHOTOS.length]}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover border-2 border-white dark:border-navy-deep transition-all duration-500"
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                ))}
                <div className="w-6 h-6 rounded-full bg-gold border-2 border-white dark:border-navy-deep flex items-center justify-center text-[9px] font-bold text-navy-deep">
                  +
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="white" fillOpacity="0.04" />
        </svg>
      </div>
    </section>
  )
}
