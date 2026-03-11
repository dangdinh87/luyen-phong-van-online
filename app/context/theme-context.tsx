'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always init 'light' to match SSR. The blocking script in layout.tsx
  // already sets data-theme on <html> so CSS is correct from first paint.
  // useEffect syncs React state with the actual DOM attribute after hydration.
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as Theme
    if (current && current !== theme) setTheme(current)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next)
      document.documentElement.setAttribute('data-theme', next)
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
