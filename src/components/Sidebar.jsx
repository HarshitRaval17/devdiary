import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { label: 'Dashboard',  path: '/dashboard' },
  { label: 'My Logs',    path: '/logs' },
  { label: 'Add Log',    path: '/add-log' },
  { label: 'Goals',      path: '/goals' },
  { label: 'Profile',    path: '/profile' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggle, t } = useTheme()

  return (
    <div style={{
      width: '220px',
      minHeight: '100vh',
      background: t.sidebar,
      borderRight: `1px solid ${t.border}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      transition: 'background 0.2s, border-color 0.2s',
    }}>

      {/* Logo */}
      <div style={{ padding: '20px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: t.accent, flexShrink: 0 }} />
        <span style={{ color: t.accent, fontWeight: '700', fontSize: '18px', letterSpacing: '-0.3px' }}>DevDiary</span>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '10px', flex: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                padding: '10px 20px',
                fontSize: '13px',
                cursor: 'pointer',
                color: isActive ? t.accent : t.muted,
                background: isActive ? (isDark ? '#161B22' : '#EAF2FF') : 'transparent',
                borderLeft: `2px solid ${isActive ? t.accent : 'transparent'}`,
                transition: 'background 0.15s, color 0.15s',
                fontWeight: isActive ? '500' : '400',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = t.text }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = t.muted }}
            >
              {item.label}
            </div>
          )
        })}
      </div>

      {/* Theme Toggle */}
      <div style={{ padding: '16px 20px', borderTop: `1px solid ${t.border}` }}>
        <div
          onClick={toggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: '8px',
            background: isDark ? '#161B22' : '#F0F2F5',
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            marginBottom: '12px',
            transition: 'background 0.2s',
          }}>
          <span style={{ fontSize: '12px', color: t.muted }}>
            {isDark ? '🌙 Dark' : '☀️ Light'}
          </span>
          {/* Toggle pill */}
          <div style={{
            width: '32px', height: '18px', borderRadius: '10px',
            background: isDark ? t.accent : '#CBD5E1',
            position: 'relative', transition: 'background 0.2s',
          }}>
            <div style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: '#fff',
              position: 'absolute',
              top: '3px',
              left: isDark ? '17px' : '3px',
              transition: 'left 0.2s',
            }} />
          </div>
        </div>

        <div
          onClick={() => navigate('/')}
          style={{ padding: '8px 0', fontSize: '13px', color: t.muted, cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.color = t.text}
          onMouseLeave={e => e.currentTarget.style.color = t.muted}
        >
          Logout
        </div>
      </div>
    </div>
  )
}