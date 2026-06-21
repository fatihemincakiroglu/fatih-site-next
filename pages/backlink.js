import Link from 'next/link';
import Head from 'next/head';


export default function Page() {
  const neler = ['Link profil analizi','Dijital PR kampanyaları','Medya ilişkileri','Broken link building','Rakip link analizi','Editoryal içerik stratejisi'];
  return (
    <>
      <Head>
        <title>Backlink ve Dijital PR | Fatih Emin Çakıroğlu</title>
        <meta name="description" content="Editoryal backlink, dijital PR ve marka sinyalleriyle domain otoritenizi güçlendirin. Kalıcı ve sürdürülebilir link profili inşası." />
        <link rel="canonical" href="https://fatihemincakiroglu.com/backlink" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Backlink ve Dijital PR","provider":{"@type":"Person","name":"Fatih Emin Çakıroğlu"},"url":"https://fatihemincakiroglu.com/backlink"})}</script>

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"},
            {"@type": "ListItem", "position": 2, "name": "Backlink & Dijital PR", "item": "https://fatihemincakiroglu.com/backlink"}
          ]
        })}</script>
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/hizmetler" style={{ color: '#aaa', fontSize: '13px' }}>Hizmetler</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>Backlink & Dijital PR</span>
          </div>
        </div>

        <div style={{ background: '#1a1612', padding: '80px 32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/hizmetler" style={{ fontSize: '13px', color: '#4a4540', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← Tüm Hizmetler</Link>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>BACKLİNK & DİJİTAL PR</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>Backlink ve Dijital PR</h1>
            <p style={{ color: '#9a9a9a', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '580px' }}>Editoryal linkler, medya ilişkileri ve dijital PR kampanyalarıyla domain otoritenizi artırıyorum. Manipülatif değil, sürdürülebilir link inşası.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/iletisim"><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Ücretsiz Teklif Al →</button></Link>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '40px' }}>
            {neler.map((n, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '10px', padding: '20px', border: '1px solid #eee', display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--orange)', fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: '14px', color: '#555' }}>{n}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '12px' }}>Backlink danışmanlığı almak ister misiniz?</h2>
            <Link href="/iletisim"><button style={{ padding: '13px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>İletişime Geç →</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
