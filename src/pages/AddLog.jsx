import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'

const TAGS = ['React', 'Node.js', 'MongoDB', 'Express', 'DSA', 'Tailwind', 'Bug Fix', 'JWT']

const MOODS = [
  { emoji: '😄', label: 'Productive' },
  { emoji: '😐', label: 'Average' },
  { emoji: '😫', label: 'Tough day' },
]

export default function AddLog() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', tags: [], mood: 'Productive', til: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const toggleTag = (tag) => {
    form.tags.includes(tag)
      ? setForm({ ...form, tags: form.tags.filter(t => t !== tag) })
      : setForm({ ...form, tags: [...form.tags, tag] })
  }

  const handleSubmit = () => {
    if (!form.title) {
      toast.error('Please add a title!')
      return
    }
    toast.success('Log saved successfully! 🚀')
    setTimeout(() => navigate('/dashboard'), 1500)
  }

  return (
    <div style={{ display: 'flex', backgroundColor: '#0D1117', color: '#E6EDF3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#161B22', color: '#E6EDF3', border: '1px solid #21262D' } }} />
      <Sidebar />

      <div style={{ marginLeft: '220px', flex: 1, padding: '28px 32px' }}>

        {/* Topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Add Today's Log</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ maxWidth: '640px' }}>

          {/* Title */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#8B949E', marginBottom: '6px' }}>Log title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What did you build or learn today?"
              style={{ width: '100%', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', padding: '10px 12px', color: '#E6EDF3', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#58A6FF'}
              onBlur={e => e.target.style.borderColor = '#30363D'}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#8B949E', marginBottom: '6px' }}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what you worked on, what you learned, any blockers..."
              rows={4}
              style={{ width: '100%', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', padding: '10px 12px', color: '#E6EDF3', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
              onFocus={e => e.target.style.borderColor = '#58A6FF'}
              onBlur={e => e.target.style.borderColor = '#30363D'}
            />
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#8B949E', marginBottom: '8px' }}>Tags</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    background: form.tags.includes(tag) ? '#1F3054' : '#0D1117',
                    border: `1px solid ${form.tags.includes(tag) ? '#58A6FF' : '#30363D'}`,
                    color: form.tags.includes(tag) ? '#58A6FF' : '#8B949E',
                    padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* TIL */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#8B949E', marginBottom: '6px' }}>Today's I Learned (TIL)</label>
            <input
              type="text"
              name="til"
              value={form.til}
              onChange={handleChange}
              placeholder="e.g. Learned about React memo and useMemo differences"
              style={{ width: '100%', background: '#0D1117', border: '1px solid #30363D', borderRadius: '6px', padding: '10px 12px', color: '#E6EDF3', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#58A6FF'}
              onBlur={e => e.target.style.borderColor = '#30363D'}
            />
          </div>

          {/* Mood */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#8B949E', marginBottom: '8px' }}>Mood / Productivity</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {MOODS.map((m) => (
                <div
                  key={m.label}
                  onClick={() => setForm({ ...form, mood: m.label })}
                  style={{
                    background: form.mood === m.label ? '#0D1B2E' : '#0D1117',
                    border: `1px solid ${form.mood === m.label ? '#58A6FF' : '#30363D'}`,
                    borderRadius: '8px', padding: '12px 20px', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  }}>
                  <span style={{ fontSize: '22px' }}>{m.emoji}</span>
                  <span style={{ fontSize: '12px', color: form.mood === m.label ? '#58A6FF' : '#8B949E' }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{ width: '100%', padding: '12px', background: '#58A6FF', color: '#0D1117', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Save Log 🚀
          </button>

        </motion.div>
      </div>
    </div>
  )
}