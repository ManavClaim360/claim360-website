import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export default function MegaDropdown({ categories, activeTab, onTabChange }) {
  const activeCategory = categories.find(c => c.id === activeTab) || categories[0]

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-screen max-w-5xl z-50 animate-slide-in">
      <div className="bg-white dark:bg-navy-card border border-slate-100 dark:border-white/10 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden flex h-[520px]">
        
        {/* Left Sidebar - Categories */}
        <div className="w-[300px] border-r border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-navy-deep/30 p-6 flex flex-col gap-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative"
              onMouseEnter={() => onTabChange(cat.id)}
            >
              <button
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 text-left group
                  ${activeTab === cat.id 
                    ? 'bg-white dark:bg-white/10 shadow-sm text-navy dark:text-gold' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-navy dark:hover:text-white'
                  }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-transform duration-300
                  ${activeTab === cat.id ? 'bg-navy dark:bg-gold text-white dark:text-navy-deep scale-110' : 'bg-slate-100 dark:bg-white/5'}`}
                >
                  {activeTab === cat.id ? '-' : '+'}
                </div>
                <span className="font-semibold">{cat.label}</span>
              </button>

              {/* Sub-items with tree lines (only for active) */}
              {activeTab === cat.id && cat.items && (
                <div className="ml-8 mt-2 space-y-1 relative">
                  <div className="absolute left-[-18px] top-0 bottom-4 w-px bg-slate-200 dark:bg-white/10" />
                  {cat.items.map((sub, idx) => (
                    <div key={sub.label} className="relative group/sub">
                      <div className="absolute left-[-18px] top-4 w-4 h-px bg-slate-200 dark:bg-white/10 rounded-full" />
                      <a 
                        href={sub.href}
                        className="block px-4 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-white hover:bg-white dark:hover:bg-white/5 transition-all"
                      >
                        {sub.label}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-10 flex gap-8 relative overflow-hidden bg-white dark:bg-navy-card">
          <div className="flex-1 z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider mb-4">
              {activeCategory.label}
            </div>
            <h3 className="text-3xl font-display text-navy dark:text-white mb-4">
              {activeCategory.title || activeCategory.label}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-md">
              {activeCategory.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {activeCategory.features?.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {f}
                </div>
              ))}
            </div>

            <a 
              href={activeCategory.href || '#'}
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy dark:bg-gold text-white dark:text-navy-deep font-bold hover:opacity-90 transition-all group"
            >
              Explore Services
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="w-[340px] relative hidden xl:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-transparent rounded-3xl -rotate-6" />
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/mega-menu-featured.png" 
                alt="Featured" 
                className="w-full h-full object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </div>

          {/* Decorative background element */}
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-[80px]" />
        </div>
      </div>
    </div>
  )
}
