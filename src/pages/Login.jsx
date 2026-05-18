import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log('Login:', form)
    // Later: connect to backend API
    navigate('/dashboard')
  }

  return (
    <div style={{ backgroundColor: '#0D1117', color: '#E6EDF3', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <h1 style={{ color: '#58A6FF', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>DevDiary</h1>
        <p style={{ color: '#8B949E', textAlign: 'center', marginBottom: '32px' }}>Welcome back! Log in to continue.</p>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#8B949E' }}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '10px 14px', background: '#0D1117', border: '1px solid #21262D', borderRadius: '8px', color: '#E6EDF3', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#8B949E' }}>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            style={{ width: '100%', padding: '10px 14px', background: '#0D1117', border: '1px solid #21262D', borderRadius: '8px', color: '#E6EDF3', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          style={{ width: '100%', padding: '12px', background: '#58A6FF', color: '#0D1117', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Login
        </button>

        {/* Register Link */}
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#8B949E' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: '#58A6FF', cursor: 'pointer' }}>
            Register
          </span>
        </p>

      </motion.div>
    </div>
  )
}