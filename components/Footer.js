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

const ARACLAR = [
  { isim: 'SEMrush', url: 'https://www.semrush.com' },
  { isim: 'Ahrefs', url: 'https://ahrefs.com' },
  { isim: 'ChatGPT', url: 'https://chat.openai.com' },
  { isim: 'Perplexity', url: 'https://www.perplexity.ai' },
  { isim: 'Claude', url: 'https://claude.ai' },
  { isim: 'Google', url: 'https://www.google.com' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#1a1612', color: '#fff', borderTop: '1px solid #2a2520' }}>
      <div style={{ borderBottom: '1px solid #2a2520', padding: '32px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 10px', background: 'rgba(232,86,10,0.12)', borderRadius: '4px', display: 'inline-block', marginBottom: '10px' }}>ÇALIŞMA ORTAMI</span>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>Veri, reklam ve <span style={{ color: 'var(--orange)' }}>AI araçları</span></h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {ARACLAR.map(a => (
              <a key={a.isim} href={a.url} target="_blank" rel="nofollow noreferrer noopener" style={{ padding: '8px 16px', background: '#231f1a', border: '1px solid #2a2520', borderRadius: '8px', color: '#9a9a9a', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                {a.isim}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>
          <div>
            <Link href="/" style={{ display: 'block', marginBottom: '16px' }}>
              <img src="/logo.png" alt="Fatih Emin Çakıroğlu" style={{ height: '36px', filter: 'invert(1) brightness(2)' }} />
            </Link>
            <p style={{ color: '#6b6b6b', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>SEO danışmanlığı ile organik büyümenizi hızlandırıyorum.</p>
            <Link href="/iletisim" style={{ display: 'block', padding: '10px', background: 'var(--orange)', borderRadius: '8px', color: '#fff', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>İletişime Geç →</Link>
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
        <div style={{ borderTop: '1px solid #2a2520', paddingTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ color: '#4a4540', fontSize: '13px' }}>© {new Date().getFullYear()} Fatih Emin Çakıroğlu</div>
          <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ color: '#4a4540', fontSize: '13px' }}>LinkedIn ↗</a>
        </div>
      </div>
    </footer>
  );
}
