import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const HIZMET_TABS = [
  {
    id: 'seo', label: 'SEO & GEO', ikon: '🔍',
    aciklama: 'Temel prensibimiz; Google rehberliğinde web sitenizin en iyi SEO performansını elde etmesidir. Kapsamlı teknik denetim ve web sitelerinin sürdürülebilir olmasını sağlayan doğal büyüme stratejisi oluştururuz. Uzun dönemli başarılarımız ve elde ettiğimiz know-how deneyimimizi paylaşıyoruz.',
    link: '/seo', linkLabel: 'SEO Hizmetleri →',
    grafik: { oncesi: { aylık: '2.4K', keyword: '38' }, sonrasi: { aylık: '18.2K', keyword: '486', ai: '91%' } }
  },
  {
    id: 'icerik', label: 'İçerik Stratejisi', ikon: '✍️',
    aciklama: 'Arama niyetine oturan, topical authority inşa eden, dönüşüm getiren içerik üretimi. E-E-A-T odaklı içerik mimarisi ve semantik derinlik ile organik görünürlüğünüzü kalıcı olarak artırın.',
    link: '/icerik', linkLabel: 'İçerik Hizmetleri →',
    grafik: { oncesi: { aylık: '1.1K', keyword: '22' }, sonrasi: { aylık: '9.8K', keyword: '312', ai: '78%' } }
  },
  {
    id: 'geo', label: 'GEO & AI SEO', ikon: '🤖',
    aciklama: 'ChatGPT, Perplexity, Google AI Overview ve diğer yapay zekâ arama motorlarında kaynak olarak görünün. LLM optimizasyonu ve AI visibility stratejisiyle markanızı geleceğin aramalarına hazırlayın.',
    link: '/geo', linkLabel: 'GEO Hizmetleri →',
    grafik: { oncesi: { aylık: '800', keyword: '15' }, sonrasi: { aylık: '7.2K', keyword: '198', ai: '95%' } }
  },
  {
    id: 'backlink', label: 'Backlink & PR', ikon: '🔗',
    aciklama: 'Editoryal link, yayın ilişkileri ve marka sinyalleriyle domain otoritenizi güçlendirin. Sürdürülebilir ve etik bir link profili inşa ederek rekabetçi anahtar kelimelerde kalıcı sıralamalar kazanın.',
    link: '/backlink', linkLabel: 'Backlink Hizmetleri →',
    grafik: { oncesi: { aylık: '3.2K', keyword: '56' }, sonrasi: { aylık: '14.5K', keyword: '389', ai: '85%' } }
  },
]

const MUSTERILER = [
  'Kariyer.net', 'Hepsiburada', 'Hepsiemlak', 'Turkish Airlines', 'Obilet',
  'Paribu', 'Karaca', 'Sigortam.net', 'Ekşi Sözlük', 'Mynet'
]

const REFERANSLAR = [
  {
    yorum: 'İhtiyaçlarımızı anlayan ve bunları güçlü bir anlatımla somutlaştıran Fatih\'in yaklaşımından çok memnunuz. Markamızın ruhunu bu kadar kısa sürede kavrayıp her aşamada yanımızda olması, bu iş birliğini bizim için çok kıymetli kılıyor.',
    isim: 'Mehmet A.', unvan: 'Sr. SEO Team Lead', sirket: '@Hepsiburada', buyuk: true
  },
  {
    yorum: '2023 yılında emanet ettik SEO çalışmalarını her daim SEO departmanımız gibi çalışmayı başardılar. Paribu ailesi olarak Fatih\'in bizimle beraber aynı yolda yürümesinden çok mutluyuz.',
    isim: 'Çiğdem Erdem', unvan: 'Manager | Marketing | Digital', sirket: 'PARİBU', buyuk: false
  },
  {
    yorum: 'Kariyer.net ve Lsinolsun.com projelerinde beraber yürüdüğümüz SEO ajansımızın operasyonel olarak ekip arkadaşlarımız gibi çalışması bizim için büyük avantaj sağlamakta.',
    isim: 'Ezgi Kargan', unvan: 'CMO', sirket: 'Kariyer.net', buyuk: false
  },
  {
    yorum: 'Sağlık sektöründeki dijital varlığımızı sıfırdan inşa etti. Online randevu sistemimiz hasta memnuniyetini artırdı ve operasyonel maliyetleri düşürdü. Her adımda yanımızda olan güvenilir bir ekip.',
    isim: 'Dr. Ayşe M.', unvan: 'CEO', sirket: 'Massivebio', buyuk: false
  },
  {
    yorum: 'Similarweb verilerine göre haber dikeyinde 10. sıradan başladığımız dönemde, organik ve Google Discover trafiğindeki tek seferlik bir sıçrama değil, sürdürülebilir büyüme ile sıralamayı 2. sıraya taşıdık.',
    isim: 'Emre Kurttepeli', unvan: 'Chairperson', sirket: 'Mynet', buyuk: false
  },
]

const BLOG_YAZILARI = [
  { no: '01', baslik: 'Teknik SEO\'da 2025 Öncelikleri: Core Web Vitals ve Crawl Optimizasyonu', yazar: 'Fatih Emin Çakıroğlu', sure: '8 dk', slug: 'teknik-seo-2025' },
  { no: '02', baslik: 'GEO Nedir? Google AI Overview\'da Kaynak Olmanın Yolu', yazar: 'Fatih Emin Çakıroğlu', sure: '9 dk', slug: 'geo-nedir' },
  { no: '03', baslik: 'E-E-A-T Sinyalleri ve Topical Authority İnşası', yazar: 'Fatih Emin Çakıroğlu', sure: '7 dk', slug: 'eeat-topical-authority' },
  { no: '04', baslik: 'LLMs.txt ile Yapay Zekâ Arama Görünürlüğü Nasıl Artırılır?', yazar: 'Fatih Emin Çakıroğlu', sure: '6 dk', slug: 'llms-txt' },
  { no: '05', baslik: 'Backlink Profili Analizi: Toksik Link Tespiti ve Temizleme', yazar: 'Fatih Emin Çakıroğlu', sure: '8 dk', slug: 'backlink-analizi' },
]

export default function Page() {
  const router = useRouter()
  const [aktifTab, setAktifTab] = useState('seo')
  const [domain, setDomain] = useState('')
  const aktif = HIZMET_TABS.find(t => t.id === aktifTab)

  return (
    <>
      <Head>
        {/* Locale-aware head */}
        <title>{router.locale === 'en' ? 'Fatih Emin Çakıroğlu | SEO & GEO Consulting' : 'Fatih Emin Çakıroğlu | SEO ve GEO Danışmanlığı'}</title>
        <meta name="description" content={router.locale === 'en' ? "With 8+ years of experience, I've grown the SEO and AI search visibility of 150+ businesses. SEO, GEO and digital marketing consulting." : "8+ yıllık deneyimle 150+ işletmenin organik ve yapay zekâ arama görünürlüğünü artırdım. SEO, GEO ve dijital pazarlama danışmanlığı."} />
        <link rel="canonical" href={router.locale === 'en' ? 'https://fatihemincakiroglu.com/en' : 'https://fatihemincakiroglu.com'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com" />

        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "WebSite", "name": "Fatih Emin Çakıroğlu", "url": "https://fatihemincakiroglu.com", "description": "SEO ve GEO danışmanlığı", "author": {"@id": "https://fatihemincakiroglu.com/#person"}, "potentialAction": {"@type": "SearchAction", "target": "https://fatihemincakiroglu.com/blog?q={search_term_string}", "query-input": "required name=search_term_string"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "Person", "@id": "https://fatihemincakiroglu.com/#person", "name": "Fatih Emin Çakıroğlu", "url": "https://fatihemincakiroglu.com", "jobTitle": "SEO & Dijital Pazarlama Uzmanı", "address": {"@type": "PostalAddress", "addressLocality": "İstanbul", "addressCountry": "TR"}, "sameAs": ["https://www.linkedin.com/in/fatihemincakiroglu/"]})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Fatih Emin Çakıroğlu SEO Danışmanlığı", "url": "https://fatihemincakiroglu.com", "description": "8+ yıllık deneyimle SEO, GEO ve dijital pazarlama danışmanlığı", "founder": {"@id": "https://fatihemincakiroglu.com/#person"}, "areaServed": "TR", "priceRange": "$$", "currenciesAccepted": "TRY"})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)' }}>

        {/* ─── HERO ─── */}
        <section style={{ background: '#faf9f7', padding: '72px 40px 64px', overflow: 'hidden' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}>

            {/* Sol */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#111', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '28px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }}></span>
                SEO UZMANI · GEO · DİJİTAL PAZARLAMA
              </div>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#111', marginBottom: '8px' }}>
                SEO ve GEO ile
              </h1>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#111', marginBottom: '8px', borderBottom: '4px solid var(--orange)', display: 'inline-block', paddingBottom: '4px' }}>
                Arama Görünürlüğünüzü
              </h1>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#111', marginBottom: '24px' }}>
                Baştan Tasarlayın
              </h1>

              <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.75, marginBottom: '32px', maxWidth: '480px' }}>
                150+ işletmenin Google ve yapay zekâ aramalarındaki görünürlüğünü artırdım. Veriye dayalı SEO & GEO stratejisiyle kalıcı büyüme sağlıyorum.
              </p>

              {/* Domain input */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', maxWidth: '460px' }}>
                <input
                  type="text"
                  placeholder="Alan adınızı girin..."
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  style={{ flex: 1, padding: '13px 18px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', background: '#fff' }}
                />
                <Link href="/iletisim" style={{ padding: '13px 22px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                  Analiz Et
                </Link>
              </div>

              {/* CTA pill */}
              <Link href="/randevu" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#111', color: '#fff', padding: '12px 20px 12px 12px', borderRadius: '40px', textDecoration: 'none', marginBottom: '20px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>→</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Ücretsiz Teklif Al</div>
                  <div style={{ fontSize: '11px', color: '#888' }}>24 saat içinde özel SEO ve GEO stratejiniz</div>
                </div>
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#aaa' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
                Domain bilgisi alıp ücretsiz AI audit yapalım.
              </div>
            </div>

            {/* Sağ — Google Mock */}
            <div style={{ position: 'relative' }}>
              {/* #1 badge */}
              <div style={{ position: 'absolute', top: '-12px', right: '20px', background: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '8px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#111' }}>#1</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>Top 1 sonuç</div>
                  <div style={{ fontSize: '11px', color: '#aaa' }}>AI Overview'da öne çıkıyor</div>
                </div>
              </div>

              {/* Browser mockup */}
              <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', border: '1px solid #eee', overflow: 'hidden' }}>
                {/* Browser bar */}
                <div style={{ background: '#f5f5f5', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #eee' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }}></span>
                  <div style={{ flex: 1, background: '#fff', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', color: '#888', marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#aaa', fontSize: '10px' }}>🔒</span> google.com/search
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  {/* Search bar */}
                  <div style={{ border: '1px solid #ddd', borderRadius: '24px', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <img src="https://www.google.com/favicon.ico" alt="" style={{ width: '16px', height: '16px' }} onError={e => e.target.style.display='none'} />
                    <span style={{ fontSize: '14px', color: '#333', flex: 1 }}>en iyi seo danışmanı türkiye</span>
                    <span style={{ fontSize: '16px', color: '#4285f4' }}>🎤</span>
                  </div>

                  {/* Tab bar */}
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', fontSize: '13px' }}>
                    {['+ AI Overview', 'Tümü', 'Görseller', 'Haberler'].map((t, i) => (
                      <span key={i} style={{ padding: '4px 10px', borderRadius: '20px', background: i === 0 ? '#e8f0fe' : 'transparent', color: i === 0 ? '#1a73e8' : '#555', fontWeight: i === 0 ? 600 : 400, cursor: 'pointer', fontSize: '12px' }}>{t}</span>
                    ))}
                  </div>

                  {/* AI Overview card */}
                  <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ background: '#f8f9ff', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #eee' }}>
                      <span style={{ color: '#1a73e8', fontSize: '14px' }}>✦</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a73e8' }}>AI Overview</span>
                      <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#aaa' }}>Yanıt oluşturuluyor</span>
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        {[1,2,3,4].map(i => (
                          <div key={i} style={{ flex: 1, background: '#f5f5f5', borderRadius: '6px', padding: '8px', fontSize: '11px', color: '#888' }}>
                            {i === 1 ? <div><div style={{ fontWeight: 600, color: '#333', marginBottom: '4px', fontSize: '11px' }}>fatihemincakiroglu.com</div><div style={{ background: '#eee', height: '6px', borderRadius: '3px', marginBottom: '3px' }}></div><div style={{ background: '#eee', height: '6px', borderRadius: '3px', width: '70%' }}></div></div> : <><div style={{ background: '#eee', height: '8px', borderRadius: '3px', marginBottom: '4px' }}></div><div style={{ background: '#eee', height: '8px', borderRadius: '3px', width: '80%' }}></div></>}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 600 }}>✓ Doğrulanmış kaynaklar</span>
                        <span style={{ fontSize: '11px', color: '#555' }}>+ Daha fazla</span>
                      </div>
                    </div>
                    {/* Bottom stat */}
                    <div style={{ background: '#f8f7f5', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid #eee' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, background: '#111', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>AI</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>+312% görünürlük</span>
                      <span style={{ fontSize: '11px', color: '#aaa' }}>son 90 gün, GEO + AI SEO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── REFERANSLAR / LOGO GRID ─── */}
        <section style={{ padding: '72px 40px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '60px', alignItems: 'center' }}>
            {/* Sol */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '28px', height: '1px', background: '#aaa' }}></div>
                <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>REFERANSLAR</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>
                Lider markaların <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>seçimi.</span>
              </h2>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>
                SEO, içerik, yapay zekâ ve GEO ile arama ve yanıt ekosisteminde görünürlük; 150+ markaya uçtan uca danışmanlık.
              </p>
              <div style={{ display: 'flex', gap: '32px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#111' }}>150+</div>
                  <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>Aktif marka</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#111' }}>14</div>
                  <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>Sektör</div>
                </div>
              </div>
            </div>

            {/* Sağ — logo grid */}
            <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                {MUSTERILER.map((m, i) => (
                  <div key={i} style={{
                    padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRight: (i + 1) % 5 !== 0 ? '1px solid #eee' : 'none',
                    borderBottom: i < 5 ? '1px solid #eee' : 'none',
                    fontWeight: 700, fontSize: '13px', color: '#555', textAlign: 'center',
                    filter: 'grayscale(100%)', opacity: 0.6,
                  }}>{m}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── HİZMETLER (TAB) ─── */}
        <section style={{ padding: '72px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ede8e0', background: '#fff', fontSize: '12px', color: '#888', fontWeight: 600, marginBottom: '14px' }}>
                  SEO EN ÖNEMLİ TRAFİK KANALI
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', lineHeight: 1.2 }}>
                  Sürdürülebilir SEO ile<br />Rekabetinizde Lider Olun
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--orange)', marginTop: '10px', lineHeight: 1.6, maxWidth: '460px' }}>
                  Teknik SEO, içerik stratejisi ve AI optimizasyonunu birleştiren bütünsel yaklaşımımızla markanızın dijital büyümesini hızlandırıyoruz.
                </p>
              </div>
              <Link href="/iletisim" style={{ padding: '10px 22px', borderRadius: '20px', border: '1px solid #ddd', color: '#555', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', background: '#fff', whiteSpace: 'nowrap' }}>
                Siteniz için SEO Analizi Talep Et
              </Link>
            </div>

            {/* Tab bar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {HIZMET_TABS.map(t => (
                <button key={t.id} onClick={() => setAktifTab(t.id)} style={{
                  padding: '10px 18px', borderRadius: '10px',
                  border: aktifTab === t.id ? '2px solid var(--orange)' : '2px solid #eee',
                  background: aktifTab === t.id ? '#fff' : '#fff',
                  color: aktifTab === t.id ? 'var(--orange)' : '#555',
                  fontWeight: aktifTab === t.id ? 700 : 500,
                  cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.15s',
                }}>
                  <span style={{ fontSize: '16px' }}>{t.ikon}</span> {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #eee' }}>
              {/* Sol */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>{aktif.label}</h3>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '28px' }}>{aktif.aciklama}</p>
                <Link href={aktif.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  {aktif.linkLabel}
                </Link>
              </div>

              {/* Sağ — chart mockup */}
              <div style={{ background: '#faf9f7', borderRadius: '12px', padding: '24px', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, background: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: '4px', letterSpacing: '1px' }}>GERÇEK MÜŞTERİ VERİSİ</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>6 Aylık SEO Dönüşümü</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: '#dc2626', fontWeight: 700, marginBottom: '4px' }}>▸ ÖNCESİ</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111' }}>{aktif.grafik.oncesi.aylık}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>aylık oturum</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#111', marginTop: '8px' }}>{aktif.grafik.oncesi.keyword}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>sıralanan keyword</div>
                  </div>
                  <div style={{ background: '#dcfce7', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginBottom: '4px' }}>▸ SONRASI</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111' }}>{aktif.grafik.sonrasi.aylık}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>aylık oturum</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#111', marginTop: '8px' }}>{aktif.grafik.sonrasi.ai}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>AI visibility</div>
                  </div>
                </div>
                {/* Bar chart */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '60px' }}>
                  {['Eki','Kas','Ara','Tem','Ağu','Eyl'].map((ay, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: i < 3 ? '#fca5a5' : '#86efac', height: `${i < 3 ? 20 + i * 8 : 35 + (i-3) * 10}px` }}></div>
                      <span style={{ fontSize: '9px', color: '#aaa' }}>{ay}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MÜŞTERİ YORUMLARI ─── */}
        <section style={{ padding: '72px 40px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ede8e0', background: '#faf9f7', fontSize: '12px', color: '#888', fontWeight: 600, marginBottom: '14px' }}>
                MÜŞTERİ YORUMLARI
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
                Müşterilerin Deneyimleri
              </h2>
              <p style={{ fontSize: '14px', color: '#888', maxWidth: '500px', lineHeight: 1.6 }}>
                Çok farklı sektörlerde, birlikte yürüttüğümüz projelerde elde ettiğimiz etkileri doğrudan ekiplerden dinleyin.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '16px' }}>
              {/* Büyük kart */}
              <div style={{ background: '#faf9f7', borderRadius: '16px', padding: '32px', border: '1px solid #ede8e0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '40px', color: 'var(--orange)', fontFamily: 'Georgia', lineHeight: 1, marginBottom: '16px' }}>❝</div>
                  <p style={{ fontSize: '16px', color: '#333', lineHeight: 1.75, fontWeight: 500, marginBottom: '28px' }}>
                    {REFERANSLAR[0].yorum}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>M</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>{REFERANSLAR[0].isim}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>{REFERANSLAR[0].unvan} {REFERANSLAR[0].sirket}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: '16px', fontWeight: 800, color: 'var(--orange)' }}>hepsiburada</div>
                </div>
              </div>

              {/* Sağ 2 sütun */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[REFERANSLAR[1], REFERANSLAR[3]].map((r, i) => (
                  <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '24px', border: '1px solid #ede8e0', flex: 1 }}>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>{r.yorum}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e0e0', flexShrink: 0 }}></div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>{r.isim}</div>
                        <div style={{ fontSize: '11px', color: '#aaa' }}>{r.unvan}</div>
                      </div>
                      <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: '#555' }}>{r.sirket}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[REFERANSLAR[2], REFERANSLAR[4]].map((r, i) => (
                  <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '24px', border: '1px solid #ede8e0', flex: 1 }}>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>{r.yorum}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e0e0', flexShrink: 0 }}></div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>{r.isim}</div>
                        <div style={{ fontSize: '11px', color: '#aaa' }}>{r.unvan}</div>
                      </div>
                      <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: '#555' }}>{r.sirket}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── BLOG ─── */}
        <section style={{ padding: '72px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '48px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '28px', height: '1px', background: '#aaa' }}></div>
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>BLOG</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: '16px' }}>
                  SEO'nun yeni <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>sanatı,</span><br />haftalık notlar.
                </h2>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>
                  SEO, GEO ve yapay zekâ aramalarında görünürlük: kaynak makalelerden derlenen güncel içgörüler ve uygulanabilir çerçeveler.
                </p>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', background: '#111', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  Tüm yazılar →
                </Link>
              </div>

              {/* Featured post */}
              <div style={{ background: '#111', borderRadius: '16px', padding: '28px', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', color: '#555' }}>№ 01</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--orange)' }}>İÇERİK</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
                  Teknik SEO'da 2025 Öncelikleri: Core Web Vitals ve Crawl Optimizasyonu
                </h3>
                <div style={{ fontSize: '12px', color: '#555' }}>Fatih Emin Çakıroğlu · ~8 dk</div>
              </div>
            </div>

            {/* Blog list */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', borderBottom: '2px solid var(--orange)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '1.5px', textTransform: 'uppercase' }}>SON EKLENENLER</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 200px 80px', padding: '12px 24px', borderBottom: '1px solid #f0f0f0', background: '#faf9f7' }}>
                {['', 'İÇİNDEKİLER', 'YAZAR', 'SÜRE'].map((h, i) => (
                  <div key={i} style={{ fontSize: '10px', fontWeight: 700, color: '#bbb', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>
              {BLOG_YAZILARI.map((y, i) => (
                <Link key={i} href={`/blog/${y.slug}`} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 200px 80px', padding: '16px 24px', borderBottom: i < BLOG_YAZILARI.length - 1 ? '1px solid #f5f5f5' : 'none', alignItems: 'center', textDecoration: 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '13px', color: '#ccc', fontWeight: 700 }}>{y.no}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#111', lineHeight: 1.4 }}>{y.baslik}</span>
                  <span style={{ fontSize: '13px', color: '#888' }}>{y.yazar}</span>
                  <span style={{ fontSize: '13px', color: '#aaa' }}>{y.sure}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ARAÇLAR BANDI ─── */}
        <section style={{ padding: '48px 40px', background: '#111' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', background: '#161616', borderRadius: '16px', padding: '32px 36px' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '20px', background: 'rgba(232,86,10,0.15)', border: '1px solid rgba(232,86,10,0.3)', fontSize: '11px', color: 'var(--orange)', fontWeight: 700, marginBottom: '12px' }}>
                ☀ ÇALIŞMA ORTAMI
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                Veri, reklam ve <span style={{ color: 'var(--orange)' }}>AI araçları</span>
              </h3>
              <div style={{ width: '32px', height: '2px', background: 'var(--orange)', marginTop: '8px' }}></div>
            </div>
            <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['SEMrush', 'Ahrefs', 'SEOmonitor', 'ChatGPT', 'Perplexity', 'Claude', 'Bing', 'Meta Business', 'Google Partner', 'Search Console', 'Screaming Frog'].map((t, i) => (
                <span key={i} style={{ padding: '8px 18px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#999', fontSize: '13px', fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: '96px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0', textAlign: 'center' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>
              Siteniz için ücretsiz<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>keşif görüşmesi</span>
            </h2>
            <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
              Hedeflerinizi değerlendirip size özel SEO ve GEO yol haritası oluşturuyorum. Tamamen ücretsiz.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/iletisim" style={{ padding: '15px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
                İletişime Geç →
              </Link>
              <Link href="/randevu" style={{ padding: '15px 32px', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
                Randevu Al
              </Link>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) {
          section { padding-left: 16px !important; padding-right: 16px !important; }
          section > div { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-right { display: none; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          section > div { gap: 32px !important; }
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}
