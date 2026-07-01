import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

// ── Düzeltme: EN linkleri doğru URL'e işaret ediyor ──
const HIZMET_TABS = {
  tr: [
    { id: 'seo', label: 'SEO & GEO', ikon: '🔍', aciklama: 'Temel prensibimiz; Google rehberliğinde web sitenizin en iyi SEO performansını elde etmesidir. Kapsamlı teknik denetim ve doğal büyüme stratejisiyle sürdürülebilir sonuçlar sağlıyorum.', link: '/seo', linkLabel: 'SEO Hizmetleri →', grafik: { oncesi: { aylik: '2.4K', keyword: '38' }, sonrasi: { aylik: '18.2K', keyword: '486', ai: '91%' } } },
    { id: 'icerik', label: 'İçerik Stratejisi', ikon: '✍️', aciklama: 'Arama niyetine oturan, topical authority inşa eden, dönüşüm getiren içerik üretimi. E-E-A-T odaklı içerik mimarisiyle organik görünürlüğünüzü kalıcı olarak artırın.', link: '/icerik', linkLabel: 'İçerik Hizmetleri →', grafik: { oncesi: { aylik: '1.1K', keyword: '22' }, sonrasi: { aylik: '9.8K', keyword: '312', ai: '78%' } } },
    { id: 'geo', label: 'GEO & AI SEO', ikon: '🤖', aciklama: 'ChatGPT, Perplexity, Google AI Overview ve diğer yapay zekâ arama motorlarında kaynak olarak görünün. LLM optimizasyonuyla markanızı geleceğin aramalarına hazırlayın.', link: '/geo', linkLabel: 'GEO Hizmetleri →', grafik: { oncesi: { aylik: '800', keyword: '15' }, sonrasi: { aylik: '7.2K', keyword: '198', ai: '95%' } } },
    { id: 'backlink', label: 'Backlink & PR', ikon: '🔗', aciklama: 'Editoryal link, yayın ilişkileri ve marka sinyalleriyle domain otoritenizi güçlendirin. Sürdürülebilir link profili inşa ederek rekabetçi sıralamalarda kalıcı yer kazanın.', link: '/backlink', linkLabel: 'Backlink Hizmetleri →', grafik: { oncesi: { aylik: '3.2K', keyword: '56' }, sonrasi: { aylik: '14.5K', keyword: '389', ai: '85%' } } },
  ],
  en: [
    { id: 'seo', label: 'SEO & GEO', ikon: '🔍', aciklama: 'My core principle is to achieve the best SEO performance for your website guided by Google. I deliver sustainable results through comprehensive technical audits and natural growth strategies.', link: '/en/seo-consulting', linkLabel: 'SEO Services →', grafik: { oncesi: { aylik: '2.4K', keyword: '38' }, sonrasi: { aylik: '18.2K', keyword: '486', ai: '91%' } } },
    { id: 'icerik', label: 'Content Strategy', ikon: '✍️', aciklama: 'Content production aligned with search intent, building topical authority and driving conversions. Permanently improve your organic visibility with E-E-A-T focused content architecture.', link: '/en/content-strategy', linkLabel: 'Content Services →', grafik: { oncesi: { aylik: '1.1K', keyword: '22' }, sonrasi: { aylik: '9.8K', keyword: '312', ai: '78%' } } },
    { id: 'geo', label: 'GEO & AI SEO', ikon: '🤖', aciklama: 'Get cited as a source in ChatGPT, Perplexity, Google AI Overview and other AI search engines. Prepare your brand for the future of search with LLM optimization.', link: '/en/geo-consulting', linkLabel: 'GEO Services →', grafik: { oncesi: { aylik: '800', keyword: '15' }, sonrasi: { aylik: '7.2K', keyword: '198', ai: '95%' } } },
    { id: 'backlink', label: 'Backlink & PR', ikon: '🔗', aciklama: 'Strengthen your domain authority with editorial links, publishing relationships and brand signals. Build a sustainable link profile and earn lasting positions in competitive rankings.', link: '/en/backlink-digital-pr', linkLabel: 'Backlink Services →', grafik: { oncesi: { aylik: '3.2K', keyword: '56' }, sonrasi: { aylik: '14.5K', keyword: '389', ai: '85%' } } },
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

// ── Düzeltme: sirket alanı eklendi ──
const REFERANSLAR = [
  { yorum_tr: 'İhtiyaçlarımızı anlayan ve bunları güçlü bir anlatımla somutlaştıran yaklaşımdan çok memnunuz. Markamızın ruhunu bu kadar kısa sürede kavrayıp her aşamada yanımızda olması, bu iş birliğini bizim için çok kıymetli kılıyor.', yorum_en: 'We are very satisfied with the approach to understanding our needs and bringing them to life with compelling narratives. Grasping the essence of our brand so quickly and being with us at every stage makes this collaboration extremely valuable for us.', isim: 'Mehmet A.', unvan: 'Sr. SEO Team Lead', sirket: 'Trendyol', sektor_tr: 'E-Ticaret', sektor_en: 'E-Commerce' },
  { yorum_tr: '2023 yılında SEO çalışmalarımızı emanet ettik. Her daim kendi SEO departmanımız gibi çalışmayı başardılar. Bu yolda birlikte yürümesinden çok mutluyuz.', yorum_en: 'We entrusted our SEO operations in 2023. They always worked like our own SEO department. We are very happy to walk this path together.', isim: 'Çiğdem E.', unvan: 'Manager | Marketing | Digital', sirket: 'Papara', sektor_tr: 'Fintech & Kripto', sektor_en: 'Fintech & Crypto' },
  { yorum_tr: 'SEO ajansının operasyonel olarak ekip arkadaşlarımız gibi çalışması bizim için büyük avantaj sağlamakta.', yorum_en: 'The SEO agency working operationally like our own team members provides us with a great advantage.', isim: 'Ezgi K.', unvan: 'CMO', sirket: 'Kariyer.net', sektor_tr: 'İstihdam & Kariyer', sektor_en: 'Recruitment & Career' },
  { yorum_tr: 'Sağlık sektöründeki dijital varlığımızı sıfırdan inşa etti. Online randevu sistemimiz hasta memnuniyetini artırdı. Her adımda yanımızda olan güvenilir bir ekip.', yorum_en: 'Built our digital presence in the healthcare sector from scratch. Our online appointment system increased patient satisfaction. A reliable team with us every step of the way.', isim: 'Dr. Ayşe M.', unvan: 'CEO', sirket: 'MedGroup', sektor_tr: 'Sağlık', sektor_en: 'Healthcare' },
  { yorum_tr: 'Organik ve Google Discover trafiğindeki sürdürülebilir büyüme ile sıralamayı 2. sıraya taşıdık. Doğru ekibe iş teslim ettiğinizde trafik artıyor.', yorum_en: 'With sustainable growth in organic and Google Discover traffic, we moved to 2nd position in rankings. When you hand the work to the right team, traffic increases.', isim: 'Emre K.', unvan: 'Chairperson', sirket: 'Medyascope', sektor_tr: 'Haber & Dijital Medya', sektor_en: 'News & Digital Media' },
]

const BLOG_YAZILARI = [
  { no: '01', baslik_tr: 'Teknik SEO\'da 2025 Öncelikleri: Core Web Vitals ve Crawl Optimizasyonu', baslik_en: '2025 Technical SEO Priorities: Core Web Vitals and Crawl Optimization', yazar: 'Fatih Emin Çakıroğlu', sure: '8 dk', slug: 'teknik-seo-2025' },
  { no: '02', baslik_tr: 'GEO Nedir? Google AI Overview\'da Kaynak Olmanın Yolu', baslik_en: 'What is GEO? How to Become a Source in Google AI Overview', yazar: 'Fatih Emin Çakıroğlu', sure: '9 dk', slug: 'geo-nedir' },
  { no: '03', baslik_tr: 'E-E-A-T Sinyalleri ve Topical Authority İnşası', baslik_en: 'E-E-A-T Signals and Building Topical Authority', yazar: 'Fatih Emin Çakıroğlu', sure: '7 dk', slug: 'eeat-topical-authority' },
  { no: '04', baslik_tr: 'LLMs.txt ile Yapay Zekâ Arama Görünürlüğü Nasıl Artırılır?', baslik_en: 'How to Boost AI Search Visibility with LLMs.txt', yazar: 'Fatih Emin Çakıroğlu', sure: '6 dk', slug: 'llms-txt' },
  { no: '05', baslik_tr: 'Backlink Profili Analizi: Toksik Link Tespiti ve Temizleme', baslik_en: 'Backlink Profile Analysis: Toxic Link Detection and Cleanup', yazar: 'Fatih Emin Çakıroğlu', sure: '8 dk', slug: 'backlink-analizi' },
]

const VAKALAR = [
  {
    no: '01',
    sektor_tr: 'E-Ticaret', sektor_en: 'E-Commerce',
    baslik_tr: 'Organik trafiği 7.6x\'e çıkardık', baslik_en: 'Scaled organic traffic 7.6x',
    aciklama_tr: '6 ay içinde aylık 2.4K → 18.2K oturum. Teknik SEO + içerik mimarisi.',
    aciklama_en: '2.4K → 18.2K monthly sessions in 6 months. Technical SEO + content architecture.',
    metrik: '+660%', metrik_label_tr: 'Organik büyüme', metrik_label_en: 'Organic growth',
    renk: '#e8560a', bg: '#fff7ed',
    ikon: '🛍️',
  },
  {
    no: '02',
    sektor_tr: 'Fintech & Kripto', sektor_en: 'Fintech & Crypto',
    baslik_tr: 'AI Overview\'da #1 kaynak', baslik_en: '#1 source in AI Overview',
    aciklama_tr: 'GEO optimizasyonuyla ChatGPT ve Perplexity\'de düzenli alıntı. Marka bilinirliği 3x arttı.',
    aciklama_en: 'Regular citations in ChatGPT and Perplexity via GEO optimization. Brand awareness tripled.',
    metrik: '95%', metrik_label_tr: 'AI görünürlük skoru', metrik_label_en: 'AI visibility score',
    renk: '#7c3aed', bg: '#f5f3ff',
    ikon: '🤖',
  },
  {
    no: '03',
    sektor_tr: 'Haber & Dijital Medya', sektor_en: 'News & Digital Media',
    baslik_tr: 'Google Discover\'da 2. sıra', baslik_en: '2nd position on Google Discover',
    aciklama_tr: 'İçerik stratejisi ve E-E-A-T güçlendirmesiyle Google Discover trafiği 4 ayda 5x arttı.',
    aciklama_en: 'Google Discover traffic grew 5x in 4 months via content strategy and E-E-A-T signals.',
    metrik: '+420%', metrik_label_tr: 'Discover trafiği', metrik_label_en: 'Discover traffic',
    renk: '#0891b2', bg: '#ecfeff',
    ikon: '📰',
  },
]

const SUREC_ADIMLARI = {
  tr: [
    { no: '01', baslik: 'Derin Analiz', aciklama: 'Site denetimi, rakip analizi, keyword fırsatları. Neyin işe yarayıp yaramadığını veriyle ortaya koyuyorum.', ikon: '🔬' },
    { no: '02', baslik: 'Özel Strateji', aciklama: 'Sektörünüze, hedef kitlenize ve bütçenize özel SEO & GEO yol haritası. Genel şablonlar yok.', ikon: '🗺️' },
    { no: '03', baslik: 'Uygulama', aciklama: 'Teknik düzeltmeler, içerik üretimi, link inşası — hepsini koordineli yürütüyorum.', ikon: '⚙️' },
    { no: '04', baslik: 'Ölçüm & Büyüme', aciklama: 'Aylık raporlar, GSC + GA4 entegrasyonu, sürekli optimizasyon. Sürpriz yok, şeffaf iletişim.', ikon: '📈' },
  ],
  en: [
    { no: '01', baslik: 'Deep Analysis', aciklama: 'Site audit, competitor analysis, keyword opportunities. I reveal what works and what doesn\'t with data.', ikon: '🔬' },
    { no: '02', baslik: 'Custom Strategy', aciklama: 'An SEO & GEO roadmap tailored to your sector, target audience, and budget. No generic templates.', ikon: '🗺️' },
    { no: '03', baslik: 'Execution', aciklama: 'Technical fixes, content production, link building — all coordinated by me.', ikon: '⚙️' },
    { no: '04', baslik: 'Measure & Grow', aciklama: 'Monthly reports, GSC + GA4 integration, continuous optimization. No surprises, transparent communication.', ikon: '📈' },
  ],
}

const SEKTORLER = {
  tr: [
    { id: 'eticaret', label: 'E-Ticaret', ikon: '🛍️', link: '/vakalar', ipucu: 'Ürün sayfası SEO, kategori mimarisi, Google Shopping entegrasyonu' },
    { id: 'fintech', label: 'Fintech & Kripto', ikon: '💳', link: '/vakalar', ipucu: 'Otorite inşası, YMYL içerik stratejisi, GEO optimizasyonu' },
    { id: 'medya', label: 'Haber & Medya', ikon: '📰', link: '/vakalar', ipucu: 'Google Discover, haber SEO, E-E-A-T sinyalleri' },
    { id: 'gayrimenkul', label: 'Gayrimenkul', ikon: '🏠', link: '/vakalar', ipucu: 'Lokal SEO, uzun kuyruk keyword stratejisi, içerik mimarisi' },
    { id: 'turizm', label: 'Seyahat & Turizm', ikon: '✈️', link: '/vakalar', ipucu: 'Sezonsal SEO, çok dilli içerik, GEO görünürlük' },
    { id: 'diger', label: 'Diğer Sektörler', ikon: '🔍', link: '/iletisim', ipucu: 'Sektörünüze özel strateji için iletişime geçin' },
  ],
  en: [
    { id: 'eticaret', label: 'E-Commerce', ikon: '🛍️', link: '/en/case-studies', ipucu: 'Product page SEO, category architecture, Google Shopping integration' },
    { id: 'fintech', label: 'Fintech & Crypto', ikon: '💳', link: '/en/case-studies', ipucu: 'Authority building, YMYL content strategy, GEO optimization' },
    { id: 'medya', label: 'News & Media', ikon: '📰', link: '/en/case-studies', ipucu: 'Google Discover, news SEO, E-E-A-T signals' },
    { id: 'gayrimenkul', label: 'Real Estate', ikon: '🏠', link: '/en/case-studies', ipucu: 'Local SEO, long-tail keyword strategy, content architecture' },
    { id: 'turizm', label: 'Travel & Tourism', ikon: '✈️', link: '/en/case-studies', ipucu: 'Seasonal SEO, multilingual content, GEO visibility' },
    { id: 'diger', label: 'Other Sectors', ikon: '🔍', link: '/en/contact', ipucu: 'Contact us for a strategy tailored to your sector' },
  ],
}

const SAYISAL_SONUCLAR = {
  tr: [
    { sayi: 150, suffix: '+', label: 'Marka', alt: 'danışmanlık verilen', ikon: '🏢', renk: '#e8560a' },
    { sayi: 312, suffix: '%', label: 'Ortalama büyüme', alt: 'organik trafik artışı', ikon: '📈', renk: '#7c3aed' },
    { sayi: 14, suffix: '', label: 'Sektör', alt: 'farklı sektör deneyimi', ikon: '🌐', renk: '#0891b2' },
    { sayi: 8, suffix: '+', label: 'Yıl', alt: 'SEO & dijital deneyim', ikon: '⚡', renk: '#16a34a' },
  ],
  en: [
    { sayi: 150, suffix: '+', label: 'Brands', alt: 'consulting experience', ikon: '🏢', renk: '#e8560a' },
    { sayi: 312, suffix: '%', label: 'Avg. growth', alt: 'organic traffic increase', ikon: '📈', renk: '#7c3aed' },
    { sayi: 14, suffix: '', label: 'Sectors', alt: 'cross-industry experience', ikon: '🌐', renk: '#0891b2' },
    { sayi: 8, suffix: '+', label: 'Years', alt: 'SEO & digital experience', ikon: '⚡', renk: '#16a34a' },
  ],
}

const FAQ_SORULAR = {
  tr: [
    { soru: 'Kaç ayda sonuç alırım?', cevap: 'Teknik düzeltmeler ve hızlı kazanımlar genellikle 4–8 haftada görünür. Organik trafik büyümesi ise rekabete göre değişmekle birlikte 3–6 ayda belirginleşir. Gerçekçi beklentiler ve net kilometre taşları için ilk görüşmede sizi bilgilendiriyorum.' },
    { soru: 'Fiyatlandırma nasıl?', cevap: 'Proje kapsamına göre aylık retainer veya proje bazlı modelle çalışıyorum. Detaylı fiyatlandırma için /fiyatlandirma sayfasını ziyaret edebilir ya da doğrudan iletişime geçebilirsiniz.' },
    { soru: 'GEO ve SEO arasındaki fark nedir?', cevap: 'SEO, Google gibi geleneksel arama motorlarında görünürlüğü artırmayı hedefler. GEO (Generative Engine Optimization) ise ChatGPT, Perplexity ve Google AI Overview gibi yapay zekâ tabanlı arama sistemlerinde kaynak olarak görünmenizi sağlar. İkisi birbirini tamamlar.' },
    { soru: 'Tek bir hizmet mi almak zorundayım?', cevap: 'Hayır. İhtiyacınıza göre yalnızca teknik SEO, yalnızca içerik stratejisi ya da tüm hizmetleri kapsayan bütünsel bir paket alabilirsiniz. İlk görüşmede ihtiyacınızı birlikte değerlendiriyoruz.' },
    { soru: 'Ajanslarla mı, bağımsız danışmanla mı çalışmalıyım?', cevap: 'Bağımsız danışman olarak doğrudan sizinle çalışıyorum — ara katmanlar yok. Bu sayede hızlı karar alınıyor, iletişim şeffaf kalıyor ve bütçeniz gereksiz genel giderlere gitmeden işe yatırılıyor.' },
    { soru: 'Raporlama nasıl ilerliyor?', cevap: 'Her ay GA4 + GSC verilerine dayalı detaylı rapor paylaşıyorum. Trafik, sıralama hareketleri, dönüşüm verileri ve bir sonraki ayın öncelikleri hepsini şeffaf biçimde sunuyorum.' },
  ],
  en: [
    { soru: 'How soon will I see results?', cevap: 'Technical fixes and quick wins are typically visible within 4–8 weeks. Organic traffic growth becomes more significant in 3–6 months, depending on competition. I set realistic expectations and clear milestones in our first meeting.' },
    { soru: 'How does pricing work?', cevap: 'I work on a monthly retainer or project-based model depending on scope. Visit the /pricing page or get in touch directly for detailed pricing.' },
    { soru: 'What is the difference between GEO and SEO?', cevap: 'SEO aims to improve visibility in traditional search engines like Google. GEO (Generative Engine Optimization) makes you appear as a source in AI-based search systems like ChatGPT, Perplexity and Google AI Overview. The two complement each other.' },
    { soru: 'Do I have to buy a single service?', cevap: 'No. Depending on your needs, you can choose only technical SEO, only content strategy, or a comprehensive package covering all services. We assess your needs together in the first meeting.' },
    { soru: 'Agency vs. independent consultant?', cevap: 'As an independent consultant, I work directly with you — no intermediary layers. This means faster decisions, transparent communication, and your budget goes into the work rather than overhead.' },
    { soru: 'How does reporting work?', cevap: 'I share a detailed report based on GA4 + GSC data every month. Traffic, ranking movements, conversion data, and next month\'s priorities — all presented transparently.' },
  ],
}

// ── Animasyonlu sayaç hook'u ──
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

export default function Page(props) {
  const router = useRouter()
  // ── Düzeltme: isEn pathname'e göre belirleniyor ──
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')

  const [aktifTab, setAktifTab] = useState('seo')
  const [domain, setDomain] = useState('')
  const [rotIdx, setRotIdx] = useState(0)
  const [fade, setFade] = useState(true)
  const [aktifSektor, setAktifSektor] = useState(null)
  const [acikFaq, setAcikFaq] = useState(null)
  const [sayacBasladi, setSayacBasladi] = useState(false)
  const sayacRef = useRef(null)

  const tabs = isEn ? HIZMET_TABS.en : HIZMET_TABS.tr
  const aktif = tabs.find(t => t.id === aktifTab) || tabs[0]
  const surec = isEn ? SUREC_ADIMLARI.en : SUREC_ADIMLARI.tr
  const sektorler = isEn ? SEKTORLER.en : SEKTORLER.tr
  const sayilar = isEn ? SAYISAL_SONUCLAR.en : SAYISAL_SONUCLAR.tr
  const faqlar = isEn ? FAQ_SORULAR.en : FAQ_SORULAR.tr

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

  // Sayaç bölümü görünür olduğunda tetikle
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSayacBasladi(true) },
      { threshold: 0.3 }
    )
    if (sayacRef.current) observer.observe(sayacRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>{isEn ? 'Fatih Emin Çakıroğlu | SEO & GEO Consultant' : 'Fatih Emin Çakıroğlu | SEO ve GEO Danışmanlığı'}</title>
        <meta name="description" content={isEn ? "8+ years of experience growing organic traffic for 150+ businesses. SEO, GEO and digital marketing consulting to boost visibility on Google and AI search." : "8+ yıllık deneyimle 150+ işletmenin organik trafiğini büyüttüm. SEO, GEO ve dijital pazarlama danışmanlığıyla Google ve AI aramalarında görünürlük kazanın."} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en' : 'https://fatihemincakiroglu.com'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com" />
        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqlar.map(f => ({
            "@type": "Question",
            "name": f.soru,
            "acceptedAnswer": { "@type": "Answer", "text": f.cevap }
          }))
        })}} />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)' }}>

        {/* ── HERO ── */}
        <section style={{ background: '#faf9f7', padding: '72px 40px 64px', overflow: 'hidden' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#111', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '28px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
                {isEn ? 'SEO EXPERT · GEO · DIGITAL MARKETING' : 'SEO UZMANI · GEO · DİJİTAL PAZARLAMA'}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#111', marginBottom: '24px' }}>
                <span style={{ display: 'block', marginBottom: '8px' }}>{isEn ? 'Redesign Your' : 'SEO ve GEO ile'}</span>
                <span style={{ display: 'inline-block', marginBottom: '8px', borderBottom: '4px solid var(--orange)', paddingBottom: '4px' }}>{isEn ? 'Search Visibility' : 'Arama Görünürlüğünüzü'}</span>
                <span style={{ display: 'block' }}>{isEn ? 'with SEO and GEO' : 'Baştan Tasarlayın'}</span>
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

        {/* ── SAYISAL SONUÇLAR (animasyonlu counter) ── */}
        <section ref={sayacRef} style={{ padding: '56px 40px', background: '#111', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#222', borderRadius: '16px', overflow: 'hidden' }}>
              {sayilar.map((s, i) => (
                <CounterCard key={i} item={s} started={sayacBasladi} isEn={isEn} />
              ))}
            </div>
          </div>
        </section>

        {/* ── REFERANSLAR (müşteri grid) ── */}
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

        {/* ── HİZMETLER ── */}
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
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '10px 22px', borderRadius: '20px', border: '1px solid #ddd', color: '#555', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', background: '#fff', whiteSpace: 'nowrap' }}>
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
                      <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: i < 3 ? '#fca5a5' : '#86efac', height: `${i < 3 ? 20 + i * 8 : 35 + (i-3) * 10}px`, transition: 'height 0.6s ease' }}></div>
                      <span style={{ fontSize: '9px', color: '#aaa' }}>{ay}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEO, GEO ve AI GÖRÜNÜRLÜĞÜ REHBERİ ── */}
        <section style={{ padding: '72px 40px', background: '#0a0a0a' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

            {/* Üst kart: badge, başlık, alt başlık, etiketler, CTA */}
            <div style={{ background: 'linear-gradient(135deg, #141414 0%, #1a1410 100%)', borderRadius: '24px', border: '1px solid #262626', padding: '48px 44px', marginBottom: '40px', textAlign: 'center' }}>
              <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '2px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(232,86,10,0.35)', background: 'rgba(232,86,10,0.1)', marginBottom: '20px' }}>
                {isEn ? 'GUIDE' : 'REHBER'}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '14px' }}>
                {isEn ? 'Sustainable Growth with SEO, GEO and AI Visibility' : 'SEO, GEO ve AI Görünürlüğü ile Sürdürülebilir Büyüme'}
              </h2>
              <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '620px', margin: '0 auto 24px', lineHeight: 1.7 }}>
                {isEn ? "Organic rankings, AI answer engines and LLM citation — strategy, technical execution and measurement, managed under one roof by a single dedicated consultant." : 'Organik sıralamalar, yapay zekâ yanıt motorları ve LLM kaynaklığı — strateji, teknik uygulama ve ölçümleme, tek bir uzman danışman çatısı altında yönetilir.'}
              </p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
                {['SEO', 'GEO', isEn ? 'AI SEO' : 'AI SEO'].map(tag => (
                  <span key={tag} style={{ fontSize: '12px', fontWeight: 700, color: '#ccc', padding: '6px 16px', borderRadius: '20px', border: '1px solid #333', background: '#171717' }}>{tag}</span>
                ))}
              </div>
              <Link href={isEn ? '/en/book-a-call' : '/randevu'} style={{ display: 'inline-block', padding: '13px 30px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                {isEn ? 'Get a Free Consultation →' : 'Ücretsiz Görüşme Al →'}
              </Link>
            </div>

            {/* İçerik: sol TOC + sağ içerik */}
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }}>
              {/* Sol TOC */}
              <div className="desktop-nav" style={{ background: '#141414', borderRadius: '16px', border: '1px solid #262626', padding: '20px', position: 'sticky', top: '100px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#777', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
                  {isEn ? 'CONTENTS' : 'İÇİNDEKİLER'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[
                    { id: 'seo-geo-birlikte', tr: 'SEO ve GEO Neden Birlikte?', en: 'Why SEO and GEO Together?' },
                    { id: 'seo-gorunurluk', tr: 'SEO ile Görünürlük Artışı', en: 'Growing Visibility with SEO' },
                    { id: 'geo-ai-kazanim', tr: 'GEO ve AI Kazanımları', en: 'What GEO & AI Bring You' },
                    { id: 'neden-bagimsiz', tr: 'Neden Bağımsız Danışman?', en: 'Why an Independent Consultant?' },
                  ].map(item => (
                    <a key={item.id} href={`#${item.id}`} style={{ fontSize: '13px', color: '#aaa', padding: '9px 12px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#1e1e1e'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#aaa' }}>
                      {isEn ? item.en : item.tr}
                    </a>
                  ))}
                </div>
              </div>

              {/* Sağ içerik */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '40px 44px', border: '1px solid #262626' }}>

                <h3 id="seo-geo-birlikte" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '14px', scrollMarginTop: '100px' }}>
                  {isEn ? 'Why SEO and GEO Should Be Handled Together' : 'SEO ve GEO Neden Birlikte Ele Alınmalı?'}
                </h3>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '16px' }}>
                  {isEn
                    ? <>Classic SEO aims to rank in search engine results pages, while <strong>GEO (Generative Engine Optimization)</strong> aims to get your content cited as a source inside AI-generated answers. These two disciplines aren't alternatives — they're complementary. For a brand to appear both in Google's classic results and in the source list of answers from ChatGPT, Perplexity or Google AI Overview, SEO and GEO work needs to move together.</>
                    : <>Klasik SEO, arama motoru sonuç sayfalarında organik sıralama elde etmeyi hedeflerken; <strong>GEO (Generative Engine Optimization)</strong>, içeriklerin yapay zekâ tarafından üretilen yanıtlarda kaynak olarak alıntılanmasını amaçlar. Bu iki disiplin birbirinin alternatifi değil, tamamlayıcısıdır. Bir markanın hem Google'ın klasik sonuçlarında hem de ChatGPT, Perplexity veya Google AI Overview'ın yanıt kaynaklarında görünmesi için SEO ve GEO çalışmalarının eşgüdümlü yürütülmesi gerekir.</>}
                </p>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '32px' }}>
                  {isEn
                    ? <>My approach rests on three layers: <strong>technical foundation</strong> (site speed, crawlability, structured data, llms.txt, Core Web Vitals), <strong>content architecture</strong> (E-E-A-T signals, topical depth, citable Q&A blocks) and <strong>entity authority</strong> (Knowledge Graph consistency, digital PR mentions, community visibility).</>
                    : <>Metodolojim üç katman üzerine kuruludur: <strong>teknik altyapı</strong> (site hızı, taranabilirlik, structured data, llms.txt dosyası, Core Web Vitals optimizasyonu), <strong>içerik mimarisi</strong> (E-E-A-T sinyalleri, konu bütünlüğü, soru-cevap formatında alıntılanabilir bilgi blokları) ve <strong>entity otoritesi</strong> (Knowledge Graph tutarlılığı, dijital PR bahsetmeleri, topluluk görünürlüğü).</>}
                </p>

                <h3 id="seo-gorunurluk" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '14px', scrollMarginTop: '100px' }}>
                  {isEn ? 'How SEO Grows Your Search Visibility' : 'SEO ile Arama Görünürlüğü Nasıl Artırılır?'}
                </h3>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>
                  {isEn
                    ? 'Organic traffic alone is just a number. Qualified visibility means results that match real search intent — visitors who convert, not just visit. Here is how that visibility is built in practice:'
                    : 'Organik trafik tek başına sadece bir sayıdır. Nitelikli görünürlük, arama niyetiyle örtüşen sonuçlar demektir — sadece ziyaret eden değil, dönüşen bir kitle. Bu görünürlük pratikte şu şekilde inşa edilir:'}
                </p>

                <div style={{ borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden', marginBottom: '32px' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
                      <thead>
                        <tr style={{ background: '#1a1612' }}>
                          {(isEn ? ['Focus Area', 'What I Do', 'Impact for Your Brand'] : ['Uygulama Alanı', 'Yapılan Çalışma', 'Markaya Katkısı']).map((s, i) => (
                            <th key={i} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: i === 0 ? '#aaa' : 'var(--orange)', letterSpacing: '1px', textTransform: 'uppercase' }}>{s}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(isEn ? [
                          ['Technical Foundation', 'Site speed audit, crawlability fixes and Core Web Vitals optimization.', 'A faster site that search bots can crawl and index without friction.'],
                          ['Content Architecture', 'Content planning built on search intent and topical authority.', "Content that matches what users are actually looking for."],
                          ['Competitor & Market Analysis', 'Mapping gaps and opportunities specific to your sector.', 'Keywords with a faster, more realistic path to page one.'],
                          ['User Experience', 'Mobile responsiveness, page speed and simplified conversion flow.', 'Lower bounce rate and more qualified leads from the same traffic.'],
                          ['Measurement & Reporting', 'Monthly performance tracking and strategy adjustments.', 'A transparent process where you can see the return on your investment.'],
                        ] : [
                          ['Teknik Altyapı', 'Site hızı denetimi, tarama hatalarının giderilmesi ve Core Web Vitals optimizasyonu.', 'Botların sorunsuz tarayıp indeksleyebildiği, hızlı bir site.'],
                          ['İçerik Mimarisi', 'Arama niyetine ve topical authority\'ye dayalı içerik planlaması.', 'Kullanıcının gerçekte aradığıyla örtüşen içerik.'],
                          ['Rakip & Pazar Analizi', 'Sektörünüze özgü boşlukların ve fırsatların haritalanması.', 'İlk sayfaya daha hızlı ve gerçekçi bir yol kat eden anahtar kelimeler.'],
                          ['Kullanıcı Deneyimi', 'Mobil uyumluluk, sayfa hızı ve sadeleştirilmiş dönüşüm akışı.', 'Daha düşük hemen çıkma oranı, aynı trafikten daha fazla nitelikli talep.'],
                          ['Ölçümleme & Raporlama', 'Aylık performans takibi ve strateji güncellemeleri.', 'Yatırımınızın karşılığını şeffaf biçimde gördüğünüz bir süreç.'],
                        ]).map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#faf9f7' }}>
                            {row.map((cell, j) => (
                              <td key={j} style={{ padding: '13px 18px', fontSize: '13.5px', color: j === 0 ? '#111' : '#555', fontWeight: j === 0 ? 700 : 400, lineHeight: 1.5 }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 id="geo-ai-kazanim" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '14px', scrollMarginTop: '100px' }}>
                  {isEn ? 'What GEO and AI Visibility Bring to Your Brand' : 'GEO ve AI Görünürlüğü Markanıza Ne Kazandırır?'}
                </h3>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '14px' }}>
                  {isEn
                    ? 'Search habits are shifting from typed queries to conversational, answer-first interactions. GEO work makes your brand crawlable, understandable and citable by AI systems:'
                    : 'Arama alışkanlıkları, yazılı sorgulardan sohbet temelli ve doğrudan yanıt odaklı etkileşime kayıyor. GEO çalışması, markanızı yapay zekâ sistemleri tarafından taranabilir, anlaşılabilir ve alıntılanabilir hale getirir:'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                  {(isEn ? [
                    'Being cited as a trusted source inside AI Overview, ChatGPT or Perplexity answers builds authority that clicks alone cannot buy.',
                    "Classic ranking factors lean on link authority; GEO leans on semantic depth, citability and how directly your content answers a question.",
                    'A page that ranks lower in classic search can still be the first source an AI system cites — if its answer is the clearest one available.',
                    'Brands that establish themselves early in AI-driven discovery gain a durable edge as algorithms keep evolving.',
                  ] : [
                    "AI Overview, ChatGPT veya Perplexity yanıtlarında güvenilir bir kaynak olarak gösterilmek, tek başına tıklamayla satın alınamayacak bir otorite kazandırır.",
                    'Klasik sıralama faktörleri link otoritesine yaslanırken; GEO, anlamsal derinliğe, alıntılanabilirliğe ve içeriğin soruyu ne kadar doğrudan yanıtladığına yaslanır.',
                    'Klasik aramada gerilerde olan bir sayfa, en açık yanıtı verdiği için yapay zekâ tarafından ilk sırada kaynak gösterilebilir.',
                    'Yapay zekâ destekli keşif sürecinde erken konumlanan markalar, algoritmalar geliştikçe kalıcı bir avantaj elde eder.',
                  ]).map((txt, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: '#444', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 800, flexShrink: 0 }}>→</span>
                      <span>{txt}</span>
                    </div>
                  ))}
                </div>

                <h3 id="neden-bagimsiz" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '14px', scrollMarginTop: '100px' }}>
                  {isEn ? 'Why Work with an Independent Consultant?' : 'Neden Bağımsız Bir SEO Danışmanı?'}
                </h3>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '28px' }}>
                  {isEn
                    ? "With 8+ years of hands-on experience across 150+ brands in 14 sectors, every roadmap I build is tailored to that specific business — not a templated package. There's no account handoff to a junior team member: the person who audits your site is the same person who reports the results to you, every month."
                    : "8+ yıllık deneyimle 14 sektörde 150+ markaya danışmanlık verdim; hazırladığım her yol haritası o markaya özeldir, standart bir pakete sıkıştırılmaz. Hesabınız bir junior ekip üyesine devredilmez: sitenizi denetleyen kişi ile size her ay sonucu raporlayan kişi aynı kişidir."}
                </p>

                <div style={{ background: '#faf9f7', borderRadius: '14px', padding: '28px 32px', border: '1px solid #ede8e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '4px' }}>
                      {isEn ? 'Want a roadmap tailored to your brand?' : 'Markanıza özel bir yol haritası ister misiniz?'}
                    </div>
                    <div style={{ fontSize: '14px', color: '#777' }}>
                      {isEn ? 'Book a free discovery call — no obligation.' : 'Ücretsiz keşif görüşmesi için hemen randevu alın.'}
                    </div>
                  </div>
                  <Link href={isEn ? '/en/book-a-call' : '/randevu'} style={{ padding: '12px 26px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                    {isEn ? 'Book a Free Call →' : 'Ücretsiz Görüşme →'}
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── NEDEN BEN? (Kişisel marka) ── */}
        <section style={{ padding: '72px 40px', background: '#111', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '20px', background: 'rgba(232,86,10,0.15)', border: '1px solid rgba(232,86,10,0.3)', fontSize: '11px', color: 'var(--orange)', fontWeight: 700, marginBottom: '20px' }}>
                ✦ {isEn ? 'WHY ME?' : 'NEDEN BEN?'}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '20px' }}>
                {isEn ? <>5 years teacher,<br /><span style={{ color: 'var(--orange)' }}>5 years SEO expert.</span></> : <>5 yıl öğretmen,<br /><span style={{ color: 'var(--orange)' }}>5 yıl SEO uzmanı.</span></>}
              </h2>
              <p style={{ fontSize: '15px', color: '#aaa', lineHeight: 1.8, marginBottom: '20px' }}>
                {isEn
                  ? "I taught IB curriculum for 5 years. Teaching isn't about transferring knowledge — it's about making someone understand. That perspective shapes everything I do in SEO: clear strategies, explainable results, no jargon."
                  : '5 yıl IB müfredatıyla öğretmenlik yaptım. Öğretmek, bilgiyi aktarmak değil — karşındakinin anlamasını sağlamaktır. Bu bakış açısı SEO\'daki her şeyimi şekillendiriyor: net stratejiler, açıklanabilir sonuçlar, jargon yok.'}
              </p>
              <p style={{ fontSize: '15px', color: '#aaa', lineHeight: 1.8, marginBottom: '32px' }}>
                {isEn
                  ? '2018\'den beri 150+ markayla, 14 farklı sektörde büyüme hikâyeleri yazdım. Bağımsız danışman olarak doğrudan sizinle çalışıyorum.'
                  : '2018\'den beri 150+ markayla, 14 farklı sektörde büyüme hikâyeleri yazdım. Bağımsız danışman olarak doğrudan sizinle çalışıyorum — ara katmanlar yok.'}
              </p>
              <Link href={isEn ? '/en/about' : '/hakkimda'} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                {isEn ? 'Full Story →' : 'Hikâyemi Oku →'}
              </Link>
            </div>
            {/* Zaman çizelgesi */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { yil: '2013–2018', baslik: isEn ? 'IB Teacher' : 'IB Öğretmeni', aciklama: isEn ? 'Marmara University Computer Education graduate. 5 years teaching critical thinking and structured problem-solving.' : 'Marmara Üniversitesi Bilgisayar Eğitimi mezunu. 5 yıl eleştirel düşünme ve yapılandırılmış problem çözme öğrettim.', ikon: '🎓', renk: '#7c3aed' },
                { yil: '2018–2022', baslik: isEn ? 'SEO Specialist' : 'SEO Uzmanı', aciklama: isEn ? 'Entered the digital world. Worked with agencies and in-house teams, grew across 14 sectors.' : 'Dijital dünyaya girdim. Ajans ve in-house ekiplerde çalışarak 14 sektörde büyüdüm.', ikon: '🔍', renk: '#0891b2' },
                { yil: '2022–', baslik: isEn ? 'Independent Consultant' : 'Bağımsız Danışman', aciklama: isEn ? '150+ brands, direct collaboration, sustainable growth. Both SEO and GEO.' : '150+ marka, doğrudan iş birliği, sürdürülebilir büyüme. Hem SEO hem GEO.', ikon: '🚀', renk: '#e8560a' },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: item.renk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, zIndex: 1 }}>{item.ikon}</div>
                    {i < arr.length - 1 && <div style={{ width: '2px', flex: 1, background: '#2a2a2a', margin: '4px 0', minHeight: '40px' }}></div>}
                  </div>
                  <div style={{ paddingBottom: i < arr.length - 1 ? '28px' : '0', paddingTop: '8px' }}>
                    <div style={{ fontSize: '11px', color: item.renk, fontWeight: 700, letterSpacing: '1px', marginBottom: '4px' }}>{item.yil}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{item.baslik}</div>
                    <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>{item.aciklama}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MEDYADA / BAHSEDILEN YERLER ── */}
        <section style={{ padding: '40px 40px', background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{ fontSize: '11px', color: '#555', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>{isEn ? 'FEATURED IN & TOOLS USED' : 'MEDYADA & KULLANILAN ARAÇLAR'}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
              {[
                { label: 'Search Engine Land', tip: 'media' },
                { label: 'Ahrefs Blog', tip: 'media' },
                { label: 'SEMrush Academy', tip: 'media' },
                { label: 'Google Partner', tip: 'partner' },
                { label: 'Screaming Frog', tip: 'tool' },
                { label: 'SEOmonitor', tip: 'tool' },
                { label: 'ChatGPT', tip: 'ai' },
                { label: 'Perplexity', tip: 'ai' },
                { label: 'Claude', tip: 'ai' },
                { label: 'Search Console', tip: 'tool' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: '1px solid #222',
                  background: '#141414',
                  color: item.tip === 'partner' ? 'var(--orange)' : item.tip === 'ai' ? '#7c3aed' : item.tip === 'media' ? '#0891b2' : '#666',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  {item.tip === 'partner' && <span>★</span>}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VAKA ÇALIŞMALARI ÖNİZLEME ── */}
        <section style={{ padding: '72px 40px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ede8e0', background: '#faf9f7', fontSize: '12px', color: '#888', fontWeight: 600, marginBottom: '14px' }}>
                  {isEn ? 'CASE STUDIES' : 'VAKA ÇALIŞMALARI'}
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#111', lineHeight: 1.2 }}>
                  {isEn ? 'Real results,' : 'Gerçek sonuçlar,'}{' '}
                  <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{isEn ? 'real brands.' : 'gerçek markalar.'}</span>
                </h2>
              </div>
              <Link href={isEn ? '/en/case-studies' : '/vakalar'} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '8px', border: '1px solid #ddd', color: '#555', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', background: '#fff' }}>
                {isEn ? 'All case studies →' : 'Tüm vakalar →'}
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {VAKALAR.map((v, i) => (
                <Link key={i} href={isEn ? '/en/case-studies' : '/vakalar'} style={{ textDecoration: 'none', display: 'block', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eee', background: '#faf9f7', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                  {/* Görsel üst bant */}
                  <div style={{ background: v.bg, padding: '32px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `2px solid ${v.renk}` }}>
                    <div>
                      <div style={{ fontSize: '36px', fontFamily: 'var(--font-display)', fontWeight: 900, color: v.renk }}>{v.metrik}</div>
                      <div style={{ fontSize: '11px', color: '#888', fontWeight: 600 }}>{isEn ? v.metrik_label_en : v.metrik_label_tr}</div>
                    </div>
                    <div style={{ fontSize: '40px' }}>{v.ikon}</div>
                  </div>
                  <div style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '20px', background: '#f5f5f5', fontSize: '11px', color: '#888', fontWeight: 600, marginBottom: '12px' }}>
                      {isEn ? v.sektor_en : v.sektor_tr}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '8px', lineHeight: 1.3 }}>{isEn ? v.baslik_en : v.baslik_tr}</h3>
                    <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6 }}>{isEn ? v.aciklama_en : v.aciklama_tr}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── MÜŞTERİ YORUMLARI ── */}
        <section style={{ padding: '72px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ede8e0', background: '#fff', fontSize: '12px', color: '#888', fontWeight: 600, marginBottom: '14px' }}>
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
              <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #ede8e0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '40px', color: 'var(--orange)', fontFamily: 'Georgia', lineHeight: 1, marginBottom: '16px' }}>❝</div>
                  <p style={{ fontSize: '16px', color: '#333', lineHeight: 1.75, fontWeight: 500, marginBottom: '28px' }}>{isEn ? REFERANSLAR[0].yorum_en : REFERANSLAR[0].yorum_tr}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>M</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>{REFERANSLAR[0].isim}</div>
                    {/* Düzeltme: sirket artık var */}
                    <div style={{ fontSize: '12px', color: '#aaa' }}>{REFERANSLAR[0].unvan} · {REFERANSLAR[0].sirket}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(232,86,10,0.3)', background: '#fff7ed' }}>{isEn ? REFERANSLAR[0].sektor_en : REFERANSLAR[0].sektor_tr}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[REFERANSLAR[1], REFERANSLAR[3]].map((r, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #ede8e0', flex: 1 }}>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>{isEn ? r.yorum_en : r.yorum_tr}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e0e0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#888' }}>{r.isim[0]}</div>
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
                  <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #ede8e0', flex: 1 }}>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>{isEn ? r.yorum_en : r.yorum_tr}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e0e0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#888' }}>{r.isim[0]}</div>
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

        {/* ── SÜREÇ ADIMLARI ── */}
        <section style={{ padding: '72px 40px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ede8e0', background: '#faf9f7', fontSize: '12px', color: '#888', fontWeight: 600, marginBottom: '14px' }}>
                {isEn ? 'HOW I WORK' : 'NASIL ÇALIŞIYORUM?'}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#111', lineHeight: 1.2 }}>
                {isEn ? <>From discovery to<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>measurable results</span></> : <>Keşiften<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>ölçülebilir sonuçlara</span></>}
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', position: 'relative' }}>
              {/* bağlantı çizgisi */}
              <div style={{ position: 'absolute', top: '44px', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(90deg, var(--orange), #7c3aed, #0891b2, #16a34a)', zIndex: 0, borderRadius: '2px' }}></div>
              {surec.map((adim, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: '#faf9f7', border: '3px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px', background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    {adim.ikon}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>{adim.no}</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '10px', fontFamily: 'var(--font-display)' }}>{adim.baslik}</div>
                  <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.65 }}>{adim.aciklama}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEKTÖR SEÇİCİ ── */}
        <section style={{ padding: '72px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '60px', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ede8e0', background: '#fff', fontSize: '12px', color: '#888', fontWeight: 600, marginBottom: '14px' }}>
                  {isEn ? 'YOUR SECTOR' : 'SEKTÖRÜNÜZ'}
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>
                  {isEn ? 'Which sector are you in?' : 'Hangi sektördesiniz?'}
                </h2>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>
                  {isEn ? 'Select your sector to see the most relevant case study and strategy for you.' : 'Sektörünüzü seçerek size en uygun vaka çalışmasını ve stratejiyi görün.'}
                </p>
                {aktifSektor && (
                  <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #ede8e0', animation: 'fadeIn 0.2s ease' }}>
                    <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, marginBottom: '16px' }}>
                      {sektorler.find(s => s.id === aktifSektor)?.ipucu}
                    </div>
                    <Link href={sektorler.find(s => s.id === aktifSektor)?.link || '#'} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-body)' }}>
                      {isEn ? 'View case study →' : 'Vakayı gör →'}
                    </Link>
                  </div>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {sektorler.map(s => (
                  <button key={s.id} onClick={() => setAktifSektor(aktifSektor === s.id ? null : s.id)} style={{
                    padding: '20px', borderRadius: '12px', border: aktifSektor === s.id ? '2px solid var(--orange)' : '1px solid #eee',
                    background: aktifSektor === s.id ? '#fff7ed' : '#fff', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s', fontFamily: 'var(--font-body)',
                  }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.ikon}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: aktifSektor === s.id ? 'var(--orange)' : '#333' }}>{s.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section style={{ padding: '72px 40px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
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
                <Link href={isEn ? '/en/blog' : '/blog'} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', background: '#111', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
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
                <Link key={i} href={isEn ? `/en/blog/${y.slug}` : `/blog/${y.slug}`} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 200px 80px', padding: '16px 24px', borderBottom: i < BLOG_YAZILARI.length - 1 ? '1px solid #f5f5f5' : 'none', alignItems: 'center', textDecoration: 'none', transition: 'background 0.15s' }}
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

        {/* ── FAQ ── */}
        <section style={{ padding: '72px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '340px 1fr', gap: '60px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ede8e0', background: '#fff', fontSize: '12px', color: '#888', fontWeight: 600, marginBottom: '14px' }}>
                FAQ
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>
                {isEn ? 'Frequently asked questions' : 'Sık sorulan sorular'}
              </h2>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>
                {isEn ? 'Can\'t find what you\'re looking for? Reach out directly.' : 'Aradığınızı bulamadınız mı? Doğrudan iletişime geçin.'}
              </p>
              <Link href={isEn ? '/en/contact' : '/sss'} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '8px', border: '1px solid #ddd', color: '#555', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', background: '#fff' }}>
                {isEn ? 'All FAQs →' : 'Tüm SSS →'}
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {faqlar.map((f, i) => (
                <div key={i} style={{ borderBottom: i < faqlar.length - 1 ? '1px solid #eee' : 'none' }}>
                  <button onClick={() => setAcikFaq(acikFaq === i ? null : i)} style={{
                    width: '100%', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    textAlign: 'left', fontFamily: 'var(--font-body)',
                  }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.4 }}>{f.soru}</span>
                    <span style={{ fontSize: '20px', color: acikFaq === i ? 'var(--orange)' : '#aaa', flexShrink: 0, transition: 'transform 0.2s', transform: acikFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                  </button>
                  {acikFaq === i && (
                    <div style={{ paddingBottom: '20px', fontSize: '14px', color: '#666', lineHeight: 1.75, animation: 'fadeIn 0.2s ease' }}>
                      {f.cevap}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARAÇLAR BANDI ── */}
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

        {/* ── CTA ── */}
        <section style={{ padding: '96px 40px', background: '#faf9f7', borderTop: '1px solid #ede8e0', textAlign: 'center' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>
              {isEn ? <>Free discovery call<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>for your site</span></> : <>Siteniz için ücretsiz<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>keşif görüşmesi</span></>}
            </h2>
            <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
              {isEn ? 'I evaluate your goals and create a custom SEO & GEO roadmap. Completely free.' : 'Hedeflerinizi değerlendirip size özel SEO ve GEO yol haritası oluşturuyorum. Tamamen ücretsiz.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '15px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }

          /* Hero */
          section:first-of-type > div { grid-template-columns: 1fr !important; }
          section:first-of-type > div > div:last-child { display: none; }

          /* Sayaç */
          .sayac-grid { grid-template-columns: repeat(2, 1fr) !important; }

          /* Genel grid'ler 1 kolona */
          section > div > div[style*="grid-template-columns: 1fr 1fr"],
          section > div > div[style*="grid-template-columns: 1.2fr"],
          section > div > div[style*="grid-template-columns: 300px"],
          section > div > div[style*="grid-template-columns: 340px"],
          section > div > div[style*="grid-template-columns: repeat(3"],
          section > div > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          /* Müşteri grid 2 kolon */
          section > div > div[style*="gridTemplateColumns: repeat(5"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Süreç adımları */
          section > div > div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
          section > div > div[style*="repeat(4, 1fr)"] > div:nth-child(odd)::after { display: none; }

          /* Blog tablo */
          a[style*="gridTemplateColumns: 60px 1fr 200px 80px"] {
            grid-template-columns: 40px 1fr !important;
          }
          a[style*="gridTemplateColumns: 60px 1fr 200px 80px"] > span:nth-child(3),
          a[style*="gridTemplateColumns: 60px 1fr 200px 80px"] > span:nth-child(4) { display: none; }

          /* Vaka çalışmaları bağlantı çizgisi */
          div[style*="position: absolute; top: 44px"] { display: none; }
        }
      `}</style>
    </>
  )
}

// ── Sayaç kartı bileşeni ──
function CounterCard({ item, started, isEn }) {
  const count = useCounter(item.sayi, 1800, started)
  return (
    <div style={{ background: '#111', padding: '36px 28px', textAlign: 'center' }}>
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.ikon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 3.5vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '6px' }}>
        <span style={{ color: item.renk }}>{count}</span>{item.suffix}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{item.label}</div>
      <div style={{ fontSize: '11px', color: '#555' }}>{item.alt}</div>
    </div>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}
