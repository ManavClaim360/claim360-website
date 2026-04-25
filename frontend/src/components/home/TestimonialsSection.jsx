import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, X, Eye, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_TESTIMONIALS = [
  {
    name: 'KJ Alphons IAS (Rtd.)',
    role: 'Former Minister of Tourism',
    location: 'New Delhi, India',
    state: 'Delhi',
    quote: `I was so pleasantly surprised by the job done by Mr. Saran and his company, 360 Degrees Management Services, who recovered very valuable stocks which we did not know we owned. Their service was outstanding and highly dependable.`,
    result: 'Valuable stocks traced and recovered',
    rating: 5,
    photo: '/assets/alphons.png',
    initials: 'KA',
  },
  {
    name: 'Rajiv Kaul',
    role: 'Former President, Leela Hotels',
    location: 'Mumbai, India',
    state: 'Maharashtra',
    quote: `My grateful thanks to the 360 Degrees team for helping me reclaim lost shares and unclaimed dividends of substantial value that I was completely unaware of. Their services are very professional.`,
    result: 'Lost shares and dividends reclaimed',
    rating: 5,
    photo: '/assets/Rajiv-Kaul.jpg.jpeg',
    initials: 'RK',
  },
  {
    name: 'Sanjay M. Raigaga',
    role: '',
    location: 'Texas, USA',
    state: 'NRI',
    quote: `It has been a pleasure working with Claim 360! They have been very professional and efficient even though the regularization of my late mother's investment had been rejected previously while working with another service provider, and I was thousands of miles away in the USA.`,
    result: 'Investment regularized remotely',
    rating: 5,
    photo: '/assets/sanjay-raigaga.png',
    initials: 'SR',
  },
  {
    name: 'Jamshed (Jim) Wadia',
    role: '',
    location: 'London, United Kingdom',
    state: 'NRI',
    quote: `Professional, accurate, thorough, responsive, and timely - words to describe my experience with Claim 360 and Mr. Saran. The team spared me the hassle of dealing with officialdom and converted a contingent asset into a real one when it hit my demat account.`,
    result: 'IEPF shares converted to demat',
    rating: 5,
    photo: '/assets/jamshed-wadia.png',
    initials: 'JW',
  },
  {
    name: 'Nithya & Santhakumar Sundaram',
    role: 'World Bank',
    location: 'Chennai, India',
    state: 'Tamil Nadu',
    quote: `Truth to tell, our initial conversation was one of total disbelief, if not mistrust. However, thanks to the team's patient and diligent follow-up, and their credibility, we received a windfall at a time when it was most needed.`,
    result: 'Windfall recovered at critical time',
    rating: 5,
    photo: '/assets/Nithya-and-Santhakumar-Sundaram.jpg.jpeg',
    initials: 'NS',
  },
  {
    name: 'Anushka Khanna',
    role: '',
    location: 'London, United Kingdom',
    state: 'NRI',
    quote: `I cannot thank you enough for transferring my parents' shares into my name after 17 years of trying. Your office was efficient, knowledgeable and extremely helpful during the whole process. It was a pleasure dealing with your staff.`,
    result: 'Legacy shares transferred after 17 years',
    rating: 5,
    photo: '/assets/Anushka-Khanna.png',
    initials: 'AK',
  },
  {
    name: 'Vinod Juneja',
    role: 'Former MD, Bank of Rajasthan',
    location: 'New Delhi, India',
    state: 'Delhi',
    quote: `I am thoroughly impressed with the exceptional services of 360 Degrees - their comprehensive expertise, seamless processes, professionalism and client confidentiality are truly commendable. I highly recommend their services.`,
    result: 'Unclaimed investments recovered',
    rating: 5,
    photo: '/assets/Vinod-Juneja.png',
    initials: 'VJ',
  },
  {
    name: 'Rajni Jain',
    role: '',
    location: 'New Delhi, India',
    state: 'Delhi',
    quote: `Grateful for 360 Degrees Management's service, uncovering my holdings' value to be 10 times more than expected! Their detailed research and personalized service provided peace of mind and exceeded all financial expectations.`,
    result: 'Portfolio value uncovered (10x expectation)',
    rating: 5,
    photo: '/assets/Rajni-Jain.jpg.jpeg',
    initials: 'RJ',
  },
  {
    name: 'K. R. Palta',
    role: 'Executive VP, Multinational Conglomerate',
    location: 'New Delhi, India',
    state: 'Delhi',
    quote: `I write this as a happy beneficiary of the services of Mr. Saran and his team. I commend them for their knowledge, professionalism and skills, plus a success-oriented approach in handling our difficult requirement.`,
    result: 'Complex recovery handled successfully',
    rating: 5,
    photo: '/assets/K-R-Palta.jpg.jpeg',
    initials: 'KP',
  },
  {
    name: 'Sanjay Mishra',
    role: 'Principal CCM, North-Eastern Railways',
    location: 'Gorakhpur, India',
    state: 'Uttar Pradesh',
    quote: `I have had and continue to have a warm and satisfying professional relationship with Mr. Saran and his company. I have utilized their services regarding my family investments, and I find them professionally very competent.`,
    result: 'Family investments managed smoothly',
    rating: 5,
    photo: '/assets/Sanjay-Mishra.jpg.jpeg',
    initials: 'SM',
  },
  {
    name: 'Kishor Chohan',
    role: '',
    location: 'Harrow, United Kingdom',
    state: 'NRI',
    quote: `Living in the UK, I faced challenges in managing shares in India. Claim 360 provided outstanding support in recovering my shares. The process was seamless, efficient, and handled with utmost professionalism. Highly recommended!`,
    result: 'Cross-border recovery completed',
    rating: 5,
    photo: '/assets/Kishor-Chohan.jpeg',
    initials: 'KC',
  },
  {
    name: 'Shri Vijai Kapur',
    role: '',
    location: 'Gurugram, India',
    state: 'Haryana',
    quote: `Mr. Saran and 360 Degrees Management Services have been a great help in recovering old and forgotten IEPF shares. His personal assistance, excellent manners, and charming approach to client relations stand out.`,
    result: 'Old IEPF shares recovered',
    rating: 5,
    photo: '/assets/Shri-Vijai-Kapur.jpg.jpeg',
    initials: 'VK',
  },
  {
    name: 'Arvind Chopra',
    role: 'Chartered Accountant',
    location: 'United Kingdom',
    state: 'NRI',
    quote: `I was amazed to discover such a service existed, meticulously executed for our family investments. Heartfelt thanks for the professional approach of 360 Degrees Management.`,
    result: 'Family investments regularized',
    rating: 5,
    photo: '/assets/Arvind-Chopra.jpg.jpeg',
    initials: 'AC',
  },
  {
    name: 'M. D. Asthana',
    role: 'IAS (Retd.), Fmr. Secretary, Govt. of India',
    location: 'Delhi NCR, India',
    state: 'Delhi',
    quote: `Mr. Saran informed me about forgotten shares for which I lacked supporting documents. These were purchased during my 1992-95 postings across Delhi, Gurgaon, and Chandigarh. Thanks to their hard work, it resulted in a windfall.`,
    result: 'Forgotten shares traced without paperwork',
    rating: 5,
    photo: '/assets/M-D-Asthana.png',
    initials: 'MA',
  },
  {
    name: 'Umesh Shrivastava',
    role: 'Executive Chairman, Holtec Consulting',
    location: 'Gurugram, India',
    state: 'Haryana',
    quote: `I was fortunate to engage with 360 Degrees on services for my old investments - they have an elaborate database giving access to information, an appropriate network to expedite matters, and provide impeccable, time-bound service.`,
    result: 'Old investments revived quickly',
    rating: 5,
    photo: '/assets/Umesh-Shrivastava.jpg.jpeg',
    initials: 'US',
  },
  {
    name: 'Mahendra Ottambhai Patel',
    role: '',
    location: 'High Wycombe, United Kingdom',
    state: 'NRI',
    quote: `My wife and I would like to thank the Claim 360 team! They have been very patient and professional in guiding us through the process of regularizing our Reliance shares (bought in the 1980s). Our age and limited technology knowhow did not deter them.`,
    result: 'Reliance shares regularized (1980s holding)',
    rating: 5,
    photo: '/assets/Mahendra-Ottambhai-Patel.jpeg',
    initials: 'MP',
  },
]

function formatLocation(loc) {
  if (!loc) return ''
  const parts = loc.split(',').map(p => p.trim()).filter(Boolean)
  if (parts.length <= 2) return parts.join(', ')
  return `${parts[0]}, ${parts[parts.length - 1]}`
}

const PAGE_SIZE = 3

export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [readMore, setReadMore] = useState(null)
  const [userState, setUserState] = useState(null)
  const [showLocationPreview, setShowLocationPreview] = useState(true)
  const [filtered, setFiltered] = useState(ALL_TESTIMONIALS)
  const ref = useRef(null)
  const [custom, setCustom] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('customTestimonials') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'customTestimonials') {
        try { setCustom(JSON.parse(e.newValue || '[]')) }
        catch { setCustom([]) }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    setFiltered([...custom, ...ALL_TESTIMONIALS])
  }, [custom])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  useEffect(() => {
    setCurrentPage(0)
  }, [filtered.length])

  useEffect(() => {
    if (totalPages <= 1) return undefined
    const timer = window.setInterval(() => {
      setDirection(1)
      setCurrentPage(p => (p + 1) % totalPages)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [totalPages])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const state = data.region
        setUserState(state)
        const merged = [...custom, ...ALL_TESTIMONIALS]
        const local = merged.filter(t => t.state.toLowerCase() === state?.toLowerCase())
        if (local.length >= 1) {
          const rest = merged.filter(t => t.state.toLowerCase() !== state?.toLowerCase())
          setFiltered([...local, ...rest])
        } else {
          setFiltered(merged)
        }
      })
      .catch(() => setFiltered([...custom, ...ALL_TESTIMONIALS]))
  }, [custom])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [currentPage, filtered.length])

  const prev = () => { setDirection(-1); setCurrentPage(p => (p - 1 + totalPages) % totalPages) }
  const next = () => { setDirection(1); setCurrentPage(p => (p + 1) % totalPages) }

  const visible = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)

  return (
    <section id="testimonials" ref={ref} className="section-pad bg-white dark:bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gold/[0.015] pointer-events-none" />

      <div className="c relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 lg:mb-10">
          <div>
            <div className="eyebrow reveal mb-4">Client Stories</div>
            <h2 className="reveal font-display text-navy dark:text-white tracking-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Trusted by Clients{' '}
              <span className="italic text-gold">Worldwide</span>
            </h2>
            {userState && showLocationPreview && (
              <div className="reveal mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] px-3 py-2 text-sm text-slate-400 dark:text-white/40">
                <MapPin size={13} className="text-gold" />
                <span>Showing results near {userState}</span>
                <button
                  type="button"
                  onClick={() => setShowLocationPreview(false)}
                  className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-navy dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
          <div className="reveal flex flex-wrap items-center gap-2">
            <Link
              to="/testimonials"
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 text-navy dark:text-white text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-200"
            >
              View All
            </Link>
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

        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={{
                enter: (dir) => ({ x: dir > 0 ? '50%' : '-50%', opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir) => ({ x: dir > 0 ? '-50%' : '50%', opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {visible.map((t, i) => (
                <div
                  key={t.name}
                  className={`bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-black/20 transition-all duration-300 ${i === 1 ? 'hidden md:flex' : ''} ${i === 2 ? 'hidden lg:flex' : ''}`}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating || 5 }).map((_, si) => (
                      <Star key={si} size={12} className="text-gold fill-gold" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-display text-slate-600 dark:text-white/70 text-[13px] leading-relaxed italic flex-1 line-clamp-5">
                    "{t.quote}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-white/[0.07]">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-white/10 flex-shrink-0 border-2 border-white dark:border-white/10 ring-1 ring-gold/20 shadow-sm">
                      {t.photo ? (
                        <img
                          src={t.photo}
                          alt={t.name}
                          className="w-full h-full object-cover"
                          onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
                        />
                      ) : null}
                      <div className={`${t.photo ? 'hidden' : 'flex'} w-full h-full items-center justify-center font-bold text-xs text-white bg-navy`}>
                        {t.initials}
                      </div>
                    </div>

                    {/* Name / role / location */}
                    <div className="flex-1 min-w-0">
                      <div className="text-navy dark:text-white font-semibold text-sm leading-tight truncate">{t.name}</div>
                      {t.role && (
                        <div className="text-slate-500 dark:text-white/50 text-[11px] leading-tight truncate mt-0.5">{t.role}</div>
                      )}
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={9} className="text-gold flex-shrink-0" />
                        <span className="text-[11px] text-slate-400 dark:text-white/35 truncate">{formatLocation(t.location)}</span>
                      </div>
                    </div>

                    {/* Eye icon only */}
                    <button
                      onClick={() => setReadMore(t)}
                      className="flex-shrink-0 w-8 h-8 rounded-lg bg-white dark:bg-white/[0.06] border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/35 hover:bg-gold/10 hover:text-gold dark:hover:text-gold hover:border-gold/20 transition-colors"
                      title="Read full story"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentPage ? 1 : -1); setCurrentPage(i) }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'bg-gold w-8' : 'bg-slate-200 dark:bg-white/20 w-2'}`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-6 text-slate-400 dark:text-white/25 text-xs">
          We're happy to provide client contact details for verification upon request.
        </div>
      </div>

      {/* Read More Modal */}
      {readMore && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          onClick={() => setReadMore(null)}
        >
          <div
            className="bg-white dark:bg-navy-card rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-1 bg-gradient-to-r from-gold to-gold-light" />
            <div className="p-6 sm:p-8">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setReadMore(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-white/10 ring-2 ring-gold/30 shadow-xl mb-4 bg-slate-100 dark:bg-navy-mid">
                  {readMore.photo ? (
                    <img src={readMore.photo} alt={readMore.name} className="w-full h-full object-cover" onError={e => e.currentTarget.remove()} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-2xl text-gold bg-navy">
                      {readMore.initials}
                    </div>
                  )}
                </div>
                <h3 className="font-display text-navy dark:text-white text-xl leading-tight">{readMore.name}</h3>
                {readMore.role && <p className="text-slate-500 dark:text-white/55 text-sm mt-1">{readMore.role}</p>}
                {readMore.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/35 uppercase tracking-wider mt-2">
                    <MapPin size={10} className="text-gold" />
                    {readMore.location}
                  </div>
                )}
                <div className="flex items-center gap-0.5 mt-3">
                  {Array.from({ length: readMore.rating || 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.04] rounded-2xl p-5 mb-5">
                <div className="text-gold text-3xl font-display leading-none mb-2">"</div>
                <p className="font-display text-slate-700 dark:text-white/75 text-[15px] leading-relaxed italic">
                  {readMore.quote}
                </p>
              </div>
              {readMore.result && (
                <div className="flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-xl px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                  <span className="text-sm font-semibold text-navy dark:text-gold">{readMore.result}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
