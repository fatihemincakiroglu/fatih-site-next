import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const HIZMET_TABS = {
  tr: [
    { id: 'seo', label: 'SEO & GEO', ikon: '🔍', aciklama: 'Temel prensibimiz; Google rehberliğinde web sitenizin en iyi SEO performansını elde etmesidir. Kapsamlı teknik denetim ve doğal büyüme stratejisiyle sürdürülebilir sonuçlar sağlıyorum.', link: '/seo', linkLabel: 'SEO Hizmetleri →', grafik: { oncesi: { aylik: '2.4K', keyword: '38' }, sonrasi: { aylik: '18.2K', keyword: '486', ai: '91%' } } },
    { id: 'icerik', label: 'İçerik Stratejisi', ikon: '✍️', aciklama: 'Arama niyetine oturan, topical authority inşa eden, dönüşüm getiren içerik üretimi. E-E-A-T odaklı içerik mimarisiyle organik görünürlüğünüzü kalıcı olarak artırın.', link: '/icerik', linkLabel: 'İçerik Hizmetleri →', grafik: { oncesi: { aylik: '1.1K', keyword: '22' }, sonrasi: { aylik: '9.8K', keyword: '312', ai: '78%' } } },
    { id: 'geo', label: 'GEO & AI SEO', ikon: '🤖', aciklama: 'ChatGPT, Perplexity, Google AI Overview ve diğer yapay zekâ arama motorlarında kaynak olarak görünün. LLM optimizasyonuyla markanızı geleceğin aramalarına hazırlayın.', link: '/geo', linkLabel: 'GEO Hizmetleri →', grafik: { oncesi: { aylik: '800', keyword: '15' }, sonrasi: { aylik: '7.2K', keyword: '198', ai: '95%' } } },
    { id: 'backlink', label: 'Backlink & PR', ikon: '🔗', aciklama: 'Editoryal link, yayın ilişkileri ve marka sinyalleriyle domain otoritenizi güçlendirin. Sürdürülebilir link profili inşa ederek rekabetçi sıralamalarda kalıcı yer kazanın.', link: '/backlink', linkLabel: 'Backlink Hizmetleri →', grafik: { oncesi: { aylik: '3.2K', keyword: '56' }, sonrasi: { aylik: '14.5K', keyword: '389', ai: '85%' } } },
  ],
  en: [
    { id: 'seo', label: 'SEO & GEO', ikon: '🔍', aciklama: 'My core principle is to achieve the best SEO performance for your website guided by Google. I deliver sustainable results through comprehensive technical audits and natural growth strategies.', link: '/seo', linkLabel: 'SEO Services →', grafik: { oncesi: { aylik: '2.4K', keyword: '38' }, sonrasi: { aylik: '18.2K', keyword: '486', ai: '91%' } } },
    { id: 'icerik', label: 'Content Strategy', ikon: '✍️', aciklama: 'Content production aligned with search intent, building topical authority and driving conversions. Permanently improve your organic visibility with E-E-A-T focused content architecture.', link: '/icerik', linkLabel: 'Content Services →', grafik: { oncesi: { aylik: '1.1K', keyword: '22' }, sonrasi: { aylik: '9.8K', keyword: '312', ai: '78%' } } },
    { id: 'geo', label: 'GEO & AI SEO', ikon: '🤖', aciklama: 'Get cited as a source in ChatGPT, Perplexity, Google AI Overview and other AI search engines. Prepare your brand for the future of search with LLM optimization.', link: '/geo', linkLabel: 'GEO Services →', grafik: { oncesi: { aylik: '800', keyword: '15' }, sonrasi: { aylik: '7.2K', keyword: '198', ai: '95%' } } },
    { id: 'backlink', label: 'Backlink & PR', ikon: '🔗', aciklama: 'Strengthen your domain authority with editorial links, publishing relationships and brand signals. Build a sustainable link profile and earn lasting positions in competitive rankings.', link: '/backlink', linkLabel: 'Backlink Services →', grafik: { oncesi: { aylik: '3.2K', keyword: '56' }, sonrasi: { aylik: '14.5K', keyword: '389', ai: '85%' } } },
  ]
}

const MUSTERILER = [
  { tr: 'İstihdam & Kariyer', en: 'Recruitment & Career' },
  { tr: 'E-Ticaret', en: 'E-Commerce' },
  { tr: 'Gayrimenkul', en: 'Real Estate' },
  { tr: 'Havacılık', en: 'Aviation' },
  { tr: 'Seyahat & Bilet', en: 'Travel & Ticketing' },
  { tr: 'Fintech & Kripto', en: 'Fintech & Crypto' },
  { tr: 'Moda & Yaşam', en: 'Fashion & Lifestyle' },
  { tr: 'Sigorta', en: 'Insurance' },
  { tr: 'Sosyal & Medya', en: 'Social & Media' },
  { tr: 'Haber & Dijital Medya', en: 'News & Digital Media' },
]

const REFERANSLAR = [
  { yorum_tr: 'İhtiyaçlarımızı anlayan ve bunları güçlü bir anlatımla somutlaştıran yaklaşımdan çok memnunuz. Markamızın ruhunu bu kadar kısa sürede kavrayıp her aşamada yanımızda olması, bu iş birliğini bizim için çok kıymetli kılıyor.', yorum_en: 'We are very satisfied with the approach to understanding our needs and bringing them to life with compelling narratives. Grasping the essence of our brand so quickly and being with us at every stage makes this collaboration extremely valuable for us.', isim: 'Mehmet A.', unvan: 'Sr. SEO Team Lead', sektor_tr: 'E-Ticaret', sektor_en: 'E-Commerce' },
  { yorum_tr: '2023 yılında SEO çalışmalarımızı emanet ettik. Her daim kendi SEO departmanımız gibi çalışmayı başardılar. Bu yolda birlikte yürümesinden çok mutluyuz.', yorum_en: 'We entrusted our SEO operations in 2023. They always worked like our own SEO department. We are very happy to walk this path together.', isim: 'Çiğdem E.', unvan: 'Manager | Marketing | Digital', sektor_tr: 'Fintech & Kripto', sektor_en: 'Fintech & Crypto' },
  { yorum_tr: 'SEO ajansının operasyonel olarak ekip arkadaşlarımız gibi çalışması bizim için büyük avantaj sağlamakta.', yorum_en: 'The SEO agency working operationally like our own team members provides us with a great advantage.', isim: 'Ezgi K.', unvan: 'CMO', sektor_tr: 'İstihdam & Kariyer', sektor_en: 'Recruitment & Career' },
  { yorum_tr: 'Sağlık sektöründeki dijital varlığımızı sıfırdan inşa etti. Online randevu sistemimiz hasta memnuniyetini artırdı. Her adımda yanımızda olan güvenilir bir ekip.', yorum_en: 'Built our digital presence in the healthcare sector from scratch. Our online appointment system increased patient satisfaction. A reliable team with us every step of the way.', isim: 'Dr. Ayşe M.', unvan: 'CEO', sektor_tr: 'Sağlık', sektor_en: 'Healthcare' },
  { yorum_tr: 'Organik ve Google Discover trafiğindeki sürdürülebilir büyüme ile sıralamayı 2. sıraya taşıdık. Doğru ekibe iş teslim ettiğinizde trafik artıyor.', yorum_en: 'With sustainable growth in organic and Google Discover traffic, we moved to 2nd position in rankings. When you hand the work to the right team, traffic increases.', isim: 'Emre K.', unvan: 'Chairperson', sektor_tr: 'Haber & Dijital Medya', sektor_en: 'News & Digital Media' },
]

const BLOG_YAZILARI = [
  { no: '01', baslik_tr: 'Teknik SEO\'da 2025 Öncelikleri: Core Web Vitals ve Crawl Optimizasyonu', baslik_en: '2025 Technical SEO Priorities: Core Web Vitals and Crawl Optimization', yazar: 'Fatih Emin Çakıroğlu', sure: '8 dk', slug: 'teknik-seo-2025' },
  { no: '02', baslik_tr: 'GEO Nedir? Google AI Overview\'da Kaynak Olmanın Yolu', baslik_en: 'What is GEO? How to Become a Source in Google AI Overview', yazar: 'Fatih Emin Çakıroğlu', sure: '9 dk', slug: 'geo-nedir' },
  { no: '03', baslik_tr: 'E-E-A-T Sinyalleri ve Topical Authority İnşası', baslik_en: 'E-E-A-T Signals and Building Topical Authority', yazar: 'Fatih Emin Çakıroğlu', sure: '7 dk', slug: 'eeat-topical-authority' },
  { no: '04', baslik_tr: 'LLMs.txt ile Yapay Zekâ Arama Görünürlüğü Nasıl Artırılır?', baslik_en: 'How to Boost AI Search Visibility with LLMs.txt', yazar: 'Fatih Emin Çakıroğlu', sure: '6 dk', slug: 'llms-txt' },
  { no: '05', baslik_tr: 'Backlink Profili Analizi: Toksik Link Tespiti ve Temizleme', baslik_en: 'Backlink Profile Analysis: Toxic Link Detection and Cleanup', yazar: 'Fatih Emin Çakıroğlu', sure: '8 dk', slug: 'backlink-analizi' },
]

export default function Page(props) {
  const router = useRouter()
  const locale = router.locale || 'tr'
  const isEn = locale === 'en'

  const [aktifTab, setAktifTab] = useState('seo')
  const [domain, setDomain] = useState('')
  const [rotIdx, setRotIdx] = useState(0)
  const [fade, setFade] = useState(true)
  const tabs = isEn ? HIZMET_TABS.en : HIZMET_TABS.tr
  const aktif = tabs.find(t => t.id === aktifTab) || tabs[0]

  const ROTATE_ITEMS_TR = [
    'en iyi seo danışmanı türkiye',
    'fatihemincakiroglu.com',
    'geo optimizasyonu nedir',
    'organik trafik nasıl artırılır',
    'teknik seo danışmanlığı',
  ]
  const ROTATE_ITEMS_EN = [
    'best seo consultant turkey',
    'fatihemincakiroglu.com',
    'what is geo optimization',
    'how to increase organic traffic',
    'technical seo consulting',
  ]

  useEffect(() => {
    const items = isEn ? ROTATE_ITEMS_EN : ROTATE_ITEMS_TR
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setRotIdx(i => (i + 1) % items.length)
        setFade(true)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [isEn])

  return (
    <>
      <Head>
        <title>{isEn ? 'Fatih Emin Çakıroğlu | SEO & GEO Consulting' : 'Fatih Emin Çakıroğlu | SEO ve GEO Danışmanlığı'}</title>
        <meta name="description" content={isEn ? "With 8+ years of experience, I've grown the search visibility of 150+ businesses. SEO, GEO and digital marketing consulting." : "8+ yıllık deneyimle 150+ işletmenin organik büyümesini hızlandırdım. SEO, GEO ve dijital pazarlama danışmanlığı."} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en' : 'https://fatihemincakiroglu.com'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com" />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)' }}>

        {/* HERO */}
        <section style={{ background: '#faf9f7', padding: '72px 40px 64px', overflow: 'hidden' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#111', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '28px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }}></span>
                {isEn ? 'SEO EXPERT · GEO · DIGITAL MARKETING' : 'SEO UZMANI · GEO · DİJİTAL PAZARLAMA'}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#111', marginBottom: '8px' }}>
                {isEn ? 'Redesign Your' : 'SEO ve GEO ile'}
              </h1>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#111', marginBottom: '8px', borderBottom: '4px solid var(--orange)', display: 'inline-block', paddingBottom: '4px' }}>
                {isEn ? 'Search Visibility' : 'Arama Görünürlüğünüzü'}
              </h1>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#111', marginBottom: '24px' }}>
                {isEn ? 'with SEO and GEO' : 'Baştan Tasarlayın'}
              </h1>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.75, marginBottom: '32px', maxWidth: '480px' }}>
                {isEn ? "I've grown the Google and AI search visibility of 150+ businesses. Achieving sustainable growth through data-driven SEO & GEO strategy." : '150+ işletmenin Google ve yapay zekâ aramalarındaki görünürlüğünü artırdım. Veriye dayalı SEO & GEO stratejisiyle kalıcı büyüme sağlıyorum.'}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', maxWidth: '460px' }}>
                <input type="text" placeholder={isEn ? 'Enter your domain...' : 'Alan adınızı girin...'} value={domain} onChange={e => setDomain(e.target.value)}
                  style={{ flex: 1, padding: '13px 18px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', background: '#fff' }} />
                <Link href="/iletisim" style={{ padding: '13px 22px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                  {isEn ? 'Analyze' : 'Analiz Et'}
                </Link>
              </div>
              <Link href="/randevu" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#111', color: '#fff', padding: '12px 20px 12px 12px', borderRadius: '40px', textDecoration: 'none', marginBottom: '20px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>→</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>{isEn ? 'Get a Free Quote' : 'Ücretsiz Teklif Al'}</div>
                  <div style={{ fontSize: '11px', color: '#888' }}>{isEn ? 'Your custom strategy within 24 hours' : '24 saat içinde özel SEO ve GEO stratejiniz'}</div>
                </div>
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#aaa' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                {isEn ? 'Share your domain for a free AI audit.' : 'Domain bilgisi alıp ücretsiz AI audit yapalım.'}
              </div>
            </div>

            {/* Sağ — Google Mock */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', right: '20px', background: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '8px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#111' }}>#1</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>{isEn ? 'Top result' : 'Top 1 sonuç'}</div>
                  <div style={{ fontSize: '11px', color: '#aaa' }}>{isEn ? 'Featured in AI Overview' : 'AI Overview\'da öne çıkıyor'}</div>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', border: '1px solid #eee', overflow: 'hidden' }}>
                <div style={{ background: '#f5f5f5', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #eee' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }}></span>
                  <div style={{ flex: 1, background: '#fff', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', color: '#888', marginLeft: '8px' }}>🔒 google.com/search</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ border: '1px solid #ddd', borderRadius: '24px', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <span style={{ fontSize: '14px', color: '#333', flex: 1, transition: 'opacity 0.3s', opacity: fade ? 1 : 0 }}>
                      {(isEn ? ROTATE_ITEMS_EN : ROTATE_ITEMS_TR)[rotIdx]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', fontSize: '13px' }}>
                    {[isEn ? '+ AI Overview' : '+ AI Overview', isEn ? 'All' : 'Tümü', isEn ? 'Images' : 'Görseller', isEn ? 'News' : 'Haberler'].map((t, i) => (
                      <span key={i} style={{ padding: '4px 10px', borderRadius: '20px', background: i === 0 ? '#e8f0fe' : 'transparent', color: i === 0 ? '#1a73e8' : '#555', fontWeight: i === 0 ? 600 : 400, fontSize: '12px' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ background: '#f8f9ff', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #eee' }}>
                      <span style={{ color: '#1a73e8', fontSize: '14px' }}>✦</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a73e8' }}>AI Overview</span>
                      <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#aaa' }}>{isEn ? 'Generating response' : 'Yanıt oluşturuluyor'}</span>
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        {[1,2,3,4].map(i => (
                          <div key={i} style={{ flex: 1, background: '#f5f5f5', borderRadius: '6px', padding: '8px' }}>
                            {i === 1 ? <div><div style={{ fontWeight: 600, color: '#333', marginBottom: '4px', fontSize: '11px' }}>fatihemincakiroglu.com</div><div style={{ background: '#eee', height: '6px', borderRadius: '3px', marginBottom: '3px' }}></div><div style={{ background: '#eee', height: '6px', borderRadius: '3px', width: '70%' }}></div></div> : <><div style={{ background: '#eee', height: '8px', borderRadius: '3px', marginBottom: '4px' }}></div><div style={{ background: '#eee', height: '8px', borderRadius: '3px', width: '80%' }}></div></>}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 600 }}>✓ {isEn ? 'Verified sources' : 'Doğrulanmış kaynaklar'}</span>
                      </div>
                    </div>
                    <div style={{ background: '#f8f7f5', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid #eee' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, background: '#111', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>AI</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>+312% {isEn ? 'visibility' : 'görünürlük'}</span>
                      <span style={{ fontSize: '11px', color: '#aaa' }}>{isEn ? 'last 90 days, GEO + AI SEO' : 'son 90 gün, GEO + AI SEO'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REFERANSLAR */}
        <section style={{ padding: '72px 40px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '28px', height: '1px', background: '#aaa' }}></div>
                <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>{isEn ? 'REFERENCES' : 'REFERANSLAR'}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>
                {isEn ? 'The choice of ' : 'Lider markaların '}<span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{isEn ? 'leading brands.' : 'seçimi.'}</span>
              </h2>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>
                {isEn ? 'Visibility in search and answer ecosystems through SEO, content, AI & GEO; end-to-end consulting for 150+ brands.' : 'SEO, içerik, yapay zekâ ve GEO ile arama ekosisteminde görünürlük; 150+ markaya uçtan uca danışmanlık.'}
              </p>
              <div style={{ display: 'flex', gap: '32px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#111' }}>150+</div>
                  <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>{isEn ? 'Active brands' : 'Aktif marka'}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#111' }}>14</div>
                  <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>{isEn ? 'Sectors' : 'Sektör'}</div>
                </div>
              </div>
            </div>
            <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                {MUSTERILER.map((m, i) => (
                  <div key={i} style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: (i + 1) % 5 !== 0 ? '1px solid #eee' : 'none', borderBottom: i < 5 ? '1px solid #eee' : 'none', fontWeight: 600, fontSize: '12px', color: '#888', textAlign: 'center', letterSpacing: '0.3px' }}>{isEn ? m.en : m.tr}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HİZMETLER */}
        <section style={{ padding: '72px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ede8e0', background: '#fff', fontSize: '12px', color: '#888', fontWeight: 600, marginBottom: '14px' }}>
                  {isEn ? 'SEO IS THE MOST IMPORTANT TRAFFIC CHANNEL' : 'SEO EN ÖNEMLİ TRAFİK KANALI'}
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', lineHeight: 1.2 }}>
                  {isEn ? 'Lead Your Competition with Sustainable SEO' : 'Sürdürülebilir SEO ile Rekabetinizde Lider Olun'}
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--orange)', marginTop: '10px', lineHeight: 1.6, maxWidth: '460px' }}>
                  {isEn ? 'We accelerate your brand\'s digital growth with a holistic approach combining technical SEO, content strategy and AI optimization.' : 'Teknik SEO, içerik stratejisi ve AI optimizasyonunu birleştiren bütünsel yaklaşımımızla markanızın dijital büyümesini hızlandırıyoruz.'}
                </p>
              </div>
              <Link href="/iletisim" style={{ padding: '10px 22px', borderRadius: '20px', border: '1px solid #ddd', color: '#555', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', background: '#fff', whiteSpace: 'nowrap' }}>
                {isEn ? 'Request SEO Analysis' : 'Siteniz için SEO Analizi Talep Et'}
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setAktifTab(t.id)} style={{ padding: '10px 18px', borderRadius: '10px', border: aktifTab === t.id ? '2px solid var(--orange)' : '2px solid #eee', background: '#fff', color: aktifTab === t.id ? 'var(--orange)' : '#555', fontWeight: aktifTab === t.id ? 700 : 500, cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s' }}>
                  <span style={{ fontSize: '16px' }}>{t.ikon}</span> {t.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #eee' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>{aktif.label}</h3>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '28px' }}>{aktif.aciklama}</p>
                <Link href={aktif.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  {aktif.linkLabel}
                </Link>
              </div>
              <div style={{ background: '#faf9f7', borderRadius: '12px', padding: '24px', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, background: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: '4px', letterSpacing: '1px' }}>{isEn ? 'REAL CLIENT DATA' : 'GERÇEK MÜŞTERİ VERİSİ'}</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>{isEn ? '6-Month SEO Transformation' : '6 Aylık SEO Dönüşümü'}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: '#dc2626', fontWeight: 700, marginBottom: '4px' }}>▸ {isEn ? 'BEFORE' : 'ÖNCESİ'}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111' }}>{aktif.grafik.oncesi.aylik}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{isEn ? 'monthly sessions' : 'aylık oturum'}</div>
                  </div>
                  <div style={{ background: '#dcfce7', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginBottom: '4px' }}>▸ {isEn ? 'AFTER' : 'SONRASI'}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111' }}>{aktif.grafik.sonrasi.aylik}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{isEn ? 'monthly sessions' : 'aylık oturum'}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '60px' }}>
                  {['Oct','Nov','Dec','Jul','Aug','Sep'].map((ay, i) => (
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

        {/* REFERANS YORUMLARI */}
        <section style={{ padding: '72px 40px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ede8e0', background: '#faf9f7', fontSize: '12px', color: '#888', fontWeight: 600, marginBottom: '14px' }}>
                {isEn ? 'CLIENT TESTIMONIALS' : 'MÜŞTERİ YORUMLARI'}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
                {isEn ? 'Client Experiences' : 'Müşterilerin Deneyimleri'}
              </h2>
              <p style={{ fontSize: '14px', color: '#888', maxWidth: '500px', lineHeight: 1.6 }}>
                {isEn ? 'Hear directly from teams about the impact we achieved together across many different industries.' : 'Çok farklı sektörlerde, birlikte yürüttüğümüz projelerde elde ettiğimiz etkileri doğrudan ekiplerden dinleyin.'}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#faf9f7', borderRadius: '16px', padding: '32px', border: '1px solid #ede8e0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '40px', color: 'var(--orange)', fontFamily: 'Georgia', lineHeight: 1, marginBottom: '16px' }}>❝</div>
                  <p style={{ fontSize: '16px', color: '#333', lineHeight: 1.75, fontWeight: 500, marginBottom: '28px' }}>{isEn ? REFERANSLAR[0].yorum_en : REFERANSLAR[0].yorum_tr}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>M</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>{REFERANSLAR[0].isim}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>{REFERANSLAR[0].unvan} · {REFERANSLAR[0].sirket}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(232,86,10,0.3)', background: '#fff7ed' }}>{isEn ? REFERANSLAR[0].sektor_en : REFERANSLAR[0].sektor_tr}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[REFERANSLAR[1], REFERANSLAR[3]].map((r, i) => (
                  <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '24px', border: '1px solid #ede8e0', flex: 1 }}>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>{isEn ? r.yorum_en : r.yorum_tr}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e0e0', flexShrink: 0 }}></div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>{r.isim}</div>
                        <div style={{ fontSize: '11px', color: '#aaa' }}>{r.unvan}</div>
                      </div>
                      <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: '#777', padding: '2px 8px', borderRadius: '20px', background: '#f5f5f5', border: '1px solid #eee' }}>{isEn ? r.sektor_en : r.sektor_tr}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[REFERANSLAR[2], REFERANSLAR[4]].map((r, i) => (
                  <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '24px', border: '1px solid #ede8e0', flex: 1 }}>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>{isEn ? r.yorum_en : r.yorum_tr}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e0e0', flexShrink: 0 }}></div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>{r.isim}</div>
                        <div style={{ fontSize: '11px', color: '#aaa' }}>{r.unvan}</div>
                      </div>
                      <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: '#777', padding: '2px 8px', borderRadius: '20px', background: '#f5f5f5', border: '1px solid #eee' }}>{isEn ? r.sektor_en : r.sektor_tr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section style={{ padding: '72px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '48px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '28px', height: '1px', background: '#aaa' }}></div>
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>BLOG</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: '16px' }}>
                  {isEn ? <>The new <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>art of SEO,</span><br />weekly notes.</> : <>SEO&apos;nun yeni <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>sanatı,</span><br />haftalık notlar.</>}
                </h2>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>
                  {isEn ? 'Visibility in SEO, GEO and AI search: current insights and actionable frameworks from source articles.' : 'SEO, GEO ve yapay zekâ aramalarında görünürlük: kaynak makalelerden derlenen güncel içgörüler ve uygulanabilir çerçeveler.'}
                </p>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', background: '#111', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  {isEn ? 'All articles →' : 'Tüm yazılar →'}
                </Link>
              </div>
              <div style={{ background: '#111', borderRadius: '16px', padding: '28px', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', color: '#555' }}>№ 01</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--orange)' }}>{isEn ? 'CONTENT' : 'İÇERİK'}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
                  {isEn ? '2025 Technical SEO Priorities: Core Web Vitals and Crawl Optimization' : 'Teknik SEO\'da 2025 Öncelikleri: Core Web Vitals ve Crawl Optimizasyonu'}
                </h3>
                <div style={{ fontSize: '12px', color: '#555' }}>Fatih Emin Çakıroğlu · ~8 {isEn ? 'min' : 'dk'}</div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', borderBottom: '2px solid var(--orange)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{isEn ? 'RECENTLY ADDED' : 'SON EKLENENLER'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 200px 80px', padding: '12px 24px', borderBottom: '1px solid #f0f0f0', background: '#faf9f7' }}>
                {['', isEn ? 'CONTENT' : 'İÇİNDEKİLER', isEn ? 'AUTHOR' : 'YAZAR', isEn ? 'TIME' : 'SÜRE'].map((h, i) => (
                  <div key={i} style={{ fontSize: '10px', fontWeight: 700, color: '#bbb', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>
              {BLOG_YAZILARI.map((y, i) => (
                <Link key={i} href={`/blog/${y.slug}`} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 200px 80px', padding: '16px 24px', borderBottom: i < BLOG_YAZILARI.length - 1 ? '1px solid #f5f5f5' : 'none', alignItems: 'center', textDecoration: 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '13px', color: '#ccc', fontWeight: 700 }}>{y.no}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#111', lineHeight: 1.4 }}>{isEn ? y.baslik_en : y.baslik_tr}</span>
                  <span style={{ fontSize: '13px', color: '#888' }}>{y.yazar}</span>
                  <span style={{ fontSize: '13px', color: '#aaa' }}>{y.sure}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ARAÇLAR BANDI */}
        <section style={{ padding: '48px 40px', background: '#111' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', background: '#161616', borderRadius: '16px', padding: '32px 36px' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '20px', background: 'rgba(232,86,10,0.15)', border: '1px solid rgba(232,86,10,0.3)', fontSize: '11px', color: 'var(--orange)', fontWeight: 700, marginBottom: '12px' }}>
                ☀ {isEn ? 'WORK ENVIRONMENT' : 'ÇALIŞMA ORTAMI'}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                {isEn ? 'Data and ' : 'Veri, reklam ve '}<span style={{ color: 'var(--orange)' }}>{isEn ? 'AI tools' : 'AI araçları'}</span>
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

        {/* CTA */}
        <section style={{ padding: '96px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0', textAlign: 'center' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>
              {isEn ? <>Free discovery call<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>for your site</span></> : <>Siteniz için ücretsiz<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>keşif görüşmesi</span></>}
            </h2>
            <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
              {isEn ? 'I evaluate your goals and create a custom SEO & GEO roadmap. Completely free.' : 'Hedeflerinizi değerlendirip size özel SEO ve GEO yol haritası oluşturuyorum. Tamamen ücretsiz.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/iletisim" style={{ padding: '15px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
                {isEn ? 'Get in Touch →' : 'İletişime Geç →'}
              </Link>
              <Link href="/randevu" style={{ padding: '15px 32px', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
                {isEn ? 'Book a Call' : 'Randevu Al'}
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
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}
