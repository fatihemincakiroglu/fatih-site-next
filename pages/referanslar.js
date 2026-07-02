import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const REFS = [
  {
    isim: 'Mehmet A.', unvan_tr: 'E-Ticaret Direktörü', unvan_en: 'E-Commerce Director',
    sirket: 'Tekstil Markası', sektor_tr: 'E-Ticaret', sektor_en: 'E-Commerce',
    yorum_tr: 'Fatih ile çalışmaya başladıktan 4 ay sonra organik trafiğimiz %280 arttı. Her adımı şeffaf şekilde takip edebildik. Teknik SEO denetiminde fark etmediğimiz onlarca kritik sorunu tespit etti.',
    yorum_en: 'After working with Fatih for 4 months, our organic traffic grew by 280%. We could track every step transparently. He identified dozens of critical issues we had missed in the technical SEO audit.',
  },
  {
    isim: 'Zeynep K.', unvan_tr: 'Büro Ortağı', unvan_en: 'Law Firm Partner',
    sirket: 'Hukuk Bürosu', sektor_tr: 'Hukuk', sektor_en: 'Legal',
    yorum_tr: 'Dijital varlığımızı sıfırdan inşa etti. Yerel SEO sayesinde ilk sayfaya çıktık, müvekkil sayımız 3 katına çıktı.',
    yorum_en: 'He built our digital presence from scratch. Thanks to local SEO, we appeared on the first page and our client base tripled.',
  },
  {
    isim: 'Can S.', unvan_tr: 'Kurucu & CEO', unvan_en: 'Founder & CEO',
    sirket: 'SaaS Platform', sektor_tr: 'SaaS', sektor_en: 'SaaS',
    yorum_tr: 'Teknik SEO denetimi göz açıcıydı. 6 ayda organik trafiği sıfırdan ciddi rakamlara taşıdı. Aylık MRR\'miz 4 katına çıktı.',
    yorum_en: 'The technical SEO audit was eye-opening. In 6 months, he grew organic traffic from zero to significant numbers. Our monthly MRR quadrupled.',
  },
  {
    isim: 'Dr. Ayşe M.', unvan_tr: 'Klinik Direktörü', unvan_en: 'Clinic Director',
    sirket: 'Sağlık Kliniği', sektor_tr: 'Sağlık', sektor_en: 'Healthcare',
    yorum_tr: 'Medikal SEO alanında gerçek bir uzman. E-E-A-T odaklı çalışma sonrasında hem sıralamalarımız hem de hasta güveni arttı. Randevu oranımız %200 arttı.',
    yorum_en: 'A true expert in medical SEO. After the E-E-A-T focused work, both our rankings and patient trust increased significantly. Our appointment rate grew by 200%.',
  },
  {
    isim: 'Ahmet B.', unvan_tr: 'Pazarlama Müdürü', unvan_en: 'Marketing Manager',
    sirket: 'Fintech Şirketi', sektor_tr: 'Finans', sektor_en: 'Finance',
    yorum_tr: 'Rekabetçi finans sektöründe organik büyüme sağlamak çok zordu. Content clustering stratejisi sayesinde hedef kelimelerimizde ilk 3\'e girdik.',
    yorum_en: 'Achieving organic growth in the competitive finance sector was very difficult. Thanks to the content clustering strategy, we entered the top 3 for our target keywords.',
  },
  {
    isim: 'Selin Y.', unvan_tr: 'CMO', unvan_en: 'CMO',
    sirket: 'Gayrimenkul Platformu', sektor_tr: 'Gayrimenkul', sektor_en: 'Real Estate',
    yorum_tr: '8 ay içinde organik trafiğimizi 5 katına çıkardı. Şehir bazlı yerel SEO stratejisi ve içerik mimarisi mükemmeldi.',
    yorum_en: 'He grew our organic traffic 5x in 8 months. The city-based local SEO strategy and content architecture were excellent.',
  },
]

const BRAND_LOGOS = [
  { src: '/images/referanslar/emlak-acentesi.png', alt: 'Emlak Acentesi' },
  { src: '/images/referanslar/botanik-bahce.png', alt: 'Botanik Bahçe' },
  { src: '/images/referanslar/akallar-et.png', alt: 'Akallar Et & Et Ürünleri' },
  { src: '/images/referanslar/akallar-otel.png', alt: 'Akallar Otel & Tatil Köyü' },
  { src: '/images/referanslar/alagoz-ecza.png', alt: 'Alagöz Ecza Deposu' },
  { src: '/images/referanslar/doga-eczanesi.png', alt: 'Doğa Eczanesi' },
  { src: '/images/referanslar/neseli-tursucu.png', alt: 'Neşeli Turşucu' },
  { src: '/images/referanslar/aylin-dagdelen.png', alt: 'Aylin Dağdelen Çiçekçi Dükkanı' },
  { src: '/images/referanslar/harika-cicekcilik.png', alt: 'Harika Çiçekçilik' },
  { src: '/images/referanslar/kucuk-ilhamlar.png', alt: 'Küçük İlhamlar' },
  { src: '/images/referanslar/rimberio-pazarlama.png', alt: 'Rimberio Pazarlama' },
  { src: '/images/referanslar/hekimoglu-collection.png', alt: 'Hekimoğlu Collection' },
  { src: '/images/referanslar/ceylin-hatipoglu.png', alt: 'Ceylin Hatipoğlu' },
  { src: '/images/referanslar/fulya-arda.png', alt: 'Fulya Arda Tasarım Stüdyosu' },
  { src: '/images/referanslar/lume.png', alt: 'Lumé' },
  { src: '/images/referanslar/minimalist.png', alt: 'minimalist' },
  { src: '/images/referanslar/istanbul-studyo.png', alt: 'İstanbul Stüdyo 2030' },
  { src: '/images/referanslar/meridian-services.png', alt: 'Meridian Services' },
  { src: '/images/referanslar/cloudlet-systems.png', alt: 'Cloudlet Systems' },
  { src: '/images/referanslar/circuit-systems.png', alt: 'Circuit Systems' },
]

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = {
    title: isEn ? 'Client Testimonials | Fatih Emin Çakıroğlu' : 'Müşteri Referansları | Fatih Emin Çakıroğlu',
    badge: isEn ? 'TESTIMONIALS' : 'REFERANSLAR',
    h1a: isEn ? 'Client' : 'Müşterilerin',
    h1b: isEn ? 'Experiences' : 'deneyimleri',
    desc: isEn ? 'I have worked with 150+ businesses. Here is what some of them say.' : '150+ işletmeyle çalıştım. İşte bazıları ne diyor.',
    breadcrumb: isEn ? ['Home','About','Testimonials'] : ['Ana Sayfa','Hakkımda','Referanslar'],
    breadLinks: isEn ? ['/','about','testimonials'] : ['/','hakkimda','referanslar'],
    sektor: isEn ? 'Sector' : 'Sektör',
    ctaTitle: isEn ? 'Want to be next?' : 'Siz de dahil olmak ister misiniz?',
    ctaDesc: isEn ? 'Book a free discovery call and let\'s grow together.' : 'Ücretsiz keşif görüşmesiyle başlayalım.',
    ctaBtn: isEn ? 'Get in Touch →' : 'İletişime Geç →',
    brandsTitle: isEn ? 'Brands I\'ve worked with' : 'Birlikte Çalıştığım Markalar',
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? "Real testimonials from 150+ businesses and measurable organic growth results. Discover our clients' experiences with SEO and GEO consulting services." : "150'den fazla işletmeden gerçek referanslar ve ölçülebilir organik büyüme sonuçları. Müşterilerimizin SEO ve GEO danışmanlığı deneyimlerini keşfedin."} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/testimonials' : 'https://fatihemincakiroglu.com/referanslar'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/referanslar" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/testimonials" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/referanslar" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href={`/${t.breadLinks[1]}`} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[1]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[2]}</span>
          </div>
        </div>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 40px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.badge}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
              {t.h1a} <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{t.h1b}</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px' }}>{t.desc}</p>
          </div>
        </div>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '36px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#aaa', marginBottom: '28px' }}>{t.brandsTitle}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px', alignItems: 'center' }}>
              {BRAND_LOGOS.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf9f7', border: '1px solid #f0ede8', borderRadius: '10px', padding: '14px', height: '76px' }}>
                  <img src={b.src} alt={b.alt} title={b.alt} loading="lazy"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.65, transition: 'filter 0.2s, opacity 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.65' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            {REFS.map((r, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '36px', color: 'var(--orange)', fontFamily: 'Georgia', lineHeight: 1, marginBottom: '14px' }}>"</div>
                  <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.75, marginBottom: '20px' }}>{isEn ? r.yorum_en : r.yorum_tr}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>{r.isim[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#111' }}>{r.isim}</div>
                      <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? r.unvan_en : r.unvan_tr} · {r.sirket}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#aaa', padding: '3px 8px', background: '#f8f7f5', borderRadius: '4px' }}>{isEn ? r.sektor_en : r.sektor_tr}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>{t.ctaTitle}</h2>
            <p style={{ color: '#6b6b6b', marginBottom: '24px' }}>{t.ctaDesc}</p>
            <Link href={isEn ? '/contact' : '/iletisim'}><button style={{ padding: '14px 32px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{t.ctaBtn}</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
