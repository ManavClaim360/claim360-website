import { useState } from 'react'
import { Search, Eye, EyeOff, Lock, User, MapPin, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function InvestorSearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [revealedIds, setRevealedIds] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/investors/search?q=${encodeURIComponent(query)}`)
      setResults(res.data)
      setSearched(true)
    } catch (error) {
      console.error('Search failed:', error)
      alert('Failed to search real database. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const toggleReveal = (id) => {
    setRevealedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const maskText = (text) => text.replace(/./g, (c, i) => i < 4 ? c : '•').slice(0, 12) + '...'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy section-pad">
      <div className="c max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider">
              <Search size={13} />
              Investor Search
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Authenticated
            </div>
          </div>
          <h1 className="font-display text-navy dark:text-white text-3xl lg:text-4xl mb-2">Search Investor Database</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm">
            Search by investor name or address to locate unclaimed investments. Full details revealed on request.
          </p>
        </div>

        {/* Search bar */}
        <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-2 flex gap-2 mb-8 shadow-sm">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search by name or address..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-navy dark:text-white text-sm bg-transparent placeholder-slate-300 dark:placeholder-white/20 outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex items-center gap-2 bg-navy dark:bg-gold text-white dark:text-navy-deep px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-60"
          >
            {loading ? <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" /> : 'Search'}
          </button>
        </div>

        {/* Results */}
        {searched && (
          <div>
            <div className="text-sm text-slate-400 dark:text-white/35 mb-4">
              {results.length} result{results.length !== 1 ? 's' : ''} found for "{query}"
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl">
                <Search size={40} className="text-slate-200 dark:text-white/10 mx-auto mb-4" />
                <div className="font-display text-navy dark:text-white text-xl mb-2">No results found</div>
                <p className="text-slate-400 dark:text-white/35 text-sm max-w-xs mx-auto">
                  Try a different name or address. Contact us if you believe the investor exists in our records.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map(inv => {
                  const revealed = revealedIds.has(inv.id)
                  return (
                    <div key={inv.id} className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-6 hover:border-slate-200 dark:hover:border-white/20 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Name */}
                          <div className="flex items-center gap-2 mb-1">
                            <User size={14} className="text-gold flex-shrink-0" />
                            <div className="font-semibold text-navy dark:text-white">
                              {revealed ? inv.name : maskText(inv.name)}
                            </div>
                          </div>

                          {/* Father/Husband */}
                          <div className="text-xs text-slate-400 dark:text-white/35 mb-3">
                            S/O or W/O: {revealed ? inv.fatherName : maskText(inv.fatherName)}
                          </div>

                          {/* Address */}
                          <div className="flex items-start gap-2 mb-4">
                            <MapPin size={13} className="text-slate-400 dark:text-white/30 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-slate-600 dark:text-white/55">
                              {revealed ? inv.address : maskText(inv.address)}
                            </div>
                          </div>

                          {/* Investment summary */}
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.06] rounded-xl px-3 py-2">
                              <TrendingUp size={13} className="text-gold" />
                              <div>
                                <div className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-wider">Total Value</div>
                                <div className="text-sm font-semibold text-navy dark:text-white">
                                  {revealed ? inv.totalInvestments : '₹••,•••'}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.06] rounded-xl px-3 py-2">
                              <div>
                                <div className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-wider">Companies</div>
                                <div className="text-sm font-semibold text-navy dark:text-white">
                                  {revealed ? inv.companies : '•'} found
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Reveal button */}
                        <button
                          onClick={() => toggleReveal(inv.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs flex-shrink-0 transition-all duration-200 ${
                            revealed
                              ? 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/15'
                              : 'bg-navy dark:bg-gold text-white dark:text-navy-deep hover:opacity-90'
                          }`}
                        >
                          {revealed ? <EyeOff size={13} /> : <Eye size={13} />}
                          {revealed ? 'Hide' : 'Reveal'}
                        </button>
                      </div>

                      {revealed && (
                        <div className="mt-4 pt-4 border-t border-slate-50 dark:border-white/[0.06] flex items-center justify-between">
                          <div className="text-xs text-slate-400 dark:text-white/30">
                            Want to claim these investments?
                          </div>
                          <a
                            href="#contact"
                            className="text-xs font-semibold text-gold hover:text-gold-dark transition-colors"
                          >
                            Contact Claim360 →
                          </a>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Info notice */}
        {!searched && (
          <div className="bg-gold/[0.06] border border-gold/15 rounded-2xl p-5 flex items-start gap-3">
            <Lock size={16} className="text-gold mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-navy dark:text-white mb-1">Authenticated Access</div>
              <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                You are logged in as <span className="font-semibold">{user?.name}</span>. Full investor details are revealed only after clicking the eye icon. All searches are logged for compliance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
