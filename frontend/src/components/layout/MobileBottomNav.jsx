import { useLocation, Link } from 'react-router-dom'
import { Home, Search, Briefcase } from 'lucide-react'

const TABS = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Briefcase, label: 'Services', href: '/#services' },
]

export default function MobileBottomNav() {
  const location = useLocation()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-navy-deep/95 backdrop-blur-xl border-t border-slate-100 dark:border-white/10 pb-safe">
      <div className="flex items-stretch">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.href && location.pathname === tab.href
          return (
            <div key={tab.label} className="flex-1">
              <Link to={tab.href} className="mobile-tab">
                <Icon
                  size={20}
                  className={isActive ? 'text-gold' : 'text-slate-500 dark:text-slate-400'}
                />
                <span className={`text-[10px] font-medium ${isActive ? 'text-gold' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.label}
                </span>
              </Link>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
