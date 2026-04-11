import { useEffect, useRef } from 'react'
import { Linkedin } from 'lucide-react'

const TEAM = [
  {
    name: 'Balbir Saran',
    role: 'FOUNDING MEMBER AND SENIOR ADVISOR',
    desc: 'Balbir has donned many hats through his 5 decades of finance and management experience – from working with IBM across the continents, to running his own consulting establishment in India, to now driving the agenda of 360 Degrees Management Services.',
    photo: '/assets/Balbir-Saran.jpeg',
    initials: 'BS',
  },
  {
    name: 'Sheekher Saran',
    role: 'FOUNDING MEMBER AND MANAGING DIRECTOR',
    desc: 'Sheekher brings over 17 years of expertise in strategy and operations as a former Associate Partner at Deloitte with experience across multiple continents. Sheekher holds an MBA from London Business School and a Bachelors in Mathematics from St. Stephens College.',
    photo: '/assets/Sheekher-Saran.jpeg',
    initials: 'SS',
  },
  {
    name: 'Ashok Dhawan',
    role: 'HEAD OF UNITED KINGDOM OPERATIONS',
    desc: 'A qualified Certified Chartered Accountant FCCA with 35 years of experience as the Managing Director and CEO of a number of international companies and brands including Muddyfox Bicycles, Willett Hotels, and Asiana International magazines. A UK National residing in Central London.',
    photo: '/assets/Ashok-Dhawan-02.jpg',
    initials: 'AD',
  },
  {
    name: 'Nitish Tripathi',
    role: 'HEAD OF BUSINESS DEVELOPMENT',
    desc: 'Nitish brings over 8 years of experience in finance (at ICICI Bank, Nuvama Wealth, etc.), specializing in customer relationships and investment advisory. He is a client-centric professional with a knack for achieving targets. Nitish holds an MBA from IIM Kashipur.',
    photo: '/assets/NITISH-TRIPATHI.jpg.jpeg',
    initials: 'NT',
  },
]

export default function ManagementSection() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="team"
      ref={ref}
      className="section-pad bg-slate-50 dark:bg-navy-deep relative overflow-hidden"
    >
      {/* BG glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="c relative z-10">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-14">
          <div className="eyebrow reveal mb-4 justify-center">Our Leadership</div>
          <h2
            className="reveal font-display text-navy dark:text-white tracking-tight"
            style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}
          >
            Meet the <span className="italic text-gold">Team</span>
          </h2>
          <p className="reveal text-slate-500 dark:text-white/45 text-base max-w-lg mx-auto mt-4 leading-relaxed">
            Decades of combined expertise in finance, law, and investment recovery — working for you.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="reveal bg-white dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.07] rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] lg:aspect-[4/5] w-full bg-slate-100 dark:bg-navy-mid overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback initials */}
                <div className="hidden absolute inset-0 items-center justify-center bg-navy">
                  <span className="font-display text-4xl text-gold">{member.initials}</span>
                </div>
                {/* Gold bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gold/20 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-3 sm:p-5">
                <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-gold mb-1 leading-tight">
                  {member.role}
                </div>
                <h3 className="font-display text-navy dark:text-white text-sm sm:text-lg mb-1.5">{member.name}</h3>
                <p className="hidden sm:block text-slate-500 dark:text-white/40 text-xs leading-relaxed">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
