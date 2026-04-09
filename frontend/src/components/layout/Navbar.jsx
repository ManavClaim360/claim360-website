import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Sun, Moon, ChevronDown, Menu, Search } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import MegaMenuModal from './MegaMenuModal'
import MegaDropdown from './MegaDropdown'

const MEGA_CATEGORIES = [
  {
    id: 'popular',
    label: 'Popular',
    title: 'Top Recovery Services',
    description: 'Our most sought-after services for reclaiming lost investments and physical shares with speed and accuracy.',
    items: [
      { label: 'Equity Recovery', href: '/#equity' },
      { label: 'Mutual Fund Claims', href: '/#mutual-funds' },
      { label: 'Corporate FDs', href: '/#fds' }
    ],
    features: ['98% Success Rate', 'Dedicated Expert Support', 'End-to-end Process']
  },
  {
    id: 'fixed-income',
    label: 'Fixed Income',
    title: 'Unclaimed Bonds & FDs',
    description: 'Helping investors recover forgotten bonds, debentures, and company fixed deposits from public and private entities.',
    items: [
      { label: 'RBI Bonds', href: '/#rbi-bonds' },
      { label: 'Company Debentures', href: '/#debentures' },
      { label: 'NCD Recovery', href: '/#ncd' }
    ],
    features: ['Direct Coordination with Issuers', 'Zero Upfront Fees', 'Legal Audit']
  },
  {
    id: 'equity',
    label: 'Equity Markets',
    title: 'Share Transmission & Claims',
    description: 'Expert assistance in dematerialization, transfer, and transmission of shares across all listed Indian companies.',
    items: [
      { label: 'Physical to Demat', href: '/#demat' },
      { label: 'IEPF Transmission', href: '/#iepf' },
      { label: 'Name Rectification', href: '/#rectify' }
    ],
    features: ['KYC Optimization', 'Pan-India Service', 'Digital Tracking']
  }
]

const NAV_LINKS = [
  { label: 'About Us', href: '/#about' },
  { label: 'Services', mega: true },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [megaOpen, setMegaOpen] = useState(false)
  const [activeMegaTab, setActiveMegaTab] = useState('popular')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMegaOpen(false)
    setActiveDropdown(null)
  }, [location])

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-3xl shadow-[0_18px_60px_rgba(3,8,18,0.45)] border-b border-white/12'
            : 'border-b border-white/8'
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(6, 14, 28, 0.82)' : '#060E1C',
          boxShadow: scrolled ? '0 18px 60px rgba(3, 8, 18, 0.45), inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <div className="c">
          <div className="flex items-center justify-between h-[72px] gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 group">
              <img
                src="/assets/Logo_1.png"
                alt="Claim360"
                className="h-10 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {NAV_LINKS.map((item) =>
                item.mega ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="nav-item flex items-center gap-1 h-[72px]">
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <MegaDropdown
                        categories={MEGA_CATEGORIES}
                        activeTab={activeMegaTab}
                        onTabChange={setActiveMegaTab}
                      />
                    )}
                  </div>
                ) : (
                  <Link key={item.label} to={item.href || '/'} className="nav-item">
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => user ? navigate('/search') : navigate('/login')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-navy dark:hover:text-white transition-all duration-200"
                title="Investor Search"
              >
                <Search size={17} />
              </button>

              <button
                onClick={toggle}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-navy dark:hover:text-white transition-all duration-200"
                title="Toggle dark mode"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button
                onClick={() => setMegaOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
              >
                <Menu size={20} />
              </button>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-gold hover:bg-gold-light text-navy-deep transition-all duration-200 shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MegaMenuModal
        isOpen={megaOpen}
        onClose={() => setMegaOpen(false)}
        navLinks={NAV_LINKS}
        megaCategories={MEGA_CATEGORIES}
      />
    </>
  )
}
