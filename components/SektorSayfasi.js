import Head from 'next/head'
import Link from 'next/link'
import { renderBlok, renderInline } from './IcerikBlok'
import IlgiliRehberler from './IlgiliRehberler'
import { SEKTOR_LISTE } from '../lib/sektor-liste'
import { KONUMLAR } from '../lib/geo-konum/ilceler'

const BASE = 'https://fatihemincakiroglu.com'

// Sektör hizmet sayfası (TR: /sektorler/<slug>, EN: /en/industries/<slug_en>)
export default function SektorSayfasi({ veri, isEn }) {
  if (!veri) return null
  const L = isEn ? 'en' : 'tr'
  const v = (k) => veri[`${k}_${L}`]
  const yol = isEn ? `/en/industries/${veri.slug_en}` : `/sektorler/${veri.slug}`
  const canonical = `${BASE}${yol}`
  const hubYol = isEn ? '/en/industries' : '/sektorler'
  const bolumler = v('bolumler') || []
  const sss = v('sss') || []
  const BASLIK_EKI = ' | Fatih Emin Çakıroğlu'
  const meta = v('meta_baslik')
  const title = (meta + BASLIK_EKI).length <= 65 ? meta + BASLIK_EKI : meta
  const duz = (t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '')
  const ilceler = (veri.ilceler || []).map(s => KONUMLAR.find(k => k.slug === s)).filter(Boolean)
  const digerSektorler = SEKTOR_LISTE.filter(s => s.slug !== veri.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: title, description: v('meta_desc'),
        inLanguage: isEn ? 'en' : 'tr-TR', isPartOf: { '@id': `${BASE}/#website` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` }, about: { '@id': `${canonical}#service` },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Ana Sayfa', item: isEn ? `${BASE}/en` : BASE },
          { '@type': 'ListItem', position: 2, name: isEn ? 'Industries' : 'Sektörler', item: `${BASE}${hubYol}` },
          { '@type': 'ListItem', position: 3, name: v('ad'), item: canonical },
        ],
      },
      {
        '@type': 'Service', '@id': `${canonical}#service`, name: v('h1'), serviceType: v('ad'), description: v('meta_desc'), url: canonical,
        provider: { '@id': `${BASE}/#person` },
        areaServed: [{ '@type': 'Country', name: isEn ? 'Turkey' : 'Türkiye' }, { '@type': 'City', name: 'İstanbul' }],
        audience: { '@type': 'BusinessAudience', name: v('ad') },
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: v('h1'),
          itemListElement: (v('hizmetler') || []).map(n => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
        },
      },
      ...(sss.length ? [{
        '@type': 'FAQPage', '@id': `${canonical}#faq`,
        mainEntity: sss.map(f => ({ '@type': 'Question', name: f.s, acceptedAnswer: { '@type': 'Answer', text: duz(f.c) } })),
      }] : []),
    ],
  }

  const h2Stil = { fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#111', lineHeight: 1.3, margin: '40px 0 14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }
  const cizgi = <span style={{ width: '4px', minHeight: '22px', background: 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block', marginTop: '4px' }}></span>

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={v('meta_desc')} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <nav aria-label="breadcrumb" style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '13px' }}>
            <Link href={isEn ? '/en' : '/'} style={{ color: '#aaa' }}>{isEn ? 'Home' : 'Ana Sayfa'}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href={hubYol} style={{ color: '#aaa' }}>{isEn ? 'Industries' : 'Sektörler'}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555' }} aria-current="page">{v('ad')}</span>
          </div>
        </nav>

        <header style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '44px 16px 36px' }}>
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 800, color: 'var(--orange)', letterSpacing: '1.5px', padding: '4px 10px', border: '1px solid rgba(232,86,10,0.3)', borderRadius: '4px', marginBottom: '14px' }}>
              {isEn ? 'INDUSTRY SEO' : 'SEKTÖREL SEO'}
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '14px' }}>{v('h1')}</h1>
            <p style={{ fontSize: '17px', color: '#555', lineHeight: 1.6, margin: '0 0 22px', maxWidth: '700px' }}>{v('alt')}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href={isEn ? '/en/book-a-call' : '/randevu'} style={{ padding: '12px 20px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px' }}>{isEn ? 'Book a free call →' : 'Ücretsiz görüşme al →'}</Link>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd', color: '#333', fontWeight: 600, fontSize: '14px', background: '#fff' }}>{isEn ? 'Get in touch' : 'İletişime geç'}</Link>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: '920px', margin: '0 auto', padding: '28px 16px 24px' }}>
          <article style={{ background: '#fff', borderRadius: '16px', padding: 'clamp(22px, 4vw, 44px)', border: '1px solid #eee' }}>
            {bolumler.map((b, bi) => (
              <section key={bi}>
                {b.baslik && <h2 style={{ ...h2Stil, marginTop: bi === 0 ? 0 : '40px' }}>{cizgi}{b.baslik}</h2>}
                {b.paragraflar.map((p, pi) => renderBlok(p, pi, false, '14px'))}
              </section>
            ))}

            {!isEn && ilceler.length > 0 && (
              <section>
                <h2 style={h2Stil}>{cizgi}{`${v('ad')}: İstanbul'da yoğun çalıştığım ilçeler`}</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {ilceler.map(k => (
                    <Link key={k.slug} href={`/${k.slug}-seo-uzmani`} style={{ padding: '8px 14px', borderRadius: '20px', border: '1px solid #eee', background: '#faf9f7', fontSize: '14px', color: '#333', fontWeight: 600 }}>
                      {k.ad} SEO Uzmanı
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {sss.length > 0 && (
              <section id="sss">
                <h2 style={h2Stil}>{cizgi}{isEn ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}</h2>
                {sss.map((f, i) => (
                  <div key={i} style={{ borderTop: '1px solid #f0ece6', padding: '16px 0' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>{f.s}</h3>
                    <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{renderInline(f.c)}</p>
                  </div>
                ))}
              </section>
            )}
          </article>
        </main>

        <IlgiliRehberler sluglar={veri.rehberler || []} isEn={isEn} stil={{ maxWidth: '920px', padding: '16px 16px 8px' }} />

        <section style={{ maxWidth: '920px', margin: '0 auto', padding: '24px 16px 8px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#111', marginBottom: '14px' }}>
            {isEn ? 'Other industries' : 'Diğer sektörler'}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {digerSektorler.map(s => (
              <Link key={s.slug} href={isEn ? `/en/industries/${s.slug_en}` : `/sektorler/${s.slug}`} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #eee', background: '#fff', fontSize: '14px', color: '#333', fontWeight: 600 }}>
                {isEn ? s.en.ad : s.tr.ad}
              </Link>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '920px', margin: '0 auto', padding: '28px 16px 80px' }}>
          <div style={{ background: '#111', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', marginBottom: '10px' }}>{isEn ? 'FREE DISCOVERY CALL' : 'ÜCRETSİZ KEŞİF GÖRÜŞMESİ'}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
              {isEn ? `Let's look at your site together` : 'Sitenize birlikte bakalım'}
            </h2>
            <p style={{ color: '#bbb', fontSize: '14px', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 20px' }}>
              {isEn ? 'In a 30-minute call we review your current visibility, your competitors and the first priorities for the next 90 days.' : '30 dakikalık görüşmede mevcut görünürlüğünüzü, rakiplerinizi ve önümüzdeki 90 günün ilk önceliklerini birlikte inceleyelim.'}
            </p>
            <Link href={isEn ? '/en/book-a-call' : '/randevu'} style={{ display: 'inline-block', padding: '13px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px' }}>{isEn ? 'Book a call →' : 'Randevu al →'}</Link>
          </div>
        </section>
      </div>
    </>
  )
}
