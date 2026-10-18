import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SEKTOR_LISTE } from '../../lib/sektor-liste'

const BASE = 'https://fatihemincakiroglu.com'

// Sektör hizmetleri merkez sayfası — TR: /sektorler, EN: /en/industries
export default function Sektorler(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const canonical = `${BASE}${isEn ? '/en/industries' : '/sektorler'}`
  const t = isEn ? {
    title: 'Industry SEO Services | Fatih Emin Çakıroğlu',
    desc: 'SEO and GEO consulting tailored to clinics, law firms, e-commerce, hotels and tourism, and B2B manufacturers — each with its own search behaviour and rules.',
    h1: 'SEO by Industry',
    giris: 'Every industry searches differently. A clinic deals with health advertising rules and patient trust; a manufacturer with long buying cycles and export markets. These pages explain how I approach SEO and GEO in each one.',
    kart: 'View service →',
  } : {
    title: 'Sektörel SEO Hizmetleri | Fatih Emin Çakıroğlu',
    desc: 'Klinikler, hukuk büroları, e-ticaret, otel ve turizm ile B2B üreticiler için sektöre özel SEO ve GEO danışmanlığı: her sektörün arama davranışı ve kuralları farklı.',
    h1: 'Sektörlere Göre SEO',
    giris: 'Her sektör farklı arar. Bir klinik sağlık tanıtım kuralları ve hasta güveniyle, bir üretici uzun satın alma süreçleri ve ihracat pazarlarıyla uğraşır. Bu sayfalarda her sektörde SEO ve GEO çalışmasına nasıl yaklaştığımı anlatıyorum.',
    kart: 'Hizmeti incele →',
  }
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage', '@id': `${canonical}#sayfa`, url: canonical, name: t.title, description: t.desc,
    inLanguage: isEn ? 'en' : 'tr-TR', isPartOf: { '@id': `${BASE}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: SEKTOR_LISTE.map((s, i) => ({
        '@type': 'ListItem', position: i + 1, name: isEn ? s.en.ad : s.tr.ad,
        url: `${BASE}${isEn ? `/en/industries/${s.slug_en}` : `/sektorler/${s.slug}`}`,
      })),
    },
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.desc} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <header style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 16px 36px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              {isEn ? 'INDUSTRIES' : 'SEKTÖRLER'}
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '12px' }}>{t.h1}</h1>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.7, maxWidth: '760px', margin: 0 }}>{t.giris}</p>
          </div>
        </header>
        <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '32px 16px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {SEKTOR_LISTE.map(s => {
              const l = isEn ? s.en : s.tr
              return (
                <Link key={s.slug} href={isEn ? `/en/industries/${s.slug_en}` : `/sektorler/${s.slug}`}
                  style={{ display: 'block', background: '#fff', border: '1px solid #eee', borderRadius: '14px', padding: '24px', textDecoration: 'none' }}>
                  <div aria-hidden="true" style={{ fontSize: '26px', marginBottom: '10px' }}>{s.ikon}</div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '8px', lineHeight: 1.35 }}>{l.ad}</h2>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '12px' }}>{l.ozet}</p>
                  <span style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 700 }}>{t.kart}</span>
                </Link>
              )
            })}
          </div>
        </main>
      </div>
    </>
  )
}
