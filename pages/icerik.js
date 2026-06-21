import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const CONTENT = {
  tr: {
    title: 'İçerik Stratejisi | Fatih Emin Çakıroğlu',
    metaDesc: 'Arama niyetine uygun, topical authority inşa eden içerik stratejisi danışmanlığı.',
    badge: 'İÇERİK STRATEJİSİ', h1a: 'Dönüşüm getiren', h1b: 'içerik stratejisi',
    desc: 'Arama niyetini karşılayan, topical authority inşa eden ve organik trafik getiren içerik stratejisi ve üretim danışmanlığı.',
    btn1: 'Ücretsiz Teklif Al →', btn2: 'Vaka Çalışmaları', back: '← Tüm Hizmetler',
    h2a: 'İçerik hizmetleri', h2c: 'İçerik stratejisi almak ister misiniz?',
    ctaDesc: 'Sitenizin içerik boşluklarını analiz edip büyüme planı hazırlıyorum.', ctaBtn: 'İletişime Geç →',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'İçerik Stratejisi'],
    neler: [
      { baslik: 'İçerik Denetimi', detay: 'Mevcut içeriklerin performans, kalite ve arama niyeti uyumu analizi.' },
      { baslik: 'Topical Authority Planı', detay: 'Pillar-cluster model ile konu otoritesi inşa eden içerik mimarisi.' },
      { baslik: 'Anahtar Kelime Haritası', detay: 'Her içerik parçası için hedef kelime, niyet ve format belirleme.' },
      { baslik: 'İçerik Üretimi', detay: 'SEO odaklı, E-E-A-T sinyalleri güçlü, özgün içerik yazımı.' },
      { baslik: 'İçerik Güncelleme', detay: 'Düşük performanslı içeriklerin revize edilerek organik değer kazanması.' },
      { baslik: 'Yayın Takvimi', detay: 'Tutarlı içerik üretimi için sürdürülebilir editorial takvim.' },
    ],
  },
  en: {
    title: 'Content Strategy | Fatih Emin Çakıroğlu',
    metaDesc: 'Content strategy consulting aligned with search intent and topical authority building.',
    badge: 'CONTENT STRATEGY', h1a: 'Content strategy that', h1b: 'drives conversions',
    desc: 'Content strategy and production consulting that meets search intent, builds topical authority and generates organic traffic.',
    btn1: 'Get a Free Quote →', btn2: 'Case Studies', back: '← All Services',
    h2a: 'Content services', h2c: 'Would you like a content strategy?',
    ctaDesc: 'I analyze your content gaps and prepare a growth plan.', ctaBtn: 'Get in Touch →',
    breadcrumb: ['Home', 'Services', 'Content Strategy'],
    neler: [
      { baslik: 'Content Audit', detay: 'Performance, quality and search intent alignment analysis of existing content.' },
      { baslik: 'Topical Authority Plan', detay: 'Content architecture building topic authority with pillar-cluster model.' },
      { baslik: 'Keyword Map', detay: 'Target keyword, intent and format determination for each content piece.' },
      { baslik: 'Content Production', detay: 'SEO-focused, E-E-A-T signal-strong, original content writing.' },
      { baslik: 'Content Updates', detay: 'Revising low-performing content to gain organic value.' },
      { baslik: 'Editorial Calendar', detay: 'Sustainable editorial calendar for consistent content production.' },
    ],
  }
}

export default function Page() {
  const router = useRouter()
  const isEn = router.pathname.startsWith('/en')
  const c = isEn ? CONTENT.en : CONTENT.tr
  return (
    <>
      <Head>
        <title>{c.title}</title>
        <meta name="description" content={c.metaDesc} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/icerik' : 'https://fatihemincakiroglu.com/icerik'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/icerik" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/icerik" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/icerik" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{c.breadcrumb[0]}</Link><span style={{ color: '#ccc' }}>›</span>
            <Link href="/hizmetler" style={{ color: '#aaa', fontSize: '13px' }}>{c.breadcrumb[1]}</Link><span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{c.breadcrumb[2]}</span>
          </div>
        </div>
        <div style={{ background: '#1a1612', padding: '80px 32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/hizmetler" style={{ fontSize: '13px', color: '#4a4540', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>{c.back}</Link>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>{c.badge}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
              {c.h1a}<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{c.h1b}</span>
            </h1>
            <p style={{ color: '#9a9a9a', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '580px' }}>{c.desc}</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href={isEn?'/en/contact':'/iletisim'}><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{c.btn1}</button></Link>
              <Link href={isEn?'/en/case-studies':'/vakalar'}><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'transparent', color: '#fff', border: '1px solid #2a2520', fontWeight: 600, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{c.btn2}</button></Link>
            </div>
          </div>
        </div>
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
