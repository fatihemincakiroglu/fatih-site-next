import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const AI_SISTEMLER = [
  { isim: 'ChatGPT Search', logo: '🤖', pazar: '%60', renk: '#10a37f' },
  { isim: 'Perplexity AI', logo: '✦', pazar: '%22', renk: '#6366f1' },
  { isim: 'Google AI Overview', logo: 'G', pazar: '%12', renk: '#4285f4' },
  { isim: 'Bing Copilot', logo: '◆', pazar: '%6', renk: '#0078d4' },
]

const FARKLAR = {
  tr: [
    { kriter: 'Hedef', seo: 'Google organik sıralamalar', geo: 'AI yanıtlarında kaynak görünümü' },
    { kriter: 'Sinyal', seo: 'Backlink, keyword density', geo: 'E-E-A-T, entity otorite, grounding' },
    { kriter: 'İçerik formatı', seo: 'Anahtar kelime odaklı', geo: 'Soruya doğrudan yanıt veren' },
    { kriter: 'Teknik altyapı', seo: 'Crawlability, indexleme', geo: 'Schema, llms.txt, entity yapısı' },
    { kriter: 'Ölçüm', seo: 'Sıralama, tıklama, trafik', geo: 'AI citation sayısı, AI visibility skoru' },
    { kriter: 'Zaman ufku', seo: '3-6 ay', geo: '4-8 hafta (bazı kazanımlar)' },
  ],
  en: [
    { kriter: 'Target', seo: 'Google organic rankings', geo: 'Source citations in AI answers' },
    { kriter: 'Signals', seo: 'Backlinks, keyword density', geo: 'E-E-A-T, entity authority, grounding' },
    { kriter: 'Content format', seo: 'Keyword-focused', geo: 'Direct answer to query' },
    { kriter: 'Technical base', seo: 'Crawlability, indexing', geo: 'Schema, llms.txt, entity structure' },
    { kriter: 'Measurement', seo: 'Rankings, clicks, traffic', geo: 'AI citation count, AI visibility score' },
    { kriter: 'Time horizon', seo: '3-6 months', geo: '4-8 weeks (some gains)' },
  ],
}

const HIZMETLER = {
  tr: [
    { ikon: '📝', baslik: 'Otorite İçerik Üretimi', aciklama: 'LLM\'lerin tercih ettiği formatta, özet çıkarılabilir, E-E-A-T odaklı içerik üretimi. Net tanımlar, veri destekli argümanlar, uzman atıfları.' },
    { ikon: '🏷️', baslik: 'Schema & Yapısal Veri', aciklama: 'Article, FAQPage, Person, Organization ve HowTo schema\'larıyla AI sistemlerine yapılandırılmış sinyal gönderme.' },
    { ikon: '🔗', baslik: 'Citation Optimizasyonu', aciklama: 'Markanızın AI yanıtlarında kaynak gösterilme olasılığını artırmak için içerik yapısı ve kaynak mimarisi geliştirme.' },
    { ikon: '🤖', baslik: 'llms.txt Implementasyonu', aciklama: 'AI tarayıcılarına içeriğinizi nasıl kullanmaları gerektiğini bildiren standart dosyanın kurulumu ve optimizasyonu.' },
    { ikon: '🌐', baslik: 'Entity & Knowledge Graph', aciklama: 'Markanızın Google Knowledge Graph ve LLM hafızasında yer alması için entity optimizasyonu ve otorite inşası.' },
    { ikon: '📊', baslik: 'GEO Performans Takibi', aciklama: 'AI Overview görünürlüğü, Perplexity citation sayısı ve brand mention takibi ile ölçülebilir GEO raporlaması.' },
  ],
  en: [
    { ikon: '📝', baslik: 'Authority Content Creation', aciklama: 'Producing E-E-A-T-focused, summarizable content in the format preferred by LLMs: clear definitions, data-backed arguments, expert citations.' },
    { ikon: '🏷️', baslik: 'Structured Data & Schema', aciklama: 'Sending structured signals to AI systems via Article, FAQPage, Person, Organization and HowTo schema markups.' },
    { ikon: '🔗', baslik: 'Citation Optimization', aciklama: 'Developing content structure and source architecture to increase the probability of your brand being cited in AI answers.' },
    { ikon: '🤖', baslik: 'llms.txt Implementation', aciklama: 'Setup and optimization of the standard file that tells AI crawlers how to use your content.' },
    { ikon: '🌐', baslik: 'Entity & Knowledge Graph', aciklama: 'Entity optimization and authority building to secure your brand\'s place in Google\'s Knowledge Graph and LLM memory.' },
    { ikon: '📊', baslik: 'GEO Performance Tracking', aciklama: 'Measurable GEO reporting with AI Overview visibility, Perplexity citation count and brand mention tracking.' },
  ],
}

const SUREC = {
  tr: [
    { no: '01', baslik: 'GEO Denetimi', aciklama: 'Markanızın AI sistemlerindeki mevcut görünürlüğünü, rakip karşılaştırmasını ve iyileştirme fırsatlarını analiz ederim.' },
    { no: '02', baslik: 'İçerik Mimarisi', aciklama: 'LLM\'lerin tercih ettiği yapıda, AI kaynak seçimi için optimize edilmiş içerik planı oluştururum.' },
    { no: '03', baslik: 'Teknik GEO', aciklama: 'Schema markup, llms.txt, entity optimizasyonu ve E-E-A-T sinyallerini hayata geçiririm.' },
    { no: '04', baslik: 'Ölçüm & İterasyon', aciklama: 'AI citation sayısı, brand mention ve visibility skoru ile aylık GEO performans raporlaması yaparım.' },
  ],
  en: [
    { no: '01', baslik: 'GEO Audit', aciklama: 'I analyze your brand\'s current visibility in AI systems, competitor benchmarks and improvement opportunities.' },
    { no: '02', baslik: 'Content Architecture', aciklama: 'I build a content plan structured in the format LLMs prefer, optimized for AI source selection.' },
    { no: '03', baslik: 'Technical GEO', aciklama: 'I implement schema markup, llms.txt, entity optimization and E-E-A-T signals.' },
    { no: '04', baslik: 'Measurement & Iteration', aciklama: 'I provide monthly GEO performance reporting with AI citation count, brand mention and visibility score.' },
  ],
}

const FAQS = {
  tr: [
    { s: 'GEO ile SEO\'yu birlikte yürütmek gerekiyor mu?', c: 'Evet — en etkili yaklaşım her ikisini birlikte uygulamaktır. SEO organik sıralamaları hedeflerken GEO, AI yanıt sistemlerinde görünürlüğü sağlar. İkisi birbirini güçlendirir: güçlü SEO temeli, GEO başarısını da hızlandırır.' },
    { s: 'GEO sonuçları ne kadar sürede görülür?', c: 'Teknik iyileştirmeler (schema, llms.txt) 4-8 haftada etkisini gösterebilir. İçerik kaynak seçimi için 2-3 ay, markalı AI görünürlüğü için 3-6 ay perspektifi doğru beklenti seviyesidir.' },
    { s: 'Hangi AI sistemlerini hedefliyorsunuz?', c: 'Birincil hedefler: Google AI Overview, Perplexity AI, ChatGPT Search ve Bing Copilot. Her sistemin kaynak seçim kriterleri farklıdır; stratejiyi bu farklılıklara göre özelleştiriyorum.' },
    { s: 'GEO trafik getirir mi?', c: 'Doğrudan trafik yerine marka bilinirliği ve otorite kazanımı sağlar. Ancak AI Overview kaynaklarından referral trafik giderek artmakta; markalı aramalardaki artış da GEO\'nun somut göstergesidir.' },
  ],
  en: [
    { s: 'Do I need to run GEO alongside SEO?', c: 'Yes — the most effective approach is implementing both together. SEO targets organic rankings while GEO ensures visibility in AI response systems. They reinforce each other: a strong SEO foundation also accelerates GEO success.' },
    { s: 'How quickly do GEO results appear?', c: 'Technical improvements (schema, llms.txt) can show impact in 4-8 weeks. A 2-3 month timeline for content source selection and 3-6 months for branded AI visibility are the right expectations.' },
    { s: 'Which AI systems do you target?', c: 'Primary targets: Google AI Overview, Perplexity AI, ChatGPT Search and Bing Copilot. Each system has different source selection criteria; I customize strategy according to these differences.' },
    { s: 'Does GEO drive traffic?', c: 'It delivers brand awareness and authority rather than direct traffic. However, referral traffic from AI Overview sources is growing steadily; an increase in branded searches is also a concrete indicator of GEO success.' },
  ],
}

const ISTATISTIKLER = [
  { rakam: '%46', tr: 'Google aramalarında AI Overview gösterilme oranı (2025)', en: 'Google searches showing AI Overview (2025)' },
  { rakam: '3.5x', tr: 'AI kaynak görünürlüğünün sağladığı marka recall artışı', en: 'Brand recall increase from AI source visibility' },
  { rakam: '%32', tr: 'Zero-click aramaların oranı — AI yanıtlar nedeniyle', en: 'Zero-click searches — due to AI answers' },
  { rakam: '%78', tr: 'İçerik kalitesini AI kaynak seçiminin #1 faktörü sayan LLM araştırması', en: 'LLM research ranking content quality as #1 source factor' },
]

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifFaq, setAktifFaq] = useState(null)
  const [aktifAI, setAktifAI] = useState(0)

  const hizmetler = isEn ? HIZMETLER.en : HIZMETLER.tr
  const surec = isEn ? SUREC.en : SUREC.tr
  const faqlar = isEn ? FAQS.en : FAQS.tr
  const farklar = isEn ? FARKLAR.en : FARKLAR.tr

  const t = isEn ? {
    badge: 'GEO CONSULTING',
    h1a: 'Get Cited by AI —',
    h1b: 'Generative Engine Optimization Expert',
    h1c: 'Appear in ChatGPT, Gemini & Perplexity Answers',
    subtitle: 'The Future of Search is AI — Is Your Brand Ready?',
    desc: 'AI search engines are rewriting the rules of visibility. I help brands appear as trusted sources in ChatGPT, Perplexity, Google AI Overview and Bing Copilot through proven GEO strategies.',
    btn1: 'Get a Free GEO Audit →',
    btn2: 'View Case Studies',
    what_h2: 'What is GEO and Why Does It Matter?',
    what_p1: 'Generative Engine Optimization (GEO) is the practice of optimizing your content to be cited as a source in AI-powered search engines and response systems. As LLMs like ChatGPT, Gemini and Perplexity become the primary interface for information retrieval, appearing in their answers is the new first page.',
    what_p2: 'Traditional SEO gets you ranked. GEO gets you quoted. When an AI system answers a query about your industry and cites your brand as a source, the credibility and authority transfer is worth far more than a #5 ranking on a SERP.',
    how_h2: 'How Generative AI Search Engines Work',
    how_p: 'AI search engines use a process called Retrieval-Augmented Generation (RAG): they retrieve relevant documents from the web, process them through a large language model, and generate a synthesized response. Your content needs to pass three filters to become a source:',
    how_filters: ['Retrieval: Googlebot or AI crawlers must find and index your page', 'Relevance: The content must directly and accurately answer the query', 'Trust: E-E-A-T signals, citations and entity authority must confirm credibility'],
    hizmetler_h2: 'Our GEO Services',
    diff_h2: 'GEO vs SEO — Key Differences',
    why_not_h2: 'Why AI Isn\'t Mentioning Your Brand',
    why_not_points: [
      { ikon: '📄', baslik: 'Content isn\'t structured for AI', aciklama: 'LLMs prefer content with clear definitions, direct answers and summarizable structure. Generic content gets skipped.' },
      { ikon: '🏷️', baslik: 'Missing schema markup', aciklama: 'Without FAQPage, Article and Organization schema, AI systems can\'t efficiently parse your expertise signals.' },
      { ikon: '🌐', baslik: 'Low entity authority', aciklama: 'If your brand isn\'t established in Knowledge Graph and citation networks, LLMs treat you as an unknown source.' },
      { ikon: '📋', baslik: 'No llms.txt file', aciklama: 'Without explicit AI crawler guidance, systems may not know how to use your content appropriately.' },
    ],
    surec_h2: 'Our GEO Strategy Process',
    ai_h2: 'Optimization for ChatGPT, Gemini & Perplexity',
    faq_h2: 'FAQ',
    cta_h2: 'Get Your Free GEO Audit',
    cta_desc: 'I\'ll analyze how your brand currently appears (or doesn\'t) in AI search results and show you the exact steps to become a cited source.',
    cta_btn: 'Start Free GEO Audit →',
    breadcrumb: ['Home', 'Services', 'GEO Consulting'],
    kriter: 'Criterion', seo_col: 'Classic SEO', geo_col: 'GEO',
  } : {
    badge: 'GEO DANIŞMANLIĞI',
    h1a: 'Yapay Zeka Aramalarında Öne Çıkın —',
    h1b: 'GEO Uzmanı',
    h1c: 'ChatGPT, Gemini ve Perplexity\'de Markanızı Gösterin',
    subtitle: 'Generative Engine Optimization ile Geleceğin Aramasına Hazırlanın',
    desc: 'AI arama motorları görünürlüğün kurallarını yeniden yazıyor. Kanıtlanmış GEO stratejileriyle markaların ChatGPT, Perplexity, Google AI Overview ve Bing Copilot\'ta güvenilir kaynak olarak görünmesine yardım ediyorum.',
    btn1: 'Ücretsiz GEO Analizi Al →',
    btn2: 'Vaka Çalışmaları',
    what_h2: 'GEO Nedir? Neden Önemlidir?',
    what_p1: 'Generative Engine Optimization (GEO), yapay zekâ destekli arama motorlarında içeriklerinizin kaynak olarak alıntılanmasını sağlayan optimizasyon pratiğidir. ChatGPT, Gemini ve Perplexity gibi LLM\'ler bilgiye erişimin birincil arayüzü haline gelirken, bu sistemlerin yanıtlarında görünmek yeni "ilk sayfa"dır.',
    what_p2: 'Geleneksel SEO sizi sıralar. GEO sizi alıntılar. Bir AI sistemi sektörünüzle ilgili soruyu yanıtlarken markanızı kaynak gösterdiğinde, kazanılan güvenilirlik ve otorite, SERP\'te 5. sırada olmaktan çok daha değerlidir.',
    how_h2: 'AI Arama Motorları Nasıl Çalışır?',
    how_p: 'AI arama motorları RAG (Retrieval-Augmented Generation) adı verilen süreci kullanır: web\'den ilgili belgeler alır, büyük bir dil modelinden geçirir ve sentezlenmiş bir yanıt üretir. İçeriğinizin kaynak seçilmesi için üç filtreyi geçmesi gerekir:',
    how_filters: ['Erişilebilirlik: Googlebot veya AI tarayıcıları sayfanızı bulup indexlemeli', 'Alaka: İçerik sorguya doğrudan ve doğru biçimde yanıt vermeli', 'Güven: E-E-A-T sinyalleri, atıflar ve entity otoritesi güvenilirliği onaylamalı'],
    hizmetler_h2: 'Sunduğumuz GEO Hizmetleri',
    diff_h2: 'GEO ile SEO Arasındaki Fark',
    why_not_h2: 'Markanız AI Yanıtlarında Neden Görünmüyor?',
    why_not_points: [
      { ikon: '📄', baslik: 'İçerik AI için yapılandırılmamış', aciklama: 'LLM\'ler net tanımlar, doğrudan yanıtlar ve özet çıkarılabilir yapı tercih eder. Genel içerik atlanır.' },
      { ikon: '🏷️', baslik: 'Schema markup eksik', aciklama: 'FAQPage, Article ve Organization schema olmadan AI sistemleri uzmanlık sinyallerini verimli işleyemez.' },
      { ikon: '🌐', baslik: 'Düşük entity otoritesi', aciklama: 'Markanız Knowledge Graph ve atıf ağlarında yer almıyorsa LLM\'ler sizi bilinmeyen kaynak olarak değerlendirir.' },
      { ikon: '📋', baslik: 'llms.txt dosyası yok', aciklama: 'AI tarayıcılarına açık yönlendirme olmadan sistemler içeriğinizi nasıl kullanacağını bilemeyebilir.' },
    ],
    surec_h2: 'GEO Stratejimiz Nasıl İşliyor?',
    ai_h2: 'Perplexity, ChatGPT ve Gemini için Optimizasyon',
    faq_h2: 'Sık Sorulan Sorular',
    cta_h2: 'Ücretsiz GEO Analizi Alın',
    cta_desc: 'Markanızın AI arama sonuçlarında mevcut durumunu analiz edip kaynak görünürlüğü kazanmak için atmanız gereken adımları net biçimde göstereceğim.',
    cta_btn: 'Ücretsiz GEO Analizi Başlat →',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'GEO Danışmanlığı'],
    kriter: 'Kriter', seo_col: 'Klasik SEO', geo_col: 'GEO',
  }

  const AI_DETAY = isEn ? [
    { isim: 'ChatGPT Search', p: 'ChatGPT Search uses the Bing index + OpenAI\'s web crawler (GPTBot). Key factors: Bing SEO quality, allowing GPTBot in robots.txt, clean technical structure and fast-loading pages. Content must be authoritative and up-to-date.' },
    { isim: 'Perplexity AI', p: 'Perplexity uses a RAG architecture that pulls from multiple web sources. It heavily favors original research, numerical data, expert opinions and well-cited content. Pages with strong E-E-A-T signals and cited sources are prioritized.' },
    { isim: 'Google AI Overview', p: 'AI Overview is powered by Google\'s own index. Standard Google SEO quality is the baseline, but content must also be directly answerable, summarizable and marked with relevant schema. FAQPage and Article schema are especially impactful.' },
    { isim: 'Bing Copilot', p: 'Bing Copilot is GPT-4 based and relies on Bing\'s index. Bing Webmaster Tools verification, fast mobile pages and structured content are the foundation. Bing tends to favor shorter, more definitive answers than Google.' },
  ] : [
    { isim: 'ChatGPT Search', p: 'ChatGPT Search, Bing indeksi + OpenAI\'ın web tarayıcısını (GPTBot) kullanır. Temel faktörler: Bing SEO kalitesi, robots.txt\'te GPTBot\'a izin verme, temiz teknik yapı ve hızlı yüklenen sayfalar. İçerik otoriter ve güncel olmalıdır.' },
    { isim: 'Perplexity AI', p: 'Perplexity, birden fazla web kaynağından yararlanılan bir RAG mimarisi kullanır. Özgün araştırma, sayısal veri, uzman görüşleri ve iyi kaynaklara dayanan içerikleri güçlü biçimde tercih eder. E-E-A-T sinyalleri ve atıflı kaynaklar önceliklidir.' },
    { isim: 'Google AI Overview', p: 'AI Overview, Google\'ın kendi indeksiyle çalışır. Standart Google SEO kalitesi temeldir; ancak içerik aynı zamanda doğrudan yanıtlanabilir, özetlenebilir ve ilgili schema ile işaretlenmiş olmalıdır. FAQPage ve Article schema özellikle etkilidir.' },
    { isim: 'Bing Copilot', p: 'Bing Copilot, GPT-4 tabanlıdır ve Bing\'in indeksine dayanır. Bing Webmaster Tools doğrulaması, hızlı mobil sayfalar ve yapılandırılmış içerik temeldir. Bing, Google\'a kıyasla daha kısa ve kesin yanıtları tercih etme eğilimindedir.' },
  ]

  return (
    <>
      <Head>
        <title>{isEn ? 'GEO Consulting | AI Search Optimization' : 'GEO Danışmanlığı | AI Arama Optimizasyonu'}</title>
        <meta name="description" content={isEn ? "Generative Engine Optimization to appear as a cited source in ChatGPT, Perplexity and Google AI Overview. Prepare your brand for the future of AI-driven search." : "Generative Engine Optimization ile ChatGPT, Perplexity ve Google AI Overview'da kaynak olarak görünün. Markanızı yapay zekâ aramalarının geleceğine hazırlayın."} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/geo-consulting' : 'https://fatihemincakiroglu.com/geo'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/geo" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/geo-consulting" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Service","name":isEn?"GEO Consulting":"GEO Danışmanlığı","provider":{"@id":"https://fatihemincakiroglu.com/#person"},"description":isEn?"Generative Engine Optimization for AI search visibility.":"Yapay zekâ arama görünürlüğü için GEO danışmanlığı."})}</script>
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
        <section style={{ background: 'linear-gradient(160deg, #0f0c29 0%, #1a1045 50%, #0f0c29 100%)', padding: '100px 32px 80px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(232,86,10,0.1) 0%, transparent 50%)' }} />
          {/* Floating AI icons */}
          <div style={{ position: 'absolute', top: '20%', right: '8%', fontSize: '64px', opacity: 0.06, transform: 'rotate(15deg)' }}>🤖</div>
          <div style={{ position: 'absolute', bottom: '20%', right: '20%', fontSize: '48px', opacity: 0.04, transform: 'rotate(-10deg)' }}>✦</div>

          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', fontSize: '11px', fontWeight: 700, color: '#a5b4fc', letterSpacing: '2px', marginBottom: '24px' }}>
                {t.badge}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
                <span style={{ display: 'block', marginBottom: '4px', color: '#a5b4fc' }}>{t.h1a}</span>
                <span style={{ display: 'block' }}>{t.h1b}</span>
              </h1>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 700, color: 'var(--orange)', fontStyle: 'italic', marginBottom: '16px', lineHeight: 1.3 }}>{t.h1c}</h2>
              <p style={{ color: '#9ca3af', fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>{t.subtitle}</p>
              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.8, marginBottom: '36px', maxWidth: '520px' }}>{t.desc}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '15px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', boxShadow: '0 4px 24px rgba(232,86,10,0.4)' }}>{t.btn1}</Link>
                <Link href={isEn ? '/en/case-studies' : '/vakalar'} style={{ padding: '15px 32px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', border: '1px solid rgba(255,255,255,0.12)' }}>{t.btn2}</Link>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {ISTATISTIKLER.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '22px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '34px', fontWeight: 900, color: i % 2 === 0 ? '#a5b4fc' : 'var(--orange)', lineHeight: 1, marginBottom: '8px' }}>{s.rakam}</div>
                  <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.5 }}>{isEn ? s.en : s.tr}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GEO NEDİR ─── */}
        <section style={{ padding: '80px 32px', background: '#fff' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '28px', height: '2px', background: 'var(--orange)' }} />
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px' }}>GEO</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '20px', lineHeight: 1.2 }}>{t.what_h2}</h2>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '16px' }}>{t.what_p1}</p>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '28px' }}>{t.what_p2}</p>
                <div style={{ padding: '20px', background: 'rgba(99,102,241,0.06)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.15)', borderLeft: '4px solid #6366f1' }}>
                  <p style={{ fontSize: '15px', color: '#4338ca', fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                    {isEn ? '"Traditional SEO gets you ranked. GEO gets you quoted."' : '"Geleneksel SEO sizi sıralar. GEO sizi alıntılar."'}
                  </p>
                </div>
              </div>

              {/* AI sistemi görseli */}
              <div style={{ background: '#0f0c29', borderRadius: '20px', padding: '28px', border: '1px solid rgba(99,102,241,0.2)' }}>
                <div style={{ fontSize: '12px', color: '#4b5563', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>
                  {isEn ? 'AI SEARCH ECOSYSTEM' : 'AI ARAMA EKOSİSTEMİ'}
                </div>
                {AI_SISTEMLER.map((ai, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '8px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: ai.renk + '22', border: `1px solid ${ai.renk}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, color: ai.renk, flexShrink: 0 }}>{ai.logo}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#e5e7eb' }}>{ai.isim}</div>
                      <div style={{ height: '4px', background: '#1f2937', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: ai.pazar, background: ai.renk, borderRadius: '2px' }} />
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: ai.renk }}>{ai.pazar}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── NASIL ÇALIŞIR ─── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '16px', textAlign: 'center' }}>{t.how_h2}</h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '36px', textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px' }}>{t.how_p}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
              {t.how_filters.map((f, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eee', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '22px', fontWeight: 900, color: '#6366f1', fontFamily: 'var(--font-display)' }}>{i + 1}</div>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, margin: 0 }}>{f}</p>
                </div>
              ))}
            </div>

            {/* RAG Pipeline görseli */}
            <div style={{ background: '#111', borderRadius: '16px', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { label: isEn ? 'User Query' : 'Kullanıcı Sorgusu', color: '#6366f1' },
                { label: '→', color: '#374151', arrow: true },
                { label: isEn ? 'Retrieval' : 'Erişim', color: '#0ea5e9' },
                { label: '→', color: '#374151', arrow: true },
                { label: isEn ? 'LLM Processing' : 'LLM İşleme', color: '#8b5cf6' },
                { label: '→', color: '#374151', arrow: true },
                { label: isEn ? 'AI Answer + Sources' : 'AI Yanıt + Kaynaklar', color: '#10b981' },
              ].map((item, i) => item.arrow ? (
                <span key={i} style={{ color: '#374151', fontSize: '20px', fontWeight: 700 }}>{item.label}</span>
              ) : (
                <div key={i} style={{ padding: '10px 16px', borderRadius: '8px', background: item.color + '22', border: `1px solid ${item.color}44`, fontSize: '13px', fontWeight: 700, color: item.color, textAlign: 'center' }}>{item.label}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HİZMETLER ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '40px', textAlign: 'center' }}>{t.hizmetler_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {hizmetler.map((h, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '28px', border: '1px solid #ede8e0', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.1)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#faf9f7'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#ede8e0'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ fontSize: '32px', marginBottom: '14px' }}>{h.ikon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '10px' }}>{h.baslik}</h3>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.65 }}>{h.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GEO vs SEO ─── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '32px', textAlign: 'center' }}>{t.diff_h2}</h2>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#aaa', letterSpacing: '1px', textTransform: 'uppercase', background: '#1a1612', width: '25%' }}>{t.kriter}</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#6b7280', letterSpacing: '1px', textTransform: 'uppercase', background: '#1a1612', width: '37.5%' }}>{t.seo_col}</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#a5b4fc', letterSpacing: '1px', textTransform: 'uppercase', background: '#1a1612', width: '37.5%' }}>{t.geo_col}</th>
                  </tr>
                </thead>
                <tbody>
                  {farklar.map((satir, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#faf9f7' }}>
                      <td style={{ padding: '14px 24px', fontSize: '14px', fontWeight: 700, color: '#111' }}>{satir.kriter}</td>
                      <td style={{ padding: '14px 24px', fontSize: '14px', color: '#777' }}>{satir.seo}</td>
                      <td style={{ padding: '14px 24px', fontSize: '14px', color: '#4338ca', fontWeight: 600 }}>{satir.geo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── NEDEN GÖRÜNMEMİYOR ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '36px', textAlign: 'center' }}>{t.why_not_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {t.why_not_points.map((p, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '28px', border: '1px solid #ede8e0', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '28px', flexShrink: 0, marginTop: '2px' }}>{p.ikon}</div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{p.baslik}</h3>
                    <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.65, margin: 0 }}>{p.aciklama}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SÜREÇ ─── */}
        <section style={{ padding: '80px 32px', background: 'linear-gradient(135deg, #0f0c29 0%, #1a1045 100%)', borderTop: '1px solid #1f2937' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#fff', marginBottom: '48px', textAlign: 'center' }}>{t.surec_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '44px', left: '12.5%', right: '12.5%', height: '1px', background: 'linear-gradient(to right, #6366f1, #8b5cf6, #6366f1)', zIndex: 0 }} />
              {surec.map((s, i) => (
                <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', border: '2px solid rgba(99,102,241,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', backdropFilter: 'blur(10px)' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 900, color: '#a5b4fc' }}>{s.no}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 800, color: '#e5e7eb', marginBottom: '8px' }}>{s.baslik}</h3>
                  <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.65 }}>{s.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AI SİSTEMLERİ DETAY ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '32px', textAlign: 'center' }}>{t.ai_h2}</h2>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {AI_SISTEMLER.map((ai, i) => (
                <button key={i} onClick={() => setAktifAI(i)} style={{ padding: '10px 20px', borderRadius: '8px', border: aktifAI === i ? 'none' : '1px solid #eee', background: aktifAI === i ? ai.renk : '#fff', color: aktifAI === i ? '#fff' : '#555', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.15s' }}>
                  {ai.logo} {ai.isim}
                </button>
              ))}
            </div>
            <div style={{ background: '#faf9f7', borderRadius: '16px', padding: '36px', border: '1px solid #eee', borderLeft: `4px solid ${AI_SISTEMLER[aktifAI].renk}` }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: AI_SISTEMLER[aktifAI].renk }}>{AI_SISTEMLER[aktifAI].logo}</span> {AI_SISTEMLER[aktifAI].isim}
              </h3>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, margin: 0 }}>{AI_DETAY[aktifAI].p}</p>
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
                    <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: aktifFaq === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
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
        <section style={{ padding: '96px 32px', background: 'linear-gradient(160deg, #0f0c29 0%, #1a1045 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.15) 0%, transparent 60%)' }} />
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✦</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>{t.cta_h2}</h2>
            <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>{t.cta_desc}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '16px 36px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', boxShadow: '0 4px 24px rgba(232,86,10,0.4)' }}>{t.cta_btn}</Link>
              <Link href={isEn ? '/en/case-studies' : '/vakalar'} style={{ padding: '16px 36px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}>
                {isEn ? 'View Results →' : 'Sonuçları Gör →'}
              </Link>
            </div>
            <p style={{ color: '#1f2937', fontSize: '13px', marginTop: '20px' }}>
              {isEn ? '✓ Free audit · ✓ No commitment · ✓ Custom GEO roadmap' : '✓ Ücretsiz analiz · ✓ Yükümlülük yok · ✓ Özel GEO yol haritası'}
            </p>
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
