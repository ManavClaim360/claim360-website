import { useEffect, useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

const ALL_TESTIMONIALS = [
  {
    name: 'KJ Alphons IAS (Rtd.)',
    role: 'Former Member of Parliament & Minister of Tourism',
    location: 'New Delhi',
    state: 'Delhi',
    quote: 'I was so pleasantly surprised by the job done by Mr. Saran and his company. They recovered very valuable stocks which we did not know we owned. Their service was outstanding and highly dependable.',
    result: '₹24 Lakh in shares recovered',
    rating: 5,
    photo: '/assets/alphons.png',
    initials: 'KA',
  },
  {
    name: 'Sanjay M. Raigaga',
    role: 'IT Professional',
    location: 'Texas, USA',
    state: 'NRI',
    quote: 'It has been a pleasure working with Claim360! They have been very professional and efficient even though I was thousands of miles away in the USA and the regularization had been rejected by a previous provider.',
    result: 'Investment regularized successfully',
    rating: 5,
    photo: '/assets/sanjay-raigaga.png',
    initials: 'SR',
  },
  {
    name: 'Anushka Khanna',
    role: 'Business Professional',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    quote: 'My late father\'s shares were stuck for 10 years. Claim360 recovered them in just 5 months. Absolutely incredible service. I was amazed at how efficiently they handled everything.',
    result: '₹18 Lakh + dividends recovered',
    rating: 5,
    photo: '/assets/Anushka-Khanna.png',
    initials: 'AK',
  },
  {
    name: 'Jamshed Wadia',
    role: 'Business Owner',
    location: 'Bengaluru, Karnataka',
    state: 'Karnataka',
    quote: 'Professional, transparent, and delivered exactly what they promised. The team kept me updated at every step. Highly recommend Claim360 to anyone with unclaimed investments.',
    result: 'IEPF shares fully recovered',
    rating: 5,
    photo: '/assets/jamshed-wadia.png',
    initials: 'JW',
  },
  {
    name: 'Kishor Chohan',
    role: 'Retired Executive',
    location: 'Ahmedabad, Gujarat',
    state: 'Gujarat',
    quote: 'Claim360 helped my family recover old physical share certificates. The process was smooth, and the team\'s patience with our questions was remarkable.',
    result: '3 companies\' shares recovered',
    rating: 5,
    photo: '/assets/Kishor-Chohan.jpeg',
    initials: 'KC',
  },
  {
    name: 'Arvind Chopra',
    role: 'NRI — London, UK',
    location: 'London, UK',
    state: 'NRI',
    quote: 'As an NRI, I was worried about managing Indian investments remotely. Claim360 handled everything without requiring me to travel to India. Simply outstanding.',
    result: 'NRI portfolio regularized',
    rating: 5,
    photo: '/assets/Arvind-Chopra.jpg.jpeg',
    initials: 'AC',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [userState, setUserState] = useState(null)
  const [filtered, setFiltered] = useState(ALL_TESTIMONIALS)
  const ref = useRef(null)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const state = data.region
        setUserState(state)
        const local = ALL_TESTIMONIALS.filter(t => t.state.toLowerCase() === state?.toLowerCase())
        if (local.length >= 1) {
          const rest = ALL_TESTIMONIALS.filter(t => t.state.toLowerCase() !== state?.toLowerCase())
          setFiltered([...local, ...rest])
        }
      })
      .catch(() => {})
  }, [])

  const prev = () => setCurrent(c => (c - 1 + filtered.length) % filtered.length)
  const next = () => setCurrent(c => (c + 1) % filtered.length)

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [filtered.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const visible = [
    filtered[(current) % filtered.length],
    filtered[(current + 1) % filtered.length],
    filtered[(current + 2) % filtered.length],
  ]

  return (
    <section id="testimonials" ref={ref} className="section-pad bg-white dark:bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gold/[0.015] pointer-events-none" />

      <div className="c relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow reveal mb-4">Client Stories</div>
            <h2 className="reveal font-display text-navy dark:text-white tracking-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Trusted by Clients{' '}
              <span className="italic text-gold">Worldwide</span>
            </h2>
            {userState && (
              <div className="reveal flex items-center gap-1.5 mt-2 text-sm text-slate-400 dark:text-white/40">
                <MapPin size={13} className="text-gold" />
                Showing results near {userState}
              </div>
            )}
          </div>
          <div className="reveal flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-500 dark:text-white/50 hover:bg-navy dark:hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl bg-navy dark:bg-gold text-white dark:text-navy-deep flex items-center justify-center hover:opacity-80 transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <div
              key={`${current}-${i}`}
              className="reveal bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-2xl p-7 flex flex-col transition-all duration-500"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" className="text-gold" />
                ))}
              </div>

              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-3 py-1.5 text-xs font-semibold text-gold-dark mb-5 self-start">
                🎯 {t.result}
              </div>

              <p className="font-display text-slate-700 dark:text-white/70 text-sm leading-relaxed italic flex-1 mb-6">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-slate-100 dark:border-white/[0.07]">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30 relative bg-navy dark:bg-gold/20">
                  <div className="absolute inset-0 flex items-center justify-center font-bold font-display text-white dark:text-gold text-sm">
                    {t.initials}
                  </div>
                  {t.photo && (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={e => e.currentTarget.remove()}
                    />
                  )}
                </div>
                <div>
                  <div className="text-navy dark:text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-400 dark:text-white/35 text-xs mt-0.5">{t.role}</div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-white/25 mt-0.5">
                    <MapPin size={8} />
                    {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-gold w-8' : 'bg-slate-200 dark:bg-white/20 w-2'}`}
            />
          ))}
        </div>

        <div className="text-center mt-8 text-slate-400 dark:text-white/25 text-xs">
          We're happy to provide client contact details for verification upon request.
        </div>
      </div>
    </section>
  )
}
