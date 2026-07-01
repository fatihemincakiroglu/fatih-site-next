import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const HIZMETLER = {
  tr: [
    { ikon: '🔍', baslik: 'SEO Danışmanlığı', aciklama: 'Veriye dayalı, işletmenize özel SEO stratejisi. Teknikten içeriğe, her katmanı kapsayan danışmanlık.' },
    { ikon: '⚙️', baslik: 'Teknik SEO Analizi', aciklama: '100+ kontrol noktası: crawl hataları, Core Web Vitals, indexleme, schema ve site mimarisi.' },
    { ikon: '✍️', baslik: 'İçerik Pazarlama', aciklama: 'Topical authority inşa eden, arama niyetiyle örtüşen, dönüşüm getiren içerik stratejisi.' },
    { ikon: '📈', baslik: 'Google Ads & Performans', aciklama: 'Organik+ücretli karma strateji. SEO verisiyle güçlendirilmiş anahtar kelime hedefleme.' },
    { ikon: '🔗', baslik: 'Backlink Stratejisi', aciklama: 'Editoryal linkler, dijital PR kampanyaları ve marka sinyalleriyle domain otoritesi inşası.' },
    { ikon: '📍', baslik: 'Yerel SEO', aciklama: 'Google Business Profile optimizasyonu ve yerel sıralamalar için şehir bazlı içerik stratejisi.' },
  ],
  en: [
    { ikon: '🔍', baslik: 'SEO Consulting', aciklama: 'Data-driven, custom SEO strategy for your business. Consulting that covers every layer from technical to content.' },
    { ikon: '⚙️', baslik: 'Technical SEO Audit', aciklama: '100+ checkpoints: crawl errors, Core Web Vitals, indexing, schema markup and site architecture.' },
    { ikon: '✍️', baslik: 'Content Marketing', aciklama: 'Content strategy that builds topical authority, aligns with search intent and drives conversions.' },
    { ikon: '📈', baslik: 'Google Ads & PPC', aciklama: 'Organic + paid hybrid strategy. Keyword targeting powered by real SEO data.' },
    { ikon: '🔗', baslik: 'Link Building', aciklama: 'Editorial links, digital PR campaigns and brand signals to build domain authority.' },
    { ikon: '📍', baslik: 'Local SEO', aciklama: 'Google Business Profile optimization and city-based content strategy for local rankings.' },
  ],
}

const SUREC = {
  tr: [
    { no: '01', baslik: 'Denetim & Analiz', aciklama: 'Sitenizin mevcut teknik durumunu, anahtar kelime pozisyonlarını, rakipleri ve büyüme fırsatlarını kapsamlı biçimde analiz ederim.' },
    { no: '02', baslik: 'Strateji Geliştirme', aciklama: 'Veriye ve sektör dinamiklerine dayalı, işletme hedeflerinizle hizalanmış özel SEO yol haritası oluştururum.' },
    { no: '03', baslik: 'Uygulama', aciklama: 'Teknik düzeltmeler, içerik üretimi ve backlink inşasını öncelik sırasına göre sistematik biçimde hayata geçiririm.' },
    { no: '04', baslik: 'Ölçüm & Optimizasyon', aciklama: 'Aylık raporlarla sonuçları paylaşır, algoritma değişikliklerine göre stratejiyi sürekli optimize ederim.' },
  ],
  en: [
    { no: '01', baslik: 'Audit & Analysis', aciklama: 'I comprehensively analyze your site\'s current technical state, keyword positions, competitors and growth opportunities.' },
    { no: '02', baslik: 'Strategy Development', aciklama: 'I build a custom SEO roadmap aligned with your business goals, grounded in data and industry dynamics.' },
    { no: '03', baslik: 'Implementation', aciklama: 'I systematically execute technical fixes, content production and link building in order of priority.' },
    { no: '04', baslik: 'Measurement & Optimization', aciklama: 'I share results through monthly reports and continuously optimize strategy based on algorithm changes.' },
  ],
}

const TABLOLAR = {
  tr: {
    karsilastirma: {
      baslik: 'SEO mu, Reklam mı?',
      sutunlar: ['Kriter', 'SEO (Organik)', 'Google Ads (Ücretli)'],
      satirlar: [
        ['Maliyet', 'Zaman yatırımı', 'Tıklama başına ücret'],
        ['Sürdürülebilirlik', '✅ Uzun vadeli', '⚠️ Bütçe bittikçe trafik biter'],
        ['Güvenilirlik', '✅ Yüksek (organik)', '⚠️ Düşük (reklam)'],
        ['Ölçeklenebilirlik', '✅ İçerik büyüdükçe artar', '⚠️ Bütçeyle sınırlı'],
        ['Sonuç Süresi', '3-6 ay', 'Anında'],
        ['ROI (Uzun vadede)', '✅ Çok yüksek', '⚠️ Orta'],
      ]
    },
    metrikler: {
      baslik: 'Takip Ettiğimiz Temel Metrikler',
      sutunlar: ['Metrik', 'Araç', 'Hedef'],
      satirlar: [
        ['Organik trafik', 'GA4 + GSC', 'Aylık %10-20 büyüme'],
        ['Anahtar kelime sıralaması', 'Ahrefs / SEMrush', 'Top 10 artışı'],
        ['Organik CTR', 'Search Console', '>%3-5'],
        ['Core Web Vitals', 'PageSpeed Insights', 'Yeşil bölge'],
        ['Backlink profili', 'Ahrefs', 'DR artışı'],
        ['Dönüşüm oranı', 'GA4', '>%2-3 organikten'],
      ]
    }
  },
  en: {
    karsilastirma: {
      baslik: 'SEO vs. Paid Ads',
      sutunlar: ['Criterion', 'SEO (Organic)', 'Google Ads (Paid)'],
      satirlar: [
        ['Cost', 'Time investment', 'Cost per click'],
        ['Sustainability', '✅ Long-term', '⚠️ Traffic stops when budget runs out'],
        ['Credibility', '✅ High (organic)', '⚠️ Lower (ad label)'],
        ['Scalability', '✅ Grows with content', '⚠️ Limited by budget'],
        ['Time to Results', '3-6 months', 'Immediate'],
        ['Long-term ROI', '✅ Very high', '⚠️ Medium'],
      ]
    },
    metrikler: {
      baslik: 'Core Metrics We Track',
      sutunlar: ['Metric', 'Tool', 'Target'],
      satirlar: [
        ['Organic traffic', 'GA4 + GSC', '10-20% monthly growth'],
        ['Keyword rankings', 'Ahrefs / SEMrush', 'Top 10 increases'],
        ['Organic CTR', 'Search Console', '>3-5%'],
        ['Core Web Vitals', 'PageSpeed Insights', 'Green zone'],
        ['Backlink profile', 'Ahrefs', 'DR improvement'],
        ['Conversion rate', 'GA4', '>2-3% from organic'],
      ]
    }
  }
}

const ISTATISTIKLER = [
  { rakam: '%68', etiket_tr: 'Online deneyim bir arama motoruyla başlar', etiket_en: 'Online experiences begin with a search engine' },
  { rakam: '%75', etiket_tr: 'Kullanıcı ikinci sayfaya hiç bakmaz', etiket_en: 'Users never look at the second page' },
  { rakam: '3.5x', etiket_tr: 'Organik lead ücretliye göre daha ucuz', etiket_en: 'Organic leads cost less than paid' },
  { rakam: '%300', etiket_tr: 'Ortalama organik trafik büyümesi (6 ay)', etiket_en: 'Avg. organic traffic growth in 6 months' },
]

const FAQS = {
  tr: [
    { s: 'SEO sonuçları ne zaman görülür?', c: 'Teknik iyileştirmeler 4-8 haftada etkisini gösterir. Anlamlı sıralama yükselişleri 3-4 ayda başlar; kalıcı büyüme 6-12 ay perspektifinde değerlendirilmelidir.' },
    { s: 'Aylık ne kadar yatırım gerekli?', c: 'Projenin kapsamına, sektörünüze ve rekabet düzeyine göre değişir. İlk görüşmede sitenizi analiz edip özel teklif hazırlarım.' },
    { s: 'Garanti var mı?', c: 'Google sıralama garantisi veren hiçbir ajans veya danışman dürüst değildir. Ben ölçülebilir ilerleme, şeffaf raporlama ve veri odaklı strateji taahhüt ederim.' },
    { s: 'Mevcut sitem varken SEO\'ya başlayabilir miyim?', c: 'Evet — mevcut site yapısına en az müdahaleyle maksimum iyileştirme sağlayan bir yaklaşım benimsiyorum. İlk adım kapsamlı bir teknik ve içerik denetimidir.' },
  ],
  en: [
    { s: 'When do SEO results appear?', c: 'Technical improvements show impact within 4-8 weeks. Meaningful ranking improvements start at 3-4 months; sustainable growth should be evaluated on a 6-12 month horizon.' },
    { s: 'How much monthly investment is needed?', c: 'It varies based on your project scope, industry and competition level. In the initial call, I analyze your site and prepare a custom proposal.' },
    { s: 'Is there a guarantee?', c: 'Any agency or consultant that guarantees Google rankings is not being honest. I commit to measurable progress, transparent reporting and data-driven strategy.' },
    { s: 'Can I start SEO with my existing site?', c: 'Yes — I take an approach that maximizes improvement with minimal disruption to your existing site structure. The first step is a comprehensive technical and content audit.' },
  ],
}

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifFaq, setAktifFaq] = useState(null)
  const [aktifTab, setAktifTab] = useState('karsilastirma')

  const t = isEn ? {
    badge: 'SEO CONSULTING',
    h1: 'Rank Higher, Grow Faster',
    h1b: 'SEO & Digital Marketing Expert',
    subtitle: 'Data-Driven SEO Strategies That Deliver Real Results',
    hero_desc: 'I help businesses across e-commerce, SaaS, healthcare and more achieve sustainable organic growth through technical SEO, content strategy and authority building.',
    btn1: 'Get a Free Audit →',
    btn2: 'View Case Studies',
    why_badge: 'WHY SEO',
    why_h2: 'Why SEO Matters for Your Business',
    why_desc: 'In 2025, 68% of all online experiences begin with a search engine. Organic search drives more than 50% of trackable web traffic. Yet most businesses are invisible on the first page. That\'s the opportunity.',
    why_points: [
      '🎯 The top 3 results capture over 75% of all clicks',
      '📊 Organic traffic converts 3x better than paid on average',
      '⏱️ Unlike ads, SEO results compound over time',
      '🔒 First-page rankings build lasting brand credibility',
    ],
    hizmetler_h2: 'Our Services',
    teknik_h2: 'Technical SEO Audit',
    teknik_desc: 'A slow, broken or poorly structured site can never rank — no matter how good the content is. My technical SEO process starts with a deep crawl and ends with a prioritized action plan.',
    teknik_liste: [
      'Crawl error detection and resolution',
      'Core Web Vitals optimization (LCP, INP, CLS)',
      'Site architecture and URL structure review',
      'Schema markup implementation',
      'Internal linking audit and optimization',
      'Mobile-first indexing compliance',
      'Duplicate content and canonical tag management',
      'Page speed optimization (sub-2.5s LCP target)',
    ],
    anahtar_h3: 'Keyword Research & Strategy',
    rakip_h3: 'Competitor Analysis',
    backlink_h3: 'Link Building',
    onpage_h3: 'On-Page Optimization',
    yerel_h3: 'Local SEO Solutions',
    icerik_h2: 'Content Marketing',
    icerik_desc: 'Content is the engine of SEO. But not all content ranks. I build content architectures that establish topical authority, match search intent at every funnel stage, and convert visitors into leads.',
    icerik_liste: [
      'Pillar-cluster content architecture',
      'Search intent mapping for every target keyword',
      'E-E-A-T-optimized long-form content',
      'Content gap analysis vs. competitors',
      'Existing content audit and refresh strategy',
      'Editorial calendar and production workflow',
    ],
    surec_h2: 'My Process',
    tablo_h2: 'Data & Comparisons',
    stats_h2: 'The Numbers Behind SEO',
    faq_h2: 'FAQ',
    cta_h2: 'Get Your Free SEO Audit',
    cta_desc: 'I\'ll analyze your site, identify top opportunities, and show you exactly what\'s holding your rankings back — no strings attached.',
    cta_btn: 'Book a Free Call →',
    breadcrumb: ['Home', 'Services', 'SEO Consulting'],
  } : {
    badge: 'SEO DANIŞMANLIĞI',
    h1: 'Google\'da Zirveye Çıkın',
    h1b: 'SEO & Dijital Pazarlama Uzmanı',
    subtitle: 'Organik Trafiği Artırın, Müşteriye Dönüştürün',
    hero_desc: 'E-ticaret, SaaS, sağlık ve daha birçok sektördeki işletmelerin teknik SEO, içerik stratejisi ve otorite inşasıyla sürdürülebilir organik büyüme elde etmesine yardım ediyorum.',
    btn1: 'Ücretsiz Analiz Al →',
    btn2: 'Vaka Çalışmaları',
    why_badge: 'NEDEN SEO',
    why_h2: 'Neden SEO\'ya İhtiyacınız Var?',
    why_desc: '2025\'te tüm online deneyimlerin %68\'i bir arama motoruyla başlıyor. Organik arama, takip edilebilir web trafiğinin %50\'sinden fazlasını oluşturuyor. Ancak işletmelerin büyük çoğunluğu ilk sayfada görünmüyor. İşte bu, bir fırsat.',
    why_points: [
      '🎯 İlk 3 sonuç tüm tıklamaların %75\'ini alır',
      '📊 Organik trafik, ücretliye göre ortalama 3x daha yüksek dönüşüm sağlar',
      '⏱️ Reklamların aksine, SEO sonuçları zamanla birikir',
      '🔒 İlk sayfa sıralamaları kalıcı marka güvenilirliği inşa eder',
    ],
    hizmetler_h2: 'Sunduğumuz Hizmetler',
    teknik_h2: 'Teknik SEO Analizi',
    teknik_desc: 'Yavaş, kırık veya kötü yapılandırılmış bir site ne kadar iyi içerik olursa olsun sıralamaya giremez. Teknik SEO sürecim derin bir taramayla başlar, önceliklendirilmiş aksiyon planıyla biter.',
    teknik_liste: [
      'Crawl hatalarının tespiti ve çözümü',
      'Core Web Vitals optimizasyonu (LCP, INP, CLS)',
      'Site mimarisi ve URL yapısı incelemesi',
      'Schema markup implementasyonu',
      'İç linkleme denetimi ve optimizasyonu',
      'Mobil öncelikli indexleme uyumluluğu',
      'Duplicate content ve canonical tag yönetimi',
      'Sayfa hızı optimizasyonu (2.5s altı LCP hedefi)',
    ],
    anahtar_h3: 'Anahtar Kelime Araştırması',
    rakip_h3: 'Rakip Analizi',
    backlink_h3: 'Backlink Stratejisi',
    onpage_h3: 'Sayfa İçi Optimizasyon',
    yerel_h3: 'Yerel SEO (Local SEO)',
    icerik_h2: 'İçerik Pazarlama Stratejisi',
    icerik_desc: 'İçerik, SEO\'nun motorudur. Ama her içerik sıralamaya girmez. Topical authority kuran, huninin her aşamasında arama niyetiyle örtüşen ve ziyaretçileri potansiyel müşteriye dönüştüren içerik mimarileri oluşturuyorum.',
    icerik_liste: [
      'Pillar-cluster içerik mimarisi',
      'Her hedef kelime için arama niyeti haritalama',
      'E-E-A-T odaklı uzun formlu içerik üretimi',
      'Rakiplere göre içerik boşluğu analizi',
      'Mevcut içerik denetimi ve güncelleme stratejisi',
      'Editorial takvim ve üretim iş akışı',
    ],
    surec_h2: 'SEO Süreci Nasıl İşler?',
    tablo_h2: 'Veri & Karşılaştırmalar',
    stats_h2: 'SEO\'nun Arkasındaki Rakamlar',
    faq_h2: 'Sık Sorulan Sorular',
    cta_h2: 'Ücretsiz SEO Analizi Alın',
    cta_desc: 'Sitenizi analiz edip en büyük fırsatları tespit edeceğim ve sıralamalarınızı geri tutan engelleri net biçimde göstereceğim — hiçbir yükümlülük olmadan.',
    cta_btn: 'Ücretsiz Görüşme Başlat →',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'SEO Danışmanlığı'],
  }

  const hizmetler = isEn ? HIZMETLER.en : HIZMETLER.tr
  const surec = isEn ? SUREC.en : SUREC.tr
  const faqlar = isEn ? FAQS.en : FAQS.tr
  const tablo = isEn ? TABLOLAR.en : TABLOLAR.tr

  return (
    <>
      <Head>
        <title>{isEn ? 'SEO Consulting Services | Fatih Emin Çakıroğlu' : 'SEO Danışmanlığı İstanbul | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? 'Data-driven SEO consulting: technical audits, content strategy and link building for sustainable organic growth and lasting top rankings on Google search.' : 'Veriye dayalı SEO danışmanlığı: teknik SEO denetimi, içerik stratejisi ve backlink inşasıyla sürdürülebilir organik büyüme ve üst sıralarda kalıcı yer edinin.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/seo-consulting' : 'https://fatihemincakiroglu.com/seo'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/seo" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/seo-consulting" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Service","name":isEn?"SEO Consulting":"SEO Danışmanlığı","provider":{"@id":"https://fatihemincakiroglu.com/#person"},"areaServed":"TR","url":`https://fatihemincakiroglu.com${isEn?'/en/seo-consulting':'/seo'}`,"description":isEn?"Technical SEO, content strategy and link building consulting.":"Teknik SEO, içerik stratejisi ve backlink danışmanlığı."})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqlar.map(f=>({  "@type":"Question","name":f.s,"acceptedAnswer":{"@type":"Answer","text":f.c}}))})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>

        {/* ─── BREADCRUMB ─── */}
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
        <section style={{ background: 'linear-gradient(135deg, #1a1612 0%, #2a1f18 60%, #1a1612 100%)', padding: '100px 32px 80px', overflow: 'hidden', position: 'relative' }}>
          {/* Background grid pattern */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(232,86,10,0.15) 1px, transparent 0)', backgroundSize: '40px 40px', opacity: 0.4 }} />
          
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(232,86,10,0.15)', border: '1px solid rgba(232,86,10,0.3)', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '2px', marginBottom: '24px' }}>
                {t.badge}
              </div>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: '16px' }}>
                <span style={{ display: 'block' }}>{t.h1}</span>
                <span style={{ display: 'block', color: 'var(--orange)', fontStyle: 'italic' }}>{t.h1b}</span>
              </h1>
              <p style={{ fontSize: '20px', fontWeight: 600, color: '#c8b8a8', marginBottom: '16px', lineHeight: 1.4 }}>{t.subtitle}</p>
              <p style={{ color: '#6b6b6b', fontSize: '16px', lineHeight: 1.75, marginBottom: '36px', maxWidth: '520px' }}>{t.hero_desc}</p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '15px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', boxShadow: '0 4px 20px rgba(232,86,10,0.4)' }}>
                  {t.btn1}
                </Link>
                <Link href={isEn ? '/en/case-studies' : '/vakalar'} style={{ padding: '15px 32px', background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', border: '1px solid rgba(255,255,255,0.15)' }}>
                  {t.btn2}
                </Link>
              </div>
            </div>

            {/* Stats cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {ISTATISTIKLER.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 900, color: 'var(--orange)', lineHeight: 1, marginBottom: '8px' }}>{s.rakam}</div>
                  <div style={{ fontSize: '12px', color: '#6b6b6b', lineHeight: 1.5 }}>{isEn ? s.etiket_en : s.etiket_tr}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NEDEN SEO ─── */}
        <section style={{ padding: '80px 32px', background: '#fff' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '28px', height: '2px', background: 'var(--orange)' }} />
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px' }}>{t.why_badge}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#111', marginBottom: '20px', lineHeight: 1.2 }}>{t.why_h2}</h2>
                <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.8, marginBottom: '28px' }}>{t.why_desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {t.why_points.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: '#faf9f7', borderRadius: '10px', border: '1px solid #ede8e0', fontSize: '15px', color: '#333', lineHeight: 1.5 }}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Funnel visual */}
              <div style={{ background: '#faf9f7', borderRadius: '20px', padding: '36px', border: '1px solid #ede8e0' }}>
                <div style={{ fontSize: '13px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
                  {isEn ? 'SEARCH FUNNEL' : 'ARAMA HUNISI'}
                </div>
                {[
                  { label: isEn ? 'Awareness' : 'Farkındalık', sublabel: isEn ? 'Informational queries' : 'Bilgilendirici sorgular', pct: '100%', color: '#fef3c7', textColor: '#d97706', w: '100%' },
                  { label: isEn ? 'Consideration' : 'Değerlendirme', sublabel: isEn ? 'Commercial queries' : 'Ticari sorgular', pct: '45%', color: '#fed7aa', textColor: '#ea580c', w: '80%' },
                  { label: isEn ? 'Decision' : 'Karar', sublabel: isEn ? 'Transactional queries' : 'İşlemsel sorgular', pct: '15%', color: '#fca5a5', textColor: '#dc2626', w: '55%' },
                  { label: isEn ? 'Conversion' : 'Dönüşüm', sublabel: isEn ? 'Purchase / Contact' : 'Satın alma / İletişim', pct: '3-5%', color: '#86efac', textColor: '#16a34a', w: '35%' },
                ].map((f, i) => (
                  <div key={i} style={{ marginBottom: '10px', width: f.w, transition: 'width 0.3s' }}>
                    <div style={{ background: f.color, borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: f.textColor }}>{f.label}</div>
                        <div style={{ fontSize: '11px', color: f.textColor, opacity: 0.8 }}>{f.sublabel}</div>
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: f.textColor }}>{f.pct}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── HİZMETLER ─── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>{t.hizmetler_h2}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {hizmetler.map((h, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eee', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ fontSize: '32px', marginBottom: '14px' }}>{h.ikon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 800, color: '#111', marginBottom: '10px' }}>{h.baslik}</h3>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.65 }}>{h.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TEKNİK SEO DEEP DIVE ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '16px' }}>{t.teknik_h2}</h2>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '28px' }}>{t.teknik_desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {t.teknik_liste.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#444', padding: '10px 14px', background: '#faf9f7', borderRadius: '8px', border: '1px solid #ede8e0' }}>
                    <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* H3 sub-sections */}
              {[
                { h3: t.anahtar_h3, icerik: isEn
                  ? 'Every strategy starts with finding the right keywords — not just high-volume terms, but queries your ideal customer actually types at each stage of their journey. I use a combination of Ahrefs, SEMrush and Search Console data to build a keyword map that drives real business results.'
                  : 'Her strateji doğru anahtar kelimeleri bulmakla başlar — yalnızca yüksek hacimli terimler değil, ideal müşterinizin yolculuğunun her aşamasında gerçekten yazdığı sorgular. Gerçek iş sonuçları yaratan bir anahtar kelime haritası oluşturmak için Ahrefs, SEMrush ve Search Console verilerini birleştiriyorum.' },
                { h3: t.rakip_h3, icerik: isEn
                  ? 'Understanding what\'s working for your competitors is as important as knowing your own site. I analyze competitor keyword gaps, backlink profiles, content strategies and SERP feature visibility to identify actionable opportunities you can act on immediately.'
                  : 'Rakiplerinizde neyin işe yaradığını anlamak, kendi sitenizi bilmek kadar önemlidir. Anında harekete geçebileceğiniz fırsatlar belirlemek için rakiplerin anahtar kelime boşluklarını, backlink profillerini, içerik stratejilerini ve SERP özellik görünürlüklerini analiz ediyorum.' },
                { h3: t.backlink_h3, icerik: isEn
                  ? 'Links are still one of the top 3 ranking factors. But quality beats quantity every time. I focus on earning editorial backlinks from relevant, authoritative sources through digital PR, original research and content that journalists and bloggers want to cite.'
                  : 'Backlinkler hâlâ en iyi 3 sıralama faktöründen biri. Ama kalite, her zaman miktarı geçer. Dijital PR, özgün araştırma ve gazetecilerle blog yazarlarının atıfta bulunmak istediği içerikler aracılığıyla ilgili, otoriter kaynaklardan editoryal backlinkler kazanmaya odaklanıyorum.' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '14px', padding: '24px', border: '1px solid #ede8e0' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 800, color: '#111', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '4px', height: '18px', background: 'var(--orange)', borderRadius: '2px', display: 'inline-block', flexShrink: 0 }} />
                    {item.h3}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, margin: 0 }}>{item.icerik}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── İÇERİK PAZARLAMA ─── */}
        <section style={{ padding: '80px 32px', background: '#1a1612', borderTop: '1px solid #2a2520' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>{t.icerik_h2}</h2>
                <p style={{ fontSize: '15px', color: '#6b6b6b', lineHeight: 1.8, marginBottom: '28px' }}>{t.icerik_desc}</p>
                <Link href={isEn ? '/en/content-strategy' : '/icerik'} style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  {isEn ? 'Content Strategy Details →' : 'İçerik Stratejisi Detayları →'}
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {t.icerik_liste.map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: '13px', color: '#c8b8a8', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SÜREÇ ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#111', marginBottom: '48px', textAlign: 'center' }}>{t.surec_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', position: 'relative' }}>
              {/* Connector line */}
              <div style={{ position: 'absolute', top: '48px', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(to right, var(--orange), #fca5a5, #fca5a5, var(--orange))', zIndex: 0 }} />
              {surec.map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '0 16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: i % 2 === 0 ? 'var(--orange)' : '#fff', border: i % 2 === 0 ? 'none' : '2px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 4px 20px rgba(232,86,10,0.3)' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 900, color: i % 2 === 0 ? '#fff' : 'var(--orange)' }}>{s.no}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{s.baslik}</h3>
                  <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.65 }}>{s.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TABLOLAR ─── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#111', marginBottom: '32px', textAlign: 'center' }}>{t.tablo_h2}</h2>
            
            {/* Tab switcher */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
              {['karsilastirma', 'metrikler'].map(tab => (
                <button key={tab} onClick={() => setAktifTab(tab)} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: aktifTab === tab ? 'var(--orange)' : '#fff', color: aktifTab === tab ? '#fff' : '#555', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)', border: aktifTab === tab ? 'none' : '1px solid #eee', transition: 'all 0.15s' }}>
                  {aktifTab === tab || tab === 'karsilastirma' ? tablo.karsilastirma.baslik : tablo.metrikler.baslik}
                  {tab === 'karsilastirma' ? tablo.karsilastirma.baslik : tablo.metrikler.baslik}
                </button>
              ))}
            </div>

            {/* Table */}
            {['karsilastirma', 'metrikler'].map(tabKey => {
              const tabData = tablo[tabKey]
              return aktifTab === tabKey && (
                <div key={tabKey} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#1a1612' }}>
                          {tabData.sutunlar.map((s, i) => (
                            <th key={i} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: i === 0 ? '#aaa' : 'var(--orange)', letterSpacing: '1px', textTransform: 'uppercase' }}>{s}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tabData.satirlar.map((satir, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#faf9f7' }}>
                            {satir.map((h, j) => (
                              <td key={j} style={{ padding: '14px 20px', fontSize: '14px', color: j === 0 ? '#111' : '#555', fontWeight: j === 0 ? 700 : 400, lineHeight: 1.5 }}>{h}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─── YEREL SEO ─── */}
        <section style={{ padding: '64px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #faf9f7 0%, #fff8f5 100%)', borderRadius: '20px', padding: '48px', border: '1px solid #ede8e0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '4px', height: '26px', background: 'var(--orange)', borderRadius: '2px', display: 'inline-block', flexShrink: 0 }} />
                  {t.yerel_h3}
                </h3>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>
                  {isEn
                    ? 'Local SEO is essential for businesses that serve specific geographic areas. Whether you have one location or dozens, appearing in Google\'s local pack drives foot traffic, calls and qualified leads.'
                    : 'Yerel SEO, belirli coğrafi bölgelere hizmet veren işletmeler için kritiktir. Bir konumunuz olsun ya da onlarca, Google\'ın yerel paketinde görünmek ziyaretçi, arama ve nitelikli potansiyel müşteri sağlar.'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(isEn ? [
                    'Google Business Profile complete optimization',
                    'City and district based landing pages',
                    'NAP consistency across all directories',
                    'Local review management strategy',
                    'Local backlink and citation building',
                  ] : [
                    'Google Business Profile tam optimizasyonu',
                    'Şehir ve ilçe bazlı açılış sayfaları',
                    'Tüm rehberlerde NAP tutarlılığı',
                    'Yerel yorum yönetim stratejisi',
                    'Yerel backlink ve citation inşası',
                  ]).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#444' }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 700 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eee', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px' }}>GOOGLE LOCAL PACK</div>
                {[
                  { isim: isEn ? 'Your Business' : 'İşletmeniz', puan: '4.9 ★', mesafe: '0.3 km', ac: true },
                  { isim: isEn ? 'Competitor A' : 'Rakip A', puan: '4.2 ★', mesafe: '0.5 km', ac: false },
                  { isim: isEn ? 'Competitor B' : 'Rakip B', puan: '3.8 ★', mesafe: '0.8 km', ac: false },
                ].map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', background: i === 0 ? 'rgba(232,86,10,0.06)' : 'transparent', border: i === 0 ? '1px solid rgba(232,86,10,0.2)' : '1px solid transparent', marginBottom: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: i === 0 ? 'var(--orange)' : '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 0 ? '#fff' : '#aaa', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>{b.isim}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{b.puan} · {b.mesafe}</div>
                    </div>
                    {i === 0 && <span style={{ fontSize: '10px', background: 'var(--orange)', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>TOP</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SSS ─── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '32px', textAlign: 'center' }}>{t.faq_h2}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqlar.map((f, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
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

        {/* ─── CTA ─── */}
        <section style={{ padding: '96px 32px', background: 'linear-gradient(135deg, #1a1612 0%, #2a1f18 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(232,86,10,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>{t.cta_h2}</h2>
            <p style={{ color: '#6b6b6b', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>{t.cta_desc}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '16px 36px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', boxShadow: '0 4px 24px rgba(232,86,10,0.5)' }}>
                {t.cta_btn}
              </Link>
              <Link href={isEn ? '/en/case-studies' : '/vakalar'} style={{ padding: '16px 36px', background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', border: '1px solid rgba(255,255,255,0.15)' }}>
                {isEn ? 'View Results →' : 'Sonuçları Gör →'}
              </Link>
            </div>
            <p style={{ color: '#4a4540', fontSize: '13px', marginTop: '20px' }}>
              {isEn ? '✓ No commitment · ✓ 30-minute call · ✓ Custom roadmap' : '✓ Yükümlülük yok · ✓ 30 dakika görüşme · ✓ Özel yol haritası'}
            </p>
          </div>
        </section>

      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div { grid-template-columns: 1fr !important; gap: 32px !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          section > div { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
