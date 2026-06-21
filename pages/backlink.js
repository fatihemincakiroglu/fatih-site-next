import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const CONTENT = {
  tr: {
    title: 'Backlink ve Dijital PR | Fatih Emin Çakıroğlu',
    metaDesc: 'Editoryal backlink, dijital PR ve marka sinyalleriyle domain otoritesi inşası.',
    badge: 'BACKLİNK & DİJİTAL PR', h1a: 'Domain otoritenizi', h1b: 'güçlendirin',
    desc: 'Editoryal backlinkler, dijital PR kampanyaları ve marka sinyalleriyle arama motorlarındaki güven skorunuzu artırıyorum.',
    btn1: 'Ücretsiz Teklif Al →', btn2: 'Vaka Çalışmaları', back: '← Tüm Hizmetler',
    h2a: 'Backlink hizmetleri', h2c: 'Backlink danışmanlığı almak ister misiniz?',
    ctaDesc: 'Link profilinizi analiz edip büyüme fırsatlarını belirliyorum.', ctaBtn: 'İletişime Geç →',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'Backlink & Dijital PR'],
    neler: [
      { baslik: 'Link Profil Analizi', detay: 'Mevcut backlink profilinin kalite, çeşitlilik ve toksik link denetimi.' },
      { baslik: 'Editoryal Link İnşası', detay: 'İlgili ve otoriter sitelerden doğal, bağlama uygun backlinkler.' },
      { baslik: 'Dijital PR', detay: 'Medya ilişkileri ve içerik pazarlamasıyla marka sinyali ve link kazanımı.' },
      { baslik: 'Link Boşluk Analizi', detay: 'Rakiplerin sahip olduğu ancak sizin olmayan backlink fırsatları.' },
      { baslik: 'Broken Link Building', detay: 'Kırık linklerden faydalanarak yüksek otoriter kaynaklardan link kazanımı.' },
      { baslik: 'Anchor Text Optimizasyonu', detay: 'Doğal ve çeşitli anchor text dağılımıyla güvenli link profili.' },
    ],
  },
  en: {
    title: 'Backlink & Digital PR | Fatih Emin Çakıroğlu',
    metaDesc: 'Build domain authority with editorial backlinks, digital PR and brand signals.',
    badge: 'BACKLINK & DIGITAL PR', h1a: 'Strengthen your', h1b: 'domain authority',
    desc: 'I increase your trust score in search engines with editorial backlinks, digital PR campaigns and brand signals.',
    btn1: 'Get a Free Quote →', btn2: 'Case Studies', back: '← All Services',
    h2a: 'Backlink services', h2c: 'Would you like backlink consulting?',
    ctaDesc: 'I analyze your link profile and identify growth opportunities.', ctaBtn: 'Get in Touch →',
    breadcrumb: ['Home', 'Services', 'Backlink & Digital PR'],
    neler: [
      { baslik: 'Link Profile Analysis', detay: 'Quality, diversity and toxic link audit of existing backlink profile.' },
      { baslik: 'Editorial Link Building', detay: 'Natural, contextual backlinks from relevant and authoritative sites.' },
      { baslik: 'Digital PR', detay: 'Brand signal and link acquisition through media relations and content marketing.' },
      { baslik: 'Link Gap Analysis', detay: 'Backlink opportunities that competitors have but you don\'t.' },
      { baslik: 'Broken Link Building', detay: 'Acquiring links from highly authoritative sources by leveraging broken links.' },
      { baslik: 'Anchor Text Optimization', detay: 'Safe link profile with natural and diverse anchor text distribution.' },
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
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/backlink' : 'https://fatihemincakiroglu.com/backlink'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/backlink" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/backlink" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/backlink" />
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
              <Link href="/iletisim"><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{c.btn1}</button></Link>
              <Link href="/vakalar"><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'transparent', color: '#fff', border: '1px solid #2a2520', fontWeight: 600, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{c.btn2}</button></Link>
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
