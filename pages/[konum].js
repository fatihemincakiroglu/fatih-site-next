// ─────────────────────────────────────────────────────────────
// Yerel GEO uzmanı sayfaları: /istanbul-geo-uzmani, /kartal-geo-uzmani ...
//
// • Yalnızca lib/geo-konum/ilceler.js'teki 40 adres üretilir (fallback: false);
//   kök dizindeki diğer tüm adresler eskisi gibi 404 döner. Statik sayfalar
//   (ör. /seo-uzmani) her zaman bu dinamik rotadan önce eşleşir.
// • Bilinçli olarak hiçbir menüye, footer'a veya site içi aramaya bağlı değil.
//   Keşif yalnızca TR sitemap üzerinden.
// • İçerik build sırasında getStaticProps'ta üretilir; varyant metinleri
//   istemci paketine girmez.
// ─────────────────────────────────────────────────────────────
import Link from 'next/link'
import Head from 'next/head'
import { KONUM_SAYFA_SLUGLARI, konumBul } from '../lib/geo-konum/ilceler'
import { konumIcerigi, konumSSS, konumMeta } from '../lib/geo-konum/icerik'

const BASE = 'https://fatihemincakiroglu.com'

// [metin](/url) → link, **metin** → kalın
const INLINE_RE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g
const linkStil = { color: 'var(--orange)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }
function satirIci(text) {
  const parcalar = []
  let son = 0
  let m
  INLINE_RE.lastIndex = 0
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > son) parcalar.push(text.slice(son, m.index))
    const key = `i${m.index}`
    if (m[1] !== undefined) {
      parcalar.push(m[2].startsWith('/')
        ? <Link key={key} href={m[2]} style={linkStil}>{m[1]}</Link>
        : <a key={key} href={m[2]} target="_blank" rel="noopener noreferrer" style={linkStil}>{m[1]}</a>)
    } else {
      parcalar.push(<strong key={key} style={{ color: '#222' }}>{m[3]}</strong>)
    }
    son = INLINE_RE.lastIndex
  }
  if (son < text.length) parcalar.push(text.slice(son))
  return parcalar
}
const duzMetin = (t) => t.replace(INLINE_RE, (_, a, __, b) => a ?? b)

function Blok({ b }) {
  switch (b.t) {
    case 'h2':
      return (
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#111', lineHeight: 1.3, margin: '44px 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '4px', height: '22px', background: 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block' }}></span>{b.x}
        </h2>
      )
    case 'h3':
      return <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111', margin: '24px 0 8px' }}>{b.x}</h3>
    case 'q':
      return (
        <blockquote style={{ margin: '12px 0', padding: '12px 18px', borderLeft: '3px solid var(--orange)', background: '#faf9f7', borderRadius: '0 10px 10px 0', color: '#333', fontSize: '15px', lineHeight: 1.7, fontStyle: 'italic' }}>
          {b.x}
        </blockquote>
      )
    case 'ul':
      return (
        <ul style={{ margin: '4px 0 18px', paddingLeft: '22px', color: '#555', fontSize: '15px', lineHeight: 1.8 }}>
          {b.x.map((li, i) => <li key={i} style={{ marginBottom: '4px' }}>{satirIci(li)}</li>)}
        </ul>
      )
    default:
      return <p style={{ color: '#555', fontSize: '15.5px', lineHeight: 1.85, margin: '0 0 14px' }}>{satirIci(b.x)}</p>
  }
}

export default function KonumGeoUzmani({ slug, meta, bloklar, sss, konumAdi }) {
  const canonical = `${BASE}/${slug}`

  const schema = [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: BASE },
        { '@type': 'ListItem', position: 2, name: meta.h1, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'Service',
      name: meta.h1,
      serviceType: 'Generative Engine Optimization (GEO) danışmanlığı',
      description: meta.desc,
      url: canonical,
      provider: { '@id': `${BASE}/#person` },
      areaServed: konumAdi === 'İstanbul'
        ? { '@type': 'City', name: 'İstanbul' }
        : { '@type': 'AdministrativeArea', name: `${konumAdi}, İstanbul` },
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: sss.map(f => ({ '@type': 'Question', name: f.s, acceptedAnswer: { '@type': 'Answer', text: duzMetin(f.c) } })),
    },
  ]

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.desc} />
        <meta property="og:url" content={canonical} />
        {schema.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb: Ana Sayfa › {İlçe} GEO Uzmanı */}
        <nav aria-label="breadcrumb" style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }} aria-current="page">{meta.h1}</span>
          </div>
        </nav>

        {/* Hero */}
        <header style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '40px 16px 36px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 800, color: 'var(--orange)', letterSpacing: '1.5px', padding: '4px 10px', border: '1px solid rgba(232,86,10,0.3)', borderRadius: '4px', marginBottom: '14px' }}>
              GEO UZMANI · {konumAdi.toLocaleUpperCase('tr')}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '18px' }}>{meta.h1}</h1>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/randevu" style={{ padding: '12px 20px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px' }}>Ücretsiz GEO Analizi Al →</Link>
              <Link href="/iletisim" style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd', color: '#333', fontWeight: 600, fontSize: '14px', background: '#fff' }}>İletişime Geç</Link>
            </div>
          </div>
        </header>

        {/* İçerik */}
        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px 24px' }}>
          <article style={{ background: '#fff', borderRadius: '16px', padding: 'clamp(22px, 4vw, 44px)', border: '1px solid #eee' }}>
            {bloklar.map((b, i) => <Blok key={i} b={b} />)}

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#111', lineHeight: 1.3, margin: '44px 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '4px', height: '22px', background: 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block' }}></span>Sıkça Sorulan Sorular
            </h2>
            {sss.map((f, i) => (
              <div key={i} style={{ borderTop: '1px solid #f0ece6', padding: '16px 0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>{f.s}</h3>
                <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{satirIci(f.c)}</p>
              </div>
            ))}
          </article>
        </main>

        {/* CTA */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px 80px' }}>
          <div style={{ background: '#111', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', marginBottom: '10px' }}>ÜCRETSİZ GEO ANALİZİ</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>Markanız yapay zekâ cevaplarında nasıl görünüyor?</h2>
            <p style={{ color: '#bbb', fontSize: '14px', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 20px' }}>ChatGPT, Gemini ve Perplexity'de markanızın bugünkü görünürlüğünü birlikte inceleyelim.</p>
            <Link href="/randevu" style={{ display: 'inline-block', padding: '13px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px' }}>Ücretsiz görüşme al →</Link>
          </div>
        </section>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: KONUM_SAYFA_SLUGLARI.map(konum => ({ params: { konum } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const d = konumBul(params.konum)
  if (!d) return { notFound: true }
  return {
    props: {
      slug: params.konum,
      konumAdi: d.ad,
      meta: konumMeta(d),
      bloklar: konumIcerigi(d),
      sss: konumSSS(d),
    },
  }
}
