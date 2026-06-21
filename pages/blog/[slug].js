import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const POSTS = {
  'eticaret-seo-rehberi-2025': {
    baslik: 'E-Ticaret SEO Rehberi 2025: Rakiplerinizin Önüne Geçin',
    tarih: '15 Ocak 2025', sure: '8 dk', etiket: 'E-Ticaret',
    ozet: 'E-ticaret sitelerinin Google\'da üst sıralara çıkması için kapsamlı teknik ve içerik stratejileri.',
    bolumler: [
      { baslik: 'Teknik SEO Altyapısı', paragraflar: [
        'E-ticaret sitelerinin teknik SEO altyapısı, kategorik URL yapısından başlar. `/category/sub-category/product-name` formatı, hem Googlebot\'un siteyi anlamasını kolaylaştırır hem de kullanıcıların navigasyonunu destekler. Özellikle yüzlerce veya binlerce ürüne sahip büyük kataloglarda URL kanonikleştirme kritik önem taşır; renk, beden veya filtreleme parametrelerinden oluşan duplicate URL\'leri canonical tag ile kontrol altına almak, crawl bütçesinin verimli kullanılmasını sağlar.',
        'Sayfa hızı e-ticaret SEO\'sunun temel metriklerinden biridir. Core Web Vitals kapsamındaki LCP değerinin 2,5 saniyenin altında tutulması için ürün görsellerinin WebP formatına dönüştürülmesi, lazy loading implementasyonu ve CDN kullanımı zorunlu hale gelmiştir. Render-blocking JavaScript ve CSS kaynaklarının azaltılması, özellikle mobil kullanıcılar için LCP skorunu doğrudan etkiler.',
      ]},
      { baslik: 'Ürün Sayfası Optimizasyonu', paragraflar: [
        'Ürün sayfaları, e-ticaret SEO\'sunun en kritik bileşenidir. Üretici açıklamalarını kopyalamak yerine orijinal, kullanıcı niyetine uygun içerik üretmek şarttır. Başlık etiketinin `{Ürün Adı} - {Ana Özellik} | {Marka}` formatında yapılandırılması, hem tıklama oranını artırır hem de hedef anahtar kelimelerle uyumu güçlendirir.',
        'Product schema markup, ürün sayfalarına zengin sonuç özelliği kazandırır. JSON-LD formatında yazılan schema; fiyat, stok durumu, ürün değerlendirmesi ve marka bilgisini yapılandırılmış veri olarak Googlebot\'a iletir. Bu durum, arama sonuçlarında yıldız puanı ve fiyat bilgisinin doğrudan görünmesini sağlayarak CTR\'yi %15-30 artırabilir.',
      ]},
      { baslik: 'Kategori Sayfası Mimarisi', paragraflar: [
        'Kategori sayfaları, ürün sayfalarına kıyasla çok daha geniş anahtar kelime havuzunu hedefler ve e-ticaret sitelerinin organik trafiğinin büyük bölümünü oluşturur. Her kategori sayfasının net bir hedef anahtar kelimesi olmalı ve H1 etiketi bu kelimeyi içermelidir. Sayfa üst kısmına eklenen 100-200 kelimelik kategori açıklaması semantik sinyal iletir.',
        'Faceted navigation (filtreli navigasyon) ciddi crawl bütçesi sorunlarına yol açabilir. Filtre kombinasyonlarından oluşan URL\'lerin `noindex` direktifi veya canonical tag ile yönetilmesi, Googlebot\'un asıl kategori sayfasına odaklanmasını sağlar.',
      ]},
      { baslik: 'Backlink Stratejisi', paragraflar: [
        'E-ticaret siteleri için backlink inşasında en etkili yöntemlerden biri, ürün kategorileriyle ilgili rehber ve karşılaştırma içerikleri oluşturmaktır. "En İyi X Ürünleri" formatındaki içerikler doğal backlink çekme potansiyeli taşır.',
        'Dijital PR kampanyaları, link inşasının en ölçeklenebilir yöntemidir. Sektörel veriler içeren araştırmalar ve orijinal çalışmalar medya kuruluşlarının dikkatini çeker ve editoryal nitelikte yüksek DA bağlantılar kazandırır.',
      ]},
      { baslik: 'Dönüşüm ve SEO Entegrasyonu', paragraflar: [
        'CRO ile SEO birbirini tamamlar. Organik trafik çeken ancak yüksek hemen çıkma oranına sahip sayfalar, Google\'a kötü kullanıcı deneyimi sinyali gönderir. Isı haritaları ve oturum kayıtları ile kullanıcı davranışını analiz etmek, hem dönüşümü artıracak hem de SEO performansını iyileştirecek değişiklikleri belirlemenizi sağlar.',
        'Sepete ekleme oranı, ortalama oturum süresi ve sayfa başına görüntüleme gibi davranışsal metrikler dolaylı olarak arama sıralamalarını etkiler. E-ticaret SEO stratejisi yalnızca teknik optimizasyonla sınırlı kalmamalıdır.',
      ]},
      { baslik: 'Ölçüm ve Raporlama', paragraflar: [
        'E-ticaret SEO performansını doğru ölçmek için Google Analytics 4\'te organik trafikten kaynaklanan işlemleri ayrı raporlamak gerekir. Search Console\'daki "Search results" raporu hangi sorguların en fazla tıklama getirdiğini gösterir.',
        'Anahtar kelime sıralaması takibinde Ahrefs veya SEMrush\'ın haftalık raporu, rakip domain karşılaştırmasında değer taşır. Aylık SEO raporlarında trafik, sıralama ve dönüşüm verilerinin bir arada sunulması ROI\'yi somut biçimde ortaya koyar.',
      ]},
    ]
  },
  'geo-nedir': {
    baslik: 'GEO Nedir? Generative Engine Optimization Rehberi',
    tarih: '12 Nisan 2025', sure: '10 dk', etiket: 'AI & GEO',
    ozet: 'ChatGPT, Perplexity ve Google AI Overview\'da içeriklerinizin kaynak gösterilmesi için GEO stratejileri.',
    bolumler: [
      { baslik: 'GEO\'nun Tanımı ve Önemi', paragraflar: [
        'Generative Engine Optimization (GEO), yapay zekâ destekli arama motorlarında ve yanıt sistemlerinde içeriklerinizin kaynak olarak alıntılanmasını sağlayan optimizasyon pratiğidir. Klasik SEO\'nun geliştirdiği ranking faktörlerinden farklı olarak GEO, LLM\'lerin içeriği nasıl sindirdiğine odaklanır.',
        'Arama davranışındaki dönüşüm GEO\'yu kritik bir disiplin haline getirmektedir. AI Overview\'da kaynak olarak gösterilen siteler, marka güvenilirliği ve direct traffic açısından önemli kazanımlar elde etmektedir.',
      ]},
      { baslik: 'GEO için İçerik Stratejisi', paragraflar: [
        'LLM\'lerin tercih ettiği içerik yapısı klasik SEO içeriğinden ayrışır. Yapay zekâ modelleri; net tanımlar içeren, kaynaklara atıfta bulunan, sayısal veriler ve araştırma bulgularına dayanan içerikleri tercih eder.',
        'E-E-A-T sinyalleri GEO için de geçerliliğini korur. Yazar kimliği ve kurumsal otorite sinyalleri, içeriğin LLM tarafından güvenilir kaynak olarak tanınmasını kolaylaştırır.',
      ]},
      { baslik: 'llms.txt Implementasyonu', paragraflar: [
        'llms.txt dosyası, web sitelerinin LLM tabanlı sistemlere içeriklerini nasıl kullanmalarını istediklerini bildirdiği standart bir dosyadır. Site kök dizinine `/llms.txt` olarak eklenen bu dosya, AI tarayıcılarına rehberlik eder.',
        'Dosya yapısı; Allow, Disallow ve Sitemap direktiflerine benzer sözdizimi kullanır. JSON-LD meta verileriyle desteklenen llms.txt, LLM\'lerin içeriği doğru bağlamda sindirmesini kolaylaştırır.',
      ]},
      { baslik: 'Yapılandırılmış İçerik Tasarımı', paragraflar: [
        '"Nedir", "nasıl çalışır" ve "neden önemlidir" yapısındaki bölümleri açık yanıtlayan içerikler, GEO açısından kritik öneme sahiptir. FAQPage schema markup bu sinyali güçlendirir.',
        'Orijinal veriler, araştırma atıfları ve uzman görüşleri içeren içerikler, LLM\'lerin alıntı kaynağı olarak seçme eğilimini artırır.',
      ]},
      { baslik: 'AI Overview Optimizasyonu', paragraflar: [
        'Google AI Overview\'da kaynak olmak için içeriğin özet çıkarılabilir bir yapıda yazılması gerekir. Giriş paragrafının soruya doğrudan yanıt vermesi ve yazarın uzmanlığının sayfa içinde kanıtlanması önemlidir.',
        'Uzun formlu, kapsamlı içerikler AI Overview\'ın tercih ettiği kaynak profiliyle örtüşmektedir. Schema markup eklemek bu olasılığı artırır.',
      ]},
      { baslik: 'GEO Performansını Ölçme', paragraflar: [
        'GEO performansı ölçmek için branded aramaları takip edin, Perplexity ve ChatGPT\'de marka adınızı test edin ve AI Overview görünürlüğünüzü düzenli kontrol edin.',
        'Direkt trafik artışı, branded arama hacmi ve unlinked brand mention sayısı, GEO başarısının dolaylı göstergeleridir.',
      ]},
    ]
  },
};

const DEFAULT_BOLUMLER = (baslik) => [
  { baslik: 'Giriş ve Temel Kavramlar', paragraflar: ['Bu konunun temel dinamiklerini anlamak, doğru strateji geliştirmenin başlangıç noktasıdır. Arama motorlarının içeriği değerlendirme biçimi sürekli evrilmekte; bu nedenle güncel yaklaşımları takip etmek rekabet avantajı sağlamaktadır.', 'Veriye dayalı karar alma, sezgisel tahminlerin yerini almalıdır. Düzenli ölçüm, test ve optimizasyon döngüsü, başarılı SEO programlarının ortak paydası olarak öne çıkmaktadır.'] },
  { baslik: 'Strateji Geliştirme', paragraflar: ['Etkili bir strateji için önce mevcut durumun kapsamlı analizi, ardından öncelikli aksiyon alanlarının belirlenmesi ve ölçülebilir hedeflerin tanımlanması gerekmektedir. Rakip analizi ve pazar araştırması bu sürecin ayrılmaz parçalarıdır.', 'Uzun vadeli organik büyüme, kısa vadeli taktiklerin ötesinde bütünsel bir bakış açısı gerektirir. İçerik kalitesi, teknik sağlık ve otorite inşasının bir arada yönetilmesi sürdürülebilir başarıyı destekler.'] },
  { baslik: 'Teknik Uygulama', paragraflar: ['Teknik altyapı olmadan içerik ve backlink çalışmalarının etkinliği ciddi ölçüde kısıtlanır. Crawlability, indeksleme, hız ve yapılandırılmış veri; teknik SEO\'nun dört temel direğini oluşturur.', 'Düzenli teknik denetimler ve proaktif sorun tespiti, SEO programının sağlıklı işleyişini garanti altına alır. Her büyük site değişikliği öncesinde ve sonrasında denetim yapılması önerilir.'] },
  { baslik: 'İçerik Optimizasyonu', paragraflar: ['Arama niyetine uygun içerik formatı seçmek, on-page optimizasyonun en stratejik boyutudur. Informational, commercial ve transactional niyetlerin her biri farklı içerik yapısı gerektirir.', 'Evergreen içerikler, düzenli güncellemelerle uzun vadeli organik trafik sağlar. İçerik denetimleri yoluyla düşük performanslı sayfaları tespit etmek ve iyileştirmek, site genelindeki kaliteyi artırır.'] },
  { baslik: 'Ölçüm ve Analiz', paragraflar: ['Doğru KPI\'ların belirlenmesi ve düzenli raporlama döngüsünün oluşturulması başarılı bir SEO programının temelini oluşturur. Organik trafik, sıralama ve dönüşüm verilerinin birlikte değerlendirilmesi gerçek iş değerini ortaya koyar.', 'Google Search Console, GA4 ve rank tracker verilerini birleştiren otomatik raporlar izleme sürecini kolaylaştırır. Rakip karşılaştırması yapan görselleştirmeler karar alıcıların bağlamı hızlı kavramasına yardımcı olur.'] },
  { baslik: 'Gelecek Perspektifi', paragraflar: ['Yapay zeka ve makine öğrenmesinin arama algoritmalarını şekillendirdiği günümüzde en iyi pratikler hızla evrilmektedir. GEO ve E-E-A-T sinyallerine verilen artan önem, içerik stratejisinin yeniden değerlendirilmesini zorunlu kılmaktadır.', 'Veri odaklı, çevik ve kullanıcı merkezli yaklaşım, gelecekteki algoritma değişikliklerine karşı en sağlam pozisyonu oluşturur. Sürekli öğrenme ve test etme döngüsü başarının anahtarıdır.'] },
];

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  const post = POSTS[slug];
  const [aktifBaslik, setAktifBaslik] = useState(0);

  const baslik = post?.baslik || slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Blog';
  const bolumler = post?.bolumler || DEFAULT_BOLUMLER(baslik);
  const etiket = post?.etiket || 'SEO';
  const sure = post?.sure || '7 dk';
  const tarih = post?.tarih || '2025';
  const ozet = post?.ozet || '';
  const canonicalUrl = `https://fatihemincakiroglu.com/blog/${slug}`;

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= 120) setAktifBaslik(i);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": baslik,
    "description": ozet,
    "author": { "@type": "Person", "name": "Fatih Emin Çakıroğlu", "url": "https://fatihemincakiroglu.com", "jobTitle": "SEO & Dijital Pazarlama Uzmanı" },
    "publisher": { "@type": "Person", "name": "Fatih Emin Çakıroğlu", "url": "https://fatihemincakiroglu.com" },
    "datePublished": tarih,
    "dateModified": tarih,
    "url": canonicalUrl,
    "inLanguage": "tr",
    "articleSection": etiket,
    "timeRequired": `PT${sure.replace(' dk', '')}M`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://fatihemincakiroglu.com/blog" },
      { "@type": "ListItem", "position": 3, "name": baslik, "item": canonicalUrl }
    ]
  };

  return (
    <>
      <Head>
        <title>{baslik} | Fatih Emin Çakıroğlu</title>
        <meta name="description" content={ozet || `${baslik} hakkında kapsamlı rehber ve strateji.`} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <Link href="/blog" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← Blog\'a dön</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ padding: '4px 12px', borderRadius: '4px', background: '#fff3ee', color: 'var(--orange)', fontSize: '11px', fontWeight: 700 }}>{etiket}</span>
              <span style={{ fontSize: '12px', color: '#bbb' }}>· {tarih} · {sure} okuma</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>{baslik}</h1>
            {ozet && <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.6, borderLeft: '3px solid var(--orange)', paddingLeft: '16px', marginBottom: '24px' }}>{ozet}</p>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>F</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>SEO & Dijital Pazarlama Uzmanı</div>
              </div>
            </div>
          </div>
        </div>

        {/* İçerik + Sticky Sidebar */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px 96px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '40px', alignItems: 'start' }}>

          {/* Makale */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', border: '1px solid #eee' }}>
            {bolumler.map((b, bi) => (
              <div key={bi} data-section={bi} style={{ marginBottom: bi < bolumler.length - 1 ? '44px' : '0' }}>
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
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* İçindekiler */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #eee' }}>
              <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'var(--orange)', display: 'inline-block' }}></span>
                İÇİNDEKİLER
              </div>
              {bolumler.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', cursor: 'pointer', padding: '6px 8px', borderRadius: '6px', background: aktifBaslik === i ? 'rgba(232,86,10,0.06)' : 'transparent', transition: 'background 0.15s' }}
                  onClick={() => { document.querySelector(`[data-section="${i}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setAktifBaslik(i); }}
                >
                  <span style={{ fontSize: '12px', color: aktifBaslik === i ? 'var(--orange)' : '#ccc', fontWeight: 700, flexShrink: 0, minWidth: '20px' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: '13px', color: aktifBaslik === i ? 'var(--orange)' : '#666', lineHeight: 1.4, fontWeight: aktifBaslik === i ? 600 : 400 }}>{b.baslik}</span>
                </div>
              ))}
            </div>

            {/* Yazar */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '16px' }}>F</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                  <div style={{ fontSize: '11px', color: '#aaa' }}>SEO Uzmanı · İstanbul</div>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#777', lineHeight: 1.6 }}>8+ yıl deneyimli SEO ve dijital pazarlama danışmanı.</p>
              <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ display: 'block', marginTop: '10px', fontSize: '12px', color: 'var(--orange)', textDecoration: 'none', fontWeight: 600 }}>LinkedIn Profili →</a>
            </div>

            {/* CTA */}
            <div style={{ background: '#1a1612', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>ÜCRETSİZ DANIŞMA</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff', marginBottom: '8px', lineHeight: 1.4 }}>Bu konuda yardım almak ister misiniz?</h3>
              <Link href="/iletisim">
                <button style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--orange)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
                  İletişime Geç →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
