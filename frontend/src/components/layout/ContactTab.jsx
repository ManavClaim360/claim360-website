import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'

export default function ContactTab() {
  return (
    <Link
      to="/contact"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group"
      title="Open contact page"
    >
      <div className="bg-gold hover:bg-gold-light text-navy-deep font-semibold text-[11px] tracking-wider flex flex-col items-center gap-2 py-4 px-2.5 rounded-l-xl shadow-2xl transition-all duration-300 hover:px-4 hover:shadow-gold/30">
        <Phone size={14} className="flex-shrink-0" />
        <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          Contact Us
        </span>
      </div>
    </Link>
  )
}
