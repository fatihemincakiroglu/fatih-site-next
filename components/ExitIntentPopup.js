import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SESSION_KEY = 'exit_popup_shown'

export default function ExitIntentPopup() {
  const router = useRouter()
  const isEn = router.pathname.startsWith('/en')
  const [visible, setVisible] = useState(false)
  const shownRef = useRef(false)

  useEffect(() => {
    // Zaten bu oturumda gösterildiyse veya iletişim/randevu sayfasındaysak hiç tetikleme
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SESSION_KEY)) return
    if (['/iletisim', '/randevu', '/en/contact', '/en/book-a-call'].includes(router.pathname)) return

    const trigger = () => {
      if (shownRef.current) return
      shownRef.current = true
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(true)
    }

    // 1) Masaüstünde: mouse üstten çıkarken (exit intent)
    const onMouseLeave = (e) => {
      if (e.clientY <= 0) trigger()
    }

    // 2) Mobil/genel: sayfanın %70'i okunduğunda
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      if (total > 0 && scrolled / total > 0.7) trigger()
    }

    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [router.pathname])

  if (!visible) return null

  const t = isEn ? {
    badge: 'BEFORE YOU GO',
    title: 'Want a free SEO audit?',
    desc: 'I\'ll review your site\'s technical SEO health and send you a short, actionable report — no strings attached.',
    btn: 'Get my free audit →',
    dismiss: 'No thanks, maybe later',
  } : {
    badge: 'GİTMEDEN ÖNCE',
    title: 'Ücretsiz SEO denetimi ister misiniz?',
    desc: 'Sitenizin teknik SEO durumunu inceleyip kısa, uygulanabilir bir rapor göndereyim — hiçbir şart yok.',
    btn: 'Ücretsiz denetimimi al →',
    dismiss: 'Hayır, belki sonra',
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setVisible(false)}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', animation: 'popupFade 0.25s ease' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: '20px', maxWidth: '420px', width: '100%', padding: '36px', position: 'relative', boxShadow: '0 24px 64px rgba(0,0,0,0.3)', animation: 'popupPop 0.3s ease' }}
      >
        <button onClick={() => setVisible(false)} aria-label="Kapat" style={{ position: 'absolute', top: '16px', right: '16px', width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: '#f5f5f5', color: '#999', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

        <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--orange)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>{t.badge}</div>
        <div style={{ fontSize: '38px', marginBottom: '12px' }}>🎯</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '10px', lineHeight: 1.3 }}>{t.title}</h3>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, marginBottom: '22px' }}>{t.desc}</p>

        <Link href={isEn ? '/en/book-a-call' : '/randevu'} onClick={() => setVisible(false)} style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: '10px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none', marginBottom: '10px', boxShadow: '0 4px 20px rgba(232,86,10,0.35)' }}>
          {t.btn}
        </Link>
        <button onClick={() => setVisible(false)} style={{ display: 'block', width: '100%', textAlign: 'center', padding: '8px', background: 'none', border: 'none', color: '#aaa', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
          {t.dismiss}
        </button>
      </div>
      <style jsx>{`
        @keyframes popupFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popupPop { from { opacity: 0; transform: scale(0.94) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  )
}
