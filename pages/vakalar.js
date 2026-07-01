import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const VAKALAR = {
  tr: [
    {
      no: '01',
      sektor: 'E-Ticaret',
      sure: '6 ay',
      slug: 'tekstil-marka',
      baslik: 'Tekstil Markası: 6 Ayda %280 Organik Trafik Artışı',
      alt: 'Kapsamlı teknik SEO denetimi ve içerik mimarisi yeniden yapılandırmasıyla organik trafiği 3 kat büyüttük.',
      renk: '#16a34a',
      bg: '#f0fdf4',
      emoji: '🛍️',
      zorluk: 'Rakip markaların yıllardır ezici şekilde domine ettiği tekstil segmentinde sıfırdan organik büyüme sağlamak.',
      cozum: [
        '100+ kontrol noktasında kapsamlı teknik SEO denetimi yapıldı',
        '3.200\'den fazla ürün sayfası için programatik içerik şablonu oluşturuldu',
        'Kategori sayfaları yeniden yapılandırıldı — topical authority inşası',
        'Core Web Vitals tamamen optimize edildi (LCP 4.2s → 1.8s)',
        'İç linkleme mimarisi pillar-cluster modeline geçirildi',
        'Aylık 12 adet editoryal backlink kazanımı kampanyası başlatıldı',
      ],
      metrikler: [
        { etiket: 'Organik Trafik', eski: '18.400/ay', yeni: '70.000/ay', artis: '+280%', ikon: '📈' },
        { etiket: 'Sıralama Kelime', eski: '892', yeni: '4.100+', artis: '+360%', ikon: '🔑' },
        { etiket: 'Organik Gelir', eski: '₺280K/ay', yeni: '₺940K/ay', artis: '+236%', ikon: '💰' },
        { etiket: 'Domain Rating', eski: '22', yeni: '41', artis: '+87%', ikon: '🌐' },
        { etiket: 'Dönüşüm Oranı', eski: '%1.2', yeni: '%2.1', artis: '+75%', ikon: '🎯' },
        { etiket: 'CAC (Organik)', eski: '₺480', yeni: '₺128', artis: '-73%', ikon: '📉' },
      ],
      zaman: [
        { ay: 'Ay 1-2', baslik: 'Teknik Temel', detay: 'Denetim, Core Web Vitals, indexleme sorunları çözüldü' },
        { ay: 'Ay 3-4', baslik: 'İçerik Mimarisi', detay: 'Ürün sayfaları, kategori yapısı, pillar içerikler yayınlandı' },
        { ay: 'Ay 5-6', baslik: 'Büyüme & Ölçekleme', detay: 'Backlink kampanyası + programatik içerik + ölçekleme' },
      ],
      tablo: {
        baslik: 'Anahtar Kelime Kategorisi Bazında Performans',
        cols: ['Kategori', 'Önceki Sıralama', 'Sonraki Sıralama', 'Trafik Artışı'],
        rows: [
          ['Marka + ürün grubu', '8-15. sayfa', '1-3. sıra', '+%420'],
          ['Kategori sayfaları', '4-6. sayfa', 'İlk 5', '+%310'],
          ['Long-tail ürün', 'Yok', 'İlk 10', '+%680'],
          ['Bilgilendirici içerik', 'Yok', 'Featured snippet', '+%890'],
        ],
      },
      faqs: [
        { s: 'Proje süresi neden 6 aydı?', c: 'E-ticarette teknik sorunların çözülmesi, programatik içerik üretimi ve backlink inşasının birlikte yürütülmesi zaman alır. Sonuçlar 3. aydan itibaren görünmeye başladı.' },
        { s: 'Hangi araçlar kullanıldı?', c: 'Screaming Frog (teknik denetim), Ahrefs (anahtar kelime ve backlink), Google Search Console + GA4 (performans takibi), PageSpeed Insights (CWV izleme).' },
      ],
      video_id: null,
      yorum: '"Fatih ile çalışmaya başladıktan 4 ay sonra organik trafiğimiz %280 arttı. Her adımı şeffaf şekilde takip edebildik."',
      yorum_kisi: 'Mehmet A. — E-Ticaret Direktörü',
    },
    {
      no: '02',
      sektor: 'SaaS',
      sure: '8 ay',
      slug: 'saas-platform',
      baslik: 'SaaS Platformu: Sıfırdan 50K Aylık Organik Ziyaretçi',
      alt: 'Programatik SEO ve topical authority stratejisiyle 8 ayda 50.000+ aylık organik ziyaretçiye ulaştık.',
      renk: '#6366f1',
      bg: '#eff6ff',
      emoji: '💻',
      zorluk: 'Hiç organik trafiği olmayan yeni bir SaaS ürünü için kalabalık bir pazarda rekabetçi organik görünürlük oluşturmak.',
      cozum: [
        'Ürün kategorisi etrafında kapsamlı anahtar kelime haritası oluşturuldu (800+ kelime)',
        'Programatik SEO şablonuyla kullanım senaryosu bazlı 340 sayfa üretildi',
        'Teknik dokümantasyon SEO\'ya entegre edildi (developer traffic)',
        'Karşılaştırma sayfaları stratejisi (vs. rakip ürünler) hayata geçirildi',
        'Konuk yazarlık kampanyasıyla 28 yüksek kaliteli backlink kazanıldı',
        'Blog içerikleri conversion funnelına entegre edildi (free trial CTA)',
      ],
      metrikler: [
        { etiket: 'Organik Ziyaretçi', eski: '0/ay', yeni: '50.400/ay', artis: '∞', ikon: '📈' },
        { etiket: 'Organik MRR Katkısı', eski: '₺0', yeni: '₺180K/ay', artis: '+∞', ikon: '💰' },
        { etiket: 'Free Trial (Organik)', eski: '0', yeni: '480/ay', artis: '∞', ikon: '🧪' },
        { etiket: 'Domain Rating', eski: '8', yeni: '34', artis: '+325%', ikon: '🌐' },
        { etiket: 'Sıralama Kelime', eski: '0', yeni: '2.800+', artis: '∞', ikon: '🔑' },
        { etiket: 'Sayfa/Oturum', eski: '-', yeni: '3.2', artis: 'Yeni', ikon: '📑' },
      ],
      zaman: [
        { ay: 'Ay 1-2', baslik: 'Strateji & Altyapı', detay: 'KW araştırması, teknik altyapı, programatik şablon kurulumu' },
        { ay: 'Ay 3-5', baslik: 'İçerik Üretimi', detay: '340 programatik sayfa + 24 pillar içerik yayınlandı' },
        { ay: 'Ay 6-8', baslik: 'Amplifikasyon', detay: 'Backlink kampanyası, conversion optimizasyonu, ölçekleme' },
      ],
      tablo: {
        baslik: 'İçerik Türü Bazında Performans',
        cols: ['İçerik Türü', 'Sayfa Sayısı', 'Ort. Trafik', 'Dönüşüm Oranı'],
        rows: [
          ['Programatik senaryo sayfaları', '340', '62/ay', '%1.8'],
          ['Rakip karşılaştırma sayfaları', '18', '890/ay', '%4.2'],
          ['Pillar blog içerikleri', '24', '1.240/ay', '%2.1'],
          ['Teknik doküman sayfaları', '48', '380/ay', '%3.8'],
        ],
      },
      faqs: [
        { s: 'Programatik SEO riski var mıydı?', c: 'Evet. Her şablon sayfasının yeterli içerik derinliğine sahip olması için kalite filtresi uygulandık. Thin content riski minimize edildi.' },
        { s: 'Organik büyüme MRR\'ye nasıl bağlandı?', c: 'Free trial → activation → paid conversion hunisi GA4\'te izlendi. Organik kaynaklı free trial kullanıcılarının %18\'i ücretli plana geçti.' },
      ],
      video_id: null,
      yorum: '"8 ay içinde organik trafiği sıfırdan 50K\'a taşıdı. Aylık MRR\'miz 4 katına çıktı."',
      yorum_kisi: 'Can S. — Kurucu & CEO',
    },
    {
      no: '03',
      sektor: 'Sağlık',
      sure: '5 ay',
      slug: 'saglik-klinigi',
      baslik: 'Sağlık Kliniği: E-E-A-T Stratejisiyle %200 Randevu Artışı',
      alt: 'YMYL kategori kurallarına tam uyumlu medikal içerik stratejisi ve yerel SEO ile randevu oranı 3 katına çıktı.',
      renk: '#0ea5e9',
      bg: '#f0f9ff',
      emoji: '🏥',
      zorluk: 'Google\'ın en katı E-E-A-T standartlarını uyguladığı sağlık sektöründe yerel sıralamalar ve randevu dönüşümleri.',
      cozum: [
        'YMYL uyumlu medikal içerik stratejisi (doktor imzalı, kaynaklı makaleler)',
        'Google Business Profile tam optimizasyonu (fotoğraf, saat, kategori, post)',
        'Her doktor için uzmanlık sayfaları ve Schema markup (Physician entity)',
        'Yerel anahtar kelime araştırması (şehir + hizmet + semptom kombinasyonları)',
        'Medikal SSS içerikleri FAQPage schema ile işaretlendi',
        'Yorum toplama kampanyası: 60 → 280 Google yorumu (4.8★)',
      ],
      metrikler: [
        { etiket: 'Organik Trafik', eski: '2.800/ay', yeni: '11.200/ay', artis: '+300%', ikon: '📈' },
        { etiket: 'Randevu (Organik)', eski: '42/ay', yeni: '126/ay', artis: '+200%', ikon: '📅' },
        { etiket: 'Yerel Pack Görünürlük', eski: '%12', yeni: '%68', artis: '+467%', ikon: '📍' },
        { etiket: 'Google Yorumları', eski: '60 (4.1★)', yeni: '280 (4.8★)', artis: '+367%', ikon: '⭐' },
        { etiket: 'Domain Rating', eski: '15', yeni: '28', artis: '+87%', ikon: '🌐' },
        { etiket: 'Featured Snippet', eski: '0', yeni: '14', artis: '+14', ikon: '🏆' },
      ],
      zaman: [
        { ay: 'Ay 1', baslik: 'YMYL Denetimi', detay: 'E-E-A-T açıkları tespit edildi, içerik planı oluşturuldu' },
        { ay: 'Ay 2-3', baslik: 'İçerik & Lokal', detay: 'Doktor sayfaları, medikal içerikler, GBP optimizasyonu' },
        { ay: 'Ay 4-5', baslik: 'Otorite & Dönüşüm', detay: 'Backlink, yorum kampanyası, CRO optimizasyonu' },
      ],
      tablo: {
        baslik: 'Uzmanlık Alanı Bazında Organik Sonuçlar',
        cols: ['Uzmanlık', 'Önceki Sıralama', 'Sonraki Sıralama', 'Randevu Artışı'],
        rows: [
          ['Genel cerrahi', '2. sayfa', 'Top 3 + Local Pack', '+%240'],
          ['Ortopedi', '4. sayfa', 'Top 5', '+%180'],
          ['Dermatoloji', '5. sayfa', 'Top 3 + Featured', '+%310'],
          ['Çocuk sağlığı', 'Yok', 'Top 10', '+%420'],
        ],
      },
      faqs: [
        { s: 'Sağlık sektöründe SEO neden daha zor?', c: 'Google, hatalı tıbbi içeriğin doğrudan zarar verebileceğini düşündüğü YMYL sayfalarına çok daha katı E-E-A-T standartları uygular. Her içerik doktor tarafından yazılmış veya onaylanmış olmalıdır.' },
        { s: 'Medikal içerik SEO\'ya uygun yazılabilir mi?', c: 'Evet — ama doğru dengeyle. SEO anahtar kelimeleri ve tıbbi doğruluk birbirini dışlamaz. Anahtar kelime araştırmasını doktorla birlikte planlamak en iyi yaklaşımdır.' },
      ],
      video_id: null,
      yorum: '"Medikal SEO alanında gerçek bir uzman. E-E-A-T odaklı çalışma sonrasında randevu oranımız %200 arttı."',
      yorum_kisi: 'Dr. Ayşe M. — Klinik Direktörü',
    },
    {
      no: '04',
      sektor: 'Hukuk',
      sure: '7 ay',
      slug: 'hukuk-burosu',
      baslik: 'Hukuk Bürosu: Yerel SEO ile Müvekkil Sayısını 3\'e Katladık',
      alt: 'Google Business Profile ve şehir bazlı hukuk içerikleriyle yerel 3-pack\'te yer aldık, müvekkil trafiği 3x büyüdü.',
      renk: '#f59e0b',
      bg: '#fffbeb',
      emoji: '⚖️',
      zorluk: 'Rekabetçi bir hukuk pazarında sıfır dijital varlıktan başlayarak bölgesel liderlik konumu oluşturmak.',
      cozum: [
        'Şehir + hukuki hizmet kombinasyonlu 45 açılış sayfası üretildi',
        'Google Business Profile sıfırdan optimize edildi (5 farklı hukuki kategori)',
        'YMYL uyumlu hukuki içerik (avukat biyografileri, vaka alanları)',
        'Yerel dernek üyelikleri ve yasal dizinlere kayıt (citation building)',
        'Dijital PR: 8 yerel haber sitesinde avukat görüşü yayınları',
        'Her hukuki hizmet için ayrı FAQ sayfası (FAQPage schema)',
      ],
      metrikler: [
        { etiket: 'Organik Trafik', eski: '180/ay', yeni: '3.400/ay', artis: '+1.789%', ikon: '📈' },
        { etiket: 'Müvekkil (Organik)', eski: '4/ay', yeni: '14/ay', artis: '+250%', ikon: '👤' },
        { etiket: 'Local Pack Görünürlük', eski: 'Yok', yeni: 'İlk 3', artis: '∞', ikon: '📍' },
        { etiket: 'Domain Rating', eski: '0', yeni: '24', artis: '∞', ikon: '🌐' },
        { etiket: 'Sıralama Kelime', eski: '12', yeni: '680+', artis: '+5.567%', ikon: '🔑' },
        { etiket: 'Citation Sayısı', eski: '3', yeni: '142', artis: '+4.633%', ikon: '📋' },
      ],
      zaman: [
        { ay: 'Ay 1-2', baslik: 'Temel Kurulum', detay: 'Web altyapısı, GBP, teknik SEO, KW araştırması' },
        { ay: 'Ay 3-5', baslik: 'İçerik & Citation', detay: '45 şehir sayfası, hukuki rehberler, dizin kayıtları' },
        { ay: 'Ay 6-7', baslik: 'PR & Otorite', detay: 'Dijital PR, yerel basın, yorum kampanyası' },
      ],
      tablo: {
        baslik: 'Hukuki Hizmet Alanı Bazında Sıralama',
        cols: ['Hizmet Alanı', 'Önceki', 'Sonraki', 'Aylık Lead'],
        rows: [
          ['İş hukuku (İstanbul)', 'Yok', 'Local Pack #2', '4/ay'],
          ['Ticaret hukuku', 'Yok', 'Top 5', '3/ay'],
          ['İş davası avukatı', 'Yok', 'Top 3', '4/ay'],
          ['Kıdem tazminatı davası', 'Yok', 'Featured Snippet', '3/ay'],
        ],
      },
      faqs: [
        { s: 'Hukuk büroları SEO\'ya neden geç başladı?', c: 'Türkiye\'de hukuk büroları tarihsel olarak ağızdan ağıza referansla müvekkil edinirdi. Dijital dönüşümle birlikte online arama ilk temas noktası haline geldi.' },
        { s: 'Hukuki içerik ne kadar uzun olmalı?', c: 'Hukuki sorgularda SERP analizi gösteriyor ki 1.500-2.500 kelime arası kapsamlı içerikler tercih ediliyor. Her konu için gerçek hukuki rehber değeri taşıması kritik.' },
      ],
      video_id: null,
      yorum: '"Dijital varlığımızı sıfırdan inşa etti. Yerel SEO sayesinde ilk sayfaya çıktık, müvekkil sayımız 3 katına çıktı."',
      yorum_kisi: 'Zeynep K. — Büro Ortağı',
    },
  ],
  en: [
    {
      no: '01', sektor: 'E-Commerce', sure: '6 months', slug: 'textile-brand',
      baslik: 'Textile Brand: 280% Organic Traffic Growth in 6 Months',
      alt: 'We tripled organic traffic through comprehensive technical SEO audit and content architecture restructuring.',
      renk: '#16a34a', bg: '#f0fdf4', emoji: '🛍️',
      zorluk: 'Achieving organic growth from scratch in a textile segment dominated by competitor brands for years.',
      cozum: [
        'Comprehensive technical SEO audit conducted at 100+ checkpoints',
        'Programmatic content template created for 3,200+ product pages',
        'Category pages restructured — topical authority building',
        'Core Web Vitals fully optimized (LCP 4.2s → 1.8s)',
        'Internal linking architecture migrated to pillar-cluster model',
        'Monthly editorial backlink acquisition campaign launched (12 links/month)',
      ],
      metrikler: [
        { etiket: 'Organic Traffic', eski: '18,400/mo', yeni: '70,000/mo', artis: '+280%', ikon: '📈' },
        { etiket: 'Ranking Keywords', eski: '892', yeni: '4,100+', artis: '+360%', ikon: '🔑' },
        { etiket: 'Organic Revenue', eski: '$8K/mo', yeni: '$27K/mo', artis: '+236%', ikon: '💰' },
        { etiket: 'Domain Rating', eski: '22', yeni: '41', artis: '+87%', ikon: '🌐' },
        { etiket: 'Conversion Rate', eski: '1.2%', yeni: '2.1%', artis: '+75%', ikon: '🎯' },
        { etiket: 'CAC (Organic)', eski: '$14', yeni: '$4', artis: '-73%', ikon: '📉' },
      ],
      zaman: [
        { ay: 'Month 1-2', baslik: 'Technical Foundation', detay: 'Audit, Core Web Vitals, indexing issues resolved' },
        { ay: 'Month 3-4', baslik: 'Content Architecture', detay: 'Product pages, category structure, pillar content published' },
        { ay: 'Month 5-6', baslik: 'Growth & Scaling', detay: 'Backlink campaign + programmatic content + scaling' },
      ],
      tablo: {
        baslik: 'Performance by Keyword Category',
        cols: ['Category', 'Previous Ranking', 'New Ranking', 'Traffic Growth'],
        rows: [
          ['Brand + product group', 'Pages 8-15', 'Positions 1-3', '+420%'],
          ['Category pages', 'Pages 4-6', 'Top 5', '+310%'],
          ['Long-tail product', 'None', 'Top 10', '+680%'],
          ['Informational content', 'None', 'Featured Snippet', '+890%'],
        ],
      },
      faqs: [
        { s: 'Why was the project 6 months?', c: 'Resolving technical issues, programmatic content production and link building in e-commerce take time when run together. Results started becoming visible from month 3.' },
        { s: 'Which tools were used?', c: 'Screaming Frog (technical audit), Ahrefs (keyword & backlink), Google Search Console + GA4 (performance tracking), PageSpeed Insights (CWV monitoring).' },
      ],
      yorum: '"After working with Fatih for 4 months, our organic traffic grew by 280%. We could track every step transparently."',
      yorum_kisi: 'Mehmet A. — E-Commerce Director',
    },
    {
      no: '02', sektor: 'SaaS', sure: '8 months', slug: 'saas-platform',
      baslik: 'SaaS Platform: From Zero to 50K Monthly Organic Visitors',
      alt: 'We reached 50,000+ monthly organic visitors in 8 months through programmatic SEO and topical authority strategy.',
      renk: '#6366f1', bg: '#eff6ff', emoji: '💻',
      zorluk: 'Building competitive organic visibility in a crowded market from scratch for a brand new SaaS product with zero organic traffic.',
      cozum: [
        'Comprehensive keyword map built around product category (800+ keywords)',
        '340 use-case-based pages produced with programmatic SEO template',
        'Technical documentation integrated into SEO (developer traffic)',
        'Competitor comparison page strategy (vs. competitor products) implemented',
        '28 high-quality backlinks earned through guest posting campaign',
        'Blog content integrated into conversion funnel (free trial CTA)',
      ],
      metrikler: [
        { etiket: 'Organic Visitors', eski: '0/mo', yeni: '50,400/mo', artis: '∞', ikon: '📈' },
        { etiket: 'Organic MRR', eski: '$0', yeni: '$5.2K/mo', artis: '+∞', ikon: '💰' },
        { etiket: 'Free Trial (Organic)', eski: '0', yeni: '480/mo', artis: '∞', ikon: '🧪' },
        { etiket: 'Domain Rating', eski: '8', yeni: '34', artis: '+325%', ikon: '🌐' },
        { etiket: 'Ranking Keywords', eski: '0', yeni: '2,800+', artis: '∞', ikon: '🔑' },
        { etiket: 'Pages/Session', eski: '-', yeni: '3.2', artis: 'New', ikon: '📑' },
      ],
      zaman: [
        { ay: 'Month 1-2', baslik: 'Strategy & Infrastructure', detay: 'KW research, technical infrastructure, programmatic template setup' },
        { ay: 'Month 3-5', baslik: 'Content Production', detay: '340 programmatic pages + 24 pillar content published' },
        { ay: 'Month 6-8', baslik: 'Amplification', detay: 'Backlink campaign, conversion optimization, scaling' },
      ],
      tablo: {
        baslik: 'Performance by Content Type',
        cols: ['Content Type', 'Page Count', 'Avg. Traffic', 'Conversion Rate'],
        rows: [
          ['Programmatic scenario pages', '340', '62/mo', '1.8%'],
          ['Competitor comparison pages', '18', '890/mo', '4.2%'],
          ['Pillar blog content', '24', '1,240/mo', '2.1%'],
          ['Technical doc pages', '48', '380/mo', '3.8%'],
        ],
      },
      faqs: [
        { s: 'Was there programmatic SEO risk?', c: 'Yes. We applied a quality filter to ensure every template page had sufficient content depth. Thin content risk was minimized.' },
        { s: 'How did organic growth connect to MRR?', c: 'Free trial → activation → paid conversion funnel was tracked in GA4. 18% of organically-sourced free trial users converted to paid plans.' },
      ],
      yorum: '"He grew organic traffic from zero to 50K in 8 months. Our monthly MRR quadrupled."',
      yorum_kisi: 'Can S. — Founder & CEO',
    },
    {
      no: '03', sektor: 'Healthcare', sure: '5 months', slug: 'health-clinic',
      baslik: 'Health Clinic: 200% Appointment Growth with E-E-A-T Strategy',
      alt: 'With fully YMYL-compliant medical content strategy and local SEO, appointment rates tripled.',
      renk: '#0ea5e9', bg: '#f0f9ff', emoji: '🏥',
      zorluk: 'Local rankings and appointment conversions in the healthcare sector where Google applies its strictest E-E-A-T standards.',
      cozum: [
        'YMYL-compliant medical content strategy (doctor-signed, sourced articles)',
        'Google Business Profile fully optimized (photos, hours, categories, posts)',
        'Expertise pages and schema markup for each doctor (Physician entity)',
        'Local keyword research (city + service + symptom combinations)',
        'Medical FAQ content marked with FAQPage schema',
        'Review campaign: 60 → 280 Google reviews (4.8★)',
      ],
      metrikler: [
        { etiket: 'Organic Traffic', eski: '2,800/mo', yeni: '11,200/mo', artis: '+300%', ikon: '📈' },
        { etiket: 'Appointments (Organic)', eski: '42/mo', yeni: '126/mo', artis: '+200%', ikon: '📅' },
        { etiket: 'Local Pack Visibility', eski: '12%', yeni: '68%', artis: '+467%', ikon: '📍' },
        { etiket: 'Google Reviews', eski: '60 (4.1★)', yeni: '280 (4.8★)', artis: '+367%', ikon: '⭐' },
        { etiket: 'Domain Rating', eski: '15', yeni: '28', artis: '+87%', ikon: '🌐' },
        { etiket: 'Featured Snippets', eski: '0', yeni: '14', artis: '+14', ikon: '🏆' },
      ],
      zaman: [
        { ay: 'Month 1', baslik: 'YMYL Audit', detay: 'E-E-A-T gaps identified, content plan created' },
        { ay: 'Month 2-3', baslik: 'Content & Local', detay: 'Doctor pages, medical content, GBP optimization' },
        { ay: 'Month 4-5', baslik: 'Authority & Conversion', detay: 'Backlink, review campaign, CRO optimization' },
      ],
      tablo: {
        baslik: 'Organic Results by Specialty',
        cols: ['Specialty', 'Previous Ranking', 'New Ranking', 'Appointment Growth'],
        rows: [
          ['General surgery', 'Page 2', 'Top 3 + Local Pack', '+240%'],
          ['Orthopedics', 'Page 4', 'Top 5', '+180%'],
          ['Dermatology', 'Page 5', 'Top 3 + Featured', '+310%'],
          ['Pediatrics', 'None', 'Top 10', '+420%'],
        ],
      },
      faqs: [
        { s: 'Why is SEO harder in healthcare?', c: 'Google applies much stricter E-E-A-T standards to YMYL pages where incorrect medical content could cause direct harm. Every piece of content must be written or approved by a doctor.' },
        { s: 'Can medical content be written for SEO?', c: 'Yes — but with the right balance. SEO keywords and medical accuracy aren\'t mutually exclusive. Planning keyword research together with a doctor is the best approach.' },
      ],
      yorum: '"A true expert in medical SEO. After the E-E-A-T focused work, our appointment rate grew by 200%."',
      yorum_kisi: 'Dr. Ayşe M. — Clinic Director',
    },
    {
      no: '04', sektor: 'Legal', sure: '7 months', slug: 'law-firm',
      baslik: 'Law Firm: Tripled Client Base with Local SEO',
      alt: 'We appeared in the local 3-pack with city-based legal content and Google Business Profile, tripling client traffic.',
      renk: '#f59e0b', bg: '#fffbeb', emoji: '⚖️',
      zorluk: 'Building regional market leadership from zero digital presence in a competitive legal market.',
      cozum: [
        '45 landing pages produced for city + legal service combinations',
        'Google Business Profile optimized from scratch (5 different legal categories)',
        'YMYL-compliant legal content (attorney bios, practice area pages)',
        'Local association memberships and legal directory registrations (citation building)',
        'Digital PR: attorney opinion pieces published on 8 local news sites',
        'Separate FAQ page for each legal service (FAQPage schema)',
      ],
      metrikler: [
        { etiket: 'Organic Traffic', eski: '180/mo', yeni: '3,400/mo', artis: '+1,789%', ikon: '📈' },
        { etiket: 'Clients (Organic)', eski: '4/mo', yeni: '14/mo', artis: '+250%', ikon: '👤' },
        { etiket: 'Local Pack Visibility', eski: 'None', yeni: 'Top 3', artis: '∞', ikon: '📍' },
        { etiket: 'Domain Rating', eski: '0', yeni: '24', artis: '∞', ikon: '🌐' },
        { etiket: 'Ranking Keywords', eski: '12', yeni: '680+', artis: '+5,567%', ikon: '🔑' },
        { etiket: 'Citation Count', eski: '3', yeni: '142', artis: '+4,633%', ikon: '📋' },
      ],
      zaman: [
        { ay: 'Month 1-2', baslik: 'Foundation Setup', detay: 'Web infrastructure, GBP, technical SEO, KW research' },
        { ay: 'Month 3-5', baslik: 'Content & Citation', detay: '45 city pages, legal guides, directory registrations' },
        { ay: 'Month 6-7', baslik: 'PR & Authority', detay: 'Digital PR, local press, review campaign' },
      ],
      tablo: {
        baslik: 'Rankings by Legal Practice Area',
        cols: ['Practice Area', 'Before', 'After', 'Monthly Leads'],
        rows: [
          ['Employment law (Istanbul)', 'None', 'Local Pack #2', '4/mo'],
          ['Commercial law', 'None', 'Top 5', '3/mo'],
          ['Employment litigation', 'None', 'Top 3', '4/mo'],
          ['Severance pay cases', 'None', 'Featured Snippet', '3/mo'],
        ],
      },
      faqs: [
        { s: 'Why did law firms start SEO late?', c: 'In Turkey, law firms historically acquired clients through word-of-mouth referrals. With digital transformation, online search has become the first point of contact.' },
        { s: 'How long should legal content be?', c: 'SERP analysis for legal queries shows that comprehensive content in the 1,500-2,500 word range is preferred. Delivering real legal guide value on each topic is critical.' },
      ],
      yorum: '"He built our digital presence from scratch. Thanks to local SEO, we appeared on the first page and our client base tripled."',
      yorum_kisi: 'Zeynep K. — Law Firm Partner',
    },
  ],
}

const GENEL_METRIKLER = {
  tr: [
    { rakam: '150+', etiket: 'Projeyi hayata geçirdik' },
    { rakam: '%312', etiket: 'Ortalama organik trafik artışı' },
    { rakam: '14', etiket: 'Farklı sektörde deneyim' },
    { rakam: '8 yıl', etiket: 'SEO & GEO danışmanlık deneyimi' },
  ],
  en: [
    { rakam: '150+', etiket: 'Projects delivered' },
    { rakam: '312%', etiket: 'Average organic traffic growth' },
    { rakam: '14', etiket: 'Industry sectors covered' },
    { rakam: '8 yrs', etiket: 'SEO & GEO consulting experience' },
  ],
}

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifVaka, setAktifVaka] = useState(0)
  const [aktifFaq, setAktifFaq] = useState(null)
  const [aktifTab, setAktifTab] = useState('metrikler')
  const vakalar = isEn ? VAKALAR.en : VAKALAR.tr
  const genelMetrikler = isEn ? GENEL_METRIKLER.en : GENEL_METRIKLER.tr
  const vaka = vakalar[aktifVaka]

  const t = isEn ? {
    badge: 'CASE STUDIES',
    h1: 'Case Studies & Results',
    h1b: 'Measurable, Transparent, Real',
    desc: 'All results you see here are real client data. Numbers, timelines and strategies are exactly as they happened.',
    btn1: 'Get a Free SEO Audit →',
    breadcrumb: ['Home', 'About', 'Case Studies'],
    tabs: { metrikler: 'Metrics', zaman: 'Timeline', tablo: 'Data Table', cozum: 'Solution', faqs: 'FAQ' },
    cta_h2: 'Want Similar Results?',
    cta_desc: 'Book a free discovery call and let\'s plan your growth roadmap together.',
    cta_btn: 'Book a Free Call →',
    zorluk_label: 'Challenge',
    cozum_label: 'Solution Applied',
    yorum_label: 'Client Testimonial',
    sure_label: 'Duration',
    sektor_label: 'Sector',
  } : {
    badge: 'VAKA ÇALIŞMALARI',
    h1: 'Vaka Çalışmaları & Sonuçlar',
    h1b: 'Ölçülebilir, Şeffaf, Gerçek',
    desc: 'Burada gördüğünüz tüm sonuçlar gerçek müşteri verisidir. Rakamlar, zaman çizelgesi ve stratejiler aynen gerçekleştiği gibidir.',
    btn1: 'Ücretsiz SEO Analizi Al →',
    breadcrumb: ['Ana Sayfa', 'Hakkımda', 'Vaka Çalışmaları'],
    tabs: { metrikler: 'Metrikler', zaman: 'Zaman Çizelgesi', tablo: 'Veri Tablosu', cozum: 'Çözüm', faqs: 'SSS' },
    cta_h2: 'Benzer Sonuçlar İster misiniz?',
    cta_desc: 'Ücretsiz keşif görüşmesi ayarlayın ve büyüme yol haritanızı birlikte planlayalım.',
    cta_btn: 'Ücretsiz Görüşme Başlat →',
    zorluk_label: 'Zorluk',
    cozum_label: 'Uygulanan Çözüm',
    yorum_label: 'Müşteri Yorumu',
    sure_label: 'Süre',
    sektor_label: 'Sektör',
  }

  return (
    <>
      <Head>
        <title>{isEn ? 'SEO Case Studies | Fatih Emin Çakıroğlu' : 'SEO Vaka Çalışmaları | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? 'Real SEO case studies with measurable results across e-commerce, SaaS, healthcare and legal sectors. 150+ projects showcasing sustainable organic growth.' : "Ölçülebilir sonuçlarla gerçek SEO vaka çalışmaları. E-ticaret, SaaS, sağlık ve hukuk sektörlerinde 150'den fazla projede elde edilen organik büyüme örnekleri."} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/case-studies' : 'https://fatihemincakiroglu.com/vakalar'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/vakalar" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/case-studies" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"CollectionPage",
          "name": isEn ? "SEO Case Studies" : "SEO Vaka Çalışmaları",
          "description": isEn ? "Real SEO consulting results across multiple industries." : "Gerçek SEO danışmanlık sonuçları.",
          "url": isEn ? "https://fatihemincakiroglu.com/en/case-studies" : "https://fatihemincakiroglu.com/vakalar",
          "author": {"@type":"Person","name":"Fatih Emin Çakıroğlu"}
        })}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>

        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link><span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/about' : '/hakkimda'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[1]}</Link><span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[2]}</span>
          </div>
        </div>

        {/* Hero */}
        <section style={{ background: '#111', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(232,86,10,0.08) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>{t.badge}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: '4px' }}>{t.h1}</h1>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, color: 'var(--orange)', fontStyle: 'italic', lineHeight: 1.05, marginBottom: '20px' }}>{t.h1b}</h1>
            <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px' }}>{t.desc}</p>
            {/* Genel metrikler */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
              {genelMetrikler.map((m, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px 28px', minWidth: '130px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900, color: 'var(--orange)', lineHeight: 1, marginBottom: '4px' }}>{m.rakam}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.4 }}>{m.etiket}</div>
                </div>
              ))}
            </div>
            <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-body)', boxShadow: '0 4px 20px rgba(232,86,10,0.4)' }}>{t.btn1}</Link>
          </div>
        </section>

        {/* Vaka Seçici */}
        <section style={{ padding: '0 32px', background: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 'var(--nav-h)', zIndex: 100 }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' }}>
            {vakalar.map((v, i) => (
              <button key={i} onClick={() => { setAktifVaka(i); setAktifTab('metrikler'); setAktifFaq(null) }}
                style={{ padding: '16px 24px', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: aktifVaka === i ? 700 : 400, fontSize: '14px', color: aktifVaka === i ? vaka.renk : '#aaa', borderBottom: aktifVaka === i ? `3px solid ${v.renk}` : '3px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{v.emoji}</span> {v.no} — {v.sektor}
              </button>
            ))}
          </div>
        </section>

        {/* Aktif Vaka */}
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 32px 96px' }}>

          {/* Vaka Başlık */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', border: '1px solid #eee', marginBottom: '24px', borderLeft: `6px solid ${vaka.renk}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '36px' }}>{vaka.emoji}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: vaka.renk, padding: '4px 12px', borderRadius: '20px', background: vaka.bg, border: `1px solid ${vaka.renk}30` }}>{vaka.sektor}</span>
              <span style={{ fontSize: '12px', color: '#aaa', padding: '4px 12px', borderRadius: '20px', background: '#f8f7f5', border: '1px solid #eee' }}>⏱ {vaka.sure}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '12px', lineHeight: 1.2 }}>{vaka.baslik}</h2>
            <p style={{ fontSize: '16px', color: '#777', lineHeight: 1.7 }}>{vaka.alt}</p>
          </div>

          {/* Zorluk + Yorum */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#faf9f7', borderRadius: '16px', padding: '28px', border: '1px solid #ede8e0' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>⚡ {t.zorluk_label}</div>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.75 }}>{vaka.zorluk}</p>
            </div>
            <div style={{ background: '#111', borderRadius: '16px', padding: '28px', border: '1px solid #222' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>💬 {t.yorum_label}</div>
              <div style={{ fontSize: '32px', color: 'var(--orange)', fontFamily: 'Georgia', lineHeight: 1, marginBottom: '10px' }}>"</div>
              <p style={{ fontSize: '15px', color: '#c8b8a8', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '16px' }}>{vaka.yorum}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: vaka.renk, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>{vaka.yorum_kisi[0]}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{vaka.yorum_kisi}</div>
              </div>
            </div>
          </div>

          {/* Tab Navigasyon */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {Object.entries(t.tabs).map(([key, label]) => (
              <button key={key} onClick={() => setAktifTab(key)}
                style={{ padding: '9px 20px', borderRadius: '8px', border: aktifTab === key ? 'none' : '1px solid #eee', background: aktifTab === key ? vaka.renk : '#fff', color: aktifTab === key ? '#fff' : '#555', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.15s' }}>
                {label}
              </button>
            ))}
          </div>

          {/* Tab İçerikleri */}
          {/* METRİKLER */}
          {aktifTab === 'metrikler' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {vaka.metrikler.map((m, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #eee', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: vaka.renk }} />
                    <div style={{ fontSize: '22px', marginBottom: '8px' }}>{m.ikon}</div>
                    <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>{m.etiket}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#ccc', marginBottom: '2px' }}>{isEn ? 'Before' : 'Öncesi'}: <span style={{ color: '#999' }}>{m.eski}</span></div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111' }}>{m.yeni}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: vaka.renk, padding: '4px 10px', background: vaka.bg, borderRadius: '8px' }}>{m.artis}</div>
                    </div>
                    {/* Mini progress bar */}
                    <div style={{ marginTop: '12px', height: '4px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: m.artis.includes('∞') ? '100%' : `${Math.min(100, parseInt(m.artis) || 100)}%`, background: vaka.renk, borderRadius: '2px', maxWidth: '100%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ZAMAN ÇİZELGESİ */}
          {aktifTab === 'zaman' && (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', border: '1px solid #eee' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '44px', top: '56px', bottom: '20px', width: '2px', background: `linear-gradient(to bottom, ${vaka.renk}, #eee)`, zIndex: 0 }} />
                {vaka.zaman.map((z, i) => (
                  <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '88px', flexShrink: 0, textAlign: 'center' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: vaka.renk, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px', margin: '0 auto 6px', boxShadow: `0 4px 12px ${vaka.renk}50` }}>{i + 1}</div>
                      <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 700 }}>{z.ay}</div>
                    </div>
                    <div style={{ flex: 1, background: vaka.bg, borderRadius: '12px', padding: '20px', border: `1px solid ${vaka.renk}20` }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>{z.baslik}</div>
                      <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.65 }}>{z.detay}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VERİ TABLOSU */}
          {aktifTab === 'tablo' && (
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #f0f0f0' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', margin: 0 }}>{vaka.tablo.baslik}</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#1a1612' }}>
                      {vaka.tablo.cols.map((col, i) => (
                        <th key={i} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: i === 0 ? '#aaa' : 'var(--orange)', letterSpacing: '1px', textTransform: 'uppercase' }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vaka.tablo.rows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#faf9f7' }}
                        onMouseEnter={e => e.currentTarget.style.background = vaka.bg}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#faf9f7'}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ padding: '14px 20px', fontSize: '14px', color: j === 0 ? '#111' : '#555', fontWeight: j === 0 ? 700 : 400, transition: 'background 0.15s' }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ÇÖZÜM */}
          {aktifTab === 'cozum' && (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', border: '1px solid #eee' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '4px', height: '20px', background: vaka.renk, borderRadius: '2px', display: 'inline-block' }}></span>
                {t.cozum_label}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {vaka.cozum.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px 20px', background: vaka.bg, borderRadius: '10px', border: `1px solid ${vaka.renk}15` }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: vaka.renk, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '12px', flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                    <span style={{ fontSize: '15px', color: '#444', lineHeight: 1.65 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SSS */}
          {aktifTab === 'faqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {vaka.faqs.map((f, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                  <button onClick={() => setAktifFaq(aktifFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#111', flex: 1, lineHeight: 1.4, paddingRight: '16px' }}>{f.s}</span>
                    <span style={{ color: vaka.renk, fontWeight: 700, fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: aktifFaq === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                  </button>
                  {aktifFaq === i && (
                    <div style={{ padding: '0 24px 20px', borderTop: '1px solid #f0f0f0' }}>
                      <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, paddingTop: '16px', margin: 0 }}>{f.c}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Video placeholder */}
          <div style={{ background: '#111', borderRadius: '16px', marginTop: '24px', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '1px solid #222', maxHeight: '380px' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(232,86,10,0.08) 0%, transparent 70%)' }} />
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,86,10,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                <span style={{ fontSize: '28px', marginLeft: '4px' }}>▶</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#e5e7eb', fontWeight: 700, marginBottom: '8px' }}>
                {isEn ? 'Case Study Walkthrough' : 'Vaka Analizi Videosu'}
              </div>
              <div style={{ fontSize: '13px', color: '#4b5563' }}>
                {isEn ? `${vaka.sektor} · ${vaka.sure}` : `${vaka.sektor} · ${vaka.sure}`}
              </div>
            </div>
          </div>

        </div>

        {/* Tüm Vakalar Mini Listesi */}
        <section style={{ padding: '48px 32px', background: '#fff', borderTop: '1px solid #eee' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '24px', textAlign: 'center' }}>
              {isEn ? 'All Case Studies' : 'Tüm Vaka Çalışmaları'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {vakalar.map((v, i) => (
                <button key={i} onClick={() => { setAktifVaka(i); setAktifTab('metrikler'); setAktifFaq(null); window.scrollTo({ top: 280, behavior: 'smooth' }) }}
                  style={{ background: aktifVaka === i ? v.bg : '#faf9f7', borderRadius: '14px', padding: '20px', border: aktifVaka === i ? `2px solid ${v.renk}` : '1px solid #eee', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{v.emoji}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: v.renk, marginBottom: '6px', textTransform: 'uppercase' }}>{v.sektor}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>{v.baslik.split(':')[0]}</div>
                  <div style={{ fontSize: '12px', color: '#aaa', marginTop: '6px' }}>⏱ {v.sure}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '96px 32px', background: '#111', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(232,86,10,0.08) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>{t.cta_h2}</h2>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>{t.cta_desc}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '16px 36px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', boxShadow: '0 4px 24px rgba(232,86,10,0.4)' }}>{t.cta_btn}</Link>
              <Link href={isEn ? '/en/services' : '/hizmetler'} style={{ padding: '16px 36px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}>
                {isEn ? 'View Services →' : 'Hizmetleri İncele →'}
              </Link>
            </div>
          </div>
        </section>

      </div>
      <style>{`
        @media (max-width: 768px) {
          section > div { gap: 16px !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
