import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AiOzetle from '../../components/AiOzetle';
import { getRehberMeta, ayYil } from '../../lib/blog-meta';
import YazarFoto from '../../components/YazarFoto';
import { renderInline, renderBlok } from '../../components/IcerikBlok';
import { rehberStaticPaths, rehberStaticProps } from '../../lib/rehber-icerikler';
import { REHBER_LISTE } from '../../lib/rehber-liste';

const KAT_RENK = {
  'Teknik':        { bg: '#e0f2fe', color: '#0369a1', accent: '#0ea5e9' },
  'Strateji':      { bg: '#f3e8ff', color: '#7c3aed', accent: '#8b5cf6' },
  'Ölçüm':         { bg: '#dcfce7', color: '#15803d', accent: '#16a34a' },
  'AI & GEO':      { bg: '#eef2ff', color: '#4338ca', accent: '#6366f1' },
  'Ölçüm & İçerik':{ bg: '#fce7f3', color: '#be185d', accent: '#ec4899' },
}

export default function Page(props) {
  const router = useRouter()
  const slug = props.slug || router.query.slug
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')

  // İçerik getStaticProps'tan gelir (yalnızca bu rehber, yalnızca bu dil).
  const veri = props.veri || null
  const renk = KAT_RENK[veri?.kategori] || { bg: '#f5f5f5', color: '#555', accent: '#888' }
  const bolumler = (veri ? (isEn ? veri.bolumler_en : veri.bolumler_tr) : []) || []
  const baslik = veri ? (isEn ? veri.baslik_en : veri.baslik_tr) : ''
  const sss = (veri ? (isEn ? veri.sss_en : veri.sss_tr) : null) || []
  const metaBaslik = (veri && (isEn ? veri.meta_baslik_en : veri.meta_baslik_tr)) || baslik
  // Başlık eki yalnızca toplam 65 karakteri aşmıyorsa eklenir (blog ile aynı kural).
  const BASLIK_EKI = ' | Fatih Emin Çakıroğlu'
  const sayfaBasligi = (metaBaslik + BASLIK_EKI).length <= 65 ? metaBaslik + BASLIK_EKI : metaBaslik
  // İlgili rehberler: önce aynı kategori, sonra diğerleri; en fazla 3.
  const digerRehberler = REHBER_LISTE.filter(r => r.slug !== slug)
  const ilgiliRehberler = [
    ...digerRehberler.filter(r => r.kategori === veri?.kategori),
    ...digerRehberler.filter(r => r.kategori !== veri?.kategori),
  ].slice(0, 3)

  const [aktifBolum, setAktifBolum] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const observer = new IntersectionObserver(
      entries => { entries.forEach(entry => { if (entry.isIntersecting) { const idx = parseInt(entry.target.id.replace('bolum-', '')); if (!isNaN(idx)) setAktifBolum(idx) } }) },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    const els = document.querySelectorAll('[id^="bolum-"]')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [bolumler, isMobile])

  const canonicalUrl = isEn
    ? `https://fatihemincakiroglu.com/en/guides/${slug}`
    : `https://fatihemincakiroglu.com/rehber/${slug}`
  const mdUrl = `${canonicalUrl}.md`
  const meta = getRehberMeta(slug)
  const metaDesc = (veri && (isEn ? veri.meta_desc_en : veri.meta_desc_tr)) || `${baslik} — ${isEn ? 'Comprehensive guide by Fatih Emin Çakıroğlu. Strategy, technical details and implementation steps.' : 'Fatih Emin Çakıroğlu\'nun hazırladığı kapsamlı rehber. Strateji, teknik detaylar ve uygulama adımları.'}`

  // Article şeması. Yazar ve yayıncı, _document.js'teki global Person
  // grafiğine @id ile bağlanır. Tarihler: lib/blog-meta.js → REHBER_META
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    mainEntityOfPage: canonicalUrl,
    headline: baslik,
    description: metaDesc,
    image: 'https://fatihemincakiroglu.com/og-image.jpg',
    inLanguage: isEn ? 'en' : 'tr-TR',
    articleSection: veri?.kategori,
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

  const faqSchema = sss.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: sss.map(f => ({
      '@type': 'Question',
      name: f.s,
      acceptedAnswer: { '@type': 'Answer', text: f.c.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '') },
    })),
  } : null

  const sssBaslik = isEn ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'

  const TOC = (
    <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #eee', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ width: '12px', height: '12px', background: renk.accent || 'var(--orange)', borderRadius: '3px', display: 'inline-block' }}></span>
        <span style={{ fontSize: '11px', color: '#111', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          {isEn ? 'CONTENTS' : 'İÇİNDEKİLER'}
        </span>
      </div>
      {bolumler.map((b, i) => (
        <a key={i} href={`#bolum-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 10px', borderRadius: '8px', marginBottom: '2px', textDecoration: 'none', background: !isMobile && aktifBolum === i ? `${renk.accent}12` : 'transparent', transition: 'all 0.2s' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, flexShrink: 0, minWidth: '20px', color: !isMobile && aktifBolum === i ? renk.accent : '#ccc' }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: '13px', lineHeight: 1.4, color: !isMobile && aktifBolum === i ? renk.accent : '#555', fontWeight: !isMobile && aktifBolum === i ? 600 : 400 }}>{b.baslik || (isEn ? 'Introduction' : 'Giriş')}</span>
        </a>
      ))}
      {sss.length > 0 && (
        <a href="#sss" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 10px', borderRadius: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, flexShrink: 0, minWidth: '20px', color: '#ccc' }}>{String(bolumler.length + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: '13px', lineHeight: 1.4, color: '#555' }}>{sssBaslik}</span>
        </a>
      )}
    </div>
  )

  // SSS + ilgili rehberler: makalenin sonunda (mobil ve masaüstü ortak)
  const SonBolum = (
    <>
      {sss.length > 0 && (
        <section id="sss" style={{ marginTop: '44px', scrollMarginTop: '90px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '17px' : '20px', fontWeight: 800, color: '#111', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ width: '4px', minHeight: '20px', background: renk.accent || 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block', marginTop: '3px' }}></span>
            {sssBaslik}
          </h2>
          {sss.map((f, i) => (
            <div key={i} style={{ borderTop: '1px solid #f0ece6', padding: '16px 0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '6px', lineHeight: 1.45 }}>{f.s}</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{renderInline(f.c)}</p>
            </div>
          ))}
        </section>
      )}
      {ilgiliRehberler.length > 0 && (
        <section style={{ marginTop: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '17px' : '20px', fontWeight: 800, color: '#111', marginBottom: '14px' }}>
            {isEn ? 'Related guides' : 'İlgili rehberler'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '12px' }}>
            {ilgiliRehberler.map(r => {
              const l = isEn ? r.en : r.tr
              return (
                <Link key={r.slug} href={isEn ? `/en/guides/${r.slug}` : `/rehber/${r.slug}`} style={{ display: 'block', padding: '16px', borderRadius: '12px', border: '1px solid #eee', background: '#faf9f7', textDecoration: 'none' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', lineHeight: 1.4, marginBottom: '6px' }}>{l.baslik}</div>
                  <div style={{ fontSize: '12.5px', color: '#777', lineHeight: 1.55, marginBottom: '8px' }}>{l.ozet}</div>
                  <span style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 600 }}>{isEn ? 'Read the guide →' : 'Rehberi oku →'}</span>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </>
  )

  const AuthorCard = (
    <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #eee', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <YazarFoto size={44} />
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
          <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? 'SEO Expert · Istanbul' : 'SEO Uzmanı · İstanbul'}</div>
        </div>
      </div>
      <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, marginBottom: '12px' }}>
        {isEn ? '8+ years of SEO and digital marketing expertise.' : '8+ yıl deneyimli SEO ve dijital pazarlama danışmanı.'}
      </p>
      <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>LinkedIn →</a>
    </div>
  )

  const CTACard = (
    <div style={{ background: '#111', borderRadius: '14px', padding: '22px', textAlign: 'center' }}>
      <div style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
        {isEn ? 'FREE CONSULTING' : 'ÜCRETSİZ DANIŞMA'}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#fff', marginBottom: '16px', lineHeight: 1.4 }}>
        {isEn ? 'Want help applying this?' : 'Bu konuda yardım almak ister misiniz?'}
      </h3>
      <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'block', padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
        {isEn ? 'Get in Touch →' : 'İletişime Geç →'}
      </Link>
    </div>
  )


  // Hook'lardan sonra: React hook sırası bozulmasın diye erken return burada.
  if (!slug || !veri) return null

  return (
    <>
      <Head>
        <title>{sayfaBasligi}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" key="og-type" />
        <meta property="article:author" content="Fatih Emin Çakıroğlu" key="article-author" />
        <link rel="alternate" type="text/markdown" href={mdUrl} title={isEn ? 'Markdown version' : 'Markdown sürümü'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":isEn?"Home":"Ana Sayfa","item":"https://fatihemincakiroglu.com"},{"@type":"ListItem","position":2,"name":isEn?"Guides":"Rehber","item":`https://fatihemincakiroglu.com/${isEn?'en/guides':'rehber'}`},{"@type":"ListItem","position":3,"name":baslik,"item":canonicalUrl}] }) }} />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5', overflowX: 'clip' }}>

        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '13px', color: '#aaa' }}>
            <Link href={isEn ? '/en' : '/'} style={{ color: '#aaa' }}>{isEn ? 'Home' : 'Ana Sayfa'}</Link>
            <span>›</span>
            <Link href={isEn ? '/en/guides' : '/rehber'} style={{ color: '#aaa' }}>{isEn ? 'Guides' : 'Rehber'}</Link>
            <span>›</span>
            <span style={{ color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{baslik}</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '32px 16px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Link href={isEn ? '/en/guides' : '/rehber'} style={{ fontSize: '13px', color: '#aaa', display: 'inline-block', marginBottom: '16px' }}>
              ← {isEn ? 'All Guides' : 'Tüm Rehberler'}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ padding: '4px 10px', borderRadius: '4px', background: renk.bg, color: renk.color, fontSize: '11px', fontWeight: 700 }}>{veri.kategori}</span>
              <span style={{ fontSize: '12px', color: '#bbb' }}>· {isEn ? 'SEO Guide' : 'SEO Rehberi'}</span>
              {meta && <span style={{ fontSize: '12px', color: '#bbb' }}>· {isEn ? 'Updated' : 'Son güncelleme'}: {ayYil(meta.guncelleme || meta.yayin, isEn)}</span>}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>{baslik}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <YazarFoto size={36} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? 'SEO & Digital Marketing Expert' : 'SEO & Dijital Pazarlama Uzmanı'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE: TOC → Article → Author → CTA */}
        {isMobile ? (
          <div style={{ padding: '20px 16px 64px', maxWidth: '1100px', margin: '0 auto' }}>
            {TOC}
            <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #eee', marginBottom: '16px' }}>
              <AiOzetle url={canonicalUrl} baslik={baslik} isEn={isEn} isMobile={isMobile} tur="rehber" />
              {bolumler.map((b, bi) => (
                <div key={bi} id={`bolum-${bi}`} style={{ marginBottom: bi < bolumler.length - 1 ? '36px' : '0', scrollMarginTop: '80px' }}>
                  {b.baslik && (
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 800, color: '#111', marginBottom: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ width: '3px', minHeight: '18px', background: renk.accent || 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block', marginTop: '3px' }}></span>
                      {b.baslik}
                    </h2>
                  )}
                  {b.paragraflar.map((p, pi) => renderBlok(p, pi, true, pi < b.paragraflar.length - 1 ? '12px' : '0'))}
                </div>
              ))}
              {SonBolum}
            </div>
            {AuthorCard}
            {CTACard}
          </div>
        ) : (
          /* DESKTOP: Sidebar left, article right */
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px 96px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }}>
            {/* Sidebar */}
            <div className="sticky-sidebar" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: 'calc(100vh - var(--nav-h) - 48px)', overflowY: 'auto' }}>
              {TOC}
              {AuthorCard}
              {CTACard}
            </div>
            {/* Article */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #eee' }}>
              <AiOzetle url={canonicalUrl} baslik={baslik} isEn={isEn} isMobile={isMobile} tur="rehber" />
              {bolumler.map((b, bi) => (
                <div key={bi} id={`bolum-${bi}`} style={{ marginBottom: bi < bolumler.length - 1 ? '44px' : '0', scrollMarginTop: '90px' }}>
                  {b.baslik && (
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ width: '4px', minHeight: '20px', background: renk.accent || 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block', marginTop: '3px' }}></span>
                      {b.baslik}
                    </h2>
                  )}
                  {b.paragraflar.map((p, pi) => renderBlok(p, pi, false, pi < b.paragraflar.length - 1 ? '14px' : '0'))}
                </div>
              ))}
              {SonBolum}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export const getStaticPaths = rehberStaticPaths
// TR sayfası; EN sayfası (pages/en/guides/[slug].js) rehberStaticProps('en') kullanır.
export const getStaticProps = rehberStaticProps('tr')
