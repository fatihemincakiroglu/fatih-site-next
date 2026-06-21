import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MENU_TR = [
  { label: 'Hizmetler', url: '/hizmetler', altlar: [
    { label: 'SEO', url: '/seo', ikon: '🔍', alt: 'Teknik SEO ve içerik optimizasyonu' },
    { label: 'İçerik', url: '/icerik', ikon: '✍️', alt: 'İçerik stratejisi' },
    { label: 'Performans', url: '/performans', ikon: '📈', alt: 'Trafik ve dönüşüm optimizasyonu' },
    { label: 'GEO', url: '/geo', ikon: '🤖', alt: 'AI arama görünürlüğü' },
    { label: 'Backlink', url: '/backlink', ikon: '🔗', alt: 'Editoryal link ve dijital PR' },
  ]},
  { label: 'Hakkımda', url: '/hakkimda', altlar: [
    { label: 'Referanslar', url: '/referanslar', ikon: '⭐', alt: 'Müşteri yorumları' },
    { label: 'Vakalar', url: '/vakalar', ikon: '📊', alt: 'Vaka çalışmaları' },
  ]},
  { label: 'Kaynaklar', url: '/kaynaklar', altlar: [
    { label: 'SEO Rehberi', url: '/seo-rehberi', ikon: '📖', alt: 'SEO rehberleri' },
    { label: 'GEO Rehberi', url: '/geo-rehberi', ikon: '🤖', alt: 'GEO rehberi' },
    { label: 'AI Sözlük', url: '/ai-sozluk', ikon: '📚', alt: 'AI terimleri' },
    { label: 'SSS', url: '/sss', ikon: '❓', alt: 'Sık sorulan sorular' },
  ]},
  { label: 'Araçlar', url: '/araclar', altlar: [] },
  { label: 'Rehber', url: '/rehber', altlar: [] },
  { label: 'Blog', url: '/blog', altlar: [] },
]

const MENU_EN = [
  { label: 'Services', url: '/hizmetler', altlar: [
    { label: 'SEO', url: '/seo', ikon: '🔍', alt: 'Technical SEO & content optimization' },
    { label: 'Content', url: '/icerik', ikon: '✍️', alt: 'Content strategy' },
    { label: 'Performance', url: '/performans', ikon: '📈', alt: 'Traffic & conversion optimization' },
    { label: 'GEO', url: '/geo', ikon: '🤖', alt: 'AI search visibility' },
    { label: 'Backlink', url: '/backlink', ikon: '🔗', alt: 'Editorial links & digital PR' },
  ]},
  { label: 'About', url: '/hakkimda', altlar: [
    { label: 'Testimonials', url: '/referanslar', ikon: '⭐', alt: 'Client testimonials' },
    { label: 'Case Studies', url: '/vakalar', ikon: '📊', alt: 'Case studies' },
  ]},
  { label: 'Resources', url: '/kaynaklar', altlar: [
    { label: 'SEO Guide', url: '/seo-rehberi', ikon: '📖', alt: 'SEO guides' },
    { label: 'GEO Guide', url: '/geo-rehberi', ikon: '🤖', alt: 'GEO guide' },
    { label: 'AI Glossary', url: '/ai-sozluk', ikon: '📚', alt: 'AI terms' },
    { label: 'FAQ', url: '/sss', ikon: '❓', alt: 'Frequently asked questions' },
  ]},
  { label: 'Tools', url: '/araclar', altlar: [] },
  { label: 'Guides', url: '/rehber', altlar: [] },
  { label: 'Blog', url: '/blog', altlar: [] },
]

export default function Navbar() {
  const router = useRouter()
  const isEn = router.locale === 'en'
  const MENU = isEn ? MENU_EN : MENU_TR
  const [acik, setAcik] = useState(null)
  const [mobil, setMobil] = useState(false)
  const [mobilAcik, setMobilAcik] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const h = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setAcik(null)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobil(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobil ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobil])

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: '#fff', height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center', padding: '0 24px',
        borderBottom: '1px solid #ede8e0',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center' }}>
          <Link href="/" onClick={() => { setAcik(null); setMobil(false) }} style={{ display: 'flex', alignItems: 'center', marginRight: '28px', flexShrink: 0 }}>
            <img src="/logo.png" alt="Fatih Emin Çakıroğlu" style={{ height: '32px' }} />
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}>
            {MENU.map(item => (
              <div key={item.label} style={{ position: 'relative' }}>
                {item.altlar.length > 0 ? (
                  <button onClick={() => setAcik(acik === item.label ? null : item.label)} style={{
                    padding: '7px 12px', borderRadius: '8px', border: 'none',
                    background: acik === item.label ? '#f5f5f5' : 'transparent',
                    color: acik === item.label ? '#111' : '#555',
                    cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)',
                    display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500,
                  }}>
                    {item.label}
                    <span style={{ fontSize: '10px', transform: acik === item.label ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▾</span>
                  </button>
                ) : (
                  <Link href={item.url} onClick={() => setAcik(null)} style={{
                    padding: '7px 12px', borderRadius: '8px', color: '#555',
                    fontSize: '14px', fontFamily: 'var(--font-body)', display: 'inline-block', fontWeight: 500,
                  }}>{item.label}</Link>
                )}
                {item.altlar.length > 0 && acik === item.label && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                    background: '#fff', borderRadius: '12px', minWidth: '240px',
                    border: '1px solid #ede8e0', boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                    overflow: 'hidden', zIndex: 100,
                  }}>
                    <Link href={item.url} onClick={() => setAcik(null)} style={{
                      display: 'block', padding: '12px 16px', fontSize: '11px',
                      color: '#bbb', borderBottom: '1px solid #f0f0f0',
                      fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                    }}>{isEn ? `All ${item.label}` : `Tüm ${item.label}`} →</Link>
                    {item.altlar.map(alt => (
                      <Link key={alt.label} href={alt.url} onClick={() => setAcik(null)}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 16px' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ fontSize: '16px', flexShrink: 0 }}>{alt.ikon}</span>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '2px' }}>{alt.label}</div>
                          <div style={{ fontSize: '12px', color: '#aaa' }}>{alt.alt}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lang switcher + Desktop CTA */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <Link href={router.asPath} locale="tr"
              style={{ padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700,
                background: !isEn ? 'var(--orange)' : 'transparent',
                color: !isEn ? '#fff' : '#aaa',
                border: !isEn ? 'none' : '1px solid #eee',
                fontFamily: 'var(--font-body)' }}>TR</Link>
            <Link href={router.asPath} locale="en"
              style={{ padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700,
                background: isEn ? 'var(--orange)' : 'transparent',
                color: isEn ? '#fff' : '#aaa',
                border: isEn ? 'none' : '1px solid #eee',
                fontFamily: 'var(--font-body)', marginRight: '8px' }}>EN</Link>
            <Link href="/iletisim" onClick={() => setAcik(null)}
              style={{ padding: '9px 20px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
              {isEn ? 'Contact' : 'İletişim'}
            </Link>
          </div>

          {/* Mobile */}
          <div className="mobile-nav" style={{ display: 'none', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <Link href={router.asPath} locale="tr" style={{ padding: '4px 8px', borderRadius: '5px', fontSize: '11px', fontWeight: 700, background: !isEn ? 'var(--orange)' : '#f0f0f0', color: !isEn ? '#fff' : '#555' }}>TR</Link>
            <Link href={router.asPath} locale="en" style={{ padding: '4px 8px', borderRadius: '5px', fontSize: '11px', fontWeight: 700, background: isEn ? 'var(--orange)' : '#f0f0f0', color: isEn ? '#fff' : '#555' }}>EN</Link>
            <Link href="/iletisim" onClick={() => setMobil(false)} style={{ padding: '7px 14px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 600 }}>{isEn ? 'Contact' : 'İletişim'}</Link>
            <button onClick={() => setMobil(!mobil)} aria-label="Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ display: 'block', width: '22px', height: '2px', background: '#333', borderRadius: '2px', transition: 'all 0.2s', transform: mobil ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: '22px', height: '2px', background: '#333', borderRadius: '2px', transition: 'all 0.2s', opacity: mobil ? 0 : 1 }} />
              <span style={{ display: 'block', width: '22px', height: '2px', background: '#333', borderRadius: '2px', transition: 'all 0.2s', transform: mobil ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobil && (
        <div style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, bottom: 0,
          background: '#fff', zIndex: 999, overflowY: 'auto',
          padding: '16px 20px 40px', borderTop: '1px solid #ede8e0',
        }}>
          {MENU.map(item => (
            <div key={item.label}>
              {item.altlar.length > 0 ? (
                <>
                  <button onClick={() => setMobilAcik(mobilAcik === item.label ? null : item.label)}
                    style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', color: '#111', fontSize: '16px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', borderBottom: '1px solid #f0f0f0' }}>
                    {item.label}
                    <span style={{ transition: 'transform 0.2s', transform: mobilAcik === item.label ? 'rotate(180deg)' : 'none', color: '#aaa' }}>▾</span>
                  </button>
                  {mobilAcik === item.label && (
                    <div style={{ paddingLeft: '12px', paddingBottom: '8px' }}>
                      <Link href={item.url} onClick={() => setMobil(false)} style={{ display: 'block', padding: '10px 0', color: 'var(--orange)', fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #f0f0f0' }}>
                        {isEn ? `All ${item.label}` : `Tüm ${item.label}`} →
                      </Link>
                      {item.altlar.map(alt => (
                        <Link key={alt.label} href={alt.url} onClick={() => setMobil(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #faf9f7' }}>
                          <span style={{ fontSize: '18px' }}>{alt.ikon}</span>
                          <span style={{ fontSize: '14px', color: '#444' }}>{alt.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.url} onClick={() => setMobil(false)} style={{ display: 'block', padding: '14px 0', color: '#111', fontSize: '16px', fontWeight: 600, borderBottom: '1px solid #f0f0f0' }}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  )
}
