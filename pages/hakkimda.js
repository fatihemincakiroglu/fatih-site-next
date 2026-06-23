import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════
   VERİ KATMANI
═══════════════════════════════════════════════════ */

const TIMELINE = {
  tr: [
    { yil: '2009–2013', ikon: '🎓', renk: '#6366f1', baslik: 'Marmara Üniversitesi', alt: 'Bilgisayar ve Öğretim Teknolojileri Eğitimi', detay: 'Eğitim teknolojileri, pedagoji ve bilgisayar bilimleri üzerine lisans eğitimi. Teknoloji ile öğrenmeyi birleştirme tutkusu bu dönemde filizlendi.' },
    { yil: '2013–2018', ikon: '📚', renk: '#0ea5e9', baslik: 'IB Öğretmeni', alt: 'Uluslararası Bakalorya Programı · Özel Okul', detay: '5 yıl boyunca IB eğitimi veren özel bir okulda görev yaptım. Teknoloji destekli öğrenme metodolojileri geliştirdim. Analitik düşünme ve veri odaklı karar alma süreçleri bu dönemde şekillendi.' },
    { yil: '2018–2020', ikon: '📈', renk: '#f59e0b', baslik: 'SEO Uzmanı — Ajans', alt: 'Dijital Pazarlama Ajansı', detay: 'Dijital pazarlamaya geçişin ilk yılları. Teknik SEO, içerik stratejisi ve e-ticaret optimizasyonu alanlarında hızla büyüdüm. İlk büyük ölçekli projelerde liderlik üstlendim.' },
    { yil: '2020–2022', ikon: '🚀', renk: '#16a34a', baslik: 'Kıdemli SEO Uzmanı', alt: 'E-Ticaret & Büyük Ölçekli Projeler', detay: 'Türkiye\'nin lider markalarının SEO stratejilerinde aktif rol. Programatik SEO, Core Web Vitals optimizasyonu ve yapay zekâ destekli içerik süreçlerinde öncü çalışmalar.' },
    { yil: '2022–Günümüz', ikon: '🌐', renk: '#e8560a', baslik: 'Bağımsız SEO & GEO Danışmanı', alt: 'fatihemincakiroglu.com', detay: 'Bağımsız danışmanlık döneminde 150+ marka, 14 sektör. SEO\'nun ötesinde GEO (Generative Engine Optimization) ve yapay zekâ arama sistemlerinde görünürlük konusunda öncü çalışmalar.' },
  ],
  en: [
    { yil: '2009–2013', ikon: '🎓', renk: '#6366f1', baslik: 'Marmara University', alt: 'Computer Education & Instructional Technology', detay: 'Bachelor\'s studies combining educational technology, pedagogy and computer science. Passion for merging technology with learning took root during this period.' },
    { yil: '2013–2018', ikon: '📚', renk: '#0ea5e9', baslik: 'IB Teacher', alt: 'International Baccalaureate Program · Private School', detay: '5 years at an IB-certified private school developing technology-assisted learning methodologies. Analytical thinking and data-driven decision-making were deeply internalized.' },
    { yil: '2018–2020', ikon: '📈', renk: '#f59e0b', baslik: 'SEO Specialist — Agency', alt: 'Digital Marketing Agency', detay: 'First years transitioning to digital marketing. Rapid growth in technical SEO, content strategy and e-commerce optimization. Led first large-scale projects.' },
    { yil: '2020–2022', ikon: '🚀', renk: '#16a34a', baslik: 'Senior SEO Specialist', alt: 'E-Commerce & Large-Scale Projects', detay: 'Active role in SEO strategies for Turkey\'s leading brands. Pioneering work in programmatic SEO, Core Web Vitals optimization and AI-assisted content workflows.' },
    { yil: '2022–Present', ikon: '🌐', renk: '#e8560a', baslik: 'Independent SEO & GEO Consultant', alt: 'fatihemincakiroglu.com', detay: 'Independent consulting across 150+ brands in 14 sectors. Pioneering GEO (Generative Engine Optimization) — visibility in AI search systems like ChatGPT, Perplexity and Google AI Overview.' },
  ],
}

const BECERILER = [
  {
    ikon: '⚙️', renk: '#e8560a',
    tr: 'Teknik SEO', en: 'Technical SEO', seviye: 98,
    liste: { tr: ['Core Web Vitals (LCP, INP, CLS) optimizasyonu', 'Crawl bütçesi & indexleme yönetimi', 'Schema markup & yapısal veri (JSON-LD)', 'JavaScript SEO & SSR/SSG mimarileri', 'Log dosyası analizi', 'Teknik SEO denetimi (100+ checkpoint)', 'Site migrasyonu & URL yeniden yapılandırma'],
             en: ['Core Web Vitals (LCP, INP, CLS) optimization', 'Crawl budget & indexing management', 'Schema markup & structured data (JSON-LD)', 'JavaScript SEO & SSR/SSG architectures', 'Log file analysis', 'Technical SEO audit (100+ checkpoints)', 'Site migration & URL restructuring'] },
  },
  {
    ikon: '🤖', renk: '#6366f1',
    tr: 'GEO & AI SEO', en: 'GEO & AI SEO', seviye: 94,
    liste: { tr: ['Google AI Overview kaynak optimizasyonu', 'LLMs.txt implementasyonu', 'Entity & Knowledge Graph stratejisi', 'Perplexity ve ChatGPT Search görünürlüğü', 'RAG mimarisi ve grounding anlayışı', 'Citation mimarisi inşası', 'AI içerik kalite filtresi'],
             en: ['Google AI Overview source optimization', 'LLMs.txt implementation', 'Entity & Knowledge Graph strategy', 'Perplexity & ChatGPT Search visibility', 'RAG architecture & grounding understanding', 'Citation architecture building', 'AI content quality filtering'] },
  },
  {
    ikon: '✍️', renk: '#0ea5e9',
    tr: 'İçerik Stratejisi', en: 'Content Strategy', seviye: 92,
    liste: { tr: ['Topical authority inşa metodolojisi', 'Pillar-cluster içerik mimarisi', 'E-E-A-T optimizasyonu', 'Anahtar kelime araştırması & niyet analizi', 'Programatik SEO şablonları', 'İçerik denetimi & güncelleme süreçleri', 'Editoryal takvimleme'],
             en: ['Topical authority building methodology', 'Pillar-cluster content architecture', 'E-E-A-T optimization', 'Keyword research & intent analysis', 'Programmatic SEO templates', 'Content audit & refresh workflows', 'Editorial calendar management'] },
  },
  {
    ikon: '📊', renk: '#16a34a',
    tr: 'Analitik & Araçlar', en: 'Analytics & Tools', seviye: 90,
    liste: { tr: ['Google Search Console ileri düzey kullanım', 'GA4 & Looker Studio dashboard\'ları', 'Ahrefs & SEMrush (uzman seviye)', 'Screaming Frog & log analizörler', 'A/B test metodolojisi', 'Python ile temel veri analizi', 'SEO ROI raporlama'],
             en: ['Google Search Console advanced usage', 'GA4 & Looker Studio dashboards', 'Ahrefs & SEMrush (expert level)', 'Screaming Frog & log analyzers', 'A/B testing methodology', 'Basic data analysis with Python', 'SEO ROI reporting'] },
  },
]

const ISTATISTIKLER = [
  { rakam: '10+', tr: 'Yıl toplam deneyim', en: 'Years total experience', renk: '#6366f1' },
  { rakam: '5',   tr: 'Yıl öğretmenlik', en: 'Years teaching', renk: '#0ea5e9' },
  { rakam: '5',   tr: 'Yıl SEO uzmanlığı', en: 'Years SEO expertise', renk: '#e8560a' },
  { rakam: '150+',tr: 'Marka', en: 'Brands served', renk: '#16a34a' },
  { rakam: '14',  tr: 'Sektör', en: 'Sectors', renk: '#f59e0b' },
  { rakam: '%312',tr: 'Ort. trafik artışı', en: 'Avg. traffic growth', renk: '#ec4899' },
]

const KARSILASTIRMA = {
  tr: {
    baslik: 'Öğretmen Geçmişinin SEO\'ya Katkısı',
    cols: ['Özellik', 'Geleneksel SEO Uzmanı', 'Öğretmen Geçmişli SEO Uzmanı'],
    rows: [
      ['Müşteri eğitimi', 'Rapor verir', 'Öğretir ve açıklar'],
      ['Strateji aktarımı', 'Teknik jargon', 'Anlaşılır dil'],
      ['Öğrenme hızı', 'Standart', 'Yapılandırılmış & hızlı'],
      ['Metodoloji', 'Deneme-yanılma', 'Sistematik pedagoji'],
      ['Algoritma değişimleri', 'Tepkisel', 'Proaktif adaptasyon'],
    ],
  },
  en: {
    baslik: 'How a Teaching Background Elevates SEO',
    cols: ['Attribute', 'Traditional SEO Expert', 'Teacher-Background SEO Expert'],
    rows: [
      ['Client education', 'Delivers reports', 'Teaches and explains'],
      ['Strategy transfer', 'Technical jargon', 'Clear language'],
      ['Learning speed', 'Standard', 'Structured & fast'],
      ['Methodology', 'Trial & error', 'Systematic pedagogy'],
      ['Algorithm changes', 'Reactive', 'Proactive adaptation'],
    ],
  },
}

const TESTIMONIALS = [
  {
    tr: 'Karmaşık SEO konularını bu kadar net anlatan bir danışmanla daha önce çalışmadık. Eğitimci geçmişi belli — her şeyi öğretiyor, sadece yapıyor değil.',
    en: 'We\'ve never worked with a consultant who explains complex SEO topics this clearly. His teaching background shows — he teaches everything, not just does it.',
    isim: 'Ahmet B.', unvan_tr: 'Pazarlama Direktörü', unvan_en: 'Marketing Director',
    sektor_tr: 'E-Ticaret', sektor_en: 'E-Commerce',
  },
  {
    tr: 'GEO konusundaki öngörüsü 6 ay önce AI Overview\'da kaynak olmamızı sağladı. Rakiplerimiz hâlâ nasıl yapıldığını anlamaya çalışıyor.',
    en: 'His GEO foresight got us cited in AI Overview 6 months ahead of our competitors. They\'re still trying to figure out how it\'s done.',
    isim: 'Selin Y.', unvan_tr: 'CMO', unvan_en: 'CMO',
    sektor_tr: 'Fintech', sektor_en: 'Fintech',
  },
  {
    tr: 'Hem öğretmen hem danışman kimliğini çok iyi harmanlıyor. Ekibimiz SEO\'yu gerçekten öğrendi — sadece rapor almadık, strateji kavradık.',
    en: 'Blends teacher and consultant identity brilliantly. Our team actually learned SEO — we didn\'t just receive reports, we understood the strategy.',
    isim: 'Mert K.', unvan_tr: 'Genel Müdür', unvan_en: 'General Manager',
    sektor_tr: 'SaaS', sektor_en: 'SaaS',
  },
]

const FAQS = {
  tr: [
    { s: 'Öğretmenlikten SEO\'ya geçişiniz nasıl oldu?', c: 'IB öğretmenliği sırasında teknolojiyi öğrenme süreçlerine entegre etmek beni analitik düşünmeye yöneltti. Öğrencilerimin performans verilerini takip ederken veri ile karar almanın gücünü fark ettim. SEO\'nun yapısı — içerik kalitesi, kullanıcı odaklılık, sürekli öğrenme döngüsü — öğretmenlikle birebir örtüşüyordu. Bu geçiş çok doğal hissettirdi.' },
    { s: 'Hangi sektörlerde deneyiminiz bulunuyor?', c: 'E-ticaret, fintech, sağlık, hukuk, SaaS, gayrimenkul, turizm, eğitim, medya, sigortacılık, havacılık, otomotiv dahil 14 farklı sektörde çalıştım. Her sektörün kendine özgü arama davranışı, E-E-A-T gereksinimleri ve rekabet dinamikleri olduğunu bizzat deneyimledim.' },
    { s: 'GEO\'ya neden odaklandınız?', c: '2023\'te yapay zekâ destekli arama motorlarının kullanıcı davranışını dönüştürmeye başladığını erken fark ettim. Öğretmenlik geçmişim sayesinde yeni disiplinleri hızla sistemize etme konusunda rahatım. GEO\'nun SEO\'nun bir uzantısı değil, tamamen ayrı bir disiplin olduğunu ve bu alana erken yatırım yapmanın kritik olduğunu gördüm.' },
    { s: 'Danışmanlık süreciniz nasıl işliyor?', c: 'Her proje ücretsiz bir keşif görüşmesiyle başlar. Sitenizi, hedeflerinizi ve rekabet ortamınızı derinlemesine analiz ederek özel bir yol haritası hazırlarım. Ardından aylık retainer veya proje bazlı iş birliği modellerinden birini seçeriz. Tüm çalışmalar şeffaf raporlama ve haftalık güncellemeye dayanır.' },
    { s: 'Öğretmenlik SEO danışmanlığında ne fark yaratıyor?', c: 'İki kritik avantaj sağlıyor: (1) Karmaşık teknik konuları anlaşılır biçimde aktarabiliyorum — müşterilerim neden ve nasıl çalıştığını anlıyor, körü körüne rapor takip etmiyor. (2) Öğrenmeyi sürekli bir süreç olarak görüyorum. Algoritma güncellemeleri geldiğinde, eğitimci refleksiyle sistematik adaptasyon yapıyorum.' },
  ],
  en: [
    { s: 'How did you transition from teaching to SEO?', c: 'Integrating technology into learning during my IB teaching years pushed me toward analytical thinking. While tracking my students\' performance data, I realized the power of data-driven decisions. SEO\'s structure — content quality, user focus, continuous learning cycles — mirrored teaching perfectly. The transition felt very natural.' },
    { s: 'Which sectors do you have experience in?', c: 'I have worked across 14 sectors including e-commerce, fintech, healthcare, legal, SaaS, real estate, tourism, education, media, insurance, aviation and automotive. I\'ve personally experienced how each sector has unique search behaviors, E-E-A-T requirements and competitive dynamics.' },
    { s: 'Why did you focus on GEO?', c: 'In 2023, I was early to recognize that AI-powered search engines were beginning to transform user behavior. My teaching background makes me comfortable with systematizing new disciplines rapidly. I saw that GEO is not an extension of SEO but an entirely separate discipline, and that early investment would be critical.' },
    { s: 'How does your consulting process work?', c: 'Every project starts with a free discovery call. I conduct a deep analysis of your site, goals and competitive landscape, then prepare a custom roadmap. We then choose either a monthly retainer or project-based collaboration model. All work is based on transparent reporting and weekly updates.' },
    { s: 'What difference does a teaching background make in SEO consulting?', c: 'It provides two critical advantages: (1) I communicate complex technical topics clearly — clients understand the why and how, not just follow reports blindly. (2) I view learning as a continuous process. When algorithm updates arrive, I approach adaptation with an educator\'s systematic mindset.' },
  ],
}

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */
export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifSkill, setAktifSkill] = useState(0)
  const [aktifFaq, setAktifFaq] = useState(null)
  const [slideIdx, setSlideIdx] = useState(0)
  const [tlIdx, setTlIdx] = useState(4) // default: present
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const timeline = isEn ? TIMELINE.en : TIMELINE.tr
  const faqlar = isEn ? FAQS.en : FAQS.tr
  const skill = BECERILER[aktifSkill]
  const karsilastirma = isEn ? KARSILASTIRMA.en : KARSILASTIRMA.tr

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.2 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % TESTIMONIALS.length), 4500)
    return () => clearInterval(t)
  }, [])

  const t = isEn ? {
    badge: 'ABOUT ME',
    h1a: 'From Classroom',
    h1b: 'to AI Search.',
    tagline: 'Teacher → Analyst → SEO & GEO Expert',
    intro: 'I graduated from Marmara University\'s Computer Education and Instructional Technology department, then spent 5 years as an IB teacher applying technology-driven learning methods. Since 2018 I\'ve been a dedicated SEO specialist — and since 2022 an independent consultant pioneering GEO alongside SEO.',
    story_h2: 'My Story',
    p1: 'After graduating from Marmara University\'s Computer Education and Instructional Technology department, I started my career as a teacher at an IB-certified private school. During five years of applying innovative, technology-assisted learning methods, I discovered the power of making decisions with data.',
    p2: 'In 2018 I made a deliberate pivot to digital marketing and began my SEO career at an agency. In those early years I worked on large-scale e-commerce and fintech projects, rising to a senior role by 2020 working with Turkey\'s leading brands.',
    p3: 'Since 2022 I have operated as an independent SEO & GEO consultant. Working with 150+ brands across 14 sectors, I was early to recognize that AI is rewriting the future of search. Today I specialize not only in SEO but in GEO — being cited as a source in ChatGPT, Perplexity and Google AI Overview.',
    edu_h2: 'Education',
    timeline_h2: 'Career Journey',
    stats_h2: 'By the Numbers',
    skills_h2: 'Expertise & Skills',
    table_h2: 'The Teaching Advantage',
    testimonials_h2: 'Client Voices',
    faq_h2: 'Common Questions',
    cta_h2: "Let's Work Together",
    cta_p: 'Book a free discovery call. I\'ll analyze your site and deliver a custom growth roadmap.',
    cta_btn: 'Book a Free Call →',
    breadcrumb: ['Home', 'About'],
    available: 'Available for projects',
    cur: 'Current',
    capabilities: 'Capabilities',
    other: 'Other Skills',
  } : {
    badge: 'HAKKIMDA',
    h1a: 'Sınıftan',
    h1b: 'Yapay Zekâ Aramasına.',
    tagline: 'Öğretmen → Analist → SEO & GEO Uzmanı',
    intro: 'Marmara Üniversitesi Bilgisayar ve Öğretim Teknolojileri bölümünden mezun olduktan sonra 5 yıl IB öğretmenliği yaptım. 2018\'den itibaren SEO uzmanıyım; 2022\'den bu yana GEO alanında öncü bir bağımsız danışmanam.',
    story_h2: 'Hikâyem',
    p1: 'Marmara Üniversitesi Bilgisayar ve Öğretim Teknolojileri bölümünden mezun olarak IB eğitimi veren özel bir okulda öğretmen olarak kariyerime başladım. Beş yıl boyunca teknoloji destekli yenilikçi öğrenme yöntemleri uygularken verimle karar almanın gücünü içselleştirdim.',
    p2: '2018\'de dijital pazarlamaya geçerek SEO kariyerime ajans ortamında başladım. E-ticaret ve fintech başta olmak üzere büyük ölçekli projelerde hızla deneyim kazandım ve 2020 itibarıyla Türkiye\'nin lider markalarıyla çalışan kıdemli bir rol üstlendim.',
    p3: '2022\'den bu yana bağımsız SEO & GEO danışmanı olarak çalışıyorum. 14 sektörde 150+ markayla çalışarak yapay zekânın aramanın geleceğini yeniden yazdığını erken fark ettim. Bugün SEO\'nun yanı sıra ChatGPT, Perplexity ve Google AI Overview\'da kaynak olma disiplini olan GEO\'da uzmanlaşmış durumdayım.',
    edu_h2: 'Eğitim',
    timeline_h2: 'Kariyer Yolculuğu',
    stats_h2: 'Rakamlarla',
    skills_h2: 'Uzmanlık & Beceriler',
    table_h2: 'Öğretmenliğin SEO\'ya Katkısı',
    testimonials_h2: 'Müşteriler Ne Diyor?',
    faq_h2: 'Sık Sorulan Sorular',
    cta_h2: 'Birlikte Çalışalım',
    cta_p: 'Ücretsiz keşif görüşmesi ayarlayın. Sitenizi analiz edip özel büyüme yol haritanızı hazırlayacağım.',
    cta_btn: 'Ücretsiz Görüşme Başlat →',
    breadcrumb: ['Ana Sayfa', 'Hakkımda'],
    available: 'Yeni projelere açık',
    cur: 'Günümüz',
    capabilities: 'Yetenekler',
    other: 'Diğer Beceriler',
  }

  return (
    <>
      <Head>
        <title>{isEn ? 'About | Fatih Emin Çakıroğlu — SEO & GEO Expert' : 'Hakkımda | Fatih Emin Çakıroğlu — SEO & GEO Uzmanı'}</title>
        <meta name="description" content={isEn ? 'Fatih Emin Çakıroğlu: former IB teacher turned independent SEO & GEO consultant. 10+ years experience, 150+ brands across 14 sectors.' : 'Fatih Emin Çakıroğlu: IB öğretmenliğinden bağımsız SEO & GEO danışmanlığına. 10+ yıl deneyim, 14 sektörde 150+ marka.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/about' : 'https://fatihemincakiroglu.com/hakkimda'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/hakkimda" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/about" />
        <script type="application/ld+json">{JSON.stringify({ "@context":"https://schema.org","@type":"Person","name":"Fatih Emin Çakıroğlu","jobTitle":isEn?"SEO & GEO Consultant":"SEO & GEO Danışmanı","url":"https://fatihemincakiroglu.com","alumniOf":{"@type":"EducationalOrganization","name":"Marmara University"},"knowsAbout":["SEO","GEO","Technical SEO","Content Strategy","Generative Engine Optimization"],"sameAs":["https://www.linkedin.com/in/fatihemincakiroglu/"] })}</script>
      </Head>

      <div style={{ paddingTop:'var(--nav-h)', background:'var(--bg)', overflowX:'hidden' }}>

        {/* BREADCRUMB */}
        <div style={{ background:'var(--bg2)', borderBottom:'1px solid var(--border)', padding:'10px 24px' }}>
          <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'flex', gap:'6px', alignItems:'center', fontSize:'13px', color:'var(--text3)', flexWrap:'wrap' }}>
            <Link href="/" style={{ color:'var(--text3)' }}>{t.breadcrumb[0]}</Link>
            <span>›</span>
            <span style={{ color:'var(--text2)' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section style={{ background:'#0a0a0a', padding:'88px 24px 80px', position:'relative', overflow:'hidden' }}>
          {/* grid bg */}
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize:'40px 40px', pointerEvents:'none' }} />
          <div style={{ position:'absolute', top:0, right:0, width:'50%', height:'100%', background:'linear-gradient(to left, rgba(232,86,10,0.07), transparent)', pointerEvents:'none' }} />

          <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', position:'relative', display:'grid', gridTemplateColumns:'1fr 260px', gap:'40px', alignItems:'center' }}>
            <div>
              <span style={{ display:'inline-block', fontSize:'11px', fontWeight:700, color:'var(--orange)', padding:'5px 16px', borderRadius:'20px', border:'1px solid rgba(232,86,10,0.3)', background:'rgba(232,86,10,0.08)', letterSpacing:'2px', marginBottom:'24px' }}>{t.badge}</span>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5.5vw,72px)', fontWeight:900, color:'#fff', lineHeight:1.0, marginBottom:'0' }}>{t.h1a}</h1>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5.5vw,72px)', fontWeight:900, color:'var(--orange)', lineHeight:1.0, marginBottom:'20px', fontStyle:'italic' }}>{t.h1b}</h1>
              {/* tagline pill */}
              <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'20px', flexWrap:'wrap' }}>
                {t.tagline.split(' → ').map((step, i, arr) => (
                  <span key={i} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <span style={{ fontSize:'13px', fontWeight:600, color: i === arr.length-1 ? 'var(--orange)' : '#9ca3af', padding:'4px 12px', borderRadius:'20px', background: i === arr.length-1 ? 'rgba(232,86,10,0.12)' : 'rgba(255,255,255,0.05)', border: i === arr.length-1 ? '1px solid rgba(232,86,10,0.3)' : '1px solid rgba(255,255,255,0.08)' }}>{step}</span>
                    {i < arr.length-1 && <span style={{ color:'#374151', fontSize:'14px' }}>→</span>}
                  </span>
                ))}
              </div>
              <p style={{ color:'#6b7280', fontSize:'16px', lineHeight:1.8, maxWidth:'520px', marginBottom:'32px' }}>{t.intro}</p>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                <Link href={isEn?'/en/contact':'/iletisim'} style={{ padding:'13px 28px', background:'var(--orange)', color:'#fff', borderRadius:'8px', fontWeight:700, fontSize:'15px', fontFamily:'var(--font-body)', boxShadow:'0 4px 20px rgba(232,86,10,0.4)', display:'inline-block' }}>
                  {isEn ? 'Work With Me →' : 'Benimle Çalış →'}
                </Link>
                <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer"
                  style={{ padding:'13px 28px', background:'rgba(255,255,255,0.06)', color:'#e5e7eb', borderRadius:'8px', fontWeight:600, fontSize:'15px', fontFamily:'var(--font-body)', border:'1px solid rgba(255,255,255,0.1)', display:'inline-block' }}>
                  LinkedIn →
                </a>
              </div>
            </div>

            {/* Avatar card */}
            <div style={{ display:'flex', flexDirection:'column', gap:'16px', alignItems:'center' }}>
              <div style={{ position:'relative' }}>
                <div style={{ width:'180px', height:'180px', borderRadius:'50%', background:'linear-gradient(135deg,var(--orange),#c44408)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'72px', fontWeight:900, color:'#fff', fontFamily:'var(--font-display)', boxShadow:'0 0 0 6px rgba(232,86,10,0.15),0 0 0 12px rgba(232,86,10,0.06)' }}>F</div>
                <div style={{ position:'absolute', bottom:'4px', right:'-4px', background:'#fff', borderRadius:'10px', padding:'6px 12px', boxShadow:'0 4px 16px rgba(0,0,0,0.25)', display:'flex', alignItems:'center', gap:'6px' }}>
                  <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#22c55e', display:'inline-block', flexShrink:0 }} />
                  <span style={{ fontSize:'11px', fontWeight:700, color:'#111', whiteSpace:'nowrap' }}>{t.available}</span>
                </div>
              </div>
              <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'14px', padding:'18px', width:'100%', maxWidth:'200px' }}>
                <div style={{ fontSize:'11px', color:'#4b5563', fontWeight:700, letterSpacing:'1px', marginBottom:'10px', textTransform:'uppercase' }}>{isEn ? 'Quick Facts' : 'Kısa Özet'}</div>
                {[
                  { icon:'📍', text: isEn ? 'Istanbul, Turkey' : 'İstanbul, Türkiye' },
                  { icon:'🎓', text: isEn ? 'IB Teacher (5 yrs)' : 'IB Öğretmeni (5 yıl)' },
                  { icon:'🔍', text: isEn ? 'SEO Expert (5 yrs)' : 'SEO Uzmanı (5 yıl)' },
                  { icon:'🤖', text: isEn ? 'GEO Pioneer' : 'GEO Öncüsü' },
                ].map((f,i) => (
                  <div key={i} style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'7px', fontSize:'12px', color:'#9ca3af' }}>
                    <span>{f.icon}</span><span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ HİKÂYE + EĞİTİM ═══════════════════════════════ */}
        <section style={{ padding:'72px 24px', background:'var(--bg2)', borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'56px', alignItems:'start' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                <div style={{ width:'24px', height:'2px', background:'var(--orange)' }} />
                <span style={{ fontSize:'11px', color:'var(--text3)', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' }}>{t.story_h2.toUpperCase()}</span>
              </div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'var(--text)', marginBottom:'24px', lineHeight:1.15 }}>{t.story_h2}</h2>
              {[t.p1, t.p2, t.p3].map((p,i) => (
                <p key={i} style={{ fontSize:'15px', color:'var(--text2)', lineHeight:1.85, marginBottom: i < 2 ? '16px' : '0' }}>{p}</p>
              ))}
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {/* Eğitim kartı */}
              <div style={{ background:'var(--bg)', borderRadius:'16px', padding:'26px', border:'1px solid var(--border)' }}>
                <div style={{ fontSize:'11px', fontWeight:700, color:'var(--text3)', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'16px' }}>{t.edu_h2}</div>
                <div style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
                  <div style={{ width:'48px', height:'48px', borderRadius:'12px', background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0 }}>🎓</div>
                  <div>
                    <div style={{ fontWeight:800, color:'var(--text)', fontSize:'15px', marginBottom:'3px' }}>Marmara {isEn ? 'University' : 'Üniversitesi'}</div>
                    <div style={{ fontSize:'13px', color:'var(--text2)', marginBottom:'4px' }}>{isEn ? 'Computer Education & Instructional Technology' : 'Bilgisayar ve Öğretim Teknolojileri Eğitimi'}</div>
                    <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                      <span style={{ fontSize:'11px', color:'#6366f1', padding:'2px 8px', background:'rgba(99,102,241,0.1)', borderRadius:'4px', fontWeight:600 }}>{isEn ? "Bachelor's Degree" : 'Lisans'}</span>
                      <span style={{ fontSize:'11px', color:'var(--text3)', padding:'2px 8px', background:'var(--border)', borderRadius:'4px' }}>2009 – 2013</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2 kariyer kartı */}
              {[
                { ikon:'📚', renk:'#0ea5e9', tr:{ title:'IB Öğretmeni', sub:'5 yıl · Teknoloji Destekli Öğrenme', tag:'Eğitim' }, en:{ title:'IB Teacher', sub:'5 years · Technology-Assisted Learning', tag:'Education' } },
                { ikon:'🌐', renk:'#e8560a', tr:{ title:'SEO & GEO Danışmanı', sub:'5 yıl · 150+ Marka · 14 Sektör', tag:'Günümüz' }, en:{ title:'SEO & GEO Consultant', sub:'5 years · 150+ Brands · 14 Sectors', tag:'Present' } },
              ].map((k,i) => {
                const d = isEn ? k.en : k.tr
                return (
                  <div key={i} style={{ background:'var(--bg)', borderRadius:'14px', padding:'20px 22px', border:'1px solid var(--border)', display:'flex', gap:'14px', alignItems:'center' }}>
                    <div style={{ width:'46px', height:'46px', borderRadius:'12px', background:`${k.renk}18`, border:`1px solid ${k.renk}25`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0 }}>{k.ikon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, color:'var(--text)', fontSize:'14px' }}>{d.title}</div>
                      <div style={{ fontSize:'12px', color:'var(--text3)', marginTop:'2px' }}>{d.sub}</div>
                    </div>
                    <span style={{ fontSize:'10px', fontWeight:700, color:k.renk, padding:'3px 9px', borderRadius:'20px', background:`${k.renk}15`, border:`1px solid ${k.renk}28`, whiteSpace:'nowrap' }}>{d.tag}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══ SAYILAR ════════════════════════════════════════ */}
        <section ref={statsRef} style={{ padding:'56px 24px', background:'var(--bg)', borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
            <div style={{ fontSize:'11px', fontWeight:700, color:'var(--text3)', letterSpacing:'2px', textTransform:'uppercase', textAlign:'center', marginBottom:'24px' }}>{t.stats_h2}</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'12px' }}>
              {ISTATISTIKLER.map((s,i) => (
                <div key={i} style={{ background:'var(--bg2)', borderRadius:'14px', padding:'22px 14px', border:'1px solid var(--border)', textAlign:'center', transition:'transform 0.2s,box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${s.renk}20` }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'28px', fontWeight:900, color:s.renk, lineHeight:1, marginBottom:'6px', opacity:statsVisible?1:0, transform:statsVisible?'none':'translateY(8px)', transition:'all 0.6s ease' }}>{s.rakam}</div>
                  <div style={{ fontSize:'11px', color:'var(--text3)', lineHeight:1.4 }}>{isEn ? s.en : s.tr}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TİMELINE ═══════════════════════════════════════ */}
        <section style={{ padding:'72px 24px', background:'var(--bg2)', borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3vw,36px)', fontWeight:800, color:'var(--text)', marginBottom:'36px', textAlign:'center' }}>{t.timeline_h2}</h2>
            {/* buton şeridi */}
            <div style={{ display:'flex', marginBottom:'28px', borderRadius:'14px', overflow:'hidden', border:'1px solid var(--border)' }}>
              {timeline.map((item,i) => (
                <button key={i} onClick={() => setTlIdx(i)}
                  style={{ flex:1, padding:'14px 8px', border:'none', borderRight: i < timeline.length-1 ? '1px solid var(--border)' : 'none', background: tlIdx===i ? item.renk : 'var(--bg2)', color: tlIdx===i ? '#fff' : 'var(--text3)', cursor:'pointer', fontFamily:'var(--font-body)', fontWeight: tlIdx===i ? 700 : 400, fontSize:'11px', transition:'all 0.2s', textAlign:'center', lineHeight:1.3, minWidth:'60px' }}>
                  <div style={{ fontSize:'20px', marginBottom:'4px' }}>{item.ikon}</div>
                  <div style={{ fontSize:'10px', opacity:0.85, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{item.yil}</div>
                </button>
              ))}
            </div>
            {/* detay kartı */}
            <div key={tlIdx} style={{ background:'var(--bg)', borderRadius:'16px', padding:'36px', border:`1px solid ${timeline[tlIdx].renk}35`, borderLeft:`4px solid ${timeline[tlIdx].renk}` }}>
              <div style={{ display:'flex', gap:'18px', alignItems:'flex-start', flexWrap:'wrap' }}>
                <div style={{ width:'56px', height:'56px', borderRadius:'14px', background:`${timeline[tlIdx].renk}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px', flexShrink:0 }}>{timeline[tlIdx].ikon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px', flexWrap:'wrap' }}>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,2vw,24px)', fontWeight:800, color:'var(--text)', margin:0 }}>{timeline[tlIdx].baslik}</h3>
                    <span style={{ fontSize:'11px', fontWeight:700, color:timeline[tlIdx].renk, padding:'3px 10px', borderRadius:'20px', background:`${timeline[tlIdx].renk}15`, border:`1px solid ${timeline[tlIdx].renk}28` }}>{timeline[tlIdx].yil}</span>
                  </div>
                  <div style={{ fontSize:'13px', color:'var(--text3)', marginBottom:'12px' }}>{timeline[tlIdx].alt}</div>
                  <p style={{ fontSize:'15px', color:'var(--text2)', lineHeight:1.8, margin:0 }}>{timeline[tlIdx].detay}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ BECERİLER ═══════════════════════════════════════ */}
        <section style={{ padding:'72px 24px', background:'var(--bg)', borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3vw,36px)', fontWeight:800, color:'var(--text)', marginBottom:'32px', textAlign:'center' }}>{t.skills_h2}</h2>
            {/* kategori tab'ları */}
            <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginBottom:'28px', flexWrap:'wrap' }}>
              {BECERILER.map((b,i) => (
                <button key={i} onClick={() => setAktifSkill(i)}
                  style={{ display:'flex', alignItems:'center', gap:'7px', padding:'10px 20px', borderRadius:'10px', border: aktifSkill===i ? 'none' : '1px solid var(--border)', background: aktifSkill===i ? b.renk : 'var(--bg2)', color: aktifSkill===i ? '#fff' : 'var(--text2)', fontWeight: aktifSkill===i ? 700 : 400, fontSize:'13px', fontFamily:'var(--font-body)', cursor:'pointer', transition:'all 0.15s' }}>
                  <span>{b.ikon}</span> {isEn ? b.en : b.tr}
                </button>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
              {/* Sol: seviye barı + diğerleri */}
              <div style={{ background:'var(--bg2)', borderRadius:'16px', padding:'30px', border:'1px solid var(--border)', display:'flex', flexDirection:'column', gap:'20px' }}>
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:'17px', fontWeight:800, color:'var(--text)' }}>{isEn ? skill.en : skill.tr}</span>
                    <span style={{ fontSize:'16px', fontWeight:800, color:skill.renk }}>{skill.seviye}%</span>
                  </div>
                  <div style={{ height:'8px', background:'var(--border)', borderRadius:'4px', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${skill.seviye}%`, background:`linear-gradient(to right, ${skill.renk}cc, ${skill.renk})`, borderRadius:'4px', transition:'width 0.8s ease' }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:'11px', color:'var(--text3)', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', marginBottom:'12px' }}>{t.other}</div>
                  {BECERILER.filter((_,i) => i !== aktifSkill).map((b,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
                      <span style={{ fontSize:'12px', color:'var(--text3)', width:'120px', flexShrink:0, display:'flex', alignItems:'center', gap:'5px' }}>
                        <span>{b.ikon}</span> {isEn ? b.en : b.tr}
                      </span>
                      <div style={{ flex:1, height:'4px', background:'var(--border)', borderRadius:'2px', overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${b.seviye}%`, background:`${b.renk}70`, borderRadius:'2px' }} />
                      </div>
                      <span style={{ fontSize:'11px', color:'var(--text3)', width:'30px', textAlign:'right' }}>{b.seviye}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Sağ: madde listesi */}
              <div style={{ background:'var(--bg2)', borderRadius:'16px', padding:'30px', border:'1px solid var(--border)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'18px' }}>
                  <span style={{ fontSize:'20px' }}>{skill.ikon}</span>
                  <span style={{ fontSize:'11px', fontWeight:700, color:'var(--text3)', letterSpacing:'1.5px', textTransform:'uppercase' }}>{t.capabilities}</span>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                  {(isEn ? skill.liste.en : skill.liste.tr).map((item,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', padding:'10px 14px', background:'var(--bg)', borderRadius:'8px', border:'1px solid var(--border)', fontSize:'13px', color:'var(--text2)', transition:'border-color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = skill.renk + '50'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:skill.renk, flexShrink:0, display:'inline-block', marginTop:'5px' }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ KARŞILAŞTIRMA TABLOSU ═══════════════════════════ */}
        <section style={{ padding:'72px 24px', background:'var(--bg2)', borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3vw,36px)', fontWeight:800, color:'var(--text)', marginBottom:'32px', textAlign:'center' }}>{t.table_h2}</h2>
            <div style={{ borderRadius:'16px', overflow:'hidden', border:'1px solid var(--border)', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:'#0f0f0f' }}>
                    {karsilastirma.cols.map((col,i) => (
                      <th key={i} style={{ padding:'14px 20px', textAlign:'left', fontSize:'11px', fontWeight:700, color: i===2 ? 'var(--orange)' : '#555', letterSpacing:'1px', textTransform:'uppercase', width: i===0 ? '25%' : '37.5%' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {karsilastirma.rows.map((row,i) => (
                    <tr key={i} style={{ borderBottom:'1px solid var(--border)', background: i%2===0 ? 'var(--bg2)' : 'var(--bg)', transition:'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(232,86,10,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background=i%2===0?'var(--bg2)':'var(--bg)'}>
                      <td style={{ padding:'14px 20px', fontSize:'13px', fontWeight:700, color:'var(--text)' }}>{row[0]}</td>
                      <td style={{ padding:'14px 20px', fontSize:'13px', color:'var(--text3)' }}>{row[1]}</td>
                      <td style={{ padding:'14px 20px', fontSize:'13px', color:'var(--orange)', fontWeight:600, display:'flex', alignItems:'center', gap:'7px' }}>
                        <span style={{ color:'#22c55e', fontSize:'16px', flexShrink:0 }}>✓</span>{row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══ TESTİMONİALS SLIDER ══════════════════════════════ */}
        <section style={{ padding:'72px 24px', background:'var(--bg)', borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:'760px', margin:'0 auto' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3vw,34px)', fontWeight:800, color:'var(--text)', marginBottom:'36px', textAlign:'center' }}>{t.testimonials_h2}</h2>
            <div style={{ background:'var(--bg2)', borderRadius:'20px', padding:'40px', border:'1px solid var(--border)', minHeight:'220px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:'20px', left:'24px', fontSize:'64px', color:'var(--orange)', fontFamily:'Georgia', lineHeight:1, opacity:0.25 }}>"</div>
              <p style={{ fontSize:'18px', color:'var(--text)', lineHeight:1.75, fontWeight:500, marginBottom:'28px', fontStyle:'italic', position:'relative', paddingLeft:'16px' }}>
                {isEn ? TESTIMONIALS[slideIdx].en : TESTIMONIALS[slideIdx].tr}
              </p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'18px', borderTop:'1px solid var(--border)', flexWrap:'wrap', gap:'12px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'var(--orange)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:'18px', flexShrink:0 }}>{TESTIMONIALS[slideIdx].isim[0]}</div>
                  <div>
                    <div style={{ fontWeight:700, color:'var(--text)', fontSize:'14px' }}>{TESTIMONIALS[slideIdx].isim}</div>
                    <div style={{ fontSize:'12px', color:'var(--text3)' }}>{isEn ? TESTIMONIALS[slideIdx].unvan_en : TESTIMONIALS[slideIdx].unvan_tr}</div>
                  </div>
                </div>
                <span style={{ fontSize:'11px', fontWeight:700, color:'var(--orange)', padding:'4px 12px', borderRadius:'20px', border:'1px solid rgba(232,86,10,0.3)', background:'rgba(232,86,10,0.08)' }}>
                  {isEn ? TESTIMONIALS[slideIdx].sektor_en : TESTIMONIALS[slideIdx].sektor_tr}
                </span>
              </div>
            </div>
            {/* dots + prev/next */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'16px', marginTop:'20px' }}>
              <button onClick={() => setSlideIdx(i => (i-1+TESTIMONIALS.length)%TESTIMONIALS.length)}
                style={{ width:'32px', height:'32px', borderRadius:'50%', border:'1px solid var(--border)', background:'var(--bg2)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text2)', fontSize:'14px' }}>‹</button>
              <div style={{ display:'flex', gap:'6px' }}>
                {TESTIMONIALS.map((_,i) => (
                  <button key={i} onClick={() => setSlideIdx(i)}
                    style={{ width:slideIdx===i?'24px':'8px', height:'8px', borderRadius:'4px', background:slideIdx===i?'var(--orange)':'var(--border)', border:'none', cursor:'pointer', transition:'all 0.3s', padding:0 }} />
                ))}
              </div>
              <button onClick={() => setSlideIdx(i => (i+1)%TESTIMONIALS.length)}
                style={{ width:'32px', height:'32px', borderRadius:'50%', border:'1px solid var(--border)', background:'var(--bg2)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text2)', fontSize:'14px' }}>›</button>
            </div>
          </div>
        </section>

        {/* ══ SSS ══════════════════════════════════════════════ */}
        <section style={{ padding:'72px 24px', background:'var(--bg2)', borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:'740px', margin:'0 auto' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3vw,34px)', fontWeight:800, color:'var(--text)', marginBottom:'32px', textAlign:'center' }}>{t.faq_h2}</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {faqlar.map((f,i) => (
                <div key={i} style={{ background:'var(--bg)', borderRadius:'12px', border:'1px solid var(--border)', overflow:'hidden', transition:'box-shadow 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
                  <button onClick={() => setAktifFaq(aktifFaq===i ? null : i)}
                    style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 22px', background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-body)', textAlign:'left' }}>
                    <span style={{ fontSize:'15px', fontWeight:700, color:'var(--text)', flex:1, lineHeight:1.4, paddingRight:'14px' }}>{f.s}</span>
                    <span style={{ color:'var(--orange)', fontWeight:700, fontSize:'22px', flexShrink:0, transition:'transform 0.25s', transform:aktifFaq===i?'rotate(45deg)':'none', display:'inline-block' }}>+</span>
                  </button>
                  {aktifFaq===i && (
                    <div style={{ padding:'0 22px 18px', borderTop:'1px solid var(--border)' }}>
                      <p style={{ fontSize:'14px', color:'var(--text2)', lineHeight:1.8, paddingTop:'14px', margin:0 }}>{f.c}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══════════════════════════════════════════════ */}
        <section style={{ padding:'96px 24px', background:'#0a0a0a', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 50% 120%, rgba(232,86,10,0.14) 0%, transparent 55%)', pointerEvents:'none' }} />
          <div style={{ maxWidth:'560px', margin:'0 auto', position:'relative' }}>
            <div style={{ fontSize:'52px', marginBottom:'16px' }}>👋</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:'#fff', marginBottom:'14px', lineHeight:1.15 }}>{t.cta_h2}</h2>
            <p style={{ color:'#4b5563', fontSize:'15px', lineHeight:1.75, marginBottom:'32px' }}>{t.cta_p}</p>
            <Link href={isEn?'/en/contact':'/iletisim'} style={{ display:'inline-block', padding:'15px 40px', background:'var(--orange)', color:'#fff', borderRadius:'8px', fontWeight:700, fontSize:'16px', fontFamily:'var(--font-body)', boxShadow:'0 4px 28px rgba(232,86,10,0.45)' }}>{t.cta_btn}</Link>
            <div style={{ display:'flex', gap:'20px', justifyContent:'center', marginTop:'22px', flexWrap:'wrap' }}>
              {[
                isEn ? '✓ Free 30-min discovery call' : '✓ Ücretsiz 30 dk keşif görüşmesi',
                isEn ? '✓ Custom roadmap' : '✓ Özel büyüme yol haritası',
                isEn ? '✓ No commitment' : '✓ Yükümlülük yok',
              ].map((item,i) => <span key={i} style={{ fontSize:'13px', color:'#4b5563' }}>{item}</span>)}
            </div>
          </div>
        </section>

      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; gap: 24px !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
          [style*="repeat(6,1fr)"] { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
