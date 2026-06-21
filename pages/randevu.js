import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = {
    title: isEn ? 'Book a Call | Fatih Emin Çakıroğlu' : 'Randevu | Fatih Emin Çakıroğlu',
    h1: isEn ? 'Free Discovery Call' : 'Ücretsiz Keşif Görüşmesi',
    desc: isEn ? 'In 30 minutes, I evaluate your site and share a custom SEO & GEO roadmap.' : '30 dakikada sitenizi değerlendirip özel SEO & GEO yol haritanızı paylaşıyorum.',
    breadcrumb: isEn ? ['Home', 'Book a Call'] : ['Ana Sayfa', 'Randevu'],
    steps: isEn
      ? [{ n:'01', t:'You book a time', d:'Select a suitable time slot for you.' }, { n:'02', t:'We meet online', d:'30-minute Google Meet or Zoom call.' }, { n:'03', t:'You get your roadmap', d:'Custom SEO & GEO strategy tailored to your goals.' }]
      : [{ n:'01', t:'Zamanı seçin', d:'Size uygun bir zaman dilimi seçin.' }, { n:'02', t:'Online görüşelim', d:'30 dakikalık Google Meet veya Zoom görüşmesi.' }, { n:'03', t:'Yol haritanızı alın', d:'Hedeflerinize özel SEO & GEO stratejisi.' }],
    btn: isEn ? 'Send a Message to Book →' : 'Randevu İçin Mesaj Gönder →',
    alt: isEn ? 'or send a message directly' : 'veya direkt mesaj gönderin',
    free: isEn ? '✓ Completely free · No obligation' : '✓ Tamamen ücretsiz · Yükümlülük yok',
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? 'Book a free SEO discovery call. I evaluate your site and create a custom roadmap.' : 'Ücretsiz SEO keşif görüşmesi için randevu alın. Sitenizi değerlendirip özel yol haritası oluşturuyorum.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/randevu' : 'https://fatihemincakiroglu.com/randevu'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/randevu" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/randevu" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/randevu" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '72px 32px 96px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#111', marginBottom: '16px' }}>{t.h1}</h1>
          <p style={{ fontSize: '17px', color: '#666', lineHeight: 1.7, marginBottom: '48px' }}>{t.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px', textAlign: 'left' }}>
            {t.steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #eee' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--orange)', fontFamily: 'var(--font-display)', flexShrink: 0 }}>{s.n}</span>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>{s.t}</h3>
                  <p style={{ fontSize: '13px', color: '#777' }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/iletisim"><button style={{ padding: '16px 36px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: '16px', display: 'block', width: '100%' }}>{t.btn}</button></Link>
          <p style={{ fontSize: '13px', color: '#aaa' }}>{t.free}</p>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() { return { props: {} } }
