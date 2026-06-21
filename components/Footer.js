import Link from 'next/link';

const LINKLER = {
  'HİZMETLER': [
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
};

export default function Footer() {
  return (
    <footer style={{ background: '#111', color: '#fff', borderTop: '1px solid #222' }}>
      {/* Araçlar bandı */}
      <div style={{ borderBottom: '1px solid #1e1e1e', padding: '28px 32px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flexShrink: 0 }}>
            <span style={{ fontSize: '11px', color: '#555', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>ÇALIŞMA ARAÇLARI</span>
            <span style={{ fontSize: '15px', color: '#fff', fontWeight: 700 }}>Veri ve <span style={{ color: 'var(--orange)' }}>AI araçları</span></span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['SEMrush', 'Ahrefs', 'ChatGPT', 'Perplexity', 'Claude', 'Google', 'Search Console'].map(a => (
              <span key={a} style={{ padding: '6px 14px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#888', fontSize: '12px', fontWeight: 500 }}>{a}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Ana footer */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 32px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>
          <div>
            <Link href="/" style={{ display: 'block', marginBottom: '16px' }}>
              <img src="/logo.png" alt="Fatih Emin Çakıroğlu" style={{ height: '34px', filter: 'invert(1) brightness(2)' }} />
            </Link>
            <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              SEO ve GEO danışmanlığıyla organik büyümenizi hızlandırıyorum.
            </p>
            <Link href="/iletisim" style={{ display: 'inline-block', padding: '10px 20px', background: 'var(--orange)', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: 600 }}>
              İletişime Geç →
            </Link>
          </div>
          {Object.entries(LINKLER).map(([baslik, linkler]) => (
            <div key={baslik}>
              <div style={{ fontSize: '11px', color: '#444', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>{baslik}</div>
              {linkler.map(l => (
                <div key={l.label} style={{ marginBottom: '10px' }}>
                  <Link href={l.url} style={{ color: '#666', fontSize: '14px', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#666'}
                  >{l.label}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ color: '#444', fontSize: '13px' }}>© {new Date().getFullYear()} Fatih Emin Çakıroğlu — Tüm hakları saklıdır.</div>
          <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ color: '#555', fontSize: '13px', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#555'}
          >LinkedIn ↗</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
          footer { padding-left: 16px; padding-right: 16px; }
        }
      `}</style>
    </footer>
  );
}
