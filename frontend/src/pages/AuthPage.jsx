import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Eye, EyeOff, Mail, Phone, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const otpLength = 6
const resendDelay = 30

const trustPoints = [
  'Secure onboarding',
  'Phone OTP access',
  'Password fallback for admin',
]

const formatIndianPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)} ${digits.slice(5)}`
}

const normalizePhone = (value) => {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 10) return `+91${digits}`
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`
  if (value.trim().startsWith('+')) return `+${digits}`
  return value.trim()
}

export default function AuthPage({ mode = 'signin' }) {
  const [activeMode, setActiveMode] = useState(mode)
  const [signInMethod, setSignInMethod] = useState('otp')
  const [showPass, setShowPass] = useState(false)
  const [otpStep, setOtpStep] = useState(false)
  const [otp, setOtp] = useState(Array(otpLength).fill(''))
  const [statusMessage, setStatusMessage] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    identifier: '',
  })
  const { loading, login, requestOtp, verifyOtp } = useAuth()
  const navigate = useNavigate()

  const otpValue = useMemo(() => otp.join(''), [otp])
  const canResend = resendCountdown === 0 && !loading

  useEffect(() => {
    if (!resendCountdown) return undefined
    const timer = window.setTimeout(() => setResendCountdown((prev) => prev - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [resendCountdown])

  const updateForm = (key, value) => {
    if (key === 'phone') {
      setForm((prev) => ({ ...prev, phone: formatIndianPhone(value) }))
      return
    }
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetOtpState = () => {
    setOtpStep(false)
    setOtp(Array(otpLength).fill(''))
    setStatusMessage('')
    setResendCountdown(0)
  }

  const resetView = (nextMode) => {
    setActiveMode(nextMode)
    setSignInMethod('otp')
    setShowPass(false)
    resetOtpState()
  }

  const goToDashboard = (user) => {
    navigate(user.role === 'admin' ? '/admin' : '/dashboard')
  }

  const sendOtp = async () => {
    const payload = activeMode === 'signup'
      ? {
          mode: 'signup',
          name: form.name,
          email: form.email,
          phone: normalizePhone(form.phone),
          password: form.password,
        }
      : {
          mode: 'login',
          phone: normalizePhone(form.phone),
        }

    const res = await requestOtp(payload)
    setOtpStep(true)
    setStatusMessage(res.detail || 'OTP sent')
    setResendCountdown(resendDelay)
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    try {
      await sendOtp()
    } catch (error) {
      alert(error.response?.data?.detail || 'Unable to send OTP')
    }
  }

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({
        identifier: form.identifier,
        password: form.password,
      })
      goToDashboard(user)
    } catch (error) {
      alert(error.response?.data?.detail || 'Unable to sign in')
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    try {
      const user = await verifyOtp({
        mode: activeMode,
        name: form.name,
        email: form.email,
        phone: normalizePhone(form.phone),
        password: form.password,
        code: otpValue,
      })
      goToDashboard(user)
    } catch (error) {
      alert(error.response?.data?.detail || 'OTP verification failed')
    }
  }

  const handleOtpChange = (value, index) => {
    const next = [...otp]
    next[index] = value.replace(/\D/g, '').slice(-1)
    setOtp(next)
    if (value && index < otpLength - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-navy-deep">
      <div className="hidden lg:flex flex-col flex-1 bg-navy dot-canvas dot-tone-gold overflow-hidden p-14 justify-center">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(ellipse 80% 80% at 0% 50%, rgba(201,162,74,0.1) 0%, transparent 60%)' }}
        />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/[0.04] blur-3xl" />

        <div className="relative z-10 max-w-lg">
          <Link to="/" className="mb-12 flex items-center gap-3">
            <img src="/assets/main_logo_sq.jpeg" alt="Claim360 icon" className="h-11 w-11 rounded-2xl object-cover ring-1 ring-white/10" />
            <span className="font-display text-xl text-white">Claim<span className="text-gold">360</span></span>
          </Link>

          <p className="eyebrow mb-5">Secure Access</p>
          <h1 className="mb-4 font-display text-white leading-tight" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
            Phone OTP for users.
            <br />
            Password fallback for admin.
          </h1>
          <p className="mb-10 max-w-sm text-base leading-relaxed text-white/55">
            Verify a phone by SMS for day-to-day access, or use email or phone with password when you need a direct sign-in path.
          </p>

          <div className="space-y-3">
            {trustPoints.map((text) => (
              <div key={text} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
                <CheckCircle2 size={18} className="shrink-0 text-gold" />
                <span className="text-sm text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dot-canvas dot-tone-gold flex flex-1 items-center justify-center overflow-y-auto bg-slate-50 p-6 dark:bg-navy-deep lg:p-14">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <img src="/assets/main_logo_sq.jpeg" alt="Claim360 icon" className="h-9 w-9 rounded-xl object-cover" />
            <span className="font-display text-lg text-navy dark:text-white">Claim<span className="text-gold">360</span></span>
          </Link>

          <div className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-navy-card">
            <div className="mb-8 flex rounded-2xl bg-slate-100 p-1.5 dark:bg-white/[0.05]">
              {['signin', 'signup'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => resetView(tab)}
                  className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                    activeMode === tab ? 'bg-white text-navy shadow-sm dark:bg-white/10 dark:text-white' : 'text-slate-500 dark:text-white/40'
                  }`}
                >
                  {tab === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {!otpStep ? (
              <>
                <div className="mb-6">
                  <h2 className="mb-1 font-display text-2xl text-navy dark:text-white">
                    {activeMode === 'signin' ? 'Welcome back' : 'Create your account'}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-white/40">
                    {activeMode === 'signin'
                      ? 'Choose OTP or password sign in.'
                      : 'Create the account once, then verify the phone number by SMS.'}
                  </p>
                </div>

                {activeMode === 'signin' && (
                  <div className="mb-6 flex rounded-2xl bg-slate-100 p-1.5 dark:bg-white/[0.05]">
                    {['otp', 'password'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => {
                          setSignInMethod(method)
                          resetOtpState()
                        }}
                        className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                          signInMethod === method ? 'bg-white text-navy shadow-sm dark:bg-white/10 dark:text-white' : 'text-slate-500 dark:text-white/40'
                        }`}
                      >
                        {method === 'otp' ? 'Phone OTP' : 'Password'}
                      </button>
                    ))}
                  </div>
                )}

                {activeMode === 'signin' && signInMethod === 'password' ? (
                  <form onSubmit={handlePasswordLogin} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy dark:text-white/60">
                        Email or Phone
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                        <input
                          type="text"
                          required
                          value={form.identifier}
                          onChange={(e) => updateForm('identifier', e.target.value)}
                          placeholder="admin@claim360.in or +91 98765 43210"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-navy outline-none transition-colors placeholder:text-slate-300 focus:border-gold dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="text-xs font-semibold uppercase tracking-wider text-navy dark:text-white/60">Password</label>
                        <span className="text-xs text-slate-400 dark:text-white/30">Works for admin and migrated users</span>
                      </div>
                      <div className="relative">
                        <input
                          type={showPass ? 'text' : 'password'}
                          required
                          value={form.password}
                          onChange={(e) => updateForm('password', e.target.value)}
                          placeholder="Enter your password"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-navy outline-none transition-colors placeholder:text-slate-300 focus:border-gold dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass((prev) => !prev)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-navy dark:text-white/30 dark:hover:text-white"
                        >
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 text-sm font-semibold text-navy-deep transition-all duration-200 hover:bg-gold-light disabled:opacity-60"
                    >
                      {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-navy-deep/30 border-t-navy-deep" /> : 'Sign In'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    {activeMode === 'signup' && (
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy dark:text-white/60">Full Name</label>
                        <div className="relative">
                          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => updateForm('name', e.target.value)}
                            placeholder="Your full name"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-navy outline-none transition-colors placeholder:text-slate-300 focus:border-gold dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    )}

                    {activeMode === 'signup' && (
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy dark:text-white/60">Email Address</label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => updateForm('email', e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-navy outline-none transition-colors placeholder:text-slate-300 focus:border-gold dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy dark:text-white/60">Phone Number</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => updateForm('phone', e.target.value)}
                          placeholder="98765 43210"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-16 text-sm text-navy outline-none transition-colors placeholder:text-slate-300 focus:border-gold dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 dark:text-white/30">+91</span>
                      </div>
                    </div>

                    {activeMode === 'signup' && (
                      <div>
                        <div className="mb-1.5 flex items-center justify-between">
                          <label className="text-xs font-semibold uppercase tracking-wider text-navy dark:text-white/60">Password</label>
                          <span className="text-xs text-slate-400 dark:text-white/30">Used for fallback sign in</span>
                        </div>
                        <div className="relative">
                          <input
                            type={showPass ? 'text' : 'password'}
                            required
                            value={form.password}
                            onChange={(e) => updateForm('password', e.target.value)}
                            placeholder="Create a password"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-navy outline-none transition-colors placeholder:text-slate-300 focus:border-gold dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass((prev) => !prev)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-navy dark:text-white/30 dark:hover:text-white"
                          >
                            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 text-sm font-semibold text-navy-deep transition-all duration-200 hover:bg-gold-light disabled:opacity-60"
                    >
                      {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-navy-deep/30 border-t-navy-deep" /> : 'Send OTP'}
                    </button>
                  </form>
                )}
              </>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <h2 className="mb-1 font-display text-2xl text-navy dark:text-white">Verify OTP</h2>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-white/40">
                    Enter the 6-digit code sent to <span className="font-semibold text-navy dark:text-white">{normalizePhone(form.phone)}</span>.
                  </p>
                  {statusMessage && <p className="mt-3 text-sm text-gold-dark">{statusMessage}</p>}
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-semibold text-navy outline-none transition-colors focus:border-gold dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || otpValue.length !== otpLength}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 text-sm font-semibold text-navy-deep transition-all duration-200 hover:bg-gold-light disabled:opacity-60"
                >
                  {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-navy-deep/30 border-t-navy-deep" /> : <><span>Verify & Continue</span><ArrowRight size={15} /></>}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => { if (canResend) { sendOtp().catch((error) => alert(error.response?.data?.detail || 'Unable to resend OTP')) } }}
                    disabled={!canResend}
                    className="text-gold transition-colors hover:text-gold-dark disabled:opacity-50"
                  >
                    {canResend ? 'Resend OTP' : `Resend in ${resendCountdown}s`}
                  </button>
                  <button
                    type="button"
                    onClick={resetOtpState}
                    className="text-slate-500 transition-colors hover:text-navy dark:text-white/40 dark:hover:text-white"
                  >
                    Edit details
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="mt-5 text-center text-xs text-slate-400 dark:text-white/20">
            By continuing you agree to our <a href="/terms" className="underline transition-colors hover:text-navy dark:hover:text-white/50">Terms of Service</a> &amp; <a href="/privacy" className="underline transition-colors hover:text-navy dark:hover:text-white/50">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
