import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../context/ThemeContext'

const seedLogs = [
  { id: 1, title: 'Built JWT auth middleware',       date: 'Today',     desc: 'Implemented refresh token rotation with Redis blacklist.',           tags: ['Node.js', 'JWT'],       mood: '😄', pinned: true  },
  { id: 2, title: 'Fixed React Router bug',          date: 'Yesterday', desc: 'Nested routes were not rendering correctly on refresh.',             tags: ['React', 'Bug Fix'],     mood: '😐', pinned: false },
  { id: 3, title: 'MongoDB aggregation pipeline',    date: 'May 12',    desc: 'Learned $lookup, $group and $project stages in depth.',             tags: ['MongoDB'],              mood: '😄', pinned: false },
  { id: 4, title: 'DSA - Binary Search trees',       date: 'May 11',    desc: 'Practiced inorder, preorder traversal problems on LeetCode.',       tags: ['DSA'],                  mood: '😫', pinned: false },
  { id: 5, title: 'Tailwind responsive layout',      date: 'May 10',    desc: 'Built fully responsive dashboard layout using Tailwind grid.',      tags: ['React', 'Tailwind'],    mood: '😄', pinned: false },
]

const ALL_TAGS = ['All', 'React', 'Node.js', 'MongoDB', 'DSA', 'JWT', 'Bug Fix', 'Tailwind']

export default function Logs() {
  const navigate = useNavigate()
  const { t } = useTheme()
  const [logs, setLogs] = useState(seedLogs)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const togglePin = (id) => {
    setLogs(prev => prev.map(l => l.id === id ? { ...l, pinned: !l.pinned } : l))
  }

  const applyFilters = (list) => list.filter(log => {
    const matchSearch = log.title.toLowerCase().includes(search.toLowerCase())
    const matchTag = activeTag === 'All' || log.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  const pinned   = applyFilters(logs.filter(l => l.pinned))
  const unpinned = applyFilters(logs.filter(l => !l.pinned))

  const LogCard = ({ log, i }) => (
    <motion.div
      key={log.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
      style={{
        background: t.surface,
        border: `1px solid ${log.pinned ? t.accent : t.border}`,
        borderLeft: log.pinned ? `3px solid ${t.accent}` : `1px solid ${t.border}`,
        borderRadius: '10px',
        padding: '16px 20px',
        transition: 'border-color 0.2s',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '14px', fontWeight: '500', color: t.text, flex: 1, marginRight: '12px' }}>
          {log.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Pin button */}
          <button
            onClick={() => togglePin(log.id)}
            title={log.pinned ? 'Unpin' : 'Pin this log'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '15px', opacity: log.pinned ? 1 : 0.35,
              transition: 'opacity 0.15s, transform 0.15s',
              transform: log.pinned ? 'rotate(-30deg)' : 'rotate(0deg)',
              padding: '2px',
              color: t.accent,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = log.pinned ? '1' : '0.35'}
          >
            📌
          </button>
          <span style={{ fontSize: '16px' }}>{log.mood}</span>
          <span style={{ fontSize: '11px', color: t.muted }}>{log.date}</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: t.muted, marginTop: '6px', lineHeight: '1.6' }}>{log.desc}</div>
      <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
        {log.tags.map((tag, j) => (
          <span key={j} style={{
            fontSize: '11px',
            background: t.accentBg,
            color: t.accent,
            padding: '3px 8px',
            borderRadius: '4px',
            fontWeight: '500',
          }}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div style={{ display: 'flex', backgroundColor: t.bg, color: t.text, minHeight: '100vh', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', flex: 1, padding: '28px 32px' }}>

        {/* Topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '600' }}>My Logs</h1>
          <button
            onClick={() => navigate('/add-log')}
            style={{ background: t.accent, color: '#0D1117', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            + New Log
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '10px 14px',
            background: t.surface,
            border: `1px solid ${t.borderHov}`,
            borderRadius: '8px', color: t.text,
            fontSize: '14px', outline: 'none',
            marginBottom: '16px', boxSizing: 'border-box',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = t.accent}
          onBlur={e => e.target.style.borderColor = t.borderHov}
        />

        {/* Tag Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {ALL_TAGS.map(tag => (
            <span
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: '5px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
                background: activeTag === tag ? t.accentBg : t.surface,
                border: `1px solid ${activeTag === tag ? t.accent : t.border}`,
                color: activeTag === tag ? t.accent : t.muted,
                transition: 'all 0.15s',
              }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Pinned section */}
        {pinned.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '11px', color: t.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📌 <span>Pinned</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pinned.map((log, i) => <LogCard key={log.id} log={log} i={i} />)}
            </div>
          </div>
        )}

        {/* All logs */}
        {unpinned.length === 0 && pinned.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No logs found</div>
            <div style={{ color: t.muted, fontSize: '14px', marginBottom: '24px' }}>
              {search ? `No results for "${search}"` : "You haven't added any logs yet. Start your journey!"}
            </div>
            <button
              onClick={() => navigate('/add-log')}
              style={{ background: t.accent, color: '#0D1117', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              + Add Your First Log
            </button>
          </motion.div>
        ) : (
          unpinned.length > 0 && (
            <div>
              {pinned.length > 0 && (
                <div style={{ fontSize: '11px', color: t.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>
                  All logs
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {unpinned.map((log, i) => <LogCard key={log.id} log={log} i={i} />)}
              </div>
            </div>
          )
        )}

      </div>
    </div>
  )
}