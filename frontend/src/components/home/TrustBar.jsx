const PARTNERS = [
  { name: 'NSDL', desc: 'Depository' },
  { name: 'CDSL', desc: 'Depository' },
  { name: 'SEBI', desc: 'Regulator' },
  { name: 'MCA', desc: 'Govt. of India' },
  { name: 'IEPF Authority', desc: 'Govt. Body' },
  { name: 'NSE', desc: 'Exchange' },
  { name: 'BSE', desc: 'Exchange' },
  { name: 'RBI', desc: 'Central Bank' },
]

export default function TrustBar() {
  const items = [...PARTNERS, ...PARTNERS]

  return (
    <div className="py-10 border-y border-slate-100 dark:border-white/[0.06] bg-white dark:bg-navy overflow-hidden">
      <div className="mb-5 text-center text-xs font-semibold text-slate-400 dark:text-white/25 uppercase tracking-widest">
        We Work With & File Through
      </div>
      <div className="relative overflow-hidden">
        <div className="logo-scroll-track">
          {items.map((p, i) => (
            <div key={i} className="flex items-center gap-2.5 whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-default">
              <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>
              <div>
                <div className="text-sm font-bold text-navy dark:text-white">{p.name}</div>
                <div className="text-[10px] text-slate-400 dark:text-white/30">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-navy to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-navy to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
