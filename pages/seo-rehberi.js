import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const isGeo = 'seo-rehberi' === 'geo-rehberi'

const CONTENT = {
  tr: {
    title: isGeo ? 'GEO Rehberi | Fatih Emin Çakıroğlu' : 'SEO Rehberi | Fatih Emin Çakıroğlu',
    badge: isGeo ? 'GEO REHBERİ' : 'SEO REHBERİ',
    h1: isGeo ? 'GEO Rehberi' : 'SEO Rehberi',
    desc: isGeo ? 'Generative Engine Optimization — yapay zekâ arama motorlarında görünürlük stratejileri.' : 'Teknik SEO, içerik optimizasyonu ve backlink stratejisi hakkında kapsamlı rehber.',
    breadcrumb: ['Ana Sayfa', 'Kaynaklar', isGeo ? 'GEO Rehberi' : 'SEO Rehberi'],
  },
  en: {
    title: isGeo ? 'GEO Guide | Fatih Emin Çakıroğlu' : 'SEO Guide | Fatih Emin Çakıroğlu',
    badge: isGeo ? 'GEO GUIDE' : 'SEO GUIDE',
    h1: isGeo ? 'GEO Guide' : 'SEO Guide',
    desc: isGeo ? 'Generative Engine Optimization — strategies for visibility in AI search engines.' : 'Comprehensive guide on technical SEO, content optimization and backlink strategy.',
    breadcrumb: ['Home', 'Resources', isGeo ? 'GEO Guide' : 'SEO Guide'],
  }
}

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const c = isEn ? CONTENT.en : CONTENT.tr
  const enUrl = isGeo ? 'https://fatihemincakiroglu.com/en/geo-guide' : 'https://fatihemincakiroglu.com/en/seo-guide'
  const trUrl = isGeo ? 'https://fatihemincakiroglu.com/geo-rehberi' : 'https://fatihemincakiroglu.com/seo-rehberi'
  return (
    <>
      <Head>
        <title>{c.title}</title>
        <meta name="description" content={c.desc} />
        <link rel="canonical" href={isEn ? enUrl : trUrl} />
        <link rel="alternate" hrefLang="tr" href={trUrl} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="x-default" href={trUrl} />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{c.breadcrumb[0]}</Link><span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn?'/resources':'/kaynaklar'} style={{ color: '#aaa', fontSize: '13px' }}>{c.breadcrumb[1]}</Link><span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{c.breadcrumb[2]}</span>
          </div>
        </div>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{c.badge}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#111', marginBottom: '16px' }}>{c.h1}</h1>
          <p style={{ fontSize: '18px', color: '#666', lineHeight: 1.7, marginBottom: '48px' }}>{c.desc}</p>
          <Link href={isEn?'/contact':'/iletisim'} style={{ display: 'inline-block', padding: '14px 28px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-body)' }}>
            {isEn ? 'Get Consulting →' : 'Danışmanlık Al →'}
          </Link>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
