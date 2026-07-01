import Link from 'next/link'
import { useRouter } from 'next/router'

const AI_TOOLS = [
  { isim: 'Google', emoji: 'G', renk: '#4285f4', bg: '#e8f0fe', desc: 'Search & AI Overview' },
  { isim: 'ChatGPT', emoji: '✦', renk: '#10a37f', bg: '#e6f7f3', desc: 'OpenAI Search' },
  { isim: 'Perplexity', emoji: '◈', renk: '#6366f1', bg: '#eef2ff', desc: 'Answer Engine' },
  { isim: 'Bing', emoji: '⬡', renk: '#0078d4', bg: '#e6f3fc', desc: 'Copilot AI' },
  { isim: 'Gemini', emoji: '✧', renk: '#9334e6', bg: '#f3e8fd', desc: 'Google AI' },
  { isim: 'Ahrefs', emoji: 'A', renk: '#f96332', bg: '#fef0eb', desc: 'SEO Data' },
  { isim: 'SEMrush', emoji: 'S', renk: '#ff642d', bg: '#fff0ea', desc: 'Analytics' },
  { isim: 'GSC', emoji: '↗', renk: '#ea4335', bg: '#fde8e7', desc: 'Search Console' },
]

const LINKS = {
  tr: {
    hizmetler: { baslik: 'Hizmetler', items: [
      { label: 'SEO Danışmanlığı', href: '/seo' },
      { label: 'GEO Danışmanlığı', href: '/geo' },
      { label: 'İçerik Stratejisi', href: '/icerik' },
      { label: 'Backlink & Dijital PR', href: '/backlink' },
      { label: 'Performans & Growth', href: '/performans' },
    ]},
    kaynaklar: { baslik: 'Kaynaklar', items: [
      { label: 'SEO Rehberi', href: '/seo-rehberi' },
      { label: 'GEO Rehberi', href: '/geo-rehberi' },
      { label: 'AI Sözlük', href: '/ai-sozluk' },
      { label: 'Araçlar', href: '/araclar' },
      { label: 'Blog', href: '/blog' },
      { label: 'SSS', href: '/sss' },
    ]},
    sirket: { baslik: 'Şirket', items: [
      { label: 'Hakkımda', href: '/hakkimda' },
      { label: 'Referanslar', href: '/referanslar' },
      { label: 'Vaka Çalışmaları', href: '/vakalar' },
      { label: 'Fiyatlandırma', href: '/fiyatlandirma' },
      { label: 'İletişim', href: '/iletisim' },
    ]},
  },
  en: {
    hizmetler: { baslik: 'Services', items: [
      { label: 'SEO Consulting', href: '/en/seo-consulting' },
      { label: 'GEO Consulting', href: '/en/geo-consulting' },
      { label: 'Content Strategy', href: '/en/content-strategy' },
      { label: 'Backlink & Digital PR', href: '/en/backlink-digital-pr' },
      { label: 'Performance & Growth', href: '/en/performance-growth' },
    ]},
    kaynaklar: { baslik: 'Resources', items: [
      { label: 'SEO Guide', href: '/en/seo-guide' },
      { label: 'GEO Guide', href: '/en/geo-guide' },
      { label: 'AI Glossary', href: '/en/ai-glossary' },
      { label: 'Tools', href: '/en/tools' },
      { label: 'Blog', href: '/en/blog' },
      { label: 'FAQ', href: '/en/faq' },
    ]},
    sirket: { baslik: 'Company', items: [
      { label: 'About', href: '/en/about' },
      { label: 'Testimonials', href: '/en/testimonials' },
      { label: 'Case Studies', href: '/en/case-studies' },
      { label: 'Pricing', href: '/en/pricing' },
      { label: 'Contact', href: '/en/contact' },
    ]},
  },
}

export default function Footer() {
  const router = useRouter()
  const isEn = router.pathname.startsWith('/en')
  const links = isEn ? LINKS.en : LINKS.tr
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#0f0f0f', color: '#fff', overflowX: 'hidden' }}>

      {/* AI & Data Tools Band */}
      <div style={{ borderBottom: '1px solid #1f1f1f', padding: '28px 24px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', color: '#444', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center' }}>
            {isEn ? 'AI SEARCH & DATA TOOLS' : 'KULLANILAN AI ARAMA & VERİ ARAÇLARI'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {AI_TOOLS.map((tool, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '8px 14px', transition: 'border-color 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = tool.renk + '60' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: tool.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900, color: tool.renk, flexShrink: 0 }}>{tool.emoji}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#e5e5e5', lineHeight: 1 }}>{tool.isim}</div>
                  <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>{tool.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ padding: '48px 24px 32px', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px 24px', marginBottom: '40px' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-0.5px' }}>
              Fatih Emin<br /><span style={{ color: 'var(--orange)' }}>Çakıroğlu</span>
            </div>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>
              {isEn ? 'SEO & GEO Consultant. Helping businesses grow organically in search and AI systems.' : 'SEO & GEO Danışmanı. İşletmelerin arama ve AI sistemlerinde organik büyümesine yardım ediyorum.'}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer"
                style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#0077b5'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}>
                in
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer"
                style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#1da1f2'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}>
                𝕏
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(links).map((col, ci) => (
            <div key={ci}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, color: '#444', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>{col.baslik}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {col.items.map((item, ii) => (
                  <li key={ii}>
                    <Link href={item.href} style={{ fontSize: '14px', color: '#666', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#666'}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / CTA */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 800, color: '#444', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>
              {isEn ? 'FREE AUDIT' : 'ÜCRETSİZ ANALİZ'}
            </h3>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.6, marginBottom: '14px' }}>
              {isEn ? 'Get a free SEO & GEO audit for your site. No commitment.' : 'Siteniz için ücretsiz SEO & GEO analizi alın. Yükümlülük yok.'}
            </p>
            <Link href={isEn ? '/en/contact' : '/iletisim'}
              style={{ display: 'inline-block', padding: '11px 20px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-body)', transition: 'opacity 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              {isEn ? 'Get Free Audit →' : 'Analiz Al →'}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: '#444' }}>
            © {year} Fatih Emin Çakıroğlu
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href={isEn ? '/en/privacy' : '/gizlilik'} style={{ fontSize: '12px', color: '#444', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#444'}>
              {isEn ? 'Privacy Policy' : 'Gizlilik Politikası'}
            </Link>
            <Link href={isEn ? '/en/terms' : '/kullanim-kosullari'} style={{ fontSize: '12px', color: '#444', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#444'}>
              {isEn ? 'Terms of Service' : 'Kullanım Koşulları'}
            </Link>
            <Link href="/sitemap.xml" style={{ fontSize: '12px', color: '#444', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#444'}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child .tool-grid { justify-content: flex-start !important; }
        }
      `}</style>
    </footer>
  )
}
