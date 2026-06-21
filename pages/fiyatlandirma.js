import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Page() {
  const router = useRouter()
  const isEn = router.locale === 'en'
  const t = {
    title: isEn ? 'Pricing | Fatih Emin Çakıroğlu' : 'Fiyatlandırma | Fatih Emin Çakıroğlu',
    badge: isEn ? 'PRICING' : 'FİYATLANDIRMA',
    h1: isEn ? 'Transparent Pricing' : 'Şeffaf Fiyatlandırma',
    desc: isEn ? 'Monthly retainer, project-based or one-time SEO audit options.' : 'Aylık retainer, proje bazlı veya tek seferlik SEO denetim seçenekleri.',
    breadcrumb: isEn ? ['Home','Pricing'] : ['Ana Sayfa','Fiyatlandırma'],
    notitle: isEn ? 'Custom Quote' : 'Özel Teklif',
    nodesc: isEn ? 'Every project is unique. I prepare a custom proposal based on your site size, competition level and goals.' : 'Her proje benzersizdir. Site büyüklüğünüz, rekabet seviyeniz ve hedeflerinize göre özel teklif hazırlarım.',
    nobtn: isEn ? 'Get a Free Quote →' : 'Ücretsiz Teklif Al →',
    paketler: isEn ? [
      { isim: 'SEO Audit', aciklama: 'One-time comprehensive SEO audit.', ozellikler: ['100+ checkpoint technical audit','Keyword opportunity analysis','Competitor gap analysis','Prioritized action plan','30-min presentation call'], fiyat: 'From $500', btn: 'Get Started', popular: false },
      { isim: 'Monthly Retainer', aciklama: 'Ongoing SEO consulting for continuous growth.', ozellikler: ['Technical SEO management','Content strategy & production','Backlink building','Monthly reporting','Priority support'], fiyat: 'Custom Quote', btn: 'Get a Quote', popular: true },
      { isim: 'GEO Package', aciklama: 'AI search visibility optimization.', ozellikler: ['AI Overview optimization','LLMs.txt implementation','Entity & schema setup','GEO performance tracking','Monthly GEO report'], fiyat: 'Custom Quote', btn: 'Get a Quote', popular: false },
    ] : [
      { isim: 'SEO Denetimi', aciklama: 'Tek seferlik kapsamlı SEO denetimi.', ozellikler: ['100+ kontrol noktası teknik denetim','Anahtar kelime fırsat analizi','Rakip boşluk analizi','Önceliklendirilmiş aksiyon planı','30 dk sunum görüşmesi'], fiyat: '$500\'den başlar', btn: 'Başlayalım', popular: false },
      { isim: 'Aylık Retainer', aciklama: 'Sürekli büyüme için devam eden SEO danışmanlığı.', ozellikler: ['Teknik SEO yönetimi','İçerik stratejisi ve üretimi','Backlink inşası','Aylık raporlama','Öncelikli destek'], fiyat: 'Özel Teklif', btn: 'Teklif Al', popular: true },
      { isim: 'GEO Paketi', aciklama: 'Yapay zekâ arama görünürlüğü optimizasyonu.', ozellikler: ['AI Overview optimizasyonu','LLMs.txt implementasyonu','Entity & schema kurulumu','GEO performans takibi','Aylık GEO raporu'], fiyat: 'Özel Teklif', btn: 'Teklif Al', popular: false },
    ],
    popularBadge: isEn ? 'Most Popular' : 'En Popüler',
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? 'SEO consulting packages and pricing. Monthly retainer, project-based and one-time audit options.' : 'SEO danışmanlık paketleri ve fiyatları. Aylık retainer, proje bazlı ve tek seferlik seçenekler.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/pricing' : 'https://fatihemincakiroglu.com/fiyatlandirma'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/fiyatlandirma" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/pricing" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/fiyatlandirma" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 40px', textAlign: 'center' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.badge}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>{t.h1}</h1>
            <p style={{ color: '#777', fontSize: '16px' }}>{t.desc}</p>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {t.paketler.map((p, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: p.popular ? '2px solid var(--orange)' : '1px solid #eee', position: 'relative' }}>
                {p.popular && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--orange)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 14px', borderRadius: '20px', whiteSpace: 'nowrap' }}>{t.popularBadge}</div>}
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{p.isim}</h3>
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '20px', lineHeight: 1.5 }}>{p.aciklama}</p>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: p.popular ? 'var(--orange)' : '#111', marginBottom: '24px' }}>{p.fiyat}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {p.ozellikler.map((o, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#555' }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 700 }}>✓</span> {o}
                    </div>
                  ))}
                </div>
                <Link href={isEn?'/contact':'/iletisim'}><button style={{ width: '100%', padding: '12px', borderRadius: '8px', background: p.popular ? 'var(--orange)' : '#f8f7f5', color: p.popular ? '#fff' : '#333', border: p.popular ? 'none' : '1px solid #eee', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>{p.btn}</button></Link>
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '12px' }}>{t.notitle}</h2>
            <p style={{ color: '#6b6b6b', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>{t.nodesc}</p>
            <Link href={isEn?'/contact':'/iletisim'}><button style={{ padding: '14px 32px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{t.nobtn}</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
