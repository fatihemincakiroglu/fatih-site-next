import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const KATEGORILER = {
  tr: [
    { id: 'all',       label: 'Tümü',        renk: '#111',    bg: '#f8f7f5', emoji: '✦' },
    { id: 'technical', label: 'Teknik SEO',   renk: '#e8560a', bg: '#fff7ed', emoji: '⚙️' },
    { id: 'geo',       label: 'GEO',          renk: '#6366f1', bg: '#eef2ff', emoji: '🤖' },
    { id: 'content',   label: 'İçerik',       renk: '#0ea5e9', bg: '#f0f9ff', emoji: '✍️' },
    { id: 'backlink',  label: 'Backlink',      renk: '#16a34a', bg: '#f0fdf4', emoji: '🔗' },
    { id: 'ecommerce', label: 'E-Ticaret',     renk: '#f59e0b', bg: '#fffbeb', emoji: '🛍️' },
    { id: 'analytics', label: 'Analitik',      renk: '#8b5cf6', bg: '#faf5ff', emoji: '📊' },
    { id: 'local',     label: 'Yerel SEO',     renk: '#ec4899', bg: '#fdf2f8', emoji: '📍' },
    { id: 'strategy',  label: 'Strateji',      renk: '#14b8a6', bg: '#f0fdfa', emoji: '🎯' },
  ],
  en: [
    { id: 'all',       label: 'All',          renk: '#111',    bg: '#f8f7f5', emoji: '✦' },
    { id: 'technical', label: 'Technical SEO', renk: '#e8560a', bg: '#fff7ed', emoji: '⚙️' },
    { id: 'geo',       label: 'GEO',          renk: '#6366f1', bg: '#eef2ff', emoji: '🤖' },
    { id: 'content',   label: 'Content',       renk: '#0ea5e9', bg: '#f0f9ff', emoji: '✍️' },
    { id: 'backlink',  label: 'Backlink',      renk: '#16a34a', bg: '#f0fdf4', emoji: '🔗' },
    { id: 'ecommerce', label: 'E-Commerce',    renk: '#f59e0b', bg: '#fffbeb', emoji: '🛍️' },
    { id: 'analytics', label: 'Analytics',     renk: '#8b5cf6', bg: '#faf5ff', emoji: '📊' },
    { id: 'local',     label: 'Local SEO',     renk: '#ec4899', bg: '#fdf2f8', emoji: '📍' },
    { id: 'strategy',  label: 'Strategy',      renk: '#14b8a6', bg: '#f0fdfa', emoji: '🎯' },
  ],
}

const YAZILAR = [
  // Teknik SEO
  { slug: 'core-web-vitals-2025',      kategori: 'technical', sure: 12, featured: true,
    tr: { baslik: 'Core Web Vitals 2025: LCP, INP ve CLS Optimizasyon Rehberi', ozet: 'Google\'ın sıralama sinyali olarak kullandığı üç kritik metriği nasıl iyileştirirsiniz? Adım adım rehber.' },
    en: { baslik: 'Core Web Vitals 2025: Complete LCP, INP and CLS Optimization Guide', ozet: 'How to improve the three critical metrics Google uses as ranking signals? Step-by-step guide.' },
  },
  { slug: 'javascript-seo-rehberi',    kategori: 'technical', sure: 14, featured: false,
    tr: { baslik: 'JavaScript SEO: SPA ve SSR Siteler İçin Kapsamlı Rehber', ozet: 'Client-side rendering\'ın SEO üzerindeki etkisi ve Next.js, Nuxt gibi SSR çözümleri.' },
    en: { baslik: 'JavaScript SEO: Comprehensive Guide for SPA and SSR Sites', ozet: 'The impact of client-side rendering on SEO and SSR solutions like Next.js and Nuxt.' },
  },
  { slug: 'teknik-seo-denetim',        kategori: 'technical', sure: 18, featured: false,
    tr: { baslik: 'Teknik SEO Denetimi: 100+ Kontrol Noktasıyla Tam Kılavuz', ozet: 'Kendi sitenizi denetlemek için kullanabileceğiniz eksiksiz teknik SEO denetim şablonu.' },
    en: { baslik: 'Technical SEO Audit: Complete Guide with 100+ Checkpoints', ozet: 'Complete technical SEO audit template you can use to audit your own site.' },
  },
  { slug: 'site-migrasyonu-seo',       kategori: 'technical', sure: 15, featured: false,
    tr: { baslik: 'Site Migrasyonu ve SEO: Sıfır Kayıpla Geçiş Yapmanın Yolu', ozet: 'Domain değişikliği, HTTPS geçişi veya CMS migrasyonunda organik trafik kaybını önleyin.' },
    en: { baslik: 'Site Migration & SEO: How to Migrate Without Traffic Loss', ozet: 'Prevent organic traffic loss during domain change, HTTPS migration or CMS migration.' },
  },
  { slug: 'schema-markup-rehberi',     kategori: 'technical', sure: 13, featured: false,
    tr: { baslik: 'Schema Markup Rehberi: JSON-LD ile Zengin Sonuçlar Kazanmak', ozet: 'FAQPage, Article, Product ve HowTo schema\'larıyla rich results ve AI Overview görünürlüğü.' },
    en: { baslik: 'Schema Markup Guide: Winning Rich Results with JSON-LD', ozet: 'FAQPage, Article, Product and HowTo schemas for rich results and AI Overview visibility.' },
  },
  // GEO
  { slug: 'geo-nedir-rehber',          kategori: 'geo', sure: 14, featured: true,
    tr: { baslik: 'GEO Nedir? Generative Engine Optimization\'a Kapsamlı Giriş', ozet: 'ChatGPT, Perplexity ve Google AI Overview\'da kaynak seçilmek için ne yapmanız gerektiğini öğrenin.' },
    en: { baslik: 'What is GEO? A Comprehensive Introduction to Generative Engine Optimization', ozet: 'Learn what it takes to be cited as a source in ChatGPT, Perplexity and Google AI Overview.' },
  },
  { slug: 'google-ai-overview-optimizasyonu', kategori: 'geo', sure: 12, featured: false,
    tr: { baslik: 'Google AI Overview\'da Kaynak Olmak: Kanıtlanmış Stratejiler', ozet: 'AI Overview\'da kaynak seçilmenizi sağlayacak içerik formatı, schema ve E-E-A-T taktikleri.' },
    en: { baslik: 'Becoming a Source in Google AI Overview: Proven Strategies', ozet: 'Content format, schema and E-E-A-T tactics that will get you cited in AI Overview.' },
  },
  { slug: 'llms-txt-rehberi',          kategori: 'geo', sure: 8, featured: false,
    tr: { baslik: 'LLMs.txt Dosyası: Yapay Zekâ Sistemlerine Doğru Sinyal', ozet: 'Robots.txt\'in AI eşdeğeri olan llms.txt dosyasını nasıl oluşturursunuz ve ne işe yarar?' },
    en: { baslik: 'LLMs.txt File: Sending the Right Signal to AI Systems', ozet: 'How to create the llms.txt file, the AI equivalent of robots.txt, and what it does.' },
  },
  { slug: 'perplexity-gorünürlük',     kategori: 'geo', sure: 10, featured: false,
    tr: { baslik: 'Perplexity AI\'da Görünürlük: Kaynak Seçilmenin Formülü', ozet: 'Perplexity\'nin kaynak seçim algoritması ve içeriklerinizi öne çıkarmak için pratik adımlar.' },
    en: { baslik: 'Visibility in Perplexity AI: The Formula for Being Selected as a Source', ozet: 'Perplexity\'s source selection algorithm and practical steps to get your content featured.' },
  },
  { slug: 'entity-seo-rehberi',        kategori: 'geo', sure: 11, featured: false,
    tr: { baslik: 'Entity SEO: Arama Motorları Markanızı Nasıl Tanır?', ozet: 'Knowledge Graph\'ta yer almak ve LLM\'lerin markanızı güvenilir kaynak olarak tanıması için entity optimizasyonu.' },
    en: { baslik: 'Entity SEO: How Do Search Engines Recognize Your Brand?', ozet: 'Entity optimization to appear in the Knowledge Graph and have LLMs recognize your brand as a trusted source.' },
  },
  // İçerik
  { slug: 'topical-authority-rehberi', kategori: 'content', sure: 14, featured: true,
    tr: { baslik: 'Topical Authority Nedir? Konu Otoritesi İnşasının Tam Rehberi', ozet: 'Pillar-cluster modeliyle Google\'da konunun tartışmasız uzmanı olmak için adım adım strateji.' },
    en: { baslik: 'What is Topical Authority? The Complete Guide to Building Topic Authority', ozet: 'Step-by-step strategy to become the undisputed expert on your topic on Google with the pillar-cluster model.' },
  },
  { slug: 'eeat-icin-icerik',          kategori: 'content', sure: 11, featured: false,
    tr: { baslik: 'E-E-A-T İçin İçerik: Google\'ın Güven Testini Geçmek', ozet: 'Deneyim, uzmanlık, otorite ve güven sinyallerini içeriklerinize nasıl entegre edersiniz?' },
    en: { baslik: 'Content for E-E-A-T: Passing Google\'s Trust Test', ozet: 'How to integrate experience, expertise, authority and trust signals into your content?' },
  },
  { slug: 'anahtar-kelime-arastirmasi', kategori: 'content', sure: 13, featured: false,
    tr: { baslik: 'Anahtar Kelime Araştırması 2025: Niyetten Stratejiye', ozet: 'Arama niyetini doğru okuyan, rekabet analizi yapan ve içerik planını şekillendiren keyword araştırması.' },
    en: { baslik: 'Keyword Research 2025: From Intent to Strategy', ozet: 'Keyword research that correctly reads search intent, performs competitive analysis and shapes content plans.' },
  },
  { slug: 'featured-snippet-stratejisi', kategori: 'content', sure: 8, featured: false,
    tr: { baslik: 'Featured Snippet Stratejisi: Sıfır Konumu Kazanmak', ozet: 'Paragraf, liste ve tablo snippet\'larını kazanmak için kanıtlanmış içerik formatları.' },
    en: { baslik: 'Featured Snippet Strategy: Winning Position Zero', ozet: 'Proven content formats for winning paragraph, list and table snippets.' },
  },
  // Backlink
  { slug: 'backlink-stratejisi-2025',  kategori: 'backlink', sure: 13, featured: true,
    tr: { baslik: 'Backlink Stratejisi 2025: Kaliteli Link İnşasının Yeni Yolu', ozet: 'Editoryal link kazanmak, broken link building ve dijital PR\'ı birleştiren modern backlink stratejisi.' },
    en: { baslik: 'Backlink Strategy 2025: The New Way to Build Quality Links', ozet: 'Modern backlink strategy combining editorial link earning, broken link building and digital PR.' },
  },
  { slug: 'dijital-pr-seo',            kategori: 'backlink', sure: 11, featured: false,
    tr: { baslik: 'Dijital PR ve SEO: Medya Bağlantısıyla Otorite Kazanmak', ozet: 'Orijinal araştırma ve medya outreach kampanyasıyla editoryal backlink kazanma kılavuzu.' },
    en: { baslik: 'Digital PR & SEO: Building Authority Through Media Relations', ozet: 'Guide to earning editorial backlinks through original research and media outreach campaigns.' },
  },
  { slug: 'toksik-backlink-temizleme', kategori: 'backlink', sure: 10, featured: false,
    tr: { baslik: 'Toksik Backlink Analizi ve Google Disavow Kullanımı', ozet: 'Zararlı linkleri tespit etme, kaldırma talebi gönderme ve disavow dosyası oluşturma rehberi.' },
    en: { baslik: 'Toxic Backlink Analysis and Using Google Disavow', ozet: 'Guide to detecting harmful links, sending removal requests and creating a disavow file.' },
  },
  // E-Ticaret
  { slug: 'e-ticaret-seo-rehberi',     kategori: 'ecommerce', sure: 16, featured: true,
    tr: { baslik: 'E-Ticaret SEO Rehberi 2025: Kategori ve Ürün Sayfaları', ozet: 'Faceted navigation, duplicate content ve programatik içerik dahil kapsamlı e-ticaret SEO kılavuzu.' },
    en: { baslik: 'E-Commerce SEO Guide 2025: Category and Product Pages', ozet: 'Comprehensive e-commerce SEO guide including faceted navigation, duplicate content and programmatic content.' },
  },
  { slug: 'shopify-seo-optimizasyonu', kategori: 'ecommerce', sure: 14, featured: false,
    tr: { baslik: 'Shopify SEO: Organik Trafiği 3\'e Katlamak İçin 20 Adım', ozet: 'Shopify\'ın sınırları içinde yapılabilecek en etkili SEO iyileştirmeleri ve araçları.' },
    en: { baslik: 'Shopify SEO: 20 Steps to Triple Organic Traffic', ozet: 'The most effective SEO improvements and tools possible within Shopify\'s limitations.' },
  },
  { slug: 'programatik-seo-rehberi',   kategori: 'ecommerce', sure: 12, featured: false,
    tr: { baslik: 'Programatik SEO: Büyük Ölçekte İçerik Üretimi', ozet: 'Şablonlar ve veriyle yüzlerce sayfa üretmenin doğru yolu: fırsatlar, riskler ve teknik altyapı.' },
    en: { baslik: 'Programmatic SEO: Content Production at Scale', ozet: 'The right way to produce hundreds of pages with templates and data: opportunities, risks and technical infrastructure.' },
  },
  // Analitik
  { slug: 'ga4-seo-takibi',            kategori: 'analytics', sure: 11, featured: false,
    tr: { baslik: 'GA4\'te SEO Takibi: Dashboard Kurulumu ve KPI\'lar', ozet: 'Google Analytics 4\'te organik trafik segmenti, dönüşüm hedefleri ve SEO dashboard kurulumu.' },
    en: { baslik: 'SEO Tracking in GA4: Dashboard Setup and KPIs', ozet: 'Organic traffic segments, conversion goals and SEO dashboard setup in Google Analytics 4.' },
  },
  { slug: 'search-console-rehberi',    kategori: 'analytics', sure: 13, featured: true,
    tr: { baslik: 'Search Console Rehberi: Tüm Raporlar ve Kullanım Kılavuzu', ozet: 'Performance, Coverage, CWV ve daha fazlası — GSC\'nin her raporunu nasıl okumalısınız?' },
    en: { baslik: 'Search Console Guide: All Reports and Usage Manual', ozet: 'Performance, Coverage, CWV and more — how should you read every GSC report?' },
  },
  { slug: 'seo-roi-olcumu',            kategori: 'analytics', sure: 10, featured: false,
    tr: { baslik: 'SEO ROI\'sini Ölçmek: Yöneticileri İkna Eden Metrikler', ozet: 'Organik trafiğin parasal değerini hesaplamak ve SEO yatırımını üst yönetime sunmak.' },
    en: { baslik: 'Measuring SEO ROI: Metrics That Convince Executives', ozet: 'Calculating the monetary value of organic traffic and presenting SEO investment to senior management.' },
  },
  { slug: 'algoritma-guncelleme-rehberi', kategori: 'analytics', sure: 12, featured: false,
    tr: { baslik: 'Google Algoritma Güncellemeleri: Hazırlık ve Toparlanma', ozet: 'Core Update, Helpful Content ve Spam güncellemelerinden nasıl korunur ve toparlanırsınız?' },
    en: { baslik: 'Google Algorithm Updates: Preparation and Recovery', ozet: 'How to protect against and recover from Core Update, Helpful Content and Spam updates?' },
  },
  // Yerel SEO
  { slug: 'yerel-seo-rehberi',         kategori: 'local', sure: 13, featured: true,
    tr: { baslik: 'Yerel SEO Rehberi 2025: Google\'da Yerel İşletme Görünürlüğü', ozet: 'Google Local Pack, GBP optimizasyonu ve yerel anahtar kelime stratejisiyle bölgenizde öne çıkın.' },
    en: { baslik: 'Local SEO Guide 2025: Local Business Visibility on Google', ozet: 'Stand out in your area with Google Local Pack, GBP optimization and local keyword strategy.' },
  },
  { slug: 'google-business-profile',   kategori: 'local', sure: 11, featured: false,
    tr: { baslik: 'Google Business Profile Optimizasyonu: Tam Kılavuz', ozet: 'GBP\'yi sıfırdan nasıl kurarsınız? Fotoğraf, kategori, post ve yorum stratejileri.' },
    en: { baslik: 'Google Business Profile Optimization: Complete Guide', ozet: 'How to set up GBP from scratch? Photo, category, post and review strategies.' },
  },
  // Strateji
  { slug: 'seo-strateji-haritasi',     kategori: 'strategy', sure: 15, featured: true,
    tr: { baslik: 'SEO Strateji Haritası: 12 Aylık Büyüme Planı', ozet: 'Sıfırdan anlamlı organik büyümeye giden 12 aylık SEO yol haritası — ay ay aksiyon planı.' },
    en: { baslik: 'SEO Strategy Roadmap: 12-Month Growth Plan', ozet: 'A 12-month SEO roadmap from zero to meaningful organic growth — month-by-month action plan.' },
  },
  { slug: 'rakip-analizi-seo',         kategori: 'strategy', sure: 12, featured: false,
    tr: { baslik: 'Rakip Analizi ve SEO: Rakiplerinizin Sırlarını Öğrenin', ozet: 'Keyword gap, backlink analizi ve SERP görünürlük karşılaştırmasıyla rakipleri geçme stratejisi.' },
    en: { baslik: 'Competitor Analysis and SEO: Learn Your Competitors\' Secrets', ozet: 'Strategy to beat competitors with keyword gap, backlink analysis and SERP visibility comparison.' },
  },
  { slug: 'seo-yatirim-donusu',        kategori: 'strategy', sure: 10, featured: false,
    tr: { baslik: 'SEO\'ya Ne Kadar Yatırım Yapmalı? Bütçe Planlama Rehberi', ozet: 'Sektöre ve rekabete göre SEO bütçesini belirleme ve yatırımın geri dönüşünü tahmin etme.' },
    en: { baslik: 'How Much to Invest in SEO? Budget Planning Guide', ozet: 'Determining the SEO budget based on sector and competition, and estimating the return on investment.' },
  },
  { slug: 'seo-ajansi-nasil-secilir',  kategori: 'strategy', sure: 9, featured: false,
    tr: { baslik: "SEO Ajansı Nasıl Seçilir? Kriterler ve Türkiye'den Örnekler", ozet: "Referanslar, şeffaflık ve sektör deneyimi gibi kriterlerle SEO ajansı seçimi — Türkiye'den alfabetik, tarafsız örnekler." },
    en: { baslik: 'How to Choose an SEO Agency: Criteria and Examples from Turkey', ozet: 'Choosing an SEO agency based on references, transparency and industry experience — an alphabetical, unranked overview from Turkey.' },
  },
]

const KAT_MAP = { technical: 'technical', geo: 'geo', content: 'content', backlink: 'backlink', ecommerce: 'ecommerce', analytics: 'analytics', local: 'local', strategy: 'strategy' }

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifKat, setAktifKat] = useState('all')
  const [arama, setArama] = useState('')
  const kategoriler = isEn ? KATEGORILER.en : KATEGORILER.tr

  const filtered = YAZILAR.filter(y => {
    const katMatch = aktifKat === 'all' || y.kategori === aktifKat
    const baslik = isEn ? y.en.baslik : y.tr.baslik
    const aramaMatch = !arama || baslik.toLowerCase().includes(arama.toLowerCase())
    return katMatch && aramaMatch
  })

  const featured = filtered.filter(y => y.featured)
  const rest = filtered.filter(y => !y.featured)

  const getKat = (id) => kategoriler.find(k => k.id === id) || kategoriler[0]

  const t = isEn ? {
    badge: 'BLOG',
    h1a: 'SEO & GEO',
    h1b: 'Insights',
    desc: `${YAZILAR.length} articles on SEO, GEO and digital marketing. Practical, actionable, data-driven.`,
    placeholder: 'Search articles...',
    minRead: 'min read',
    read: 'Read',
    featured_label: 'Featured',
    noResult: 'No articles found.',
    noResult_sub: 'Try a different search term or category.',
    all_in: 'All articles in',
    breadcrumb: ['Home', 'Blog'],
  } : {
    badge: 'BLOG',
    h1a: 'SEO & GEO',
    h1b: 'Rehberleri',
    desc: `${YAZILAR.length} makale: SEO, GEO ve dijital pazarlama üzerine güncel, uygulanabilir, veriye dayalı içgörüler.`,
    placeholder: 'Yazılarda ara...',
    minRead: 'dk okuma',
    read: 'Oku',
    featured_label: 'Öne Çıkan',
    noResult: 'Makale bulunamadı.',
    noResult_sub: 'Farklı bir arama terimi veya kategori deneyin.',
    all_in: 'Tüm makaleler:',
    breadcrumb: ['Ana Sayfa', 'Blog'],
  }

  return (
    <>
      <Head>
        <title>{isEn ? 'SEO & GEO Blog | Fatih Emin Çakıroğlu' : 'SEO ve GEO Blog | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? `${YAZILAR.length}+ in-depth articles on SEO, GEO, technical SEO and digital marketing strategy. Practical, actionable insights to grow your organic search visibility.` : `${YAZILAR.length}+ derinlemesine makale: teknik SEO, GEO, içerik stratejisi ve dijital pazarlama üzerine. Organik görünürlüğünüzü artıracak uygulanabilir içgörüler.`} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/blog' : 'https://fatihemincakiroglu.com/blog'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/blog" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/blog" />
        <script type="application/ld+json">{JSON.stringify({ "@context":"https://schema.org","@type":"Blog","name": isEn ? "Fatih Emin Çakıroğlu Blog" : "Fatih Emin Çakıroğlu Blog","url": isEn ? "https://fatihemincakiroglu.com/en/blog" : "https://fatihemincakiroglu.com/blog","author":{"@type":"Person","name":"Fatih Emin Çakıroğlu"} })}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>

        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background: '#111', padding: '64px 32px 0', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', paddingBottom: '40px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.badge}</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, marginBottom: '0' }}>
                  {t.h1a}<br />
                  <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{t.h1b}</span>
                </h1>
              </div>
              <div style={{ maxWidth: '360px' }}>
                <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>{t.desc}</p>
                {/* Arama */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '12px 16px' }}>
                  <span style={{ color: '#6b7280', fontSize: '16px' }}>🔍</span>
                  <input type="text" placeholder={t.placeholder} value={arama}
                    onChange={e => { setArama(e.target.value); setAktifKat('all') }}
                    style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%', color: '#fff', '::placeholder': { color: '#6b7280' } }} />
                  {arama && <button onClick={() => setArama('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '16px', padding: '0' }}>✕</button>}
                </div>
              </div>
            </div>

            {/* Kategori Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '0', scrollbarWidth: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              {kategoriler.map(k => (
                <button key={k.id} onClick={() => { setAktifKat(k.id); setArama('') }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '0', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: aktifKat === k.id ? 700 : 400, fontSize: '14px', color: aktifKat === k.id ? '#fff' : '#6b7280', borderBottom: aktifKat === k.id ? `3px solid ${k.renk === '#111' ? 'var(--orange)' : k.renk}` : '3px solid transparent', transition: 'all 0.15s', whiteSpace: 'nowrap', paddingBottom: '14px' }}>
                  <span>{k.emoji}</span> {k.label}
                  <span style={{ fontSize: '11px', background: aktifKat === k.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '10px', marginLeft: '2px' }}>
                    {k.id === 'all' ? YAZILAR.length : YAZILAR.filter(y => y.kategori === k.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* İçerik */}
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 32px 96px' }}>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#111', marginBottom: '8px' }}>{t.noResult}</h3>
              <p style={{ color: '#aaa' }}>{t.noResult_sub}</p>
            </div>
          ) : (
            <>
              {/* Featured Grid — sadece all ve kategori filtresinde göster, aramada gösterme */}
              {!arama && featured.length > 0 && (
                <div style={{ marginBottom: '48px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      ★ {t.featured_label}
                    </span>
                    <div style={{ flex: 1, height: '1px', background: '#eee' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: featured.length >= 2 ? '2fr 1fr' : '1fr', gap: '16px' }}>
                    {featured.slice(0, 1).map((y, i) => {
                      const kat = getKat(y.kategori)
                      const baslik = isEn ? y.en.baslik : y.tr.baslik
                      const ozet = isEn ? y.en.ozet : y.tr.ozet
                      return (
                        <Link key={i} href={`/blog/${y.slug}`}
                          style={{ background: kat.bg, borderRadius: '20px', padding: '36px', border: `1px solid ${kat.renk}20`, textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '260px', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden' }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${kat.renk}20` }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                          <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '120px', opacity: 0.06 }}>{kat.emoji}</div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: kat.renk, padding: '4px 12px', background: '#fff', borderRadius: '20px', border: `1px solid ${kat.renk}30` }}>{kat.emoji} {kat.label}</span>
                              <span style={{ fontSize: '12px', color: kat.renk }}>{y.sure} {t.minRead}</span>
                            </div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 800, color: '#111', marginBottom: '12px', lineHeight: 1.25 }}>{baslik}</h2>
                            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.65 }}>{ozet}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: kat.renk, fontWeight: 700, fontSize: '14px' }}>
                            {t.read} <span style={{ fontSize: '18px' }}>→</span>
                          </div>
                        </Link>
                      )
                    })}
                    {featured.length >= 2 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {featured.slice(1, 3).map((y, i) => {
                          const kat = getKat(y.kategori)
                          const baslik = isEn ? y.en.baslik : y.tr.baslik
                          return (
                            <Link key={i} href={`/blog/${y.slug}`}
                              style={{ background: kat.bg, borderRadius: '16px', padding: '24px', border: `1px solid ${kat.renk}20`, textDecoration: 'none', flex: 1, transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                              onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}>
                              <div>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: kat.renk, padding: '3px 10px', background: '#fff', borderRadius: '20px', border: `1px solid ${kat.renk}30`, display: 'inline-block', marginBottom: '10px' }}>{kat.emoji} {kat.label}</span>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', lineHeight: 1.3 }}>{baslik}</h3>
                              </div>
                              <div style={{ color: kat.renk, fontWeight: 700, fontSize: '13px', marginTop: '12px' }}>{t.read} →</div>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Rest articles */}
              {(arama ? filtered : rest).length > 0 && (
                <div>
                  {!arama && rest.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        {t.all_in} {aktifKat !== 'all' ? getKat(aktifKat).label : ''} ({(arama ? filtered : rest).length})
                      </span>
                      <div style={{ flex: 1, height: '1px', background: '#eee' }} />
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {(arama ? filtered : rest).map((y, i) => {
                      const kat = getKat(y.kategori)
                      const baslik = isEn ? y.en.baslik : y.tr.baslik
                      const ozet = isEn ? y.en.ozet : y.tr.ozet
                      return (
                        <Link key={i} href={`/blog/${y.slug}`}
                          style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #eee', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s', borderTop: `3px solid ${kat.renk}` }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)' }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '18px' }}>{kat.emoji}</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: kat.renk, letterSpacing: '0.5px' }}>{kat.label}</span>
                            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#ccc' }}>{y.sure} {t.minRead}</span>
                          </div>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.35, marginBottom: '10px', flex: 1 }}>{baslik}</h3>
                          <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, marginBottom: '14px' }}>{ozet.slice(0, 80)}...</p>
                          <div style={{ color: kat.renk, fontWeight: 700, fontSize: '13px' }}>{t.read} →</div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <style>{`
        input::placeholder { color: #6b7280; }
        ::-webkit-scrollbar { height: 0; }
        @media (max-width: 768px) {
          .blog-featured { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
