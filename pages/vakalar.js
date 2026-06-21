import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const VAKALAR = [
  {
    no: '01', sektor_tr: 'E-Ticaret', sektor_en: 'E-Commerce',
    baslik_tr: 'Tekstil Markası: 6 Ayda %280 Organik Trafik Artışı',
    baslik_en: 'Textile Brand: 280% Organic Traffic Growth in 6 Months',
    ozet_tr: 'Kapsamlı teknik SEO denetimi ve içerik stratejisiyle organik trafiği 3 kat artırdık.',
    ozet_en: 'With comprehensive technical SEO audit and content strategy, we tripled organic traffic.',
    metrik1_label: 'Organik Trafik', metrik1_val: '+280%',
    metrik2_label_tr: 'Süre', metrik2_label_en: 'Duration',
    metrik2_val: '6 ay',
    renk: '#f0fdf4',
  },
  {
    no: '02', sektor_tr: 'SaaS', sektor_en: 'SaaS',
    baslik_tr: 'SaaS Platformu: Sıfırdan 50K Aylık Organik Ziyaretçi',
    baslik_en: 'SaaS Platform: From Zero to 50K Monthly Organic Visitors',
    ozet_tr: 'Programatik SEO ve topical authority stratejisiyle hızlı büyüme sağladık.',
    ozet_en: 'We achieved rapid growth through programmatic SEO and topical authority strategy.',
    metrik1_label: 'Aylık Ziyaretçi', metrik1_val: '50K+',
    metrik2_label_tr: 'MRR Artışı', metrik2_label_en: 'MRR Growth',
    metrik2_val: '4x',
    renk: '#eff6ff',
  },
  {
    no: '03', sektor_tr: 'Sağlık', sektor_en: 'Healthcare',
    baslik_tr: 'Sağlık Kliniği: E-E-A-T Stratejisiyle Yerel SEO Zaferi',
    baslik_en: 'Health Clinic: Local SEO Victory with E-E-A-T Strategy',
    ozet_tr: 'Medikal içerik ve doktor profili optimizasyonuyla randevu oranını %200 artırdık.',
    ozet_en: 'We increased appointment rates by 200% with medical content and doctor profile optimization.',
    metrik1_label_tr: 'Randevu Artışı', metrik1_label_en: 'Appointment Growth',
    metrik1_val: '+200%',
    metrik2_label_tr: 'Yerel Sıralama', metrik2_label_en: 'Local Ranking',
    metrik2_val: 'Top 3',
    renk: '#fdf4ff',
  },
  {
    no: '04', sektor_tr: 'Hukuk', sektor_en: 'Legal',
    baslik_tr: 'Hukuk Bürosu: Yerel SEO ile Müvekkil Sayısını 3\'e Katladık',
    baslik_en: 'Law Firm: Tripled Client Base with Local SEO',
    ozet_tr: 'Google Business Profile ve yerel içerik stratejisiyle görünürlüğü dramatik artırdık.',
    ozet_en: 'We dramatically increased visibility with Google Business Profile and local content strategy.',
    metrik1_label_tr: 'Müvekkil Artışı', metrik1_label_en: 'Client Growth',
    metrik1_val: '3x',
    metrik2_label_tr: 'İlk Sayfa', metrik2_label_en: 'First Page',
    metrik2_val: '15+ KW',
    renk: '#fff7ed',
  },
]

export default function Page() {
  const router = useRouter()
  const isEn = router.locale === 'en'
  const t = {
    title: isEn ? 'Case Studies | Fatih Emin Çakıroğlu' : 'Vaka Çalışmaları | Fatih Emin Çakıroğlu',
    badge: isEn ? 'CASE STUDIES' : 'VAKA ÇALIŞMALARI',
    h1: isEn ? 'Success Stories' : 'Başarı Hikayeleri',
    desc: isEn ? 'Real results from SEO consulting. Measurable traffic growth, rankings and conversions.' : 'SEO danışmanlığından elde edilen gerçek sonuçlar. Ölçülebilir trafik artışı, sıralama ve dönüşümler.',
    breadcrumb: isEn ? ['Home','About','Case Studies'] : ['Ana Sayfa','Hakkımda','Vaka Çalışmaları'],
    detay: isEn ? 'Read Case Study →' : 'Vakayı İncele →',
    ctaTitle: isEn ? 'Want similar results?' : 'Benzer sonuçlar ister misiniz?',
    ctaDesc: isEn ? 'Book a free call and let\'s discuss your growth.' : 'Ücretsiz görüşmeyle büyüme planınızı konuşalım.',
    ctaBtn: isEn ? 'Get in Touch →' : 'İletişime Geç →',
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? 'Real SEO success stories. Measurable organic traffic growth and conversion results.' : 'Gerçek SEO başarı hikayeleri. Ölçülebilir organik trafik artışı ve dönüşüm sonuçları.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/case-studies' : 'https://fatihemincakiroglu.com/vakalar'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/vakalar" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/case-studies" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/vakalar" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link><span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn?'/about':'/hakkimda'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[1]}</Link><span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[2]}</span>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
            {VAKALAR.map((v, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 200px' }}>
                <div style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#ddd' }}>{v.no}</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '3px 8px', border: '1px solid rgba(232,86,10,0.3)', borderRadius: '4px' }}>{isEn ? v.sektor_en : v.sektor_tr}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '12px', lineHeight: 1.3 }}>{isEn ? v.baslik_en : v.baslik_tr}</h2>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6, marginBottom: '20px' }}>{isEn ? v.ozet_en : v.ozet_tr}</p>
                  <Link href={isEn?'/en/contact':'/iletisim'} style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '14px' }}>{t.detay}</Link>
                </div>
                <div style={{ background: v.renk, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#111', fontFamily: 'var(--font-display)' }}>{v.metrik1_val}</div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{isEn ? (v.metrik1_label_en || v.metrik1_label) : (v.metrik1_label_tr || v.metrik1_label)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#111', fontFamily: 'var(--font-display)' }}>{v.metrik2_val}</div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{isEn ? (v.metrik2_label_en || v.metrik2_label) : (v.metrik2_label_tr || v.metrik2_label)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>{t.ctaTitle}</h2>
            <p style={{ color: '#6b6b6b', marginBottom: '24px' }}>{t.ctaDesc}</p>
            <Link href={isEn?'/contact':'/iletisim'}><button style={{ padding: '14px 32px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{t.ctaBtn}</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
