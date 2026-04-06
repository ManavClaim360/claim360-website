import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, TrendingUp, Globe } from 'lucide-react'

const STATS = [
  { value: '7+', label: 'Years Experience', sublabel: 'Since 2016' },
  { value: '320+', label: 'Clients Served', sublabel: 'Across 6 Countries' },
  { value: '₹105Cr+', label: 'Recovered', sublabel: 'In Active Recovery' },
  { value: '99%+', label: 'Success Rate', sublabel: 'Proven Track Record' },
]

const FLOATING_BADGES = [
  { icon: Shield, text: 'SEBI Compliant', color: 'bg-emerald-500' },
  { icon: TrendingUp, text: '₹105Cr+ Recovered', color: 'bg-gold' },
  { icon: Globe, text: '6 Countries Served', color: 'bg-blue-500' },
]

export default function HeroSection() {
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    heroRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative bg-navy overflow-hidden min-h-[88vh] flex items-center"
    >
      {/* BG layers */}
      <div className="absolute inset-0 bg-navy-deep" />
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse 80% 70% at 70% -10%, rgba(201,162,74,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(10,35,71,0.8) 0%, transparent 70%)'
        }}
      />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }}
      />

      <div className="c relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2.5 bg-white/[0.07] border border-white/15 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
              <span className="text-sm font-medium text-white/80">India's #1 Investment Recovery Firm</span>
            </div>

            {/* Headline */}
            <h1 className="reveal font-display text-white leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: 'clamp(38px, 5.5vw, 72px)' }}
            >
              Reclaim,{' '}
              <span className="italic text-gold">Revive</span>{' '}
              &amp; Secure<br />
              Your <span className="text-gold italic">Investments</span>
            </h1>

            <p className="reveal text-white/55 text-lg leading-relaxed mb-10 max-w-lg">
              360 Degrees Management Services navigates the complexities of IEPF claims, unclaimed shares, and NRI investments — so you recover what's rightfully yours.
            </p>

            {/* CTAs */}
            <div className="reveal flex flex-wrap gap-4 mb-14">
              <a
                href="#contact"
                className="flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
              >
                Free Consultation
                <ArrowRight size={16} />
              </a>
              <a
                href="#services"
                className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Services
              </a>
            </div>

            {/* Stats strip */}
            <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-0 pt-10 border-t border-white/[0.08]">
              {STATS.map((s, i) => (
                <div key={i} className={`text-center sm:text-left ${i > 0 ? 'border-l border-white/[0.08] pl-6' : ''}`}>
                  <div className="font-display text-3xl text-white mb-1 leading-none">{s.value}</div>
                  <div className="text-xs font-semibold text-white/60 mb-0.5">{s.label}</div>
                  <div className="text-[10px] text-white/30">{s.sublabel}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual card */}
          <div className="hidden lg:block relative">
            {/* Main card */}
            <div className="relative z-10 bg-white/[0.05] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">Recovery Overview</div>
                  <div className="font-display text-white text-xl">₹105Cr+ Recovered</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                  <TrendingUp size={18} className="text-gold" />
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-2.5 h-28 mb-6">
                {[35, 52, 45, 70, 60, 85, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg transition-all duration-700"
                      style={{
                        height: `${h}%`,
                        background: i === 6
                          ? 'linear-gradient(to top, #C9A24A, #e8c878)'
                          : `rgba(201,162,74,${0.15 + i * 0.08})`
                      }}
                    />
                    <div className="text-white/25 text-[8px]">
                      {['19', '20', '21', '22', '23', '24', '25'][i]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Active Cases', val: '48+', change: '+12%' },
                  { label: 'Success Rate', val: '99.2%', change: '+0.4%' },
                  { label: 'Avg. Recovery Time', val: '4.5 mo', change: '-0.8mo' },
                  { label: 'Countries Served', val: '6', change: '+1' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                    <div className="text-white/35 text-[10px] mb-1">{s.label}</div>
                    <div className="flex items-center justify-between">
                      <div className="font-display text-white text-lg">{s.val}</div>
                      <div className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                        {s.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-5 -right-5 bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl px-4 py-3 shadow-2xl animate-float">
              <div className="text-xs text-slate-400 mb-1">Trusted by</div>
              <div className="font-display text-navy dark:text-white text-lg">320+ Clients</div>
              <div className="flex -space-x-2 mt-2">
                {['B', 'S', 'A', 'R', 'M'].map((l, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-gold to-gold-dark border-2 border-white dark:border-navy-deep flex items-center justify-center text-[10px] font-bold text-navy-deep">
                    {l}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -left-6 bg-navy border border-gold/20 rounded-2xl px-4 py-3 shadow-2xl">
              <div className="text-gold text-[10px] font-semibold uppercase tracking-wider mb-1">Latest Recovery</div>
              <div className="text-white font-display text-lg">₹48 Lakhs</div>
              <div className="text-white/40 text-xs">NRI client — Texas, USA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="white" fillOpacity="0.04" />
        </svg>
      </div>
    </section>
  )
}
