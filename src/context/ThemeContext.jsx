import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('devdiary-theme')
    return saved !== null ? saved === 'dark' : true
  })

  useEffect(() => {
    localStorage.setItem('devdiary-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggle = () => setIsDark(p => !p)

  const t = isDark ? {
    bg:        '#0D1117',
    surface:   '#161B22',
    border:    '#21262D',
    borderHov: '#30363D',
    text:      '#E6EDF3',
    muted:     '#8B949E',
    accent:    '#58A6FF',
    accentBg:  '#1F3054',
    green:     '#3FB950',
    sidebar:   '#0D1117',
  } : {
    bg:        '#F6F8FA',
    surface:   '#FFFFFF',
    border:    '#D0D7DE',
    borderHov: '#B0BAC4',
    text:      '#1F2328',
    muted:     '#636E7B',
    accent:    '#0969DA',
    accentBg:  '#DDF4FF',
    green:     '#1A7F37',
    sidebar:   '#FFFFFF',
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle, t }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

