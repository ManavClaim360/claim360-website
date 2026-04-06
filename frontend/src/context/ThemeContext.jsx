import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('claim360-theme')
    return saved ? saved === 'dark' : false
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('claim360-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('claim360-theme', 'light')
    }
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, toggle: () => setIsDark(p => !p) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
