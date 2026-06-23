import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const HIZMETLER = {
  tr: [
    { ikon: '🗺️', baslik: 'İçerik Stratejisi & Planlama', aciklama: 'Topical authority inşa eden, arama niyetiyle örtüşen ve dönüşüm getiren içerik mimarisi. Pillar-cluster modeli, anahtar kelime haritası ve editorial takvim.' },
    { ikon: '✍️', baslik: 'SEO Uyumlu İçerik Üretimi', aciklama: 'E-E-A-T standartlarını karşılayan, uzun formlu pillar içerikler. Her bölüm doğrudan soruya yanıt verir, AI Overview kaynak seçimi için optimize edilir.' },
    { ikon: '🔄', baslik: 'İçerik Güncelleme & Revizyon', aciklama: 'Trafik kaybeden eski içeriklerin yeniden canlandırılması. İstatistik güncellemesi, yeni sorular eklenmesi ve derinliğin artırılması.' },
    { ikon: '📊', baslik: 'İçerik Denetimi (Content Audit)', aciklama: 'Mevcut içeriklerin sıralama, trafik ve dönüşüm potansiyeli açısından analizi. Konsolide edilecek, güncellenecek ve kaldırılacak sayfaların tespiti.' },
    { ikon: '🤖', baslik: 'GEO Odaklı İçerik', aciklama: 'AI sistemlerinde kaynak seçilmek için özet çıkarılabilir, yapılandırılmış ve FAQPage schema ile işaretlenmiş içerik üretimi.' },
    { ikon: '📋', baslik: 'İçerik Brief & Şablonlar', aciklama: 'Yazarlara yön veren detaylı içerik brief\'leri. Hedef kelime, niyet analizi, rakip inceleme ve başlık yapısı dahil kapsamlı şablonlar.' },
  ],
  en: [
    { ikon: '🗺️', baslik: 'Content Strategy & Planning', aciklama: 'Content architecture that builds topical authority, aligns with search intent and drives conversions. Pillar-cluster model, keyword map and editorial calendar.' },
    { ikon: '✍️', baslik: 'SEO-Optimized Content Production', aciklama: 'Long-form pillar content meeting E-E-A-T standards. Every section directly answers the query, optimized for AI Overview source selection.' },
    { ikon: '🔄', baslik: 'Content Update & Refresh', aciklama: 'Reviving old content that is losing traffic. Statistics updates, adding new questions and increasing depth.' },
    { ikon: '📊', baslik: 'Content Audit', aciklama: 'Analysis of existing content for ranking, traffic and conversion potential. Identifying pages to consolidate, update and remove.' },
    { ikon: '🤖', baslik: 'GEO-Focused Content', aciklama: 'Summarizable, structured content marked with FAQPage schema to be selected as a source in AI systems.' },
    { ikon: '📋', baslik: 'Content Briefs & Templates', aciklama: 'Detailed content briefs to guide writers. Comprehensive templates including target keyword, intent analysis, competitor review and heading structure.' },
  ],
}

const SUREC = {
  tr: [
    { no: '01', baslik: 'Araştırma & Analiz', detay: 'Anahtar kelime araştırması, rakip içerik analizi, arama niyeti haritalama ve boşluk tespiti.' },
    { no: '02', baslik: 'Strateji & Mimari', detay: 'Pillar-cluster yapısı, içerik takvimi, önceliklendirme ve KPI belirleme.' },
    { no: '03', baslik: 'Üretim & Optimizasyon', detay: 'E-E-A-T odaklı içerik yazımı, schema markup, görsel optimizasyonu ve iç linkleme.' },
    { no: '04', baslik: 'Ölçüm & İterasyon', detay: 'Sıralama takibi, trafik analizi, dönüşüm izleme ve periyodik güncelleme döngüsü.' },
  ],
  en: [
    { no: '01', baslik: 'Research & Analysis', detay: 'Keyword research, competitor content analysis, search intent mapping and gap detection.' },
    { no: '02', baslik: 'Strategy & Architecture', detay: 'Pillar-cluster structure, content calendar, prioritization and KPI setting.' },
    { no: '03', baslik: 'Production & Optimization', detay: 'E-E-A-T-focused content writing, schema markup, image optimization and internal linking.' },
    { no: '04', baslik: 'Measurement & Iteration', detay: 'Ranking tracking, traffic analysis, conversion monitoring and periodic update cycle.' },
  ],
}

const FAQS = {
  tr: [
    { s: 'İçerik stratejisi ne kadar sürede sonuç verir?', c: 'İlk içerikler yayınlandıktan 4-8 hafta sonra indexleme başlar. Anlamlı sıralama artışları genellikle 3-4. ayda görülür. Topical authority inşası 6-12 ay perspektifinde değerlendirilmelidir.' },
    { s: 'Kaç içerik üretilmesi gerekiyor?', c: 'Sektöre ve rekabete göre değişir. Orta ölçekli bir site için başlangıç olarak 1 pillar + 6-8 cluster sayfa etkili bir çekirdek oluşturur. Sonra aylık 4-8 içerik ile ölçeklenir.' },
    { s: 'Yapay zekâ ile içerik üretimi kullanıyor musunuz?', c: 'AI araçları taslak ve araştırmada kullanılabilir; ancak her içerik uzman editöryel denetimden geçer, özgün veri ve E-E-A-T sinyalleriyle zenginleştirilir. Ham AI çıktısı asla son ürün olarak kullanılmaz.' },
    { s: 'Mevcut içeriklerimi mi güncelleyin, yeni mi yazayım?', c: 'Her iki strateji de değerlidir. İlk adım bir içerik denetimidir: hangi mevcut sayfaların güncellenmeye değer olduğunu belirledikten sonra yeni içerik planına geçilir.' },
  ],
  en: [
    { s: 'How long does content strategy take to show results?', c: 'Indexing begins 4-8 weeks after the first content is published. Meaningful ranking improvements are typically seen at months 3-4. Topical authority building should be evaluated on a 6-12 month horizon.' },
    { s: 'How much content needs to be produced?', c: 'Varies by sector and competition. For a medium-sized site, 1 pillar + 6-8 cluster pages forms an effective starting core. Then scale with 4-8 pieces monthly.' },
    { s: 'Do you use AI for content production?', c: 'AI tools can be used for drafting and research; however, every piece of content goes through expert editorial review and is enriched with original data and E-E-A-T signals. Raw AI output is never used as the final product.' },
    { s: 'Should I update existing content or write new?', c: 'Both strategies have value. The first step is a content audit: after determining which existing pages are worth updating, move to a new content plan.' },
  ],
}

const ISTATISTIKLER = [
  { rakam: '3x', tr: 'Topical authority sitenin ortalama sıralama artışı', en: 'Avg. ranking improvement for topical authority sites' },
  { rakam: '%67', tr: 'B2B müşterilerinin satın alım öncesi içerik okuma oranı', en: 'B2B buyers who read content before purchasing' },
  { rakam: '4x', tr: 'Kaliteli içeriğin sağladığı organik lead artışı', en: 'Organic lead increase from quality content' },
  { rakam: '%14', tr: 'İçerik odaklı SEO lead kapanma oranı (vs %1.7 outbound)', en: 'Content SEO lead close rate (vs 1.7% outbound)' },
]

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifFaq, setAktifFaq] = useState(null)
  const hizmetler = isEn ? HIZMETLER.en : HIZMETLER.tr
  const surec = isEn ? SUREC.en : SUREC.tr
  const faqlar = isEn ? FAQS.en : FAQS.tr

  const t = isEn ? {
    badge: 'CONTENT STRATEGY',
    h1a: 'Content That Ranks,',
    h1b: 'Converts & Gets Cited by AI',
    subtitle: 'Data-Driven Growth Strategies in Performance Marketing',
    desc: 'Not all content ranks. Not all content converts. I build content architectures that establish topical authority, match search intent at every funnel stage — and get cited as sources in AI systems.',
    btn1: 'Get a Free Content Audit →',
    btn2: 'View Case Studies',
    what_h2: 'What is Content Strategy?',
    what_p: 'Content strategy is the systematic process of planning, producing and managing content that meets the needs of your target audience, aligns with search intent and supports your business goals. A good content strategy doesn\'t just determine "what to publish" — it determines "to whom, in what format, how frequently and with what goal."',
    pillar_h3: 'Pillar-Cluster Model',
    pillar_p: 'Pillar pages comprehensively cover a main topic. Cluster pages cover subtopics in depth. Bidirectional internal links between them optimize topical authority and PageRank distribution. This structure strengthens both user experience and semantic coherence.',
    eeat_h3: 'E-E-A-T & Content Quality',
    eeat_p: 'Google evaluates content on four dimensions: Experience, Expertise, Authoritativeness and Trustworthiness. In the AI era, E-E-A-T is even more critical — AI systems don\'t cite content with weak credibility signals.',
    hizmetler_h2: 'Content Services',
    surec_h2: 'How the Process Works',
    faq_h2: 'FAQ',
    cta_h2: 'Get a Free Content Strategy Consultation',
    cta_desc: 'I\'ll analyze your existing content, identify growth opportunities and create a custom content roadmap.',
    cta_btn: 'Start Free Consultation →',
    breadcrumb: ['Home', 'Services', 'Content Strategy'],
  } : {
    badge: 'İÇERİK STRATEJİSİ',
    h1a: 'Sıralayan, Dönüştüren',
    h1b: 've AI\'da Kaynak Olan İçerik',
    subtitle: 'Her içerik sıralamaz. Her içerik dönüştürmez.',
    desc: 'Topical authority kuran, huninin her aşamasında arama niyetiyle örtüşen ve AI sistemlerinde kaynak seçilen içerik mimarileri oluşturuyorum.',
    btn1: 'Ücretsiz İçerik Denetimi Al →',
    btn2: 'Vaka Çalışmaları',
    what_h2: 'İçerik Stratejisi Nedir?',
    what_p: 'İçerik stratejisi, hedef kitlenizin ihtiyaçlarını karşılayan, arama niyetiyle uyumlu ve işletme hedeflerinizi destekleyen içerikleri sistematik biçimde planlama, üretme ve yönetme sürecidir. İyi bir içerik stratejisi yalnızca "ne yayınlayacağınızı" değil, "kime, hangi formatta, hangi sıklıkta ve hangi hedefle" yayınlayacağınızı da belirler.',
    pillar_h3: 'Pillar-Cluster Modeli',
    pillar_p: 'Pillar sayfalar ana konuyu kapsamlı ele alır. Cluster sayfalar alt konuları derinlemesine işler. Aralarındaki çift yönlü iç link yapısı topical authority\'yi ve PageRank dağılımını optimize eder. Bu yapı hem kullanıcı deneyimini hem semantik bütünlüğü güçlendirir.',
    eeat_h3: 'E-E-A-T & İçerik Kalitesi',
    eeat_p: 'Google içerikleri dört boyutta değerlendirir: Deneyim, Uzmanlık, Otorite ve Güvenilirlik. AI döneminde E-E-A-T daha da kritiktir — AI sistemleri güvenilirlik sinyalleri zayıf içerikleri kaynak seçmez.',
    hizmetler_h2: 'İçerik Hizmetlerimiz',
    surec_h2: 'Süreç Nasıl İşler?',
    faq_h2: 'Sıkça Sorulan Sorular',
    cta_h2: 'Ücretsiz İçerik Stratejisi Danışmanlığı',
    cta_desc: 'Mevcut içeriklerinizi analiz edip büyüme fırsatlarını tespit edeceğim ve özel içerik yol haritası oluşturacağım.',
    cta_btn: 'Ücretsiz Danışmanlık Başlat →',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'İçerik Stratejisi'],
  }

  return (
    <>
      <Head>
        <title>{isEn ? 'Content Strategy | Fatih Emin Çakıroğlu' : 'İçerik Stratejisi | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? 'Data-driven content strategy: topical authority, E-E-A-T, pillar-cluster model and AI-ready content production.' : 'Veriye dayalı içerik stratejisi: topical authority, E-E-A-T, pillar-cluster modeli ve AI için optimize içerik üretimi.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/content-strategy' : 'https://fatihemincakiroglu.com/icerik'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/icerik" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/content-strategy" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqlar.map(f=>({ "@type":"Question","name":f.s,"acceptedAnswer":{"@type":"Answer","text":f.c} }))})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 16px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link><span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/services' : '/hizmetler'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[1]}</Link><span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[2]}</span>
          </div>
        </div>

        {/* Hero */}
        <section style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0f1f3d 50%, #0a1628 100%)', padding: '88px 16px 72px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(14,165,233,0.1) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(232,86,10,0.08) 0%, transparent 50%)' }} />
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '56px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', fontSize: '11px', fontWeight: 700, color: '#38bdf8', letterSpacing: '2px', marginBottom: '24px' }}>{t.badge}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: '4px' }}>{t.h1a}</h1>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 900, color: '#38bdf8', lineHeight: 1.05, marginBottom: '12px', fontStyle: 'italic' }}>{t.h1b}</h1>
              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.8, marginBottom: '32px', maxWidth: '500px' }}>{t.desc}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '14px 28px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-body)', display: 'inline-block', boxShadow: '0 4px 20px rgba(232,86,10,0.35)' }}>{t.btn1}</Link>
                <Link href={isEn ? '/en/case-studies' : '/vakalar'} style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '15px', fontFamily: 'var(--font-body)', display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}>{t.btn2}</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {ISTATISTIKLER.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 900, color: i % 2 === 0 ? '#38bdf8' : 'var(--orange)', lineHeight: 1, marginBottom: '8px' }}>{s.rakam}</div>
                  <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.5 }}>{isEn ? s.en : s.tr}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ne Neden */}
        <section style={{ padding: '72px 16px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, color: '#111', marginBottom: '14px' }}>{t.what_h2}</h2>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '28px' }}>{t.what_p}</p>
                {[
                  { h3: t.pillar_h3, p: t.pillar_p, renk: '#0ea5e9' },
                  { h3: t.eeat_h3, p: t.eeat_p, renk: 'var(--orange)' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#faf9f7', borderRadius: '12px', padding: '22px', border: '1px solid #ede8e0', marginBottom: '14px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 800, color: '#111', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '4px', height: '17px', background: item.renk, borderRadius: '2px', display: 'inline-block', flexShrink: 0 }} />{item.h3}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.75, margin: 0 }}>{item.p}</p>
                  </div>
                ))}
              </div>
              {/* Content funnel visual */}
              <div style={{ background: '#faf9f7', borderRadius: '20px', padding: '32px', border: '1px solid #ede8e0' }}>
                <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>{isEn ? 'CONTENT FUNNEL' : 'İÇERİK HUNISI'}</div>
                {[
                  { label: isEn ? 'Awareness Content' : 'Farkındalık İçeriği', sub: isEn ? 'What is / How to / Why' : 'Nedir / Nasıl / Neden', w: '100%', renk: '#38bdf8', pct: isEn ? 'Top of Funnel' : 'Huni Üstü' },
                  { label: isEn ? 'Consideration Content' : 'Değerlendirme İçeriği', sub: isEn ? 'Comparisons / Guides' : 'Karşılaştırma / Rehber', w: '75%', renk: '#f59e0b', pct: isEn ? 'Mid Funnel' : 'Huni Ortası' },
                  { label: isEn ? 'Decision Content' : 'Karar İçeriği', sub: isEn ? 'Case studies / Pricing' : 'Vakalar / Fiyatlandırma', w: '50%', renk: 'var(--orange)', pct: isEn ? 'Bottom Funnel' : 'Huni Altı' },
                  { label: isEn ? 'Conversion' : 'Dönüşüm', sub: isEn ? 'Contact / Book a call' : 'İletişim / Randevu', w: '30%', renk: '#16a34a', pct: isEn ? 'Action' : 'Aksiyon' },
                ].map((f, i) => (
                  <div key={i} style={{ width: f.w, marginBottom: '10px', transition: 'width 0.3s' }}>
                    <div style={{ background: f.renk + '18', borderRadius: '8px', padding: '12px 16px', border: `1px solid ${f.renk}30`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{f.label}</div>
                        <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{f.sub}</div>
                      </div>
                      <span style={{ fontSize: '10px', color: f.renk, fontWeight: 700, padding: '2px 8px', background: f.renk + '15', borderRadius: '4px', whiteSpace: 'nowrap' }}>{f.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hizmetler */}
        <section style={{ padding: '72px 16px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '36px', textAlign: 'center' }}>{t.hizmetler_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {hizmetler.map((h, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '26px', border: '1px solid #eee', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(14,165,233,0.1)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#eee' }}>
                  <div style={{ fontSize: '30px', marginBottom: '12px' }}>{h.ikon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{h.baslik}</h3>
                  <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.65 }}>{h.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Süreç */}
        <section style={{ padding: '72px 16px', background: '#0a1628' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#fff', marginBottom: '40px', textAlign: 'center' }}>{t.surec_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {surec.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '24px', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(14,165,233,0.15)', border: '2px solid rgba(14,165,233,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 900, color: '#38bdf8' }}>{s.no}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 800, color: '#e5e7eb', marginBottom: '8px' }}>{s.baslik}</h3>
                  <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.65 }}>{s.detay}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section style={{ padding: '72px 16px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, color: '#111', marginBottom: '28px', textAlign: 'center' }}>{t.faq_h2}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqlar.map((f, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                  <button onClick={() => setAktifFaq(aktifFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#111', flex: 1, lineHeight: 1.4, paddingRight: '14px' }}>{f.s}</span>
                    <span style={{ color: '#0ea5e9', fontWeight: 700, fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: aktifFaq === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                  </button>
                  {aktifFaq === i && (
                    <div style={{ padding: '0 22px 18px', borderTop: '1px solid #f0f0f0' }}>
                      <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.8, paddingTop: '14px', margin: 0 }}>{f.c}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '88px 16px', background: 'linear-gradient(160deg, #0a1628 0%, #0f1f3d 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(14,165,233,0.1) 0%, transparent 60%)' }} />
          <div style={{ maxWidth: '580px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '44px', marginBottom: '14px' }}>✍️</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#fff', marginBottom: '14px', lineHeight: 1.2 }}>{t.cta_h2}</h2>
            <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>{t.cta_desc}</p>
            <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'inline-block', padding: '15px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-body)', boxShadow: '0 4px 20px rgba(232,86,10,0.4)' }}>{t.cta_btn}</Link>
          </div>
        </section>
      </div>
      <style>{`@media(max-width:768px){section>div{grid-template-columns:1fr!important;gap:24px!important;}section{padding-left:16px!important;padding-right:16px!important;}}`}</style>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
