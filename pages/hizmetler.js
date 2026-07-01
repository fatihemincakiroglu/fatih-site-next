import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const hizmetler = isEn ? [
    { url: '/seo', ikon: '🔍', baslik: 'SEO Consulting', aciklama: 'Technical + strategy + content — end-to-end organic growth.' },
    { url: '/icerik', ikon: '✍️', baslik: 'Content Strategy', aciklama: 'Content production aligned with search intent, driving conversions.' },
    { url: '/geo', ikon: '🤖', baslik: 'GEO Consulting', aciklama: 'Be visible in ChatGPT, Perplexity and AI Overview.' },
    { url: '/backlink', ikon: '🔗', baslik: 'Backlink & Digital PR', aciklama: 'Editorial links, media relations, brand signals.' },
    { url: '/performans', ikon: '📈', baslik: 'Performance & Growth', aciklama: 'Measurable traffic and revenue growth.' },
  ] : [
    { url: '/seo', ikon: '🔍', baslik: 'SEO Danışmanlığı', aciklama: 'Teknik + strateji + içerik — uçtan uca organik büyüme.' },
    { url: '/icerik', ikon: '✍️', baslik: 'İçerik Stratejisi', aciklama: 'Arama niyetine oturan, dönüşüm getiren içerik üretimi.' },
    { url: '/geo', ikon: '🤖', baslik: 'GEO Danışmanlığı', aciklama: 'ChatGPT, Perplexity ve AI Overview\u2019da görünür olun.' },
    { url: '/backlink', ikon: '🔗', baslik: 'Backlink & Dijital PR', aciklama: 'Editoryal link, yayın ilişkileri, marka sinyali.' },
    { url: '/performans', ikon: '📈', baslik: 'Performans & Growth', aciklama: 'Ölçümlenebilir trafik ve gelir artışı.' },
  ]
  const t = {
    title: isEn ? 'SEO & Digital Marketing Services | Fatih Emin' : 'SEO ve Dijital Pazarlama Hizmetleri | Fatih Emin',
    badge: isEn ? 'SERVICES' : 'HİZMETLER',
    h1a: isEn ? 'SEO, GEO and organic growth' : 'SEO, GEO ve organik büyüme',
    h1b: isEn ? 'consulting services' : 'danışmanlık hizmetleri',
    desc: isEn ? 'End-to-end organic growth consulting for your business with technical SEO, GEO, content strategy and backlink services.' : 'Teknik SEO, GEO, içerik stratejisi ve backlink hizmetleriyle işletmeniz için uçtan uca organik büyüme danışmanlığı.',
    detay: isEn ? 'Details →' : 'Detaylar →',
    breadcrumb: isEn ? ['Home', 'Services'] : ['Ana Sayfa', 'Hizmetler'],
    ctaTitle: isEn ? 'Which service is right for you?' : 'Hangi hizmet size uygun?',
    ctaDesc: isEn ? 'I evaluate your goals and suggest the best strategy.' : 'Hedeflerinizi değerlendirip en uygun stratejiyi öneririm.',
    ctaBtn: isEn ? 'Get in Touch →' : 'İletişime Geç →',
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? "SEO consulting, GEO, content strategy, backlink building and performance marketing optimization services to accelerate your business's organic growth." : 'SEO danışmanlığı, GEO, içerik stratejisi, backlink inşası ve performans pazarlama optimizasyonu hizmetleriyle işletmenizin organik büyümesini hızlandırıyorum.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/services' : 'https://fatihemincakiroglu.com/hizmetler'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/hizmetler" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/services" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/hizmetler" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 40px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.badge}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
              {t.h1a} <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{t.h1b}</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '560px' }}>{t.desc}</p>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '48px' }}>
            {hizmetler.map((h, i) => (
              <Link key={i} href={h.url} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eee', display: 'block', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{h.ikon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{h.baslik}</h3>
                <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6, marginBottom: '16px' }}>{h.aciklama}</p>
                <span style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '13px' }}>{t.detay}</span>
              </Link>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>{t.ctaTitle}</h2>
            <p style={{ color: '#6b6b6b', marginBottom: '24px' }}>{t.ctaDesc}</p>
            <Link href={isEn?'/en/contact':'/iletisim'}><button style={{ padding: '14px 32px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{t.ctaBtn}</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() { return { props: {} } }
