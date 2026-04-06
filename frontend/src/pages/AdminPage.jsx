import { useState } from 'react'
import { Settings, Users, FileText, BarChart2, Eye, EyeOff, ToggleLeft, ToggleRight, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const SECTIONS = [
  { key: 'hero', label: 'Hero Section', desc: 'Main banner with CTA' },
  { key: 'services', label: 'Services Section', desc: 'Services grid' },
  { key: 'stats', label: 'Stats Bar', desc: 'Key metrics' },
  { key: 'why', label: 'Why Choose Us', desc: 'Comparison table' },
  { key: 'process', label: 'Process Steps', desc: 'How it works' },
  { key: 'testimonials', label: 'Testimonials', desc: 'Client stories' },
  { key: 'blog', label: 'Blog Preview', desc: 'Latest articles' },
  { key: 'press', label: 'Press & Media', desc: 'News coverage' },
  { key: 'newsletter', label: 'Newsletter', desc: 'Email signup' },
  { key: 'faq', label: 'FAQs', desc: 'Accordion' },
  { key: 'contact', label: 'Contact Form', desc: 'Inquiry form' },
]

const MOCK_ANALYTICS = {
  visitors: '2,847',
  inquiries: '143',
  completedCases: '28',
  avgRecovery: '₹14.2L',
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('sections')
  const [visibleSections, setVisibleSections] = useState(
    SECTIONS.reduce((acc, s) => ({ ...acc, [s.key]: true }), {})
  )
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleSection = (key) => {
    setVisibleSections(p => ({ ...p, [key]: !p[key] }))
  }

  const TABS = [
    { id: 'sections', icon: Eye, label: 'Section Control' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'testimonials', icon: Users, label: 'Testimonials' },
    { id: 'content', icon: FileText, label: 'Content' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-navy">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-navy-deep border-r border-white/[0.06] flex-shrink-0 sticky top-0 h-screen">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L4 6v8l6 4 6-4V6L10 2z" fill="#0A1628"/>
            </svg>
          </div>
          <div>
            <div className="font-display text-white text-sm">Claim<span className="text-gold">360</span></div>
            <div className="text-[9px] text-white/30 uppercase tracking-wider">Admin Panel</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/45 hover:bg-white/[0.07] hover:text-white/70'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/[0.06]">
          <button
            onClick={() => { logout(); navigate('/') }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/35 hover:text-red-400 hover:bg-red-400/10 transition-all text-sm"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <div className="sticky top-0 z-10 bg-white dark:bg-navy-deep border-b border-slate-100 dark:border-white/[0.06] px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-navy dark:text-white text-lg">Admin Panel</h1>
            <span className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Admin Only</span>
          </div>
          <div className="text-sm text-slate-500 dark:text-white/40">Logged in as <span className="font-semibold text-navy dark:text-white">{user?.name}</span></div>
        </div>

        <div className="p-6 lg:p-8">
          {activeTab === 'sections' && (
            <div>
              <div className="mb-6">
                <h2 className="font-display text-navy dark:text-white text-xl mb-1">Section Visibility Control</h2>
                <p className="text-sm text-slate-400 dark:text-white/35">Toggle website sections on/off without code changes.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {SECTIONS.map(s => (
                  <div key={s.key} className="flex items-center justify-between bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-5">
                    <div>
                      <div className="font-medium text-navy dark:text-white text-sm">{s.label}</div>
                      <div className="text-xs text-slate-400 dark:text-white/30">{s.desc}</div>
                    </div>
                    <button
                      onClick={() => toggleSection(s.key)}
                      className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                        visibleSections[s.key]
                          ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-white/30'
                      }`}
                    >
                      {visibleSections[s.key] ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      {visibleSections[s.key] ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <div className="mb-6">
                <h2 className="font-display text-navy dark:text-white text-xl mb-1">Analytics Overview</h2>
                <p className="text-sm text-slate-400 dark:text-white/35">Site performance (last 30 days)</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Visitors', val: MOCK_ANALYTICS.visitors, icon: Users, change: '+18%' },
                  { label: 'Inquiries Received', val: MOCK_ANALYTICS.inquiries, icon: FileText, change: '+24%' },
                  { label: 'Cases Completed', val: MOCK_ANALYTICS.completedCases, icon: BarChart2, change: '+8%' },
                  { label: 'Avg. Recovery Value', val: MOCK_ANALYTICS.avgRecovery, icon: BarChart2, change: '+11%' },
                ].map(k => (
                  <div key={k.label} className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-5">
                    <div className="font-display text-navy dark:text-white text-2xl mb-0.5">{k.val}</div>
                    <div className="text-slate-500 dark:text-white/40 text-xs mb-1">{k.label}</div>
                    <div className="text-emerald-500 text-[10px] font-semibold">{k.change} vs last month</div>
                  </div>
                ))}
              </div>
              <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-6">
                <div className="text-sm text-slate-400 dark:text-white/35">
                  📊 Full analytics integration (Google Analytics / social media) — coming in Phase 2
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <div className="mb-6">
                <h2 className="font-display text-navy dark:text-white text-xl mb-1">Manage Testimonials</h2>
                <p className="text-sm text-slate-400 dark:text-white/35">Add, edit, or remove client testimonials.</p>
              </div>
              <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-6 text-center py-16">
                <div className="text-4xl mb-4">💬</div>
                <div className="font-display text-navy dark:text-white text-xl mb-2">Testimonials Editor</div>
                <p className="text-slate-400 dark:text-white/35 text-sm">Full CRUD testimonial management — Phase 2 with backend integration</p>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <div className="mb-6">
                <h2 className="font-display text-navy dark:text-white text-xl mb-1">Content Management</h2>
              </div>
              <div className="grid gap-4">
                {['Hero Headline', 'Services Description', 'FAQ Items', 'Contact Email'].map(item => (
                  <div key={item} className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
                    <div className="font-medium text-navy dark:text-white text-sm">{item}</div>
                    <button className="text-xs font-semibold text-navy dark:text-white/60 border border-slate-200 dark:border-white/15 px-3 py-1.5 rounded-lg hover:bg-navy dark:hover:bg-white/10 hover:text-white transition-all">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-lg">
              <div className="mb-6">
                <h2 className="font-display text-navy dark:text-white text-xl mb-1">Site Settings</h2>
              </div>
              <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-6 space-y-4">
                {[
                  { label: 'Site Title', val: 'Claim360 – Investment Recovery' },
                  { label: 'Contact Email', val: 'enquiries@claim360.in' },
                  { label: 'WhatsApp Number', val: '+91 991 003 5050' },
                  { label: 'Announcement Bar Text', val: 'Free IEPF Consultation — Book Now' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-navy dark:text-white/50 uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input
                      type="text"
                      defaultValue={f.val}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-navy dark:text-white text-sm outline-none focus:border-gold transition-colors"
                    />
                  </div>
                ))}
                <button className="bg-gold hover:bg-gold-light text-navy-deep px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
