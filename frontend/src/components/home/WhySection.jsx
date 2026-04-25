import { useEffect, useRef } from 'react'
import { Check, X, Target, Shield, Database, Globe } from 'lucide-react'

const FEATURES = [
  { label: 'Proprietary Investor Database Access', us: true, others: false },
  { label: 'NRI Services (No India visit needed)', us: true, others: false },
  { label: 'IEPF-5 Filing Expertise', us: true, others: true },
  { label: 'Physical Share Tracing', us: true, others: false },
  { label: 'Legal Documentation Support', us: true, others: false },
  { label: '99%+ Success Rate', us: true, others: false },
  { label: 'Dedicated Relationship Manager', us: true, others: false },
  { label: 'Transparent Pricing', us: true, others: false },
  { label: 'Multi-Country Operations', us: true, others: false },
  { label: 'Post-Recovery Support', us: true, others: false },
]

const WHY_CARDS = [
  { Icon: Target, title: 'Client-Centric Solutions', desc: 'Every case is unique. We tailor our approach to each client\'s specific investment situation and goals.' },
  { Icon: Shield, title: 'Integrity & Transparency', desc: 'No hidden fees, no false promises. We give you a clear picture of your recovery prospects upfront.' },
  { Icon: Database, title: 'Proprietary Data Access', desc: 'Our exclusive database helps locate investments that even registrars may fail to retrieve immediately.' },
  { Icon: Globe, title: 'Global Expertise', desc: 'Offices in Mumbai, New Delhi, and London. We serve clients in 6+ countries with equal proficiency.' },
]

export default function WhySection() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why" ref={ref} className="section-pad dot-tone-gold bg-navy-deep relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="c relative z-10">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="reveal inline-flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-gold mb-4 justify-center">
            Why Claim360
          </div>
          <h2 className="reveal font-display text-white mb-4 tracking-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            Why Clients Choose{' '}
            <span className="text-gradient">Claim360</span>
          </h2>
          <p className="reveal text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
            We combine financial expertise, legal knowledge, and proprietary data — to deliver results where others fall short.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left — Comparison table */}
          <div className="reveal">
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr,auto,auto] bg-white/[0.06] px-3 sm:px-5 py-3 border-b border-white/10">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Feature</div>
                <div className="text-xs font-semibold text-gold uppercase tracking-wider text-center px-2 sm:px-4">Claim360</div>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-wider text-center px-2 sm:px-4">Others</div>
              </div>

              {/* Rows */}
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr,auto,auto] px-3 sm:px-5 py-3 items-center border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors ${i === FEATURES.length - 1 ? 'border-0' : ''}`}
                >
                  <div className="text-white/65 text-xs sm:text-sm pr-2">{f.label}</div>
                  <div className="flex justify-center px-2 sm:px-4">
                    {f.us ? (
                      <div className="w-6 h-6 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                        <Check size={12} className="text-gold" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <X size={12} className="text-red-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center px-2 sm:px-4">
                    {f.others ? (
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <Check size={12} className="text-white/40" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center">
                        <X size={12} className="text-white/20" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Why cards */}
          <div className="space-y-4">
            {WHY_CARDS.map((c, i) => (
              <div
                key={i}
                className="reveal flex gap-4 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <c.Icon size={19} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1.5">{c.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
