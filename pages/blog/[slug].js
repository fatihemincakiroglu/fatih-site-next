import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { YAZILAR } from '../blog';
import { getBlogKapak } from '../../lib/blog-kapaklar';
import AiOzetle from '../../components/AiOzetle';
import { getBlogMeta, ayYil } from '../../lib/blog-meta';
import YazarFoto from '../../components/YazarFoto';
import { blogStaticPaths, blogStaticProps } from '../../lib/blog-icerikler';

// İçerik: lib/blog-icerikler.js (yalnızca getStaticProps içinde kullanılır)


// ─────────────────────────────────────────────────────────────
// Paragraf içi biçimlendirme (yalnızca iki kalıp):
//   [metin](/url)  → link. "/" ile başlayan iç linkler Next Link olur
//                    (nofollow yok, aynı sekme); dış linkler yeni sekme + nofollow.
//   **metin**      → kalın
// Mevcut yazılarda bu kalıplar geçmediği için eski içerik etkilenmez.
// ─────────────────────────────────────────────────────────────
const INLINE_RE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g

const inlineLinkStyle = { color: 'var(--orange)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }

function renderInline(text) {
  if (typeof text !== 'string' || (!text.includes('](') && !text.includes('**'))) return text
  const parts = []
  let last = 0
  let m
  INLINE_RE.lastIndex = 0
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const key = `i${m.index}`
    if (m[1] !== undefined) {
      const url = m[2]
      parts.push(url.startsWith('/')
        ? <Link key={key} href={url} style={inlineLinkStyle}>{m[1]}</Link>
        : <a key={key} href={url} target="_blank" rel="nofollow noopener noreferrer" style={inlineLinkStyle}>{m[1]}</a>)
    } else {
      parts.push(<strong key={key} style={{ color: '#222', fontWeight: 700 }}>{m[3]}</strong>)
    }
    last = INLINE_RE.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

// ─────────────────────────────────────────────────────────────
// Paragraf blokları: paragraflar dizisindeki her öğe ya düz metin (string)
// ya da aşağıdaki tiplerden biridir. Eski yazılar yalnızca string kullanır.
//   { alt: '...' }                         → h3 alt başlık
//   { liste: ['...', ...] }                → madde listesi
//   { kontrol: ['...', ...] }              → kontrol listesi (☐)
//   { alinti: '...' }                      → vurgulu alıntı satırı
//   { tablo: { basliklar, satirlar, sag } } → tablo (sag: sağa hizalı sütunlar)
//   { kod: '...' }                         → kod bloğu (robots.txt, llms.txt örnekleri)
// ─────────────────────────────────────────────────────────────
function renderBlok(p, key, isMobile, mb) {
  const metin = { color: '#555', fontSize: '15px', lineHeight: isMobile ? 1.8 : 1.85, marginBottom: mb }
  if (typeof p === 'string') return <p key={key} style={metin}>{renderInline(p)}</p>
  if (p.alt) return (
    <h3 key={key} style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '16px' : '17px', fontWeight: 800, color: '#222', margin: `10px 0 ${mb === '0' ? '0' : '10px'}` }}>{renderInline(p.alt)}</h3>
  )
  if (p.liste || p.kontrol) {
    const kontrol = !!p.kontrol
    return (
      <ul key={key} style={{ listStyle: 'none', padding: 0, margin: `0 0 ${mb}` }}>
        {(p.liste || p.kontrol).map((li, j) => (
          <li key={j} style={{ ...metin, marginBottom: '6px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            {kontrol
              ? <span aria-hidden="true" style={{ flexShrink: 0, width: '16px', height: '16px', marginTop: '5px', border: '2px solid var(--orange)', borderRadius: '4px' }} />
              : <span aria-hidden="true" style={{ flexShrink: 0, width: '6px', height: '6px', marginTop: '11px', background: 'var(--orange)', borderRadius: '50%' }} />}
            <span>{renderInline(li)}</span>
          </li>
        ))}
      </ul>
    )
  }
  if (p.alinti) return (
    <p key={key} style={{ ...metin, color: '#222', fontWeight: 600, borderLeft: '3px solid var(--orange)', background: '#faf9f7', padding: '10px 16px', borderRadius: '0 8px 8px 0' }}>{renderInline(p.alinti)}</p>
  )
  if (p.kod) return (
    <pre key={key} style={{ background: '#1a1612', color: '#f5efe8', padding: '16px 18px', borderRadius: '10px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.65, margin: `0 0 ${mb}`, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', whiteSpace: 'pre' }}><code>{p.kod}</code></pre>
  )
  if (p.tablo) {
    const { basliklar, satirlar, sag = [] } = p.tablo
    const hucre = (i) => ({ padding: '10px 14px', textAlign: sag.includes(i) ? 'right' : 'left', borderBottom: '1px solid #eee', fontSize: '14px' })
    return (
      <div key={key} style={{ overflowX: 'auto', marginBottom: mb, border: '1px solid #eee', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '320px' }}>
          <thead>
            <tr style={{ background: '#faf9f7' }}>
              {basliklar.map((h, i) => <th key={i} style={{ ...hucre(i), color: '#111', fontWeight: 700 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {satirlar.map((r, ri) => (
              <tr key={ri}>{r.map((c, i) => <td key={i} style={{ ...hucre(i), color: '#555' }}>{renderInline(c)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return null
}

// Link kartı etiketi: blog yazısı mı, site sayfası mı?
const kartEtiketi = (url, isEn) => (url.startsWith('/blog/') || url.startsWith('/en/blog/'))
  ? (isEn ? 'Read →' : 'Yazıyı oku →')
  : (isEn ? 'View page →' : 'Sayfaya git →')

export default function BlogPost(props) {
  const router = useRouter()
  const slug = props.slug || router.query.slug
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifBolum, setAktifBolum] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // getStaticPaths yalnızca gerçek içeriği yazılmış slug'ları üretir,
  // dolayısıyla veri normalde her zaman doludur (savunmacı kontrol aşağıda).
  // İçerik getStaticProps'tan gelir (yalnızca bu yazı, yalnızca bu dil).
  const veri = props.veri || null
  const baslik = veri ? (isEn ? veri.baslik_en : veri.baslik_tr) : ''
  const metaBaslik = veri ? ((isEn ? veri.meta_baslik_en : veri.meta_baslik_tr) || baslik) : ''
  const bolumler = (veri ? (isEn ? veri.bolumler_en : veri.bolumler_tr) : []) || []
  const metaDesc = veri && (isEn ? veri.meta_desc_en : veri.meta_desc_tr)
    ? (isEn ? veri.meta_desc_en : veri.meta_desc_tr)
    : (bolumler[0]?.paragraflar?.[0]?.substring(0, 155) || '') + '...'
  const etiket = veri?.etiket || 'SEO'
  const sure = veri?.sure || '10'
  const canonicalUrl = `https://fatihemincakiroglu.com/${isEn ? 'en/blog/' : 'blog/'}${slug}`
  // Sayfa başlığı: ek, yalnızca toplam 65 karakteri aşmıyorsa eklenir.
  // Uzun başlıklarda Google sonuçları sondan keser; kesilen kısım marka eki
  // olacağına başlığın kendisinin tam görünmesi daha değerli.
  const BASLIK_EKI = ' | Fatih Emin Çakıroğlu'
  const sayfaBasligi = (metaBaslik + BASLIK_EKI).length <= 65 ? metaBaslik + BASLIK_EKI : metaBaslik
  // Yayın ve güncelleme tarihleri: lib/blog-meta.js
  const meta = getBlogMeta(slug)
  const guncelleme = meta ? ayYil(meta.guncelleme || meta.yayin, isEn) : (isEn ? 'July 2026' : 'Temmuz 2026')
  const mdUrl = `https://fatihemincakiroglu.com/${isEn ? 'en/blog/' : 'blog/'}${slug}.md`
  // Kapak görseli (opsiyonel): lib/blog-kapaklar.js. Yoksa site geneli og-image kullanılır.
  const kapak = getBlogKapak(slug)
  const kapakUrl = kapak ? `https://fatihemincakiroglu.com${kapak}` : null

  // İlgili yazılar: aynı kategoriden, mevcut yazı hariç, en fazla 3 tane
  const mevcutYazi = YAZILAR.find(y => y.slug === slug)
  const ilgiliYazilar = (mevcutYazi
    ? YAZILAR.filter(y => y.kategori === mevcutYazi.kategori && y.slug !== slug)
    : YAZILAR.filter(y => y.slug !== slug)
  ).slice(0, 3)

  useEffect(() => {
    if (isMobile) return
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) { const idx = parseInt(entry.target.id.replace('bolum-', '')); if (!isNaN(idx)) setAktifBolum(idx) } }) },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    const els = document.querySelectorAll('[id^="bolum-"]')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [bolumler, isMobile])

  // Uzun içindekiler listesinde aktif başlığı listenin görünür alanında tut
  // (yalnızca liste kutusu kayar, sayfa kaymaz).
  useEffect(() => {
    if (isMobile) return
    const kutu = document.querySelector('[data-toc-scroll]')
    const oge = kutu?.querySelector(`a[href="#bolum-${aktifBolum}"]`)
    if (!kutu || !oge || kutu.scrollHeight <= kutu.clientHeight) return
    const ust = oge.offsetTop - kutu.offsetTop
    if (ust < kutu.scrollTop || ust + oge.offsetHeight > kutu.scrollTop + kutu.clientHeight) {
      kutu.scrollTo({ top: Math.max(0, ust - kutu.clientHeight / 3), behavior: 'smooth' })
    }
  }, [aktifBolum, isMobile])

  // Hook'lardan sonra: React hook sırası bozulmasın diye erken return burada.
  if (!slug || !veri) return null

  const TOC = (
    <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #eee', marginBottom: isMobile ? '24px' : '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ width: '12px', height: '12px', background: 'var(--orange)', borderRadius: '3px', display: 'inline-block' }}></span>
        <span style={{ fontSize: '11px', color: '#111', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{isEn ? 'CONTENTS' : 'İÇİNDEKİLER'}</span>
      </div>
      <div data-toc-scroll style={{ maxHeight: isMobile ? '320px' : '45vh', overflowY: 'auto', overscrollBehavior: 'contain' }}>
      {bolumler.map((b, i) => ({ b, i })).filter(x => x.b.baslik).map(({ b, i }, sira) => (
        <a key={i} href={`#bolum-${i}`}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 10px', borderRadius: '8px', marginBottom: '2px', textDecoration: 'none', background: !isMobile && aktifBolum === i ? 'rgba(232,86,10,0.08)' : 'transparent' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, flexShrink: 0, color: !isMobile && aktifBolum === i ? 'var(--orange)' : '#ccc', minWidth: '20px' }}>{String(sira + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: '13px', lineHeight: 1.4, color: !isMobile && aktifBolum === i ? 'var(--orange)' : '#555', fontWeight: !isMobile && aktifBolum === i ? 600 : 400 }}>{b.baslik}</span>
        </a>
      ))}
      </div>
    </div>
  )

  const AuthorCard = (
    <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #eee', marginTop: isMobile ? '24px' : '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <YazarFoto size={44} />
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
          <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? 'SEO Expert · Istanbul' : 'SEO Uzmanı · İstanbul'}</div>
        </div>
      </div>
      <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, marginBottom: '12px' }}>{isEn ? '8+ years of SEO and digital marketing expertise.' : '8+ yıl deneyimli SEO ve dijital pazarlama danışmanı.'}</p>
      <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>LinkedIn →</a>
    </div>
  )

  const CTACard = (
    <div style={{ background: '#111', borderRadius: '14px', padding: '22px', textAlign: 'center', marginTop: isMobile ? '24px' : '16px' }}>
      <div style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>{isEn ? 'FREE CONSULTING' : 'ÜCRETSİZ DANIŞMA'}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#fff', marginBottom: '16px', lineHeight: 1.4 }}>{isEn ? 'Want help with this topic?' : 'Bunu uygulamak ister misiniz?'}</h3>
      <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'block', padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>{isEn ? 'Get in Touch →' : 'İletişime Geç →'}</Link>
    </div>
  )

  // Kapak görseli: makale kartının en üstünde. Sayfanın LCP öğesi olduğu için
  // priority ile önceden yüklenir; width/height oranı CLS'yi önler.
  const KapakGorseli = kapak ? (
    <figure style={{ margin: isMobile ? '0 0 24px' : '0 0 36px' }}>
      <Image
        src={kapak}
        alt={baslik}
        width={1280}
        height={720}
        priority
        sizes="(max-width: 768px) 100vw, 720px"
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: isMobile ? '10px' : '12px' }}
      />
    </figure>
  ) : null

  // Article (BlogPosting) şeması. Yazar ve yayıncı, _document.js'teki
  // global Person grafiğine @id ile bağlanır.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    mainEntityOfPage: canonicalUrl,
    headline: baslik.length > 110 ? baslik.slice(0, 107) + '...' : baslik,
    description: metaDesc,
    image: kapakUrl || 'https://fatihemincakiroglu.com/og-image.jpg',
    inLanguage: isEn ? 'en' : 'tr-TR',
    articleSection: etiket,
    ...(meta?.yayin && { datePublished: meta.yayin }),
    ...((meta?.guncelleme || meta?.yayin) && { dateModified: meta.guncelleme || meta.yayin }),
    author: {
      '@type': 'Person',
      '@id': 'https://fatihemincakiroglu.com/#person',
      name: 'Fatih Emin Çakıroğlu',
      url: `https://fatihemincakiroglu.com${isEn ? '/en/about' : '/hakkimda'}`,
      image: 'https://fatihemincakiroglu.com/images/fatih-emin-cakiroglu.jpg',
      sameAs: ['https://www.linkedin.com/in/fatihemincakiroglu/'],
    },
    publisher: { '@id': 'https://fatihemincakiroglu.com/#person' },
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Ana Sayfa', item: `https://fatihemincakiroglu.com${isEn ? '/en' : ''}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://fatihemincakiroglu.com${isEn ? '/en/blog' : '/blog'}` },
      { '@type': 'ListItem', position: 3, name: baslik, item: canonicalUrl },
    ],
  }

  // Makalenin ortasına yakın bir yerde gösterilecek bağlamsal CTA
  const midCtaIndex = bolumler.length >= 4 ? Math.floor(bolumler.length / 2) - 1 : -1
  const MidArticleCTA = (
    <div style={{ margin: '32px 0', padding: '24px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(232,86,10,0.08), rgba(232,86,10,0.02))', border: '1px solid rgba(232,86,10,0.2)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ fontSize: '28px' }}>💡</div>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '2px' }}>
          {isEn ? 'Made it this far? You might be dealing with this yourself.' : 'Bu noktaya kadar geldiyseniz, muhtemelen bununla kendiniz uğraşıyorsunuzdur.'}
        </div>
        <div style={{ fontSize: '13px', color: '#777' }}>
          {isEn ? 'Let\'s talk about how this applies to your site — free, no obligation.' : 'Bunun sizin sitenize nasıl uygulanacağını konuşalım — ücretsiz, hiçbir taahhüt yok.'}
        </div>
      </div>
      <Link href={isEn ? '/en/book-a-call' : '/randevu'} style={{ padding: '11px 20px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', flexShrink: 0 }}>
        {isEn ? 'Book a free call →' : 'Ücretsiz görüşme al →'}
      </Link>
    </div>
  )

  return (
    <>
      <Head>
        <title>{sayfaBasligi}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" type="text/markdown" href={mdUrl} title={isEn ? 'Markdown version' : 'Markdown sürümü'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {/* og:title / og:description / og:url _document.js'te merkezî üretilir. */}
        <meta property="og:type" content="article" key="og-type" />
        {meta?.yayin && <meta property="article:published_time" content={meta.yayin} key="article-published" />}
        {meta && <meta property="article:modified_time" content={meta.guncelleme || meta.yayin} key="article-modified" />}
        <meta property="article:author" content="Fatih Emin Çakıroğlu" key="article-author" />
        <meta property="article:section" content={etiket} key="article-section" />
        {kapakUrl && <meta property="og:image" content={kapakUrl} key="og-image" />}
        {kapakUrl && <meta property="og:image:width" content="1280" key="og-image-width" />}
        {kapakUrl && <meta property="og:image:height" content="720" key="og-image-height" />}
        {kapakUrl && <meta property="og:image:alt" content={baslik} key="og-image-alt" />}
        {kapakUrl && <meta name="twitter:image" content={kapakUrl} key="twitter-image" />}
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <Link href={isEn ? "/en" : "/"} style={{ color: '#aaa', fontSize: '13px' }}>{isEn ? 'Home' : 'Ana Sayfa'}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/blog' : '/blog'} style={{ color: '#aaa', fontSize: '13px' }}>Blog</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>{baslik}</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '32px 16px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '3px 8px', border: '1px solid rgba(232,86,10,0.3)', borderRadius: '4px' }}>{etiket}</span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>{sure} {isEn ? 'min read' : 'dk okuma'}</span>
              <span style={{ fontSize: '12px', color: '#ccc' }}>·</span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>🔄 {isEn ? 'Updated' : 'Son güncelleme'}: {guncelleme}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>{baslik}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <YazarFoto size={36} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? 'SEO Expert · Istanbul' : 'SEO Uzmanı · İstanbul'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE: TOC → Article → Author → CTA */}
        {isMobile ? (
          <div style={{ padding: '20px 16px 64px', maxWidth: '1100px', margin: '0 auto' }}>
            {TOC}
            <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #eee' }}>
              <AiOzetle url={canonicalUrl} baslik={baslik} isEn={isEn} isMobile={isMobile} sure={sure} />
              {KapakGorseli}
              {bolumler.map((b, bi) => (
                <div key={bi} id={`bolum-${bi}`} style={{ marginBottom: bi < bolumler.length - 1 ? '36px' : '0', scrollMarginTop: '80px' }}>
                  {b.baslik && <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '3px', height: '18px', background: 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block' }}></span>{b.baslik}
                  </h2>}
                  {b.paragraflar.map((p, pi) => renderBlok(p, pi, true, pi < b.paragraflar.length - 1 ? '14px' : (b.linkler ? '18px' : '0')))}
                  {b.linkler && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                      {b.linkler.map((l, li) => (
                        <div key={li} style={{ background: '#faf9f7', border: '1px solid #ede8e0', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                          <div style={{ flex: 1, minWidth: '200px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '2px' }}>{l.isim}</div>
                            <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.5 }}>{l.aciklama}</div>
                          </div>
                          {l.url && (
                            /* İç linkler (/ ile başlayan) nofollow veya yeni sekme almaz:
                               kendi sayfalarımıza nofollow vermek link akışını boşa harcar. */
                            l.url.startsWith('/') ? (
                              <Link href={l.url} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: '2px' }}>
                                {kartEtiketi(l.url, isEn)}
                              </Link>
                            ) : (
                              <a href={l.url} target="_blank" rel="nofollow noopener noreferrer" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: '2px' }}>
                                {isEn ? 'Visit site →' : 'Siteyi ziyaret et →'}
                              </a>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {bi === midCtaIndex && MidArticleCTA}
                </div>
              ))}
            </div>
            {AuthorCard}
            {CTACard}
          </div>
        ) : (
          /* DESKTOP: 2-col layout */
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px 96px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '32px', alignItems: 'start' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #eee' }}>
              <AiOzetle url={canonicalUrl} baslik={baslik} isEn={isEn} isMobile={isMobile} sure={sure} />
              {KapakGorseli}
              {bolumler.map((b, bi) => (
                <div key={bi} id={`bolum-${bi}`} style={{ marginBottom: bi < bolumler.length - 1 ? '44px' : '0', scrollMarginTop: '90px' }}>
                  {b.baslik && <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '4px', height: '20px', background: 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block' }}></span>{b.baslik}
                  </h2>}
                  {b.paragraflar.map((p, pi) => renderBlok(p, pi, false, pi < b.paragraflar.length - 1 ? '14px' : (b.linkler ? '18px' : '0')))}
                  {b.linkler && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                      {b.linkler.map((l, li) => (
                        <div key={li} style={{ background: '#faf9f7', border: '1px solid #ede8e0', borderRadius: '10px', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>{l.isim}</div>
                          <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.5, flex: 1 }}>{l.aciklama}</div>
                          {l.url && (
                            l.url.startsWith('/') ? (
                              <Link href={l.url} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)' }}>
                                {kartEtiketi(l.url, isEn)}
                              </Link>
                            ) : (
                              <a href={l.url} target="_blank" rel="nofollow noopener noreferrer" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)' }}>
                                {isEn ? 'Visit site →' : 'Siteyi ziyaret et →'}
                              </a>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {bi === midCtaIndex && MidArticleCTA}
                </div>
              ))}
            </div>
            <div className="sticky-sidebar" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TOC}
              {AuthorCard}
              {CTACard}
            </div>
          </div>
        )}

        {/* Genişletilmiş Yazar Kutusu (E-E-A-T) — içeriğin hemen altında, tüm görünümlerde */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px 48px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <YazarFoto size={64} />
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{isEn ? 'ABOUT THE AUTHOR' : 'YAZAR HAKKINDA'}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#111', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>Fatih Emin Çakıroğlu</div>
              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '12px' }}>{isEn ? 'SEO & GEO Consultant · Istanbul' : 'SEO & GEO Danışmanı · İstanbul'}</div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, marginBottom: '14px' }}>
                {isEn
                  ? '8+ years of hands-on SEO and GEO experience across 150+ projects in e-commerce, SaaS, healthcare and local business sectors. Writes based on real client data, not theory.'
                  : '150+ projede e-ticaret, SaaS, sağlık ve yerel işletme sektörlerinde 8+ yıllık uygulamalı SEO ve GEO deneyimi. Teoriye değil, gerçek müşteri verilerine dayanarak yazıyor.'}
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>LinkedIn →</a>
                <Link href={isEn ? '/en/about' : '/hakkimda'} style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>{isEn ? 'Full bio →' : 'Tüm özgeçmiş →'}</Link>
                <Link href={isEn ? '/en/testimonials' : '/referanslar'} style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>{isEn ? 'Client results →' : 'Müşteri sonuçları →'}</Link>
              </div>
            </div>
          </div>

          {/* İlgili Yazılar */}
          {ilgiliYazilar.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>
                {isEn ? 'Related Articles' : 'İlgili Yazılar'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '14px' }}>
                {ilgiliYazilar.map((y, i) => (
                  <Link key={i} href={isEn ? `/en/blog/${y.slug}` : `/blog/${y.slug}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #eee', display: 'block', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '6px' }}>{y.sure} {isEn ? 'min read' : 'dk okuma'}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.4, marginBottom: '6px' }}>{isEn ? y.en.baslik : y.tr.baslik}</div>
                    <span style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 600 }}>{isEn ? 'Read →' : 'Oku →'}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export const getStaticPaths = blogStaticPaths

// TR ve EN sayfaları ayrı props üretir; her sayfaya yalnızca kendi dilinin
// metni gider. EN sayfası: pages/en/blog/[slug].js
export const getStaticProps = blogStaticProps('tr')
