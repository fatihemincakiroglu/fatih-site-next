import { useEffect, useRef, useState } from 'react'

// "150+", "%312", "18.400/ay", "₺280K/ay", "-73%", "3.2", "∞" gibi
// hazır-formatlı string'leri parçalayıp sayısal kısmı 0'dan hedefe saydırır.
function parseValue(raw) {
  const str = String(raw)
  const m = str.match(/^([^\d]*)([\d.,]+)([^\d]*)$/)
  if (!m) return null
  const [, prefix, num] = m
  const suffix = m[3]

  // "18.400" / "70.000" gibi binlik nokta ayracı (3'erli gruplar)
  if (/^\d{1,3}(\.\d{3})+$/.test(num)) {
    return { prefix, suffix, target: parseInt(num.replace(/\./g, ''), 10), decimals: 0, thousands: true }
  }
  // "3.2" / "1.2" gibi ondalık sayı
  if (/^\d+\.\d{1,2}$/.test(num)) {
    return { prefix, suffix, target: parseFloat(num), decimals: num.split('.')[1].length, thousands: false }
  }
  return { prefix, suffix, target: parseInt(num.replace(/[^\d]/g, ''), 10) || 0, decimals: 0, thousands: false }
}

export default function CountUp({ value, duration = 1200, locale = 'tr-TR' }) {
  const ref = useRef(null)
  const parsed = parseValue(value)
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value)

  useEffect(() => {
    if (!parsed) { setDisplay(value); return }
    let raf
    let start = null
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const step = (ts) => {
        if (start === null) start = ts
        const progress = Math.min(1, (ts - start) / duration)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = parsed.target * eased
        const formatted = parsed.decimals > 0
          ? current.toFixed(parsed.decimals)
          : Math.round(current).toLocaleString(locale)
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`)
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => { obs.disconnect(); if (raf) cancelAnimationFrame(raf) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span ref={ref}>{display}</span>
}
