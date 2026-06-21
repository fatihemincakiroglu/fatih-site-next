import Link from 'next/link';
import Head from 'next/head';


const HIZMETLER = [
  { url: '/seo', ikon: '🔍', baslik: 'SEO Danışmanlığı', aciklama: 'Teknik SEO, içerik optimizasyonu ve backlink stratejisiyle organik büyüme.' },
  { url: '/icerik', ikon: '✍️', baslik: 'İçerik Stratejisi', aciklama: 'Arama niyetine uygun, topical authority inşa eden içerik üretimi.' },
  { url: '/performans', ikon: '📈', baslik: 'Performans & Growth', aciklama: 'Trafik, dönüşüm ve büyüme hedeflerini birlikte optimize etme.' },
  { url: '/geo', ikon: '🤖', baslik: 'GEO Danışmanlığı', aciklama: 'ChatGPT, Perplexity ve AI Overview\'da kaynak olarak görünme.' },
  { url: '/backlink', ikon: '🔗', baslik: 'Backlink & Dijital PR', aciklama: 'Editoryal linkler ve dijital PR kampanyalarıyla otorite inşası.' },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>SEO Hizmetleri | Fatih Emin Çakıroğlu</title>
        <meta name="description" content="SEO danışmanlığı, GEO, içerik stratejisi, backlink ve performans optimizasyonu hizmetleri. Organik büyümeniz için tam kapsamlı çözümler." />
        <link rel="canonical" href="https://fatihemincakiroglu.com/hizmetler" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "SEO Danışmanlık Hizmetleri",
          "itemListElement": HIZMETLER.map((h, i) => ({
            "@type": "ListItem", "position": i + 1, "name": h.baslik,
            "url": `https://fatihemincakiroglu.com${h.url}`
          }))
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"},
            {"@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://fatihemincakiroglu.com/hizmetler"}
          ]
        })}</script>
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>Hizmetler</span>
          </div>
        </div>

        <div style={{ background: '#1a1612', padding: '80px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>HİZMETLER</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
              Organik büyüme için<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>kapsamlı danışmanlık</span>
            </h1>
            <p style={{ color: '#9a9a9a', fontSize: '18px', maxWidth: '540px', margin: '0 auto' }}>SEO\'dan GEO\'ya, içerikten backlink\'e her alanda veri odaklı strateji.</p>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '64px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {HIZMETLER.map((h, i) => (
              <Link key={i} href={h.url} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee', transition: 'transform 0.2s, box-shadow 0.2s', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '16px' }}>{h.ikon}</div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '10px', fontFamily: 'var(--font-display)' }}>{h.baslik}</h2>
                  <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.6, marginBottom: '20px' }}>{h.aciklama}</p>
                  <span style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '14px' }}>Detayları gör →</span>
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
