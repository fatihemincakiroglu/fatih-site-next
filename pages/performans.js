import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const CONTENT = {
  tr: {
    title: 'Performans ve Growth | Fatih Emin Çakıroğlu',
    metaDesc: 'Organik trafik, dönüşüm oranı ve büyüme hedeflerini veriye dayalı SEO ile optimize edin.',
    badge: 'PERFORMANS & GROWTH', h1a: 'Organik büyümenizi', h1b: 'hızlandırın',
    desc: 'Trafik analizi, dönüşüm optimizasyonu ve growth stratejileriyle işletmenizin dijital büyümesini ölçülebilir şekilde artırıyorum.',
    btn1: 'Ücretsiz Teklif Al →', btn2: 'Vaka Çalışmaları', back: '← Tüm Hizmetler',
    h2a: 'Performans hizmetleri', h2c: 'Performans danışmanlığı almak ister misiniz?',
    ctaDesc: 'Büyüme fırsatlarınızı analiz edip ölçülebilir hedefler belirliyorum.', ctaBtn: 'İletişime Geç →',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'Performans & Growth'],
    neler: [
      { baslik: 'Trafik Analizi', detay: 'GA4 ve Search Console verilerini derinlemesine analiz ederek büyüme fırsatları tespit ederim.' },
      { baslik: 'Dönüşüm Optimizasyonu', detay: 'Organik trafikten maksimum dönüşüm elde etmek için sayfa deneyimi iyileştirme.' },
      { baslik: 'Core Web Vitals', detay: 'LCP, INP ve CLS metriklerinin iyileştirilmesi ile performans skoru artırma.' },
      { baslik: 'Funnel Analizi', detay: 'Kullanıcı yolculuğunu analiz ederek dönüşüm engellerini tespit etme.' },
      { baslik: 'Rekabet Analizi', detay: 'Rakiplerin trafik kaynaklarını ve büyüme stratejilerini izleme.' },
      { baslik: 'Büyüme Raporlaması', detay: 'KPI\'lara dayalı aylık büyüme raporları ve aksiyon planı.' },
    ],
  },
  en: {
    title: 'Performance & Growth | Fatih Emin Çakıroğlu',
    metaDesc: 'Optimize organic traffic, conversion rates and growth goals with data-driven SEO.',
    badge: 'PERFORMANCE & GROWTH', h1a: 'Accelerate your', h1b: 'organic growth',
    desc: 'I measurably increase your business\'s digital growth with traffic analysis, conversion optimization and growth strategies.',
    btn1: 'Get a Free Quote →', btn2: 'Case Studies', back: '← All Services',
    h2a: 'Performance services', h2c: 'Would you like performance consulting?',
    ctaDesc: 'I analyze your growth opportunities and set measurable goals.', ctaBtn: 'Get in Touch →',
    breadcrumb: ['Home', 'Services', 'Performance & Growth'],
    neler: [
      { baslik: 'Traffic Analysis', detay: 'I identify growth opportunities through in-depth analysis of GA4 and Search Console data.' },
      { baslik: 'Conversion Optimization', detay: 'Page experience improvements to get maximum conversions from organic traffic.' },
      { baslik: 'Core Web Vitals', detay: 'Improving performance scores by optimizing LCP, INP and CLS metrics.' },
      { baslik: 'Funnel Analysis', detay: 'Identifying conversion blockers by analyzing user journeys.' },
      { baslik: 'Competitor Analysis', detay: 'Monitoring competitors\' traffic sources and growth strategies.' },
      { baslik: 'Growth Reporting', detay: 'Monthly growth reports and action plans based on KPIs.' },
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
        <title>{c.title}</title>
        <meta name="description" content={c.metaDesc} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/performans' : 'https://fatihemincakiroglu.com/performans'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/performans" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/performans" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/performans" />
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
