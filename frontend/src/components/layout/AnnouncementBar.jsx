const ANNOUNCEMENTS = [
  { text: 'Free IEPF Consultation —', highlight: 'Book Now →', href: '/#contact' },
  { text: '₹105Cr+ Successfully Recovered for Clients', highlight: '7+ Years Experience' },
  { text: 'NRI Services Available — No India Visit Required', highlight: 'Learn More →', href: '/#services' },
  { text: '99%+ Success Rate in Investment Recovery', highlight: '320+ Happy Clients' },
  { text: 'Mumbai • New Delhi • London', highlight: 'Pan-India & Global' },
]

export default function AnnouncementBar() {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS]

  return (
    <div className="bg-navy dark:bg-navy-deep text-white overflow-hidden relative z-[60]" style={{ height: '38px' }}>
      <div className="h-full flex items-center overflow-hidden">
        <div className="ticker-track">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 opacity-70" />
              <span className="text-white/70 font-light">{item.text}</span>
              {item.highlight && item.href ? (
                <a
                  href={item.href}
                  className="text-gold font-semibold hover:text-gold-light transition-colors cursor-pointer"
                >
                  {item.highlight}
                </a>
              ) : item.highlight ? (
                <span className="text-gold font-semibold">{item.highlight}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-navy dark:from-navy-deep to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-navy dark:from-navy-deep to-transparent pointer-events-none" />
    </div>
  )
}
