import { useEffect, useRef } from 'react'
import { ArrowRight, FileText, Globe, ArrowRightLeft, Scale, Building2, Search } from 'lucide-react'

const SERVICES = [
  {
    Icon: FileText,
    title: 'IEPF Claims',
    desc: 'Expert assistance in filing IEPF-5 forms and recovering shares/dividends transferred to the Investor Education and Protection Fund.',
    tags: ['Shares', 'Dividends', 'Debentures'],
    href: '#contact',
  },
  {
    Icon: Globe,
    title: 'NRI Services',
    desc: 'Comprehensive support for OCI/NRI clients to manage Indian investments, share transfers, and legal matters — without visiting India.',
    tags: ['OCI Services', 'Remote Assistance', 'PAN Support'],
    href: '#contact',
  },
  {
    Icon: ArrowRightLeft,
    title: 'Share Transfers',
    desc: 'Seamless handling of physical share certificate transfers, transmission on death, and demat conversion with complete accuracy.',
    tags: ['Physical Shares', 'Demat', 'Transmission'],
    href: '#contact',
  },
  {
    Icon: Scale,
    title: 'Legal Documentation',
    desc: 'Support with wills, succession certificates, legal heir certificates, and other documentation required to claim investments.',
    tags: ['Succession', 'Wills', 'Heir Certs'],
    href: '#contact',
  },
  {
    Icon: Building2,
    title: 'Corporate Actions',
    desc: 'Resolution of corporate action issues including bonus shares, rights entitlements, mergers, and name-change complications.',
    tags: ['Bonus Shares', 'Rights', 'Mergers'],
    href: '#contact',
  },
  {
    Icon: Search,
    title: 'Investment Tracing',
    desc: 'Proprietary data access to locate and verify unclaimed/unknown investments across Indian registrar and MCA databases.',
    tags: ['Unclaimed', 'Portfolio', 'Verification'],
    href: '/search',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={ref} className="section-pad bg-white dark:bg-navy">
      <div className="c">
        {/* Header */}
        <div className="max-w-xl mb-8 lg:mb-12">
          <div className="eyebrow reveal mb-4">Our Services</div>
          <h2 className="reveal font-display text-navy dark:text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            Comprehensive Investment Recovery Solutions
          </h2>
          <p className="reveal text-slate-500 dark:text-white/50 text-lg leading-relaxed">
            From IEPF claims to NRI portfolio management — we handle every aspect of your investment recovery journey with precision.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="reveal group relative bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-2xl p-4 sm:p-7 hover:bg-white dark:hover:bg-white/[0.06] hover:border-slate-200 dark:hover:border-white/15 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-navy dark:bg-gold/10 border border-navy/10 dark:border-gold/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <s.Icon size={18} className="text-gold" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-display text-navy dark:text-white text-xl mb-3">{s.title}</h3>

              {/* Desc */}
              <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed mb-5">{s.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {s.tags.map(t => (
                  <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-navy/[0.06] dark:bg-white/[0.06] text-navy dark:text-white/60">
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a href={s.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy dark:text-gold hover:gap-3 transition-all duration-200">
                Learn More <ArrowRight size={14} />
              </a>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-navy dark:bg-gold hover:bg-navy-light dark:hover:bg-gold-light text-white dark:text-navy-deep px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Free Consultation
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
