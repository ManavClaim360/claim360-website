import { useEffect, useRef } from 'react'

const STEPS = [
  {
    num: '01',
    icon: '📝',
    title: 'Free Consultation',
    desc: 'Share your investment details. Our experts assess your case and provide a clear recovery roadmap — no charges upfront.',
  },
  {
    num: '02',
    icon: '🔍',
    title: 'Document & Trace',
    desc: 'We gather all required documents and use our proprietary database to trace your investments across registrars.',
  },
  {
    num: '03',
    icon: '⚡',
    title: 'Filing & Follow-up',
    desc: 'We file IEPF-5 forms, coordinate with NSDL/registrars, and follow up relentlessly until your claim is processed.',
  },
  {
    num: '04',
    icon: '🎉',
    title: 'Recovery & Handover',
    desc: 'Once recovered, we ensure shares/dividends are credited to your demat account and close the loop completely.',
  },
]

export default function ProcessSection() {
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
    <section id="process" ref={ref} className="section-pad bg-slate-50 dark:bg-navy">
      <div className="c">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <div className="eyebrow reveal mb-4 justify-center">
            <span className="w-5 h-px bg-gold block" />
            How It Works
          </div>
          <h2 className="reveal font-display text-navy dark:text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            Your Recovery Journey in 4 Steps
          </h2>
          <p className="reveal text-slate-500 dark:text-white/45 text-lg max-w-lg mx-auto leading-relaxed">
            We've simplified a legally complex process into a clear, transparent, and end-to-end managed experience.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="reveal text-center group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon circle */}
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-navy-card border-2 border-slate-100 dark:border-white/10 flex items-center justify-center text-2xl sm:text-3xl mx-auto shadow-lg shadow-black/5 group-hover:border-gold group-hover:shadow-gold/20 group-hover:shadow-xl transition-all duration-400">
                    {step.icon}
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold text-navy-deep text-xs font-bold font-display flex items-center justify-center border-2 border-white dark:border-navy">
                    {step.num.slice(1)}
                  </div>
                </div>

                <div className="text-xs font-semibold text-gold/70 tracking-widest uppercase mb-2">Step {step.num}</div>
                <h3 className="font-display text-navy dark:text-white text-sm sm:text-lg mb-2 sm:mb-3">{step.title}</h3>
                <p className="hidden sm:block text-slate-500 dark:text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
          >
            Start Your Recovery Today
          </a>
        </div>
      </div>
    </section>
  )
}
