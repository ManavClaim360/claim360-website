import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { X, ChevronRight, ChevronDown, Plus, Minus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function MegaMenuModal({ isOpen, onClose, navLinks, megaCategories }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [expandedCat, setExpandedCat] = useState(null)

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

        {/* Navigation links */}
        <div className="px-5 py-6">
          <div className="text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4 px-2">Navigation</div>
          <div className="space-y-1">
            {navLinks.map((item) => (
              <div key={item.label} className="overflow-hidden">
                {item.mega ? (
                  <div className="bg-slate-50 dark:bg-white/5 rounded-2xl overflow-hidden mb-2">
                    <button 
                      onClick={() => setExpandedCat(expandedCat === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-4 py-4 text-navy dark:text-white font-semibold"
                    >
                      {item.label}
                      {expandedCat === item.label ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                    {expandedCat === item.label && (
                      <div className="px-4 pb-4 space-y-4 animate-fade-in">
                        {megaCategories.map(cat => (
                          <div key={cat.id} className="pt-2 first:pt-0">
                            <div className="text-[11px] font-bold text-gold uppercase tracking-wider mb-2 px-1">{cat.label}</div>
                            <div className="space-y-1">
                              {cat.items.map(sub => (
                                <a
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/10 transition-all text-sm"
                                >
                                  {sub.label}
                                  <ChevronRight size={14} className="text-slate-400" />
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href || '#'}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-4 rounded-2xl text-slate-700 dark:text-slate-300 hover:text-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-base font-semibold"
                  >
                    {item.label}
                    <ChevronRight size={18} className="text-slate-400" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Auth section if user is logged in */}
        {user && (
          <div className="mx-5 mb-4 p-4 bg-navy-mid dark:bg-navy-card rounded-2xl border border-white/5">
             <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-navy-deep font-bold">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{user.name}</div>
                <div className="text-xs text-white/60">{user.email}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/dashboard" onClick={onClose} className="py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white text-center">
                Dashboard
              </Link>
              <button onClick={() => { logout(); navigate('/'); onClose() }} className="py-2.5 rounded-xl bg-red-500/20 text-xs font-bold text-red-400">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Contact info */}
        <div className="px-5 py-6 mt-4 mx-5 mb-10 bg-navy dark:bg-white/5 rounded-3xl border border-white/10">
          <div className="text-white font-display text-xl mb-4">Financial Support</div>
          <div className="space-y-3 text-sm text-white/70">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">📞</div>
              +91 991 003 5050
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">📧</div>
              enquiries@claim360.in
            </div>
            <div className="mt-6">
              <a
                href="https://wa.me/919910035050"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold text-sm justify-center hover:bg-[#128C7E] transition-all shadow-lg shadow-green-500/20"
              >
                💬 WhatsApp Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
