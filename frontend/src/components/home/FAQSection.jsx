import { useEffect, useRef, useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const CATEGORIES = [
  { id: 'iepf', label: '📋 IEPF Claims' },
  { id: 'nri', label: '🌏 NRI Services' },
  { id: 'general', label: '❓ General' },
  { id: 'process', label: '⚙️ Process' },
]

const FAQS = {
  iepf: [
    {
      q: 'What is IEPF and why are shares transferred there?',
      a: 'The Investor Education and Protection Fund (IEPF) is a government fund where shares and dividends unclaimed for 7+ consecutive years are transferred by companies. This happens when investors lose track of old investments or pass away without informing heirs.'
    },
    {
      q: 'How long does it take to recover shares from IEPF?',
      a: 'Typically 4–8 months from the date of IEPF-5 filing. The timeline depends on the company, volume of applications at the registrar, and completeness of your documentation. We provide realistic timelines upfront after case assessment.'
    },
    {
      q: 'Can I recover shares if I don\'t have the original share certificates?',
      a: 'Yes! In most cases, our proprietary database and access to registrar records can help trace shares even without original certificates. We guide you through a duplicate certificate issuance process if needed before filing the IEPF claim.'
    },
    {
      q: 'What documents are needed for an IEPF claim?',
      a: 'The key documents are: Aadhaar, PAN, Demat Account details, Cancelled Cheque, and proof of ownership (old statements, certificates, or company records). Don\'t worry if you don\'t have all — we assess each case individually.'
    },
  ],
  nri: [
    {
      q: 'Can NRIs recover Indian investments without visiting India?',
      a: 'Absolutely. This is one of Claim360\'s specialities. We handle the entire process remotely, including obtaining necessary POA, apostille, and regulatory filings — with zero need for you to travel to India.'
    },
    {
      q: 'What services do you offer for OCI / PIO cardholders?',
      a: 'We assist with share recovery, IEPF claims, demat account opening for NRIs, legal documentation (succession, transmission), and coordination with registrars — even without a current PAN card or Indian documents.'
    },
    {
      q: 'Which countries do you currently serve?',
      a: 'We actively serve clients in the USA, UK, Canada, UAE, Australia, and Singapore. Our London office handles UK/Europe clients directly. We also assist clients in other countries case-by-case.'
    },
  ],
  general: [
    {
      q: 'How do I know if I have unclaimed investments?',
      a: 'You can use our investor search tool (login required) or contact us for a free trace. Common signs include old relatives\' shares, paper share certificates, past dividend warrants, or names in old SEBI/registrar databases.'
    },
    {
      q: 'What are your fees?',
      a: 'We charge a success-based fee — a percentage of the recovered value. There are no upfront charges for most standard claims. We\'ll give you a transparent fee structure after the initial free consultation.'
    },
    {
      q: 'Are my documents and data kept confidential?',
      a: 'Absolutely. We follow strict data privacy protocols. Documents shared with us are used solely for your case and are never shared with third parties without written consent. All physical documents are returned after case closure.'
    },
  ],
  process: [
    {
      q: 'What is the process from start to finish?',
      a: 'Step 1: Free consultation & case assessment. Step 2: Document collection & tracing. Step 3: Filing IEPF-5 or applicable forms with the company/registrar. Step 4: Follow-up until resolution. Step 5: Asset handover & case closure. We keep you updated throughout.'
    },
    {
      q: 'Can you handle cases that were previously rejected?',
      a: 'Yes — in fact, many of our clients come to us after failed attempts with other providers. We analyze the reasons for rejection and reapply with corrected/additional documentation. Our success rate on re-filed cases is still very high.'
    },
    {
      q: 'Do I need to sign a Power of Attorney?',
      a: 'A limited POA is often required for certain filings on your behalf, especially for NRI clients. We guide you through the process of creating an appropriate, limited-scope POA. You remain in control at all times.'
    },
  ],
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('iepf')
  const [openIndex, setOpenIndex] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const currentFaqs = FAQS[activeCategory] || []

  return (
    <section id="faq" ref={ref} className="section-pad bg-slate-50 dark:bg-navy">
      <div className="c">
        <div className="text-center mb-14">
          <div className="eyebrow reveal mb-4 justify-center">
            <span className="w-5 h-px bg-gold inline-block" />
            FAQs
          </div>
          <h2 className="reveal font-display text-navy dark:text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            Frequently Asked Questions
          </h2>
          <p className="reveal text-slate-500 dark:text-white/45 text-lg max-w-xl mx-auto">
            Can't find your answer? <a href="#contact" className="text-gold font-semibold hover:underline">Contact us directly</a> for a free consultation.
          </p>
        </div>

        {/* Category pills */}
        <div className="reveal flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenIndex(null) }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-navy dark:bg-gold text-white dark:text-navy-deep border-navy dark:border-gold'
                  : 'bg-white dark:bg-white/[0.04] text-slate-500 dark:text-white/50 border-slate-200 dark:border-white/10 hover:border-navy dark:hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto space-y-3">
          {currentFaqs.map((faq, i) => (
            <div
              key={i}
              className="reveal bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-2xl overflow-hidden hover:border-slate-200 dark:hover:border-white/15 transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className="font-medium text-navy dark:text-white text-sm leading-relaxed">{faq.q}</span>
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                  openIndex === i ? 'bg-navy dark:bg-gold text-white dark:text-navy-deep rotate-0' : 'bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-white/40'
                }`}>
                  {openIndex === i ? <Minus size={13} /> : <Plus size={13} />}
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-350 ease-out ${openIndex === i ? 'max-h-64' : 'max-h-0'}`}>
                <div className="px-6 pb-5 text-sm text-slate-500 dark:text-white/45 leading-relaxed border-t border-slate-50 dark:border-white/[0.05] pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
