import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import LeadMagnet from '../components/LeadMagnet';
import { YAYINDAKI_REHBER_SLUGS } from '../lib/content-index';
import { REHBER_LISTE } from '../lib/rehber-liste';

// Liste: lib/rehber-liste.js (yalnızca başlık/özet; içerikler istemciye gitmez)
const TUM_REHBERLER_LISTE = REHBER_LISTE;

// Yalnızca gerçek içeriği yazılmış rehberler listelenir / indekslenir.
// Yeni rehber yayına alınca lib/content-index.js -> YAYINDAKI_REHBER_SLUGS'a eklenir.
const REHBERLER = TUM_REHBERLER_LISTE.filter(r => YAYINDAKI_REHBER_SLUGS.includes(r.slug))

const KATEGORILER = {
  tr: ['Tümü', 'Strateji', 'Teknik', 'AI & GEO', 'Ölçüm'],
  en: ['All', 'Strategy', 'Technical', 'AI & GEO', 'Measurement'],
};
// Maps the localized category label back to the canonical (TR) key stored on each item
const KAT_EN_TO_TR = {
  'All': 'Tümü', 'Strategy': 'Strateji', 'Technical': 'Teknik',
  'AI & GEO': 'AI & GEO', 'Measurement': 'Ölçüm',
};
const KAT_RENK = {
  Teknik: { bg: '#e0f2fe', color: '#0369a1' },
  Strateji: { bg: '#f3e8ff', color: '#7c3aed' },
  'Ölçüm': { bg: '#dcfce7', color: '#15803d' },
  'AI & GEO': { bg: '#e0f2fe', color: '#0284c7' },
};

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const kategoriler = isEn ? KATEGORILER.en : KATEGORILER.tr
  const [aktifKat, setAktifKat] = useState(kategoriler[0]);
  const [arama, setArama] = useState('');

  // Normalize the active filter back to the canonical (TR) category key used on REHBERLER items
  const aktifKatTr = isEn ? (aktifKat === 'All' ? 'Tümü' : (KAT_EN_TO_TR[aktifKat] || aktifKat)) : aktifKat

  let filtered = aktifKatTr === 'Tümü' ? REHBERLER : REHBERLER.filter(r => r.kategori === aktifKatTr);
  if (arama) filtered = filtered.filter(r => {
    const l = isEn ? r.en : r.tr
    return l.baslik.toLowerCase().includes(arama.toLowerCase()) || l.ozet.toLowerCase().includes(arama.toLowerCase())
  });

  const t = isEn ? {
    eyebrow: 'GUIDES', h1a: 'SEO Knowledge', h1b: 'Guides',
    intro: `${REHBERLER.length} comprehensive guides on technical SEO, GEO and digital marketing. Each on its own page, with detailed content.`,
    searchPh: 'Search guides...', countSuffix: 'guides', cta: 'Read guide →',
    breadcrumbHome: 'Home', breadcrumbSelf: 'Guides',
  } : {
    eyebrow: 'REHBER', h1a: 'SEO Bilgi', h1b: 'Rehberleri',
    intro: `Teknik SEO, GEO ve dijital pazarlama hakkında ${REHBERLER.length} kapsamlı rehber. Her biri ayrı sayfada, detaylı içerikle.`,
    searchPh: 'Rehberlerde ara...', countSuffix: 'rehber', cta: 'Rehberi oku →',
    breadcrumbHome: 'Ana Sayfa', breadcrumbSelf: 'Rehber',
  }

  return (
    <>
      <Head>
        <title>{isEn ? 'SEO Guides | Fatih Emin Çakıroğlu' : 'SEO Rehberleri | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? 'Comprehensive step-by-step guides on technical SEO, GEO, backlink building and content strategy. Actionable tactics to boost your organic search visibility.' : 'Teknik SEO, GEO, backlink inşası ve içerik stratejisi hakkında adım adım kapsamlı rehberler. Uygulanabilir taktiklerle organik görünürlüğünüzü artırın.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/guides' : 'https://fatihemincakiroglu.com/rehber'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "CollectionPage", "name": isEn ? "SEO Guides" : "SEO Rehberleri", "url": isEn ? "https://fatihemincakiroglu.com/en/guides" : "https://fatihemincakiroglu.com/rehber", "description": isEn ? "Comprehensive guides on technical SEO, GEO, backlinks and content strategy." : "Teknik SEO, GEO, backlink ve içerik stratejisi hakkında kapsamlı rehberler.", "author": {"@id": "https://fatihemincakiroglu.com/#person"}}) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": t.breadcrumbHome, "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": t.breadcrumbSelf, "item": isEn ? "https://fatihemincakiroglu.com/en/guides" : "https://fatihemincakiroglu.com/rehber"}]}) }} />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href={isEn ? '/en' : '/'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumbHome}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumbSelf}</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.eyebrow}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
              {t.h1a} <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{t.h1b}</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '520px' }}>{t.intro}</p>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '32px 32px 96px' }}>
          {/* Kontroller */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '8px 14px' }}>
              <span style={{ color: '#aaa' }}>🔍</span>
              <input type="text" placeholder={t.searchPh} value={arama} onChange={e => setArama(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', fontFamily: 'var(--font-body)', width: '180px' }} />
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {kategoriler.map(k => (
                <button key={k} onClick={() => setAktifKat(k)} style={{
                  padding: '7px 14px', borderRadius: '20px',
                  background: aktifKat === k ? 'var(--orange)' : '#fff',
                  color: aktifKat === k ? '#fff' : '#555',
                  border: aktifKat === k ? 'none' : '1px solid #eee',
                  fontSize: '13px', fontWeight: aktifKat === k ? 700 : 400,
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}>{k}</button>
              ))}
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#aaa' }}>{filtered.length} {t.countSuffix}</span>
          </div>

          {/* Grid — tıklandığında ayrı sayfaya */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filtered.map((r, i) => {
              const renk = KAT_RENK[r.kategori] || { bg: '#f5f5f5', color: '#555' };
              const l = isEn ? r.en : r.tr
              const kategoriLabel = isEn
                ? (Object.keys(KAT_EN_TO_TR).find(k => KAT_EN_TO_TR[k] === r.kategori) || r.kategori)
                : r.kategori
              return (
                <Link key={i} href={isEn ? `/en/guides/${r.slug}` : `/rehber/${r.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#fff', borderRadius: '14px', padding: '24px',
                    border: '1px solid #eee', transition: 'transform 0.2s, box-shadow 0.2s',
                    display: 'flex', flexDirection: 'column', height: '100%',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span style={{ fontSize: '22px' }}>{r.ikon}</span>
                      <span style={{ padding: '3px 8px', borderRadius: '4px', background: renk.bg, color: renk.color, fontSize: '10px', fontWeight: 700 }}>{kategoriLabel}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#ccc', fontWeight: 700, marginBottom: '6px' }}>{r.no}</div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '8px', lineHeight: 1.3 }}>{l.baslik}</h3>
                    <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>{l.ozet}</p>
                    <span style={{ color: 'var(--orange)', fontSize: '13px', fontWeight: 600 }}>{t.cta}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ marginTop: '32px' }}>
            <LeadMagnet isEn={isEn} />
          </div>
        </div>
      </div>
    </>
  );
}

