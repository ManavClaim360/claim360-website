import { useState } from 'react'
import {
  LayoutDashboard, Search, FileText, Bell, Settings,
  TrendingUp, Users, CheckCircle, Clock, LogOut, ChevronRight
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: FileText, label: 'My Cases', id: 'cases' },
  { icon: Search, label: 'Investor Search', id: 'search', href: '/search' },
  { icon: Bell, label: 'Notifications', id: 'notifications', badge: 2 },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

const MY_CASES = [
  { id: 'C001', company: 'Tata Motors Ltd', type: 'IEPF Claim', amount: '₹3,24,000', status: 'In Progress', filed: 'Jan 12, 2025', folio: 'TM00123456' },
  { id: 'C002', company: 'Reliance Industries', type: 'Share Transfer', amount: '₹8,90,000', status: 'Completed', filed: 'Nov 5, 2024', folio: 'RI00987654' },
  { id: 'C003', company: 'HDFC Bank', type: 'IEPF Claim', amount: '₹1,15,500', status: 'Under Review', filed: 'Feb 3, 2025', folio: 'HD00234567' },
]

const STATUS_STYLES = {
  'In Progress': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  'Completed': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Under Review': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
}

export default function DashboardPage() {
  const [activeView, setActiveView] = useState('overview')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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
          <span className="font-display text-white text-base">Claim<span className="text-gold">360</span></span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <div className="text-[9px] font-semibold tracking-widest text-white/20 uppercase px-3 py-2 mt-2 mb-1">Dashboard</div>
          {SIDEBAR_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => item.href ? navigate(item.href) : setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/45 hover:bg-white/[0.07] hover:text-white/70'
              }`}
            >
              <item.icon size={16} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-gold text-navy-deep text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5 px-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy-deep font-bold font-display text-sm">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-white text-xs font-semibold truncate">{user?.name}</div>
              <div className="text-white/30 text-[10px] truncate">{user?.email || user?.phone}</div>
            </div>
          </div>
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
        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-navy-deep border-b border-slate-100 dark:border-white/[0.06] px-6 h-14 flex items-center justify-between">
          <h1 className="font-display text-navy dark:text-white text-lg">
            {SIDEBAR_ITEMS.find(i => i.id === activeView)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active Account
            </div>
            <div className="w-8 h-8 rounded-full bg-navy dark:bg-gold flex items-center justify-center text-white dark:text-navy-deep font-bold font-display text-xs">
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {activeView === 'overview' && (
            <>
              {/* KPIs */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: FileText, label: 'Active Cases', val: '3', change: '+1 this month', color: 'bg-blue-500/10 text-blue-500' },
                  { icon: CheckCircle, label: 'Completed', val: '1', change: '100% success', color: 'bg-emerald-500/10 text-emerald-500' },
                  { icon: TrendingUp, label: 'Total Value', val: '₹13.3L', change: 'In recovery', color: 'bg-gold/10 text-gold' },
                  { icon: Clock, label: 'Avg. Duration', val: '4.2 mo', change: 'Per case', color: 'bg-purple-500/10 text-purple-500' },
                ].map(k => (
                  <div key={k.label} className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${k.color} flex items-center justify-center`}>
                        <k.icon size={18} />
                      </div>
                    </div>
                    <div className="font-display text-navy dark:text-white text-2xl mb-0.5">{k.val}</div>
                    <div className="text-slate-500 dark:text-white/40 text-xs">{k.label}</div>
                    <div className="text-emerald-500 text-[10px] font-semibold mt-1">{k.change}</div>
                  </div>
                ))}
              </div>

              {/* Cases table */}
              <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 dark:border-white/[0.06] flex items-center justify-between">
                  <h2 className="font-display text-navy dark:text-white text-base">My Cases</h2>
                  <button onClick={() => setActiveView('cases')} className="text-xs text-slate-400 dark:text-white/30 hover:text-navy dark:hover:text-white transition-colors font-medium">
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-white/[0.02]">
                        {['Case ID', 'Company', 'Type', 'Value', 'Status', 'Filed'].map(h => (
                          <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 dark:text-white/30 uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MY_CASES.map((c, i) => (
                        <tr key={c.id} className={`${i < MY_CASES.length - 1 ? 'border-b border-slate-50 dark:border-white/[0.04]' : ''} hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors`}>
                          <td className="px-5 py-4 text-xs font-mono text-slate-400 dark:text-white/30">{c.id}</td>
                          <td className="px-5 py-4 text-sm font-medium text-navy dark:text-white">{c.company}</td>
                          <td className="px-5 py-4 text-sm text-slate-500 dark:text-white/50">{c.type}</td>
                          <td className="px-5 py-4 text-sm font-semibold text-navy dark:text-white">{c.amount}</td>
                          <td className="px-5 py-4">
                            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[c.status]}`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-400 dark:text-white/30">{c.filed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeView === 'cases' && (
            <div className="space-y-4">
              {MY_CASES.map(c => (
                <div key={c.id} className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display text-navy dark:text-white text-lg">{c.company}</span>
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                      </div>
                      <div className="text-slate-400 dark:text-white/30 text-xs mb-3">Case {c.id} · Folio {c.folio}</div>
                      <div className="flex flex-wrap gap-4">
                        <div><div className="text-[10px] text-slate-400 uppercase tracking-wider">Type</div><div className="text-sm text-navy dark:text-white font-medium">{c.type}</div></div>
                        <div><div className="text-[10px] text-slate-400 uppercase tracking-wider">Value</div><div className="text-sm text-navy dark:text-white font-semibold">{c.amount}</div></div>
                        <div><div className="text-[10px] text-slate-400 uppercase tracking-wider">Filed</div><div className="text-sm text-navy dark:text-white">{c.filed}</div></div>
                      </div>
                    </div>
                    <button className="text-slate-300 dark:text-white/20 hover:text-gold transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeView === 'settings' && (
            <div className="max-w-lg">
              <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl p-6">
                <h2 className="font-display text-navy dark:text-white text-xl mb-5">Account Settings</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', val: user?.name, type: 'text' },
                    { label: 'Email', val: user?.email, type: 'email' },
                    { label: 'Phone', val: user?.phone || 'Not set', type: 'tel' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-semibold text-navy dark:text-white/50 uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        defaultValue={f.val}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-navy dark:text-white text-sm outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  ))}
                  <button className="bg-gold hover:bg-gold-light text-navy-deep px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {(activeView === 'notifications') && (
            <div className="max-w-2xl">
              <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-2xl divide-y divide-slate-50 dark:divide-white/[0.05]">
                {[
                  { title: 'Case C001 Update', body: 'Your IEPF-5 form for Tata Motors has been processed by the registrar. Next step: Company verification.', time: '2h ago', unread: true },
                  { title: 'Document Required', body: 'Please upload your Aadhaar copy for case C003 (HDFC Bank). Link expired documents must be resubmitted.', time: '1 day ago', unread: true },
                  { title: 'Case C002 Completed', body: 'Your Reliance Industries share transfer has been successfully completed. Shares are now in your demat account.', time: '3 days ago', unread: false },
                ].map((n, i) => (
                  <div key={i} className={`flex gap-4 px-6 py-4 ${n.unread ? 'bg-gold/[0.02]' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.unread ? 'bg-gold' : 'bg-slate-200 dark:bg-white/10'}`} />
                    <div>
                      <div className="text-sm font-semibold text-navy dark:text-white mb-0.5">{n.title}</div>
                      <div className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{n.body}</div>
                      <div className="text-[10px] text-slate-300 dark:text-white/25 mt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
