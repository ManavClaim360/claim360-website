
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

const ALL_TESTIMONIALS = [
  {
    name: 'KJ Alphons IAS (Rtd.)',
    role: 'Former Member of Parliament and Minister of Tourism',
    location: 'New Delhi, India',
    state: 'Delhi',
    quote:
      `I was so pleasantly surprised by the job done by Mr. Saran and his company, 360 Degrees Management Services, who recovered very valuable stocks which we did not know we owned. Their service was outstanding and highly dependable.`,
    result: 'Valuable stocks traced and recovered',
    rating: 5,
    photo: '/assets/alphons.png',
    initials: 'KA',
  },
  {
    name: 'Rajiv Kaul',
    role: 'Former President at Leela Hotels and Resorts',
    location: 'Mumbai, India',
    state: 'Maharashtra',
    quote:
      `My grateful thanks to the 360 Degrees team for helping me reclaim lost shares and unclaimed dividends of substantial value that I was completely unaware of. Their services are very professional. Also, meeting Mr. Saran was a most rewarding stroke of serendipity.`,
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
    quote:
      `It has been a pleasure working with Claim 360! They have been very professional and efficient even though the regularization of my late mother's investment had been rejected previously while working with another service provider, and I was thousands of miles away in the USA.`,
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
    quote:
      `Professional, accurate, thorough, responsive, and timely - words to describe my experience with Claim 360 and Mr. Saran. The team spared me the hassle of dealing with officialdom and converted a contingent asset into a real one when it hit my demat account.`,
    result: 'IEPF shares converted to demat',
    rating: 5,
    photo: '/assets/jamshed-wadia.png',
    initials: 'JW',
  },
  {
    name: 'Nithya and Santhakumar Sundaram',
    role: 'World Bank',
    location: 'Chennai, India',
    state: 'Tamil Nadu',
    quote:
      `Truth to tell, our initial conversation was one of total disbelief, if not mistrust. However, thanks to the team's patient and diligent follow-up, and their credibility, we received a windfall at a time when it was most needed.`,
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
    quote:
      `I cannot thank you enough for transferring my parents' shares into my name after 17 years of trying. Your office was efficient, knowledgeable and extremely helpful during the whole process. It was a pleasure dealing with your staff.`,
    result: 'Legacy shares transferred after 17 years',
    rating: 5,
    photo: '/assets/Anushka-Khanna.png',
    initials: 'AK',
  },
  {
    name: 'Vinod Juneja',
    role: 'Former MD at Bank of Rajasthan',
    location: 'New Delhi, India',
    state: 'Delhi',
    quote:
      `I am thoroughly impressed with the exceptional services of 360 Degrees - their comprehensive expertise, seamless processes, professionalism and client confidentiality are truly commendable. I highly recommend their services and it is a pleasure to work with such reliable team.`,
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
    quote:
      `Grateful for 360 Degrees Management's service, uncovering my holdings' value to be 10 times more than expected! Their detailed research and personalized service provided peace of mind and exceeded all financial expectations.`,
    result: 'Portfolio value uncovered (10x expectation)',
    rating: 5,
    photo: '/assets/Rajni-Jain.jpg.jpeg',
    initials: 'RJ',
  },
  {
    name: 'K. R. Palta',
    role: 'Executive Vice President of a leading multinational conglomerate',
    location: 'New Delhi, India',
    state: 'Delhi',
    quote:
      `I write this as a happy beneficiary of the services of Mr. Saran and his team. I commend them for their knowledge, professionalism and skills, plus a success-oriented approach in handling our difficult requirement.`,
    result: 'Complex recovery handled successfully',
    rating: 5,
    photo: '/assets/K-R-Palta.jpg.jpeg',
    initials: 'KP',
  },
  {
    name: 'Sanjay Mishra',
    role: 'Principal Chief Commercial Manager at North-Eastern Railways',
    location: 'Gorakhpur, India',
    state: 'Uttar Pradesh',
    quote:
      `I have had and continue to have a warm and satisfying professional relationship with Mr. Saran and his company. I have utilized their services regarding my family investments, and I find them professionally very competent and personally easy-to-get-along-with.`,
    result: 'Family investments managed smoothly',
    rating: 5,
    photo: '/assets/Sanjay-Mishra.jpg.jpeg',
    initials: 'SM',
  },
  {
    name: 'Kishor Chohan',
    role: '',
    location: 'Harrow, Middlesex, United Kingdom',
    state: 'NRI',
    quote:
      `Living in the UK, I faced challenges in managing shares in India. Claim 360 provided outstanding support in recovering my shares. The process was seamless, efficient, and handled with utmost professionalism. Highly recommended!`,
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
    quote:
      `Mr. Saran and 360 Degrees Management Services have been a great help in recovering old and forgotten IEPF shares. His personal assistance, excellent manners, and charming approach to client relations stand out. I highly recommend him and his team for such work.`,
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
    quote:
      `I was amazed to discover such a service existed, meticulously executed for our family investments. Heartfelt thanks for the professional approach of 360 Degrees Management.`,
    result: 'Family investments regularized',
    rating: 5,
    photo: '/assets/Arvind-Chopra.jpg.jpeg',
    initials: 'AC',
  },
  {
    name: 'M. D. Asthana',
    role: 'I.A.S. (Retd.), Formerly Secretary Government of India',
    location: 'Delhi NCR, India',
    state: 'Delhi',
    quote:
      `Mr. Saran informed me about forgotten shares for which I lacked supporting documents. These were purchased during my 1992-95 postings across Delhi, Gurgaon, and Chandigarh. Thanks to their hard work, it resulted in a windfall. Thank you.`,
    result: 'Forgotten shares traced without paperwork',
    rating: 5,
    photo: '/assets/M-D-Asthana.png',
    initials: 'MA',
  },
  {
    name: 'Umesh Shrivastava',
    role: 'Executive Chairman at Holtec Consulting',
    location: 'Gurugram, India',
    state: 'Haryana',
    quote:
      `I was fortunate to engage with 360 Degrees on services for my old investments - they have an elaborate database giving access to information, an appropriate network to expedite matters, and provide impeccable, time-bound service.`,
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
    quote:
      `My wife and I would like to thank the Claim 360 team! They have been very patient and professional in guiding us through the process of regularizing our Reliance shares (bought in the 1980s). Our age and limited technology knowhow did not deter them from serving us.`,
    result: 'Reliance shares regularized (1980s holding)',
    rating: 5,
    photo: '/assets/Mahendra-Ottambhai-Patel.jpeg',
    initials: 'MP',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [userState, setUserState] = useState(null)
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
        try {
          setCustom(JSON.parse(e.newValue || '[]'))
        } catch {
          setCustom([])
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    setFiltered([...custom, ...ALL_TESTIMONIALS])
  }, [custom])

  useEffect(() => {
    setCurrent(0)
  }, [filtered.length])

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

  const prev = () => setCurrent(c => (c - 1 + filtered.length) % filtered.length)
  const next = () => setCurrent(c => (c + 1) % filtered.length)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const visible = [
    filtered[current % filtered.length],
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
              className="reveal bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-[28px] p-7 flex flex-col transition-all duration-500"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="font-display text-slate-700 dark:text-white/70 text-[15px] leading-relaxed italic flex-1 mb-8">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 pt-5 border-t border-slate-100 dark:border-white/[0.07]">
                <div className="w-20 h-20 rounded-[22px] overflow-hidden flex-shrink-0 border border-gold/30 relative bg-navy dark:bg-gold/20">
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
                <div className="min-w-0">
                  <div className="text-navy dark:text-white font-semibold text-base leading-tight">{t.name}</div>
                  {t.role ? (
                    <div className="text-slate-500 dark:text-white/45 text-sm mt-1 leading-snug">{t.role}</div>
                  ) : null}
                  {(t.city || t.state || t.location) ? (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/25 mt-2">
                    <MapPin size={8} />
                    {t.city && t.state ? `${t.city}, ${t.state}` : (t.city || t.state || t.location)}
                  </div>
                  ) : null}
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
