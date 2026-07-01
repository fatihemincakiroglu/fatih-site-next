import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const kaynaklar = isEn ? [
    { url: '/seo-rehberi', ikon: '📖', baslik: 'SEO Guide', aciklama: 'Comprehensive guide on technical SEO, content and backlinks.', yeni: false },
    { url: '/geo-rehberi', ikon: '🤖', baslik: 'GEO Guide', aciklama: 'Complete guide on generative engine optimization strategies.', yeni: true },
    { url: '/ai-sozluk', ikon: '📚', baslik: 'AI Glossary', aciklama: '125+ SEO, GEO and AI terms explained.', yeni: false },
    { url: '/sss', ikon: '❓', baslik: 'FAQ', aciklama: 'Most frequently asked questions about SEO consulting.', yeni: false },
    { url: '/rehber', ikon: '🗺️', baslik: 'Guides', aciklama: 'Guides covering all topics from technical SEO to GEO.', yeni: false },
  ] : [
    { url: '/seo-rehberi', ikon: '📖', baslik: 'SEO Rehberi', aciklama: 'Teknik SEO, içerik ve backlink hakkında kapsamlı rehber.', yeni: false },
    { url: '/geo-rehberi', ikon: '🤖', baslik: 'GEO Rehberi', aciklama: 'Generative engine optimization stratejileri hakkında eksiksiz rehber.', yeni: true },
    { url: '/ai-sozluk', ikon: '📚', baslik: 'AI Sözlük', aciklama: '125+ SEO, GEO ve AI teriminin açıklaması.', yeni: false },
    { url: '/sss', ikon: '❓', baslik: 'SSS', aciklama: 'SEO danışmanlığı hakkında en sık sorulan sorular.', yeni: false },
    { url: '/rehber', ikon: '🗺️', baslik: 'Rehberler', aciklama: 'Teknik SEO\'dan GEO\'ya tüm konuları kapsayan rehberler.', yeni: false },
  ]
  const t = {
    title: isEn ? 'SEO Resources | Fatih Emin Çakıroğlu' : 'SEO Kaynakları | Fatih Emin Çakıroğlu',
    badge: isEn ? 'RESOURCES' : 'KAYNAKLAR',
    h1: isEn ? 'SEO & GEO Resources' : 'SEO & GEO Kaynakları',
    desc: isEn ? 'Guides, glossaries and tools to improve your SEO and GEO knowledge.' : 'SEO ve GEO bilginizi geliştirmek için rehberler, sözlükler ve araçlar.',
    newBadge: isEn ? 'NEW' : 'YENİ',
    explore: isEn ? 'Explore →' : 'İncele →',
    breadcrumb: isEn ? ['Home', 'Resources'] : ['Ana Sayfa', 'Kaynaklar'],
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? 'Useful resources, free tools and comprehensive guides for SEO and digital marketing. Discover content designed to support your organic growth journey.' : 'SEO ve dijital pazarlama için faydalı kaynaklar, ücretsiz araçlar ve kapsamlı rehberler. Organik büyüme yolculuğunuzda size destek olacak içerikleri keşfedin.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/resources' : 'https://fatihemincakiroglu.com/kaynaklar'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/kaynaklar" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/resources" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/kaynaklar" />
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
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>{t.h1}</h1>
            <p style={{ color: '#777', fontSize: '16px' }}>{t.desc}</p>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {kaynaklar.map((k, i) => (
              <Link key={i} href={k.url} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eee', display: 'block', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '28px' }}>{k.ikon}</span>
                  {k.yeni && <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--orange)', padding: '2px 8px', border: '1px solid var(--orange)', borderRadius: '4px' }}>{t.newBadge}</span>}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{k.baslik}</h3>
                <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6, marginBottom: '16px' }}>{k.aciklama}</p>
                <span style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '13px' }}>{t.explore}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() { return { props: {} } }
