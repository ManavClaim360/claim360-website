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
  { label: 'Testimonials', href: '/testimonials' },
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
        className={`fixed left-0 right-0 z-[65] transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-[26px] saturate-150'
            : ''
        }`}
        style={{
          top: 'var(--announcement-height)',
          background: scrolled
            ? 'linear-gradient(180deg, rgba(8, 17, 32, 0.82) 0%, rgba(8, 17, 32, 0.68) 100%)'
            : '#060E1C',
          boxShadow: scrolled
            ? '0 20px 70px rgba(3, 8, 18, 0.38), inset 0 1px 0 rgba(255,255,255,0.11)'
            : 'none',
        }}
      >
        <div className="c">
          <div className="flex items-center justify-between h-[72px] gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <img
                src="/assets/Logo_1.png"
                alt="Claim360"
                className="h-11 w-11 rounded-full p-1 object-contain"
              />
              <span
                className="text-white text-[1.55rem] tracking-[0.02em] group-hover:text-gold-light transition-colors duration-200"
                style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
              >
                Claim360
              </span>
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
                    <button className="nav-item flex items-center gap-1 h-[72px] text-white/78 hover:text-white hover:bg-white/[0.06]">
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
                  <Link key={item.label} to={item.href || '/'} className="nav-item text-white/78 hover:text-white hover:bg-white/[0.06]">
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => user ? navigate('/search') : navigate('/login')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/[0.06] hover:text-white transition-all duration-200"
                title="Investor Search"
              >
                <Search size={17} />
              </button>

              <button
                onClick={toggle}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/[0.06] hover:text-white transition-all duration-200"
                title="Toggle dark mode"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button
                onClick={() => setMegaOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-white/75 hover:bg-white/[0.06] transition-all duration-200"
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
