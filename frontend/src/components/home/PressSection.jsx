import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'

const PRESS_ITEMS = [
  {
    type: 'Press Release',
    date: 'March 2025',
    title: 'Claim360 Surpasses ₹100 Crore Mark in Investment Recovery for Indian Investors',
    excerpt: '360 Degrees Management Services Private Limited announces a major milestone — over ₹100 Crore in total investments recovered for clients across India and 6 countries.',
    source: 'Claim360 PR',
  },
  {
    type: 'Media',
    date: 'January 2025',
    title: 'How NRIs Are Recovering Forgotten Indian Investments Through Specialized Firms',
    excerpt: 'An increasing number of NRIs are turning to specialized advisory firms to recover old shares, dividends, and other investments previously thought lost.',
    source: 'Financial Express',
  },
  {
    type: 'Press Release',
    date: 'November 2024',
    title: 'Claim360 Expands Services to UK-Based NRIs Through New London Office',
    excerpt: 'The company formally launches UK operations with a dedicated team in Central London to serve the growing Indian diaspora community.',
    source: 'Claim360 PR',
  },
]

const MEDIA_LOGOS = [
  'Economic Times', 'Mint', 'Financial Express', 'Business Standard', 'NDTV Profit', 'MoneyControl'
]

export default function PressSection() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="press" ref={ref} className="section-pad bg-white dark:bg-navy-deep">
      <div className="c">
        <div className="text-center mb-14">
          <div className="eyebrow reveal mb-4 justify-center">
            <span className="w-5 h-px bg-gold inline-block" />
            In The News
          </div>
          <h2 className="reveal font-display text-navy dark:text-white tracking-tight"
            style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            Press &amp; Media
          </h2>
        </div>

        {/* Press cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {PRESS_ITEMS.map((p, i) => (
            <div
              key={i}
              className="reveal bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4 hover:border-slate-200 dark:hover:border-white/15 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                  p.type === 'Press Release'
                    ? 'bg-navy/[0.07] text-navy dark:bg-white/[0.07] dark:text-white/70'
                    : 'bg-gold/10 text-gold-dark border border-gold/20'
                }`}>
                  {p.type}
                </span>
                <span className="text-xs text-slate-400 dark:text-white/30 uppercase tracking-wider">{p.date}</span>
              </div>

              <h3 className="font-display text-navy dark:text-white text-base leading-snug group-hover:text-gold dark:group-hover:text-gold transition-colors">{p.title}</h3>

              <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed flex-1">{p.excerpt}</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                <span className="text-xs font-semibold text-navy dark:text-white/60">{p.source}</span>
                <ExternalLink size={13} className="text-slate-300 dark:text-white/25 group-hover:text-gold transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Media logos */}
        <div className="reveal border-t border-slate-100 dark:border-white/[0.07] pt-10">
          <div className="text-center text-xs font-semibold text-slate-400 dark:text-white/25 uppercase tracking-widest mb-7">
            As Seen In & Covered By
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {MEDIA_LOGOS.map(logo => (
              <div key={logo} className="text-slate-300 dark:text-white/15 font-bold text-sm tracking-tight hover:text-navy dark:hover:text-white/40 transition-colors cursor-pointer">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
