import Link from 'next/link'
import BrandMark, { BRANDS } from './BrandMark'
import { useRouter } from 'next/router'

// Bu tarihi, siteye önemli bir içerik/özellik güncellemesi yaptığınızda elle güncelleyin.
// AI arama motorları (GEO) ve Google, "içerik ne zaman güncellendi" sinyaline değer verir;
// bu satır hem insan okuyuculara hem de arama/AI botlarına görünür bir tazelik göstergesi sunar.
const LAST_UPDATED = { tr: 'Temmuz 2026', en: 'July 2026' }

// Footer'da gösterilecek markalar. Veri tek kaynaktan (BrandMark) geliyor.
const AI_TOOL_IDS = ['google', 'chatgpt', 'perplexity', 'claude', 'gemini', 'bing', 'ahrefs', 'semrush', 'gsc']

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

      {/* ── AI & Veri Araçları Şeridi ──
           Eskiden her araç iki satırlık (isim + açıklama) bir kutuydu;
           footer'da bu kadar detay gereksiz yer kaplıyor ve mobilde
           dokuz kutu alt alta uzuyordu. Artık tek satırlık kompakt bir
           şerit: simge + isim, açıklama yok. */}
      <div style={{ borderBottom: '1px solid #1f1f1f', padding: '22px 24px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <p style={{ fontSize: '10px', color: '#3d3d3d', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: 0, whiteSpace: 'nowrap' }}>
            {isEn ? 'AI SEARCH & DATA TOOLS' : 'AI ARAMA & VERİ ARAÇLARI'}
          </p>
          <div className="footer-marka-serit">
            {AI_TOOL_IDS.map(id => (
              <span key={id} className="footer-marka" title={BRANDS[id].isim}>
                <BrandMark id={id} boyut={20} />
                <span>{BRANDS[id].isim}</span>
              </span>
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
          <div style={{ fontSize: '13px', color: '#444', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span>© {year} Fatih Emin Çakıroğlu</span>
            <span style={{ color: '#2a2a2a' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', flexShrink: 0 }} />
              {isEn ? `Last updated: ${LAST_UPDATED.en}` : `Son güncelleme: ${LAST_UPDATED.tr}`}
            </span>
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
        .footer-marka-serit {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
        }
        .footer-marka {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px 6px 7px;
          border-radius: 8px;
          background: #161616;
          border: 1px solid #242424;
          font-size: 12px;
          font-weight: 600;
          color: #8a8a8a;
          white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
        }
        .footer-marka:hover {
          color: #d0d0d0;
          border-color: #333;
        }

        @media (max-width: 600px) {
          /* Dar ekranda isimler gizlenir, yalnızca simgeler kalır:
             dokuz kutunun alt alta uzamasını engeller. */
          .footer-marka > span:last-child { display: none; }
          .footer-marka { padding: 6px; }
          .footer-marka-serit { gap: 8px; }
        }
      `}</style>
    </footer>
  )
}
