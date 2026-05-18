import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'

const initialLogs = [
  { title: 'Built JWT auth middleware', date: 'Today', desc: 'Implemented refresh token rotation with Redis blacklist.', tags: ['Node.js', 'JWT'], mood: '😄' },
  { title: 'Fixed React Router bug', date: 'Yesterday', desc: 'Nested routes were not rendering correctly on refresh.', tags: ['React', 'Bug Fix'], mood: '😐' },
  { title: 'MongoDB aggregation pipeline', date: 'May 12', desc: 'Learned $lookup, $group and $project stages in depth.', tags: ['MongoDB'], mood: '😄' },
  { title: 'DSA - Binary Search trees', date: 'May 11', desc: 'Practiced inorder, preorder traversal problems on LeetCode.', tags: ['DSA'], mood: '😫' },
  { title: 'Tailwind responsive layout', date: 'May 10', desc: 'Built fully responsive dashboard layout using Tailwind grid.', tags: ['React', 'Tailwind'], mood: '😄' },
]

const ALL_TAGS = ['All', 'React', 'Node.js', 'MongoDB', 'DSA', 'JWT', 'Bug Fix', 'Tailwind']

export default function Logs() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = initialLogs.filter(log => {
    const matchSearch = log.title.toLowerCase().includes(search.toLowerCase())
    const matchTag = activeTag === 'All' || log.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  return (
    <div style={{ display: 'flex', backgroundColor: '#0D1117', color: '#E6EDF3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', flex: 1, padding: '28px 32px' }}>

        {/* Topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '600' }}>My Logs</h1>
          <button
            onClick={() => navigate('/add-log')}
            style={{ background: '#58A6FF', color: '#0D1117', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            + New Log
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', background: '#161B22', border: '1px solid #30363D', borderRadius: '8px', color: '#E6EDF3', fontSize: '14px', outline: 'none', marginBottom: '16px', boxSizing: 'border-box' }}
          onFocus={e => e.target.style.borderColor = '#58A6FF'}
          onBlur={e => e.target.style.borderColor = '#30363D'}
        />

        {/* Tag Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {ALL_TAGS.map(tag => (
            <span
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: '5px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
                background: activeTag === tag ? '#1F3054' : '#161B22',
                border: `1px solid ${activeTag === tag ? '#58A6FF' : '#30363D'}`,
                color: activeTag === tag ? '#58A6FF' : '#8B949E',
              }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Logs List or Empty State */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No logs found</div>
            <div style={{ color: '#8B949E', fontSize: '14px', marginBottom: '24px' }}>
              {search ? `No results for "${search}"` : "You haven't added any logs yet. Start your journey!"}
            </div>
            <button
              onClick={() => navigate('/add-log')}
              style={{ background: '#58A6FF', color: '#0D1117', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              + Add Your First Log
            </button>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '10px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{log.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px' }}>{log.mood}</span>
                    <span style={{ fontSize: '11px', color: '#8B949E' }}>{log.date}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#8B949E', marginTop: '6px', lineHeight: '1.5' }}>{log.desc}</div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {log.tags.map((tag, j) => (
                    <span key={j} style={{ fontSize: '11px', background: '#1F3054', color: '#58A6FF', padding: '3px 8px', borderRadius: '4px', fontWeight: '500' }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}