import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react'

const POSTS_CONTENT = {
  'how-to-claim-iepf-shares-2025': {
    title: 'How to Claim Your IEPF Shares in 2025: A Complete Step-by-Step Guide',
    category: 'IEPF Guide',
    date: 'March 28, 2025',
    readTime: '8 min',
    author: 'Claim360 Team',
    content: `
      <h2>What is IEPF?</h2>
      <p>The Investor Education and Protection Fund (IEPF) is a government-administered fund where companies are required to transfer unclaimed dividends and shares after 7 consecutive years of non-claim. As of 2024, billions of rupees in shares and dividends sit unclaimed in this fund.</p>

      <h2>Step 1: Check if Your Shares Are in IEPF</h2>
      <p>You can verify this on the MCA21 portal or by directly contacting the company's registrar and transfer agent (RTA). Look for your folio number and name in their records.</p>

      <h2>Step 2: Gather Required Documents</h2>
      <ul>
        <li>Aadhaar card (as per latest guidelines)</li>
        <li>PAN card</li>
        <li>Original share certificates (if physical shares)</li>
        <li>Demat account details (DP ID and Client ID)</li>
        <li>Cancelled cheque or passbook copy</li>
      </ul>

      <h2>Step 3: File IEPF-5 Form</h2>
      <p>The IEPF-5 form must be filed on the MCA21 portal. This form collects details about the claimant, the company, and the nature of the claim. Once submitted, you'll receive an SRN (Service Request Number) for tracking.</p>

      <h2>Step 4: Contact the Nodal Officer</h2>
      <p>After filing IEPF-5, you must contact the company's appointed Nodal Officer with a physical copy of the form and supporting documents. The timeline from this point is typically 3-6 months.</p>

      <h2>Common Mistakes to Avoid</h2>
      <p>Many first-time filers make errors in the IEPF-5 form, leading to rejections. These include mismatches between PAN details and demat records, wrong folio numbers, or incomplete document sets.</p>

      <h2>Why Choose Claim360?</h2>
      <p>Rather than navigating this process alone, our specialists handle the entire filing, follow-up, and documentation - with a 99%+ success rate. Contact us for a free case assessment.</p>
    `,
  },
}

const DEFAULT_POST = {
  title: 'Investment Recovery Article',
  category: 'Guide',
  date: 'March 2025',
  readTime: '6 min',
  author: 'Claim360 Team',
  content: `
    <h2>Coming Soon</h2>
    <p>This article is being prepared by our expert team. It will be published shortly. In the meantime, please <a href="/contact">contact us</a> for personalized guidance.</p>
  `,
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = POSTS_CONTENT[slug] || DEFAULT_POST

  return (
    <div className="min-h-screen bg-white dark:bg-navy">
      <div className="bg-navy-deep py-14 lg:py-20">
        <div className="c max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to Blog
          </Link>
          <span className="text-[10px] font-semibold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20 mb-4 inline-block">
            {post.category}
          </span>
          <h1 className="font-display text-white text-3xl lg:text-4xl leading-tight mb-5 mt-2">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/35 text-sm">
            <div className="flex items-center gap-1.5"><User size={13} /> {post.author}</div>
            <div className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</div>
            <div className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime} read</div>
          </div>
        </div>
      </div>

      <div className="c max-w-3xl py-12">
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-navy dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-white/55 prose-li:text-slate-600 dark:prose-li:text-white/55 prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 bg-navy dark:bg-navy-card border border-white/10 rounded-2xl p-8 text-center">
          <div className="font-display text-white text-2xl mb-3">Ready to Recover Your Investments?</div>
          <p className="text-white/50 text-sm mb-5">Get a free consultation with our IEPF and investment recovery specialists.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
          >
            Book Free Consultation {'->'}
          </Link>
        </div>
      </div>
    </div>
  )
}
