import { Link } from 'react-router-dom'
import { ArrowLeft, Search, ShieldCheck, MessageSquareText } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center relative overflow-hidden px-6 py-16">
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)', backgroundSize: '34px 34px' }} />
      <div className="absolute top-[12%] left-[8%] w-[420px] h-[420px] bg-gold/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[8%] right-[10%] w-[360px] h-[360px] bg-[#284274]/35 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full">
        <div className="bg-white/[0.04] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-10 lg:p-14">
              <Link to="/" className="inline-flex items-center gap-3 mb-10">
                <img src="/assets/Logo_1.png" alt="Claim360" className="h-12 w-12 rounded-full object-contain" />
                <span className="text-white text-[1.5rem]" style={{ fontFamily: '"Times New Roman", Georgia, serif' }}>Claim360</span>
              </Link>

              <div className="font-display text-gold/20 leading-none mb-2 select-none" style={{ fontSize: 'clamp(84px, 14vw, 150px)' }}>
                404
              </div>
              <h1 className="font-display text-white text-3xl lg:text-5xl mb-4">
                This page isn&apos;t available.
              </h1>
              <p className="text-white/55 text-base lg:text-lg leading-relaxed max-w-xl mb-10">
                The link may be outdated, the address may be incorrect, or this section has not been published yet.
                You can return home, explore a live section, or contact us for help.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/"
                  className="w-full sm:w-auto justify-center flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-gold/25"
                >
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto justify-center flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                >
                  <MessageSquareText size={16} />
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-white/[0.08] p-8 sm:p-10 lg:p-12 bg-white/[0.02]">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold mb-8">
                <ShieldCheck size={14} />
                Quick Navigation
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Explore Services', href: '/#services' },
                  { label: 'Testimonials', href: '/testimonials' },
                  { label: 'Read the Blog', href: '/blog' },
                  { label: 'Contact Us', href: '/contact' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                ].map(link => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-white/72 hover:text-white hover:border-gold/25 hover:bg-white/[0.05] transition-all duration-200"
                  >
                    <span className="font-medium">{link.label}</span>
                    <Search size={15} className="text-gold/80" />
                  </Link>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.08] bg-navy/70 px-5 py-5">
                <div className="text-white font-semibold mb-2">Why you may be seeing this</div>
                <div className="text-white/45 text-sm leading-relaxed">
                  Some links lead to sections that are still being prepared. Until they go live, they now route here instead of feeling broken or unresponsive.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
