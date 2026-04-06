import { useLocation, Link } from 'react-router-dom'
import { Home, Search, Briefcase, Menu } from 'lucide-react'
import { useState } from 'react'
import MegaMenuModal from './MegaMenuModal'

const TABS = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Briefcase, label: 'Services', href: '/#services' },
  { icon: Menu, label: 'Menu', action: 'menu' },
]

export default function MobileBottomNav() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-navy-deep/95 backdrop-blur-xl border-t border-slate-100 dark:border-white/10 pb-safe">
        <div className="flex items-stretch">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.href && location.pathname === tab.href
            return (
              <div key={tab.label} className="flex-1">
                {tab.action === 'menu' ? (
                  <button
                    onClick={() => setMenuOpen(true)}
                    className="mobile-tab text-slate-500 dark:text-slate-400"
                  >
                    <Icon size={20} className="text-slate-500 dark:text-slate-400" />
                    <span className="text-[10px] font-medium">{tab.label}</span>
                  </button>
                ) : (
                  <Link to={tab.href} className="mobile-tab">
                    <Icon
                      size={20}
                      className={isActive ? 'text-gold' : 'text-slate-500 dark:text-slate-400'}
                    />
                    <span className={`text-[10px] font-medium ${isActive ? 'text-gold' : 'text-slate-500 dark:text-slate-400'}`}>
                      {tab.label}
                    </span>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      <MegaMenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} navLinks={[
        { label: 'Services', href: '/#services' },
        { label: 'About', href: '/#about' },
        { label: 'Testimonials', href: '/#testimonials' },
        { label: 'Blog', href: '/blog' },
        { label: 'FAQs', href: '/#faq' },
        { label: 'Contact', href: '/#contact' },
      ]} />
    </>
  )
}
