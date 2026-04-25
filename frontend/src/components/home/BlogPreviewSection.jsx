import { useEffect, useRef } from 'react'
import { FileText, Globe, RefreshCw } from 'lucide-react'

const BLOG_POSTS = [
  {
    slug: 'how-to-claim-iepf-shares-2025',
    category: 'IEPF Guide',
    title: 'How to Claim Your IEPF Shares in 2025: A Complete Step-by-Step Guide',
    excerpt: 'If your shares have been transferred to IEPF, here\'s exactly how to file IEPF-5 and recover them — with timelines, documents, and expert tips.',
    date: 'March 28, 2025',
    readTime: '8 min read',
    author: 'Claim360 Team',
    featured: true,
  },
  {
    slug: 'nri-investment-recovery-india',
    category: 'NRI Services',
    title: 'NRI Investment Recovery: Managing Indian Shares From Abroad',
    excerpt: 'A comprehensive guide for NRIs on recovering and managing Indian investments without having to travel to India.',
    date: 'March 15, 2025',
    readTime: '6 min read',
    author: 'Sheekher Saran',
  },
  {
    slug: 'physical-shares-to-demat-guide',
    category: 'Share Transfer',
    title: 'Converting Physical Share Certificates to Demat: Everything You Need to Know',
    excerpt: 'Old paper share certificates are still valid. Here\'s how you can convert them to demat format and access your investments digitally.',
    date: 'March 5, 2025',
    readTime: '5 min read',
    author: 'Claim360 Team',
  },
]

const TAG_COLORS = {
  'IEPF Guide': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  'NRI Services': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Share Transfer': 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
}

const CATEGORY_ICONS = {
  'IEPF Guide': FileText,
  'NRI Services': Globe,
  'Share Transfer': RefreshCw,
}

export default function BlogPreviewSection() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const [featured, ...rest] = BLOG_POSTS
  const FeaturedIcon = CATEGORY_ICONS[featured.category]

  return (
    <section id="blog" ref={ref} className="section-pad bg-slate-50 dark:bg-navy-deep">
      <div className="c">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 lg:mb-8">
          <div>
            <div className="eyebrow reveal mb-4">Resources & Insights</div>
            <h2 className="reveal font-display text-navy dark:text-white tracking-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Expert Guides & Articles
            </h2>
          </div>
          <a href="/blog" className="reveal text-sm font-semibold text-gold hover:text-gold-dark transition-colors flex items-center gap-1">
            View All Articles →
          </a>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Featured */}
          <div className="reveal lg:col-span-3">
            <a href={`/blog/${featured.slug}`} className="block group">
              <div className="bg-navy dark:bg-navy-card h-52 rounded-2xl relative overflow-hidden mb-5 flex items-center justify-center">
                <FeaturedIcon className="w-20 h-20 text-white opacity-[0.07]" strokeWidth={1} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${TAG_COLORS[featured.category]}`}>
                    <FeaturedIcon size={11} strokeWidth={2} />
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-white/35 mb-3">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
                <span>·</span>
                <span>{featured.author}</span>
              </div>
              <h3 className="font-display text-navy dark:text-white text-xl leading-snug mb-3 group-hover:text-gold dark:group-hover:text-gold transition-colors">
                {featured.title}
              </h3>
              <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed">{featured.excerpt}</p>
            </a>
          </div>

          {/* Side cards */}
          <div className="reveal lg:col-span-2 space-y-5">
            {rest.map(post => {
              const Icon = CATEGORY_ICONS[post.category]
              return (
                <a key={post.slug} href={`/blog/${post.slug}`} className="block group bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-2xl p-5 hover:border-slate-200 dark:hover:border-white/15 hover:shadow-lg transition-all duration-200">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${TAG_COLORS[post.category]}`}>
                    <Icon size={10} strokeWidth={2} />
                    {post.category}
                  </span>
                  <h3 className="font-display text-navy dark:text-white text-base leading-snug mt-3 mb-2 group-hover:text-gold dark:group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-white/30">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
