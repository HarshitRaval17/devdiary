import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import Heatmap from '../components/Heatmap'

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', backgroundColor: '#0D1117', color: '#E6EDF3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', flex: 1, padding: '28px 32px' }}>

        {/* Topbar */}
        <h1 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>My Profile</h1>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '10px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          
          {/* Avatar */}
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#1F6FEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
            HR
          </div>

          {/* Info */}
          <div>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>Harshit Raval</div>
            <div style={{ fontSize: '13px', color: '#58A6FF', marginTop: '2px' }}>devdiary.app/u/harshit</div>
            <div style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#3A1F00', border: '1px solid #6E3E00', color: '#D29922', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
              🔥 12 day streak
            </div>
          </div>

          {/* Right Info */}
          <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#8B949E', textAlign: 'right', lineHeight: '1.8' }}>
            MBIT, CVM University<br />
            IT Student · 2nd year<br />
            Joined Jan 2026
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { val: '47', label: 'Total Logs', color: '#58A6FF' },
            { val: '38', label: 'Coding Days', color: '#3FB950' },
            { val: '23', label: 'TILs Saved', color: '#D29922' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '700', color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '11px', color: '#8B949E', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '14px' }}>Activity Heatmap</div>
          <Heatmap />
        </motion.div>

        {/* Top Technologies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '14px' }}>Top Technologies</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { name: 'React', bg: '#1F3054', color: '#58A6FF' },
              { name: 'Node.js', bg: '#0E3320', color: '#3FB950' },
              { name: 'MongoDB', bg: '#3A1F00', color: '#D29922' },
              { name: 'DSA', bg: '#2A1F4A', color: '#BC8CFF' },
              { name: 'Tailwind', bg: '#0E3320', color: '#58C8E8' },
            ].map((t, i) => (
              <span key={i} style={{ fontSize: '13px', padding: '5px 12px', borderRadius: '4px', background: t.bg, color: t.color, fontWeight: '500' }}>
                {t.name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}