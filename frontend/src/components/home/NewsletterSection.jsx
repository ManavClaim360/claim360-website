import { useEffect, useRef, useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../../config/api'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const [customHighlights, setCustomHighlights] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('newsletterHighlights') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.2 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await axios.post(`${API_URL}/contact/newsletter`, { email })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert("Failed to subscribe")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="newsletter"
      ref={ref}
      className="py-16 bg-gold/[0.06] dark:bg-gold/[0.04] border-y border-gold/15 overflow-hidden"
    >
      <div className="c">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Left */}
          <div>
            <div className="eyebrow reveal mb-4">Stay Informed</div>
            <h2 className="reveal font-display text-navy dark:text-white text-3xl lg:text-4xl tracking-tight mb-4">
              Investment Recovery Tips & Legal Updates
            </h2>
            <div className="reveal space-y-2.5 mt-5">
              {[
                'Monthly IEPF claim filing deadlines',
                'RBI & SEBI regulatory changes affecting NRIs',
                'Success stories & recovery tips from our experts',
                'Free webinar invitations and guides',
                ...customHighlights,
              ].map(perk => (
                <div key={perk} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-white/55">
                  <div className="w-5 h-5 rounded-full bg-navy dark:bg-gold flex items-center justify-center text-white dark:text-navy-deep flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M8.5 2.5L4 7.5 1.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                  {perk}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle size={28} className="text-emerald-500" />
                </div>
                <div className="font-display text-navy dark:text-white text-xl">You're subscribed!</div>
                <p className="text-slate-500 dark:text-white/45 text-sm">
                  You'll receive our next investment recovery update in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full bg-white dark:bg-white/[0.04] border border-slate-100 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg overflow-hidden">
                <div className="font-display text-navy dark:text-white text-xl mb-2">Join 500+ investors</div>
                <p className="text-slate-400 dark:text-white/40 text-sm mb-5">
                  Get free insights on recovering your investments, delivered monthly.
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/[0.05] text-navy dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-sm outline-none focus:border-gold dark:focus:border-gold transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-navy dark:bg-gold hover:bg-navy-light dark:hover:bg-gold-light text-white dark:text-navy-deep px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60"
                  >
                    {loading ? '...' : <>Subscribe <Send size={14} /></>}
                  </button>
                </div>
                <p className="text-slate-400 dark:text-white/25 text-xs mt-3">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
