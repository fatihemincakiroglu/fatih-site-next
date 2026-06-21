import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const MENU = [
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

export default function Navbar() {
  const [acik, setAcik] = useState(null)
  const [mobil, setMobil] = useState(false)
  const [mobilAcik, setMobilAcik] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const h = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setAcik(null)
      }
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMobil(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobil ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobil])

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: '#1a1612', height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center', padding: '0 20px',
        borderBottom: '1px solid #2a2520',
      }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <Link href="/" onClick={() => { setAcik(null); setMobil(false) }} style={{ display: 'flex', alignItems: 'center', marginRight: '32px', flexShrink: 0 }}>
            <img src="/logo.png" alt="Fatih Emin Çakıroğlu" style={{ height: '34px', filter: 'invert(1) brightness(2)' }} />
          </Link>

          {/* Desktop Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, '@media(max-width:768px)': { display: 'none' } }}
            className="desktop-nav">
            {MENU.map(item => (
              <div key={item.label} style={{ position: 'relative' }}>
                {item.altlar.length > 0 ? (
                  <button onClick={() => setAcik(acik === item.label ? null : item.label)} style={{
                    padding: '7px 12px', borderRadius: '8px', border: 'none',
                    background: acik === item.label ? '#2a2520' : 'transparent',
                    color: acik === item.label ? '#fff' : '#9a9a9a',
                    cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    {item.label}
                    <span style={{ fontSize: '10px', transform: acik === item.label ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▾</span>
                  </button>
                ) : (
                  <Link href={item.url} onClick={() => setAcik(null)} style={{
                    padding: '7px 12px', borderRadius: '8px', color: '#9a9a9a',
                    fontSize: '14px', fontFamily: 'var(--font-body)', display: 'inline-block',
                  }}>{item.label}</Link>
                )}
                {item.altlar.length > 0 && acik === item.label && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 12px)', left: 0,
                    background: '#1c1914', borderRadius: '12px', minWidth: '240px',
                    border: '1px solid #2a2520', boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                    overflow: 'hidden', zIndex: 100,
                  }}>
                    <Link href={item.url} onClick={() => setAcik(null)} style={{
                      display: 'block', padding: '12px 16px', fontSize: '12px',
                      color: '#4a4540', borderBottom: '1px solid #2a2520',
                      fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                    }}>Tüm {item.label} →</Link>
                    {item.altlar.map(alt => (
                      <Link key={alt.label} href={alt.url} onClick={() => setAcik(null)}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 16px' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#231f1a'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ fontSize: '16px', flexShrink: 0 }}>{alt.ikon}</span>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>{alt.label}</div>
                          <div style={{ fontSize: '12px', color: '#6b6b6b' }}>{alt.alt}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link href="/iletisim" onClick={() => setAcik(null)}
            className="desktop-nav"
            style={{ padding: '9px 20px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', flexShrink: 0 }}>
            İletişim
          </Link>

          {/* Mobile: CTA + Hamburger */}
          <div className="mobile-nav" style={{ display: 'none', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
            <Link href="/iletisim" onClick={() => setMobil(false)} style={{
              padding: '7px 14px', borderRadius: '8px', background: 'var(--orange)',
              color: '#fff', fontSize: '13px', fontWeight: 600,
            }}>İletişim</Link>
            <button
              onClick={() => setMobil(!mobil)}
              aria-label="Menüyü aç/kapat"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px', display: 'flex', flexDirection: 'column',
                gap: '5px', justifyContent: 'center',
              }}
            >
              <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '2px', transition: 'all 0.2s', transform: mobil ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '2px', transition: 'all 0.2s', opacity: mobil ? 0 : 1 }} />
              <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '2px', transition: 'all 0.2s', transform: mobil ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobil && (
        <div style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, bottom: 0,
          background: '#1a1612', zIndex: 999, overflowY: 'auto',
          padding: '16px 20px 40px',
        }}>
          {MENU.map(item => (
            <div key={item.label}>
              {item.altlar.length > 0 ? (
                <>
                  <button
                    onClick={() => setMobilAcik(mobilAcik === item.label ? null : item.label)}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 0', color: '#fff', fontSize: '16px',
                      fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
                      borderBottom: '1px solid #2a2520',
                    }}
                  >
                    {item.label}
                    <span style={{ transition: 'transform 0.2s', transform: mobilAcik === item.label ? 'rotate(180deg)' : 'none', color: '#9a9a9a' }}>▾</span>
                  </button>
                  {mobilAcik === item.label && (
                    <div style={{ paddingLeft: '12px', paddingBottom: '8px' }}>
                      <Link href={item.url} onClick={() => setMobil(false)} style={{
                        display: 'block', padding: '10px 0', color: 'var(--orange)',
                        fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #2a2520',
                      }}>Tüm {item.label} →</Link>
                      {item.altlar.map(alt => (
                        <Link key={alt.label} href={alt.url} onClick={() => setMobil(false)} style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 0', borderBottom: '1px solid #231f1a',
                        }}>
                          <span style={{ fontSize: '18px' }}>{alt.ikon}</span>
                          <span style={{ fontSize: '14px', color: '#ccc' }}>{alt.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.url} onClick={() => setMobil(false)} style={{
                  display: 'block', padding: '14px 0', color: '#fff',
                  fontSize: '16px', fontWeight: 600, borderBottom: '1px solid #2a2520',
                }}>{item.label}</Link>
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
