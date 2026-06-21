import Link from 'next/link';
import Head from 'next/head';


const NELER = [
  { baslik: 'Teknik SEO Denetimi', detay: '100+ kontrol noktasıyla crawl hataları, indeksleme sorunları, hız ve Core Web Vitals analizi.' },
  { baslik: 'Anahtar Kelime Araştırması', detay: 'Arama niyeti odaklı, rakip analizi destekli kapsamlı kelime planlaması.' },
  { baslik: 'On-Page Optimizasyon', detay: 'Başlık, meta, içerik yapısı, schema markup ve iç link mimarisi.' },
  { baslik: 'Backlink Profili Analizi', detay: 'Toksik link tespiti, link boşlukları ve inşa fırsatları.' },
  { baslik: 'Rakip Analizi', detay: 'Rakiplerin kazandığı ve kaybettiği sıralamalar, içerik ve backlink stratejileri.' },
  { baslik: 'Aylık Raporlama', detay: 'Trafik, sıralama ve dönüşüm verilerini birleştiren şeffaf raporlar.' },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>SEO Danışmanlığı | Fatih Emin Çakıroğlu</title>
        <meta name="description" content="Fatih Emin Çakıroğlu'ndan teknik SEO, içerik stratejisi ve backlink danışmanlığı. 8+ yıllık deneyim, 150+ başarılı proje ve ölçülebilir organik büyüme." />
        <link rel="canonical" href="https://fatihemincakiroglu.com/seo" />

        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "Service", "name": "SEO Danışmanlığı", "url": "https://fatihemincakiroglu.com/seo", "description": "Teknik SEO, içerik optimizasyonu ve backlink stratejisiyle organik büyüme danışmanlığı.", "provider": {"@id": "https://fatihemincakiroglu.com/#person"}, "areaServed": "TR", "serviceType": ["Teknik SEO", "İçerik SEO", "Backlink Stratejisi", "SEO Danışmanlığı"], "offers": {"@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "TRY"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://fatihemincakiroglu.com/hizmetler"}, {"@type": "ListItem", "position": 3, "name": "SEO Danışmanlığı", "item": "https://fatihemincakiroglu.com/seo"}]})}</script>
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/hizmetler" style={{ color: '#aaa', fontSize: '13px' }}>Hizmetler</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>SEO Danışmanlığı</span>
          </div>
        </div>

        <div style={{ background: '#1a1612', padding: '80px 32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/hizmetler" style={{ fontSize: '13px', color: '#4a4540', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← Tüm Hizmetler</Link>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>SEO DANIŞMANLIĞI</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
              Google'da üst sıralara<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>çıkmanın yolu</span>
            </h1>
            <p style={{ color: '#9a9a9a', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '580px' }}>
              Teknik SEO denetiminden içerik stratejisine, backlink inşasından rakip analizine kadar kapsamlı SEO danışmanlığı ile işletmenizin organik görünürlüğünü artırıyorum.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/iletisim"><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Ücretsiz Teklif Al →</button></Link>
              <Link href="/vakalar"><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'transparent', color: '#fff', border: '1px solid #2a2520', fontWeight: 600, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Vaka Çalışmaları</button></Link>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '32px' }}>Neler yapıyorum?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px' }}>
            {NELER.map((n, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #eee' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(232,86,10,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>{i + 1}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>{n.baslik}</h3>
                <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6 }}>{n.detay}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '20px' }}>SEO süreci nasıl işler?</h2>
            {[
              { no: '01', baslik: 'Denetim & Analiz', aciklama: 'Sitenizin mevcut durumunu, rakiplerinizi ve fırsatları kapsamlı biçimde analiz ederim.' },
              { no: '02', baslik: 'Strateji Geliştirme', aciklama: 'Veriye dayalı, işletmenizin hedeflerine özel SEO yol haritası oluştururum.' },
              { no: '03', baslik: 'Uygulama', aciklama: 'Teknik düzeltmeler, içerik üretimi ve backlink inşasını sistematik biçimde hayata geçiririm.' },
              { no: '04', baslik: 'Ölçüm & Optimizasyon', aciklama: 'Sonuçları düzenli raporlarla paylaşır, stratejiyi sürekli iyileştiririm.' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#e0dbd0', fontFamily: 'var(--font-display)', flexShrink: 0 }}>{s.no}</span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>{s.baslik}</h3>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6 }}>{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '12px' }}>SEO danışmanlığı almak ister misiniz?</h2>
            <p style={{ color: '#6b6b6b', marginBottom: '20px' }}>İlk görüşmede sitenizi analiz edip size özel strateji sunuyorum.</p>
            <Link href="/iletisim"><button style={{ padding: '13px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>İletişime Geç →</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "seo"])),
    },
  }
}
