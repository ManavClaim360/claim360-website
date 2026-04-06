import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Phone, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthPage({ mode = 'signin' }) {
  const [activeMode, setActiveMode] = useState(mode)
  const [showPass, setShowPass] = useState(false)
  const [otpStep, setOtpStep] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' })
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleOTPChange = (val, i) => {
    const next = [...otp]
    next[i] = val.slice(-1)
    setOtp(next)
    if (val && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (activeMode === 'signup' && !otpStep) {
      setOtpStep(true)
      return
    }
    setLoading(true)
    try {
      let user;
      if (activeMode === 'signup') {
        user = await register(form)
      } else {
        user = await login(form)
      }
      setLoading(false)
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (error) {
      setLoading(false)
      alert(error.response?.data?.detail || 'Authentication failed')
    }
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-navy-deep">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col flex-1 bg-navy relative overflow-hidden p-14 justify-center">
        {/* BG */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(ellipse 80% 80% at 0% 50%, rgba(201,162,74,0.1) 0%, transparent 60%)' }}
        />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/[0.04] rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-14">
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L4 6v8l6 4 6-4V6L10 2z" fill="#0A1628"/>
              </svg>
            </div>
            <span className="font-display text-xl text-white">Claim<span className="text-gold">360</span></span>
          </Link>

          <h1 className="font-display text-white leading-tight mb-4" style={{ fontSize: 'clamp(30px, 3.5vw, 44px)' }}>
            Recover Your<br />
            <span className="text-gold italic">Investments.</span><br />
            Reclaim Your Future.
          </h1>
          <p className="text-white/45 text-base leading-relaxed mb-12 max-w-xs">
            Join 320+ clients who've successfully recovered their unclaimed shares and dividends with Claim360.
          </p>

          {/* Trust items */}
          <div className="space-y-3">
            {[
              { icon: '🔒', text: 'Bank-grade security & data privacy' },
              { icon: '🎯', text: '99%+ success rate on filed claims' },
              { icon: '🌍', text: 'Serving clients in 6 countries' },
              { icon: '💼', text: 'Dedicated relationship manager' },
            ].map(t => (
              <div key={t.text} className="flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3">
                <span className="text-base">{t.icon}</span>
                <span className="text-white/60 text-sm">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-14 bg-slate-50 dark:bg-navy-deep overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-navy dark:bg-gold rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L4 6v8l6 4 6-4V6L10 2z" fill="white"/>
              </svg>
            </div>
            <span className="font-display text-lg text-navy dark:text-white">Claim<span className="text-gold">360</span></span>
          </Link>

          <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-3xl p-8 shadow-xl shadow-black/5">
            {/* Mode tabs */}
            <div className="flex bg-slate-100 dark:bg-white/[0.05] rounded-xl p-1 mb-8">
              {['signin', 'signup'].map(m => (
                <button
                  key={m}
                  onClick={() => { setActiveMode(m); setOtpStep(false) }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeMode === m
                      ? 'bg-white dark:bg-white/10 text-navy dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-white/40'
                  }`}
                >
                  {m === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {otpStep ? (
              /* OTP verification */
              <div>
                <h2 className="font-display text-navy dark:text-white text-2xl mb-2">Verify Your Number</h2>
                <p className="text-slate-400 dark:text-white/40 text-sm mb-6">
                  We sent a 6-digit OTP to <span className="font-semibold text-navy dark:text-white">{form.phone}</span>
                </p>

                <div className="flex gap-2 mb-6">
                  {otp.map((val, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      onChange={e => handleOTPChange(e.target.value, i)}
                      className="flex-1 h-14 text-center text-xl font-bold font-display text-navy dark:text-white border-2 border-slate-200 dark:border-white/15 rounded-xl bg-white dark:bg-white/[0.04] outline-none focus:border-gold transition-colors"
                    />
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading || otp.join('').length < 6}
                    className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-deep py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-navy-deep/30 border-t-navy-deep rounded-full animate-spin" /> : 'Verify & Continue'}
                  </button>
                  <button type="button" onClick={() => setOtpStep(false)} className="w-full py-2.5 text-sm text-slate-400 dark:text-white/30 hover:text-navy dark:hover:text-white transition-colors">
                    ← Go Back
                  </button>
                </form>
              </div>
            ) : (
              /* Main form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="font-display text-navy dark:text-white text-2xl mb-1">
                    {activeMode === 'signin' ? 'Welcome back' : 'Create your account'}
                  </h2>
                  <p className="text-slate-400 dark:text-white/40 text-sm">
                    {activeMode === 'signin'
                      ? 'Sign in to access your recovery dashboard.'
                      : 'Get started with a free Claim360 account.'}
                  </p>
                </div>

                {activeMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-navy dark:text-white/60 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-navy dark:text-white placeholder-slate-300 dark:placeholder-white/20 text-sm outline-none focus:border-gold transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-navy dark:text-white/60 uppercase tracking-wider mb-1.5">
                    {activeMode === 'signup' ? 'Phone Number' : 'Email or Phone'}
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                    <input
                      type={activeMode === 'signup' ? 'tel' : 'text'}
                      required
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder={activeMode === 'signup' ? '+91 XXXXX XXXXX' : 'Phone or email'}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-navy dark:text-white placeholder-slate-300 dark:placeholder-white/20 text-sm outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                {activeMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-navy dark:text-white/60 uppercase tracking-wider mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-navy dark:text-white placeholder-slate-300 dark:placeholder-white/20 text-sm outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-navy dark:text-white/60 uppercase tracking-wider">Password</label>
                    {activeMode === 'signin' && (
                      <button type="button" className="text-xs text-gold hover:text-gold-dark font-medium transition-colors">Forgot?</button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      value={form.password}
                      onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-navy dark:text-white placeholder-slate-300 dark:placeholder-white/20 text-sm outline-none focus:border-gold transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 hover:text-navy dark:hover:text-white transition-colors"
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-deep py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-navy-deep/30 border-t-navy-deep rounded-full animate-spin" />
                  ) : (
                    <>
                      {activeMode === 'signin' ? 'Sign In' : 'Continue'}
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-slate-100 dark:bg-white/10" />
                  <span className="text-xs text-slate-400 dark:text-white/25">or</span>
                  <div className="flex-1 h-px bg-slate-100 dark:bg-white/10" />
                </div>

                {/* Quick contact CTA */}
                <a
                  href="https://wa.me/919910035050"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-white/60 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Continue with WhatsApp
                </a>

                <p className="text-center text-xs text-slate-400 dark:text-white/30 mt-2">
                  {activeMode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => setActiveMode(activeMode === 'signin' ? 'signup' : 'signin')}
                    className="text-gold font-semibold hover:text-gold-dark transition-colors"
                  >
                    {activeMode === 'signin' ? 'Sign up free' : 'Sign in'}
                  </button>
                </p>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-slate-400 dark:text-white/20 mt-5">
            By continuing you agree to our{' '}
            <a href="/terms" className="underline hover:text-navy dark:hover:text-white/50 transition-colors">Terms of Service</a>
            {' '}&amp;{' '}
            <a href="/privacy" className="underline hover:text-navy dark:hover:text-white/50 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
