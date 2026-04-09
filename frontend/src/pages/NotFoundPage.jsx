import { Link } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center relative overflow-hidden">
      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }}
      />
      {/* Gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link to="/">
            <img src="/assets/Logo.png" alt="Claim360" className="h-12 w-auto object-contain brightness-0 invert" />
          </Link>
        </div>

        {/* 404 number */}
        <div
          className="font-display text-gold leading-none mb-4 select-none"
          style={{ fontSize: 'clamp(96px, 18vw, 160px)', opacity: 0.15 }}
        >
          404
        </div>

        <h1 className="font-display text-white text-3xl lg:text-4xl mb-4 -mt-8">
          Page Not Found
        </h1>
        <p className="text-white/45 text-base leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-gold/25"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-white/[0.07]">
          <div className="text-white/30 text-xs uppercase tracking-widest mb-4">You might be looking for</div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Services', href: '/#services' },
              { label: 'About Us', href: '/#about' },
              { label: 'Testimonials', href: '/#testimonials' },
              { label: 'Blog', href: '/blog' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white/50 hover:text-gold hover:border-gold/30 text-xs transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
