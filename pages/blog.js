import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const YAZILAR = [
  // TEKNİK SEO
  { slug: 'core-web-vitals-2025', baslik_tr: 'Core Web Vitals 2025: LCP, INP ve CLS Optimizasyon Rehberi', baslik_en: 'Core Web Vitals 2025: Complete LCP, INP and CLS Optimization Guide', etiket: 'Teknik SEO', sure: '12 dk', kategori: 'technical' },
  { slug: 'javascript-seo-rehberi', baslik_tr: 'JavaScript SEO: SPA ve SSR Siteler İçin Kapsamlı Rehber', baslik_en: 'JavaScript SEO: Comprehensive Guide for SPA and SSR Sites', etiket: 'Teknik SEO', sure: '14 dk', kategori: 'technical' },
  { slug: 'teknik-seo-denetim', baslik_tr: 'Teknik SEO Denetimi: 100+ Kontrol Noktasıyla Tam Kılavuz', baslik_en: 'Technical SEO Audit: Complete Guide with 100+ Checkpoints', etiket: 'Teknik SEO', sure: '18 dk', kategori: 'technical' },
  { slug: 'site-migrasyonu-seo', baslik_tr: 'Site Migrasyonu ve SEO: Sıfır Kayıpla Geçiş Yapmanın Yolu', baslik_en: 'Site Migration & SEO: How to Migrate Without Traffic Loss', etiket: 'Teknik SEO', sure: '15 dk', kategori: 'technical' },
  { slug: 'crawl-butce-optimizasyonu', baslik_tr: 'Crawl Bütçesi Optimizasyonu: Googlebot\'u Verimli Yönetmek', baslik_en: 'Crawl Budget Optimization: Managing Googlebot Efficiently', etiket: 'Teknik SEO', sure: '10 dk', kategori: 'technical' },
  { slug: 'schema-markup-rehberi', baslik_tr: 'Schema Markup Rehberi: JSON-LD ile Zengin Sonuçlar Kazanmak', baslik_en: 'Schema Markup Guide: Winning Rich Results with JSON-LD', etiket: 'Teknik SEO', sure: '13 dk', kategori: 'technical' },
  { slug: 'canonical-tag-stratejisi', baslik_tr: 'Canonical Tag Stratejisi: Duplicate Content\'i Sonlandırın', baslik_en: 'Canonical Tag Strategy: End Duplicate Content Issues', etiket: 'Teknik SEO', sure: '9 dk', kategori: 'technical' },
  { slug: 'sayfa-hizi-optimizasyonu', baslik_tr: 'Sayfa Hızı Optimizasyonu: 90+ PageSpeed Skoru İçin Adımlar', baslik_en: 'Page Speed Optimization: Steps to Achieve 90+ PageSpeed Score', etiket: 'Teknik SEO', sure: '11 dk', kategori: 'technical' },
  { slug: 'internal-link-stratejisi', baslik_tr: 'İç Linkleme Stratejisi: PageRank\'i Doğru Dağıtmak', baslik_en: 'Internal Linking Strategy: Distributing PageRank Correctly', etiket: 'Teknik SEO', sure: '10 dk', kategori: 'technical' },
  { slug: 'xml-sitemap-optimizasyonu', baslik_tr: 'XML Sitemap Optimizasyonu: Arama Motorlarına Doğru Sinyal', baslik_en: 'XML Sitemap Optimization: Sending the Right Signal to Search Engines', etiket: 'Teknik SEO', sure: '8 dk', kategori: 'technical' },
  // GEO & AI
  { slug: 'geo-nedir-rehber', baslik_tr: 'GEO Nedir? Generative Engine Optimization\'a Kapsamlı Giriş', baslik_en: 'What is GEO? A Comprehensive Introduction to Generative Engine Optimization', etiket: 'GEO', sure: '14 dk', kategori: 'geo' },
  { slug: 'google-ai-overview-optimizasyonu', baslik_tr: 'Google AI Overview\'da Kaynak Olmak: Kanıtlanmış Stratejiler', baslik_en: 'Becoming a Source in Google AI Overview: Proven Strategies', etiket: 'GEO', sure: '12 dk', kategori: 'geo' },
  { slug: 'llms-txt-rehberi', baslik_tr: 'LLMs.txt Dosyası: Yapay Zekâ Sistemlerine Doğru Sinyal', baslik_en: 'LLMs.txt File: Sending the Right Signal to AI Systems', etiket: 'GEO', sure: '8 dk', kategori: 'geo' },
  { slug: 'perplexity-gorünürlük', baslik_tr: 'Perplexity AI\'da Görünürlük: Kaynak Seçilmenin Formülü', baslik_en: 'Visibility in Perplexity AI: The Formula for Being Selected as a Source', etiket: 'GEO', sure: '10 dk', kategori: 'geo' },
  { slug: 'entity-seo-rehberi', baslik_tr: 'Entity SEO: Arama Motorları Markanızı Nasıl Tanır?', baslik_en: 'Entity SEO: How Do Search Engines Recognize Your Brand?', etiket: 'GEO', sure: '11 dk', kategori: 'geo' },
  { slug: 'chatgpt-search-seo', baslik_tr: 'ChatGPT Search Optimizasyonu: 2025\'te Ne Değişti?', baslik_en: 'ChatGPT Search Optimization: What Changed in 2025?', etiket: 'GEO', sure: '9 dk', kategori: 'geo' },
  { slug: 'rag-seo-etkisi', baslik_tr: 'RAG Mimarisi ve SEO: LLM\'lerin İçerikleri Nasıl Seçtiği', baslik_en: 'RAG Architecture and SEO: How LLMs Select Content', etiket: 'GEO', sure: '13 dk', kategori: 'geo' },
  { slug: 'ai-icin-icerik-yazma', baslik_tr: 'Yapay Zekâ İçin İçerik Yazma: 10 Kanıtlanmış Teknik', baslik_en: 'Writing Content for AI: 10 Proven Techniques', etiket: 'GEO', sure: '10 dk', kategori: 'geo' },
  { slug: 'zero-click-arama-stratejisi', baslik_tr: 'Zero-Click Aramalarda Hayatta Kalmak: Strateji Rehberi', baslik_en: 'Surviving Zero-Click Searches: A Strategy Guide', etiket: 'GEO', sure: '9 dk', kategori: 'geo' },
  { slug: 'answer-engine-optimization', baslik_tr: 'AEO (Answer Engine Optimization): Yanıt Motorlarını Hedeflemek', baslik_en: 'AEO (Answer Engine Optimization): Targeting Answer Engines', etiket: 'GEO', sure: '11 dk', kategori: 'geo' },
  // İÇERİK STRATEJİSİ
  { slug: 'topical-authority-rehberi', baslik_tr: 'Topical Authority Nedir? Konu Otoritesi İnşasının Tam Rehberi', baslik_en: 'What is Topical Authority? The Complete Guide to Building Topic Authority', etiket: 'İçerik', sure: '14 dk', kategori: 'content' },
  { slug: 'pillar-cluster-modeli', baslik_tr: 'Pillar-Cluster İçerik Modeli: Adım Adım Uygulama Kılavuzu', baslik_en: 'Pillar-Cluster Content Model: Step-by-Step Implementation Guide', etiket: 'İçerik', sure: '12 dk', kategori: 'content' },
  { slug: 'eeat-icin-icerik', baslik_tr: 'E-E-A-T İçin İçerik: Google\'ın Güven Testini Geçmek', baslik_en: 'Content for E-E-A-T: Passing Google\'s Trust Test', etiket: 'İçerik', sure: '11 dk', kategori: 'content' },
  { slug: 'anahtar-kelime-arastirmasi', baslik_tr: 'Anahtar Kelime Araştırması 2025: Niyetten Stratejiye', baslik_en: 'Keyword Research 2025: From Intent to Strategy', etiket: 'İçerik', sure: '13 dk', kategori: 'content' },
  { slug: 'icerik-guncelleme-stratejisi', baslik_tr: 'İçerik Güncelleme Stratejisi: Eski Sayfaları Canlandırmak', baslik_en: 'Content Update Strategy: Reviving Old Pages', etiket: 'İçerik', sure: '10 dk', kategori: 'content' },
  { slug: 'uzun-kuyruklu-kelimeler', baslik_tr: 'Long-Tail Anahtar Kelimeler: Düşük Rekabette Yüksek Dönüşüm', baslik_en: 'Long-Tail Keywords: High Conversion at Low Competition', etiket: 'İçerik', sure: '9 dk', kategori: 'content' },
  { slug: 'search-intent-rehberi', baslik_tr: 'Arama Niyeti Rehberi: İçeriği Doğru Niyetle Eşleştirmek', baslik_en: 'Search Intent Guide: Matching Content to the Right Intent', etiket: 'İçerik', sure: '11 dk', kategori: 'content' },
  { slug: 'featured-snippet-stratejisi', baslik_tr: 'Featured Snippet Stratejisi: Sıfır Konumu Kazanmak', baslik_en: 'Featured Snippet Strategy: Winning Position Zero', etiket: 'İçerik', sure: '8 dk', kategori: 'content' },
  { slug: 'icerik-denetimi-nasil-yapilir', baslik_tr: 'İçerik Denetimi Nasıl Yapılır? Adım Adım Kılavuz', baslik_en: 'How to Conduct a Content Audit: Step-by-Step Guide', etiket: 'İçerik', sure: '12 dk', kategori: 'content' },
  { slug: 'icerik-brief-hazirlama', baslik_tr: 'SEO Odaklı İçerik Brief\'i Hazırlama: Yazarlara Doğru Yön', baslik_en: 'Creating SEO-Focused Content Briefs: Guiding Writers Correctly', etiket: 'İçerik', sure: '9 dk', kategori: 'content' },
  // BACKLINK
  { slug: 'backlink-stratejisi-2025', baslik_tr: 'Backlink Stratejisi 2025: Kaliteli Link İnşasının Yeni Yolu', baslik_en: 'Backlink Strategy 2025: The New Way to Build Quality Links', etiket: 'Backlink', sure: '13 dk', kategori: 'backlink' },
  { slug: 'dijital-pr-seo', baslik_tr: 'Dijital PR ve SEO: Medya Bağlantısıyla Otorite Kazanmak', baslik_en: 'Digital PR & SEO: Building Authority Through Media Relations', etiket: 'Backlink', sure: '11 dk', kategori: 'backlink' },
  { slug: 'broken-link-building', baslik_tr: 'Broken Link Building: Kırık Linklerden Backlink Kazanmak', baslik_en: 'Broken Link Building: Earning Backlinks from Broken Links', etiket: 'Backlink', sure: '9 dk', kategori: 'backlink' },
  { slug: 'toksik-backlink-temizleme', baslik_tr: 'Toksik Backlink Analizi ve Google Disavow Kullanımı', baslik_en: 'Toxic Backlink Analysis and Using Google Disavow', etiket: 'Backlink', sure: '10 dk', kategori: 'backlink' },
  { slug: 'anchor-text-optimizasyonu', baslik_tr: 'Anchor Text Optimizasyonu: Doğal Profil Nasıl Kurulur?', baslik_en: 'Anchor Text Optimization: How to Build a Natural Profile', etiket: 'Backlink', sure: '8 dk', kategori: 'backlink' },
  // E-TİCARET SEO
  { slug: 'e-ticaret-seo-rehberi', baslik_tr: 'E-Ticaret SEO Rehberi 2025: Kategori ve Ürün Sayfaları', baslik_en: 'E-Commerce SEO Guide 2025: Category and Product Pages', etiket: 'E-Ticaret', sure: '16 dk', kategori: 'ecommerce' },
  { slug: 'shopify-seo-optimizasyonu', baslik_tr: 'Shopify SEO: Organik Trafiği 3\'e Katlamak İçin 20 Adım', baslik_en: 'Shopify SEO: 20 Steps to Triple Organic Traffic', etiket: 'E-Ticaret', sure: '14 dk', kategori: 'ecommerce' },
  { slug: 'programatik-seo-rehberi', baslik_tr: 'Programatik SEO: Büyük Ölçekte İçerik Üretimi', baslik_en: 'Programmatic SEO: Content Production at Scale', etiket: 'E-Ticaret', sure: '12 dk', kategori: 'ecommerce' },
  { slug: 'urun-sayfasi-optimizasyonu', baslik_tr: 'Ürün Sayfası SEO Optimizasyonu: Dönüşüm ve Sıralama', baslik_en: 'Product Page SEO Optimization: Rankings and Conversions', etiket: 'E-Ticaret', sure: '11 dk', kategori: 'ecommerce' },
  { slug: 'faceted-navigation-seo', baslik_tr: 'Faceted Navigation ve SEO: URL Patlamasını Önlemek', baslik_en: 'Faceted Navigation and SEO: Preventing URL Explosion', etiket: 'E-Ticaret', sure: '10 dk', kategori: 'ecommerce' },
  // ANALİTİK & RAPORLAMA
  { slug: 'ga4-seo-takibi', baslik_tr: 'GA4\'te SEO Takibi: Dashboard Kurulumu ve KPI\'lar', baslik_en: 'SEO Tracking in GA4: Dashboard Setup and KPIs', etiket: 'Analitik', sure: '11 dk', kategori: 'analytics' },
  { slug: 'search-console-rehberi', baslik_tr: 'Search Console Rehberi: Tüm Raporlar ve Kullanım Kılavuzu', baslik_en: 'Search Console Guide: All Reports and Usage Manual', etiket: 'Analitik', sure: '13 dk', kategori: 'analytics' },
  { slug: 'seo-roi-olcumu', baslik_tr: 'SEO ROI\'sini Ölçmek: Yöneticileri İkna Eden Metrikler', baslik_en: 'Measuring SEO ROI: Metrics That Convince Executives', etiket: 'Analitik', sure: '10 dk', kategori: 'analytics' },
  { slug: 'algoritma-guncelleme-rehberi', baslik_tr: 'Google Algoritma Güncellemeleri: Hazırlık ve Toparlanma', baslik_en: 'Google Algorithm Updates: Preparation and Recovery', etiket: 'Analitik', sure: '12 dk', kategori: 'analytics' },
  { slug: 'ctr-optimizasyonu', baslik_tr: 'Organik CTR Optimizasyonu: Title ve Meta ile Tıklama Artışı', baslik_en: 'Organic CTR Optimization: Increasing Clicks with Title and Meta', etiket: 'Analitik', sure: '9 dk', kategori: 'analytics' },
  // YEREL SEO
  { slug: 'yerel-seo-rehberi', baslik_tr: 'Yerel SEO Rehberi 2025: Google\'da Yerel İşletme Görünürlüğü', baslik_en: 'Local SEO Guide 2025: Local Business Visibility on Google', etiket: 'Yerel SEO', sure: '13 dk', kategori: 'local' },
  { slug: 'google-business-profile', baslik_tr: 'Google Business Profile Optimizasyonu: Tam Kılavuz', baslik_en: 'Google Business Profile Optimization: Complete Guide', etiket: 'Yerel SEO', sure: '11 dk', kategori: 'local' },
  { slug: 'nap-tutarliligi', baslik_tr: 'NAP Tutarlılığı ve Yerel SEO: İşletme Bilgisi Yönetimi', baslik_en: 'NAP Consistency and Local SEO: Business Information Management', etiket: 'Yerel SEO', sure: '8 dk', kategori: 'local' },
  // STRATEJİ
  { slug: 'seo-strateji-haritasi', baslik_tr: 'SEO Strateji Haritası: 12 Aylık Büyüme Planı', baslik_en: 'SEO Strategy Roadmap: 12-Month Growth Plan', etiket: 'Strateji', sure: '15 dk', kategori: 'strategy' },
  { slug: 'rakip-analizi-seo', baslik_tr: 'Rakip Analizi ve SEO: Rakiplerinizin Sırlarını Öğrenin', baslik_en: 'Competitor Analysis and SEO: Learn Your Competitors\' Secrets', etiket: 'Strateji', sure: '12 dk', kategori: 'strategy' },
  { slug: 'seo-yatirim-donusu', baslik_tr: 'SEO\'ya Ne Kadar Yatırım Yapmalı? Bütçe Planlama Rehberi', baslik_en: 'How Much to Invest in SEO? Budget Planning Guide', etiket: 'Strateji', sure: '10 dk', kategori: 'strategy' },
]

const KATEGORILER_TR = ['Tümü', 'Teknik SEO', 'GEO', 'İçerik', 'Backlink', 'E-Ticaret', 'Analitik', 'Yerel SEO', 'Strateji']
const KATEGORILER_EN = ['All', 'Technical SEO', 'GEO', 'Content', 'Backlink', 'E-Commerce', 'Analytics', 'Local SEO', 'Strategy']

const KAT_MAP_EN = { 'Teknik SEO': 'Technical SEO', 'GEO': 'GEO', 'İçerik': 'Content', 'Backlink': 'Backlink', 'E-Ticaret': 'E-Commerce', 'Analitik': 'Analytics', 'Yerel SEO': 'Local SEO', 'Strateji': 'Strategy' }

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifKat, setAktifKat] = useState(isEn ? 'All' : 'Tümü')
  const [arama, setArama] = useState('')
  const KATEGORILER = isEn ? KATEGORILER_EN : KATEGORILER_TR

  const filtered = YAZILAR.filter(y => {
    const kat = isEn ? (KAT_MAP_EN[y.etiket] || y.etiket) : y.etiket
    const katMatch = aktifKat === (isEn ? 'All' : 'Tümü') || kat === aktifKat
    const baslik = isEn ? y.baslik_en : y.baslik_tr
    const aramaMatch = !arama || baslik.toLowerCase().includes(arama.toLowerCase())
    return katMatch && aramaMatch
  })

  const t = {
    title: isEn ? 'Blog | Fatih Emin Çakıroğlu — SEO & Digital Marketing' : 'Blog | Fatih Emin Çakıroğlu — SEO & Dijital Pazarlama',
    badge: 'BLOG',
    h1: isEn ? 'SEO & GEO Insights' : 'SEO & GEO Rehberleri',
    desc: isEn ? `${YAZILAR.length} articles on SEO, GEO and digital marketing. Practical insights, actionable strategies.` : `${YAZILAR.length} makale: SEO, GEO ve dijital pazarlama üzerine güncel içgörüler ve uygulanabilir stratejiler.`,
    placeholder: isEn ? 'Search articles...' : 'Yazılarda ara...',
    read: isEn ? 'Read →' : 'Oku →',
    duration: isEn ? 'min read' : 'dk okuma',
    breadcrumb: isEn ? ['Home', 'Blog'] : ['Ana Sayfa', 'Blog'],
    noResult: isEn ? 'No articles found.' : 'Makale bulunamadı.',
  }

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? `${YAZILAR.length}+ articles on SEO, GEO, technical SEO and digital marketing strategies.` : `${YAZILAR.length}+ makale: Teknik SEO, GEO, içerik stratejisi ve dijital pazarlama üzerine.`} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/blog' : 'https://fatihemincakiroglu.com/blog'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/blog" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/blog" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#faf9f7' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 40px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.badge}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>{t.h1}</h1>
            <p style={{ color: '#777', fontSize: '15px', marginBottom: '24px' }}>{t.desc}</p>
            {/* Arama */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8f7f5', border: '1px solid #eee', borderRadius: '8px', padding: '10px 16px', maxWidth: '420px' }}>
              <span style={{ color: '#aaa' }}>🔍</span>
              <input type="text" placeholder={t.placeholder} value={arama} onChange={e => { setArama(e.target.value); setAktifKat(isEn ? 'All' : 'Tümü') }}
                style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%' }} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '32px 32px 96px' }}>
          {/* Kategori filtreleri */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
            {KATEGORILER.map(k => (
              <button key={k} onClick={() => setAktifKat(k)} style={{ padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: aktifKat === k ? 'var(--orange)' : '#fff', color: aktifKat === k ? '#fff' : '#555', fontSize: '13px', fontWeight: aktifKat === k ? 700 : 500, fontFamily: 'var(--font-body)', border: aktifKat === k ? 'none' : '1px solid #eee', transition: 'all 0.15s' }}>{k}</button>
            ))}
          </div>

          {/* Sonuç sayısı */}
          <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>
            <strong style={{ color: '#555' }}>{filtered.length}</strong> {isEn ? 'articles' : 'makale'}
          </div>

          {/* Blog listesi */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
              <div>{t.noResult}</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map((y, i) => {
                const baslik = isEn ? y.baslik_en : y.baslik_tr
                const kat = isEn ? (KAT_MAP_EN[y.etiket] || y.etiket) : y.etiket
                return (
                  <Link key={i} href={`/blog/${y.slug}`}
                    style={{ background: '#fff', borderRadius: '14px', padding: '22px 28px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', textDecoration: 'none', transition: 'transform 0.15s, box-shadow 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.07)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '3px 8px', border: '1px solid rgba(232,86,10,0.3)', borderRadius: '4px' }}>{kat}</span>
                        <span style={{ fontSize: '12px', color: '#aaa' }}>{y.sure} {t.duration}</span>
                      </div>
                      <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111', lineHeight: 1.4, margin: 0 }}>{baslik}</h2>
                    </div>
                    <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{t.read}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
