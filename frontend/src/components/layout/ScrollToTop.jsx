import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-[88px] left-4 z-50 w-10 h-10 rounded-full bg-navy dark:bg-gold border border-gold/30 dark:border-navy/30 flex items-center justify-center text-white dark:text-navy-deep shadow-lg hover:scale-110 hover:bg-gold hover:text-navy-deep dark:hover:bg-gold-light transition-all duration-200 lg:bottom-6 lg:left-6"
    >
      <ChevronUp size={18} />
    </button>
  )
}
