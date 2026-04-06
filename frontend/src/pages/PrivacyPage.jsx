export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy">
      <div className="bg-navy-deep py-16">
        <div className="c">
          <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Legal</div>
          <h1 className="font-display text-white text-4xl lg:text-5xl mb-3">Privacy Policy</h1>
          <div className="text-white/40 text-sm">Last updated: March 2025</div>
        </div>
      </div>
      <div className="c py-14 max-w-3xl">
        <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-8 lg:p-12 space-y-8">
          {[
            { title: '1. Information We Collect', content: 'We collect information you provide directly, including name, phone number, email address, and details about your investments. We also collect usage data through analytics tools to improve our services.' },
            { title: '2. How We Use Your Information', content: 'Your information is used to process your investment recovery cases, communicate with you about case updates, send newsletters (with consent), and comply with regulatory requirements under SEBI, MCA, and IEPF regulations.' },
            { title: '3. Data Security', content: 'All sensitive data is encrypted in transit and at rest. We do not sell, rent, or share your personal information with third parties except as required for case processing (e.g., registrars, NSDL, CDSL) or as required by law.' },
            { title: '4. Cookies', content: 'We use essential cookies for website functionality and optional analytics cookies to understand how visitors use our site. You may disable non-essential cookies through your browser settings.' },
            { title: '5. Your Rights', content: 'You have the right to access, correct, or delete your personal data. Contact us at privacy@claim360.in to exercise these rights. We will respond within 30 days.' },
            { title: '6. Contact', content: 'For privacy-related queries, email privacy@claim360.in or write to: 311, Sun Industrial Estate, Lower Parel, Mumbai – 400013.' },
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
