const FOOTER_LINKS = {
  Services: [
    { label: 'IEPF Claims', href: '/#services' },
    { label: 'NRI Services', href: '/404' },
    { label: 'Share Transfers', href: '/404' },
    { label: 'Legal Documentation', href: '/404' },
    { label: 'Corporate Actions', href: '/404' },
  ],
  Company: [
    { label: 'About Us', href: '/404' },
    { label: 'Our Team', href: '/404' },
    { label: 'Our Story', href: '/404' },
    { label: 'Press & Media', href: '/#press' },
    { label: 'Blog', href: '/blog' },
  ],
  Resources: [
    { label: 'FAQs', href: '/#faq' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Investor Search', href: '/search' },
    { label: 'Newsletter', href: '/404' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Disclaimer', href: '/privacy#disclaimer' },
    { label: 'Refund Policy', href: '/privacy#refund' },
  ],
}

const OFFICES = [
  { city: 'Mumbai', address: '311, Sun Industrial Estate, Lower Parel, Mumbai – 400013', flag: '🏙️' },
  { city: 'New Delhi', address: 'D-4/4035, Vasant Kunj, New Delhi – 110070', flag: '🏛️' },
  { city: 'London', address: '2 Wymondham, St. Johns Wood Park, London NW8 6RD', flag: '🇬🇧' },
]

import { Twitter, Linkedin, Facebook, Youtube, Instagram } from 'lucide-react'

const SOCIAL = [
  { Icon: Twitter, label: 'Twitter', href: 'https://x.com/claim360' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/claim360' },
  { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/claim360' },
  { Icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@claim360' },
  { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/claim360' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-deep border-t-4 border-gold">
      <div className="c pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <img src="/assets/Logo.png" alt="Claim360" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              India's most trusted investment recovery specialists. We navigate the complexities so you get back what's rightfully yours.
            </p>

            <div className="flex gap-2 mb-6">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/50 hover:bg-gold hover:text-navy-deep hover:border-gold transition-all duration-200"
                >
                  <s.Icon size={14} />
                </a>
              ))}
            </div>

            <div className="text-white/20 text-[10px] leading-relaxed">
              360 Degrees Management Services Pvt. Ltd.<br />
              CIN: U74999DL2016PTC303092
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <div className="text-[10px] font-semibold tracking-widest uppercase text-white/60 mb-4">{title}</div>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/40 hover:text-gold-light transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Offices */}
        <div className="border-t border-white/[0.07] pt-10 mb-10">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-white/40 mb-5">Our Offices</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {OFFICES.map(o => (
              <div key={o.city} className="flex gap-3">
                <span className="text-lg mt-0.5">{o.flag}</span>
                <div>
                  <div className="text-white/80 text-sm font-semibold mb-1">{o.city}</div>
                  <div className="text-white/35 text-xs leading-relaxed">{o.address}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/25 text-xs">
            © {new Date().getFullYear()} 360 Degrees Management Services Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-white/25 text-xs">
            <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
            <span>·</span>
            <a href="/terms" className="hover:text-white/60 transition-colors">Terms</a>
            <span>·</span>
            <span>Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
