export default function Heatmap() {
  const days = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun']
  const weeks = 16

  const data = Array.from({ length: weeks * 7 }, () =>
    Math.random() < 0.35 ? 0 : Math.ceil(Math.random() * 4)
  )

  const colors = ['#21262D', '#0E4429', '#006D32', '#26A641', '#39D353']

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', gap: '3px' }}>

        {/* Day labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '18px' }}>
          {days.map((d, i) => (
            <div key={i} style={{ height: '13px', width: '24px', fontSize: '10px', color: '#8B949E', textAlign: 'right', lineHeight: '13px' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        {Array.from({ length: weeks }, (_, col) => (
          <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {Array.from({ length: 7 }, (_, row) => {
              const val = data[col * 7 + row]
              return (
                <div
                  key={row}
                  title={`${val} contributions`}
                  style={{
                    width: '13px',
                    height: '13px',
                    borderRadius: '2px',
                    background: colors[val] || colors[0],
                  }}
                />
              )
            })}
          </div>
        ))}

      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '11px', color: '#8B949E' }}>Less</span>
        {colors.map((c, i) => (
          <div key={i} style={{ width: '11px', height: '11px', borderRadius: '2px', background: c }} />
        ))}
        <span style={{ fontSize: '11px', color: '#8B949E' }}>More</span>
      </div>
    </div>
  )
}