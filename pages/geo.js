import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const CONTENT = {
  tr: {
    badge: 'GEO DANIŞMANLIĞI', h1a: "Yapay zekâ aramalarında", h1b: 'kaynak olun',
    desc: 'ChatGPT, Perplexity ve Google AI Overview\u2019da içeriklerinizin kaynak olarak gösterilmesi için GEO stratejisi geliştiriyorum.',
    btn1: 'Ücretsiz Teklif Al →', btn2: 'Vaka Çalışmaları',
    back: '← Tüm Hizmetler', h2a: 'GEO nedir?', h2b: 'GEO süreci nasıl işler?', h2c: 'GEO danışmanlığı almak ister misiniz?',
    ctaDesc: 'Sitenizi analiz edip yapay zekâ arama görünürlüğü için özel strateji sunuyorum.', ctaBtn: 'İletişime Geç →',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'GEO Danışmanlığı'],
    neler: [
      { baslik: 'AI Overview Optimizasyonu', detay: 'Google AI Overview\u2019da kaynak olarak görünmek için içerik yapısı ve schema optimizasyonu.' },
      { baslik: 'LLM İçerik Stratejisi', detay: 'ChatGPT ve Perplexity\'nin tercih ettiği içerik formatları ve kaynak sinyalleri.' },
      { baslik: 'llms.txt Implementasyonu', detay: 'LLM sistemlerin sitenizi daha iyi anlaması için standart dosya yapılandırması.' },
      { baslik: 'Entity & Knowledge Graph', detay: 'Marka varlığınızı arama motorları bilgi grafında güçlendirme.' },
      { baslik: 'GEO Performans Ölçümü', detay: 'AI search visibility skorları ve kaynak görünürlük takibi.' },
      { baslik: 'E-E-A-T Güçlendirme', detay: 'Deneyim, uzmanlık, otorite ve güvenilirlik sinyallerinin artırılması.' },
    ],
    surec: [
      { no: '01', baslik: 'GEO Denetimi', aciklama: 'Mevcut AI arama görünürlüğünüzü ve fırsatları analiz ederim.' },
      { no: '02', baslik: 'İçerik Optimizasyonu', aciklama: 'LLM\'lerin tercih ettiği formata göre içeriklerinizi yeniden yapılandırırım.' },
      { no: '03', baslik: 'Teknik GEO', detay: 'Schema, llms.txt ve entity optimizasyonu uygularım.' },
      { no: '04', baslik: 'Görünürlük Takibi', aciklama: 'AI Overview ve LLM kaynak görünürlüğünü düzenli izlerim.' },
    ],
  },
  en: {
    badge: 'GEO CONSULTING', h1a: 'Get cited as a source', h1b: 'in AI search engines',
    desc: 'I develop GEO strategies to get your content cited as a source in ChatGPT, Perplexity and Google AI Overview.',
    btn1: 'Get a Free Quote →', btn2: 'Case Studies',
    back: '← All Services', h2a: 'What is GEO?', h2b: 'How does the GEO process work?', h2c: 'Would you like GEO consulting?',
    ctaDesc: 'I analyze your site and present a custom AI search visibility strategy.', ctaBtn: 'Get in Touch →',
    breadcrumb: ['Home', 'Services', 'GEO Consulting'],
    neler: [
      { baslik: 'AI Overview Optimization', detay: 'Content structure and schema optimization to appear as a source in Google AI Overview.' },
      { baslik: 'LLM Content Strategy', detay: 'Content formats and source signals preferred by ChatGPT and Perplexity.' },
      { baslik: 'llms.txt Implementation', detay: 'Standard file configuration to help LLM systems better understand your site.' },
      { baslik: 'Entity & Knowledge Graph', detay: 'Strengthening your brand presence in search engine knowledge graphs.' },
      { baslik: 'GEO Performance Measurement', detay: 'AI search visibility scores and source visibility tracking.' },
      { baslik: 'E-E-A-T Strengthening', detay: 'Increasing experience, expertise, authority and trustworthiness signals.' },
    ],
    surec: [
      { no: '01', baslik: 'GEO Audit', aciklama: 'I analyze your current AI search visibility and opportunities.' },
      { no: '02', baslik: 'Content Optimization', aciklama: 'I restructure your content according to the format preferred by LLMs.' },
      { no: '03', baslik: 'Technical GEO', aciklama: 'I implement schema, llms.txt and entity optimization.' },
      { no: '04', baslik: 'Visibility Tracking', aciklama: 'I regularly monitor AI Overview and LLM source visibility.' },
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
        <title>{isEn ? 'GEO Consulting | Fatih Emin Çakıroğlu' : 'GEO Danışmanlığı | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? 'Get cited as a source in ChatGPT, Perplexity and Google AI Overview. GEO strategy.' : 'ChatGPT, Perplexity ve Google AI Overview\'da kaynak olarak görünme stratejisi.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/geo' : 'https://fatihemincakiroglu.com/geo'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/geo" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/geo" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/geo" />
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
