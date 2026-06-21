import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const YAZILAR = [
  { slug: 'teknik-seo-2025', baslik_tr: 'Teknik SEO\'da 2025 Öncelikleri: Core Web Vitals ve Crawl Optimizasyonu', baslik_en: '2025 Technical SEO Priorities: Core Web Vitals and Crawl Optimization', etiket: 'TEKNİK SEO', sure: '8 dk', tarih: '2025' },
  { slug: 'geo-nedir', baslik_tr: 'GEO Nedir? Google AI Overview\u2019da Kaynak Olmanın Yolu', baslik_en: 'What is GEO? The Path to Becoming a Source in Google AI Overview', etiket: 'GEO', sure: '9 dk', tarih: '2025' },
  { slug: 'eeat-topical-authority', baslik_tr: 'E-E-A-T Sinyalleri ve Topical Authority İnşası', baslik_en: 'E-E-A-T Signals and Building Topical Authority', etiket: 'STRATEJİ', sure: '7 dk', tarih: '2025' },
  { slug: 'llms-txt', baslik_tr: 'LLMs.txt ile Yapay Zekâ Arama Görünürlüğü Nasıl Artırılır?', baslik_en: 'How to Increase AI Search Visibility with LLMs.txt', etiket: 'TEKNİK', sure: '6 dk', tarih: '2025' },
  { slug: 'backlink-analizi', baslik_tr: 'Backlink Profili Analizi: Toksik Link Tespiti ve Temizleme', baslik_en: 'Backlink Profile Analysis: Toxic Link Detection and Cleanup', etiket: 'BACKLINK', sure: '8 dk', tarih: '2025' },
];

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [arama, setArama] = useState('')
  const filtered = arama ? YAZILAR.filter(y => (isEn ? y.baslik_en : y.baslik_tr).toLowerCase().includes(arama.toLowerCase())) : YAZILAR
  const t = {
    title: isEn ? 'Blog | Fatih Emin Çakıroğlu — SEO & Digital Marketing' : 'Blog | Fatih Emin Çakıroğlu — SEO & Dijital Pazarlama',
    badge: isEn ? 'BLOG' : 'BLOG',
    h1: isEn ? 'SEO & GEO Insights' : 'SEO & GEO İçgörüleri',
    desc: isEn ? 'Current articles on SEO, GEO and AI search. Practical insights and actionable frameworks.' : 'SEO, GEO ve AI arama üzerine güncel makaleler. Pratik içgörüler ve uygulanabilir çerçeveler.',
    placeholder: isEn ? 'Search articles...' : 'Yazılarda ara...',
    readMore: isEn ? 'Read →' : 'Oku →',
    duration: isEn ? 'min read' : 'dk okuma',
    breadcrumb: isEn ? ['Home', 'Blog'] : ['Ana Sayfa', 'Blog'],
    noResult: isEn ? 'No articles found.' : 'Yazı bulunamadı.',
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? 'Current articles on SEO, GEO and digital marketing. Practical insights on AI search trends.' : 'SEO, GEO ve dijital pazarlama üzerine güncel makaleler. Yapay zekâ arama trendleri.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/blog' : 'https://fatihemincakiroglu.com/blog'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/blog" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/blog" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 40px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.badge}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '20px' }}>{t.h1}</h1>
            <p style={{ color: '#777', fontSize: '16px', marginBottom: '24px' }}>{t.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8f7f5', border: '1px solid #eee', borderRadius: '8px', padding: '10px 16px', maxWidth: '400px' }}>
              <span style={{ color: '#aaa' }}>🔍</span>
              <input type="text" placeholder={t.placeholder} value={arama} onChange={e => setArama(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%' }} />
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 32px 96px' }}>
          {filtered.length === 0 ? (
            <p style={{ color: '#aaa', textAlign: 'center', padding: '48px' }}>{t.noResult}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filtered.map((y, i) => (
                <Link key={i} href={`/blog/${y.slug}`} style={{ background: '#fff', borderRadius: '16px', padding: '28px 32px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '3px 8px', border: '1px solid rgba(232,86,10,0.3)', borderRadius: '4px' }}>{y.etiket}</span>
                      <span style={{ fontSize: '12px', color: '#aaa' }}>{y.sure} {t.duration}</span>
                    </div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', lineHeight: 1.4 }}>{isEn ? y.baslik_en : y.baslik_tr}</h2>
                  </div>
                  <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{t.readMore}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() { return { props: {} } }
