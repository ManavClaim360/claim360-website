import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { X, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function MegaMenuModal({ isOpen, onClose, navLinks }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white dark:bg-navy-deep w-full h-full overflow-y-auto animate-slide-in">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/10 sticky top-0 bg-white dark:bg-navy-deep z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy dark:bg-gold rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L4 6v8l6 4 6-4V6L10 2z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span className="font-display text-lg text-navy dark:text-white">Claim<span className="text-gold">360</span></span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-navy dark:hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Auth quick-actions */}
        {!user ? (
          <div className="px-5 py-4 grid grid-cols-2 gap-3 border-b border-slate-100 dark:border-white/10">
            <Link
              to="/signup"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gold text-navy-deep font-semibold text-sm hover:bg-gold-light transition-all"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-white/20 text-navy dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div className="px-5 py-4 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-navy dark:bg-gold flex items-center justify-center text-white dark:text-navy-deep font-bold font-display">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-navy dark:text-white text-sm">{user.name}</div>
                <div className="text-xs text-slate-400">{user.email}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/dashboard" onClick={onClose} className="py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-sm font-medium text-navy dark:text-white text-center hover:bg-slate-200 dark:hover:bg-white/20 transition-all">
                Dashboard
              </Link>
              <button onClick={() => { logout(); navigate('/'); onClose() }} className="py-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <div className="px-5 py-4">
          <div className="text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3">Navigation</div>
          <div className="space-y-0.5">
            {navLinks.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <div className="text-sm font-semibold text-slate-400 dark:text-slate-500 px-3 py-2 uppercase tracking-wider text-[10px] mt-3 mb-1">
                      {item.label}
                    </div>
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-sm"
                      >
                        <span className="flex items-center gap-3">
                          <span>{sub.icon}</span>
                          {sub.label}
                        </span>
                        <ChevronRight size={14} className="text-slate-400" />
                      </a>
                    ))}
                  </>
                ) : (
                  <a
                    href={item.href || '#'}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-sm font-medium"
                  >
                    {item.label}
                    <ChevronRight size={14} className="text-slate-400" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div className="px-5 py-6 mt-4 mx-5 mb-8 bg-navy dark:bg-white/5 rounded-2xl border border-white/10">
          <div className="text-white font-display text-lg mb-3">Need Help?</div>
          <div className="space-y-2 text-sm text-white/60">
            <div>📞 +91 991 003 5050</div>
            <div>📧 enquiries@claim360.in</div>
            <div className="mt-4">
              <a
                href="https://wa.me/919910035050"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm justify-center hover:bg-[#128C7E] transition-all"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
