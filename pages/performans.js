import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const ISTATISTIKLER = [
  { rakam: '4.2x', tr: 'Ortalama ROAS — e-ticaret kampanyaları', en: 'Average ROAS — e-commerce campaigns' },
  { rakam: '%38', tr: 'Ortalama CAC düşüşü — ilk 90 günde', en: 'Average CAC reduction — first 90 days' },
  { rakam: '2.8x', tr: 'Dönüşüm oranı artışı — CRO çalışmaları', en: 'Conversion rate lift — CRO work' },
  { rakam: '%94', tr: 'Müşteri memnuniyeti — performans raporlaması', en: 'Client satisfaction — performance reporting' },
]

const HIZMETLER = {
  tr: [
    { ikon: '🔍', baslik: 'Google Ads & Arama Ağı', aciklama: 'Anahtar kelime stratejisi, kalite skoru optimizasyonu, akıllı teklif stratejileri ve arama niyetiyle eşleşen reklam metinleriyle maksimum ROAS.', badge: 'Core' },
    { ikon: '📱', baslik: 'Meta Ads (Facebook & Instagram)', aciklama: 'Hedef kitle segmentasyonu, creative testing, retargeting hunileri ve lookalike audience stratejileriyle ölçeklenebilir sosyal medya performansı.', badge: '' },
    { ikon: '📡', baslik: 'Programatik & Display Ağı', aciklama: 'DSP tabanlı programatik satın alma, contextual targeting ve görsel banner kampanyalarıyla geniş erişim ve marka bilinirliği.', badge: '' },
    { ikon: '🧪', baslik: 'CRO & A/B Testleri', aciklama: 'Açılış sayfası optimizasyonu, kullanıcı akışı analizi ve sistematik A/B testleriyle trafik → dönüşüm oranını artırma.', badge: 'Yüksek Etki' },
    { ikon: '⚡', baslik: 'Marketing Automation & E-posta', aciklama: 'Klaviyo, ActiveCampaign veya HubSpot ile kurulmuş davranış tabanlı e-posta serileri ve CRM entegrasyonu.', badge: '' },
    { ikon: '🤝', baslik: 'Influencer Performans Kampanyaları', aciklama: 'Ölçülebilir KPI\'lara bağlı influencer iş birlikleri, içerik üretimi ve performans komisyonu modelleri.', badge: '' },
  ],
  en: [
    { ikon: '🔍', baslik: 'Google Ads & Search Network', aciklama: 'Maximum ROAS through keyword strategy, quality score optimization, smart bidding strategies and ad copy that matches search intent.', badge: 'Core' },
    { ikon: '📱', baslik: 'Meta Ads (Facebook & Instagram)', aciklama: 'Scalable social media performance through audience segmentation, creative testing, retargeting funnels and lookalike audience strategies.', badge: '' },
    { ikon: '📡', baslik: 'Programmatic & Display Network', aciklama: 'Broad reach and brand awareness through DSP-based programmatic buying, contextual targeting and visual banner campaigns.', badge: '' },
    { ikon: '🧪', baslik: 'CRO & A/B Testing', aciklama: 'Increasing traffic → conversion rates through landing page optimization, user flow analysis and systematic A/B testing.', badge: 'High Impact' },
    { ikon: '⚡', baslik: 'Marketing Automation & Email', aciklama: 'Behavior-based email sequences and CRM integration built on Klaviyo, ActiveCampaign or HubSpot.', badge: '' },
    { ikon: '🤝', baslik: 'Influencer Performance Campaigns', aciklama: 'Measurable KPI-tied influencer partnerships, content production and performance commission models.', badge: '' },
  ],
}

const FUNNEL = {
  tr: [
    { asama: 'Farkındalık', ing: 'Awareness', metric: 'CPM, Reach, Impression', renk: '#6366f1', aciklama: 'Hedef kitleyi tanımla. Google Display, Meta ve programatik kanallarla markanızı doğru insanlara gösterin. İçerik pazarlama ve SEO bu aşamanın organik kanadını oluşturur.' },
    { asama: 'Değerlendirme', ing: 'Consideration', metric: 'CTR, CPC, Session Quality', renk: '#0ea5e9', aciklama: 'İlgili ziyaretçiyi eğit. Arama ağı kampanyaları, retargeting ve açılış sayfası optimizasyonuyla nitelikli trafik çekin. Bu aşamada kalite skoru ve beklenti yönetimi kritiktir.' },
    { asama: 'Dönüşüm', ing: 'Conversion', metric: 'CVR, CPA, ROAS', renk: '#f59e0b', aciklama: 'Ziyaretçiyi müşteriye çevir. CRO, A/B testleri, checkout optimizasyonu ve teklif mekanikleriyle dönüşüm oranını maksimize edin.' },
    { asama: 'Elde Tutma', ing: 'Retention', metric: 'LTV, Churn Rate, NPS', renk: '#16a34a', aciklama: 'Müşteriyi sadık kullanıcıya dönüştür. E-posta otomasyonu, segmentasyon ve upsell/cross-sell stratejileriyle LTV\'yi artırın.' },
    { asama: 'Yönlendirme', ing: 'Referral', metric: 'Referral Rate, Virality K', renk: '#e8560a', aciklama: 'Müşteriyi büyüme motoruna çevir. Referral programları ve viral mekaniklerle düşük maliyetli yeni müşteri edinimi sağlayın.' },
  ],
  en: [
    { asama: 'Awareness', ing: 'Awareness', metric: 'CPM, Reach, Impression', renk: '#6366f1', aciklama: 'Define the target audience. Show your brand to the right people through Google Display, Meta and programmatic channels. Content marketing and SEO form the organic wing of this stage.' },
    { asama: 'Consideration', ing: 'Consideration', metric: 'CTR, CPC, Session Quality', renk: '#0ea5e9', aciklama: 'Educate the interested visitor. Drive qualified traffic with search network campaigns, retargeting and landing page optimization. Quality score and expectation management are critical at this stage.' },
    { asama: 'Conversion', ing: 'Conversion', metric: 'CVR, CPA, ROAS', renk: '#f59e0b', aciklama: 'Convert visitors into customers. Maximize conversion rates with CRO, A/B testing, checkout optimization and offer mechanics.' },
    { asama: 'Retention', ing: 'Retention', metric: 'LTV, Churn Rate, NPS', renk: '#16a34a', aciklama: 'Turn customers into loyal users. Increase LTV with email automation, segmentation and upsell/cross-sell strategies.' },
    { asama: 'Referral', ing: 'Referral', metric: 'Referral Rate, Virality K', renk: '#e8560a', aciklama: 'Turn customers into growth engines. Enable low-cost new customer acquisition through referral programs and viral mechanics.' },
  ],
}

const SUREC = {
  tr: [
    { no: '01', baslik: 'Mevcut Durum Analizi & KPI Belirleme', aciklama: 'GA4, Google Ads ve Meta Ads hesaplarınızı derinlemesine analiz ederim. Mevcut CAC, ROAS, CVR ve LTV baseline\'ı tespit eder; işletme hedeflerinizle hizalanmış spesifik, ölçülebilir KPI\'lar belirlerim.' },
    { no: '02', baslik: 'Büyüme Fırsatlarını Önceliklendirme (ICE)', aciklama: 'Her büyüme fırsatını ICE (Impact–Confidence–Ease) çerçevesiyle puanlarım. En yüksek potansiyelli, en hızlı uygulanabilir aksiyonlar önce hayata geçirilir.' },
    { no: '03', baslik: 'Hızlı Deney Döngüleri (Sprint)', aciklama: '2 haftalık sprint\'lerle hipotez → test → ölçüm → iterasyon döngüsü kurarım. Her sprint\'in çıktısı bir sonrakinin girdisine dönüşür; öğrenme hızı geometrik artar.' },
    { no: '04', baslik: 'Ölçüm, Analiz & Kanal Optimizasyonu', aciklama: 'Canlı dashboard üzerinden kanal bazında performansı izlerim. Düşük performanslı kampanyaları hızla keser, yüksek ROAS\'lı segmentlere bütçe aktarırım.' },
    { no: '05', baslik: 'Ölçeklendirme & Bütçe Dağılımı', aciklama: 'Kanıtlanmış büyüme kanallarını ölçeklendiririm. Portföy yaklaşımıyla bütçeyi risk-getiri dengesine göre dağıtır, kazançların sürdürülebilir büyümeye dönüşmesini sağlarım.' },
  ],
  en: [
    { no: '01', baslik: 'Current State Analysis & KPI Setting', aciklama: 'I deeply analyze your GA4, Google Ads and Meta Ads accounts. I identify current CAC, ROAS, CVR and LTV baselines and set specific, measurable KPIs aligned with your business goals.' },
    { no: '02', baslik: 'Prioritizing Growth Opportunities (ICE)', aciklama: 'I score each growth opportunity using the ICE (Impact–Confidence–Ease) framework. The highest-potential, fastest-implementable actions are executed first.' },
    { no: '03', baslik: 'Rapid Experimentation Cycles (Sprints)', aciklama: 'I set up a hypothesis → test → measure → iteration cycle with 2-week sprints. Each sprint\'s output becomes the next one\'s input; learning velocity grows geometrically.' },
    { no: '04', baslik: 'Measurement, Analysis & Channel Optimization', aciklama: 'I monitor channel-by-channel performance on a live dashboard. I quickly cut low-performing campaigns and allocate budget to high-ROAS segments.' },
    { no: '05', baslik: 'Scaling & Budget Allocation', aciklama: 'I scale proven growth channels. Using a portfolio approach, I distribute budget according to risk-return balance and ensure gains translate into sustainable growth.' },
  ],
}

const METRIKLER = {
  tr: [
    { metrik: 'CAC', acik: 'Müşteri Edinim Maliyeti', formul: 'Toplam Pazarlama Harcaması / Kazanılan Müşteri Sayısı', iyi: '< Sektör benchmarkı', neden: 'CAC\'ı düşürmenin yolları: Hedefleme hassasiyetini artırma, kalite skoru optimizasyonu, organik+ücretli mix\'in dengelenmesi.' },
    { metrik: 'ROAS', acik: 'Reklam Harcaması Getirisi', formul: 'Reklam Geliri / Reklam Harcaması', iyi: 'E-ticaret: 4-8x+', neden: 'ROAS artırmanın yolları: Creative optimizasyonu, negatif anahtar kelime yönetimi, en iyi segmentlere yoğunlaşma.' },
    { metrik: 'CVR', acik: 'Dönüşüm Oranı', formul: 'Dönüşüm Sayısı / Tıklama Sayısı × 100', iyi: 'E-ticaret: >%2-3', neden: 'CRO çalışmaları, açılış sayfası hızı ve form optimizasyonu CVR\'yi doğrudan etkiler.' },
    { metrik: 'LTV', acik: 'Müşteri Yaşam Boyu Değeri', formul: 'Ort. Sipariş × Satın Alma Frekansı × Müşteri Ömrü', iyi: 'LTV:CAC > 3:1', neden: 'LTV\'yi artırmak için e-posta otomasyon, upsell programları ve retention kampanyaları kritiktir.' },
    { metrik: 'CPA', acik: 'Edinim Başına Maliyet', formul: 'Toplam Harcama / Dönüşüm Sayısı', iyi: '< LTV × %30', neden: 'Target CPA teklif stratejisi ve hedef kitle kalitesi CPA\'yı belirleyen iki temel faktördür.' },
    { metrik: 'CTR', acik: 'Tıklama Oranı', formul: 'Tıklama / Gösterim × 100', iyi: 'Arama: >%5-8', neden: 'Yüksek CTR kalite skoru artırır, CPC\'yi düşürür. Başlık ve uzantı optimizasyonu kritiktir.' },
  ],
  en: [
    { metrik: 'CAC', acik: 'Customer Acquisition Cost', formul: 'Total Marketing Spend / Customers Acquired', iyi: '< Industry benchmark', neden: 'Ways to reduce CAC: Increasing targeting precision, quality score optimization, balancing organic+paid mix.' },
    { metrik: 'ROAS', acik: 'Return on Ad Spend', formul: 'Ad Revenue / Ad Spend', iyi: 'E-commerce: 4-8x+', neden: 'Ways to increase ROAS: Creative optimization, negative keyword management, concentration on best segments.' },
    { metrik: 'CVR', acik: 'Conversion Rate', formul: 'Conversions / Clicks × 100', iyi: 'E-commerce: >2-3%', neden: 'CRO work, landing page speed and form optimization directly impact CVR.' },
    { metrik: 'LTV', acik: 'Customer Lifetime Value', formul: 'Avg. Order × Purchase Frequency × Customer Lifespan', iyi: 'LTV:CAC > 3:1', neden: 'Email automation, upsell programs and retention campaigns are critical for increasing LTV.' },
    { metrik: 'CPA', acik: 'Cost Per Acquisition', formul: 'Total Spend / Conversions', iyi: '< LTV × 30%', neden: 'Target CPA bidding strategy and audience quality are the two key factors determining CPA.' },
    { metrik: 'CTR', acik: 'Click-Through Rate', formul: 'Clicks / Impressions × 100', iyi: 'Search: >5-8%', neden: 'High CTR boosts quality score, reducing CPC. Headline and extension optimization are critical.' },
  ],
}

const SEKTORLER = {
  tr: [
    { ikon: '🛍️', baslik: 'E-Ticaret & D2C Markalar', aciklama: 'Google Shopping, Meta katalog kampanyaları, sepet terk e-postası ve CLV optimizasyonu. D2C markaların ölçeklenmesi için kanıtlanmış büyüme playbook\'u.' },
    { ikon: '💻', baslik: 'SaaS & PLG Ürünleri', aciklama: 'Product-Led Growth çerçevesinde freemium-to-paid dönüşüm optimizasyonu, activation metriklerini iyileştirme ve PQL (Product Qualified Lead) stratejisi.' },
    { ikon: '🚀', baslik: 'Startup\'lar için Hızlı Büyüme', aciklama: 'Sınırlı bütçeyle maksimum büyüme için kanal keşif süreci, product-market fit testleri ve ilk 90 günlük growth playbook uygulaması.' },
    { ikon: '🏢', baslik: 'Kurumsal Performans Dönüşümü', aciklama: 'Mevcut ajans yönetimi denetimi, in-house ekip eğitimi, attribution modeli kurulumu ve enterprise-grade raporlama altyapısı.' },
  ],
  en: [
    { ikon: '🛍️', baslik: 'E-Commerce & D2C Brands', aciklama: 'Google Shopping, Meta catalog campaigns, cart abandonment email and CLV optimization. Proven growth playbook for scaling D2C brands.' },
    { ikon: '💻', baslik: 'SaaS & PLG Products', aciklama: 'Freemium-to-paid conversion optimization within a Product-Led Growth framework, improving activation metrics and PQL (Product Qualified Lead) strategy.' },
    { ikon: '🚀', baslik: 'Startups: Rapid Growth Playbook', aciklama: 'Channel discovery process, product-market fit testing and first-90-day growth playbook implementation for maximum growth on a limited budget.' },
    { ikon: '🏢', baslik: 'Enterprise Performance Transformation', aciklama: 'Current agency management audit, in-house team training, attribution model setup and enterprise-grade reporting infrastructure.' },
  ],
}

const PAKETLER = {
  tr: [
    { isim: 'Starter', fiyat: 'Teklif Al', aciklama: 'Tek kanal odaklı başlangıç paketi', ozellikler: ['1 reklam kanalı yönetimi', 'Aylık performans raporu', 'GA4 kurulumu & hedef takibi', 'Temel CRO denetimi', 'E-posta desteği'], renk: '#0ea5e9', popular: false },
    { isim: 'Growth', fiyat: 'Teklif Al', aciklama: 'Çok kanallı performans ve dönüşüm', ozellikler: ['2-3 kanal yönetimi (Google + Meta)', 'Haftalık optimizasyon & rapor', 'A/B test kurulumu', 'Landing page CRO', 'Marketing automation kurulumu', 'Haftalık görüşme'], renk: '#e8560a', popular: true },
    { isim: 'Scale', fiyat: 'Teklif Al', aciklama: 'Tam kapsamlı growth & performans', ozellikler: ['Sınırsız kanal yönetimi', 'Günlük optimizasyon', 'Canlı performans dashboard', 'Tam funnel CRO & A/B test', 'Growth sprint metodolojisi', 'Dedicated büyüme danışmanı'], renk: '#16a34a', popular: false },
  ],
  en: [
    { isim: 'Starter', fiyat: 'Get a Quote', aciklama: 'Single-channel focused starter package', ozellikler: ['1 ad channel management', 'Monthly performance report', 'GA4 setup & goal tracking', 'Basic CRO audit', 'Email support'], renk: '#0ea5e9', popular: false },
    { isim: 'Growth', fiyat: 'Get a Quote', aciklama: 'Multi-channel performance and conversion', ozellikler: ['2-3 channel management (Google + Meta)', 'Weekly optimization & reporting', 'A/B test setup', 'Landing page CRO', 'Marketing automation setup', 'Weekly meeting'], renk: '#e8560a', popular: true },
    { isim: 'Scale', fiyat: 'Get a Quote', aciklama: 'Full-scope growth & performance', ozellikler: ['Unlimited channel management', 'Daily optimization', 'Live performance dashboard', 'Full funnel CRO & A/B test', 'Growth sprint methodology', 'Dedicated growth advisor'], renk: '#16a34a', popular: false },
  ],
}

const FAQS = {
  tr: [
    { s: 'Performans pazarlama bütçesi ne kadar olmalıdır?', c: 'Minimum etkili bütçe sektöre ve hedefe göre değişir. Arama ağı kampanyaları için aylık 5.000-10.000 TL başlangıç noktasıdır; Meta Ads için 3.000-8.000 TL. Bütçeyi belirleyen temel faktör hedef CPA ve beklenen hacimdir. İlk görüşmede sektörünüze özgü benchmark\'ları paylaşırım.' },
    { s: 'Google Ads mi, Meta Ads mi: Hangisi daha etkilidir?', c: 'İkisi farklı aşamalara hizmet eder. Google Ads, mevcut talebi yakalar — arayan kişiye anında ulaşırsınız. Meta Ads yeni talep yaratır — henüz aramayan ama ilgi duyabilecek kitleye ulaşırsınız. En etkili strateji ikisini birlikte uygulamaktır.' },
    { s: 'CRO çalışmaları ne zaman sonuç verir?', c: 'İlk A/B testleri genellikle 2-4 haftada istatistiksel anlamlılığa ulaşır. Anlamlı CVR iyileşmeleri 4-8 haftada görülmeye başlar. Büyük landing page revizyonları 4 hafta içinde net sonuç gösterir.' },
    { s: 'Growth ajansı ile çalışmaya nasıl başlanır?', c: 'İlk adım ücretsiz bir büyüme denetimidir. GA4, reklam hesapları ve mevcut funnel yapınızı incelerim, en büyük büyüme fırsatlarını tespit ederim ve somut bir aksiyon planı sunarım.' },
  ],
  en: [
    { s: 'How much should a performance marketing budget be?', c: 'Minimum effective budget varies by industry and goal. 5,000-10,000 TRY/month is a starting point for search network campaigns; 3,000-8,000 TRY for Meta Ads. The key factors determining budget are target CPA and expected volume. I share industry-specific benchmarks in the first meeting.' },
    { s: 'Google Ads vs. Meta Ads: Which is more effective?', c: 'They serve different stages. Google Ads captures existing demand — you reach people who are actively searching. Meta Ads creates new demand — you reach audiences who haven\'t searched yet but might be interested. The most effective strategy uses both together.' },
    { s: 'When do CRO results appear?', c: 'Initial A/B tests typically reach statistical significance in 2-4 weeks. Meaningful CVR improvements start appearing at 4-8 weeks. Major landing page revisions show clear results within 4 weeks.' },
    { s: 'How do you start working with a growth agency?', c: 'The first step is a free growth audit. I review your GA4, ad accounts and existing funnel structure, identify the biggest growth opportunities and present a concrete action plan.' },
  ],
}

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifFaq, setAktifFaq] = useState(null)
  const [aktifSurec, setAktifSurec] = useState(0)
  const [aktifFunnel, setAktifFunnel] = useState(0)
  const [aktifMetrik, setAktifMetrik] = useState(0)

  const hizmetler = isEn ? HIZMETLER.en : HIZMETLER.tr
  const surec = isEn ? SUREC.en : SUREC.tr
  const faqlar = isEn ? FAQS.en : FAQS.tr
  const sektorler = isEn ? SEKTORLER.en : SEKTORLER.tr
  const paketler = isEn ? PAKETLER.en : PAKETLER.tr
  const funnel = isEn ? FUNNEL.en : FUNNEL.tr
  const metrikler = isEn ? METRIKLER.en : METRIKLER.tr

  const t = isEn ? {
    badge: 'PERFORMANCE & GROWTH',
    h1a: 'Performance Marketing & Growth Services:',
    h1b: 'Strategic Approach for Measurable Growth',
    h1alt: 'Data-Driven Growth Strategies in Performance Marketing',
    desc: 'Not all marketing spend is equal. I build performance marketing systems where every dollar is accountable — tracked, optimized and scaled based on real ROI data.',
    btn1: 'Get a Free Growth Audit →', btn2: 'View Results',
    what_h2: 'What is Performance Marketing and Why is It Critical?',
    what_p1: 'Performance marketing is a results-based approach where you only pay for measurable outcomes — clicks, conversions, leads or sales. Unlike traditional advertising (pay to be seen), performance marketing is pay-to-perform.',
    what_p2: 'The shift matters because it completely changes accountability. Every campaign has a clear success metric. Every budget decision is justified by data. Every channel earns its place by delivering measurable ROI.',
    diff_h3: 'Performance Marketing vs. Traditional Advertising',
    roi_h3: 'The Core Components of ROI-Focused Growth',
    roi_points: ['Data infrastructure (GA4, attribution, pixels)', 'Funnel-mapped campaign architecture', 'Systematic testing and iteration', 'Cross-channel optimization and budget fluidity'],
    growth_h3: 'Growth Hacking vs. Growth Marketing',
    growth_p: 'Growth hacking focuses on rapid, often short-term experiments to find what works. Growth marketing takes those experiments and builds sustainable systems around the winners. The latter is what creates compounding returns — and it\'s what we do.',
    funnel_h2: 'Growth Funnel: From Acquisition to Retention',
    hizmetler_h2: 'Our Performance & Growth Services',
    surec_h2: 'How Our Growth Strategy Works',
    metrik_h2: 'Core Metrics: What We Measure & How We Report',
    metrik_attr_h3: 'Attribution Models: Last Click vs. Data-Driven',
    metrik_attr_p: 'Last-click attribution gives 100% credit to the final touchpoint — and systematically undervalues top-of-funnel channels like display and social. Data-driven attribution (DDA) distributes credit across all touchpoints based on actual conversion data. We use DDA by default and build reporting that shows the true value of every channel.',
    metrik_dash_h3: 'Live Dashboard & Weekly Reporting',
    metrik_dash_p: 'You get access to a live dashboard showing all key metrics in real time. Weekly reports highlight what changed, why it changed and what we\'re doing about it. No vanity metrics — only data that connects to business outcomes.',
    sektor_h2: 'Which Businesses Benefit Most?',
    faq_h2: 'Frequently Asked Questions',
    cta_h2: 'Explore Our Performance & Growth Packages',
    cta_desc: 'Start with a free growth audit. I\'ll identify your biggest growth opportunities and show you exactly what a custom performance strategy would look like.',
    cta_btn: 'Start Free Growth Audit →',
    popular_badge: 'Most Popular',
    breadcrumb: ['Home', 'Services', 'Performance & Growth'],
    diff_rows: [
      ['Payment model', 'Pay for exposure', 'Pay for results'],
      ['Accountability', 'Brand lift, impressions', 'CAC, ROAS, CVR'],
      ['Optimization', 'Post-campaign analysis', 'Real-time, continuous'],
      ['Budget control', 'Fixed spend', 'Dynamic, ROI-driven'],
    ],
    diff_cols: ['Dimension', 'Traditional Advertising', 'Performance Marketing'],
  } : {
    badge: 'PERFORMANS & GROWTH',
    h1a: 'Performans Pazarlama & Growth Hizmetleri:',
    h1b: 'Ölçülebilir Büyüme İçin Stratejik Yaklaşım',
    h1alt: 'Performans Pazarlamada Veriye Dayalı Büyüme Stratejileri',
    desc: 'Her pazarlama harcaması eşit değildir. Her lira\'nın hesabının verildiği — gerçek ROI verisine göre izlenen, optimize edilen ve ölçeklendirilen performans pazarlama sistemleri kuruyorum.',
    btn1: 'Ücretsiz Büyüme Analizi Al →', btn2: 'Sonuçları Gör',
    what_h2: 'Performans Pazarlama Nedir ve Neden Kritiktir?',
    what_p1: 'Performans pazarlama, yalnızca ölçülebilir sonuçlar için ödeme yaptığınız sonuç odaklı bir yaklaşımdır — tıklama, dönüşüm, potansiyel müşteri veya satış. Geleneksel reklamcılığın aksine (görünmek için öde), performans pazarlama performans için öde prensibiyle çalışır.',
    what_p2: 'Bu dönüşüm önemlidir çünkü hesap verebilirliği tamamen değiştirir. Her kampanyanın net bir başarı metriği vardır. Her bütçe kararı veriyle gerekçelenir. Her kanal, ölçülebilir ROI sunarak yerini kazanır.',
    diff_h3: 'Performans Pazarlama ile Geleneksel Reklamcılığın Farkı',
    roi_h3: 'ROI Odaklı Büyümenin Temel Bileşenleri',
    roi_points: ['Veri altyapısı (GA4, attribution, pixel\'lar)', 'Funnel haritasıyla eşleştirilmiş kampanya mimarisi', 'Sistematik test ve iterasyon', 'Çapraz kanal optimizasyonu ve dinamik bütçe yönetimi'],
    growth_h3: 'Growth Hacking ile Growth Marketing Arasındaki Ayrım',
    growth_p: 'Growth hacking, neyin işe yaradığını bulmak için hızlı, genellikle kısa vadeli deneyler yapar. Growth marketing bu deneyleri alır ve kazananlar etrafında sürdürülebilir sistemler inşa eder. İkincisi bileşik getiriler yaratır — ve biz tam bunu yapıyoruz.',
    funnel_h2: 'Growth Funnel: Edinimden Elde Tutmaya Tüm Süreç',
    hizmetler_h2: 'Performans & Growth Hizmetlerimiz',
    surec_h2: 'Growth Stratejimizin Çalışma Süreci',
    metrik_h2: 'Temel Metrikler: Neyi Ölçüyor, Nasıl Raporluyoruz?',
    metrik_attr_h3: 'Attribution Modelleri: Son Tıklama mı, Veri Odaklı mı?',
    metrik_attr_p: 'Son tıklama attribution, tüm krediyi son temas noktasına verir — ve sistematik olarak display ve sosyal gibi funnel üstü kanalların değerini küçümser. Veri odaklı attribution (DDA), gerçek dönüşüm verilerine dayalı olarak krediyi tüm temas noktalarına dağıtır. DDA\'yı varsayılan olarak kullanır ve her kanalın gerçek değerini gösteren raporlama yaparız.',
    metrik_dash_h3: 'Canlı Dashboard & Haftalık Raporlama Süreci',
    metrik_dash_p: 'Tüm temel metrikleri gerçek zamanlı olarak gösteren canlı bir dashboard\'a erişirsiniz. Haftalık raporlar neyin değiştiğini, neden değiştiğini ve bu konuda ne yaptığımızı özetler. Boş metrik yok — yalnızca iş sonuçlarıyla bağlantılı veriler.',
    sektor_h2: 'Hangi İşletmeler En Çok Yararlanır?',
    faq_h2: 'Sıkça Sorulan Sorular',
    cta_h2: 'Performans & Growth Paketlerimizi Keşfedin',
    cta_desc: 'Ücretsiz bir büyüme denetimiyle başlayın. En büyük büyüme fırsatlarınızı belirler ve özel bir performans stratejisinin nasıl görüneceğini tam olarak gösteririm.',
    cta_btn: 'Ücretsiz Büyüme Analizi Başlat →',
    popular_badge: 'En Popüler',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'Performans & Growth'],
    diff_rows: [
      ['Ödeme modeli', 'Görünmek için öde', 'Sonuç için öde'],
      ['Hesap verebilirlik', 'Marka bilinirliği, görüntüleme', 'CAC, ROAS, CVR'],
      ['Optimizasyon', 'Kampanya sonrası analiz', 'Gerçek zamanlı, sürekli'],
      ['Bütçe kontrolü', 'Sabit harcama', 'Dinamik, ROI odaklı'],
    ],
    diff_cols: ['Boyut', 'Geleneksel Reklamcılık', 'Performans Pazarlama'],
  }

  return (
    <>
      <Head>
        <title>{isEn ? 'Performance Marketing & Growth | Fatih Emin Çakıroğlu' : 'Performans Pazarlama & Growth | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? 'Performance marketing and growth consulting: Google Ads, Meta Ads, CRO, marketing automation for measurable ROI.' : 'Performans pazarlama ve growth danışmanlığı: Google Ads, Meta Ads, CRO, marketing automation ile ölçülebilir ROI.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/performance-growth' : 'https://fatihemincakiroglu.com/performans'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/performans" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/performance-growth" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqlar.map(f=>({ "@type":"Question","name":f.s,"acceptedAnswer":{"@type":"Answer","text":f.c} }))})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>

        {/* BREADCRUMB */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/services' : '/hizmetler'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[1]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[2]}</span>
          </div>
        </div>

        {/* ─── HERO ─── */}
        <section style={{ background: 'linear-gradient(160deg, #0a0a1a 0%, #111827 50%, #0a0a1a 100%)', padding: '96px 32px 80px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 60%, rgba(232,86,10,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(99,102,241,0.08) 0%, transparent 50%)' }} />
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(232,86,10,0.15)', border: '1px solid rgba(232,86,10,0.3)', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '2px', marginBottom: '24px' }}>{t.badge}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '4px' }}>{t.h1a}</h1>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: 'var(--orange)', lineHeight: 1.1, marginBottom: '12px' }}>{t.h1b}</h1>
              <p style={{ fontSize: '17px', fontWeight: 600, color: '#9ca3af', fontStyle: 'italic', marginBottom: '16px' }}>{t.h1alt}</p>
              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.8, marginBottom: '36px', maxWidth: '520px' }}>{t.desc}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '15px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', boxShadow: '0 4px 24px rgba(232,86,10,0.35)' }}>{t.btn1}</Link>
                <Link href={isEn ? '/en/case-studies' : '/vakalar'} style={{ padding: '15px 32px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}>{t.btn2}</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {ISTATISTIKLER.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '22px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900, color: i % 2 === 0 ? 'var(--orange)' : '#a5b4fc', lineHeight: 1, marginBottom: '8px' }}>{s.rakam}</div>
                  <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.5 }}>{isEn ? s.en : s.tr}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PERFORMANS NEDİR ─── */}
        <section style={{ padding: '80px 32px', background: '#fff' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '28px', height: '2px', background: 'var(--orange)' }} />
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px' }}>PERFORMANCE</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>{t.what_h2}</h2>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '16px' }}>{t.what_p1}</p>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '28px' }}>{t.what_p2}</p>
                <div style={{ padding: '20px', background: 'rgba(232,86,10,0.06)', borderRadius: '12px', border: '1px solid rgba(232,86,10,0.15)', borderLeft: '4px solid var(--orange)', marginBottom: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 800, color: '#111', marginBottom: '10px' }}>{t.growth_h3}</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.75, margin: 0 }}>{t.growth_p}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '4px', height: '16px', background: 'var(--orange)', borderRadius: '2px', display: 'inline-block', flexShrink: 0 }} />{t.roi_h3}
                  </h3>
                  {t.roi_points.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#faf9f7', borderRadius: '8px', border: '1px solid #ede8e0', marginBottom: '8px', fontSize: '14px', color: '#444' }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 700 }}>→</span> {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Karşılaştırma tablosu */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>{t.diff_h3}</h3>
                <div style={{ background: '#faf9f7', borderRadius: '14px', border: '1px solid #eee', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#111' }}>
                        {t.diff_cols.map((col, i) => (
                          <th key={i} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: i === 2 ? 'var(--orange)' : '#6b7280', letterSpacing: '1px', textTransform: 'uppercase' }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.diff_rows.map((satir, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#faf9f7' }}>
                          <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700, color: '#111' }}>{satir[0]}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#888' }}>{satir[1]}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>{satir[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── GROWTH FUNNEL ─── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '40px', textAlign: 'center' }}>{t.funnel_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px', alignItems: 'start' }}>
              {/* Funnel seçici */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {funnel.map((f, i) => (
                  <button key={i} onClick={() => setAktifFunnel(i)} style={{ padding: '14px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: aktifFunnel === i ? f.renk : '#fff', color: aktifFunnel === i ? '#fff' : '#555', fontWeight: aktifFunnel === i ? 700 : 500, fontSize: '14px', fontFamily: 'var(--font-body)', textAlign: 'left', border: aktifFunnel === i ? 'none' : '1px solid #eee', transition: 'all 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{f.asama}</span>
                    {aktifFunnel === i && <span style={{ fontSize: '16px' }}>→</span>}
                  </button>
                ))}
              </div>
              {/* Funnel detay */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '36px', border: '1px solid #eee', borderLeft: `4px solid ${funnel[aktifFunnel].renk}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900, color: funnel[aktifFunnel].renk }}>{funnel[aktifFunnel].asama}</div>
                  <div style={{ padding: '6px 14px', borderRadius: '20px', background: funnel[aktifFunnel].renk + '15', border: `1px solid ${funnel[aktifFunnel].renk}30`, fontSize: '12px', fontWeight: 700, color: funnel[aktifFunnel].renk, fontFamily: 'monospace' }}>{funnel[aktifFunnel].metric}</div>
                </div>
                <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.85, margin: 0 }}>{funnel[aktifFunnel].aciklama}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── HİZMETLER ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '40px', textAlign: 'center' }}>{t.hizmetler_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {hizmetler.map((h, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '28px', border: '1px solid #ede8e0', transition: 'all 0.2s', position: 'relative' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(232,86,10,0.1)'; e.currentTarget.style.borderColor = 'rgba(232,86,10,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#faf9f7'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#ede8e0'; e.currentTarget.style.transform = 'none' }}>
                  {h.badge && <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: 700, color: 'var(--orange)', padding: '3px 8px', borderRadius: '4px', background: '#fff7ed', border: '1px solid #fed7aa' }}>{h.badge}</span>}
                  <div style={{ fontSize: '32px', marginBottom: '14px' }}>{h.ikon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '10px' }}>{h.baslik}</h3>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.65 }}>{h.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SÜREÇ ─── */}
        <section style={{ padding: '80px 32px', background: '#111', borderTop: '1px solid #1f2937' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#fff', marginBottom: '40px', textAlign: 'center' }}>{t.surec_h2}</h2>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {surec.map((s, i) => (
                <button key={i} onClick={() => setAktifSurec(i)} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: aktifSurec === i ? 'var(--orange)' : 'rgba(255,255,255,0.06)', color: aktifSurec === i ? '#fff' : '#6b7280', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                  {s.no}
                </button>
              ))}
            </div>
            <div style={{ background: 'rgba(232,86,10,0.08)', borderRadius: '20px', padding: '40px', border: '1px solid rgba(232,86,10,0.2)', borderLeft: '4px solid var(--orange)', maxWidth: '720px', margin: '0 auto' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 900, color: 'rgba(232,86,10,0.2)', lineHeight: 1, marginBottom: '8px' }}>{surec[aktifSurec].no}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: 'var(--orange)', marginBottom: '16px' }}>{surec[aktifSurec].baslik}</h3>
              <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: 1.85, margin: 0 }}>{surec[aktifSurec].aciklama}</p>
            </div>
          </div>
        </section>

        {/* ─── METRİKLER ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '40px', textAlign: 'center' }}>{t.metrik_h2}</h2>
            {/* Metrik seçici */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', justifyContent: 'center' }}>
              {metrikler.map((m, i) => (
                <button key={i} onClick={() => setAktifMetrik(i)} style={{ padding: '8px 20px', borderRadius: '8px', border: aktifMetrik === i ? 'none' : '1px solid #eee', cursor: 'pointer', background: aktifMetrik === i ? '#111' : '#fff', color: aktifMetrik === i ? '#fff' : '#555', fontWeight: 600, fontSize: '13px', fontFamily: 'monospace', transition: 'all 0.15s' }}>
                  {m.metrik}
                </button>
              ))}
            </div>
            <div style={{ background: '#faf9f7', borderRadius: '20px', padding: '36px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>{isEn ? 'METRIC' : 'METRİK'}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900, color: '#111', marginBottom: '4px' }}>{metrikler[aktifMetrik].metrik}</div>
                <div style={{ fontSize: '14px', color: '#888' }}>{metrikler[aktifMetrik].acik}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>{isEn ? 'FORMULA' : 'FORMÜL'}</div>
                <div style={{ fontSize: '13px', color: '#555', fontFamily: 'monospace', background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #eee', lineHeight: 1.6 }}>{metrikler[aktifMetrik].formul}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>{isEn ? 'TARGET' : 'HEDEF'}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#16a34a', marginBottom: '12px' }}>{metrikler[aktifMetrik].iyi}</div>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, margin: 0 }}>{metrikler[aktifMetrik].neden}</p>
              </div>
            </div>

            {/* Attribution & Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { h3: t.metrik_attr_h3, p: t.metrik_attr_p, ikon: '📊' },
                { h3: t.metrik_dash_h3, p: t.metrik_dash_p, ikon: '📈' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '28px', border: '1px solid #ede8e0' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.ikon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 800, color: '#111', marginBottom: '10px' }}>{item.h3}</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.75, margin: 0 }}>{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SEKTÖRLER ─── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '36px', textAlign: 'center' }}>{t.sektor_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {sektorler.map((s, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eee', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '32px', flexShrink: 0 }}>{s.ikon}</div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{s.baslik}</h3>
                    <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.65, margin: 0 }}>{s.aciklama}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SSS ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '32px', textAlign: 'center' }}>{t.faq_h2}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqlar.map((f, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                  <button onClick={() => setAktifFaq(aktifFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#111', flex: 1, lineHeight: 1.4, paddingRight: '16px' }}>{f.s}</span>
                    <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: aktifFaq === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                  </button>
                  {aktifFaq === i && (
                    <div style={{ padding: '0 24px 20px', borderTop: '1px solid #f0f0f0' }}>
                      <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, paddingTop: '16px', margin: 0 }}>{f.c}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PAKETLER & CTA ─── */}
        <section style={{ padding: '96px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 800, color: '#111', marginBottom: '12px', textAlign: 'center' }}>{t.cta_h2}</h2>
            <p style={{ color: '#777', fontSize: '16px', textAlign: 'center', marginBottom: '48px' }}>{t.cta_desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
              {paketler.map((p, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '36px', border: p.popular ? `2px solid ${p.renk}` : '1px solid #eee', position: 'relative', boxShadow: p.popular ? `0 8px 32px ${p.renk}25` : 'none' }}>
                  {p.popular && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: p.renk, color: '#fff', fontSize: '11px', fontWeight: 700, padding: '5px 16px', borderRadius: '20px', whiteSpace: 'nowrap' }}>{t.popular_badge}</div>}
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 900, color: '#111', marginBottom: '6px' }}>{p.isim}</h3>
                  <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>{p.aciklama}</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: p.renk, marginBottom: '24px' }}>{p.fiyat}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    {p.ozellikler.map((o, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#555' }}>
                        <span style={{ color: p.renk, fontWeight: 700 }}>✓</span> {o}
                      </div>
                    ))}
                  </div>
                  <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'block', padding: '13px', borderRadius: '8px', background: p.popular ? p.renk : '#f8f7f5', color: p.popular ? '#fff' : '#333', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)', textAlign: 'center', border: p.popular ? 'none' : '1px solid #eee' }}>
                    {isEn ? 'Get a Quote' : 'Teklif Al'}
                  </Link>
                </div>
              ))}
            </div>
            <div style={{ background: '#111', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📊</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '12px' }}>
                {isEn ? 'Not sure which package is right?' : 'Hangi paketin doğru olduğundan emin değil misiniz?'}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
                {isEn ? 'Fill out the form for a free growth audit and I\'ll recommend the ideal setup for your goals.' : 'Ücretsiz büyüme denetimi için formu doldurun, hedeflerinize göre ideal kurulumu önereceğim.'}
              </p>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'inline-block', padding: '15px 36px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', boxShadow: '0 4px 20px rgba(232,86,10,0.4)' }}>
                {t.cta_btn}
              </Link>
            </div>
          </div>
        </section>

      </div>
      <style>{`
        @media (max-width: 768px) {
          section > div { grid-template-columns: 1fr !important; gap: 28px !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
