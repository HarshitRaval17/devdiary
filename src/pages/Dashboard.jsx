import Heatmap from '../components/Heatmap'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
import Sidebar from '../components/Sidebar'

const statCards = [
  { label: 'Total Logs', value: '47', sub: '+3 this week' },
  { label: 'Current Streak', value: '12 🔥', sub: 'days in a row' },
  { label: 'Coding Days', value: '38', sub: 'out of 60 days' },
  { label: 'Top Tech', value: 'React.js', sub: '18 entries' },
]

const pieData = [
  { name: 'React', value: 40 },
  { name: 'Node.js', value: 25 },
  { name: 'MongoDB', value: 20 },
  { name: 'DSA', value: 15 },
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
  { title: 'Built JWT auth middleware', date: 'Today', tags: ['Node.js', 'JWT'], mood: '😄', desc: 'Implemented refresh token rotation with Redis blacklist.' },
  { title: 'Fixed React Router Bug', date: 'Yesterday', tags: ['React', 'Bug Fix'], mood: '😐', desc: 'Nested routes were not rendering correctly on refresh.' },
  { title: 'MongoDB Aggregation Pipeline', date: 'May 12', tags: ['MongoDB'], mood: '😄', desc: 'Learned $lookup, $group and $project stages in depth.' },
  { title: 'DSA - Binary Search Trees', date: 'May 11', tags: ['DSA'], mood: '😫', desc: 'Practiced inorder, preorder traversal on LeetCode.' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', backgroundColor: '#0D1117', color: '#E6EDF3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      <Sidebar />

      <div style={{ marginLeft: '220px', flex: 1, padding: '28px 32px' }}>

        {/* Topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#8B949E', marginBottom: '2px' }}>Friday, May 15 2026</div>
            <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Good morning, Harshit 👋</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/add-log')}
              style={{ background: '#58A6FF', color: '#0D1117', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
              + New Log
            </button>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#1F6FEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', color: '#fff' }}>HR</div>
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
              style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontSize: '12px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: '#58A6FF', margin: '6px 0' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#3FB950' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '10px', padding: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Tech Stack Usage</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#161B22', border: '1px solid #21262D', color: '#E6EDF3' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '10px', padding: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Weekly Productivity</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={moodData}>
                <XAxis dataKey="day" stroke="#8B949E" />
                <YAxis stroke="#8B949E" domain={[0, 3]} ticks={[1, 2, 3]} tickFormatter={(v) => ['', '😫', '😐', '😄'][v]} />
                <Tooltip
                  contentStyle={{ background: '#161B22', border: '1px solid #21262D', color: '#E6EDF3' }}
                  formatter={(v) => [['', '😫 Tough', '😐 Average', '😄 Productive'][v], 'Mood']} />
                <Bar dataKey="mood" fill="#58A6FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

        </div>

        {/* Recent Logs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '14px' }}>Recent Logs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentLogs.map((log, i) => (
              <div key={i} style={{ background: '#161B22', border: '1px solid #21262D', borderRadius: '10px', padding: '14px 20px' }}>
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
              </div>
            ))}
          </div>
        </motion.div>
        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '28px', background: '#161B22', border: '1px solid #21262D', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Activity Heatmap</div>
          <Heatmap />
        </motion.div>
      </div>
    </div>
  )
}