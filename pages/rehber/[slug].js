import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const REHBER_ICERIKLERI = {
  'teknik-seo': {
    baslik: 'Teknik SEO',
    kategori: 'Teknik',
    bolumler: [
      { baslik: 'Crawl Bütçesi ve İndeksleme', paragraflar: [
        'Crawl bütçesi, Googlebot\'un belirli bir zaman diliminde sitenizde tarayabileceği URL sayısını ifade eder. Büyük ölçekli web sitelerinde bu bütçenin verimli kullanılması, kritik sayfaların öncelikli olarak indekslenmesi açısından hayati önem taşır. Robots.txt direktifleri, XML sitemap yapısı ve iç link mimarisi bu bütçenin nasıl dağıtıldığını doğrudan etkiler. Düşük kaliteli, ince içerikli veya duplicate URL barındıran sayfalar crawl bütçesini tüketirken asıl hedef sayfaların indekslenmesini geciktirebilir.',
        'Google Search Console\'daki "Pages" raporu, indekslenmeyen sayfaların tam listesini ve nedenlerini sunar. "Crawled but not indexed" durumu genellikle içerik kalitesi sorununa işaret ederken "Discovered but not indexed" durumu crawl bütçesi yetersizliğinden kaynaklanır. Bu iki kategoriyi birbirinden ayırt etmek, doğru çözüm stratejisinin belirlenmesi açısından kritiktir. Crawl istatistiklerini düzenli incelemek, Googlebot\'un sitenizdeki davranışını anlamanızı ve olası sorunları erken tespit etmenizi sağlar.',
      ]},
      { baslik: 'Site Mimarisi ve URL Yapısı', paragraflar: [
        'İdeal site mimarisi, herhangi bir sayfanın ana sayfadan en fazla 3-4 tıklamada ulaşılabilir olmasını hedefler. Daha derin yapılar Googlebot\'un kritik sayfaları keşfetmesini zorlaştırır ve link equity\'nin verimli dağıtılmasını engeller. Kategorik URL yapısı, hem arama motorlarına hem de kullanıcılara sayfa hiyerarşisi hakkında anlamlı sinyal iletir. Örneğin `/kategori/alt-kategori/urun` formatı, sayfanın içerik bağlamını açıkça ortaya koyar.',
        'Canonical tag, duplicate içerik sorununu çözmede en etkili teknik araçlardan biridir. Özellikle e-ticaret sitelerinde filtreleme ve sıralama parametrelerinden oluşan URL varyasyonları, aynı içeriği farklı adreslerden sunar. `rel="canonical"` etiketi ile tercih edilen URL belirtilmesi, link değerini tek bir sayfada toplar ve indeksleme karışıklığını önler. Hreflang etiketi ise çok dilli sitelerde her sayfanın hangi dil ve bölge için tasarlandığını arama motorlarına bildirir.',
      ]},
      { baslik: 'Sayfa Hızı ve Core Web Vitals', paragraflar: [
        'Core Web Vitals, Google\'ın kullanıcı deneyimini ölçmek için kullandığı üç temel metrikten oluşur: LCP (Largest Contentful Paint) sayfanın yüklenme hızını, INP (Interaction to Next Paint) etkileşim duyarlılığını ve CLS (Cumulative Layout Shift) görsel kararlılığı ölçer. LCP için ideal değer 2.5 saniyenin altıdır; bu hedefi yakalamak için görsel optimizasyonu, sunucu yanıt süresi iyileştirmesi ve render-blocking kaynakların azaltılması gerekmektedir.',
        'INP, Mart 2024\'te First Input Delay\'in yerini alarak Core Web Vitals\'ın üçüncü metriği olmuştur. 200ms altındaki değerler "iyi" olarak sınıflandırılırken 500ms üzeri değerler "zayıf" kategorisine girer. Uzun JavaScript görevleri, event handler gecikmeleri ve ağır üçüncü taraf betikleri INP sorunlarının başlıca kaynaklarıdır. Chrome DevTools\'un Performance paneli ile PageSpeed Insights, INP sorunlarını tespit etmek için birincil analiz araçlarıdır.',
      ]},
      { baslik: 'Yapılandırılmış Veri ve Schema Markup', paragraflar: [
        'Schema markup, arama motorlarının içeriği daha doğru anlamasını sağlayan yapılandırılmış veri formatıdır. JSON-LD formatında yazılan schema kodları, sayfanın `<head>` bölümüne eklenir ve Googlebot\'a içerik türü, yazar, tarih, fiyat gibi makine tarafından okunabilir bilgiler iletir. Article, Product, Organization, Person, FAQPage ve HowTo en sık kullanılan schema türleri arasında yer alır.',
        'Zengin sonuçlar (rich results), schema markup uygulanan sayfaların arama sonuçlarında yıldız puanı, fiyat, stok durumu veya SSS formatında görünmesini sağlar. Google\'ın Rich Results Test aracı, schema implementasyonunun doğruluğunu ve zengin sonuç uygunluğunu test etmek için kullanılır. İlgili schema türlerini doğru ve eksiksiz doldurmak, zengin sonuç kazanma olasılığını artırır ancak garanti etmez.',
      ]},
      { baslik: 'HTTP Güvenlik ve Protokol Faktörleri', paragraflar: [
        'HTTPS, 2014\'ten bu yana Google\'ın resmi sıralama faktörüdür ve günümüzde teknik SEO denetimlerinde ön koşul olarak kabul edilir. SSL sertifikası olmayan siteler, modern tarayıcılar tarafından "Güvenli değil" uyarısıyla işaretlenir; bu durum hem kullanıcı güvenini hem de dönüşüm oranını olumsuz etkiler. Let\'s Encrypt gibi ücretsiz sertifika sağlayıcıları, küçük ölçekli siteler için uygun maliyetli bir seçenek sunar.',
        'HTTP/2 ve HTTP/3 protokolleri, paralel bağlantı sayısını artırarak özellikle birden fazla kaynak yükleyen sayfalarda yükleme süresini önemli ölçüde kısaltır. HSTS (HTTP Strict Transport Security) başlığının implementasyonu, tarayıcıların siteyle her zaman HTTPS üzerinden iletişim kurmasını zorunlu kılar ve ortadaki adam saldırılarına karşı ek güvenlik katmanı oluşturur. Güvenlik başlıkları (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options) teknik SEO skorunu iyileştiren tamamlayıcı güvenlik önlemleri arasındadır.',
      ]},
      { baslik: 'Mobil SEO ve Mobile-First İndeksleme', paragraflar: [
        'Google, 2023 yılında tüm siteler için mobile-first indekslemeye geçişi tamamlamıştır. Bu politika kapsamında Googlebot, sayfaları artık masaüstü yerine mobil versiyonlarından indekslemektedir. Mobil sürümde eksik olan içerik, iç linkler veya yapılandırılmış veriler indeksleme sürecine dahil edilmez; bu nedenle masaüstü ve mobil içerik paritesinin sağlanması zorunludur.',
        'Viewport meta etiketinin doğru konfigüre edilmesi ve CSS medya sorgularıyla responsive tasarımın sağlanması, mobil SEO\'nun teknik temel taşlarıdır. Dokunma öğelerinin yeterli boyut ve aralıkta tasarlanması, metnin yakınlaştırma gerektirmeden okunabilir olması ve yatay kaydırmanın önlenmesi, Search Console\'daki "Mobile Usability" raporunda değerlendirilen başlıca kullanılabilirlik faktörleridir. Bu sorunların çözülmesi doğrudan sıralama cezası getirmese de kullanıcı davranışı üzerindeki olumsuz etkisi dolaylı SEO kaybına yol açar.',
      ]},
    ]
  },
  'on-page-seo': {
    baslik: 'On-Page SEO',
    kategori: 'Strateji',
    bolumler: [
      { baslik: 'Başlık Etiketi ve Meta Optimizasyonu', paragraflar: [
        'Title tag, organik CTR\'yi doğrudan etkileyen en kritik on-page SEO öğesidir. 50-60 karakter aralığında, hedef anahtar kelimeyi başa yakın konumlandıran ve kullanıcıya açık bir değer önerisi sunan başlıklar en yüksek tıklama oranına ulaşır. Her sayfa için benzersiz ve açıklayıcı bir başlık belirlemek, arama motorlarının sayfalar arasındaki içerik farklılığını anlamasına yardımcı olur. Marka adını başlığın sonuna eklemek, hem marka bilinirliğini destekler hem de karakter sınırını verimli kullanmayı sağlar.',
        'Meta açıklaması teknik olarak doğrudan bir sıralama faktörü olmasa da SERP\'te kullanıcının sayfaya tıklama kararını etkileyen en önemli unsurlardan biridir. 120-160 karakter aralığında, hedef anahtar kelimeyi doğal biçimde içeren ve net bir eylem çağrısı barındıran meta açıklamalar daha yüksek CTR sağlar. Google, zaman zaman meta açıklamayı görmezden gelerek sayfa içeriğinden otomatik snippet oluşturabilir; bu durumu minimize etmek için açıklamanın kullanıcı sorgusunu doğrudan karşılayan bir yapıda yazılması önerilir.',
      ]},
      { baslik: 'Başlık Hiyerarşisi ve İçerik Yapısı', paragraflar: [
        'H1-H6 başlık hiyerarşisinin mantıksal sırayla kullanılması ve hedef anahtar kelimenin H1 içinde geçmesi, arama motorlarının sayfa yapısını doğru okuması için temel gerekliliktir. Her sayfada yalnızca bir H1 kullanılmalı ve bu başlık sayfanın ana konusunu net biçimde özetlemelidir. H2 ve H3 başlıkları, içeriği tematik bölümlere ayırarak hem kullanıcı deneyimini hem de semantik yapıyı güçlendirir.',
        'LSI (Latent Semantic Indexing) anahtar kelimeleri, konu ile anlam bakımından ilişkili terimler olup sayfanın semantik derinliğini artırır. Keyword stuffing\'den kaçınarak bu terimleri içeriğe doğal biçimde entegre etmek, hem arama motorlarının içerik kalitesini daha yüksek değerlendirmesini sağlar hem de okuyucu deneyimini olumsuz etkilemez. Okunabilirlik skoru (Flesch-Kincaid), cümle uzunluğu ve paragraf yapısı, içerik kalitesinin önemli göstergeleridir.',
      ]},
      { baslik: 'Görsel Optimizasyonu', paragraflar: [
        'Görsel optimizasyonu, sayfa hızını doğrudan etkileyen en kritik unsurlardan biridir. WebP formatı, JPEG ve PNG\'ye kıyasla yaklaşık %25-35 daha küçük dosya boyutu sunarken görsel kaliteyi korur. Her görsel için açıklayıcı ve anahtar kelime içeren alt text yazmak, hem erişilebilirliği hem de Google Görseller üzerinden gelen organik trafiği artırır. Dosya boyutu ile görsel kalitesi arasındaki denge, kullanım amacına göre dikkatli biçimde ayarlanmalıdır.',
        'Lazy loading, görünüm alanının dışındaki görsellerin yalnızca kullanıcı o bölüme kaydırdığında yüklenmesini sağlar. Bu yaklaşım, özellikle çok sayıda görsel içeren sayfalarda ilk yüklenme süresini önemli ölçüde kısaltır ve LCP skorunu iyileştirir. `loading="lazy"` HTML özelliği ile native lazy loading, küçük bir kod değişikliğiyle büyük performans kazanımı sağlayan en hızlı yöntemdir.',
      ]},
      { baslik: 'İç Linkleme Stratejisi', paragraflar: [
        'İç linkleme, site genelindeki link equity dağılımını yönetmenin en etkili araçlarından biridir. Pillar-cluster modeli kapsamında ana içerik (pillar) sayfaları, alt konuları işleyen cluster sayfalarına link verir; cluster sayfaları ise pillar sayfasına geri bağlanır. Bu çift yönlü link ağı, hem Googlebot\'un içerik hiyerarşisini anlamasını kolaylaştırır hem de topical authority sinyallerini güçlendirir.',
        'Anchor text seçimi, iç linklemenin SEO değeri açısından kritik bir bileşendir. Açıklayıcı ve anahtar kelime içeren anchor text\'ler, hedef sayfanın içerik bağlamını arama motorlarına açıkça iletir. "Buraya tıklayın" veya "Daha fazla" gibi generik anchor text\'lerden kaçınmak, link profilinin kalitesini artırır. Orphan page (başka sayfadan link almayan sayfa) tespiti ve düzeltilmesi, site genelindeki indekslenebilirliği iyileştirir.',
      ]},
      { baslik: 'İçerik Uzunluğu ve Kapsamı', paragraflar: [
        'İçerik uzunluğu, sıralama ile doğrusal bir ilişki kurmaz; ancak kapsamlı ve derinlemesine işlenmiş konular, Google\'ın "helpful content" kriterlerini karşılama olasılığı daha yüksek içeriklerdir. Kullanıcı sorgusunun niyetini tam karşılayan ve ilgili alt soruları da yanıtlayan içerikler, daha uzun oturum süresi ve daha düşük hemen çıkma oranı ile ödüllendirilir. Bu metrikler dolaylı olarak arama sıralamalarını olumlu etkiler.',
        'Evergreen içerikler, uzun vadeli organik trafik için en değerli varlıklardır. Düzenli güncellenen ve güncel verilerle desteklenen içerikler, "freshness" sinyali olarak arama motorları tarafından olumlu değerlendirilir. İçerik denetimi (content audit) sürecinde düşük performanslı sayfaların güncellenmesi, birleştirilmesi veya kaldırılması kararları, site genelindeki içerik kalitesini artıran sistematik bir yaklaşımdır.',
      ]},
      { baslik: 'Kullanıcı Deneyimi ve Davranışsal Sinyaller', paragraflar: [
        'Kullanıcı davranışı sinyalleri, Google\'ın içerik kalitesini değerlendirdiği dolaylı göstergelerdir. Düşük hemen çıkma oranı, yüksek oturum süresi ve yüksek sayfa başına görüntüleme, içeriğin kullanıcı niyetini karşıladığına dair sinyal üretir. Bu metriklerin iyileştirilmesi için içerik yapısı, okunabilirlik, görsel tasarım ve sayfa içi gezinme birlikte ele alınmalıdır.',
        'Kullanıcı amacına (user intent) uygun içerik formatı belirlemek, on-page optimizasyonun en stratejik boyutudur. Informational sorgular için kapsamlı rehber veya blog yazısı, transactional sorgular için ürün veya hizmet sayfası, commercial investigation sorguları için karşılaştırma içeriği en uygun formatlardır. Format uyumsuzluğu, teknik açıdan mükemmel optimize edilmiş bir içeriğin bile düşük performans göstermesine yol açabilir.',
      ]},
    ]
  },
};

// Diğer rehberler için genel içerik oluştur
const DEFAULT_REHBER = (baslik, kategori) => ({
  baslik,
  kategori,
  bolumler: [
    { baslik: `${baslik} Nedir?`, paragraflar: [
      `${baslik}, dijital pazarlama ve SEO stratejisinin kritik bir bileşenidir. Arama motorlarının içeriği değerlendirme biçimini anlamak, bu alanda doğru strateji geliştirmenin ön koşuludur. Veriye dayalı yaklaşım ve sürekli test etme döngüsü, sürdürülebilir organik büyümenin temel dinamiklerini oluşturur.`,
      `Etkili bir uygulama için önce mevcut durumun kapsamlı biçimde analiz edilmesi, ardından öncelikli aksiyon alanlarının belirlenmesi ve son olarak ölçülebilir hedeflerin tanımlanması gerekmektedir. Bu sürecin her adımında veri odaklı karar alma, sezgisel tahminlerin önüne geçmelidir.`,
    ]},
    { baslik: 'Temel Prensipler', paragraflar: [
      `${baslik} alanında başarı için kullanıcı merkezli düşünce biçimini benimsetmek şarttır. Arama motorlarının nihai hedefi kullanıcılara en iyi deneyimi sunmaktır; bu nedenle kullanıcı niyetini anlamak ve karşılamak, teknik optimizasyonun temelini oluşturur. Kaliteli içerik, güçlü teknik altyapı ve otorite sinyallerinin bir araya gelmesi kalıcı sıralama başarısının anahtarıdır.`,
      `Strateji geliştirme sürecinde rakip analizi, pazar araştırması ve hedef kitle segmentasyonu birlikte değerlendirilmelidir. Kısa vadeli taktiksel hamleler, uzun vadeli organik büyüme stratejisinin yerini alamaz. Algoritma güncellemelerine dayanıklı, kullanıcı değeri odaklı bir yaklaşım benimsemek sürdürülebilir başarının garantisidir.`,
    ]},
    { baslik: 'Uygulama Adımları', paragraflar: [
      `Uygulama sürecinde sistematik bir yaklaşım benimsemek, kaynakların en verimli biçimde kullanılmasını sağlar. Önce teknik altyapıyı sağlamlaştırmak, ardından içerik kalitesini geliştirmek ve son aşamada otorite inşasına odaklanmak, genel olarak kabul görmüş bir önceliklendirme çerçevesidir. Her aşamada ölçüm ve analiz yapılarak strateji güncellenmeli, başarısız deneylerin hızla terk edilip başarılı yaklaşımların ölçeklendirilmesi hedeflenmelidir.`,
      `Araç seçimi bu süreçte kritik öneme sahiptir. Google Search Console, Google Analytics 4, Ahrefs veya SEMrush ve Screaming Frog, temel SEO araçları olarak kabul görmektedir. Bu araçlardan elde edilen verilerin yorumlanması ve aksiyona dönüştürülmesi, teorik bilgiyi pratikte değere çeviren süreçtir.`,
    ]},
    { baslik: 'Ölçüm ve Optimizasyon', paragraflar: [
      `Performans ölçümü olmaksızın uygulanan strateji, yönü belirsiz bir yolculuktan farksızdır. Doğru KPI\'ların belirlenmesi, ölçüm altyapısının kurulması ve düzenli raporlama döngüsünün oluşturulması, başarılı bir SEO programının olmazsa olmaz unsurlarıdır. Organik trafik, sıralama konumları ve dönüşüm oranlarının birlikte değerlendirilmesi, gerçek iş değerini ortaya koyar.`,
      `Optimizasyon, tek seferlik bir eylem değil sürekli bir döngüdür. A/B testleri, içerik güncellemeleri ve teknik iyileştirmeler, düzenli aralıklarla gözden geçirilmeli ve sonuçlara göre strateji revize edilmelidir. Rakip hareketlerini takip etmek ve algoritma güncellemelerinin etkisini analiz etmek, proaktif bir yaklaşım için zorunludur.`,
    ]},
    { baslik: 'Yaygın Hatalar', paragraflar: [
      `En sık karşılaşılan hatalar arasında kısa vadeli sonuç baskısıyla yapılan manipülatif taktikler, ölçüm altyapısı kurulmadan aksiyon alınması ve içerik kalitesini ikinci plana atan anahtar kelime optimizasyonu yer almaktadır. Google\'ın algoritmaları bu hataları giderek daha doğru tespit etmekte ve penalize etmektedir. Sürdürülebilir strateji, her zaman kullanıcı değerini önceliklendiren bir yaklaşıma dayanmalıdır.`,
      `Teknik SEO sorunlarını görmezden gelmek, içerik ve backlink çalışmalarının etkinliğini ciddi ölçüde azaltır. Sağlam teknik altyapı olmadan üretilen içerik, potansiyelinin çok altında performans gösterir. Düzenli teknik denetimler ve proaktif sorun tespiti, SEO programının sağlıklı işleyişini garanti altına alır.`,
    ]},
    { baslik: 'Gelecek Perspektifi', paragraflar: [
      `Yapay zeka ve makine öğrenmesinin arama algoritmalarını şekillendirdiği günümüzde, bu alandaki en iyi pratikler hızla evrilmektedir. GEO (Generative Engine Optimization) ve E-E-A-T sinyallerine verilen artan önem, içerik stratejisinin yeniden değerlendirilmesini zorunlu kılmaktadır. Sektörün önde gelen yayınlarını ve Google\'ın resmi açıklamalarını takip etmek, bu değişime hazırlıklı olmak için temel gerekliliktir.`,
      `Sesli arama, mobil kullanım ve sıfır tıklama aramaların büyümesi, hem içerik formatını hem de teknik optimizasyon önceliklerini dönüştürmektedir. Kullanıcı davranışındaki bu değişimlere uyum sağlamak, uzun vadeli organik büyüme stratejisinin temel dinamiklerinden biridir. Veri odaklı, çevik ve kullanıcı merkezli bir yaklaşım, gelecekteki algoritma değişikliklerine karşı en sağlam pozisyonu oluşturur.`,
    ]},
  ]
});

const TÜM_REHBERLER = {
  'teknik-seo': REHBER_ICERIKLERI['teknik-seo'],
  'on-page-seo': REHBER_ICERIKLERI['on-page-seo'],
  'off-page-seo': DEFAULT_REHBER('Off Page SEO', 'Strateji'),
  'keyword-research': DEFAULT_REHBER('Keyword Research', 'Strateji'),
  'backlink': DEFAULT_REHBER('Link Oluşturma', 'Strateji'),
  'mobil-seo': DEFAULT_REHBER('Mobil SEO', 'Teknik'),
  'core-web-vitals': DEFAULT_REHBER('Core Web Vitals', 'Teknik'),
  'yerel-seo': DEFAULT_REHBER('Yerel SEO', 'Strateji'),
  'seo-101': DEFAULT_REHBER('SEO 101', 'Strateji'),
  'geo-nedir': DEFAULT_REHBER('GEO Nedir?', 'AI & GEO'),
  'llmstxt': DEFAULT_REHBER('llms.txt', 'Teknik'),
  'ai-overview': DEFAULT_REHBER('AI Overview Optimizasyonu', 'AI & GEO'),
  'aeo': DEFAULT_REHBER('Answer Engine Optimization', 'Strateji'),
  'zero-click': DEFAULT_REHBER('Zero-Click Search', 'Ölçüm'),
  'eeat': DEFAULT_REHBER('E-E-A-T Rehberi', 'Strateji'),
};

const KAT_RENK = { Teknik: { bg: '#e0f2fe', color: '#0369a1' }, Strateji: { bg: '#f3e8ff', color: '#7c3aed' }, 'Ölçüm & İçerik': { bg: '#fce7f3', color: '#be185d' }, 'AI & GEO': { bg: '#e0f2fe', color: '#0284c7' }, Ölçüm: { bg: '#dcfce7', color: '#15803d' } };

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  const veri = TÜM_REHBERLER[slug] || DEFAULT_REHBER(slug?.replace(/-/g, ' ') || 'Rehber', 'Strateji');
  const renk = KAT_RENK[veri.kategori] || { bg: '#f5f5f5', color: '#555' };
  const [aktifBolum, setAktifBolum] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = parseInt(id.replace('bolum-', ''));
            if (!isNaN(idx)) setAktifBolum(idx);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    const els = document.querySelectorAll('[id^="bolum-"]');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [veri]);

  return (
    <>
      <Head>
        <title>{veri.baslik} | SEO Rehberi | Fatih Emin Çakıroğlu</title>
        <meta name="description" content={`${veri.baslik} rehberi: Fatih Emin Çakıroğlu'nun hazırladığı kapsamlı ${veri.kategori} rehberi. Strateji, teknik detaylar ve uygulama adımları.`} />
        <link rel="canonical" href={`https://fatihemincakiroglu.com/rehber/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": veri.baslik,
          "author": {"@type": "Person", "name": "Fatih Emin Çakıroğlu", "url": "https://fatihemincakiroglu.com"},
          "publisher": {"@type": "Person", "name": "Fatih Emin Çakıroğlu"},
          "url": `https://fatihemincakiroglu.com/rehber/${slug}`
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"},
            {"@type": "ListItem", "position": 2, "name": "Rehber", "item": "https://fatihemincakiroglu.com/rehber"},
            {"@type": "ListItem", "position": 3, "name": veri.baslik, "item": `https://fatihemincakiroglu.com/rehber/${slug}`}
          ]
        })}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#aaa' }}>
            <Link href="/" style={{ color: '#aaa' }}>Ana Sayfa</Link>
            <span>›</span>
            <Link href="/rehber" style={{ color: '#aaa' }}>Rehber</Link>
            <span>›</span>
            <span style={{ color: '#555' }}>{veri.baslik}</span>
          </div>
        </div>
        {/* Hero */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <Link href="/rehber" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← Tüm Rehberler</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ padding: '4px 10px', borderRadius: '4px', background: renk.bg, color: renk.color, fontSize: '11px', fontWeight: 700 }}>{veri.kategori}</span>
              <span style={{ fontSize: '12px', color: '#bbb' }}>· SEO Rehberi</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '20px' }}>{veri.baslik}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>F</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>SEO & Dijital Pazarlama Uzmanı</div>
              </div>
            </div>
          </div>
        </div>

        {/* İçerik + Sidebar */}
        <div className="article-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 16px 96px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '40px', alignItems: 'start' }}>
          {/* Makale */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', border: '1px solid #eee' }}>
            {veri.bolumler.map((b, bi) => (
              <div key={bi} id={`bolum-${bi}`} style={{ marginBottom: bi < veri.bolumler.length - 1 ? '44px' : '0', scrollMarginTop: '90px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '4px', height: '22px', background: 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block' }}></span>
                  {b.baslik}
                </h2>
                {b.paragraflar.map((p, pi) => (
                  <p key={pi} style={{ color: '#555', fontSize: '16px', lineHeight: 1.85, marginBottom: pi < b.paragraflar.length - 1 ? '16px' : '0' }}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Sticky Sidebar */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: 'calc(100vh - var(--nav-h) - 48px)', overflowY: 'auto' }}>

            {/* İçindekiler */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #eee', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '12px', height: '12px', background: 'var(--orange)', borderRadius: '3px', display: 'inline-block', flexShrink: 0 }}></span>
                <span style={{ fontSize: '11px', color: '#111', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>İÇİNDEKİLER</span>
              </div>
              {veri.bolumler.map((b, i) => (
                <a key={i} href={`#bolum-${i}`}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '9px 10px', borderRadius: '8px', marginBottom: '4px',
                    textDecoration: 'none', cursor: 'pointer',
                    background: aktifBolum === i ? 'rgba(232,86,10,0.08)' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{
                    fontSize: '12px', fontWeight: 700, flexShrink: 0, minWidth: '20px',
                    color: aktifBolum === i ? 'var(--orange)' : '#ccc',
                    transition: 'color 0.2s',
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{
                    fontSize: '13px', lineHeight: 1.4,
                    color: aktifBolum === i ? 'var(--orange)' : '#555',
                    fontWeight: aktifBolum === i ? 600 : 400,
                    transition: 'color 0.2s',
                  }}>{b.baslik}</span>
                </a>
              ))}
            </div>

            {/* Yazar Kartı */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #eee', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '20px', flexShrink: 0 }}>F</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>SEO Uzmanı · İstanbul</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, marginBottom: '14px' }}>
                8+ yıl deneyimli SEO ve dijital pazarlama danışmanı.
              </p>
              <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer"
                style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                LinkedIn Profili →
              </a>
            </div>

            {/* CTA */}
            <div style={{ background: '#111', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>ÜCRETSİZ DANIŞMA</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: '#fff', marginBottom: '20px', lineHeight: 1.4 }}>
                Bu konuda yardım almak ister misiniz?
              </h3>
              <Link href="/iletisim" style={{ display: 'block', padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
                İletişime Geç →
              </Link>
            </div>

          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .article-grid { grid-template-columns: 1fr !important; padding: 20px 16px 60px !important; }
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
