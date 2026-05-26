import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../context/ThemeContext'

const seedGoals = [
  { id: 1, text: 'Log every day this week',   target: 7, current: 5 },
  { id: 2, text: 'Add 3 TILs',                target: 3, current: 3 },
  { id: 3, text: 'Explore a new technology',  target: 1, current: 0 },
  { id: 4, text: 'Solve 5 DSA problems',      target: 5, current: 2 },
]

function GoalCard({ goal, t, onIncrement, onDecrement, onDelete, index }) {
  const pct = Math.min(100, Math.round((goal.current / goal.target) * 100))
  const done = goal.current >= goal.target

  const barColor = done ? '#3FB950' : t.accent

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      style={{
        background: t.surface,
        border: `1px solid ${done ? '#3FB950' : t.border}`,
        borderRadius: '10px',
        padding: '18px 20px',
        transition: 'border-color 0.2s',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <span style={{ fontSize: '16px' }}>{done ? '✅' : '🎯'}</span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: t.text }}>{goal.text}</span>
        </div>
        <button
          onClick={() => onDelete(goal.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, fontSize: '16px', padding: '0 0 0 10px', opacity: 0.5, transition: 'opacity 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
          title="Remove goal"
        >✕</button>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#21262D', borderRadius: '4px', height: '6px', marginBottom: '10px', overflow: 'hidden' }}>
        <div style={{
          height: '6px', borderRadius: '4px',
          background: barColor,
          width: `${pct}%`,
          transition: 'width 0.4s ease',
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: done ? '#3FB950' : t.muted }}>
          {done ? 'Completed!' : `${goal.current} / ${goal.target}`}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onDecrement(goal.id)}
            disabled={goal.current <= 0}
            style={{
              width: '26px', height: '26px', borderRadius: '6px',
              background: t.surface, border: `1px solid ${t.border}`,
              color: t.muted, fontSize: '16px', cursor: goal.current > 0 ? 'pointer' : 'not-allowed',
              opacity: goal.current > 0 ? 1 : 0.3,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (goal.current > 0) e.currentTarget.style.background = '#21262D' }}
            onMouseLeave={e => e.currentTarget.style.background = t.surface}
          >−</button>
          <span style={{ fontSize: '13px', fontWeight: '600', color: t.accent, minWidth: '16px', textAlign: 'center' }}>{goal.current}</span>
          <button
            onClick={() => onIncrement(goal.id)}
            disabled={done}
            style={{
              width: '26px', height: '26px', borderRadius: '6px',
              background: done ? t.surface : t.accentBg,
              border: `1px solid ${done ? t.border : t.accent}`,
              color: done ? t.muted : t.accent, fontSize: '16px', cursor: done ? 'not-allowed' : 'pointer',
              opacity: done ? 0.4 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >+</button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Goals() {
  const { t } = useTheme()
  const [goals, setGoals] = useState(seedGoals)
  const [newText, setNewText] = useState('')
  const [newTarget, setNewTarget] = useState(1)
  const [adding, setAdding] = useState(false)

  const completed = goals.filter(g => g.current >= g.target).length
  const total = goals.length

  const increment = (id) => setGoals(p => p.map(g => g.id === id ? { ...g, current: Math.min(g.target, g.current + 1) } : g))
  const decrement = (id) => setGoals(p => p.map(g => g.id === id ? { ...g, current: Math.max(0, g.current - 1) } : g))
  const deleteGoal = (id) => setGoals(p => p.filter(g => g.id !== id))

  const addGoal = () => {
    if (!newText.trim()) return
    setGoals(p => [...p, { id: Date.now(), text: newText.trim(), target: Math.max(1, newTarget), current: 0 }])
    setNewText('')
    setNewTarget(1)
    setAdding(false)
  }

  return (
    <div style={{ display: 'flex', backgroundColor: t.bg, color: t.text, minHeight: '100vh', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', flex: 1, padding: '28px 32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '2px' }}>Goals</h1>
            <div style={{ fontSize: '12px', color: t.muted }}>Track your weekly coding targets</div>
          </div>
          <button
            onClick={() => setAdding(a => !a)}
            style={{ background: t.accent, color: '#0D1117', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            {adding ? '✕ Cancel' : '+ Add Goal'}
          </button>
        </div>

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: t.muted }}>Weekly progress</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: completed === total && total > 0 ? '#3FB950' : t.accent }}>
                {completed} / {total} goals done
              </span>
            </div>
            <div style={{ background: '#21262D', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
              <div style={{
                height: '8px', borderRadius: '4px',
                background: completed === total && total > 0 ? '#3FB950' : t.accent,
                width: total > 0 ? `${Math.round((completed / total) * 100)}%` : '0%',
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: completed === total && total > 0 ? '#3FB950' : t.accent, minWidth: '52px', textAlign: 'right' }}>
            {total > 0 ? `${Math.round((completed / total) * 100)}%` : '0%'}
          </div>
        </motion.div>

        {/* Add goal form */}
        {adding && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: t.surface, border: `1px solid ${t.accent}`, borderRadius: '10px', padding: '18px 20px', marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '12px', color: t.accent }}>New goal</div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', color: t.muted, marginBottom: '6px' }}>Goal description</div>
                <input
                  type="text"
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addGoal()}
                  placeholder="e.g. Solve 10 LeetCode problems"
                  style={{
                    width: '100%', padding: '9px 12px',
                    background: t.bg, border: `1px solid ${t.border}`,
                    borderRadius: '7px', color: t.text,
                    fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.border}
                  autoFocus
                />
              </div>
              <div style={{ width: '90px' }}>
                <div style={{ fontSize: '11px', color: t.muted, marginBottom: '6px' }}>Target count</div>
                <input
                  type="number"
                  min="1"
                  value={newTarget}
                  onChange={e => setNewTarget(parseInt(e.target.value) || 1)}
                  style={{
                    width: '100%', padding: '9px 12px',
                    background: t.bg, border: `1px solid ${t.border}`,
                    borderRadius: '7px', color: t.text,
                    fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.border}
                />
              </div>
              <button
                onClick={addGoal}
                style={{ padding: '9px 18px', background: t.accent, color: '#0D1117', border: 'none', borderRadius: '7px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Add
              </button>
            </div>
          </motion.div>
        )}

        {/* Goal cards */}
        {goals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No goals yet</div>
            <div style={{ color: t.muted, fontSize: '14px' }}>Add your first weekly goal to start tracking your progress.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {goals.map((g, i) => (
              <GoalCard key={g.id} goal={g} t={t} index={i} onIncrement={increment} onDecrement={decrement} onDelete={deleteGoal} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}