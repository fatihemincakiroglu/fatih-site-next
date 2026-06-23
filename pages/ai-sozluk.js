import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const TERIMLER = [
  { terim: 'AI Agent', trTerim: 'Yapay Zekâ Ajanı', kategori: 'AI & LLM', ilgili: ['LLM', 'AI Search', 'AI Overview'],
    aciklama: 'LLM tabanlı modeller kullanarak görevleri yerine getiren, kararlar alan ve eylemler gerçekleştiren otonom yazılım programı. Web\'de gezinebilir, kod yazabilir ve çok adımlı planları uygulayabilir.',
    aciklama_en: 'An autonomous software program that uses LLM-based models to perform tasks, make decisions and take actions. Can browse the web, write code and execute multi-step plans.' },
  { terim: 'AI Content', trTerim: 'Yapay Zekâ İçeriği', kategori: 'İçerik', ilgili: ['E-E-A-T', 'GEO', 'Topical Authority'],
    aciklama: 'ChatGPT, Claude, Gemini gibi yapay zekâ araçlarıyla üretilen içerik. SEO ve GEO açısından değerli olabilmesi için insan editöryel denetiminden geçmeli, özgün veri ve E-E-A-T sinyalleriyle zenginleştirilmelidir.',
    aciklama_en: 'Content produced using AI tools (ChatGPT, Claude, Gemini, etc.). To be valuable for SEO and GEO, it must pass human editorial review and be enriched with original data and E-E-A-T signals.' },
  { terim: 'AI Overview', trTerim: 'Yapay Zekâ Özeti', kategori: 'GEO', ilgili: ['GEO', 'Featured Snippet', 'LLM'],
    aciklama: 'Google\'ın arama sonuçlarının üstünde gösterdiği, LLM tarafından üretilen özet yanıt özelliği. Kaynak olarak seçilen sitelere marka otoritesi ve referral trafik kazandırır. GEO\'nun birincil hedefidir.',
    aciklama_en: 'Google\'s feature showing LLM-generated summary answers at the top of search results with cited sources. Sites selected as sources gain brand authority and referral traffic. The primary target of GEO.' },
  { terim: 'Answer Engine Optimization', trTerim: 'AEO', kategori: 'GEO', ilgili: ['GEO', 'Zero-Click', 'Featured Snippet'],
    aciklama: 'Perplexity, ChatGPT ve You.com gibi yanıt motorlarında içeriklerin kaynak olarak görünmesini sağlayan optimizasyon pratiği. Soru-cevap formatı, doğrudan yanıtlar ve özet çıkarılabilir yapı temel gereksinimlerdir.',
    aciklama_en: 'The practice of optimizing content to appear as a cited source in answer engines like Perplexity, ChatGPT and You.com. Q&A format, direct answers and summarizable structure are core requirements.' },
  { terim: 'Backlink', trTerim: 'Geri Bağlantı', kategori: 'Otorite', ilgili: ['Domain Authority', 'Topical Authority', 'Dijital PR'],
    aciklama: 'Başka bir web sitesinin sayfanıza verdiği bağlantı. Arama motorları backlinkleri "güven oyu" olarak değerlendirir. On yılı aşkın süredir en önemli 3 sıralama faktöründen biri. Link kalitesi miktarından önemlidir.',
    aciklama_en: 'A link from another website pointing to your page. Search engines treat backlinks as "votes of confidence." One of the top-3 ranking factors for over a decade. Link quality matters more than quantity.' },
  { terim: 'Canonical Tag', trTerim: 'Kanonik Etiket', kategori: 'Teknik SEO', ilgili: ['Duplicate Content', 'Crawl Bütçesi', 'URL Yapısı'],
    aciklama: 'Birden fazla URL\'de benzer içerik bulunduğunda tercih edilen versiyonu arama motorlarına bildiren HTML elementi. E-ticaret filtre sayfaları ve URL parametrelerinde kritiktir. Her sayfa kendi kanonikine işaret etmelidir.',
    aciklama_en: 'An HTML element that tells search engines the preferred URL when similar content exists across multiple URLs. Critical for e-commerce filter pages and URL parameters. Every page should self-reference as canonical.' },
  { terim: 'Core Web Vitals', trTerim: 'Temel Web Metrikleri', kategori: 'Teknik SEO', ilgili: ['LCP', 'INP', 'CLS', 'Sayfa Hızı'],
    aciklama: 'Google\'ın resmi sıralama sinyali olarak kullandığı kullanıcı deneyimi metrikleri: LCP (yükleme <2.5s), INP (etkileşim <200ms), CLS (görsel kararlılık <0.1). Teknik SEO\'nun temel bileşenlerinden biridir.',
    aciklama_en: 'Google\'s official user experience ranking signals: LCP (loading <2.5s), INP (interaction <200ms), CLS (visual stability <0.1). One of the core pillars of technical SEO.' },
  { terim: 'Crawl Bütçesi', trTerim: 'Tarama Bütçesi', kategori: 'Teknik SEO', ilgili: ['İndeksleme', 'Robots.txt', 'Site Mimarisi'],
    aciklama: 'Google\'ın sitenize belirli bir sürede ayırdığı tarama kapasitesi. Büyük siteler için kritiktir — düşük kaliteli sayfalar crawl bütçesini boşa harcatır ve önemli sayfaların indexlenmesini engeller.',
    aciklama_en: 'The crawling capacity Google allocates to your site within a given timeframe. Critical for large sites — low-quality pages waste crawl budget and prevent important pages from being indexed.' },
  { terim: 'Domain Authority', trTerim: 'Alan Otoritesi', kategori: 'Otorite', ilgili: ['Backlink', 'Trust Score', 'Page Authority'],
    aciklama: 'Bir domainin sıralama gücünü backlink profiline göre tahmin eden 1-100 arası skor. Moz (DA) ve Ahrefs (DR) tarafından hesaplanır. Resmi Google metriği değildir; karşılaştırma için pratik göstergedir.',
    aciklama_en: 'A 1-100 score predicting a domain\'s ranking strength based on its backlink profile. Calculated by Moz (DA) and Ahrefs (DR). Not an official Google metric, but a practical comparison benchmark.' },
  { terim: 'E-E-A-T', trTerim: 'Deneyim-Uzmanlık-Otorite-Güven', kategori: 'Otorite', ilgili: ['Topical Authority', 'Schema Markup', 'Yazar Profili'],
    aciklama: 'Experience, Expertise, Authoritativeness, Trustworthiness — Google\'ın içerik kalitesini değerlendirdiği çerçeve. YMYL siteleri için özellikle katı uygulanır. AI sistemleri de kaynak seçiminde E-E-A-T sinyallerini kullanır.',
    aciklama_en: 'Experience, Expertise, Authoritativeness, Trustworthiness — Google\'s content quality evaluation framework. Applied especially strictly for YMYL sites. AI systems also use E-E-A-T signals for source selection.' },
  { terim: 'Embedding', trTerim: 'Vektör Temsil', kategori: 'AI & LLM', ilgili: ['Semantic Search', 'RAG', 'LLM'],
    aciklama: 'Metnin anlamını matematiksel vektör formunda kodlayan temsil. LLM\'ler içerikleri anlayabilmek için embedding vektörlerine çevirir. Semantik açıdan zengin içerikler vektör benzerliğinde yüksek skor alır.',
    aciklama_en: 'A vector representation that encodes the meaning of text in mathematical form. LLMs convert content into embedding vectors to understand semantics. Semantically rich content scores well in vector similarity.' },
  { terim: 'Featured Snippet', trTerim: 'Öne Çıkan Snippet', kategori: 'SEO', ilgili: ['Zero-Click', 'AI Overview', 'Schema Markup'],
    aciklama: 'Google arama sonuçlarının üstünde (Sıfır Konum) görünen, bir web sayfasından alınan doğrudan yanıt kutusu. Paragraf, liste veya tablo formatında olabilir. AI Overview kaynak seçimiyle güçlü korelasyon taşır.',
    aciklama_en: 'The highlighted answer box at the top of Google search results (Position Zero) showing a direct answer from a webpage. Can be paragraph, list or table format. Strong correlation with AI Overview source selection.' },
  { terim: 'GEO', trTerim: 'Üretken Arama Optimizasyonu', kategori: 'GEO', ilgili: ['AI Overview', 'LLM', 'AEO'],
    aciklama: 'Generative Engine Optimization — yapay zekâ destekli arama motorlarında içeriklerin kaynak olarak alıntılanmasını sağlayan optimizasyon pratiği. Google AI Overview, ChatGPT, Perplexity ve Bing Copilot birincil hedeflerdir.',
    aciklama_en: 'Generative Engine Optimization — the practice of optimizing content to be cited as a source in AI-powered search engines. Google AI Overview, ChatGPT, Perplexity and Bing Copilot are the primary targets.' },
  { terim: 'Grounding', trTerim: 'Kaynak Bağlama', kategori: 'AI & LLM', ilgili: ['RAG', 'GEO', 'E-E-A-T'],
    aciklama: 'LLM\'lerin yanıtlarını iç model bilgisi yerine doğrulanabilir gerçek dünya kaynaklarına dayandırması. Özgün veri, araştırma atıfları ve uzman görüşleri grounding kaynağı seçilme olasılığını artırır.',
    aciklama_en: 'LLMs basing their responses on verifiable real-world sources rather than internal model knowledge. Original data, research citations and expert opinions increase the chance of being selected as a grounding source.' },
  { terim: 'Hreflang', trTerim: 'Dil-Bölge Etiketi', kategori: 'Teknik SEO', ilgili: ['Canonical Tag', 'Uluslararası SEO', 'İndeksleme'],
    aciklama: 'Çok dilli veya çok bölgeli sitelerde hangi sayfanın hangi dil ve bölge için hedeflendiğini arama motorlarına bildiren HTML attribute. Hatalı implementasyon duplicate content sorununa ve yanlış sıralamaya yol açar.',
    aciklama_en: 'An HTML attribute telling search engines which language and region each page targets on multilingual/multi-regional sites. Incorrect implementation leads to duplicate content and wrong pages ranking in wrong countries.' },
  { terim: 'INP', trTerim: 'Sonraki Etkileşime Boyama Süresi', kategori: 'Teknik SEO', ilgili: ['Core Web Vitals', 'CLS', 'LCP'],
    aciklama: 'Interaction to Next Paint — Mart 2024\'te FID\'in yerini aldı. Sayfadaki tüm tıklama, dokunma ve klavye etkileşimlerinin yanıt süresini ölçer. Hedef: 200ms altı. Ana thread blokajı birincil sorundur.',
    aciklama_en: 'Interaction to Next Paint — replaced FID in March 2024. Measures the response time for all click, touch and keyboard interactions. Target: under 200ms. Main thread blocking is the primary issue.' },
  { terim: 'Knowledge Graph', trTerim: 'Bilgi Grafiği', kategori: 'SEO', ilgili: ['Entity SEO', 'Schema Markup', 'GEO'],
    aciklama: 'Google\'ın gerçek dünya varlıklarını (kişi, yer, organizasyon, kavram) ve aralarındaki ilişkileri içeren yapılandırılmış veritabanı. Knowledge Graph\'ta yer almak AI Overview kaynak seçiminde önemli avantaj sağlar.',
    aciklama_en: 'Google\'s structured database of real-world entities (people, places, organizations, concepts) and their relationships. Appearing in the Knowledge Graph provides a significant advantage for AI Overview source selection.' },
  { terim: 'LCP', trTerim: 'En Büyük İçerikli Boyama', kategori: 'Teknik SEO', ilgili: ['Core Web Vitals', 'Sayfa Hızı', 'INP'],
    aciklama: 'Largest Contentful Paint. Sayfadaki en büyük görsel veya metin bloğunun yüklenme süresi. 2.5 saniye altı "iyi" kategorisindedir. Görsel optimizasyonu ve sunucu yanıt süresi LCP\'yi doğrudan etkiler.',
    aciklama_en: 'Largest Contentful Paint. Time for the largest image or text block to load. Under 2.5 seconds is "good." Image optimization and server response time directly impact LCP.' },
  { terim: 'LLM', trTerim: 'Büyük Dil Modeli', kategori: 'AI & LLM', ilgili: ['GEO', 'RAG', 'Embedding'],
    aciklama: 'Large Language Model. Büyük ölçekli metin verisi üzerinde eğitilmiş, insan benzeri metin üretebilen yapay zekâ modeli. GPT-4, Claude, Gemini ve Llama bu kategorinin örnekleridir. GEO stratejisinin temel hedef sistemleridir.',
    aciklama_en: 'Large Language Model. An AI model trained on large-scale text data capable of generating human-like text. GPT-4, Claude, Gemini and Llama are examples. The primary target systems for GEO strategy.' },
  { terim: 'llms.txt', trTerim: 'LLM Yönlendirme Dosyası', kategori: 'Teknik SEO', ilgili: ['GEO', 'Robots.txt', 'Crawl Bütçesi'],
    aciklama: 'Web sitelerinin AI sistemlerine içeriklerini nasıl kullanmalarını istediklerini bildirdiği standart dosya. Robots.txt\'in AI eşdeğeri. GEO teknik stratejisinin temel bileşenlerinden biridir.',
    aciklama_en: 'A standard file that tells AI systems how a website wants its content used — robots.txt for AI. One of the core technical components of a GEO strategy.' },
  { terim: 'Prompt Engineering', trTerim: 'İstem Mühendisliği', kategori: 'AI & LLM', ilgili: ['LLM', 'AI Agent', 'GEO'],
    aciklama: 'LLM tabanlı yapay zekâ sistemlerinden en iyi yanıtları almak için girdi talimatlarını optimize etme pratiği. SEO bağlamında, AI sistemlerinin içerikleri nasıl yorumladığını anlamak için gereklidir.',
    aciklama_en: 'The practice of crafting optimal input instructions to get the best responses from LLM-based AI systems. In the SEO context, relevant for understanding how AI systems interpret and use content.' },
  { terim: 'RAG', trTerim: 'Geri Alma Destekli Üretim', kategori: 'AI & LLM', ilgili: ['LLM', 'Embedding', 'Grounding'],
    aciklama: 'Retrieval-Augmented Generation. LLM\'lerin web\'den ilgili belgeler alıp bunlara dayanarak yanıt ürettiği mimari. İçeriğinizin kaynak seçilmesi için erişilebilirlik, alaka ve güven filtrelerini geçmesi gerekir.',
    aciklama_en: 'Retrieval-Augmented Generation. The architecture where LLMs retrieve relevant documents from the web before generating an answer. Content must pass accessibility, relevance and trust filters to become a source.' },
  { terim: 'Schema Markup', trTerim: 'Yapılandırılmış Veri', kategori: 'Teknik SEO', ilgili: ['Rich Results', 'Knowledge Graph', 'GEO'],
    aciklama: 'Arama motorlarına sayfa içeriği hakkında makine-okunabilir bağlam sağlayan yapılandırılmış veri (JSON-LD). Rich results kazandırır ve AI Overview kaynak seçimi olasılığını artırır. GEO için kritik teknik sinyal.',
    aciklama_en: 'Structured data (JSON-LD) providing machine-readable context about page content to search engines. Enables rich results and increases AI Overview source selection probability. Critical technical signal for GEO.' },
  { terim: 'SERP', trTerim: 'Arama Motoru Sonuç Sayfası', kategori: 'SEO', ilgili: ['Featured Snippet', 'AI Overview', 'Zero-Click'],
    aciklama: 'Search Engine Results Page. Google\'ın kullanıcı sorgusuna göre gösterdiği sonuç sayfası. 2025 SERP\'lerinde AI Overview, featured snippet, local pack, alışveriş sonuçları ve knowledge panel organik listelerle bir arada yer alır.',
    aciklama_en: 'Search Engine Results Page. The page Google displays for a user query. 2025 SERPs include AI Overview, featured snippets, local pack, shopping results and knowledge panels alongside organic listings.' },
  { terim: 'Topical Authority', trTerim: 'Konu Otoritesi', kategori: 'Otorite', ilgili: ['E-E-A-T', 'İç Linkleme', 'Pillar-Cluster'],
    aciklama: 'Bir sitenin belirli bir konuyu kapsamlı biçimde ele alması sonucunda arama motorları tarafından uzman kaynak olarak tanınması. Pillar-cluster modeli konu otoritesi inşasının temel metodolojisidir. AI citation olasılığını artırır.',
    aciklama_en: 'When a site comprehensively covers a topic and is recognized by search engines as an expert source. The pillar-cluster model is the core methodology. Increases AI citation probability.' },
  { terim: 'Zero-Click', trTerim: 'Tıklamasız Arama', kategori: 'Analitik', ilgili: ['Featured Snippet', 'AI Overview', 'Knowledge Graph'],
    aciklama: 'Kullanıcının arama sonuçlarından herhangi bir siteye tıklamadan yanıt bulduğu deneyim. AI Overview\'ın yaygınlaşmasıyla zero-click aramaların payı artmaktadır. AI kaynağı olan markalar tıklama olmadan da marka görünürlüğü kazanır.',
    aciklama_en: 'The experience where users find answers on the results page without clicking any link. Growing with AI Overview. Brands appearing as AI sources gain brand visibility even without click traffic.' },
]

const KATEGORILER_TR = ['Tümü', 'AI & LLM', 'GEO', 'SEO', 'Teknik SEO', 'İçerik', 'Otorite', 'Analitik']
const KATEGORILER_EN = ['All', 'AI & LLM', 'GEO', 'SEO', 'Technical SEO', 'Content', 'Authority', 'Analytics']
const KAT_MAP_TR_TO_EN = { 'AI & LLM': 'AI & LLM', 'GEO': 'GEO', 'SEO': 'SEO', 'Teknik SEO': 'Technical SEO', 'İçerik': 'Content', 'Otorite': 'Authority', 'Analitik': 'Analytics' }
const KAT_MAP_EN_TO_TR = { 'AI & LLM': 'AI & LLM', 'GEO': 'GEO', 'SEO': 'SEO', 'Technical SEO': 'Teknik SEO', 'Content': 'İçerik', 'Authority': 'Otorite', 'Analytics': 'Analitik' }

const ALFABE = 'ABCDEFGHIJKLMNOPRSTUVWXYZ'.split('')

const katRenk = {
  'AI & LLM':    { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa' },
  'GEO':         { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  'SEO':         { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  'Teknik SEO':  { bg: '#faf5ff', color: '#9333ea', border: '#e9d5ff' },
  'Technical SEO': { bg: '#faf5ff', color: '#9333ea', border: '#e9d5ff' },
  'İçerik':      { bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' },
  'Content':     { bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' },
  'Otorite':     { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  'Authority':   { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  'Analitik':    { bg: '#f0fdfa', color: '#0d9488', border: '#99f6e4' },
  'Analytics':   { bg: '#f0fdfa', color: '#0d9488', border: '#99f6e4' },
}

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const KATEGORILER = isEn ? KATEGORILER_EN : KATEGORILER_TR

  const [aktifKat, setAktifKat] = useState(isEn ? 'All' : 'Tümü')
  const [arama, setArama] = useState('')
  const [aktifHarf, setAktifHarf] = useState('Tümü')

  // Normalize category for filtering (always use TR internally)
  const aktifKatTR = isEn ? (KAT_MAP_EN_TO_TR[aktifKat] || aktifKat) : aktifKat
  const allLabel = isEn ? 'All' : 'Tümü'

  let filtered = TERIMLER
  if (aktifKat !== allLabel) filtered = filtered.filter(t => t.kategori === aktifKatTR)
  if (arama) filtered = filtered.filter(t => {
    const haystack = `${t.terim} ${t.trTerim} ${isEn ? t.aciklama_en : t.aciklama}`.toLowerCase()
    return haystack.includes(arama.toLowerCase())
  })
  if (aktifHarf !== 'Tümü') filtered = filtered.filter(t => t.terim.toUpperCase().startsWith(aktifHarf))

  const gruplar = {}
  filtered.forEach(t => {
    const harf = t.terim[0].toUpperCase()
    if (!gruplar[harf]) gruplar[harf] = []
    gruplar[harf].push(t)
  })

  const mevcutHarfler = new Set(TERIMLER.map(t => t.terim[0].toUpperCase()))

  const canonical = isEn
    ? 'https://fatihemincakiroglu.com/en/ai-glossary'
    : 'https://fatihemincakiroglu.com/ai-sozluk'

  return (
    <>
      <Head>
        <title>{isEn ? 'AI Glossary | Fatih Emin Çakıroğlu' : 'AI Sözlük | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? `${TERIMLER.length}+ SEO, GEO and AI terms explained in English. LLM, AI Overview, E-E-A-T, RAG and more.` : `${TERIMLER.length}+ SEO, GEO ve AI terimi sözlüğü. LLM, AI Overview, E-E-A-T, RAG ve daha fazlası.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/ai-sozluk" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/ai-glossary" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/ai-sozluk" />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#faf9f7' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{isEn ? 'Home' : 'Ana Sayfa'}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/resources' : '/kaynaklar'} style={{ color: '#aaa', fontSize: '13px' }}>{isEn ? 'Resources' : 'Kaynaklar'}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{isEn ? 'AI Glossary' : 'AI Sözlük'}</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '32px 16px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, padding: '3px 10px', border: '1px solid #eee', borderRadius: '20px', letterSpacing: '1px' }}>
                {isEn ? 'GLOSSARY' : 'SÖZLÜK'}
              </span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>
                {TERIMLER.length}+ {isEn ? 'terms · GEO, AI search & classic SEO' : 'terim · GEO, AI araması ve klasik SEO'}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', marginBottom: '8px', borderLeft: '4px solid var(--orange)', paddingLeft: '14px' }}>
              {isEn ? 'AI Glossary' : 'AI Sözlük'}
            </h1>
            <p style={{ color: '#777', fontSize: '15px', paddingLeft: '18px' }}>
              {isEn
                ? 'Filter by category, jump to a letter on the A–Z strip, or search within terms and definitions.'
                : 'Kategori seçerek daraltın, A–Z şeridinden harfe atlayın veya arama kutusuyla terim ve tanım içinde arayın.'}
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '24px 16px 96px' }}>
          {/* Filters */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px 24px', marginBottom: '32px' }}>
            {/* Kategori */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {KATEGORILER.map(k => (
                <button key={k} onClick={() => { setAktifKat(k); setArama(''); setAktifHarf('Tümü') }}
                  style={{ padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: aktifKat === k ? 'var(--orange)' : '#f5f5f5', color: aktifKat === k ? '#fff' : '#555', fontSize: '13px', fontWeight: aktifKat === k ? 700 : 500, fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                  {k}
                </button>
              ))}
            </div>
            {/* Arama */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #eee', borderRadius: '10px', padding: '11px 16px', background: '#faf9f7', marginBottom: '16px' }}>
              <span style={{ color: '#bbb' }}>🔍</span>
              <input type="text" value={arama}
                placeholder={isEn ? 'Search terms and definitions... (e.g. "AI Overview", "hreflang", "entity")' : 'Terim veya tanım içinde ara... (ör: "AI Overview", "hreflang", "entity")'}
                onChange={e => { setArama(e.target.value); setAktifKat(allLabel); setAktifHarf('Tümü') }}
                style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%' }} />
              {arama && <button onClick={() => setArama('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', fontSize: '16px' }}>✕</button>}
            </div>
            {/* A-Z */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {['Tümü', ...ALFABE].map(h => (
                <button key={h} onClick={() => setAktifHarf(h)}
                  style={{ width: h === 'Tümü' ? '44px' : '32px', height: '32px', borderRadius: '6px', border: 'none', cursor: mevcutHarfler.has(h) || h === 'Tümü' ? 'pointer' : 'default', background: aktifHarf === h ? 'var(--orange)' : mevcutHarfler.has(h) ? '#f5f5f5' : '#fafafa', color: aktifHarf === h ? '#fff' : mevcutHarfler.has(h) ? '#333' : '#ddd', fontSize: h === 'Tümü' ? '11px' : '13px', fontWeight: 600, fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                  {h === 'Tümü' ? (isEn ? 'All' : 'Tüm') : h}
                </button>
              ))}
            </div>
          </div>

          {/* Sonuçlar */}
          {Object.keys(gruplar).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', color: '#aaa' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
              <div style={{ fontSize: '16px' }}>{isEn ? 'No results found.' : 'Sonuç bulunamadı.'}</div>
            </div>
          ) : (
            Object.entries(gruplar).sort(([a], [b]) => a.localeCompare(b)).map(([harf, terimler]) => (
              <div key={harf} id={`harf-${harf}`} style={{ marginBottom: '32px', scrollMarginTop: '80px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid var(--orange)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900, color: '#111', margin: 0 }}>{harf}</h2>
                  <span style={{ fontSize: '12px', color: '#aaa', background: '#f5f5f5', padding: '2px 8px', borderRadius: '10px' }}>{terimler.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {terimler.map((t, i) => {
                    const renk = katRenk[isEn ? KAT_MAP_TR_TO_EN[t.kategori] || t.kategori : t.kategori] || katRenk['SEO']
                    const displayKat = isEn ? (KAT_MAP_TR_TO_EN[t.kategori] || t.kategori) : t.kategori
                    return (
                      <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '22px 24px', border: '1px solid #eee', borderLeft: `4px solid ${renk.color}` }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                          <div>
                            <strong style={{ fontSize: '17px', color: '#111', fontWeight: 800 }}>{t.terim}</strong>
                            {!isEn && t.trTerim && <span style={{ fontSize: '12px', color: '#aaa', marginLeft: '8px' }}>({t.trTerim})</span>}
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: renk.bg, color: renk.color, border: `1px solid ${renk.border}`, flexShrink: 0 }}>
                            {displayKat}
                          </span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.75, marginBottom: t.ilgili.length ? '14px' : '0' }}>
                          {isEn ? (t.aciklama_en || t.aciklama) : t.aciklama}
                        </p>
                        {t.ilgili.length > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', color: '#bbb', fontWeight: 700 }}>{isEn ? 'Related:' : 'İlgili:'}</span>
                            {t.ilgili.map((il, j) => (
                              <span key={j} style={{ fontSize: '11px', color: '#888', padding: '2px 8px', background: '#f5f5f5', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={() => setArama(il)}>
                                {il}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
