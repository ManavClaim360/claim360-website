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

function PartnerItem({ p }) {
  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-default">
      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-gold" />
      </div>
      <div>
        <div className="text-sm font-bold text-navy dark:text-white">{p.name}</div>
        <div className="text-[10px] text-slate-400 dark:text-white/30">{p.desc}</div>
      </div>
    </div>
  )
}

function BrandSeparator() {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap select-none flex-shrink-0">
      <img
        src="/assets/Logo.png"
        alt="Claim360"
        className="h-7 w-auto object-contain opacity-80"
        draggable={false}
      />
      <span className="text-sm font-bold text-navy dark:text-white opacity-70 tracking-wide">
        Claim360
      </span>
    </div>
  )
}

// Build one "set": partners interleaved with brand separator at end
function buildSet() {
  const set = []
  PARTNERS.forEach((p, i) => {
    set.push({ type: 'partner', data: p, key: `p-${i}` })
  })
  set.push({ type: 'brand', key: 'brand' })
  return set
}

const SET = buildSet()
// Triple the set so translateX(-33.33%) loops seamlessly
const ITEMS = [...SET.map((x) => ({ ...x, key: `a-${x.key}` })),
               ...SET.map((x) => ({ ...x, key: `b-${x.key}` })),
               ...SET.map((x) => ({ ...x, key: `c-${x.key}` }))]

export default function TrustBar() {
  return (
    <div className="dot-field py-6 sm:py-7 border-y border-slate-100 dark:border-white/[0.06] bg-white dark:bg-navy overflow-hidden">
      <div className="mb-3 text-center text-[11px] font-semibold text-slate-400 dark:text-white/25 uppercase tracking-[0.24em]">
        We Work With &amp; File Through
      </div>
      <div className="relative overflow-hidden">
        <div className="trust-scroll-track">
          {ITEMS.map((item) =>
            item.type === 'brand'
              ? <BrandSeparator key={item.key} />
              : <PartnerItem key={item.key} p={item.data} />
          )}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-navy to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-navy to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
