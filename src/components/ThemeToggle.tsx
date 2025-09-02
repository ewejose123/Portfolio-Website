'use client'

import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      aria-label="Toggle theme"
      className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-card transition-all duration-200 font-medium text-muted-foreground hover:text-foreground"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}


