import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export default function MegaDropdown({ categories, activeTab, onTabChange }) {
  const activeCategory = categories.find(c => c.id === activeTab) || categories[0]

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-screen max-w-5xl z-50 animate-slide-in">
      <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden flex" style={{ minHeight: '420px' }}>

        {/* Left Sidebar - Categories */}
        <div className="w-[280px] border-r border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-navy-deep/30 py-6 px-5 flex flex-col gap-1 overflow-y-auto">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id
            return (
              <div key={cat.id} onMouseEnter={() => onTabChange(cat.id)}>
                {/* Category Row */}
                <button
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left
                    ${isActive
                      ? 'text-navy dark:text-white font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                >
                  {/* +/- Circle Icon */}
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold leading-none transition-all duration-200
                      ${isActive
                        ? 'bg-navy dark:bg-gold text-white dark:text-navy-deep'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                      }`}
                  >
                    {isActive ? '−' : '+'}
                  </span>
                  <span className="text-sm font-semibold">{cat.label}</span>
                </button>

                {/* Sub-items with tree branch lines */}
                {isActive && cat.items && (
                  <div className="ml-[22px] mt-0.5 mb-2 relative">
                    {/* Vertical trunk line */}
                    <div className="absolute left-[10px] top-0 bottom-3 w-px bg-slate-300 dark:bg-white/15" />

                    {cat.items.map((sub, idx) => (
                      <div key={sub.label} className="relative flex items-center pl-8 group/sub">
                        {/* Horizontal branch line */}
                        <div className="absolute left-[10px] top-1/2 -translate-y-1/2 w-[18px] h-px bg-slate-300 dark:bg-white/15" />
                        {/* Arrow tip */}
                        <div className="absolute left-[25px] top-1/2 -translate-y-1/2 w-0 h-0"
                          style={{
                            borderTop: '3px solid transparent',
                            borderBottom: '3px solid transparent',
                            borderLeft: '4px solid #94a3b8',
                          }}
                        />
                        <a
                          href={sub.href}
                          className="block w-full px-3 py-2 rounded-lg text-[13px] text-slate-500 dark:text-slate-400
                            hover:text-navy dark:hover:text-white hover:bg-white dark:hover:bg-white/5
                            group-hover/sub:text-navy dark:group-hover/sub:text-white transition-all duration-150"
                        >
                          {sub.label}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex gap-6 p-8 relative overflow-hidden bg-white dark:bg-navy-card items-start">
          {/* Text Content */}
          <div className="flex-1 z-10 pt-2">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">
              {activeCategory.label}
            </p>
            <h3 className="text-2xl font-display text-navy dark:text-white mb-3 leading-snug">
              {activeCategory.title || activeCategory.label}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              {activeCategory.description}
            </p>

            <ul className="space-y-2 mb-8">
              {activeCategory.features?.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={activeCategory.href || '#'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy dark:bg-gold text-white dark:text-navy-deep text-sm font-bold hover:opacity-90 transition-all group"
            >
              Explore Services
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Featured Image Panel */}
          <div className="w-[300px] flex-shrink-0 hidden xl:flex items-center justify-center relative">
            {/* Soft gradient bg blob */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/10 via-transparent to-navy/5" />
            <div className="relative rounded-2xl overflow-hidden w-full aspect-[4/3] shadow-xl ring-1 ring-black/5">
              <img
                src="/images/mega-menu-featured.png"
                alt={activeCategory.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 dark:bg-navy-deep/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                  <p className="text-navy dark:text-white font-bold text-sm">{activeCategory.title}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 line-clamp-1">{activeCategory.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative background glow */}
          <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
