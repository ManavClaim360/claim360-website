import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Sun, Moon, User, LogOut, ChevronDown, Menu, X, Search } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import MegaMenuModal from './MegaMenuModal'

const NAV_LINKS = [
  {
    label: 'About Us',
    dropdown: [
      { label: 'Who We Are', href: '/#about', icon: '🏢' },
      { label: 'Our Team', href: '/#team', icon: '👥' },
      { label: 'Our Story', href: '/#story', icon: '📖' },
    ]
  },
  {
    label: 'Services',
    dropdown: [
      { label: 'IEPF Claims', href: '/#services', icon: '📋' },
      { label: 'NRI Services', href: '/#nri', icon: '🌏' },
      { label: 'Share Transfers', href: '/#transfers', icon: '🔄' },
      { label: 'Legal Documentation', href: '/#legal', icon: '⚖️' },
      { label: 'Corporate Actions', href: '/#corporate', icon: '🏦' },
    ]
  },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const { user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [megaOpen, setMegaOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMegaOpen(false)
    setActiveDropdown(null)
  }, [location])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-navy-deep/95 backdrop-blur-xl shadow-lg shadow-black/5'
            : 'bg-white dark:bg-navy-deep'
        } border-b border-slate-100 dark:border-white/[0.06]`}
      >
        <div className="c">
          <div className="flex items-center justify-between h-[72px] gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-9 h-9 bg-navy dark:bg-gold rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L4 6v8l6 4 6-4V6L10 2z" fill="white" fillOpacity="0.9"/>
                  <path d="M10 5l-4 2.67v5.33L10 15l4-2L10 5z" fill="white" fillOpacity="0.4"/>
                </svg>
              </div>
              <div>
                <span className="font-display text-xl text-navy dark:text-white tracking-tight leading-none">
                  Claim<span className="text-gold">360</span>
                </span>
                <div className="text-[9px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase leading-none mt-0.5">
                  Investment Recovery
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {NAV_LINKS.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="nav-item flex items-center gap-1">
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 z-50 animate-slide-in">
                        <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/10 p-2 min-w-[220px]">
                          {item.dropdown.map((d) => (
                            <a
                              key={d.label}
                              href={d.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:text-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-150"
                            >
                              <span className="text-base w-6 text-center">{d.icon}</span>
                              {d.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a key={item.label} href={item.href || '#'} className="nav-item">
                    {item.label}
                  </a>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search icon */}
              <button
                onClick={() => user ? navigate('/search') : navigate('/login')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-navy dark:hover:text-white transition-all duration-200"
                title="Investor Search"
              >
                <Search size={17} />
              </button>

              {/* Dark mode */}
              <button
                onClick={toggle}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-navy dark:hover:text-white transition-all duration-200"
                title="Toggle dark mode"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {/* Auth */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserMenuOpen(p => !p)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy dark:bg-gold text-white dark:text-navy-deep text-sm font-semibold hover:opacity-90 transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold dark:bg-navy-deep flex items-center justify-center text-xs font-bold text-navy dark:text-white">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="hidden sm:block">{user.name?.split(' ')[0]}</span>
                    <ChevronDown size={13} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full pt-2 z-50 animate-slide-in">
                      <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl shadow-2xl p-2 min-w-[180px]">
                        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:text-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                          <User size={15} /> My Dashboard
                        </Link>
                        {user.role === 'admin' && (
                          <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:text-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                            ⚙️ Admin Panel
                          </Link>
                        )}
                        <div className="border-t border-slate-100 dark:border-white/10 mt-1 pt-1">
                          <button
                            onClick={() => { logout(); navigate('/') }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all w-full text-left"
                          >
                            <LogOut size={15} /> Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="hidden sm:block px-4 py-2 rounded-xl text-sm font-semibold text-navy dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200">
                    Sign In
                  </Link>
                  <Link to="/signup" className="px-4 py-2 rounded-xl text-sm font-semibold bg-gold hover:bg-gold-light text-navy-deep transition-all duration-200 shadow-sm hover:shadow-gold/30 hover:shadow-lg">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMegaOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MegaMenuModal isOpen={megaOpen} onClose={() => setMegaOpen(false)} navLinks={NAV_LINKS} />
    </>
  )
}
