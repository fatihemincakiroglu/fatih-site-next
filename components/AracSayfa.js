import Head from 'next/head'
import Link from 'next/link'
import IlgiliRehberler from './IlgiliRehberler'
import { renderInline } from './IcerikBlok'

const BASE = 'https://fatihemincakiroglu.com'

// Bağımsız araç sayfaları (/araclar/schema-olusturucu, /araclar/yonlendirme-olusturucu
// ve EN karşılıkları) için ortak kabuk: breadcrumb, başlık, araç, "nasıl kullanılır",
// SSS (FAQPage), ilgili rehberler ve WebApplication şeması.
export default function AracSayfa({ isEn, yol, yolEn, baslik, metaBaslik, metaDesc, giris, adimlar = [], sss = [], rehberler = [], children }) {
  const canonical = `${BASE}${isEn ? yolEn : yol}`
  const duz = (t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '')
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication', '@id': `${canonical}#app`, name: baslik, url: canonical, description: metaDesc,
        applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', inLanguage: isEn ? 'en' : 'tr-TR',
        isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: isEn ? 'USD' : 'TRY' },
        author: { '@id': `${BASE}/#person` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Ana Sayfa', item: isEn ? `${BASE}/en` : BASE },
          { '@type': 'ListItem', position: 2, name: isEn ? 'Tools' : 'Araçlar', item: `${BASE}${isEn ? '/en/tools' : '/araclar'}` },
          { '@type': 'ListItem', position: 3, name: baslik, item: canonical },
        ],
      },
      ...(sss.length ? [{
        '@type': 'FAQPage', '@id': `${canonical}#faq`,
        mainEntity: sss.map(f => ({ '@type': 'Question', name: f.s, acceptedAnswer: { '@type': 'Answer', text: duz(f.c) } })),
      }] : []),
    ],
  }
  const kutu = { background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: 'clamp(20px, 4vw, 32px)' }
  const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 3vw, 24px)', fontWeight: 800, color: '#111', margin: '0 0 14px' }

  return (
    <>
      <Head>
        <title>{metaBaslik}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <nav aria-label="breadcrumb" style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '13px' }}>
            <Link href={isEn ? '/en' : '/'} style={{ color: '#aaa' }}>{isEn ? 'Home' : 'Ana Sayfa'}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/tools' : '/araclar'} style={{ color: '#aaa' }}>{isEn ? 'Tools' : 'Araçlar'}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555' }} aria-current="page">{baslik}</span>
          </div>
        </nav>

        <header style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '40px 16px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              {isEn ? 'FREE TOOL' : 'ÜCRETSİZ ARAÇ'}
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '12px' }}>{baslik}</h1>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.7, maxWidth: '760px', margin: 0 }}>{renderInline(giris)}</p>
          </div>
        </header>

        <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '28px 16px 32px', display: 'grid', gap: '20px' }}>
          <section style={kutu} aria-label={baslik}>{children}</section>

          {adimlar.length > 0 && (
            <section style={kutu}>
              <h2 style={h2}>{isEn ? 'How to use it' : 'Nasıl kullanılır?'}</h2>
              <ol style={{ margin: 0, paddingLeft: '22px', color: '#555', fontSize: '15px', lineHeight: 1.8 }}>
                {adimlar.map((a, i) => <li key={i} style={{ marginBottom: '6px' }}>{renderInline(a)}</li>)}
              </ol>
            </section>
          )}

          {sss.length > 0 && (
            <section style={kutu}>
              <h2 style={h2}>{isEn ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}</h2>
              {sss.map((f, i) => (
                <div key={i} style={{ borderTop: i ? '1px solid #f0ece6' : 'none', padding: '14px 0' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>{f.s}</h3>
                  <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{renderInline(f.c)}</p>
                </div>
              ))}
            </section>
          )}
        </main>
        <IlgiliRehberler sluglar={rehberler} isEn={isEn} stil={{ padding: '8px 16px 72px' }} />
      </div>
    </>
  )
}

// Araç sayfalarında ortak form stilleri
export const formStil = {
  etiket: { display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '6px' },
  girdi: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', fontFamily: 'var(--font-body)', background: '#fff', color: '#111', minWidth: 0 },
  buton: { padding: '10px 18px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-body)' },
  ikincil: { padding: '10px 18px', borderRadius: '8px', background: '#fff', color: '#333', border: '1px solid #ddd', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-body)' },
  kod: { background: '#1a1612', color: '#f5efe8', padding: '16px 18px', borderRadius: '10px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.6, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', whiteSpace: 'pre', margin: 0, maxHeight: '520px' },
}
