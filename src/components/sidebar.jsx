import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'My Logs', path: '/logs' },
  { label: 'Add Log', path: '/add-log' },
  { label: 'Profile', path: '/profile' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div style={{ width: '220px', minHeight: '100vh', background: '#0D1117', borderRight: '1px solid #21262D', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0 }}>

      {/* Logo */}
      <div style={{ padding: '20px', borderBottom: '1px solid #21262D', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#58A6FF', flexShrink: 0 }}></div>
        <span style={{ color: '#58A6FF', fontWeight: '600', fontSize: '18px' }}>DevDiary</span>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px', flex: 1 }}>
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
                color: isActive ? '#58A6FF' : '#8B949E',
                background: isActive ? '#161B22' : 'transparent',
                borderLeft: isActive ? '2px solid #58A6FF' : '2px solid transparent',
              }}>
              {item.label}
            </div>
          )
        })}
      </div>

      {/* Bottom */}
      <div style={{ padding: '0 20px 20px' }}>
        <div
          onClick={() => navigate('/')}
          style={{ padding: '10px 0', fontSize: '13px', color: '#8B949E', cursor: 'pointer' }}>
          Settings
        </div>
        <div
          onClick={() => navigate('/')}
          style={{ padding: '10px 0', fontSize: '13px', color: '#8B949E', cursor: 'pointer' }}>
          Logout
        </div>
      </div>
    </div>
  )
}