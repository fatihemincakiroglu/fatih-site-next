import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Page() {
  const router = useRouter()
  const isEn = router.locale === 'en'
  const t = {
    title: isEn ? 'About | Fatih Emin Çakıroğlu' : 'Hakkımda | Fatih Emin Çakıroğlu',
    badge: isEn ? 'ABOUT' : 'HAKKIMDA',
    h1: isEn ? 'Fatih Emin Çakıroğlu' : 'Fatih Emin Çakıroğlu',
    subtitle: isEn ? 'SEO & Digital Marketing Expert' : 'SEO & Dijital Pazarlama Uzmanı',
    bio1: isEn
      ? 'I am an SEO and digital marketing consultant based in Istanbul with 8+ years of experience. I have helped 150+ businesses grow organically through technical SEO, GEO, content strategy and backlink building.'
      : 'İstanbul merkezli, 8+ yıl deneyimli SEO ve dijital pazarlama danışmanıyım. Teknik SEO, GEO, içerik stratejisi ve backlink inşasıyla 150+ işletmenin organik büyümesine katkı sağladım.',
    bio2: isEn
      ? 'My approach combines data-driven strategy with a long-term perspective. My goal is not just higher rankings — I aim to make my clients\'s businesses genuinely visible in AI and traditional search.'
      : 'Yaklaşımım, veriye dayalı stratejiyi uzun vadeli perspektifle birleştirir. Hedefim sadece üst sıralamalar değil; müşterilerimin işletmelerini AI ve geleneksel aramada gerçek anlamda görünür kılmaktır.',
    stats: isEn
      ? [{ n: '150+', l: 'Happy Clients' }, { n: '8 Years', l: 'Experience' }, { n: '+300%', l: 'Avg. Growth' }, { n: '98%', l: 'Satisfaction' }]
      : [{ n: '150+', l: 'Mutlu Müşteri' }, { n: '8 Yıl', l: 'Deneyim' }, { n: '+300%', l: 'Ort. Büyüme' }, { n: '%98', l: 'Memnuniyet' }],
    skills: isEn ? ['Technical SEO', 'GEO & AI Search', 'Content Strategy', 'Backlink & Digital PR', 'Core Web Vitals', 'Data Analysis'] : ['Teknik SEO', 'GEO & AI Arama', 'İçerik Stratejisi', 'Backlink & Dijital PR', 'Core Web Vitals', 'Veri Analizi'],
    skillsTitle: isEn ? 'Areas of Expertise' : 'Uzmanlık Alanları',
    ctaTitle: isEn ? 'Want to work together?' : 'Birlikte çalışmak ister misiniz?',
    ctaDesc: isEn ? 'Book a free discovery call for a custom roadmap.' : 'Ücretsiz keşif görüşmesiyle size özel yol haritası oluşturalım.',
    ctaBtn: isEn ? 'Get in Touch →' : 'İletişime Geç →',
    breadcrumb: isEn ? ['Home', 'About'] : ['Ana Sayfa', 'Hakkımda'],
    linkedin: isEn ? 'LinkedIn Profile' : 'LinkedIn Profili',
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? '8+ years experienced SEO and digital marketing consultant. 150+ businesses, measurable organic growth.' : '8+ yıllık deneyimli SEO ve dijital pazarlama danışmanı. 150+ işletme, ölçülebilir organik büyüme.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/hakkimda' : 'https://fatihemincakiroglu.com/hakkimda'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/hakkimda" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/hakkimda" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/hakkimda" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '32px', flexShrink: 0 }}>F</div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{t.badge}</span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111', marginBottom: '4px' }}>{t.h1}</h1>
              <p style={{ fontSize: '15px', color: '#888' }}>{t.subtitle} · İstanbul</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
            {t.stats.map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #eee', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: 'var(--orange)' }}>{s.n}</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee', marginBottom: '24px' }}>
            <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>{t.bio1}</p>
            <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, marginBottom: '24px' }}>{t.bio2}</p>
            <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '14px' }}>{t.linkedin} →</a>
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '20px' }}>{t.skillsTitle}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {t.skills.map((s, i) => (
                <span key={i} style={{ padding: '8px 16px', background: '#f8f7f5', borderRadius: '20px', border: '1px solid #ede8e0', fontSize: '13px', fontWeight: 600, color: '#555' }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '12px' }}>{t.ctaTitle}</h2>
            <p style={{ color: '#6b6b6b', marginBottom: '20px' }}>{t.ctaDesc}</p>
            <Link href="/iletisim"><button style={{ padding: '13px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{t.ctaBtn}</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() { return { props: {} } }
