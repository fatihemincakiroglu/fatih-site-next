'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const MENU = [
  {
    label: 'Hizmetler', url: '/hizmetler',
    altlar: [
      { label: 'SEO', url: '/seo', ikon: '🔍', alt: 'Teknik SEO ve içerik optimizasyonu' },
      { label: 'İçerik', url: '/icerik', ikon: '✍️', alt: 'Arama niyeti odaklı içerik stratejisi' },
      { label: 'Performans', url: '/performans', ikon: '📈', alt: 'Trafik ve dönüşüm optimizasyonu' },
      { label: 'GEO', url: '/geo', ikon: '🤖', alt: 'Yapay zeka arama görünürlüğü' },
      { label: 'Backlink', url: '/backlink', ikon: '🔗', alt: 'Editoryal link ve dijital PR' },
    ]
  },
  {
    label: 'Hakkımda', url: '/hakkimda',
    altlar: [
      { label: 'Referanslar', url: '/referanslar', ikon: '⭐', alt: 'Müşteri yorumları' },
      { label: 'Vakalar', url: '/vakalar', ikon: '📊', alt: 'Vaka çalışmaları' },
    ]
  },
  {
    label: 'Kaynaklar', url: '/kaynaklar',
    altlar: [
      { label: 'SEO Rehberi', url: '/seo-rehberi', ikon: '📖', alt: 'SEO rehberleri' },
      { label: 'GEO Rehberi', url: '/geo-rehberi', ikon: '🤖', alt: 'GEO rehberi' },
      { label: 'AI Sözlük', url: '/ai-sozluk', ikon: '📚', alt: 'AI terimleri' },
      { label: 'SSS', url: '/sss', ikon: '❓', alt: 'Sık sorulan sorular' },
    ]
  },
  { label: 'Araçlar', url: '/araclar', altlar: [] },
  { label: 'Rehber', url: '/rehber', altlar: [] },
  { label: 'Blog', url: '/blog', altlar: [] },
]

export default function Navbar() {
  const [acik, setAcik] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setAcik(null)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: '#1a1612', height: 'var(--nav-h)',
      display: 'flex', alignItems: 'center', padding: '0 32px',
      borderBottom: '1px solid #2a2520',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center' }}>
        <Link href="/" onClick={() => setAcik(null)} style={{ display: 'flex', alignItems: 'center', marginRight: '32px' }}>
          <img src="/logo.png" alt="Fatih Emin Çakıroğlu" style={{ height: '38px', filter: 'invert(1) brightness(2)' }} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}>
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
                }}>
                  {item.label}
                </Link>
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
                  }}>
                    Tüm {item.label} →
                  </Link>
                  {item.altlar.map(alt => (
                    <Link key={alt.label} href={alt.url} onClick={() => setAcik(null)} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      padding: '12px 16px', transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#231f1a')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
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

        <Link href="/iletisim" onClick={() => setAcik(null)} style={{
          padding: '9px 20px', borderRadius: '8px', background: 'var(--orange)',
          color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)',
        }}>İletişim</Link>
      </div>
    </nav>
  )
}
