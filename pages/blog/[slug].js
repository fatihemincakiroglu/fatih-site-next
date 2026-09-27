import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { YAZILAR } from '../blog';
import { YAYINDAKI_BLOG_SLUGS } from '../../lib/content-index';

const ICERIKLER = {
  'core-web-vitals-2025': {
    baslik_tr: 'Core Web Vitals 2026: LCP, INP ve CLS Optimizasyon Rehberi',
    baslik_en: 'Core Web Vitals 2026: Complete LCP, INP and CLS Optimization Guide',
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
  'turkiye-en-iyi-15-seo-ajansi-2026': {
    baslik_tr: "Türkiye'nin En İyi 15 SEO Ajansı - Güncel 2026",
    baslik_en: "Turkey's Best 15 SEO Agencies - Updated 2026",
    meta_desc_tr: "Türkiye'de tanınan 15 SEO ajansına alfabetik, sıralama içermeyen bir bakış. 2026 güncel liste, seçim kriterleri ve her ajansın web sitesine link.",
    meta_desc_en: "An alphabetical, unranked overview of 15 well-known SEO agencies in Turkey. Updated for 2026, with selection criteria and links to each agency's site.",
    etiket: 'Strateji', sure: '10',
    bolumler_tr: [
      { baslik: "Türkiye'de SEO Ajansı Piyasası Neden Büyüyor?", paragraflar: [
        "Dijital kanallar, Türkiye'deki işletmeler için yalnızca marka bilinirliği sağlayan bir alan olmaktan çıkarak doğrudan satış, müşteri kazanımı ve büyümenin önemli parçalarından biri haline geldi. Bu dönüşümle birlikte markaların Google ve diğer arama platformlarında görünür olma ihtiyacı da giderek daha stratejik bir konuya dönüşüyor.",
        "SEO (Search Engine Optimization), yani arama motoru optimizasyonu, uzun süredir markaların Google gibi arama motorlarından organik trafik elde etmesini sağlayan temel dijital pazarlama disiplinlerinden biri. Ancak 2026 itibarıyla arama dünyası yalnızca klasik Google sonuçlarından oluşmuyor.",
        "Google'ın AI Overviews ve AI Mode gibi yapay zekâ destekli arama deneyimlerini Türkiye'ye açmasıyla birlikte kullanıcıların bilgiye ulaşma biçimi de değişmeye başladı. Kullanıcılar artık yalnızca kısa anahtar kelimelerle arama yapmak yerine daha uzun sorular sorabiliyor, karşılaştırmalar yapabiliyor ve yapay zekâ tarafından oluşturulan yanıtlar üzerinden markaları keşfedebiliyor.",
        "Bu değişim SEO'nun kapsamını da genişletiyor. Teknik SEO, içerik optimizasyonu, site içi SEO ve bağlantı geliştirme gibi klasik çalışmaların yanında GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), yapısal veri, entity optimizasyonu ve AI görünürlüğü gibi alanlar giderek daha fazla önem kazanıyor.",
        "Bu nedenle işletmeler açısından doğru SEO ajansını seçmek artık yalnızca Google'da belirli kelimelerde üst sıralara çıkmak anlamına gelmiyor. İyi planlanmış bir organik büyüme stratejisinin teknik SEO, içerik stratejisi, anahtar kelime ve arama niyeti analizi, e-ticaret SEO, yerel SEO, uluslararası SEO, dönüşüm optimizasyonu, veri analitiği, yapay zekâ destekli arama görünürlüğü, GEO ve AEO gibi birçok alanı birlikte değerlendirmesi gerekebiliyor.",
        "Bu ihtiyaçların artması, Türkiye'deki markaların yalnızca Türkiye merkezli SEO ajanslarını değil, farklı ülkelerde faaliyet gösteren ve uluslararası SEO projeleri yürüten ekipleri de değerlendirmesine olanak sağlıyor.",
      ] },
      { baslik: "Bu SEO Ajansı Listesi Nasıl Hazırlandı?", paragraflar: [
        "Aşağıdaki liste bir performans sıralaması değildir. Buradaki \"en iyi SEO ajansları\" ifadesi herhangi bir ajansın diğerinden daha başarılı olduğu yönünde bir iddia taşımamaktadır.",
        "Liste; SEO hizmeti sunan, farklı ülkelerde ve sektörlerde faaliyet gösteren, teknik SEO, içerik, e-ticaret SEO, local SEO, uluslararası SEO, GEO, AEO veya dijital büyüme gibi alanlarda hizmetlerini kamuya açık olarak tanıtan ajans ve danışmanlardan oluşturulmuştur.",
        "Ajanslar alfabetik olarak sıralanmıştır. Numara kullanımı yalnızca içeriğin daha rahat takip edilmesini sağlamak içindir.",
        "Listede hem Türkiye merkezli hem de uluslararası pazarlarda faaliyet gösteren şirketler bulunmaktadır. Dolayısıyla özellikle uluslararası büyüme hedefleyen, farklı dillerde SEO çalışması yapmak isteyen veya global pazarlara açılmayı planlayan Türkiye'deki şirketler açısından da alternatifler içerir.",
        "Ajans seçerken yalnızca bir listeye bağlı kalmak yerine firmanızın hedeflerini, bütçesini, teknik ihtiyaçlarını, sektörünü ve hedef pazarlarını dikkate almanız önemlidir.",
      ] },
      { baslik: "1. 2Stallions Digital Marketing Agency", paragraflar: [
        "Singapur merkezli dijital pazarlama ajanslarından biri olan 2Stallions, SEO'nun yanında SEM, içerik pazarlaması, sosyal medya pazarlaması, sosyal medya reklamcılığı, web geliştirme ve pazarlama otomasyonu gibi farklı dijital pazarlama hizmetleri sunuyor.",
        "SEO tarafında yerel SEO, e-ticaret SEO ve video SEO gibi farklı çalışma alanlarına sahip olması, ajansın organik görünürlüğü daha geniş bir dijital pazarlama stratejisinin parçası olarak değerlendirdiğini gösteriyor. Ajans aynı zamanda ücretli reklam ve içerik çalışmalarını da SEO faaliyetleriyle birlikte yürütebiliyor.",
        "Özellikle Güneydoğu Asya pazarlarına açılmayı planlayan veya SEO ile diğer dijital pazarlama kanallarını aynı çatı altında yönetmek isteyen şirketler tarafından incelenebilecek alternatiflerden biri.",
      ], linkler: [
        { isim: "2Stallions Digital Marketing Agency web sitesi", aciklama: "2stallions.com", url: "https://2stallions.com/" },
      ] },
      { baslik: "2. ClickExpose", paragraflar: [
        "Birleşik Krallık pazarına odaklanan ClickExpose, SEO çalışmalarını Google Ads yönetimi, click fraud protection ve web sitesi çözümleriyle bir arada konumlandırıyor.",
        "Şirket, SEO projelerinde mevcut görünürlüğün analiz edilmesi, rakip araştırmaları, anahtar kelime stratejisi ve işletmenin hedeflerine göre özelleştirilmiş yol haritaları oluşturulmasına odaklandığını belirtiyor. SEO ve Google Ads çalışmalarının birlikte yönetilmesi de hizmet modelinin önemli parçalarından biri.",
        "Organik ve ücretli Google görünürlüğünü aynı ekip üzerinden yönetmek isteyen, özellikle Birleşik Krallık pazarını hedefleyen şirketler ClickExpose'u değerlendirebilir.",
      ], linkler: [
        { isim: "ClickExpose web sitesi", aciklama: "clickexpose.com", url: "https://clickexpose.com/" },
      ] },
      { baslik: "3. Kinex Media", paragraflar: [
        "Kanada merkezli Kinex Media, web tasarım ve geliştirme hizmetlerinin yanında kapsamlı dijital pazarlama ve SEO çözümleri sunan bir ajans.",
        "Ajansın SEO hizmetleri arasında geleneksel arama motoru optimizasyonunun yanı sıra local SEO ve e-ticaret SEO bulunuyor. Son dönemde AI SEO tarafındaki hizmetlerini de genişleten Kinex Media; GEO, AEO, ChatGPT SEO, Gemini ve Perplexity görünürlüğü gibi yapay zekâ destekli arama alanlarını da hizmet kapsamına eklemiş durumda.",
        "Bu yapı özellikle klasik Google görünürlüğü ile yapay zekâ tabanlı arama platformlarını aynı organik büyüme stratejisinde değerlendirmek isteyen şirketler açısından dikkat çekiyor.",
      ], linkler: [
        { isim: "Kinex Media web sitesi", aciklama: "www.kinexmedia.com", url: "https://www.kinexmedia.com/" },
      ] },
      { baslik: "4. Kleosa", paragraflar: [
        "Kleosa, özellikle B2B şirketlerin dijital müşteri kazanım süreçlerine odaklanan bir dijital pazarlama ve büyüme ajansı olarak konumlanıyor.",
        "Ajans; B2B SEO, GEO, Google Ads, web tasarımı, dönüşüm oranı optimizasyonu, analitik, CRM ve pazarlama otomasyonunu birbirinden bağımsız kanallar yerine tek bir müşteri kazanım sistemi içerisinde ele alıyor.",
        "SEO çalışmalarında teknik SEO, arama niyeti araştırması, ticari landing page optimizasyonu, içerik stratejisi, schema ve entity optimizasyonu, otorite geliştirme ve Generative Engine Optimization gibi alanlara yer veriliyor.",
        "Özellikle B2B, profesyonel hizmetler, üretim veya yüksek müşteri değerine sahip sektörlerde faaliyet gösteren şirketler için incelenebilecek ajanslardan biri.",
      ], linkler: [
        { isim: "Kleosa web sitesi", aciklama: "www.kleosa.com", url: "https://www.kleosa.com/" },
      ] },
      { baslik: "5. Leading Solution Pte. Ltd.", paragraflar: [
        "Singapur merkezli Leading Solution, SEO ve dijital pazarlama çalışmalarında klasik arama motoru optimizasyonuyla yapay zekâ destekli arama görünürlüğünü birlikte ele alan ajanslardan biri.",
        "Ajansın sunduğu SEO hizmetleri arasında teknik SEO, on-page SEO, off-page SEO, local SEO, uluslararası SEO, e-ticaret SEO, SEO audit ve içerik üretimi bulunuyor. Bunun yanında AI SEO hizmetleriyle Google AI Overviews, ChatGPT ve diğer yapay zekâ tabanlı arama ortamlarındaki görünürlüğe de odaklanıyor.",
        "SEO dışında Google Ads, web geliştirme ve içerik pazarlaması hizmetlerinin bulunması, çok kanallı dijital büyüme stratejisine ihtiyaç duyan şirketler için daha geniş bir hizmet modeli oluşturuyor.",
      ], linkler: [
        { isim: "Leading Solution Pte. Ltd. web sitesi", aciklama: "theleadingsolution.com", url: "https://theleadingsolution.com/" },
      ] },
      { baslik: "6. Marketer Zilla", paragraflar: [
        "Marketer Zilla, SEO'yu yalnızca sıralama ve trafik kazanımı üzerinden değil; lead, satış ve gelir gibi iş sonuçlarıyla ilişkilendiren bir büyüme yaklaşımı benimsiyor.",
        "SEO hizmetleri B2B şirketler, hizmet işletmeleri, e-ticaret markaları, SaaS şirketleri ve yerel işletmelere yönelik farklı senaryoları kapsıyor. Teknik yapı ve indeksleme sorunları, ticari arama niyetine sahip anahtar kelimeler, içerik otoritesi ve dönüşüm takibi çalışmaların öne çıkan alanları arasında.",
        "Ajans aynı zamanda local SEO tarafında Google Business Profile optimizasyonu, yerel içerik, citation çalışmaları ve teknik SEO'yu birlikte kullanıyor. Geleneksel Google sonuçlarının yanında AI Overviews, ChatGPT ve Perplexity gibi platformlardaki görünürlüğü de stratejinin bir parçası olarak değerlendiriyor.",
      ], linkler: [
        { isim: "Marketer Zilla web sitesi", aciklama: "marketerzilla.com", url: "https://marketerzilla.com/" },
      ] },
      { baslik: "7. Mediaforce", paragraflar: [
        "Kanada'da faaliyet gösteren Mediaforce, SEO'yu dijital pazarlama, web tasarımı, Google Ads, sosyal medya ve yapay zekâ otomasyonu ile birlikte sunan ajanslardan biri.",
        "Ajansın SEO yaklaşımı klasik organik sıralamaların yanı sıra AEO, GEO ve AI Search Visibility çalışmalarını da kapsıyor. AI destekli analizler ile uzmanların yönettiği SEO stratejisini birleştirdiğini; teknik SEO, içerik optimizasyonu ve otorite geliştirme çalışmalarını birlikte yürüttüğünü belirtiyor.",
        "Mediaforce'un hizmet kapsamının SEO'nun ötesine geçmesi, organik görünürlükle performans pazarlamasını ve dönüşüm optimizasyonunu birlikte yönetmek isteyen şirketler için değerlendirilmesini mümkün kılıyor.",
      ], linkler: [
        { isim: "Mediaforce web sitesi", aciklama: "mediaforce.ca", url: "https://mediaforce.ca/" },
      ] },
      { baslik: "8. Mobitek", paragraflar: [
        "2003 yılından bu yana dijital pazarlama alanında faaliyet gösteren Mobitek, listedeki Türkiye merkezli ajanslardan biri. İstanbul'da faaliyet gösteren ajans, SEO'nun yanı sıra performans pazarlaması, Google Ads, sosyal medya, içerik pazarlaması, web tasarımı, medya planlama ve stratejik planlama hizmetleri sunuyor.",
        "Mobitek'in SEO hizmet modeli teknik SEO, içerik optimizasyonu, site dışı SEO, e-ticaret SEO, kurumsal SEO ve ölçümleme çalışmalarını kapsıyor. Ajans ayrıca SEO ve Generative Engine Optimization (GEO) çalışmalarını birlikte ele alarak markaların hem geleneksel arama sonuçlarında hem de yapay zekâ destekli arama deneyimlerinde görünürlüğünü geliştirmeye yönelik çalışmalar yürüttüğünü belirtiyor.",
        "Kurumsal markalar ve e-ticaret şirketlerine yönelik deneyimi bulunan Mobitek, özellikle SEO'yu reklam, içerik ve analitik gibi diğer dijital pazarlama kanallarıyla entegre etmek isteyen Türkiye'deki işletmeler için değerlendirilebilecek seçeneklerden biri.",
      ], linkler: [
        { isim: "Mobitek web sitesi", aciklama: "www.mobitek.com", url: "https://www.mobitek.com/" },
      ] },
      { baslik: "9. Online Solutions Group GmbH", paragraflar: [
        "Almanya merkezli Online Solutions Group GmbH, özellikle Almanca konuşulan pazarlarda faaliyet gösteren kapsamlı bir SEO ve online pazarlama ajansı.",
        "Ajansın hizmetleri içerisinde B2B SEO, local SEO, e-ticaret SEO, enterprise SEO, uluslararası SEO, SEO audit, link building, içerik, site relaunch çalışmaları ve şirket içi SEO ekiplerine yönelik danışmanlık ve workshop hizmetleri yer alıyor.",
        "Bunun yanında SEO ile SEA çalışmalarını birlikte yürütüyor ve yapay zekâ destekli arama sistemlerindeki görünürlüğü geliştirmek amacıyla GEO çalışmalarına da yer veriyor.",
        "Özellikle Almanya ve DACH bölgesinde organik görünürlük oluşturmak isteyen veya Almanca SEO projesi planlayan Türkiye merkezli şirketler açısından incelenebilecek ajanslardan biri.",
      ], linkler: [
        { isim: "Online Solutions Group GmbH web sitesi", aciklama: "www.onlinesolutionsgroup.de", url: "https://www.onlinesolutionsgroup.de/" },
      ] },
      { baslik: "10. PienetSEO", paragraflar: [
        "Hindistan merkezli PienetSEO, farklı büyüklükteki işletmelere geniş kapsamlı arama motoru optimizasyonu hizmetleri sunuyor.",
        "Hizmet kapsamı AI SEO, teknik SEO, local SEO, on-page SEO, off-page SEO, enterprise SEO, SEO audit, uluslararası SEO, e-ticaret SEO ve site migration SEO gibi birçok farklı SEO uzmanlık alanını içeriyor.",
        "Ajans, klasik Google görünürlüğünün yanında ChatGPT, Gemini, Perplexity ve Claude gibi büyük dil modelleri ve yapay zekâ destekli arama platformlarında marka görünürlüğünü geliştirmeye yönelik AI SEO hizmetlerini de öne çıkarıyor.",
        "Özellikle çok sayıda sayfası bulunan siteler, uluslararası projeler ve farklı SEO disiplinlerini tek sağlayıcı üzerinden yönetmek isteyen işletmeler tarafından değerlendirilebilir.",
      ], linkler: [
        { isim: "PienetSEO web sitesi", aciklama: "www.pienetseo.in", url: "https://www.pienetseo.in/" },
      ] },
      { baslik: "11. SEO Consultant", paragraflar: [
        "Yeni Zelanda merkezli SEO Consultant, büyük bir ajans yapısından ziyade doğrudan senior SEO danışmanıyla çalışmaya dayanan bir hizmet modeli sunuyor.",
        "Hizmet kapsamı; anahtar kelime araştırması ve stratejisi, teknik SEO audit, Core Web Vitals, site hızı, on-page SEO, içerik pazarlaması, link building, local SEO, Google Business Profile optimizasyonu ve AI/AEO çalışmalarını içeriyor.",
        "Özellikle yerel hizmet işletmeleri, e-ticaret markaları ve B2B şirketleri için farklı SEO yaklaşımları sunuluyor. Yapay zekâ tarafında ise schema, entity yapıları ve içerik mimarisi kullanılarak Google'ın yapay zekâ özellikleri ile ChatGPT gibi platformlardaki görünürlüğün geliştirilmesi hedefleniyor.",
        "Yeni Zelanda veya Okyanusya pazarında büyümeyi hedefleyen işletmeler için alternatif bir uzmanlık modeli sunuyor.",
      ], linkler: [
        { isim: "SEO Consultant web sitesi", aciklama: "seoconsultant.co.nz", url: "https://seoconsultant.co.nz/" },
      ] },
      { baslik: "12. SEO Roas", paragraflar: [
        "Türkiye pazarında faaliyet gösteren SEO Roas, SEO çalışmalarında teknik optimizasyon, içerik ve ölçümlemeyi birlikte ele alan bir yapı sunuyor.",
        "Ajansın hizmetleri arasında teknik SEO, on-page SEO, link building, local SEO, e-ticaret SEO, içerik SEO, WordPress SEO, Shopify SEO ve kurumsal SEO yer alıyor. Ayrıca Google Ads, Meta reklam yönetimi, Google Tag Manager ve analitik hizmetleri de bulunuyor.",
        "SEO Roas'ın yaklaşımında organik görünürlük kadar elde edilen trafiğin müşteri talepleri ve işletme sonuçlarıyla ölçülmesi de öne çıkıyor. Ajans ayrıca geleneksel SEO hizmetlerinin yanında GEO hizmeti de sunuyor.",
        "Özellikle e-ticaret, Shopify ve WordPress projelerinde SEO ile ölçümleme altyapısını birlikte ele almak isteyen Türkiye'deki işletmeler tarafından incelenebilir.",
      ], linkler: [
        { isim: "SEO Roas web sitesi", aciklama: "seoroas.com", url: "https://seoroas.com/" },
      ] },
      { baslik: "13. Sniro Limited", paragraflar: [
        "Londra merkezli Sniro, SEO'nun yanı sıra yazılım ve web geliştirme tarafında da kapsamlı hizmetler sunan bir dijital ajans.",
        "Şirketin hizmetleri arasında WordPress, Shopify, WooCommerce, Magento ve Laravel geliştirme; UI/UX ve branding; SEO ve içerik pazarlaması; Google Ads, Meta, TikTok ve Amazon reklam yönetimi; e-posta pazarlaması ve otomasyon çalışmaları bulunuyor.",
        "Bu geniş kapsam nedeniyle Sniro özellikle SEO projesinin yanında web sitesinin teknik altyapısını, e-ticaret sistemini veya kullanıcı deneyimini de geliştirmek isteyen şirketler için alternatif oluşturuyor.",
        "SEO'nun yazılım ve geliştirme ekipleriyle yakın çalışmasını gerektiren projelerde tek sağlayıcı üzerinden daha fazla dijital disipline erişmek isteyen firmalar tarafından değerlendirilebilir.",
      ], linkler: [
        { isim: "Sniro Limited web sitesi", aciklama: "www.sniro.com", url: "https://www.sniro.com/" },
      ] },
      { baslik: "14. The Second Floor", paragraflar: [
        "The Second Floor, marka, kreatif üretim, web geliştirme ve organik görünürlüğü bir araya getiren daha farklı bir ajans modeli sunuyor.",
        "Ajansın \"Growth\" başlığı altındaki hizmetlerinde SEO, AEO/GEO, içerik stratejisi, paid media ve sosyal medya büyümesi yer alıyor. Web geliştirme tarafında ise Webflow, landing page, e-ticaret ve kullanıcı deneyimi çalışmalarına odaklanıyor.",
        "The Second Floor'un yaklaşımındaki dikkat çekici noktalardan biri, markaların yalnızca Google sonuçlarında bulunmasını değil, yapay zekâ tarafından oluşturulan yanıtlarda da kaynak veya marka olarak görünür olmasını hedefleyen SEO ve GEO birlikteliği.",
        "Kreatif marka çalışmaları ile organik büyümenin aynı strateji içerisinde değerlendirilmesini isteyen şirketler tarafından incelenebilecek alternatiflerden biri.",
      ], linkler: [
        { isim: "The Second Floor web sitesi", aciklama: "thesecondfloor.io", url: "https://thesecondfloor.io/" },
      ] },
      { baslik: "15. wukonig.com", paragraflar: [
        "Avusturya merkezli wukonig.com, özellikle B2B şirketler ve Almanca konuşulan DACH pazarı üzerinde yoğunlaşan SEO ajanslarından biri.",
        "Şirket, web sitesinde 1999'dan bu yana faaliyet gösterdiğini belirtiyor ve SEO çalışmalarını yalnızca trafik artışı değil, B2B satış süreçlerine nitelikli talep üretme perspektifiyle konumlandırıyor. Çalışmalar özellikle Avusturya ve DACH bölgesindeki şirketlere yönelik olarak şekilleniyor.",
        "Bu yaklaşım, Almanya, Avusturya ve İsviçre gibi Almanca konuşulan pazarlarda B2B müşteri kazanmak isteyen şirketler açısından ajansı dikkat çekici hale getiriyor.",
        "Özellikle ihracat yapan veya DACH pazarını büyüme alanı olarak belirleyen Türkiye merkezli B2B şirketleri için değerlendirilebilecek uluslararası SEO alternatiflerinden biri.",
      ], linkler: [
        { isim: "wukonig.com web sitesi", aciklama: "wukonig.com", url: "https://wukonig.com/" },
      ] },
      { baslik: "SEO Ajansı Seçerken Nelere Dikkat Edilmeli?", paragraflar: [
        "SEO ajansı seçimi yalnızca ajansın web sitesindeki vaatlere veya belirli anahtar kelimelerdeki görünürlüğüne göre yapılmamalıdır. İki şirket aynı sektörde faaliyet gösterse bile SEO ihtiyaçları birbirinden tamamen farklı olabilir.",
        "Bir e-ticaret sitesi için kategori mimarisi, filtre URL'leri, ürün sayfaları, yapılandırılmış veri ve teknik taranabilirlik öncelikli olabilirken; B2B bir şirket için hizmet sayfaları, ticari arama niyeti, thought leadership içerikleri ve nitelikli lead üretimi daha önemli olabilir.",
        "1. Teknik SEO yetkinliği — Ajansın yalnızca içerik üretip üretmediğini değil; indeksleme, crawling, canonical, yönlendirmeler, JavaScript SEO, Core Web Vitals, site mimarisi ve yapılandırılmış veri gibi teknik konularda ne kadar detaylı çalışabildiğini öğrenin. Büyük bir e-ticaret veya kurumsal siteye sahipseniz teknik SEO kapasitesi çok daha kritik hale gelir.",
        "2. İçerik stratejisi — SEO için çok sayıda içerik üretmek tek başına yeterli değildir. Ajansın arama niyetini nasıl analiz ettiğini, anahtar kelimeleri hangi sayfalarla eşleştirdiğini, içerik kümelerini nasıl oluşturduğunu, mevcut içerikleri nasıl güncellediğini ve ticari ile bilgilendirici içerikleri nasıl ayırdığını sormanız faydalı olacaktır.",
        "3. SEO ve iş sonuçları arasındaki bağlantı — Organik trafik artışı tek başına her işletme için başarı anlamına gelmeyebilir. Bir e-ticaret sitesi organik gelir ve satışları takip etmek isterken, B2B bir şirket form, demo veya teklif taleplerini ölçmek isteyebilir. Bu nedenle ajansın KPI'ları yalnızca sıralama ve trafik üzerinden değil, işletmenin gerçek hedefleri üzerinden oluşturabilmesi önemlidir.",
        "4. E-ticaret SEO deneyimi — E-ticaret SEO, klasik kurumsal web sitesi SEO'sundan önemli ölçüde farklılaşabilir. Kategori yapısı, ürün sayfaları, faceted navigation, filtreler, stoktan kalkan ürünler, pagination, ürün schema'ları ve büyük URL hacimleri nedeniyle e-ticaret projelerinde teknik tecrübe önemlidir. E-ticaret şirketlerinin ajans seçerken benzer büyüklük ve altyapıdaki projelerde deneyim istemesi faydalı olabilir.",
        "5. Uluslararası SEO yetkinliği — Birden fazla ülkede faaliyet gösterecekseniz yalnızca içerikleri farklı dillere çevirmek yeterli olmayabilir. Uluslararası SEO projelerinde hreflang, ülke ve dil hedefleme, domain veya subfolder stratejisi, lokal anahtar kelime araştırması, yerel arama davranışları ve uluslararası link kazanımı gibi konular önem kazanır.",
        "6. GEO ve yapay zekâ arama deneyimi — 2026 itibarıyla SEO ajansı seçiminde değerlendirilmesi gereken yeni alanlardan biri de Generative Engine Optimization. Google'ın AI Overviews ve AI Mode gibi özellikleriyle birlikte kullanıcıların arama davranışları daha konuşma tabanlı hale gelirken, ChatGPT, Gemini, Perplexity ve diğer yapay zekâ araçları da ürün, hizmet ve şirket araştırmalarında kullanılabiliyor.",
        "Bu nedenle ajansa yalnızca \"SEO yapıyor musunuz?\" diye sormak yerine şunları da sorabilirsiniz: GEO stratejiniz var mı? AI Overviews görünürlüğünü nasıl takip ediyorsunuz? Entity optimizasyonu yapıyor musunuz? Schema çalışmalarını SEO stratejisine dahil ediyor musunuz? ChatGPT ve diğer AI arama ortamlarında marka görünürlüğünü nasıl değerlendiriyorsunuz? Klasik SEO ile GEO çalışmalarını nasıl birleştiriyorsunuz?",
        "7. Raporlama ve şeffaflık — SEO uzun vadeli ve çok sayıda değişken içeren bir süreçtir. İyi bir raporda yalnızca anahtar kelime pozisyonları değil; organik trafik, organik dönüşümler, Search Console performansı, önemli landing page'ler, teknik SEO sorunları, tamamlanan aksiyonlar ve gelecek dönem planı gibi bilgiler de bulunmalıdır.",
        "8. Referanslar ve vaka çalışmaları — Ajansın daha önce çalıştığı şirketleri incelemek faydalıdır ancak yalnızca marka logolarına bakmak yerine mümkünse detaylı vaka çalışmalarını değerlendirin. Hangi problemle başladıkları, hangi çalışmaları yaptıkları ve hangi metriklerle sonucu ölçtükleri daha anlamlı bilgiler sağlayabilir.",
        "9. Uygulama kapasitesi — Bazı SEO danışmanları yalnızca analiz ve strateji sunarken bazı ajanslar teknik değişiklikleri, içerik üretimini ve optimizasyonları doğrudan gerçekleştirebilir. Şirketinizde yeterli yazılım ve içerik kaynağı yoksa uygulama kapasitesi yüksek bir ajansla çalışmak önemli olabilir.",
        "10. Sözleşme ve çalışma modeli — SEO genellikle birkaç haftada tamamlanan tek seferlik bir çalışma değildir. Buna rağmen sözleşmenin kapsamını anlamadan uzun süreli taahhüt vermek doğru olmayabilir. Teklif alırken aylık hizmet kapsamını, hangi çalışmaların dahil olduğunu, içerik üretim miktarını, teknik uygulamaları kimin yapacağını, ek maliyetleri, sözleşme süresini ve fesih koşullarını açık biçimde öğrenmeniz faydalıdır.",
      ] },
      { baslik: "Türkiye Merkezli mi, Global SEO Ajansı mı?", paragraflar: [
        "Bu sorunun tek bir doğru cevabı bulunmuyor.",
        "Türkiye pazarında faaliyet gösteren bir şirket için Türkçe arama davranışını, yerel rekabeti ve Türkiye'deki kullanıcıların satın alma alışkanlıklarını bilen yerel bir ekip önemli avantaj sağlayabilir.",
        "Buna karşılık Avrupa, ABD, Kanada, Singapur veya farklı uluslararası pazarlara açılan işletmeler ilgili pazar konusunda deneyime sahip global bir SEO ajansından faydalanabilir. Bazı durumlarda Türkiye'deki SEO ajansıyla global ekiplerin birlikte çalıştığı hibrit modeller de tercih edilebilir.",
        "Burada önemli olan ajansın bulunduğu ülkeden çok, hedeflediğiniz pazarda başarılı bir SEO stratejisi geliştirecek bilgi, ekip ve süreçlere sahip olup olmadığıdır.",
      ] },
      { baslik: "SEO mu, GEO mu?", paragraflar: [
        "SEO ile GEO birbirinin alternatifi olarak düşünülmemelidir.",
        "SEO; web sitenizin arama motorları tarafından taranabilir, anlaşılabilir ve ilgili sorgularda görünür hale gelmesini hedefler. GEO ise markanın ve içeriğin generative AI sistemleri tarafından daha kolay anlaşılması, ilişkilendirilmesi ve uygun durumlarda kaynak olarak değerlendirilmesi üzerine yoğunlaşır.",
        "2026'daki arama ortamında sağlıklı yaklaşım çoğu işletme için ikisini birbirinden ayırmak yerine aynı dijital görünürlük stratejisi içerisinde değerlendirmektir.",
        "Teknik olarak zayıf, otoritesi düşük ve yetersiz içeriğe sahip bir web sitesinin yalnızca birkaç \"AI optimizasyonu\" uygulamasıyla güçlü bir dijital görünürlük oluşturmasını beklemek gerçekçi değildir. Bu nedenle temel SEO çalışmalarının önemi devam etmektedir.",
      ] },
      { baslik: "Hangi SEO Ajansı Size Uygun?", paragraflar: [
        "Yukarıdaki 15 ajans farklı ülkelerde, farklı sektörlerde ve farklı çalışma modelleriyle faaliyet gösteriyor.",
        "Bazıları yalnızca veya ağırlıklı olarak SEO alanına odaklanırken bazıları SEO'yu Google Ads, web geliştirme, içerik, sosyal medya, analitik ve otomasyon gibi hizmetlerle birlikte sunuyor. Bazıları B2B şirketlerde öne çıkarken bazıları e-ticaret, local SEO veya uluslararası SEO projelerine daha fazla ağırlık veriyor.",
        "Dolayısıyla sizin için uygun SEO ajansını belirleyen temel soru \"En iyi SEO ajansı hangisi?\" değil, şu olmalıdır: \"Hedeflerimiz, sektörümüz, bütçemiz ve teknik altyapımız için hangi ajansın çalışma modeli daha uygun?\"",
        "Karar vermeden önce mümkünse birkaç ajansla görüşün. Web siteniz ve sektörünüz hakkındaki ilk değerlendirmelerini dinleyin. Hazır bir paket sunmak yerine işletmenizin gerçek sorunlarını anlamaya çalışıp çalışmadıklarını değerlendirin.",
        "Ajansa özellikle şunları sorabilirsiniz: İlk 3-6 ayda hangi çalışmalar yapılacak? Teknik SEO problemlerini kim uygulayacak? İçerik üretimini kim yönetecek? Başarı hangi KPI'larla ölçülecek? SEO dışında GEO veya AI arama görünürlüğü takip edilecek mi? Ayda hangi raporları alacağız? Rakip analizi nasıl gerçekleştirilecek? Daha önce bizim sektörümüze benzer projelerde çalıştınız mı? SEO stratejisi satış veya lead verileriyle nasıl ilişkilendirilecek? Sözleşme ve iptal koşulları nelerdir?",
        "Bu sorular farklı ajanslardan gelen teklifleri daha sağlıklı biçimde karşılaştırmanıza yardımcı olabilir.",
      ] },
          ],
    bolumler_en: [
      { baslik: "Why Is the SEO Agency Market Growing in Turkey?", paragraflar: [
        "For businesses in Turkey, digital channels have moved beyond brand awareness to become a significant part of direct sales, customer acquisition and growth. With that shift, being visible on Google and other search platforms has become an increasingly strategic concern.",
        "Search engine optimisation has long been one of the core digital marketing disciplines that helps brands earn organic traffic from search engines like Google. As of 2026, however, the search landscape is no longer made up of classic Google results alone.",
        "As Google has rolled out AI-assisted search experiences such as AI Overviews and AI Mode in Turkey, the way users reach information has begun to change. Rather than searching with short keywords alone, users can now ask longer questions, make comparisons, and discover brands through AI-generated answers.",
        "This change also widens the scope of SEO. Alongside classic work such as technical SEO, content optimisation, on-site SEO and link development, areas like GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), structured data, entity optimisation and AI visibility are steadily gaining importance.",
        "As a result, choosing the right SEO agency no longer simply means ranking at the top of Google for certain keywords. A well-planned organic growth strategy may need to address technical SEO, content strategy, keyword and search intent analysis, e-commerce SEO, local SEO, international SEO, conversion optimisation, data analytics, AI-assisted search visibility, GEO and AEO together.",
        "This growing set of needs allows brands in Turkey to evaluate not only Turkey-based SEO agencies but also teams operating in other countries and running international SEO projects.",
      ] },
      { baslik: "How Was This SEO Agency List Prepared?", paragraflar: [
        "The list below is not a performance ranking. The phrase \"best SEO agencies\" here does not claim that any agency is more successful than another.",
        "The list is made up of agencies and consultants that provide SEO services, operate across different countries and sectors, and publicly present their services in areas such as technical SEO, content, e-commerce SEO, local SEO, international SEO, GEO, AEO or digital growth.",
        "The agencies are listed alphabetically. The numbering is only there to make the content easier to follow.",
        "The list includes both Turkey-based companies and those operating in international markets. It therefore also offers alternatives for companies in Turkey that are targeting international growth, want SEO work in other languages, or plan to expand into global markets.",
        "Rather than relying on a single list, it is important to consider your company's goals, budget, technical needs, sector and target markets when choosing an agency.",
      ] },
      { baslik: "1. 2Stallions Digital Marketing Agency", paragraflar: [
        "Singapore-based 2Stallions offers a broad set of digital marketing services alongside SEO: SEM, content marketing, social media marketing and advertising, web development and marketing automation.",
        "On the SEO side it covers local SEO, e-commerce SEO and video SEO, which suggests the agency treats organic visibility as part of a wider digital marketing strategy. Paid advertising and content work can be run alongside SEO activity.",
        "It may be worth reviewing for companies planning to expand into Southeast Asian markets, or those who want SEO and other digital channels managed under one roof.",
      ], linkler: [
        { isim: "2Stallions Digital Marketing Agency website", aciklama: "2stallions.com", url: "https://2stallions.com/" },
      ] },
      { baslik: "2. ClickExpose", paragraflar: [
        "Focused on the UK market, ClickExpose positions SEO alongside Google Ads management, click fraud protection and website solutions.",
        "The company states that its SEO projects centre on analysing current visibility, competitor research, keyword strategy and building roadmaps tailored to business goals. Managing SEO and Google Ads together is a core part of its service model.",
        "Companies targeting the UK market that want organic and paid Google visibility handled by the same team may want to consider ClickExpose.",
      ], linkler: [
        { isim: "ClickExpose website", aciklama: "clickexpose.com", url: "https://clickexpose.com/" },
      ] },
      { baslik: "3. Kinex Media", paragraflar: [
        "Canada-based Kinex Media provides comprehensive digital marketing and SEO solutions alongside web design and development services.",
        "Its SEO services include traditional search engine optimisation as well as local SEO and e-commerce SEO. Kinex Media has recently expanded its AI SEO offering, adding GEO, AEO, ChatGPT SEO, and Gemini and Perplexity visibility to its scope of work.",
        "This structure is notable for companies that want to address classic Google visibility and AI-based search platforms within a single organic growth strategy.",
      ], linkler: [
        { isim: "Kinex Media website", aciklama: "www.kinexmedia.com", url: "https://www.kinexmedia.com/" },
      ] },
      { baslik: "4. Kleosa", paragraflar: [
        "Kleosa positions itself as a digital marketing and growth agency focused on customer acquisition for B2B companies.",
        "It treats B2B SEO, GEO, Google Ads, web design, conversion rate optimisation, analytics, CRM and marketing automation as one customer acquisition system rather than independent channels.",
        "Its SEO work covers technical SEO, search intent research, commercial landing page optimisation, content strategy, schema and entity optimisation, authority building and Generative Engine Optimization.",
        "One to review for companies in B2B, professional services, manufacturing or other high customer value sectors.",
      ], linkler: [
        { isim: "Kleosa website", aciklama: "www.kleosa.com", url: "https://www.kleosa.com/" },
      ] },
      { baslik: "5. Leading Solution Pte. Ltd.", paragraflar: [
        "Singapore-based Leading Solution is among the agencies that address classic search engine optimisation and AI-assisted search visibility together.",
        "Its SEO services include technical SEO, on-page SEO, off-page SEO, local SEO, international SEO, e-commerce SEO, SEO audits and content production. Its AI SEO work focuses on visibility in Google AI Overviews, ChatGPT and other AI-based search environments.",
        "Google Ads, web development and content marketing services alongside SEO create a broader service model for companies that need a multi-channel digital growth strategy.",
      ], linkler: [
        { isim: "Leading Solution Pte. Ltd. website", aciklama: "theleadingsolution.com", url: "https://theleadingsolution.com/" },
      ] },
      { baslik: "6. Marketer Zilla", paragraflar: [
        "Marketer Zilla takes a growth approach that ties SEO to business outcomes such as leads, sales and revenue rather than rankings and traffic alone.",
        "Its SEO services cover different scenarios for B2B companies, service businesses, e-commerce brands, SaaS companies and local businesses. Technical and indexing issues, commercial-intent keywords, content authority and conversion tracking are among the prominent areas of work.",
        "On local SEO it combines Google Business Profile optimisation, local content, citation work and technical SEO. Visibility on platforms such as AI Overviews, ChatGPT and Perplexity is also treated as part of the strategy, alongside traditional Google results.",
      ], linkler: [
        { isim: "Marketer Zilla website", aciklama: "marketerzilla.com", url: "https://marketerzilla.com/" },
      ] },
      { baslik: "7. Mediaforce", paragraflar: [
        "Operating in Canada, Mediaforce offers SEO alongside digital marketing, web design, Google Ads, social media and AI automation.",
        "Its SEO approach covers AEO, GEO and AI Search Visibility work in addition to classic organic rankings. The agency states that it combines AI-assisted analysis with expert-led SEO strategy, running technical SEO, content optimisation and authority building together.",
        "Because its scope extends beyond SEO, it can be considered by companies that want organic visibility, performance marketing and conversion optimisation managed together.",
      ], linkler: [
        { isim: "Mediaforce website", aciklama: "mediaforce.ca", url: "https://mediaforce.ca/" },
      ] },
      { baslik: "8. Mobitek", paragraflar: [
        "Active in digital marketing since 2003, Mobitek is one of the Turkey-based agencies on this list. Based in Istanbul, it offers performance marketing, Google Ads, social media, content marketing, web design, media planning and strategic planning alongside SEO.",
        "Mobitek's SEO service model covers technical SEO, content optimisation, off-site SEO, e-commerce SEO, enterprise SEO and measurement. The agency also states that it addresses SEO and Generative Engine Optimization (GEO) together, working to improve brand visibility in both traditional search results and AI-assisted search experiences.",
        "With experience serving corporate brands and e-commerce companies, Mobitek may be an option for businesses in Turkey that want SEO integrated with advertising, content and analytics.",
      ], linkler: [
        { isim: "Mobitek website", aciklama: "www.mobitek.com", url: "https://www.mobitek.com/" },
      ] },
      { baslik: "9. Online Solutions Group GmbH", paragraflar: [
        "Germany-based Online Solutions Group GmbH is a comprehensive SEO and online marketing agency operating particularly in German-speaking markets.",
        "Its services include B2B SEO, local SEO, e-commerce SEO, enterprise SEO, international SEO, SEO audits, link building, content, site relaunch work, plus consulting and workshops for in-house SEO teams.",
        "It also runs SEO and SEA together, and includes GEO work aimed at improving visibility in AI-assisted search systems.",
        "One to review for Turkey-based companies looking to build organic visibility in Germany and the DACH region, or planning a German-language SEO project.",
      ], linkler: [
        { isim: "Online Solutions Group GmbH website", aciklama: "www.onlinesolutionsgroup.de", url: "https://www.onlinesolutionsgroup.de/" },
      ] },
      { baslik: "10. PienetSEO", paragraflar: [
        "India-based PienetSEO offers wide-ranging search engine optimisation services to businesses of different sizes.",
        "Its scope covers many SEO specialisms including AI SEO, technical SEO, local SEO, on-page SEO, off-page SEO, enterprise SEO, SEO audits, international SEO, e-commerce SEO and site migration SEO.",
        "Alongside classic Google visibility, the agency highlights AI SEO services aimed at improving brand visibility across large language models and AI-assisted search platforms such as ChatGPT, Gemini, Perplexity and Claude.",
        "It can be considered particularly by sites with large page counts, international projects, and businesses that want several SEO disciplines handled by a single provider.",
      ], linkler: [
        { isim: "PienetSEO website", aciklama: "www.pienetseo.in", url: "https://www.pienetseo.in/" },
      ] },
      { baslik: "11. SEO Consultant", paragraflar: [
        "New Zealand-based SEO Consultant offers a service model built on working directly with a senior SEO consultant rather than a large agency structure.",
        "Its scope includes keyword research and strategy, technical SEO audits, Core Web Vitals, site speed, on-page SEO, content marketing, link building, local SEO, Google Business Profile optimisation and AI/AEO work.",
        "Different SEO approaches are offered for local service businesses, e-commerce brands and B2B companies. On the AI side, schema, entity structures and content architecture are used to improve visibility in Google's AI features and platforms such as ChatGPT.",
        "It offers an alternative expertise model for businesses aiming to grow in New Zealand or the wider Oceania market.",
      ], linkler: [
        { isim: "SEO Consultant website", aciklama: "seoconsultant.co.nz", url: "https://seoconsultant.co.nz/" },
      ] },
      { baslik: "12. SEO Roas", paragraflar: [
        "Operating in the Turkish market, SEO Roas offers a structure that addresses technical optimisation, content and measurement together.",
        "Its services include technical SEO, on-page SEO, link building, local SEO, e-commerce SEO, content SEO, WordPress SEO, Shopify SEO and enterprise SEO. Google Ads, Meta ad management, Google Tag Manager and analytics services are also available.",
        "SEO Roas's approach places as much emphasis on measuring traffic against customer enquiries and business outcomes as on organic visibility itself. The agency also offers GEO alongside traditional SEO services.",
        "It may be worth reviewing for businesses in Turkey that want SEO and measurement infrastructure handled together, particularly on e-commerce, Shopify and WordPress projects.",
      ], linkler: [
        { isim: "SEO Roas website", aciklama: "seoroas.com", url: "https://seoroas.com/" },
      ] },
      { baslik: "13. Sniro Limited", paragraflar: [
        "London-based Sniro is a digital agency offering comprehensive software and web development services alongside SEO.",
        "Its services include WordPress, Shopify, WooCommerce, Magento and Laravel development; UI/UX and branding; SEO and content marketing; Google Ads, Meta, TikTok and Amazon ad management; email marketing and automation.",
        "Because of this breadth, Sniro is an alternative for companies that want to improve their site's technical infrastructure, e-commerce system or user experience alongside an SEO project.",
        "It can be considered by firms wanting access to more digital disciplines through a single provider, on projects where SEO needs to work closely with software and development teams.",
      ], linkler: [
        { isim: "Sniro Limited website", aciklama: "www.sniro.com", url: "https://www.sniro.com/" },
      ] },
      { baslik: "14. The Second Floor", paragraflar: [
        "The Second Floor offers a different agency model, bringing together brand, creative production, web development and organic visibility.",
        "Under its \"Growth\" heading the agency offers SEO, AEO/GEO, content strategy, paid media and social media growth. On the development side it focuses on Webflow, landing pages, e-commerce and user experience work.",
        "One notable aspect of its approach is the pairing of SEO and GEO, aiming for brands to appear not only in Google results but also as a source or brand within AI-generated answers.",
        "An option to review for companies that want creative brand work and organic growth considered within the same strategy.",
      ], linkler: [
        { isim: "The Second Floor website", aciklama: "thesecondfloor.io", url: "https://thesecondfloor.io/" },
      ] },
      { baslik: "15. wukonig.com", paragraflar: [
        "Austria-based wukonig.com is an SEO agency focused particularly on B2B companies and the German-speaking DACH market.",
        "The company states on its website that it has been operating since 1999, and positions SEO not purely as traffic growth but as generating qualified demand for B2B sales processes. Its work is shaped mainly around companies in Austria and the DACH region.",
        "This approach makes the agency notable for companies looking to win B2B customers in German-speaking markets such as Germany, Austria and Switzerland.",
        "One of the international SEO alternatives worth reviewing for Turkey-based B2B companies that export, or that have identified DACH as a growth market.",
      ], linkler: [
        { isim: "wukonig.com website", aciklama: "wukonig.com", url: "https://wukonig.com/" },
      ] },
      { baslik: "What to Look for When Choosing an SEO Agency", paragraflar: [
        "An SEO agency should not be chosen based solely on the promises on its website or its visibility for certain keywords. Even when two companies operate in the same sector, their SEO needs can be entirely different.",
        "For an e-commerce site, category architecture, filter URLs, product pages, structured data and technical crawlability may take priority; for a B2B company, service pages, commercial search intent, thought leadership content and qualified lead generation may matter more.",
        "1. Technical SEO capability — Find out not just whether the agency produces content, but how deeply it can work on technical topics such as indexing, crawling, canonicals, redirects, JavaScript SEO, Core Web Vitals, site architecture and structured data. If you have a large e-commerce or corporate site, technical SEO capacity becomes far more critical.",
        "2. Content strategy — Producing a large volume of content is not enough on its own. It is worth asking how the agency analyses search intent, which pages it maps keywords to, how it builds content clusters, how it updates existing content, and how it separates commercial and informational content.",
        "3. The link between SEO and business outcomes — An increase in organic traffic does not, by itself, mean success for every business. An e-commerce site may want to track organic revenue and sales, while a B2B company may want to measure form, demo or quote requests. The agency should be able to build KPIs around the business's real goals, not just rankings and traffic.",
        "4. E-commerce SEO experience — E-commerce SEO can differ substantially from classic corporate website SEO. Category structure, product pages, faceted navigation, filters, out-of-stock products, pagination, product schema and large URL volumes make technical experience important on e-commerce projects. It can help to ask for experience on projects of similar size and infrastructure.",
        "5. International SEO capability — If you will operate in more than one country, translating content may not be enough. International SEO projects bring hreflang, country and language targeting, domain or subfolder strategy, local keyword research, local search behaviour and international link acquisition into play.",
        "6. GEO and AI search experience — As of 2026, Generative Engine Optimization is one of the newer areas to weigh when choosing an SEO agency. As Google features such as AI Overviews and AI Mode make search behaviour more conversational, tools like ChatGPT, Gemini and Perplexity are also used for product, service and company research.",
        "Rather than only asking \"do you do SEO?\", you might also ask: Do you have a GEO strategy? How do you track AI Overviews visibility? Do you do entity optimisation? Is schema work part of your SEO strategy? How do you assess brand visibility in ChatGPT and other AI search environments? How do you combine classic SEO with GEO work?",
        "7. Reporting and transparency — SEO is a long-term process with many variables. A good report should include not only keyword positions but also organic traffic, organic conversions, Search Console performance, key landing pages, technical SEO issues, completed actions and the plan for the coming period.",
        "8. References and case studies — Reviewing the agency's past clients is useful, but rather than looking only at brand logos, assess detailed case studies where possible. The problem they started with, the work they did and the metrics they used to measure the result are far more informative.",
        "9. Implementation capacity — Some SEO consultants offer only analysis and strategy, while some agencies can carry out technical changes, content production and optimisations directly. If your company lacks sufficient development and content resource, working with an agency with strong implementation capacity may matter.",
        "10. Contract and engagement model — SEO is generally not a one-off project completed in a few weeks. Even so, committing long term without understanding the scope of the contract may not be wise. When requesting a proposal, clarify the monthly service scope, what is included, content production volume, who will carry out technical implementation, additional costs, contract duration and termination conditions.",
      ] },
      { baslik: "Turkey-Based or Global SEO Agency?", paragraflar: [
        "There is no single right answer to this question.",
        "For a company operating in the Turkish market, a local team that understands Turkish search behaviour, local competition and the purchasing habits of users in Turkey can be a significant advantage.",
        "Conversely, businesses expanding into Europe, the US, Canada, Singapore or other international markets may benefit from a global SEO agency with experience in that market. In some cases, hybrid models where a Turkish SEO agency works alongside global teams may be preferable.",
        "What matters here is less the country the agency is based in, and more whether it has the knowledge, team and processes to develop a successful SEO strategy in the market you are targeting.",
      ] },
      { baslik: "SEO or GEO?", paragraflar: [
        "SEO and GEO should not be thought of as alternatives to one another.",
        "SEO aims to make your website crawlable and understandable to search engines, and visible for relevant queries. GEO focuses on making the brand and its content easier for generative AI systems to understand, associate and, where appropriate, treat as a source.",
        "In the 2026 search environment, the healthy approach for most businesses is to address the two within the same digital visibility strategy rather than separating them.",
        "It is not realistic to expect a website that is technically weak, low in authority and thin on content to build strong digital visibility through a few \"AI optimisation\" tactics alone. Fundamental SEO work therefore remains important.",
      ] },
      { baslik: "Which SEO Agency Is Right for You?", paragraflar: [
        "The 15 agencies above operate in different countries, different sectors and with different engagement models.",
        "Some focus solely or mainly on SEO, while others offer SEO alongside Google Ads, web development, content, social media, analytics and automation. Some stand out with B2B companies, while others weight e-commerce, local SEO or international SEO projects more heavily.",
        "The question that determines the right SEO agency for you is therefore not \"which is the best SEO agency?\" but rather: \"whose engagement model best fits our goals, sector, budget and technical infrastructure?\"",
        "Before deciding, speak to several agencies if you can. Listen to their initial assessment of your website and sector. Judge whether they try to understand your business's real problems rather than presenting an off-the-shelf package.",
        "In particular you might ask: What work will be done in the first 3-6 months? Who will implement technical SEO fixes? Who will manage content production? Which KPIs will measure success? Beyond SEO, will GEO or AI search visibility be tracked? Which reports will we receive each month? How will competitor analysis be carried out? Have you worked on projects similar to our sector before? How will SEO strategy be tied to sales or lead data? What are the contract and cancellation terms?",
        "These questions can help you compare proposals from different agencies more soundly.",
      ] },
          ],
  },

  'turkiye-en-iyi-10-seo-ajansi-2026': {
    baslik_tr: "Türkiye'nin En İyi 10 SEO Ajansı (2026 Güncel)",
    baslik_en: "Turkey's Best 10 SEO Agencies (Updated 2026)",
    meta_desc_tr: "Türkiye'de tanınan 10 SEO ajansına alfabetik, sıralama içermeyen bir bakış. 2026 güncel liste, seçim kriterleri ve her ajansın web sitesine link.",
    meta_desc_en: "An alphabetical, unranked overview of 10 well-known SEO agencies in Turkey. Updated for 2026, with selection criteria and links to each agency's site.",
    etiket: 'Strateji', sure: '8',
    bolumler_tr: [
      { baslik: "SEO Ajansı Arayışı Türkiye'de Neden Yaygınlaşıyor?", paragraflar: [
        "Google'da görünür olmak, artık pek çok işletme için satışların doğrudan bağlı olduğu bir kanal haline geldi. Bununla birlikte SEO'nun teknik derinliği ve zaman gerektirmesi, markaları bu süreci kendi içlerinde değil, uzmanlaşmış bir ekiple yürütmeye yönlendiriyor.",
        "Bu ihtiyaç, Türkiye'de farklı büyüklükte ve uzmanlık alanında onlarca SEO ajansının ortaya çıkmasına neden oldu. Aşağıda, kamuya açık bilgilerden derlediğimiz 10 tanınmış ismi tanıtıyoruz.",
      ]},
      { baslik: 'Bu Liste Nasıl Hazırlandı?', paragraflar: [
        "Bu içerikteki 'en iyi' ifadesi, ölçülmüş bir performans karşılaştırmasına değil; sektörde bilinen ve kamuya açık bilgilerle tanımlanabilen ajanslara işaret eder. Liste alfabetik sıradadır; numaralar sadece referans amaçlıdır, herhangi bir sıralama veya öneri anlamı taşımaz.",
        "Bu içerik sponsorlu değildir ve listelenen ajanslarla herhangi bir ticari ilişkimiz bulunmamaktadır. Kendi değerlendirmenizi yaparken 'SEO Ajansı Nasıl Seçilir?' başlıklı rehberimizdeki kriterlere başvurmanızı öneririz.",
      ]},
      { baslik: 'Türkiye\'de Tanınan 10 SEO Ajansı (Alfabetik)', paragraflar: [
        "Sıra numaraları yalnızca listeyi takip etmenizi kolaylaştırmak içindir, bir sıralama ifade etmez.",
      ], linkler: [
        { isim: '1. Adverpeak', aciklama: "İstanbul (Maltepe) merkezli Adverpeak; SEO, Google Ads, sosyal medya ve web tasarımını bir arada sunuyor. Sağlık turizmi, eğitim, otomotiv, gayrimenkul ve B2B gibi sektörlerde referansları bulunuyor; çok dilli ve çok lokasyonlu SEO projelerinde deneyimli.", url: 'https://www.adverpeak.com' },
        { isim: '2. Cremicro', aciklama: "Türkiye'nin köklü SEO ajanslarından biri olan Cremicro, çok dilli ekibiyle uluslararası projelere danışmanlık veriyor; standart web sitelerinin yanı sıra özel altyapılı projelerde de süreç yönetiyor.", url: 'https://www.cremicro.com' },
        { isim: '3. Digipeak Agency', aciklama: "Digipeak Agency, SEO'yu yalnızca sıralama değil; marka bilinirliği, organik trafik kalitesi ve dönüşüm performansı ekseninde ele alıyor. Teknik SEO, içerik planlaması ve on-page optimizasyonunu bir araya getiriyor." },
        { isim: '4. Mosanta', aciklama: "Performans odaklı SEO stratejileriyle hem teknik altyapı hem de içerik tarafında projeler yürüten, genç ama etkili bir ekip yapısına sahip İstanbul merkezli bir ajans.", url: 'https://www.mosanta.com' },
        { isim: '5. Netvent', aciklama: "Ankara merkezli Netvent; kurumsal içerik yönetimi, inbound pazarlama ve SEO'yu birleştiriyor. Özellikle SaaS ve endüstriyel firmalarda B2B alanında çalışıyor." },
        { isim: '6. ROIBLE', aciklama: "İstanbul merkezli ROIBLE, dönüşüm oranı optimizasyonu ve içerik tabanlı SEO çalışmalarında yükselişte olan ajanslardan biri." },
        { isim: '7. Sıradışı Digital', aciklama: "İstanbul, Eskişehir ve Ankara'da faaliyet gösteren Sıradışı Digital; SEO'nun yanı sıra web tasarımı, marka kimliği geliştirme ve dijital strateji sunuyor. Özellikle tasarım ve UI/UX çalışmalarıyla öne çıkıyor." },
        { isim: '8. Türk SEM', aciklama: "1999'da ilk dijital çalışmalarına başlayan Türk SEM, İstanbul merkezli olarak SEO ve Google Ads alanında uzun yıllardır hizmet veriyor; mühendis ekibiyle akademik dünyaya yakın çalışmalar yürütüyor." },
        { isim: '9. Webonya', aciklama: "İstanbul merkezli Webonya; SEO projelerinde teknik analiz, içerik geliştirme ve kullanıcı deneyimini bir arada ele alıyor, ölçülebilir sonuçlara odaklanıyor." },
        { isim: '10. Webtures', aciklama: "SEO denildiğinde Türkiye'de akla gelen ilk isimlerden biri olan Webtures; kullanıcı deneyimi, içerik optimizasyonu ve dönüşüm oranı artırımında uzman, kendi SEO analiz araçlarını geliştiren İstanbul merkezli bir ajans.", url: 'https://www.webtures.com' },
      ]},
      { baslik: 'Hangi Ajans Size Uygun?', paragraflar: [
        "Bu derleme bir performans karşılaştırması değildir; sektördeki tanınmış isimleri bir araya getiren bilgilendirici bir kaynaktır. Doğru ortak, işletmenizin sektörüne, bütçesine ve büyüklüğüne göre değişir.",
        "Karar vermeden önce birden fazla ajansla görüşmenizi, referanslarını doğrulamanızı ve teklif edilen stratejinin somut örneklerle desteklenip desteklenmediğini değerlendirmenizi öneririz.",
      ]},
    ],
    bolumler_en: [
      { baslik: 'Why Is the Search for an SEO Agency Growing in Turkey?', paragraflar: [
        "Being visible on Google has become a channel that sales depend on directly for many businesses. At the same time, the technical depth and time SEO requires pushes brands toward running the process with a specialized team rather than entirely in-house.",
        "This need has led to dozens of SEO agencies of different sizes and specializations emerging in Turkey. Below, we introduce 10 well-known names compiled from publicly available information.",
      ]},
      { baslik: 'How This List Was Put Together', paragraflar: [
        "The term 'best' in this piece doesn't refer to a measured performance comparison — it refers to agencies that are known in the industry and identifiable through public information. The list is alphabetical; the numbers are for reference only and carry no ranking or recommendation.",
        "This content isn't sponsored, and we have no commercial relationship with any of the agencies listed. For your own evaluation, we'd recommend using the criteria from our guide, 'How to Choose an SEO Agency.'",
      ]},
      { baslik: '10 Well-Known SEO Agencies in Turkey (Alphabetical)', paragraflar: [
        "The numbers below are only there to help you follow the list — they don't represent a ranking.",
      ], linkler: [
        { isim: '1. Adverpeak', aciklama: 'Based in Istanbul (Maltepe), Adverpeak offers SEO, Google Ads, social media and web design together, with references in sectors like health tourism, education, automotive, real estate and B2B, and experience running multilingual, multi-location SEO projects.', url: 'https://www.adverpeak.com' },
        { isim: '2. Cremicro', aciklama: "One of Turkey's more established SEO agencies, Cremicro advises on international projects with its multilingual team and manages custom processes for non-standard technical setups.", url: 'https://www.cremicro.com' },
        { isim: '3. Digipeak Agency', aciklama: "Digipeak Agency approaches SEO not just as a ranking exercise but around brand awareness, organic traffic quality and conversion performance, bringing together technical SEO, content planning and on-page optimization." },
        { isim: '4. Mosanta', aciklama: 'An Istanbul-based agency running performance-focused SEO strategies on both the technical and content side, with a young but effective team structure.', url: 'https://www.mosanta.com' },
        { isim: '5. Netvent', aciklama: 'Based in Ankara, Netvent combines corporate content management, inbound marketing and SEO, working particularly in the B2B space for SaaS and industrial companies.' },
        { isim: '6. ROIBLE', aciklama: 'An Istanbul-based agency on the rise in conversion rate optimization and content-driven SEO work.' },
        { isim: '7. Sıradışı Digital', aciklama: 'Operating in Istanbul, Eskişehir and Ankara, Sıradışı Digital offers web design, brand identity development and digital strategy alongside SEO, standing out especially for its design and UI/UX work.' },
        { isim: '8. Türk SEM', aciklama: 'Having started its first digital work in 1999, Istanbul-based Türk SEM has provided SEO and Google Ads services for many years, running work closely tied to academia through its engineering team.' },
        { isim: '9. Webonya', aciklama: 'An Istanbul-based agency that combines technical analysis, content development and user experience in its SEO projects, with a focus on measurable results.' },
        { isim: '10. Webtures', aciklama: 'One of the first names that comes to mind for SEO in Turkey, Webtures is an Istanbul-based agency expert in user experience, content optimization and conversion rate improvement, with its own in-house SEO analysis tools.', url: 'https://www.webtures.com' },
      ]},
      { baslik: 'Which Agency Is Right for You?', paragraflar: [
        "This roundup isn't a performance comparison — it's an informational resource bringing together recognized names in the industry. The right partner depends on your business's sector, budget and size.",
        "Before deciding, we'd recommend speaking with more than one agency, verifying their references, and evaluating whether their proposed strategy is actually backed by concrete examples.",
      ]},
    ],
  },
}


export default function BlogPost(props) {
  const router = useRouter()
  const slug = props.slug || router.query.slug
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifBolum, setAktifBolum] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // getStaticPaths yalnızca gerçek içeriği yazılmış slug'ları üretir,
  // dolayısıyla veri normalde her zaman doludur (savunmacı kontrol aşağıda).
  const veri = ICERIKLER[slug] || null
  const baslik = veri ? (isEn ? veri.baslik_en : veri.baslik_tr) : ''
  const bolumler = (veri ? (isEn ? veri.bolumler_en : veri.bolumler_tr) : []) || []
  const metaDesc = veri && (isEn ? veri.meta_desc_en : veri.meta_desc_tr)
    ? (isEn ? veri.meta_desc_en : veri.meta_desc_tr)
    : (bolumler[0]?.paragraflar?.[0]?.substring(0, 155) || '') + '...'
  const etiket = veri?.etiket || 'SEO'
  const sure = veri?.sure || '10'
  const canonicalUrl = `https://fatihemincakiroglu.com/${isEn ? 'en/blog/' : 'blog/'}${slug}`
  const guncelleme = veri?.guncelleme || (isEn ? 'July 2026' : 'Temmuz 2026')

  // İlgili yazılar: aynı kategoriden, mevcut yazı hariç, en fazla 3 tane
  const mevcutYazi = YAZILAR.find(y => y.slug === slug)
  const ilgiliYazilar = (mevcutYazi
    ? YAZILAR.filter(y => y.kategori === mevcutYazi.kategori && y.slug !== slug)
    : YAZILAR.filter(y => y.slug !== slug)
  ).slice(0, 3)

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

  // Hook'lardan sonra: React hook sırası bozulmasın diye erken return burada.
  if (!slug || !veri) return null

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

  // Makalenin ortasına yakın bir yerde gösterilecek bağlamsal CTA
  const midCtaIndex = bolumler.length >= 4 ? Math.floor(bolumler.length / 2) - 1 : -1
  const MidArticleCTA = (
    <div style={{ margin: '32px 0', padding: '24px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(232,86,10,0.08), rgba(232,86,10,0.02))', border: '1px solid rgba(232,86,10,0.2)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ fontSize: '28px' }}>💡</div>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '2px' }}>
          {isEn ? 'Made it this far? You might be dealing with this yourself.' : 'Bu noktaya kadar geldiyseniz, muhtemelen bununla kendiniz uğraşıyorsunuzdur.'}
        </div>
        <div style={{ fontSize: '13px', color: '#777' }}>
          {isEn ? 'Let\'s talk about how this applies to your site — free, no obligation.' : 'Bunun sizin sitenize nasıl uygulanacağını konuşalım — ücretsiz, hiçbir taahhüt yok.'}
        </div>
      </div>
      <Link href={isEn ? '/en/book-a-call' : '/randevu'} style={{ padding: '11px 20px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', flexShrink: 0 }}>
        {isEn ? 'Book a free call →' : 'Ücretsiz görüşme al →'}
      </Link>
    </div>
  )

  return (
    <>
      <Head>
        <title>{baslik} | Fatih Emin Çakıroğlu</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <Link href={isEn ? "/en" : "/"} style={{ color: '#aaa', fontSize: '13px' }}>{isEn ? 'Home' : 'Ana Sayfa'}</Link>
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
              <span style={{ fontSize: '12px', color: '#ccc' }}>·</span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>🔄 {isEn ? 'Updated' : 'Son güncelleme'}: {guncelleme}</span>
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
                  {bi === midCtaIndex && MidArticleCTA}
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
                  {bi === midCtaIndex && MidArticleCTA}
                </div>
              ))}
            </div>
            <div className="sticky-sidebar" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TOC}
              {AuthorCard}
              {CTACard}
            </div>
          </div>
        )}

        {/* Genişletilmiş Yazar Kutusu (E-E-A-T) — içeriğin hemen altında, tüm görünümlerde */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px 48px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '26px', flexShrink: 0 }}>F</div>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{isEn ? 'ABOUT THE AUTHOR' : 'YAZAR HAKKINDA'}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#111', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>Fatih Emin Çakıroğlu</div>
              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '12px' }}>{isEn ? 'SEO & GEO Consultant · Istanbul' : 'SEO & GEO Danışmanı · İstanbul'}</div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, marginBottom: '14px' }}>
                {isEn
                  ? '8+ years of hands-on SEO and GEO experience across 150+ projects in e-commerce, SaaS, healthcare and local business sectors. Writes based on real client data, not theory.'
                  : '150+ projede e-ticaret, SaaS, sağlık ve yerel işletme sektörlerinde 8+ yıllık uygulamalı SEO ve GEO deneyimi. Teoriye değil, gerçek müşteri verilerine dayanarak yazıyor.'}
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>LinkedIn →</a>
                <Link href={isEn ? '/en/about' : '/hakkimda'} style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>{isEn ? 'Full bio →' : 'Tüm özgeçmiş →'}</Link>
                <Link href={isEn ? '/en/testimonials' : '/referanslar'} style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>{isEn ? 'Client results →' : 'Müşteri sonuçları →'}</Link>
              </div>
            </div>
          </div>

          {/* İlgili Yazılar */}
          {ilgiliYazilar.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>
                {isEn ? 'Related Articles' : 'İlgili Yazılar'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '14px' }}>
                {ilgiliYazilar.map((y, i) => (
                  <Link key={i} href={isEn ? `/en/blog/${y.slug}` : `/blog/${y.slug}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #eee', display: 'block', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '6px' }}>{y.sure} {isEn ? 'min read' : 'dk okuma'}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.4, marginBottom: '6px' }}>{isEn ? y.en.baslik : y.tr.baslik}</div>
                    <span style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 600 }}>{isEn ? 'Read →' : 'Oku →'}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export async function getStaticPaths() {
  return {
    paths: YAYINDAKI_BLOG_SLUGS.map(slug => ({ params: { slug } })),
    // Listede olmayan slug'lar 404 döner — dolgu içerikli sayfa üretilmez.
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  if (!ICERIKLER[params.slug]) return { notFound: true }
  return { props: { slug: params.slug } }
}
