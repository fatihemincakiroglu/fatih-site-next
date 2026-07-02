import { useEffect, useRef, useState } from 'react'

export default function AnimatedBar({ percent, color, duration = 1000, height = 4 }) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setWidth(percent); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent])

  return (
    <div ref={ref} style={{ height: `${height}px`, background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${width}%`, background: color, borderRadius: '2px', transition: `width ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)` }} />
    </div>
  )
}
