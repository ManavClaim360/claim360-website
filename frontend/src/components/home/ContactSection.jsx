import { useEffect, useRef, useState } from 'react'
import { Send, CheckCircle, Phone, Mail, MapPin } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const SERVICES = [
  'IEPF Claim', 'NRI Services', 'Share Transfer',
  'Legal Documentation', 'Investment Tracing', 'Other',
]

const COUNTRY_CODES = [
  { label: 'IN', code: '+91' },
  { label: 'US', code: '+1' },
  { label: 'UK', code: '+44' },
  { label: 'UAE', code: '+971' },
  { label: 'SG', code: '+65' },
  { label: 'AU', code: '+61' },
  { label: 'CA', code: '+1' },
]

export default function ContactSection({ sectionId = 'contact' }) {
  const [form, setForm] = useState({
    name: '',
    phoneCode: '+91',
    phoneNumber: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        name: form.name,
        email: form.email,
        message: [
          `Phone: ${form.phoneCode} ${form.phoneNumber}`,
          form.service ? `Service: ${form.service}` : null,
          '',
          form.message,
        ].filter(Boolean).join('\n'),
      }

      await axios.post(`${API_URL}/contact/message`, payload)
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id={sectionId} ref={ref} className="section-pad bg-white dark:bg-navy">
      <div className="c">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — Info */}
          <div>
            <div className="eyebrow reveal mb-4">Get In Touch</div>
            <h2
              className="reveal font-display text-navy dark:text-white tracking-tight mb-4"
              style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}
            >
              Schedule a{' '}
              <span className="italic text-gold">Free</span>{' '}
              Consultation
            </h2>
            <p className="reveal text-slate-500 dark:text-white/45 text-lg leading-relaxed mb-8">
              Tell us about your investment situation, and our experts will assess your case and chart a clear recovery path — at no cost.
            </p>

            <div className="reveal space-y-5 mb-8">
              {[
                { icon: Phone, label: 'Phone', val: '+91 991 003 5050', href: 'tel:+919910035050' },
                { icon: Phone, label: 'Alternate', val: '+91 991 017 4035', href: 'tel:+919910174035' },
                { icon: Mail, label: 'Email', val: 'enquiries@claim360.in', href: 'mailto:enquiries@claim360.in' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-100 dark:border-white/10 flex items-center justify-center">
                    <c.icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 dark:text-white/30 uppercase tracking-wider mb-0.5">{c.label}</div>
                    <a href={c.href} className="text-navy dark:text-white font-medium hover:text-gold transition-colors">{c.val}</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal space-y-3 mb-8">
              {[
                { city: 'Mumbai', addr: '311, Sun Industrial Estate, Lower Parel' },
                { city: 'New Delhi', addr: 'D-4/4035, Vasant Kunj' },
                { city: 'London', addr: '2 Wymondham, St. Johns Wood Park, NW8 6RD' },
              ].map(o => (
                <div key={o.city} className="flex items-center gap-3 text-sm">
                  <MapPin size={14} className="text-gold flex-shrink-0" />
                  <span className="font-semibold text-navy dark:text-white/80">{o.city}:</span>
                  <span className="text-slate-500 dark:text-white/40">{o.addr}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right — Form */}
          <div className="reveal">
            {submitted ? (
              <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/10 rounded-3xl p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={36} className="text-emerald-500" />
                </div>
                <h3 className="font-display text-navy dark:text-white text-2xl mb-3">Message Received!</h3>
                <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed mb-6">
                  Our team will review your case and get back to you within 24 hours. For urgent matters, please call us directly.
                </p>
                <a
                  href="tel:+919910035050"
                  className="inline-flex items-center gap-2 bg-gold text-navy-deep px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gold-light transition-all"
                >
                  <Phone size={15} /> Call Now
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-8"
              >
                <h3 className="font-display text-navy dark:text-white text-xl mb-1">Tell us about your case</h3>
                <p className="text-slate-400 dark:text-white/35 text-sm mb-6">Free • Confidential • No obligation</p>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy dark:text-white/60 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-navy dark:text-white placeholder-slate-300 dark:placeholder-white/25 text-sm outline-none focus:border-gold dark:focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy dark:text-white/60 uppercase tracking-wider mb-1.5">Phone *</label>
                      <div className="flex items-stretch overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] transition-colors focus-within:border-gold dark:focus-within:border-gold">
                        <select
                          required
                          value={form.phoneCode}
                          onChange={e => setForm(p => ({ ...p, phoneCode: e.target.value }))}
                          className="select-field w-[108px] sm:w-[96px] flex-shrink-0 border-r border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3 pr-8 py-3 text-navy dark:text-white text-sm outline-none appearance-none"
                        >
                          {COUNTRY_CODES.map(country => (
                            <option key={`${country.label}-${country.code}`} value={country.code}>
                              {country.label} {country.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          required
                          value={form.phoneNumber}
                          onChange={e => setForm(p => ({ ...p, phoneNumber: e.target.value }))}
                          placeholder="Phone number"
                          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-navy dark:text-white placeholder-slate-300 dark:placeholder-white/25 text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy dark:text-white/60 uppercase tracking-wider mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-navy dark:text-white placeholder-slate-300 dark:placeholder-white/25 text-sm outline-none focus:border-gold dark:focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy dark:text-white/60 uppercase tracking-wider mb-1.5">Service of Interest</label>
                    <select
                      value={form.service}
                      onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                      className="select-field w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-navy dark:text-white text-sm outline-none focus:border-gold dark:focus:border-gold transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy dark:text-white/60 uppercase tracking-wider mb-1.5">Brief Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Tell us about your investment situation — company name, approximate amount, what happened..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-navy dark:text-white placeholder-slate-300 dark:placeholder-white/25 text-sm outline-none focus:border-gold dark:focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-navy dark:bg-gold hover:bg-navy-light dark:hover:bg-gold-light text-white dark:text-navy-deep py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Send Message <Send size={15} /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
