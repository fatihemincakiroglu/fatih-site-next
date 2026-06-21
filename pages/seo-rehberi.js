import Link from 'next/link';
import Head from 'next/head';


const REHBERLER = [
  { url: '/rehber/teknik-seo', baslik: 'Teknik SEO', aciklama: 'Crawl bütçesi, site mimarisi, HTTP ve performans.' },
  { url: '/rehber/on-page-seo', baslik: 'On-Page SEO', aciklama: 'Başlık, içerik sinyalleri ve sayfa içi optimizasyon.' },
  { url: '/rehber/off-page-seo', baslik: 'Off Page SEO', aciklama: 'Dış güven, itibar ve marka sinyalleri.' },
  { url: '/rehber/keyword-research', baslik: 'Keyword Research', aciklama: 'Arama niyeti odaklı anahtar kelime araştırması.' },
  { url: '/rehber/backlink', baslik: 'Link Oluşturma', aciklama: 'Backlink kalitesi ve sürdürülebilir link stratejisi.' },
  { url: '/rehber/mobil-seo', baslik: 'Mobil SEO', aciklama: 'Mobile-first indeksleme ve mobil deneyim.' },
  { url: '/rehber/core-web-vitals', baslik: 'Core Web Vitals', aciklama: 'LCP, INP ve CLS optimizasyonu.' },
  { url: '/rehber/yerel-seo', baslik: 'Yerel SEO', aciklama: 'Google Maps ve yerel arama optimizasyonu.' },
  { url: '/rehber/seo-101', baslik: 'SEO 101', aciklama: 'SEO\'ya giriş için temel çerçeve.' },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>SEO Rehberi | Fatih Emin Çakıroğlu</title>
        <meta name="description" content="Kapsamlı SEO rehberi: Teknik SEO, içerik optimizasyonu, backlink stratejisi ve arama motoru algoritmaları hakkında detaylı bilgi." />
        <link rel="canonical" href="https://fatihemincakiroglu.com/seo-rehberi" />

        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "Article", "name": "SEO Rehberi", "headline": "Kapsamlı SEO Rehberi", "url": "https://fatihemincakiroglu.com/seo-rehberi", "description": "Teknik SEO, içerik optimizasyonu ve backlink stratejisi hakkında kapsamlı rehber.", "author": {"@id": "https://fatihemincakiroglu.com/#person"}, "publisher": {"@type": "Person", "name": "Fatih Emin Çakıroğlu"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "Kaynaklar", "item": "https://fatihemincakiroglu.com/kaynaklar"}, {"@type": "ListItem", "position": 3, "name": "SEO Rehberi", "item": "https://fatihemincakiroglu.com/seo-rehberi"}]})}</script>
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/kaynaklar" style={{ color: '#aaa', fontSize: '13px' }}>Kaynaklar</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>SEO Rehberi</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '64px 32px 48px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <Link href="/kaynaklar" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>← Kaynaklar</Link>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>SEO REHBERİ</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>SEO Rehberleri</h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '500px' }}>Teknik SEO'dan içerik stratejisine kapsamlı rehberler.</p>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {REHBERLER.map((r, i) => (
              <Link key={i} href={r.url} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #eee', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.07)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>{r.baslik}</h2>
                  <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6, marginBottom: '12px' }}>{r.aciklama}</p>
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

export async function getServerSideProps() { return { props: {} } }
