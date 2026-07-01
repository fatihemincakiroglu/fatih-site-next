import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';

const ICERIKLER = {
  'core-web-vitals-2025': {
    baslik_tr: 'Core Web Vitals 2025: LCP, INP ve CLS Optimizasyon Rehberi',
    baslik_en: 'Core Web Vitals 2025: Complete LCP, INP and CLS Optimization Guide',
    etiket: 'Teknik SEO', sure: '12',
    bolumler_tr: [
      { baslik: 'Core Web Vitals Nedir ve Neden Önemlidir?', paragraflar: ['Core Web Vitals, Google\'ın Mayıs 2021\'den itibaren resmi sıralama faktörü olarak kullandığı kullanıcı deneyimi metrikleridir. Üç temel ölçütten oluşur: LCP (Largest Contentful Paint), INP (Interaction to Next Paint) ve CLS (Cumulative Layout Shift). Bu metrikler, sitenizin kullanıcılar için gerçekte nasıl bir deneyim sunduğunu ölçmek amacıyla tasarlanmıştır.', 'Google Search Console\'daki Core Web Vitals raporu, sitenizin bu metriklerde gerçek dünya kullanıcı verisine dayalı performansını gösterir. Bu veriler, PageSpeed Insights\'ın lab verilerinden farklı olarak gerçek kullanıcı tarayıcılarından toplanan Chrome User Experience Report (CrUX) verilerine dayanır.', 'Teknik açıdan mükemmel bir sitenin bile zayıf CWV skorları nedeniyle rakiplerinin gerisinde kalabileceği anlamına gelen bu durum, her SEO stratejisinin ayrılmaz bir parçası haline gelmiştir.'] },
      { baslik: 'LCP Optimizasyonu: En Büyük İçerikli Boyama', paragraflar: ['LCP, sayfanın görünür alanındaki en büyük içerik öğesinin yüklenme süresini ölçer. İdeal LCP süresi 2,5 saniyenin altında olmalıdır. 2,5-4 saniye arası geliştirme gerektirir, 4 saniye üstü ise zayıf kategorisindedir.', 'LCP\'yi iyileştirmenin en etkili yolları: LCP öğesi genellikle hero görseli olduğundan bu görseli preload etmek kritiktir. Ek olarak, sunucu yanıt süresini azaltmak için CDN kullanımı ve sunucu optimizasyonu yapılmalıdır.', 'Görsel optimizasyonu LCP\'nin en kritik boyutudur. WebP veya AVIF formatına geçiş, doğru boyutlandırma ve lazy loading\'in yalnızca görünür alanın dışındaki görsellere uygulanması temel önlemlerdir.'] },
      { baslik: 'INP Optimizasyonu: Etkileşim Performansı', paragraflar: ['INP (Interaction to Next Paint), Mart 2024\'te FID\'in yerini alarak Core Web Vitals\'ın etkileşim metriği oldu. INP, bir sayfadaki tüm tıklama, dokunma ve klavye etkileşimlerini ölçer. İyi INP 200ms altında, zayıf INP ise 500ms üstündedir.', 'Ana thread blokajı INP sorunlarının birincil nedenidir. Uzun JavaScript görevlerini tespit etmek ve parçalamak için Chrome DevTools\'daki Performance paneli kullanılabilir.', 'Third-party scriptler INP sorunlarının sıkça görülen kaynağıdır. Bu scriptlerin yükleme stratejisini async veya defer ile optimize etmek INP\'yi dramatik biçimde iyileştirebilir.'] },
      { baslik: 'CLS Optimizasyonu: Kümülatif Layout Kayması', paragraflar: ['CLS, sayfa yüklenirken içeriklerin ne kadar beklenmedik biçimde yer değiştirdiğini ölçer. 0,1\'in altındaki skorlar iyi, 0,25 üstü ise zayıf kabul edilir.', 'CLS\'nin en yaygın nedeni boyutları belirtilmemiş görsel ve video öğeleridir. HTML\'de width ve height attribute\'larını belirtmek veya CSS\'de aspect-ratio kullanmak büyük CLS sorunlarını çözebilir.', 'Web fontları ve geç yüklenen reklamlar da önemli CLS kaynakları arasındadır. font-display: swap stratejisi ve reklam alanları için minimum boyut rezervasyonu da CLS\'yi azaltır.'] },
      { baslik: 'CWV Ölçme ve İzleme Araçları', paragraflar: ['Core Web Vitals verilerini ölçmek için birden fazla araç kullanılmalıdır. PageSpeed Insights, hem lab hem field verilerini sunar. Search Console\'daki Core Web Vitals raporu ise sitenizin tamamı için alan bazlı veri sağlar.', 'Chrome DevTools\'daki Lighthouse paneli geliştirme ortamında anlık testler yaparken kullanılabilir. Web Vitals Chrome uzantısı ise gerçek zamanlı metrik izleme için pratik bir araçtır.', 'Sürekli izleme için SpeedCurve veya Sentry Performance gibi araçlar kullanılabilir. Bu araçlar, performans regresyonlarını anında tespit etmenizi sağlar.'] },
      { baslik: 'Sektöre Göre CWV Stratejisi', paragraflar: ['E-ticaret siteleri için LCP genellikle ürün görselleri tarafından belirlenir. Yüksek çözünürlüklü ürün fotoğraflarını CDN üzerinden sunmak, WebP dönüşümü yapmak öncelikli adımlardır.', 'Haber ve blog siteleri için CLS kritik bir sorun olabilir. Reklam alanlarının dinamik yüklenmesi ve sosyal medya widget\'ları CLS\'nin başlıca kaynaklarıdır.', 'SaaS ve kurumsal siteler genellikle third-party script yoğunluğu nedeniyle INP sorunuyla karşılaşır. Kritik olmayan scriptleri kullanıcı etkileşiminden sonra yüklemek önemli INP kazanımları sağlar.'] },
    ],
    bolumler_en: [
      { baslik: 'What Are Core Web Vitals and Why Do They Matter?', paragraflar: ['Core Web Vitals are user experience metrics that Google has used as an official ranking factor since May 2021. They consist of three key measures: LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift).', 'The Core Web Vitals report in Google Search Console shows your site\'s performance on these metrics based on real-world user data. These are collected from real user browsers through the Chrome User Experience Report (CrUX).', 'Even a technically perfect site can fall behind competitors due to poor CWV scores, making this an integral part of every SEO strategy.'] },
      { baslik: 'LCP Optimization: Largest Contentful Paint', paragraflar: ['LCP measures how long it takes for the largest content element in the visible area to load. Ideal LCP is under 2.5 seconds. Between 2.5-4 seconds needs improvement; above 4 seconds is poor.', 'The most effective ways to improve LCP: Since the LCP element is often a hero image, preloading it is critical. Additionally, use a CDN and server optimization to reduce server response time (TTFB).', 'Image optimization is the most critical dimension of LCP. Switching to WebP or AVIF format, proper sizing, and ensuring lazy loading is only applied to images outside the viewport are fundamental measures.'] },
      { baslik: 'INP Optimization: Interaction Performance', paragraflar: ['INP (Interaction to Next Paint) replaced FID as Core Web Vitals\'s interaction metric in March 2024. INP measures all click, touch, and keyboard interactions on a page. Good INP is under 200ms; poor INP is above 500ms.', 'Main thread blocking is the primary cause of INP issues. Use the Performance panel in Chrome DevTools to identify and break up long JavaScript tasks.', 'Third-party scripts are a frequent source of INP issues. Optimizing loading strategy with async or defer can dramatically improve INP.'] },
      { baslik: 'CLS Optimization: Cumulative Layout Shift', paragraflar: ['CLS measures how much content unexpectedly shifts position while a page loads. Scores below 0.1 are good; above 0.25 is poor.', 'The most common CLS cause is images and videos without specified dimensions. Specifying width and height attributes in HTML or using CSS aspect-ratio lets the browser reserve space.', 'Web fonts and late-loading ads are also significant CLS sources. The font-display: swap strategy and reserving minimum dimensions for ad slots also reduces CLS.'] },
      { baslik: 'CWV Measurement and Monitoring Tools', paragraflar: ['Multiple tools should be used to measure Core Web Vitals data. PageSpeed Insights provides both lab and field data. The Core Web Vitals report in Search Console provides field data for your entire site.', 'The Lighthouse panel in Chrome DevTools is useful for instant tests. The Web Vitals Chrome extension is a practical tool for real-time metric monitoring.', 'For continuous monitoring, tools like SpeedCurve or Sentry Performance can be used to instantly detect performance regressions.'] },
      { baslik: 'CWV Strategy by Industry', paragraflar: ['For e-commerce sites, LCP is usually determined by product images. Serving high-resolution product photos via CDN and converting to WebP are priority steps.', 'For news and blog sites, CLS can be a critical issue. Dynamically loading ad units and social media widgets are the main CLS sources.', 'SaaS and enterprise sites often face INP issues due to third-party script density. Loading non-critical scripts after user interaction provides significant INP gains.'] },
    ],
  },
  'seo-ajansi-nasil-secilir': {
    baslik_tr: "SEO Ajansı Nasıl Seçilir? Kriterler ve Türkiye'den Örnekler",
    baslik_en: 'How to Choose an SEO Agency: Criteria and Examples from Turkey',
    meta_desc_tr: "SEO ajansı seçerken hangi kriterlere bakılmalı? Türkiye'de bilinen SEO ajanslarından alfabetik, tarafsız bir liste ve pratik bir seçim rehberi.",
    meta_desc_en: 'What to look for when choosing an SEO agency — an alphabetical, unranked overview of well-known SEO agencies in Turkey plus a practical selection guide.',
    etiket: 'Strateji', sure: '9',
    bolumler_tr: [
      { baslik: 'Neden Bir SEO Ajansıyla Çalışmalısınız?', paragraflar: [
        "Reklam maliyetlerinin yükselmesi ve kullanıcıların arama motorlarına olan bağımlılığının artması, organik görünürlüğü işletmeler için giderek daha kritik hale getiriyor. SEO, tek seferlik bir proje değil; teknik altyapı, içerik ve otorite sinyallerinin sürekli yönetildiği uzun soluklu bir çalışma alanı.",
        "Bu nedenle birçok marka, süreci kendi bünyesinde yönetmek yerine bu alanda uzmanlaşmış bir ajansla veya bağımsız bir danışmanla çalışmayı tercih ediyor. Doğru seçim, hem zamandan hem de bütçeden tasarruf ettirirken sürdürülebilir bir organik büyüme sağlayabilir.",
      ]},
      { baslik: 'SEO Ajansı Seçerken Nelere Dikkat Edilmeli?', paragraflar: [
        "Bir ajansı değerlendirirken bakılması gereken ilk şey, geçmiş projelerdeki somut sonuçlardır. Vaka çalışmaları, referanslar ve ölçülebilir metrikler (organik trafik artışı, sıralanan anahtar kelime sayısı gibi) iddiaların gerçekliğini test etmenin en güvenilir yoludur.",
        "Sektör deneyimi de göz ardı edilmemesi gereken bir kriterdir. E-ticaret, sağlık, B2B veya yerel hizmet gibi alanların her biri farklı teknik ve içerik yaklaşımları gerektirir; sizin sektörünüzde çalışmış bir ekip, öğrenme eğrisini kısaltır.",
        "Şeffaflık da en az bunlar kadar önemlidir: aylık raporlamanın ne içerdiği, hangi metriklerin takip edildiği ve stratejinin nasıl güncellendiği net olmalı. Sözleşme şartlarını, minimum taahhüt süresini ve fiyatlandırma modelini (aylık retainer, proje bazlı, performans bazlı) başlangıçta netleştirmek ileride yaşanabilecek belirsizlikleri önler.",
        "Son olarak, hesabınızın kim tarafından yönetileceğini sorun. Büyük ajanslarda bazen satış sürecinde görüştüğünüz kişi ile projeyi yürüten ekip farklı olabilir; bu durumun sizin için ne anlama geldiğini değerlendirin.",
      ]},
      { baslik: "Türkiye'de Bilinen SEO Ajanslarından Örnekler", paragraflar: [
        "Aşağıdaki liste, kamuya açık bilgilerden derlenmiştir, alfabetik sıradadır ve herhangi bir sıralama veya öneri iddiası taşımaz. Amaç, araştırma sürecinizde başlangıç noktası olabilecek bilinen isimleri bir arada sunmaktır — nihai değerlendirme yukarıdaki kriterlere göre size aittir.",
      ], linkler: [
        { isim: 'Adsera', aciklama: "2018'de kurulan, SEO'yu performans pazarlama ve dönüşüm optimizasyonuyla birlikte ele alan İstanbul merkezli bir ajans.", url: 'https://adsera.co' },
        { isim: 'Adverpeak', aciklama: "SEO, Google Ads, sosyal medya ve web tasarımını bir arada sunan; sağlık turizmi ve B2B gibi sektörlerde referansları olan İstanbul merkezli bir ajans.", url: 'https://www.adverpeak.com' },
        { isim: 'Analytica House', aciklama: "2016'da kurulan, SEO çalışmalarını GA4 ve BigQuery gibi analitik entegrasyonlarla destekleyen İstanbul merkezli bir ajans.", url: 'https://www.analyticahouse.com' },
        { isim: 'Aora Digital Agency', aciklama: "2008'den beri hizmet veren, SEO'nun yanı sıra web ve mobil uygulama tasarımı da sunan İstanbul merkezli bir ajans.", url: 'https://www.aora.com.tr' },
        { isim: 'Crabs Media', aciklama: "2007'de kurulan, teknik SEO ve GEO odaklı çalışmalar yürüten İstanbul merkezli bir ajans.", url: 'https://www.crabsmedia.com' },
        { isim: 'Cremicro', aciklama: "2013'te kurulan, çok dilli ekibiyle uluslararası SEO projelerine de danışmanlık veren İstanbul merkezli bir ajans.", url: 'https://www.cremicro.com' },
        { isim: 'Kriko', aciklama: "2017'de kurulan, e-ticaret SEO'suna odaklanan İstanbul merkezli bir ajans.", url: 'https://www.kriko.io' },
        { isim: 'Magna Dijital', aciklama: "2015'te kurulan, SEO'yu performans pazarlama kampanyalarıyla birlikte yöneten İstanbul merkezli bir ajans.", url: 'https://www.magnadijital.com.tr' },
        { isim: 'Mobitek', aciklama: "2003'te kurulan, mobil uygulama SEO'su ve App Store görünürlüğü (ASO) konularında uzmanlaşmış İstanbul merkezli bir ajans.", url: 'https://www.mobitek.com' },
        { isim: 'Mosanta', aciklama: "Teknik SEO ve organik trafik optimizasyonuna odaklanan, e-ticaret ve B2B alanlarında deneyimli İstanbul merkezli bir ajans.", url: 'https://www.mosanta.com' },
        { isim: 'Oppmind', aciklama: "2023'te kurulan, teknik site optimizasyonu ve anahtar kelime haritalamasına odaklanan görece yeni bir İstanbul ajansı.", url: 'https://www.oppmind.com' },
        { isim: 'Sempeak', aciklama: "2012'de kurulan, çok dilli SEO ve kurumsal site yapılandırmalarında deneyimli İstanbul merkezli bir ajans.", url: 'https://www.sempeak.com' },
        { isim: 'Stradiji', aciklama: "2009'da kurulan, SEO'yu uzun vadeli bir büyüme stratejisi olarak konumlandıran butik bir İstanbul ajansı.", url: 'https://www.stradiji.com' },
        { isim: 'Webtures', aciklama: "2011'de kurulan, kullanıcı deneyimi ve dönüşüm oranı optimizasyonunu SEO ile birlikte ele alan İstanbul merkezli bir ajans.", url: 'https://www.webtures.com' },
        { isim: 'ZEO', aciklama: "2012'de kurulan, teknik SEO ve yapısal veri (schema) uygulamalarıyla tanınan Ankara/İstanbul merkezli bir ajans.", url: 'https://zeo.org' },
      ]},
      { baslik: 'Diğer Bilinen İsimler', paragraflar: [
        "Kamuya açık bir web sitesi adresine bu araştırma sırasında ulaşamadığımız için doğrudan bağlantı vermediğimiz, ancak sektörde adı geçen diğer ajanslar arasında Digipeak Agency, GroupM Türkiye, Netvent, ROIBLE, Sıradışı Digital, Türk SEM ve Webonya da yer alıyor.",
      ]},
      { baslik: 'Sonuç Olarak Karar Size Ait', paragraflar: [
        "Bu liste bir tavsiye ya da sıralama değil, araştırmanıza başlangıç noktası olması amaçlanan bilgilendirici bir derlemedir. Her ajansın güçlü olduğu alan farklıdır; sizin için doğru olan, kendi hedefleriniz, bütçeniz ve sektörünüzle en iyi örtüşen ekiptir.",
        "Karar vermeden önce en az iki veya üç ajansla görüşüp aynı soruları sormanızı, referanslarını doğrulamanızı ve teklif edilen stratejinin sizin iş hedeflerinizle ne kadar örtüştüğünü değerlendirmenizi öneririm.",
      ]},
    ],
    bolumler_en: [
      { baslik: 'Why Work with an SEO Agency?', paragraflar: [
        "Rising ad costs and growing dependence on search engines are making organic visibility increasingly critical for businesses. SEO isn't a one-time project — it's an ongoing effort where technical foundation, content and authority signals all need continuous management.",
        "For this reason, many brands choose to work with a specialized agency or an independent consultant rather than managing the process entirely in-house. The right choice can save both time and budget while delivering sustainable organic growth.",
      ]},
      { baslik: 'What to Look for When Choosing an SEO Agency', paragraflar: [
        "The first thing to evaluate is concrete results from past projects. Case studies, testimonials and measurable metrics — like organic traffic growth or the number of ranking keywords — are the most reliable way to test any claim.",
        "Industry experience also matters. E-commerce, healthcare, B2B and local service businesses each require different technical and content approaches; a team that has already worked in your industry shortens the learning curve.",
        "Transparency is just as important: what monthly reporting actually covers, which metrics are tracked, and how strategy gets adjusted should all be clear upfront. Clarifying contract terms, minimum commitment periods and the pricing model (monthly retainer, project-based, performance-based) early on prevents ambiguity later.",
        "Finally, ask who will actually manage your account. At larger agencies, the person you speak with during sales isn't always the person running your project — it's worth understanding what that means for you.",
      ]},
      { baslik: 'Examples of Well-Known SEO Agencies in Turkey', paragraflar: [
        "The list below is compiled from publicly available information, presented in alphabetical order, and makes no ranking or recommendation claim of any kind. The goal is simply to give you a starting point for your own research — the final evaluation is yours, based on the criteria above.",
      ], linkler: [
        { isim: 'Adsera', aciklama: 'Founded in 2018, an Istanbul-based agency that combines SEO with performance marketing and conversion optimization.', url: 'https://adsera.co' },
        { isim: 'Adverpeak', aciklama: 'An Istanbul-based agency offering SEO, Google Ads, social media and web design, with references in sectors like health tourism and B2B.', url: 'https://www.adverpeak.com' },
        { isim: 'Analytica House', aciklama: 'Founded in 2016, an Istanbul-based agency that supports SEO work with analytics integrations like GA4 and BigQuery.', url: 'https://www.analyticahouse.com' },
        { isim: 'Aora Digital Agency', aciklama: 'Operating since 2008, an Istanbul-based agency offering SEO alongside web and mobile app design.', url: 'https://www.aora.com.tr' },
        { isim: 'Crabs Media', aciklama: 'Founded in 2007, an Istanbul-based agency focused on technical SEO and GEO-oriented work.', url: 'https://www.crabsmedia.com' },
        { isim: 'Cremicro', aciklama: 'Founded in 2013, an Istanbul-based agency whose multilingual team also advises on international SEO projects.', url: 'https://www.cremicro.com' },
        { isim: 'Kriko', aciklama: 'Founded in 2017, an Istanbul-based agency focused on e-commerce SEO.', url: 'https://www.kriko.io' },
        { isim: 'Magna Dijital', aciklama: 'Founded in 2015, an Istanbul-based agency that manages SEO alongside performance marketing campaigns.', url: 'https://www.magnadijital.com.tr' },
        { isim: 'Mobitek', aciklama: 'Founded in 2003, an Istanbul-based agency specialized in mobile app SEO and App Store Optimization (ASO).', url: 'https://www.mobitek.com' },
        { isim: 'Mosanta', aciklama: 'An Istanbul-based agency focused on technical SEO and organic traffic optimization, with experience in e-commerce and B2B.', url: 'https://www.mosanta.com' },
        { isim: 'Oppmind', aciklama: 'Founded in 2023, a relatively new Istanbul agency focused on technical site optimization and keyword mapping.', url: 'https://www.oppmind.com' },
        { isim: 'Sempeak', aciklama: 'Founded in 2012, an Istanbul-based agency experienced in multilingual SEO and enterprise site structuring.', url: 'https://www.sempeak.com' },
        { isim: 'Stradiji', aciklama: 'Founded in 2009, a boutique Istanbul agency that positions SEO as a long-term growth strategy.', url: 'https://www.stradiji.com' },
        { isim: 'Webtures', aciklama: 'Founded in 2011, an Istanbul-based agency that pairs SEO with user experience and conversion rate optimization.', url: 'https://www.webtures.com' },
        { isim: 'ZEO', aciklama: 'Founded in 2012, an Ankara/Istanbul-based agency known for technical SEO and structured data (schema) work.', url: 'https://zeo.org' },
      ]},
      { baslik: 'Other Known Names', paragraflar: [
        "Other agencies mentioned in the industry that we haven't linked directly, since we weren't able to find a public website for them during this research, include Digipeak Agency, GroupM Turkey, Netvent, ROIBLE, Sıradışı Digital, Türk SEM and Webonya.",
      ]},
      { baslik: 'The Decision Is Yours', paragraflar: [
        "This list isn't a recommendation or a ranking — it's an informational starting point for your own research. Every agency has different strengths; the right one for you is whichever team best matches your goals, budget and industry.",
        "Before deciding, I'd recommend speaking with at least two or three agencies, asking them the same questions, verifying their references, and evaluating how closely their proposed strategy actually aligns with your business goals.",
      ]},
    ],
  },
}

function getDefaultContent(slug, isEn) {
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  return {
    bolumler: [
      { baslik: isEn ? `Introduction to ${title}` : `${title} Hakkında Giriş`, paragraflar: [
        isEn ? `This comprehensive guide covers everything you need to know about ${title}. As search engines evolve and AI systems become more prevalent in search, understanding this topic is increasingly important for digital marketing professionals.` : `Bu kapsamlı rehber, ${title} hakkında bilmeniz gereken her şeyi ele almaktadır. Arama motorları evrimleşirken bu konuyu anlamak dijital pazarlama profesyonelleri için giderek daha önemli hale gelmektedir.`,
        isEn ? 'The fundamentals of this topic have changed significantly in recent years. What worked in 2020 may not work the same way in 2025. Staying current with best practices is essential for maintaining and growing organic visibility.' : 'Bu konunun temelleri son yıllarda önemli ölçüde değişti. 2020\'de işe yarayan şeyler 2025\'te aynı şekilde çalışmayabilir.',
        isEn ? 'In this guide, we will walk through the most important concepts, practical implementation steps, and measurement strategies.' : 'Bu rehberde en önemli kavramları, pratik uygulama adımlarını ve ölçüm stratejilerini inceleyeceğiz.',
      ]},
      { baslik: isEn ? 'Core Concepts and Principles' : 'Temel Kavramlar', paragraflar: [
        isEn ? 'Understanding the core principles is essential before diving into tactics. The foundation relies on three pillars: technical soundness, content quality, and authority signals.' : 'Taktiklere dalmadan önce temel prensipleri anlamak şarttır. Temel üç sütuna dayanır: teknik sağlamlık, içerik kalitesi ve otorite sinyalleri.',
        isEn ? 'Each pillar must be addressed systematically. Neglecting any one creates weaknesses that undermine overall performance.' : 'Her sütun sistematik olarak ele alınmalıdır. Herhangi birini ihmal etmek genel performansı zayıflatır.',
        isEn ? 'Early investments in technical infrastructure and content quality pay dividends as your site grows in authority.' : 'Teknik altyapı ve içerik kalitesine yapılan erken yatırımlar, site otoritesi büyüdükçe kazanımlar sağlar.',
      ]},
      { baslik: isEn ? 'Implementation Strategy' : 'Uygulama Stratejisi', paragraflar: [
        isEn ? 'A phased implementation approach is typically most effective. Start with a comprehensive audit to understand your current baseline.' : 'Aşamalı uygulama yaklaşımı en etkili yoldur. Mevcut durumu anlamak için kapsamlı bir denetimle başlayın.',
        isEn ? 'Track your progress with meaningful metrics from day one. Focus on metrics that directly reflect your business goals.' : 'İlk günden itibaren anlamlı metriklerle ilerlemenizi takip edin. İş hedeflerinizi doğrudan yansıtan metriklere odaklanın.',
        isEn ? 'Regular reporting and strategy adjustments are crucial. Build review cycles into your process.' : 'Düzenli raporlama ve strateji ayarlamaları kritiktir. Sürecinize inceleme döngüleri ekleyin.',
      ]},
      { baslik: isEn ? 'Measurement and KPIs' : 'Ölçüm ve KPI\'lar', paragraflar: [
        isEn ? 'Defining the right KPIs is critical. A combination of leading indicators and lagging indicators provides the most complete picture.' : 'Doğru KPI\'ları tanımlamak kritiktir. Öncü göstergeler ve gecikmiş göstergeler kombinasyonu en eksiksiz tabloyu sağlar.',
        isEn ? 'Google Search Console and GA4 are foundational tools for measurement.' : 'Google Search Console ve GA4, ölçüm için temel araçlardır.',
        isEn ? 'Set realistic benchmarks. SEO is a long-term investment — typical timelines range from 3-6 months for technical fixes to 6-12 months for content-driven growth.' : 'Gerçekçi referans noktaları belirleyin. SEO uzun vadeli yatırımdır — teknik düzeltmeler 3-6 ay, içerik odaklı büyüme 6-12 ay sürer.',
      ]},
      { baslik: isEn ? 'Advanced Techniques' : 'İleri Düzey Teknikler', paragraflar: [
        isEn ? 'Once the fundamentals are in place, advanced techniques can provide additional competitive advantage including entity optimization for AI search visibility.' : 'Temel unsurlar yerleştikten sonra, gelişmiş teknikler ek rekabetçi avantaj sağlayabilir: AI arama görünürlüğü için entity optimizasyonu.',
        isEn ? 'Competitive intelligence is another advanced area. Systematically monitoring competitor strategies identifies gaps you can fill.' : 'Rakibetçi istihbarat başka bir gelişmiş alandır. Rakip stratejilerini sistematik olarak izlemek doldurulabilecek boşlukları ortaya çıkarır.',
        isEn ? 'AI tools integrated into your workflow can create efficiency gains that let you do more with the same resources.' : 'AI araçlarının iş akışınıza entegrasyonu aynı kaynaklarla daha fazlasını yapmanızı sağlayan verimlilik kazanımları yaratır.',
      ]},
      { baslik: isEn ? 'Common Mistakes to Avoid' : 'Yapılan Yaygın Hatalar', paragraflar: [
        isEn ? 'Even experienced professionals make avoidable mistakes: focusing on vanity metrics instead of business outcomes, neglecting mobile optimization, treating technical SEO as one-time work.' : 'Deneyimli profesyoneller bile kaçınılabilir hatalar yapar: boş metrikler, mobil optimizasyonu ihmal etmek, teknik SEO\'yu tek seferlik görmek.',
        isEn ? 'Content mistakes include creating content for search engines rather than users and not matching content to search intent.' : 'İçerik hataları arasında kullanıcılar yerine arama motorları için içerik üretmek ve arama niyetiyle eşleşmemek yer alır.',
        isEn ? 'Link building mistakes remain costly. Buying links or participating in link schemes can result in manual penalties difficult to recover from.' : 'Link inşa hataları maliyetli olmaya devam ediyor. Link satın almak manuel cezalara yol açabilir.',
      ]},
    ]
  }
}

export default function BlogPost(props) {
  const router = useRouter()
  const { slug } = router.query
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifBolum, setAktifBolum] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const veri = ICERIKLER[slug]
  const baslik = veri ? (isEn ? veri.baslik_en : veri.baslik_tr) : slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const bolumler = veri ? (isEn ? veri.bolumler_en : veri.bolumler_tr) : getDefaultContent(slug || '', isEn).bolumler
  const metaDesc = veri && (isEn ? veri.meta_desc_en : veri.meta_desc_tr)
    ? (isEn ? veri.meta_desc_en : veri.meta_desc_tr)
    : bolumler[0]?.paragraflar[0]?.substring(0, 155) + '...'
  const etiket = veri?.etiket || 'SEO'
  const sure = veri?.sure || '10'
  const canonicalUrl = `https://fatihemincakiroglu.com/${isEn ? 'en/blog/' : 'blog/'}${slug}`

  useEffect(() => {
    if (isMobile) return
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) { const idx = parseInt(entry.target.id.replace('bolum-', '')); if (!isNaN(idx)) setAktifBolum(idx) } }) },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    const els = document.querySelectorAll('[id^="bolum-"]')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [bolumler, isMobile])

  if (!slug) return null

  const TOC = (
    <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #eee', marginBottom: isMobile ? '24px' : '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ width: '12px', height: '12px', background: 'var(--orange)', borderRadius: '3px', display: 'inline-block' }}></span>
        <span style={{ fontSize: '11px', color: '#111', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{isEn ? 'CONTENTS' : 'İÇİNDEKİLER'}</span>
      </div>
      {bolumler.map((b, i) => (
        <a key={i} href={`#bolum-${i}`}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 10px', borderRadius: '8px', marginBottom: '2px', textDecoration: 'none', background: !isMobile && aktifBolum === i ? 'rgba(232,86,10,0.08)' : 'transparent' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, flexShrink: 0, color: !isMobile && aktifBolum === i ? 'var(--orange)' : '#ccc', minWidth: '20px' }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: '13px', lineHeight: 1.4, color: !isMobile && aktifBolum === i ? 'var(--orange)' : '#555', fontWeight: !isMobile && aktifBolum === i ? 600 : 400 }}>{b.baslik}</span>
        </a>
      ))}
    </div>
  )

  const AuthorCard = (
    <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #eee', marginTop: isMobile ? '24px' : '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '20px', flexShrink: 0 }}>F</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
          <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? 'SEO Expert · Istanbul' : 'SEO Uzmanı · İstanbul'}</div>
        </div>
      </div>
      <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, marginBottom: '12px' }}>{isEn ? '8+ years of SEO and digital marketing expertise.' : '8+ yıl deneyimli SEO ve dijital pazarlama danışmanı.'}</p>
      <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>LinkedIn →</a>
    </div>
  )

  const CTACard = (
    <div style={{ background: '#111', borderRadius: '14px', padding: '22px', textAlign: 'center', marginTop: isMobile ? '24px' : '16px' }}>
      <div style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>{isEn ? 'FREE CONSULTING' : 'ÜCRETSİZ DANIŞMA'}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#fff', marginBottom: '16px', lineHeight: 1.4 }}>{isEn ? 'Want help with this topic?' : 'Bunu uygulamak ister misiniz?'}</h3>
      <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'block', padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>{isEn ? 'Get in Touch →' : 'İletişime Geç →'}</Link>
    </div>
  )

  return (
    <>
      <Head>
        <title>{baslik} | Fatih Emin Çakıroğlu</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="tr" href={`https://fatihemincakiroglu.com/blog/${slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://fatihemincakiroglu.com/en/blog/${slug}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{isEn ? 'Home' : 'Ana Sayfa'}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/blog' : '/blog'} style={{ color: '#aaa', fontSize: '13px' }}>Blog</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>{baslik}</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '32px 16px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '3px 8px', border: '1px solid rgba(232,86,10,0.3)', borderRadius: '4px' }}>{etiket}</span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>{sure} {isEn ? 'min read' : 'dk okuma'}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>{baslik}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>F</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? 'SEO Expert · Istanbul' : 'SEO Uzmanı · İstanbul'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE: TOC → Article → Author → CTA */}
        {isMobile ? (
          <div style={{ padding: '20px 16px 64px', maxWidth: '1100px', margin: '0 auto' }}>
            {TOC}
            <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #eee' }}>
              {bolumler.map((b, bi) => (
                <div key={bi} id={`bolum-${bi}`} style={{ marginBottom: bi < bolumler.length - 1 ? '36px' : '0', scrollMarginTop: '80px' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '3px', height: '18px', background: 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block' }}></span>{b.baslik}
                  </h2>
                  {b.paragraflar.map((p, pi) => (
                    <p key={pi} style={{ color: '#555', fontSize: '15px', lineHeight: 1.8, marginBottom: pi < b.paragraflar.length - 1 ? '14px' : (b.linkler ? '18px' : '0') }}>{p}</p>
                  ))}
                  {b.linkler && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                      {b.linkler.map((l, li) => (
                        <div key={li} style={{ background: '#faf9f7', border: '1px solid #ede8e0', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                          <div style={{ flex: 1, minWidth: '200px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '2px' }}>{l.isim}</div>
                            <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.5 }}>{l.aciklama}</div>
                          </div>
                          {l.url && (
                            <a href={l.url} target="_blank" rel="nofollow noopener noreferrer" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: '2px' }}>
                              {isEn ? 'Visit site →' : 'Siteyi ziyaret et →'}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {AuthorCard}
            {CTACard}
          </div>
        ) : (
          /* DESKTOP: 2-col layout */
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px 96px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '32px', alignItems: 'start' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #eee' }}>
              {bolumler.map((b, bi) => (
                <div key={bi} id={`bolum-${bi}`} style={{ marginBottom: bi < bolumler.length - 1 ? '44px' : '0', scrollMarginTop: '90px' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '4px', height: '20px', background: 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block' }}></span>{b.baslik}
                  </h2>
                  {b.paragraflar.map((p, pi) => (
                    <p key={pi} style={{ color: '#555', fontSize: '15px', lineHeight: 1.85, marginBottom: pi < b.paragraflar.length - 1 ? '14px' : (b.linkler ? '18px' : '0') }}>{p}</p>
                  ))}
                  {b.linkler && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                      {b.linkler.map((l, li) => (
                        <div key={li} style={{ background: '#faf9f7', border: '1px solid #ede8e0', borderRadius: '10px', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>{l.isim}</div>
                          <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.5, flex: 1 }}>{l.aciklama}</div>
                          {l.url && (
                            <a href={l.url} target="_blank" rel="nofollow noopener noreferrer" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)' }}>
                              {isEn ? 'Visit site →' : 'Siteyi ziyaret et →'}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TOC}
              {AuthorCard}
              {CTACard}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
