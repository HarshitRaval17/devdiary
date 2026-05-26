import Heatmap from '../components/Heatmap'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../context/ThemeContext'

const statCards = [
  { label: 'Total Logs',      value: '47',       sub: '+3 this week' },
  { label: 'Current Streak',  value: '12 🔥',    sub: 'days in a row' },
  { label: 'Coding Days',     value: '38',        sub: 'out of 60 days' },
  { label: 'Top Tech',        value: 'React.js',  sub: '18 entries' },
]

const pieData = [
  { name: 'React',   value: 40 },
  { name: 'Node.js', value: 25 },
  { name: 'MongoDB', value: 20 },
  { name: 'DSA',     value: 15 },
]

const COLORS = ['#58A6FF', '#3FB950', '#F78166', '#D2A8FF']

const moodData = [
  { day: 'Mon', mood: 3 },
  { day: 'Tue', mood: 2 },
  { day: 'Wed', mood: 3 },
  { day: 'Thu', mood: 1 },
  { day: 'Fri', mood: 3 },
  { day: 'Sat', mood: 2 },
  { day: 'Sun', mood: 3 },
]

const recentLogs = [
  { title: 'Built JWT auth middleware',        date: 'Today',     tags: ['Node.js', 'JWT'],    mood: '😄', desc: 'Implemented refresh token rotation with Redis blacklist.',       pinned: true  },
  { title: 'Fixed React Router Bug',           date: 'Yesterday', tags: ['React', 'Bug Fix'],  mood: '😐', desc: 'Nested routes were not rendering correctly on refresh.',         pinned: false },
  { title: 'MongoDB Aggregation Pipeline',     date: 'May 12',    tags: ['MongoDB'],           mood: '😄', desc: 'Learned $lookup, $group and $project stages in depth.',         pinned: false },
  { title: 'DSA - Binary Search Trees',        date: 'May 11',    tags: ['DSA'],               mood: '😫', desc: 'Practiced inorder, preorder traversal on LeetCode.',           pinned: false },
]

const weekDigest = {
  logs:        5,
  streak:      7,
  tils:        4,
  goalsDone:   3,
  totalGoals:  4,
  topTags:     [{ name: 'React', count: 8 }, { name: 'TypeScript', count: 5 }, { name: 'Node.js', count: 3 }],
  bestDay:     'Wednesday',
  bestMood:    'great',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { t, isDark } = useTheme()

  const cardStyle = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: '10px',
    padding: '20px',
    transition: 'background 0.2s, border-color 0.2s',
  }

  return (
    <div style={{ display: 'flex', backgroundColor: t.bg, color: t.text, minHeight: '100vh', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}>

      <Sidebar />

      <div style={{ marginLeft: '220px', flex: 1, padding: '28px 32px' }}>

        {/* Topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{ fontSize: '12px', color: t.muted, marginBottom: '2px' }}>Friday, May 15 2026</div>
            <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Good morning, Harshit 👋</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/add-log')}
              style={{ background: t.accent, color: '#0D1117', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
              + New Log
            </button>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#1F6FEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', color: '#fff' }}>
              HR
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {statCards.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ ...cardStyle, padding: '18px' }}>
              <div style={{ fontSize: '12px', color: t.muted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: t.accent, margin: '6px 0' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: t.green }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={cardStyle}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Tech Stack Usage</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, color: t.text }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={cardStyle}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Weekly Productivity</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={moodData}>
                <XAxis dataKey="day" stroke={t.muted} />
                <YAxis stroke={t.muted} domain={[0, 3]} ticks={[1, 2, 3]} tickFormatter={(v) => ['', '😫', '😐', '😄'][v]} />
                <Tooltip
                  contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, color: t.text }}
                  formatter={(v) => [['', '😫 Tough', '😐 Average', '😄 Productive'][v], 'Mood']} />
                <Bar dataKey="mood" fill={t.accent} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

        </div>

        {/* Pinned log callout (if any) */}
        {recentLogs.some(l => l.pinned) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: t.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📌 <span>Pinned</span>
            </div>
            {recentLogs.filter(l => l.pinned).map((log, i) => (
              <div key={i} style={{
                ...cardStyle,
                padding: '14px 20px',
                borderLeft: `3px solid ${t.accent}`,
                borderRadius: '0 10px 10px 0',
                marginBottom: '8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{log.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px' }}>{log.mood}</span>
                    <span style={{ fontSize: '11px', color: t.muted }}>{log.date}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: t.muted, marginTop: '5px', lineHeight: '1.5' }}>{log.desc}</div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {log.tags.map((tag, j) => (
                    <span key={j} style={{ fontSize: '11px', background: t.accentBg, color: t.accent, padding: '3px 8px', borderRadius: '4px', fontWeight: '500' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Recent Logs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '14px' }}>Recent Logs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentLogs.filter(l => !l.pinned).map((log, i) => (
              <div key={i} style={{ ...cardStyle, padding: '14px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{log.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px' }}>{log.mood}</span>
                    <span style={{ fontSize: '11px', color: t.muted }}>{log.date}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: t.muted, marginTop: '6px', lineHeight: '1.5' }}>{log.desc}</div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {log.tags.map((tag, j) => (
                    <span key={j} style={{ fontSize: '11px', background: t.accentBg, color: t.accent, padding: '3px 8px', borderRadius: '4px', fontWeight: '500' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '28px', ...cardStyle }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Activity Heatmap</div>
          <Heatmap />
        </motion.div>

        {/* Weekly Digest */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ marginTop: '24px', ...cardStyle }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>Weekly Digest</div>
            <span style={{ fontSize: '11px', color: t.muted, background: isDark ? '#21262D' : '#F0F2F5', padding: '3px 10px', borderRadius: '20px' }}>
              May 19 – 25
            </span>
          </div>

          {/* Stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              { label: 'Logs',       value: weekDigest.logs      },
              { label: 'Streak',     value: `🔥 ${weekDigest.streak}` },
              { label: 'TILs',       value: weekDigest.tils      },
              { label: 'Goals done', value: `${weekDigest.goalsDone}/${weekDigest.totalGoals}` },
            ].map((s, i) => (
              <div key={i} style={{ background: isDark ? '#0D1117' : '#F6F8FA', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: '700', color: t.text }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: t.muted, marginTop: '3px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Top tags */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: t.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Top tags this week</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {weekDigest.topTags.map((tag, i) => (
                <span key={i} style={{ fontSize: '12px', background: t.accentBg, color: t.accent, padding: '4px 10px', borderRadius: '5px', fontWeight: '500' }}>
                  {tag.name} ×{tag.count}
                </span>
              ))}
            </div>
          </div>

          {/* Best day */}
          <div style={{ background: isDark ? '#0D1117' : '#F6F8FA', borderRadius: '8px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>🏆</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: t.text }}>Best day — {weekDigest.bestDay}</div>
              <div style={{ fontSize: '12px', color: t.muted, marginTop: '2px' }}>3 logs · mood: {weekDigest.bestMood}</div>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  )
}