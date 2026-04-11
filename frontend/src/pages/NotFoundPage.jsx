import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center relative overflow-hidden px-5 py-12">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)', backgroundSize: '34px 34px' }} />

      {/* Glow blobs */}
      <div className="absolute top-[12%] left-[8%] w-[320px] h-[320px] bg-gold/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[8%] right-[10%] w-[280px] h-[280px] bg-[#284274]/35 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/[0.04] border border-white/10 rounded-[28px] overflow-hidden shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur-xl p-7 sm:p-10">

          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <img src="/assets/Logo_1.png" alt="Claim360" className="h-10 w-10 rounded-full object-contain" />
            <span className="text-white text-[1.35rem]" style={{ fontFamily: '"Times New Roman", Georgia, serif' }}>Claim360</span>
          </Link>

          {/* 404 */}
          <div className="font-display text-gold/20 leading-none mb-2 select-none" style={{ fontSize: 'clamp(80px, 22vw, 140px)' }}>
            404
          </div>

          <h1 className="font-display text-white text-2xl sm:text-3xl mb-3">
            This page isn&apos;t available.
          </h1>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
            The link may be outdated, the address may be incorrect, or this section has not been published yet.
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold mb-6">
            <ShieldCheck size={13} />
            Why you may be seeing this
          </div>
          <p className="text-white/35 text-sm leading-relaxed mb-8">
            Some links lead to sections that are still being prepared. Until they go live, they route here instead of feeling broken.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-deep px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-gold/25"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="flex-1 flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
