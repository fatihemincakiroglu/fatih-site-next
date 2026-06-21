import Head from 'next/head'
import Link from 'next/link'

const HIZMETLER = [
  { url: '/seo', ikon: '🔍', baslik: 'SEO Danışmanlığı', aciklama: 'Teknik SEO, içerik optimizasyonu ve backlink stratejisiyle organik büyüme.' },
  { url: '/icerik', ikon: '✍️', baslik: 'İçerik Stratejisi', aciklama: 'Arama niyetine uygun, topical authority inşa eden içerik üretimi.' },
  { url: '/geo', ikon: '🤖', baslik: 'GEO Danışmanlığı', aciklama: 'ChatGPT, Perplexity ve AI Overview\'da kaynak olarak görünme.' },
  { url: '/backlink', ikon: '🔗', baslik: 'Backlink & Dijital PR', aciklama: 'Editoryal linkler ve dijital PR ile otorite inşası.' },
  { url: '/performans', ikon: '📈', baslik: 'Performans & Growth', aciklama: 'Trafik, dönüşüm ve büyüme hedeflerini optimize etme.' },
  { url: '/vakalar', ikon: '📊', baslik: 'Vaka Çalışmaları', aciklama: 'Gerçek sonuçlar, ölçülebilir başarı hikayeleri.' },
]

const ISTATISTIKLER = [
  { n: '150+', l: 'Mutlu Müşteri' },
  { n: '8 Yıl', l: 'Deneyim' },
  { n: '+300%', l: 'Ort. Büyüme' },
  { n: '%98', l: 'Memnuniyet' },
]

export default function Page() {
  return (
    <>
      <Head>
        <title>Fatih Emin Çakıroğlu | SEO ve Dijital Pazarlama Uzmanı</title>
        <meta name="description" content="8+ yıllık deneyimle 150+ işletmenin organik büyümesini hızlandırdım. Teknik SEO, GEO ve dijital pazarlama danışmanlığı." />
        <link rel="canonical" href="https://fatihemincakiroglu.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Fatih Emin Çakıroğlu SEO Danışmanlığı",
          "url": "https://fatihemincakiroglu.com",
          "description": "SEO ve dijital pazarlama danışmanlığı"
        })}} />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)' }}>
        {/* Hero */}
        <section style={{ minHeight: '90vh', background: '#1a1612', display: 'flex', alignItems: 'center', padding: '80px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2520', background: '#231f1a', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b6b6b', textTransform: 'uppercase', marginBottom: '28px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }}></span>
                SEO UZMANI · DİJİTAL PAZARLAMA
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '24px' }}>
                Organik Büyüme ile<br />
                <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Rakiplerinizi</span><br />
                Geride Bırakın
              </h1>
              <p style={{ fontSize: '16px', color: '#6b6b6b', lineHeight: 1.75, marginBottom: '36px', maxWidth: '460px' }}>
                8 yıllık deneyimle 150+ işletmenin Google üzerindeki görünürlüğünü artırdım. Veriye dayalı SEO stratejileriyle kalıcı büyüme sağlıyorum.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/iletisim" style={{ padding: '14px 28px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-body)' }}>
                  Ücretsiz Teklif Al →
                </Link>
                <Link href="/vakalar" style={{ padding: '14px 28px', background: 'transparent', color: '#fff', border: '1px solid #2a2520', borderRadius: '8px', fontWeight: 600, fontSize: '15px', fontFamily: 'var(--font-body)' }}>
                  Vaka Çalışmaları
                </Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {ISTATISTIKLER.map((s, i) => (
                <div key={i} style={{ background: '#231f1a', border: '1px solid #2a2520', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 800, color: 'var(--orange)' }}>{s.n}</div>
                  <div style={{ fontSize: '13px', color: '#6b6b6b', marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hizmetler */}
        <section style={{ padding: '96px 32px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ marginBottom: '48px' }}>
              <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>HİZMETLER</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#111' }}>
                SEO ve dijital pazarlama<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>danışmanlık hizmetleri</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {HIZMETLER.map((h, i) => (
                <Link key={i} href={h.url} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #e0dbd0', display: 'block', textDecoration: 'none' }}>
                  <div style={{ fontSize: '32px', marginBottom: '14px' }}>{h.ikon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{h.baslik}</h3>
                  <p style={{ fontSize: '14px', color: '#6b6b6b', lineHeight: 1.6, marginBottom: '16px' }}>{h.aciklama}</p>
                  <span style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '14px' }}>Detayları gör →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '96px 32px', background: '#1a1612', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
              Ücretsiz keşif görüşmesi
            </h2>
            <p style={{ color: '#6b6b6b', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
              Hedeflerinizi değerlendirip size özel yol haritası oluşturuyorum. Tamamen ücretsiz.
            </p>
            <Link href="/iletisim" style={{ display: 'inline-block', padding: '16px 36px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)' }}>
              İletişime Geç →
            </Link>
          </div>
        </section>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-grid > div:last-child { display: none; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}
