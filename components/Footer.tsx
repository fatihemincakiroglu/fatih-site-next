import Link from 'next/link'

const LINKLER: Record<string, { label: string; url: string }[]> = {
  'HİZMETLER': [
    { label: 'Tüm Hizmetler', url: '/hizmetler' },
    { label: 'SEO Danışmanlığı', url: '/seo' },
    { label: 'İçerik Stratejisi', url: '/icerik' },
    { label: 'Performans & Growth', url: '/performans' },
    { label: 'GEO Danışmanlığı', url: '/geo' },
    { label: 'Backlink & Dijital PR', url: '/backlink' },
  ],
  'HAKKIMDA': [
    { label: 'Hakkımda', url: '/hakkimda' },
    { label: 'Referanslar', url: '/referanslar' },
    { label: 'Vaka Çalışmaları', url: '/vakalar' },
    { label: 'Fiyatlandırma', url: '/fiyatlandirma' },
  ],
  'KAYNAKLAR': [
    { label: 'SEO Rehberi', url: '/seo-rehberi' },
    { label: 'GEO Rehberi', url: '/geo-rehberi' },
    { label: 'AI Sözlük', url: '/ai-sozluk' },
    { label: 'SSS', url: '/sss' },
  ],
  'KEŞFET': [
    { label: 'Araçlar', url: '/araclar' },
    { label: 'Rehber', url: '/rehber' },
    { label: 'Blog', url: '/blog' },
    { label: 'İletişim', url: '/iletisim' },
  ],
}

const ARACLAR = [
  { isim: 'SEMrush', url: 'https://www.semrush.com', renk: '#FF6B35' },
  { isim: 'Ahrefs', url: 'https://ahrefs.com', renk: '#FF8C00' },
  { isim: 'SEOmonitor', url: 'https://www.seomonitor.com', renk: '#4A90D9' },
  { isim: 'ChatGPT', url: 'https://chat.openai.com', renk: '#10A37F' },
  { isim: 'Perplexity', url: 'https://www.perplexity.ai', renk: '#20B2AA' },
  { isim: 'Claude', url: 'https://claude.ai', renk: '#CC785C' },
  { isim: 'Bing', url: 'https://www.bing.com', renk: '#008373' },
  { isim: 'Meta', url: 'https://www.meta.com', renk: '#0082FB' },
  { isim: 'Google', url: 'https://www.google.com', renk: '#4285F4' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#1a1612', color: '#fff', borderTop: '1px solid #2a2520' }}>
      <div style={{ borderBottom: '1px solid #2a2520', padding: '36px 32px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 10px', background: 'rgba(232,86,10,0.12)', borderRadius: '4px', display: 'inline-block', marginBottom: '10px' }}>ÇALIŞMA ORTAMI</span>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
            Veri, reklam ve <span style={{ color: 'var(--orange)' }}>AI araçları</span>
          </h3>
          <p style={{ fontSize: '13px', color: '#4a4540', marginBottom: '20px' }}>Operasyonlarımda kullandığım platformlar — logolar bilgi amaçlıdır.</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {ARACLAR.map(a => (
              <a key={a.isim} href={a.url} target="_blank" rel="nofollow noreferrer noopener" style={{
                padding: '10px 18px', background: '#231f1a', border: '1px solid #2a2520',
                borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: a.renk, display: 'inline-block', flexShrink: 0 }}></span>
                <span style={{ color: '#9a9a9a', fontSize: '13px', fontWeight: 600 }}>{a.isim}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src="/logo.png" alt="Fatih Emin Çakıroğlu" style={{ height: '36px', filter: 'invert(1) brightness(2)' }} />
            </Link>
            <p style={{ color: '#6b6b6b', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              SEO & dijital pazarlama danışmanlığı ile organik büyümenizi hızlandırıyorum.
            </p>
            <div style={{ background: '#231f1a', borderRadius: '10px', padding: '16px', border: '1px solid #2a2520', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#4a4540', marginBottom: '10px' }}>İLK GÖRÜŞME ÜCRETSİZ</div>
              <Link href="/iletisim" style={{ display: 'block', width: '100%', padding: '10px', background: 'var(--orange)', borderRadius: '8px', color: '#fff', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>
                İletişime Geç →
              </Link>
            </div>
            <a href="mailto:info@fatihemincakiroglu.com" style={{ fontSize: '13px', color: '#6b6b6b', display: 'block', marginBottom: '6px' }}>
              ✉️ info@fatihemincakiroglu.com
            </a>
            <div style={{ fontSize: '13px', color: '#6b6b6b' }}>⏰ Pzt–Cum 09:00–18:00</div>
          </div>

          {Object.entries(LINKLER).map(([baslik, linkler]) => (
            <div key={baslik}>
              <div style={{ fontSize: '11px', color: '#4a4540', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>{baslik}</div>
              {linkler.map(l => (
                <div key={l.label} style={{ marginBottom: '10px' }}>
                  <Link href={l.url} style={{ color: '#6b6b6b', fontSize: '14px' }}>{l.label}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #2a2520', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ color: '#4a4540', fontSize: '13px' }}>© {new Date().getFullYear()} Fatih Emin Çakıroğlu</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ color: '#4a4540', fontSize: '13px' }}>LinkedIn ↗</a>
            <a href="#" style={{ color: '#4a4540', fontSize: '12px' }}>KVKK</a>
            <a href="#" style={{ color: '#4a4540', fontSize: '12px' }}>Gizlilik</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
