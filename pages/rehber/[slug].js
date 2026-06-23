import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

/* ── REHBER VERİSİ (TR + EN) ── */
function makeRehber(baslik_tr, baslik_en, kategori, bolumler_tr, bolumler_en) {
  return { baslik_tr, baslik_en, kategori, bolumler_tr, bolumler_en }
}

function defaultBolum(baslik_tr, baslik_en) {
  return {
    baslik_tr, baslik_en,
    paragraflar_tr: [
      'Bu bölüm SEO ve dijital pazarlamanın temel kavramlarını ele almaktadır. Doğru stratejilerle organik görünürlüğünüzü artırmak mümkündür.',
      'Güncel algoritmalar ve kullanıcı davranışındaki değişimlere uyum sağlamak, uzun vadeli başarının anahtarıdır.',
      'Veri odaklı, kullanıcı merkezli bir yaklaşım en sağlam pozisyonu oluşturur.',
    ],
    paragraflar_en: [
      'This section covers the core concepts of SEO and digital marketing. It is possible to increase your organic visibility with the right strategies.',
      'Adapting to current algorithms and changes in user behavior is the key to long-term success.',
      'A data-driven, user-centric approach creates the most solid position.',
    ],
  }
}

const TÜM_REHBERLER = {
  'teknik-seo': makeRehber('Teknik SEO Temelleri', 'Technical SEO Fundamentals', 'Teknik',
    [
      { baslik: 'Teknik SEO Nedir?', paragraflar: ['Teknik SEO, web sitenizin arama motorları tarafından doğru biçimde taranabilmesi, indexlenebilmesi ve sıralanabilmesi için gereken teknik altyapı çalışmalarının tümüdür. İçeriğiniz ne kadar kaliteli olursa olsun, teknik sorunlar organik büyümenizi engelleyebilir.', 'Teknik SEO\'nun üç temel katmanı vardır: Erişilebilirlik (crawlability), indexleme ve sıralama sinyal gücü. Her katmanın eksiksiz çalışması gereklidir.', 'Düzenli teknik SEO denetimleri (audit) bu sorunları erkenden tespit etmenizi sağlar. Screaming Frog, Ahrefs Site Audit ve Google Search Console bu süreçte en değerli araçlardır.'] },
      { baslik: 'Site Hızı ve Core Web Vitals', paragraflar: ['Sayfa hızı hem resmi sıralama faktörü hem de kullanıcı deneyiminin kritik bileşenidir. Google\'ın Core Web Vitals metrikleri — LCP, INP ve CLS — teknik SEO\'nun odak noktalarından biridir.', 'LCP (Largest Contentful Paint) için hedef 2.5 saniyenin altıdır. Hero görsellerini preload etmek, CDN kullanmak ve render-blocking kaynakları azaltmak LCP\'yi iyileştirir.', 'INP (Interaction to Next Paint) için 200ms altı hedeflenir. Ana thread blokajını azaltmak ve third-party script\'leri optimize etmek INP üzerinde en büyük etkiyi yaratır.'] },
      { baslik: 'Crawlability ve Indexleme', paragraflar: ['Googlebot sitenizi tarayabilmeli ve önemli sayfalarınızı indexleyebilmelidir. Robots.txt, canonical tag ve XML sitemap bu sürecin teknik araçlarıdır.', 'Crawl bütçesini verimli kullanmak için düşük kaliteli sayfaları, parametre URL\'lerini ve session ID\'leri robots.txt veya noindex ile taramadan hariç tutun.', 'Google Search Console\'daki Coverage raporu indexleme sorunlarını gösterir. Bu raporu düzenli inceleyin ve "Excluded" sayfaları kategorize edin.'] },
      { baslik: 'Schema Markup ve Yapısal Veri', paragraflar: ['Schema markup, arama motorlarına sayfanızın içeriği hakkında makine-okunabilir bağlam sağlar. FAQPage, Article, Product ve HowTo schema türleri zengin sonuçlar kazandırır.', 'AI Overview döneminde FAQPage ve Article schema, AI sistemlerinde kaynak seçilme olasılığını artıran önemli teknik sinyallerdir.', 'Schema doğruluğunu Google\'ın Rich Results Test aracıyla kontrol edin. Hatalı schema zengin sonuçlardan dışlanmanıza neden olabilir.'] },
      { baslik: 'Mobil Uyumluluk', paragraflar: ['Google Mobile-First Indexing kullanır — sitenizi değerlendirmek için masaüstü değil, mobil versiyonu kullanır. Mobil versiyonunuz eksik içerik veya schema taşıyorsa sıralamada geride kalırsınız.', 'Responsive design, minimum 16px font boyutu, 48px tıklanabilir öğe boşluğu ve doğru viewport meta tag mobil uyumluluğun temelini oluşturur.', 'Google Search Console Mobil Kullanılabilirlik raporu ve Google\'ın Mobile-Friendly Test aracıyla sorunları hızla tespit edebilirsiniz.'] },
      { baslik: 'Teknik SEO Denetim Süreci', paragraflar: ['Kapsamlı teknik audit için öncelik sırası: indexleme sorunları, kırık linkler (404), yönlendirme zincirleri, Core Web Vitals sorunları, duplicate content ve schema hataları.', 'Screaming Frog ile tam site taraması yapın. Ahrefs Site Audit ile teknik skor takip edin. Her audit sonrası önceliklendirilmiş aksiyon planı oluşturun.', 'Teknik SEO tek seferlik bir proje değil, sürekli izleme gerektiren bir disiplindir. Aylık teknik sağlık kontrolü ve büyük değişiklikler öncesi audit standart süreç olmalıdır.'] },
    ],
    [
      { baslik: 'What is Technical SEO?', paragraflar: ['Technical SEO encompasses all the technical infrastructure work required for your website to be correctly crawled, indexed and ranked by search engines. No matter how high-quality your content is, technical issues can block organic growth.', 'Technical SEO has three fundamental layers: Accessibility (crawlability), indexing and ranking signal strength. Every layer needs to work flawlessly.', 'Regular technical SEO audits allow you to detect these issues early. Screaming Frog, Ahrefs Site Audit and Google Search Console are the most valuable tools in this process.'] },
      { baslik: 'Site Speed and Core Web Vitals', paragraflar: ['Page speed is both an official ranking factor and a critical component of user experience. Google\'s Core Web Vitals metrics — LCP, INP and CLS — are one of the focal points of technical SEO.', 'The target for LCP (Largest Contentful Paint) is under 2.5 seconds. Preloading hero images, using a CDN and reducing render-blocking resources improves LCP.', 'For INP (Interaction to Next Paint), under 200ms is targeted. Reducing main thread blocking and optimizing third-party scripts creates the greatest impact on INP.'] },
      { baslik: 'Crawlability and Indexing', paragraflar: ['Googlebot must be able to crawl your site and index your important pages. Robots.txt, canonical tags and XML sitemaps are the technical tools for this process.', 'To use crawl budget efficiently, exclude low-quality pages, parameter URLs and session IDs from crawling with robots.txt or noindex.', 'The Coverage report in Google Search Console shows indexing issues. Review this report regularly and categorize "Excluded" pages.'] },
      { baslik: 'Schema Markup and Structured Data', paragraflar: ['Schema markup provides search engines with machine-readable context about your page\'s content. FAQPage, Article, Product and HowTo schema types earn rich results.', 'In the AI Overview era, FAQPage and Article schema are important technical signals that increase the likelihood of being selected as a source in AI systems.', 'Check schema accuracy with Google\'s Rich Results Test tool. Incorrect schema can cause exclusion from rich results.'] },
      { baslik: 'Mobile Compatibility', paragraflar: ['Google uses Mobile-First Indexing — it uses the mobile version, not the desktop version, to evaluate your site. If your mobile version lacks content or schema, you will fall behind in rankings.', 'Responsive design, minimum 16px font size, 48px clickable element spacing and correct viewport meta tag form the foundation of mobile compatibility.', 'You can quickly detect issues with Google Search Console\'s Mobile Usability report and Google\'s Mobile-Friendly Test tool.'] },
      { baslik: 'Technical SEO Audit Process', paragraflar: ['Priority order for a comprehensive technical audit: indexing issues, broken links (404s), redirect chains, Core Web Vitals issues, duplicate content and schema errors.', 'Run a full site crawl with Screaming Frog. Track technical score with Ahrefs Site Audit. Create a prioritized action plan after each audit.', 'Technical SEO is not a one-time project but a discipline requiring continuous monitoring. Monthly technical health checks and pre-major-change audits should be standard practice.'] },
    ]
  ),
  'icerik-stratejisi': makeRehber('İçerik Stratejisi', 'Content Strategy', 'Strateji',
    [
      { baslik: 'İçerik Stratejisi Nedir?', paragraflar: ['İçerik stratejisi, hedef kitlenizin ihtiyaçlarını karşılayan, arama niyetiyle uyumlu ve işletme hedeflerinizi destekleyen içerikleri sistematik biçimde planlama, üretme ve yönetme sürecidir.', 'İyi bir içerik stratejisi yalnızca "ne yayınlayacağınızı" değil, "kime, hangi formatta, hangi sıklıkta ve hangi hedefle" yayınlayacağınızı da belirler.', 'Topical authority inşası modern içerik stratejisinin merkezine yerleşmiştir: belirli bir konuyu kapsamlı ele alarak arama motorlarının sizi uzman kaynak olarak tanıması hedeflenir.'] },
      { baslik: 'Arama Niyeti ve İçerik Eşleştirme', paragraflar: ['Arama niyeti (search intent), bir kullanıcının sorguyu yazarken gerçekte ne istediğidir. Dört temel niyet türü vardır: Informational, Navigational, Commercial ve Transactional.', 'Niyet analizi için en güvenilir yöntem: hedef anahtar kelimenizi Google\'a yazın ve ilk 5-10 organik sonucu inceleyin. Formatlar size içeriğin nasıl olması gerektiğini gösterir.', 'Yanlış niyet eşleştirmesi, mükemmel teknik SEO yapılmış içeriğin hiç sıralanmamasına yol açabilir. Niyet, içerik formatını belirleyen en önemli faktördür.'] },
      { baslik: 'Pillar-Cluster Model', paragraflar: ['Pillar-cluster modeli, bir ana konuyu kapsamlı ele alan "pillar" sayfası etrafında, alt konuları derinlemesine işleyen "cluster" sayfaları organize eden içerik mimarisidir.', 'Her cluster sayfası pillar sayfasına link verir; pillar ise tüm cluster\'lara bağlanır. Bu çift yönlü iç link yapısı topical authority\'yi ve PageRank dağılımını optimize eder.', 'Pillar sayfaları geniş head kelimeleri, cluster sayfaları daha spesifik long-tail kelimeleri hedefler. Bu yapı hem kullanıcı deneyimini hem semantik bütünlüğü güçlendirir.'] },
      { baslik: 'E-E-A-T ve İçerik Kalitesi', paragraflar: ['E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), Google\'ın içerik kalitesini değerlendirdiği çerçevedir. SEO içeriği bu dört boyutu güçlü biçimde yansıtmalıdır.', 'Deneyim sinyali için: kişisel deneyim anlatıları, birincil veri ve özgün araştırma ekleyin. Uzmanlık için: yazar biyografileri, sertifikalar ve sektör yayınlarında yer alma.', 'GEO döneminde E-E-A-T daha da kritiktir — AI sistemleri güvenilirlik sinyalleri zayıf içerikleri kaynak olarak seçmez.'] },
      { baslik: 'İçerik Takvimi ve Üretim Süreci', paragraflar: ['İçerik takvimi, hangi içeriğin, ne zaman, kim tarafından üretileceğini ve hangi hedef kelimeyi hedeflediğini gösteren yönetim aracıdır.', 'Etkili içerik üretim süreci: anahtar kelime araştırması → içerik brief → yazarlık → SEO incelemesi → yayın → performans takibi adımlarından oluşur.', 'İçerik brief\'i hazırlık; hedef kelime, niyet türü, hedef uzunluk, ana rakip sayfalar, zorunlu başlıklar ve bağlantı kurulacak iç sayfaları içermelidir.'] },
      { baslik: 'İçerik Güncelleme Stratejisi', paragraflar: ['Eski içerikleri güncellemek, yeni içerik üretmek kadar önemlidir. Google taze içerikleri tercih eder; güncellenen içerikler sıralama iyileşmesi yaşayabilir.', 'Güncelleme öncelikleri: Search Console\'da trafik düşüşü gösteren sayfalar, güncel olmayan istatistikler içeren içerikler, rakiplerin geçtiği sayfalar.', 'Güncelleme yaparken: istatistikleri yenileyin, yeni PAA sorularını ekleyin, eksik alt başlıkları tamamlayın ve dateModified\'ı güncelleyin.'] },
    ],
    [
      { baslik: 'What is Content Strategy?', paragraflar: ['Content strategy is the systematic process of planning, producing and managing content that meets the needs of your target audience, aligns with search intent and supports your business goals.', 'A good content strategy determines not just "what you will publish" but also "to whom, in what format, how frequently and with what goal."', 'Building topical authority has moved to the center of modern content strategy: the goal is for search engines to recognize you as an expert source by comprehensively covering a specific topic.'] },
      { baslik: 'Search Intent and Content Matching', paragraflar: ['Search intent is what a user actually wants when they type a query. There are four fundamental intent types: Informational, Navigational, Commercial and Transactional.', 'The most reliable method for intent analysis: type your target keyword into Google and examine the first 5-10 organic results. The formats show you what type of content you need.', 'Wrong intent matching can cause even perfectly technically optimized content to never rank. Intent is the most important factor in determining content format.'] },
      { baslik: 'Pillar-Cluster Model', paragraflar: ['The pillar-cluster model is a content architecture that organizes "cluster" pages covering subtopics in depth around a "pillar" page that comprehensively covers a main topic.', 'Each cluster page links to the pillar page; the pillar connects to all clusters. This bidirectional internal link structure optimizes topical authority and PageRank distribution.', 'Pillar pages target broad head keywords, cluster pages target more specific long-tail keywords. This structure strengthens both user experience and semantic coherence.'] },
      { baslik: 'E-E-A-T and Content Quality', paragraflar: ['E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is the framework Google uses to evaluate content quality. SEO content should strongly reflect these four dimensions.', 'For experience signals: add personal experience narratives, primary data and original research. For expertise: author bios, certifications and appearances in industry publications.', 'In the GEO era, E-E-A-T is even more critical — AI systems don\'t select content with weak credibility signals as sources.'] },
      { baslik: 'Content Calendar and Production Process', paragraflar: ['A content calendar is a management tool showing what content will be produced, when, by whom and which target keyword it targets.', 'An effective content production process consists of: keyword research → content brief → writing → SEO review → publication → performance tracking.', 'A content brief should include: target keyword, intent type, target length, top competitor pages, required headings and internal pages to link to.'] },
      { baslik: 'Content Update Strategy', paragraflar: ['Updating old content is as important as producing new content. Google prefers fresh content; updated content may experience ranking improvements.', 'Update priorities: pages showing traffic drops in Search Console, content with outdated statistics, pages where competitors have surpassed you.', 'When updating: refresh statistics, add new PAA questions, complete missing subheadings and update dateModified.'] },
    ]
  ),
}

// Default fallback
function makeDefault(slug) {
  const title_tr = slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Rehber'
  const title_en = title_tr
  const bols_tr = ['Giriş', 'Temel Prensipler', 'Uygulama Adımları', 'Ölçüm ve Optimizasyon', 'Yaygın Hatalar', 'Gelecek Perspektifi'].map(b => ({
    baslik: b,
    paragraflar: [
      `${title_tr} konusunda başarılı olmak için temel prensipleri anlamak şarttır. Bu rehber, konuyu tüm boyutlarıyla ele almaktadır.`,
      'Veriye dayalı, kullanıcı odaklı ve sürdürülebilir bir yaklaşım en iyi sonuçları verir.',
      'Düzenli analiz ve optimizasyon döngüsü, uzun vadeli başarının anahtarıdır.',
    ]
  }))
  const bols_en = ['Introduction', 'Core Principles', 'Implementation Steps', 'Measurement & Optimization', 'Common Mistakes', 'Future Outlook'].map(b => ({
    baslik: b,
    paragraflar: [
      `Understanding the core principles of ${title_en} is essential for success. This guide covers the topic from every angle.`,
      'A data-driven, user-focused and sustainable approach delivers the best results.',
      'A regular analysis and optimization cycle is the key to long-term success.',
    ]
  }))
  return makeRehber(title_tr, title_en, 'Strateji', bols_tr, bols_en)
}

const KAT_RENK = {
  'Teknik':        { bg: '#e0f2fe', color: '#0369a1', accent: '#0ea5e9' },
  'Strateji':      { bg: '#f3e8ff', color: '#7c3aed', accent: '#8b5cf6' },
  'Ölçüm':         { bg: '#dcfce7', color: '#15803d', accent: '#16a34a' },
  'AI & GEO':      { bg: '#eef2ff', color: '#4338ca', accent: '#6366f1' },
  'Ölçüm & İçerik':{ bg: '#fce7f3', color: '#be185d', accent: '#ec4899' },
}

export default function Page(props) {
  const router = useRouter()
  const { slug } = router.query
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')

  const veri = TÜM_REHBERLER[slug] || makeDefault(slug)
  const renk = KAT_RENK[veri.kategori] || { bg: '#f5f5f5', color: '#555', accent: '#888' }
  const bolumler = isEn ? veri.bolumler_en : veri.bolumler_tr
  const baslik = isEn ? veri.baslik_en : veri.baslik_tr

  const [aktifBolum, setAktifBolum] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const observer = new IntersectionObserver(
      entries => { entries.forEach(entry => { if (entry.isIntersecting) { const idx = parseInt(entry.target.id.replace('bolum-', '')); if (!isNaN(idx)) setAktifBolum(idx) } }) },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    const els = document.querySelectorAll('[id^="bolum-"]')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [bolumler, isMobile])

  const canonicalUrl = isEn
    ? `https://fatihemincakiroglu.com/en/guides/${slug}`
    : `https://fatihemincakiroglu.com/rehber/${slug}`

  const TOC = (
    <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #eee', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ width: '12px', height: '12px', background: renk.accent || 'var(--orange)', borderRadius: '3px', display: 'inline-block' }}></span>
        <span style={{ fontSize: '11px', color: '#111', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          {isEn ? 'CONTENTS' : 'İÇİNDEKİLER'}
        </span>
      </div>
      {bolumler.map((b, i) => (
        <a key={i} href={`#bolum-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 10px', borderRadius: '8px', marginBottom: '2px', textDecoration: 'none', background: !isMobile && aktifBolum === i ? `${renk.accent}12` : 'transparent', transition: 'all 0.2s' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, flexShrink: 0, minWidth: '20px', color: !isMobile && aktifBolum === i ? renk.accent : '#ccc' }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: '13px', lineHeight: 1.4, color: !isMobile && aktifBolum === i ? renk.accent : '#555', fontWeight: !isMobile && aktifBolum === i ? 600 : 400 }}>{b.baslik}</span>
        </a>
      ))}
    </div>
  )

  const AuthorCard = (
    <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #eee', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '20px', flexShrink: 0 }}>F</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
          <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? 'SEO Expert · Istanbul' : 'SEO Uzmanı · İstanbul'}</div>
        </div>
      </div>
      <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, marginBottom: '12px' }}>
        {isEn ? '8+ years of SEO and digital marketing expertise.' : '8+ yıl deneyimli SEO ve dijital pazarlama danışmanı.'}
      </p>
      <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>LinkedIn →</a>
    </div>
  )

  const CTACard = (
    <div style={{ background: '#111', borderRadius: '14px', padding: '22px', textAlign: 'center' }}>
      <div style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
        {isEn ? 'FREE CONSULTING' : 'ÜCRETSİZ DANIŞMA'}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#fff', marginBottom: '16px', lineHeight: 1.4 }}>
        {isEn ? 'Want help applying this?' : 'Bu konuda yardım almak ister misiniz?'}
      </h3>
      <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'block', padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
        {isEn ? 'Get in Touch →' : 'İletişime Geç →'}
      </Link>
    </div>
  )

  return (
    <>
      <Head>
        <title>{baslik} | {isEn ? 'SEO Guide' : 'SEO Rehberi'} | Fatih Emin Çakıroğlu</title>
        <meta name="description" content={`${baslik} — ${isEn ? 'Comprehensive guide by Fatih Emin Çakıroğlu. Strategy, technical details and implementation steps.' : 'Fatih Emin Çakıroğlu\'nun hazırladığı kapsamlı rehber. Strateji, teknik detaylar ve uygulama adımları.'}`} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="tr" href={`https://fatihemincakiroglu.com/rehber/${slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://fatihemincakiroglu.com/en/guides/${slug}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json">{JSON.stringify({ "@context":"https://schema.org","@type":"Article","headline":baslik,"author":{"@type":"Person","name":"Fatih Emin Çakıroğlu","url":"https://fatihemincakiroglu.com"},"publisher":{"@type":"Person","name":"Fatih Emin Çakıroğlu"},"url":canonicalUrl,"inLanguage":isEn?"en":"tr" })}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":isEn?"Home":"Ana Sayfa","item":"https://fatihemincakiroglu.com"},{"@type":"ListItem","position":2,"name":isEn?"Guides":"Rehber","item":`https://fatihemincakiroglu.com/${isEn?'en/guides':'rehber'}`},{"@type":"ListItem","position":3,"name":baslik,"item":canonicalUrl}] })}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5', overflowX: 'hidden' }}>

        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '13px', color: '#aaa' }}>
            <Link href="/" style={{ color: '#aaa' }}>{isEn ? 'Home' : 'Ana Sayfa'}</Link>
            <span>›</span>
            <Link href={isEn ? '/en/guides' : '/rehber'} style={{ color: '#aaa' }}>{isEn ? 'Guides' : 'Rehber'}</Link>
            <span>›</span>
            <span style={{ color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{baslik}</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '32px 16px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Link href={isEn ? '/en/guides' : '/rehber'} style={{ fontSize: '13px', color: '#aaa', display: 'inline-block', marginBottom: '16px' }}>
              ← {isEn ? 'All Guides' : 'Tüm Rehberler'}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ padding: '4px 10px', borderRadius: '4px', background: renk.bg, color: renk.color, fontSize: '11px', fontWeight: 700 }}>{veri.kategori}</span>
              <span style={{ fontSize: '12px', color: '#bbb' }}>· {isEn ? 'SEO Guide' : 'SEO Rehberi'}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>{baslik}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>F</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? 'SEO & Digital Marketing Expert' : 'SEO & Dijital Pazarlama Uzmanı'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE: TOC → Article → Author → CTA */}
        {isMobile ? (
          <div style={{ padding: '20px 16px 64px', maxWidth: '1100px', margin: '0 auto' }}>
            {TOC}
            <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #eee', marginBottom: '16px' }}>
              {bolumler.map((b, bi) => (
                <div key={bi} id={`bolum-${bi}`} style={{ marginBottom: bi < bolumler.length - 1 ? '36px' : '0', scrollMarginTop: '80px' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 800, color: '#111', marginBottom: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ width: '3px', minHeight: '18px', background: renk.accent || 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block', marginTop: '3px' }}></span>
                    {b.baslik}
                  </h2>
                  {b.paragraflar.map((p, pi) => (
                    <p key={pi} style={{ color: '#555', fontSize: '15px', lineHeight: 1.8, marginBottom: pi < b.paragraflar.length - 1 ? '12px' : '0' }}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
            {AuthorCard}
            {CTACard}
          </div>
        ) : (
          /* DESKTOP: Sidebar left, article right */
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px 96px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }}>
            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: 'calc(100vh - var(--nav-h) - 48px)', overflowY: 'auto' }}>
              {TOC}
              {AuthorCard}
              {CTACard}
            </div>
            {/* Article */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #eee' }}>
              {bolumler.map((b, bi) => (
                <div key={bi} id={`bolum-${bi}`} style={{ marginBottom: bi < bolumler.length - 1 ? '44px' : '0', scrollMarginTop: '90px' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '4px', minHeight: '20px', background: renk.accent || 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block', marginTop: '3px' }}></span>
                    {b.baslik}
                  </h2>
                  {b.paragraflar.map((p, pi) => (
                    <p key={pi} style={{ color: '#555', fontSize: '15px', lineHeight: 1.85, marginBottom: pi < b.paragraflar.length - 1 ? '14px' : '0' }}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
