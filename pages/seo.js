import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const CONTENT = {
  tr: {
    badge: 'SEO DANIŞMANLIĞI',
    h1a: "Google'da üst sıralara",
    h1b: 'çıkmanın yolu',
    desc: 'Teknik SEO denetiminden içerik stratejisine, backlink inşasından rakip analizine kadar kapsamlı SEO danışmanlığı ile işletmenizin organik görünürlüğünü artırıyorum.',
    btn1: 'Ücretsiz Teklif Al →', btn2: 'Vaka Çalışmaları',
    back: '← Tüm Hizmetler', backLink: '/hizmetler',
    h2a: 'Neler yapıyorum?', h2b: 'SEO süreci nasıl işler?', h2c: 'SEO danışmanlığı almak ister misiniz?',
    ctaDesc: 'İlk görüşmede sitenizi analiz edip size özel strateji sunuyorum.',
    ctaBtn: 'İletişime Geç →',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'SEO Danışmanlığı'],
    neler: [
      { baslik: 'Teknik SEO Denetimi', detay: '100+ kontrol noktasıyla crawl hataları, indeksleme sorunları, hız ve Core Web Vitals analizi.' },
      { baslik: 'Anahtar Kelime Araştırması', detay: 'Arama niyeti odaklı, rakip analizi destekli kapsamlı kelime planlaması.' },
      { baslik: 'On-Page Optimizasyon', detay: 'Başlık, meta, içerik yapısı, schema markup ve iç link mimarisi.' },
      { baslik: 'Backlink Profili Analizi', detay: 'Toksik link tespiti, link boşlukları ve inşa fırsatları.' },
      { baslik: 'Rakip Analizi', detay: 'Rakiplerin kazandığı ve kaybettiği sıralamalar, içerik ve backlink stratejileri.' },
      { baslik: 'Aylık Raporlama', detay: 'Trafik, sıralama ve dönüşüm verilerini birleştiren şeffaf raporlar.' },
    ],
    surec: [
      { no: '01', baslik: 'Denetim & Analiz', aciklama: 'Sitenizin mevcut durumunu, rakiplerinizi ve fırsatları kapsamlı biçimde analiz ederim.' },
      { no: '02', baslik: 'Strateji Geliştirme', aciklama: 'Veriye dayalı, işletmenizin hedeflerine özel SEO yol haritası oluştururum.' },
      { no: '03', baslik: 'Uygulama', aciklama: 'Teknik düzeltmeler, içerik üretimi ve backlink inşasını sistematik biçimde hayata geçiririm.' },
      { no: '04', baslik: 'Ölçüm & Optimizasyon', aciklama: 'Sonuçları düzenli raporlarla paylaşır, stratejiyi sürekli iyileştiririm.' },
    ],
  },
  en: {
    badge: 'SEO CONSULTING',
    h1a: 'The path to ranking',
    h1b: 'at the top of Google',
    desc: 'From technical SEO audits to content strategy, from backlink building to competitor analysis — I grow your business\'s organic visibility with comprehensive SEO consulting.',
    btn1: 'Get a Free Quote →', btn2: 'Case Studies',
    back: '← All Services', backLink: '/hizmetler',
    h2a: 'What do I do?', h2b: 'How does the SEO process work?', h2c: 'Would you like SEO consulting?',
    ctaDesc: 'In the first session, I analyze your site and present a custom strategy.',
    ctaBtn: 'Get in Touch →',
    breadcrumb: ['Home', 'Services', 'SEO Consulting'],
    neler: [
      { baslik: 'Technical SEO Audit', detay: '100+ checkpoints for crawl errors, indexing issues, speed and Core Web Vitals analysis.' },
      { baslik: 'Keyword Research', detay: 'Comprehensive keyword planning focused on search intent with competitor analysis.' },
      { baslik: 'On-Page Optimization', detay: 'Title, meta, content structure, schema markup and internal link architecture.' },
      { baslik: 'Backlink Profile Analysis', detay: 'Toxic link detection, link gaps and building opportunities.' },
      { baslik: 'Competitor Analysis', detay: 'Rankings won and lost by competitors, content and backlink strategies.' },
      { baslik: 'Monthly Reporting', detay: 'Transparent reports combining traffic, ranking and conversion data.' },
    ],
    surec: [
      { no: '01', baslik: 'Audit & Analysis', aciklama: 'I comprehensively analyze your site\'s current state, competitors and opportunities.' },
      { no: '02', baslik: 'Strategy Development', aciklama: 'I create a data-driven SEO roadmap tailored to your business goals.' },
      { no: '03', baslik: 'Implementation', aciklama: 'I systematically execute technical fixes, content production and backlink building.' },
      { no: '04', baslik: 'Measurement & Optimization', aciklama: 'I share results through regular reports and continuously improve the strategy.' },
    ],
  }
}

export default function Page() {
  const router = useRouter()
  const isEn = router.locale === 'en'
  const c = isEn ? CONTENT.en : CONTENT.tr

  return (
    <>
      <Head>
        <title>{isEn ? 'SEO Consulting | Fatih Emin Çakıroğlu' : 'SEO Danışmanlığı | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? 'Technical SEO, content optimization and backlink strategy consulting for organic growth.' : 'Teknik SEO, içerik optimizasyonu ve backlink stratejisiyle organik büyüme danışmanlığı.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/seo' : 'https://fatihemincakiroglu.com/seo'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/seo" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/seo" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/seo" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Service","name":isEn?"SEO Consulting":"SEO Danışmanlığı","provider":{"@id":"https://fatihemincakiroglu.com/#person"},"areaServed":"TR","url":"https://fatihemincakiroglu.com/seo"})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":isEn?"Home":"Ana Sayfa","item":"https://fatihemincakiroglu.com"},{"@type":"ListItem","position":2,"name":isEn?"Services":"Hizmetler","item":"https://fatihemincakiroglu.com/hizmetler"},{"@type":"ListItem","position":3,"name":isEn?"SEO Consulting":"SEO Danışmanlığı","item":"https://fatihemincakiroglu.com/seo"}]})}</script>
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{c.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/hizmetler" style={{ color: '#aaa', fontSize: '13px' }}>{c.breadcrumb[1]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{c.breadcrumb[2]}</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background: '#1a1612', padding: '80px 32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link href={c.backLink} style={{ fontSize: '13px', color: '#4a4540', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>{c.back}</Link>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>{c.badge}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
              {c.h1a}<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{c.h1b}</span>
            </h1>
            <p style={{ color: '#9a9a9a', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '580px' }}>{c.desc}</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/iletisim"><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{c.btn1}</button></Link>
              <Link href="/vakalar"><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'transparent', color: '#fff', border: '1px solid #2a2520', fontWeight: 600, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{c.btn2}</button></Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '32px' }}>{c.h2a}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px' }}>
            {c.neler.map((n, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #eee' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(232,86,10,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>{i + 1}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>{n.baslik}</h3>
                <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6 }}>{n.detay}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '20px' }}>{c.h2b}</h2>
            {c.surec.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: i < c.surec.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#e0dbd0', fontFamily: 'var(--font-display)', flexShrink: 0 }}>{s.no}</span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>{s.baslik}</h3>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6 }}>{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '12px' }}>{c.h2c}</h2>
            <p style={{ color: '#6b6b6b', marginBottom: '20px' }}>{c.ctaDesc}</p>
            <Link href="/iletisim"><button style={{ padding: '13px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{c.ctaBtn}</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
