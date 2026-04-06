import { Link } from 'react-router-dom'

const POSTS = [
  { slug: 'how-to-claim-iepf-shares-2025', category: 'IEPF Guide', title: 'How to Claim Your IEPF Shares in 2025: A Complete Step-by-Step Guide', date: 'March 28, 2025', readTime: '8 min', excerpt: 'If your shares have been transferred to IEPF, here\'s exactly how to file IEPF-5 and recover them.', icon: '📋' },
  { slug: 'nri-investment-recovery-india', category: 'NRI Services', title: 'NRI Investment Recovery: Managing Indian Shares From Abroad', date: 'March 15, 2025', readTime: '6 min', excerpt: 'A comprehensive guide for NRIs on recovering and managing Indian investments without visiting India.', icon: '🌏' },
  { slug: 'physical-shares-to-demat-guide', category: 'Share Transfer', title: 'Converting Physical Share Certificates to Demat: Everything You Need to Know', date: 'March 5, 2025', readTime: '5 min', excerpt: 'Old paper share certificates are still valid. Here\'s how to convert them to demat format.', icon: '🔄' },
  { slug: 'iepf-7-year-rule-explained', category: 'IEPF Guide', title: 'The 7-Year IEPF Rule: When Are Shares Transferred and How to Recover Them', date: 'Feb 20, 2025', readTime: '7 min', excerpt: 'Understand exactly when and why companies transfer shares to IEPF — and what you can do about it.', icon: '📅' },
  { slug: 'succession-certificate-shares-india', category: 'Legal', title: 'Getting a Succession Certificate for Inherited Shares in India', date: 'Feb 8, 2025', readTime: '9 min', excerpt: 'A legal guide to obtaining a succession certificate and claiming shares from a deceased investor\'s portfolio.', icon: '⚖️' },
]

const CATEGORY_COLORS = {
  'IEPF Guide': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  'NRI Services': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Share Transfer': 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
  'Legal': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy">
      {/* Hero */}
      <div className="bg-navy-deep py-16 lg:py-24">
        <div className="c text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-widest mb-4">
            📖 Insights & Guides
          </div>
          <h1 className="font-display text-white text-4xl lg:text-5xl mb-4 tracking-tight">
            Investment Recovery <span className="text-gold italic">Knowledge Base</span>
          </h1>
          <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
            Expert articles on IEPF claims, NRI investment management, and share recovery — written by our specialists.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="c py-14">
        {/* Featured */}
        <div className="mb-5">
          <Link to={`/blog/${POSTS[0].slug}`} className="group block lg:flex gap-8 bg-slate-50 dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl overflow-hidden hover:border-slate-200 dark:hover:border-white/20 hover:shadow-lg transition-all duration-300">
            <div className="lg:w-80 bg-navy-deep flex items-center justify-center h-52 lg:h-auto flex-shrink-0">
              <span className="text-7xl opacity-20">{POSTS[0].icon}</span>
            </div>
            <div className="p-7 flex flex-col justify-center">
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[POSTS[0].category]} mb-3 self-start`}>
                {POSTS[0].category}
              </span>
              <h2 className="font-display text-navy dark:text-white text-2xl leading-snug mb-3 group-hover:text-gold dark:group-hover:text-gold transition-colors">
                {POSTS[0].title}
              </h2>
              <p className="text-slate-500 dark:text-white/40 text-sm mb-4 leading-relaxed">{POSTS[0].excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-white/30">
                <span>{POSTS[0].date}</span>
                <span>·</span>
                <span>{POSTS[0].readTime} read</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.slice(1).map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group bg-slate-50 dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl overflow-hidden hover:border-slate-200 dark:hover:border-white/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-navy-deep h-36 flex items-center justify-center">
                <span className="text-5xl opacity-15">{post.icon}</span>
              </div>
              <div className="p-5">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category]} mb-3 inline-block`}>
                  {post.category}
                </span>
                <h3 className="font-display text-navy dark:text-white text-base leading-snug mb-2 group-hover:text-gold dark:group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 dark:text-white/40 text-xs leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-white/25">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
