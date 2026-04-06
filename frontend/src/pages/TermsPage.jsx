export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy">
      <div className="bg-navy-deep py-16">
        <div className="c">
          <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Legal</div>
          <h1 className="font-display text-white text-4xl lg:text-5xl mb-3">Terms of Service</h1>
          <div className="text-white/40 text-sm">Last updated: March 2025</div>
        </div>
      </div>
      <div className="c py-14 max-w-3xl">
        <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-8 lg:p-12 space-y-8">
          {[
            { title: '1. Services', content: '360 Degrees Management Services Private Limited ("Claim360") provides investment recovery advisory services including IEPF claims, share transfers, NRI services, and legal documentation assistance. Use of our services constitutes acceptance of these terms.' },
            { title: '2. Eligibility', content: 'You must be a legal investment holder, authorized representative, or legal heir of the investor to engage our services. You are responsible for ensuring all information provided is accurate and complete.' },
            { title: '3. Fees', content: 'Our fee structure is discussed and agreed upon before engagement. Fees are typically success-based as a percentage of the recovered amount. No fees are charged for initial consultations.' },
            { title: '4. Confidentiality', content: 'All information shared with Claim360 is strictly confidential. We do not share your data with third parties except as required to process your claim (e.g., NSDL, CDSL, registrars, MCA). Your documents are returned or securely destroyed after case closure.' },
            { title: '5. Limitation of Liability', content: 'Claim360 shall not be liable for delays caused by regulatory bodies, company registrars, or government authorities. Our liability is limited to the fees paid for the specific service in question.' },
            { title: '6. Governing Law', content: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi, India.' },
          ].map(section => (
            <div key={section.title} className="border-b border-slate-100 dark:border-white/[0.06] pb-8 last:border-0 last:pb-0">
              <h2 className="font-display text-navy dark:text-white text-xl mb-3">{section.title}</h2>
              <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
