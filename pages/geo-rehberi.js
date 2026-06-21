import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link';
import Head from 'next/head';


const KONULAR = [
  { url: '/rehber/geo-nedir', baslik: 'GEO Nedir?', aciklama: 'Generative Engine Optimization\'ın tanımı ve SEO\'dan farkı.' },
  { url: '/rehber/llmstxt', baslik: 'llms.txt', aciklama: 'LLM tabanlı sistemler için standart dosya oluşturma.' },
  { url: '/rehber/ai-overview', baslik: 'AI Overview Optimizasyonu', aciklama: 'Google AI Overview\'da kaynak olarak görünme.' },
  { url: '/rehber/aeo', baslik: 'Answer Engine Optimization', aciklama: 'Yanıt motorlarına uygun içerik stratejisi.' },
  { url: '/rehber/zero-click', baslik: 'Zero-Click Search', aciklama: 'Tıklamasız aramada görünürlük stratejisi.' },
  { url: '/rehber/eeat', baslik: 'E-E-A-T Rehberi', aciklama: 'Deneyim, Uzmanlık, Otorite ve Güvenilirlik sinyalleri.' },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>GEO Rehberi | Fatih Emin Çakıroğlu</title>
        <meta name="description" content="Generative Engine Optimization rehberi: Yapay zekâ arama motorlarında görünür olma stratejileri ve LLM optimizasyonu." />
        <link rel="canonical" href="https://fatihemincakiroglu.com/geo-rehberi" />

        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "Article", "name": "GEO Rehberi", "headline": "Kapsamlı GEO Rehberi", "url": "https://fatihemincakiroglu.com/geo-rehberi", "description": "Generative Engine Optimization rehberi: Yapay zekâ arama motorlarında görünürlük stratejileri.", "author": {"@id": "https://fatihemincakiroglu.com/#person"}, "publisher": {"@type": "Person", "name": "Fatih Emin Çakıroğlu"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "Kaynaklar", "item": "https://fatihemincakiroglu.com/kaynaklar"}, {"@type": "ListItem", "position": 3, "name": "GEO Rehberi", "item": "https://fatihemincakiroglu.com/geo-rehberi"}]})}</script>
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/kaynaklar" style={{ color: '#aaa', fontSize: '13px' }}>Kaynaklar</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>GEO Rehberi</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '64px 32px 48px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <Link href="/kaynaklar" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>← Kaynaklar</Link>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>GEO REHBERİ</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>GEO Rehberleri</h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '500px' }}>Yapay zeka aramasında görünürlük için kapsamlı rehberler.</p>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {KONULAR.map((k, i) => (
              <Link key={i} href={k.url} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #eee', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.07)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>{k.baslik}</h2>
                  <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6, marginBottom: '12px' }}>{k.aciklama}</p>
                  <span style={{ color: 'var(--orange)', fontSize: '13px', fontWeight: 600 }}>Okumaya başla →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "geo-rehberi"])),
    },
  }
}
