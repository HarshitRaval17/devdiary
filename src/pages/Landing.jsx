import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#0D1117', color: '#E6EDF3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderBottom: '1px solid #21262D' }}>
        <h1 style={{ color: '#58A6FF', fontSize: '24px', fontWeight: 'bold' }}>DevDiary</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => navigate('/login')}
            style={{ background: 'transparent', border: '1px solid #58A6FF', color: '#58A6FF', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}>
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{ background: '#58A6FF', border: 'none', color: '#0D1117', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', padding: '100px 20px 60px' }}>
        <h2 style={{ fontSize: '52px', fontWeight: 'bold', lineHeight: 1.2 }}>
          Track Your Dev Journey.<br />
          <span style={{ color: '#58A6FF' }}>Every Single Day.</span>
        </h2>
        <p style={{ color: '#8B949E', fontSize: '18px', marginTop: '20px', maxWidth: '500px', margin: '20px auto' }}>
          Log your daily coding sessions, track streaks, analyze your tech stack, and grow as a developer.
        </p>
        <button
          onClick={() => navigate('/register')}
          style={{ marginTop: '32px', background: '#58A6FF', color: '#0D1117', padding: '14px 36px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Start Logging Free →
        </button>
      </motion.div>

      {/* Features Section */}
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '48px' }}>Everything a Developer Needs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { icon: '📝', title: 'Daily Logs', desc: 'Create, edit and delete your daily coding entries with tags and mood.' },
            { icon: '🔥', title: 'Streak System', desc: 'Stay consistent. Track your coding streak like GitHub contributions.' },
            { icon: '📊', title: 'Tech Analytics', desc: 'See pie charts of your most used technologies over time.' },
            { icon: '🗓️', title: 'Heatmap', desc: 'Visual heatmap of all your coding days, just like GitHub.' },
            { icon: '😄', title: 'Mood Tracking', desc: 'Log your productivity mood and see weekly charts.' },
            { icon: '💡', title: 'TIL Notes', desc: 'Quick "Today I Learned" section for mini notes.' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '12px', padding: '28px 20px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{f.title}</h4>
              <p style={{ color: '#8B949E', fontSize: '14px' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ textAlign: 'center', padding: '60px 20px', borderTop: '1px solid #21262D' }}>
        <h3 style={{ fontSize: '32px', fontWeight: 'bold' }}>Ready to start your dev journal?</h3>
        <p style={{ color: '#8B949E', marginTop: '12px' }}>Join developers who track their growth every day.</p>
        <button
          onClick={() => navigate('/register')}
          style={{ marginTop: '24px', background: '#58A6FF', color: '#0D1117', padding: '14px 36px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Get Started →
        </button>
      </motion.div>

    </div>
  )
}